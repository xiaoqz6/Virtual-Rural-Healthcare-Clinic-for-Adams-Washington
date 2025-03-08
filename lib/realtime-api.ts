import ReconnectingWebSocket from "reconnecting-websocket"

export class RealtimeAPI {
  private ws: ReconnectingWebSocket | null = null
  private sessionId: string | null = null

  constructor(
    private apiKey: string,
    private modelId: string,
  ) {}

  async connect() {
    return new Promise<void>((resolve, reject) => {
      const url = `wss://api.openai.com/v1/realtime?model=${this.modelId}`

      const options = {
        WebSocket: WebSocket,
        connectionTimeout: 4000,
        maxRetries: 10,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "OpenAI-Beta": "realtime=v1",
        },
      }

      this.ws = new ReconnectingWebSocket(url, [], options)

      this.ws.onopen = () => {
        console.log("WebSocket connection established")
        resolve()
      }

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("Received message:", data)
        // Handle different message types here
      }

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error)
        reject(error)
      }

      this.ws.onclose = () => {
        console.log("WebSocket connection closed")
      }
    })
  }

  sendMessage(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const event = {
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [
            {
              type: "input_text",
              text: message,
            },
          ],
        },
      }
      this.ws.send(JSON.stringify(event))
    }
  }

  createResponse() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const event = {
        type: "response.create",
        response: {
          modalities: ["text", "audio"],
          voice: "verse",
          output_audio_format: "pcm16",
          instructions: `
            You are a virtual healthcare assistant designed for on-site clinic use,
            specialized in gathering patient information, initial assessments, and
            providing guidance on medical care related to dental and vision concerns.
            Start conversations with patients logged in at the clinic, helping to collect
            data efficiently and ensuring they understand the next steps. Do not ask
            patient name, age or the date of birth.
            - Begin interactions warmly, clarifying the assistant purpose and obtaining patient consent.
            - Use plain language, keeping the tone friendly and the language accessible.
            - Summarize and confirm patient responses frequently for clarity.
            - Tailor recommendations based on symptom analysis, offering to schedule appointments or suggesting self-care when appropriate.
            - Escalate issues requiring urgent attention and advise emergency protocols if necessary.
            - Ensure data privacy, and inform patients that data is securely stored and shared only with medical staff.
            - After interactions, summarize collected information for both patients and clinic staff, reinforcing the assistant supportive role.
            # Examples
            - User: "I've been experiencing sharp tooth pain."
            - Assistant: "I see you have sharp tooth pain. Can you tell me where exactly it hurts?"
            - User: "It's on the upper left side."
            - Assistant: "On the upper left side, got that. When did it start hurting?"
            - User: "Two days ago."
            - Assistant: "Thanks for sharing. Would you like to book an appointment for further evaluation now?"
            - User: "My left eye vision is blurry."
            - Assistant: "You mentioned blurry vision in the left eye, correct?"
            - User: "Yes."
            - Assistant: "And how severe is this blurriness?"
            - User: "Pretty severe."
            - Assistant: "It sounds like you should see a doctor as soon as possible. Should I help you schedule an appointment?"
            # Notes
            - Always provide empathy and reassurance.
            - Ensure multilingual support where possible.
            - Highlight initiation of on-site additional features such as a dental or eye scan, based on symptom severity.
            - Reinforce that the assistant is a guide, not a medical professional.
          `,
          functions: [
            {
              name: "voice_assistant_clinic",
              description:
                "Voice Assistant for On-Site Clinic Use that collects patient information and provides recommendations.",
              parameters: {
                type: "object",
                properties: {
                  patient_id: {
                    type: "string",
                    description: "Unique identifier for the patient, used to access their records.",
                  },
                  action_stage: {
                    type: "string",
                    description:
                      "Current stage in the interaction flow, e.g., 'greeting', 'collecting_health_data', 'providing_recommendations'.",
                    enum: [
                      "greeting",
                      "collecting_health_data",
                      "confirming_details",
                      "providing_recommendations",
                      "closing_interaction",
                    ],
                  },
                  patient_consented: {
                    type: "boolean",
                    description: "Indicates whether the patient has provided consent to collect health information.",
                  },
                  basic_health_data: {
                    type: "object",
                    properties: {
                      past_medical_history: {
                        type: "string",
                        description: "Summary of the patient's past medical and dental history.",
                      },
                      current_complaints: {
                        type: "string",
                        description: "Description of the patient's current health complaints.",
                      },
                    },
                  },
                  symptom_analysis: {
                    type: "object",
                    properties: {
                      symptom_details: {
                        type: "string",
                        description: "Detailed description of symptoms as reported by the patient.",
                      },
                      emergency_flag: {
                        type: "boolean",
                        description: "Indicates if the symptoms require immediate medical attention.",
                      },
                    },
                  },
                  recommendations: {
                    type: "array",
                    description: "List of recommendations based on the patient's symptoms and needs.",
                    items: {
                      type: "string",
                      description:
                        "A specific recommendation, such as self-care advice, appointment suggestions, or additional features.",
                    },
                  },
                  scheduling: {
                    type: "object",
                    properties: {
                      appointment_time: {
                        type: "string",
                        description: "Proposed time for the appointment if needed.",
                      },
                      provider: {
                        type: "string",
                        description: "Name of the medical provider for the scheduled appointment.",
                      },
                    },
                  },
                },
                required: [],
              },
            },
          ],
          function_call: "auto",
        },
      }
      this.ws.send(JSON.stringify(event))
    }
  }

  onMessage(callback: (data: any) => void) {
    if (this.ws) {
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        callback(data)
      }
    }
  }

  close() {
    if (this.ws) {
      this.ws.close()
    }
  }
}

