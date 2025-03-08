import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

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

const DEFAULT_QUESTIONS = [
  "Are you experiencing any severe pain?",
  "Have you noticed any changes in your symptoms recently?",
  "Do you have any pre-existing medical conditions?",
  "Are you currently taking any medications?",
]

const DEFAULT_ANALYSIS: MedicalAnalysis = {
  initialAssessment: "Based on the information provided, a basic health assessment will be conducted.",
  followUpQuestions: DEFAULT_QUESTIONS,
  riskFactors: {
    painLevel: "unknown",
    bleeding: "unknown",
    fever: "unknown",
    chronicConditions: "unknown",
  },
  riskScore: 1,
  priority: "low",
  recommendedAction: "Please complete the assessment questions for a more accurate evaluation.",
  personalizedAdvice: "Answer all questions honestly for the most accurate assessment.",
}

export async function POST(req: Request) {
  try {
    const { medicalHistory, symptoms, previousAnswers } = await req.json()

    // If no medical history or symptoms provided, return default analysis
    if (!medicalHistory && !symptoms && !previousAnswers) {
      return NextResponse.json(DEFAULT_ANALYSIS)
    }

    const prompt = `
      Medical History: ${medicalHistory || "No medical history provided"}
      Current Symptoms: ${symptoms || "No symptoms provided"}
      Previous Answers: ${JSON.stringify(previousAnswers || {})}

      Based on this information, please provide:
      1. An initial assessment
      2. 4-5 relevant follow-up questions
      3. Risk factors evaluation
      4. A risk score from 1-10
      5. Priority level and recommended actions
      6. Personalized advice

      Format the response as a JSON object matching this type:
      {
        initialAssessment: string,
        followUpQuestions: string[],
        riskFactors: {
          painLevel: string,
          bleeding: string,
          fever: string,
          chronicConditions: string
        },
        riskScore: number,
        priority: "high" | "moderate" | "low",
        recommendedAction: string,
        personalizedAdvice: string
      }
    `

    try {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: prompt,
      })

      let analysis: MedicalAnalysis
      try {
        analysis = JSON.parse(text)
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError)
        throw new Error("Invalid response format from AI")
      }

      // Validate and sanitize the response
      const sanitizedAnalysis: MedicalAnalysis = {
        initialAssessment: analysis.initialAssessment || DEFAULT_ANALYSIS.initialAssessment,
        followUpQuestions:
          Array.isArray(analysis.followUpQuestions) && analysis.followUpQuestions.length
            ? analysis.followUpQuestions
            : DEFAULT_ANALYSIS.followUpQuestions,
        riskFactors: {
          painLevel: analysis.riskFactors?.painLevel || "unknown",
          bleeding: analysis.riskFactors?.bleeding || "unknown",
          fever: analysis.riskFactors?.fever || "unknown",
          chronicConditions: analysis.riskFactors?.chronicConditions || "unknown",
        },
        riskScore:
          typeof analysis.riskScore === "number"
            ? Math.max(1, Math.min(10, analysis.riskScore))
            : DEFAULT_ANALYSIS.riskScore,
        priority: ["high", "moderate", "low"].includes(analysis.priority)
          ? analysis.priority
          : DEFAULT_ANALYSIS.priority,
        recommendedAction: analysis.recommendedAction || DEFAULT_ANALYSIS.recommendedAction,
        personalizedAdvice: analysis.personalizedAdvice || DEFAULT_ANALYSIS.personalizedAdvice,
      }

      return NextResponse.json(sanitizedAnalysis)
    } catch (error) {
      console.error("Error generating analysis:", error)
      return NextResponse.json({
        ...DEFAULT_ANALYSIS,
        initialAssessment:
          "We're experiencing technical difficulties. Here's a general assessment based on standard guidelines.",
        personalizedAdvice:
          "As we couldn't process your specific information, please consult with a healthcare provider for personalized advice.",
      })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(DEFAULT_ANALYSIS)
  }
}

