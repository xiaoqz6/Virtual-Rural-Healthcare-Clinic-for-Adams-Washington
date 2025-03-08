import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

type MedicalAnalysis = {
  initialAssessment: string
  followUpQuestions: string[]
  riskFactors: {
    painLevel: string
    bleeding: string
    fever: string
    chronicConditions: string
  }
  riskScore: number
  priority: "high" | "moderate" | "low"
  recommendedAction: string
  personalizedAdvice: string
}

export async function analyzeMedicalInfo(
  medicalHistory: string,
  symptoms: string,
  previousAnswers?: Record<string, string>,
): Promise<MedicalAnalysis> {
  const prompt = `
    Medical History: ${medicalHistory}
    Current Symptoms: ${symptoms}
    Previous Answers: ${JSON.stringify(previousAnswers || {})}

    As an empathetic and culturally sensitive AI health assistant, please provide:
    1. An initial assessment of the patient's condition
    2. A list of 3-5 relevant, conversational follow-up questions to gather more specific information
    3. An evaluation of risk factors including pain level, bleeding, fever, and chronic conditions
    4. A risk score from 1-10, where 10 is the highest risk
    5. A priority level (high, moderate, or low) based on the risk score
    6. A recommended action based on the priority level
    7. Personalized advice for the patient, considering their specific situation

    Format your response as a JSON object with the following structure:
    {
      "initialAssessment": "string",
      "followUpQuestions": ["string", "string", ...],
      "riskFactors": {
        "painLevel": "string",
        "bleeding": "string",
        "fever": "string",
        "chronicConditions": "string"
      },
      "riskScore": number,
      "priority": "high" | "moderate" | "low",
      "recommendedAction": "string",
      "personalizedAdvice": "string"
    }
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
    })

    const analysis: MedicalAnalysis = JSON.parse(text)
    return analysis
  } catch (error) {
    console.error("Error in LLM analysis:", error)
    throw new Error("Failed to analyze medical information")
  }
}

