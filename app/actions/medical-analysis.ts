"use server"

type Response = {
  question: string
  answer: string
  weight: number
}

type RiskAssessment = {
  score: number
  level: "high" | "low"
  explanation: string
  recommendedAction: string
}

function calculateRiskScore(responses: Record<string, string>): RiskAssessment {
  // Define weights for different keywords/conditions
  const riskWeights = {
    severe: 2,
    pain: 1.5,
    chronic: 1,
    emergency: 2,
    urgent: 1.5,
    mild: 0.5,
    moderate: 1,
    yes: 1,
    no: 0,
  }

  let totalScore = 0
  let responseCount = 0

  // Calculate score based on answers
  Object.entries(responses).forEach(([_, answer]) => {
    const lowerAnswer = answer.toLowerCase()

    // Add weights for each keyword found in the answer
    Object.entries(riskWeights).forEach(([keyword, weight]) => {
      if (lowerAnswer.includes(keyword)) {
        totalScore += weight
      }
    })

    responseCount++
  })

  // Normalize score to 0-10 range
  const normalizedScore = Math.min(Math.round((totalScore / responseCount) * 5), 10)

  // Determine risk level (corrected: ≥7 is now high priority)
  const isHighPriority = normalizedScore >= 7

  return {
    score: normalizedScore,
    level: isHighPriority ? "high" : "low",
    explanation: isHighPriority
      ? "Indicates severe symptoms or critical conditions that require immediate attention."
      : "Indicates mild or moderate symptoms that can be addressed through routine care.",
    recommendedAction: isHighPriority
      ? "Emergency care is recommended"
      : "Schedule a routine care appointment or diagnostic examination",
  }
}

// Note: This is a simplified implementation. In production, you would need to properly
// set up and configure the Meditron model with appropriate credentials and error handling
export async function analyzeMedicalInfo(medicalHistory: string, symptoms: string) {
  try {
    // Initialize Meditron model
    // In production, you would properly import and configure the model
    const response = {
      initialAssessment: "Based on the symptoms described, further clarification is needed.",
      followUpQuestions: [
        "Have you experienced any recent changes in your overall health, such as unintentional weight loss, fatigue, or changes in appetite, even if they seem minor?",
        "Are you currently taking any medications, supplements, or over-the-counter remedies, and if so, can you provide details about them?",
      ],
      riskFactors: {
        painLevel: "unknown",
        bleeding: "unknown",
        fever: "unknown",
        chronicConditions: "needs_clarification",
      },
    }

    return response
  } catch (error) {
    console.error("Error analyzing medical information:", error)
    throw new Error("Failed to analyze medical information")
  }
}

export async function processFollowUpResponse(
  question: string,
  answer: string,
  previousResponses: Record<string, string>,
) {
  try {
    const allResponses = { ...previousResponses, [question]: answer }

    if (Object.keys(allResponses).length >= 2) {
      const assessment = calculateRiskScore(allResponses)

      return {
        complete: true,
        isLastQuestion: true,
        assessment: {
          priority: assessment.level,
          recommendedAction: assessment.recommendedAction,
          reasoning: assessment.explanation,
          riskScore: assessment.score,
        },
      }
    }

    return {
      complete: false,
      isLastQuestion: Object.keys(allResponses).length === 1,
      nextQuestion: "Do you have any history of chronic medical conditions?",
    }
  } catch (error) {
    console.error("Error processing follow-up response:", error)
    throw new Error("Failed to process response")
  }
}

