import { type CoreMessage, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json()

    const systemMessage = `You are an AI health assistant providing general health advice. 
    Respond in plain language that is easy for patients to understand. 
    Always encourage users to consult with a healthcare professional for personalized medical advice.`

    // Check if API key is available and valid
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === "") {
      console.error("OpenAI API key is missing or invalid")
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not properly configured. Please check your environment variables.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemMessage,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

