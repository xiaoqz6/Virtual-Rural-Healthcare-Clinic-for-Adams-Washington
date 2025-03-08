"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"

const QUESTIONS = [
  { id: "q1", text: "Are you experiencing severe pain?" },
  { id: "q2", text: "Have you noticed any changes in your symptoms recently?" },
  { id: "q3", text: "Do you have any pre-existing medical conditions?" },
  { id: "q4", text: "Are you currently taking any medications?" },
  { id: "q5", text: "Have you had a fever in the past few days?" },
  { id: "q6", text: "Have you had unexplained weight loss or fatigue?" },
  { id: "q7", text: "Is there anything else you'd like to add about your condition?" },
]

type Assessment = {
  priority: "high" | "moderate" | "low"
  recommendedAction: string
  reasoning: string
  riskScore: number
}

type SavedResponse = {
  question: string
  answer: string
}

export default function TriageConfirmation() {
  const router = useRouter()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([])
  const [showResponses, setShowResponses] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    const calculateAssessment = () => {
      try {
        // Get saved responses from localStorage
        const savedAnswers = JSON.parse(localStorage.getItem("medicalAssessmentAnswers") || "{}")
        const additionalInfo = localStorage.getItem("medicalAssessmentAdditionalInfo") || ""

        setAnswers(savedAnswers)

        // Format responses with questions
        const formattedResponses = QUESTIONS.slice(0, -1).map((question, index) => ({
          question: question.text,
          answer: savedAnswers[`q${index + 1}`] || "No answer provided",
        }))

        // Add additional info if provided
        if (additionalInfo.trim()) {
          formattedResponses.push({
            question: "Additional Information",
            answer: additionalInfo,
          })
        }

        setSavedResponses(formattedResponses)

        // Calculate risk score
        const yesCount = Object.values(savedAnswers).filter((answer) => answer === "yes").length
        const totalQuestions = Object.keys(savedAnswers).length || 1 // Prevent division by zero

        // Calculate risk score (1-10 scale)
        const riskScore = Math.max(1, Math.min(10, Math.round((yesCount / totalQuestions) * 10)))

        // Determine priority level and recommendations
        let priority: "high" | "moderate" | "low" = "low"
        let recommendedAction = ""
        let reasoning = ""

        if (riskScore >= 7) {
          priority = "high"
          recommendedAction = "Seek immediate medical attention"
          reasoning = "Your responses indicate potentially serious symptoms that require prompt medical evaluation."
        } else if (riskScore >= 4) {
          priority = "moderate"
          recommendedAction = "Schedule an appointment soon"
          reasoning = "Your symptoms suggest the need for medical evaluation in the near future."
        } else {
          priority = "low"
          recommendedAction = "Monitor your symptoms and utilize AI tools for ongoing assessment."
          reasoning =
            "Your symptoms appear to be mild and do not indicate an urgent medical concern at this time. However, we recommend keeping track of any changes. You can use our AI-powered diagnostic tools to monitor your symptoms over time and receive updated insights. If your condition worsens or new symptoms develop, seek medical attention for further evaluation."
        }

        setAssessment({ priority, recommendedAction, reasoning, riskScore })
      } catch (error) {
        console.error("Error calculating assessment:", error)
        // Set default values if there's an error
        setAssessment({
          priority: "low",
          recommendedAction: "Please consult with a healthcare provider",
          reasoning: "Unable to calculate risk assessment",
          riskScore: 1,
        })
      }
    }

    calculateAssessment()
  }, [])

  const handleConfirm = () => {
    router.push("/dashboard")
  }

  const handleReview = () => {
    setShowResponses(!showResponses)
  }

  if (!assessment) {
    return (
      <Layout>
        <div className="text-center py-12">Loading assessment...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-12 px-4">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">Triage Assessment Confirmation</h1>

            <div
              className={`p-4 rounded-lg ${
                assessment.priority === "high"
                  ? "bg-red-50 border border-red-200"
                  : assessment.priority === "moderate"
                    ? "bg-yellow-50 border border-yellow-200"
                    : "bg-green-50 border border-green-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {assessment.priority === "high" ? (
                  <AlertCircle className="text-red-600" />
                ) : assessment.priority === "moderate" ? (
                  <AlertTriangle className="text-yellow-600" />
                ) : (
                  <CheckCircle2 className="text-green-600" />
                )}
                <h2 className="font-semibold text-lg capitalize">{assessment.priority} Priority</h2>
              </div>
              <p className="text-gray-700">Recommended Action: {assessment.recommendedAction}</p>
              <p className="text-gray-600 mt-2">
                {assessment.priority === "high"
                  ? 'Your responses suggest potentially serious symptoms that require urgent medical evaluation. Delaying care could increase health risks, so we strongly recommend consulting a healthcare professional as soon as possible. \n📍 Please click on the "Emergency Services" button in the top right corner to find nearby hospitals and emergency contact numbers.'
                  : assessment.priority === "moderate"
                    ? "Your symptoms indicate that a medical assessment is recommended in the near future. While they may not require immediate attention, timely evaluation can help prevent potential complications. You can use our AI-powered diagnostic tools to track any changes and gain additional insights while you arrange for a healthcare appointment."
                    : assessment.reasoning}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Risk Score</Label>
                  <span className="text-sm text-gray-500">{assessment.riskScore} / 10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      assessment.priority === "high"
                        ? "bg-red-500"
                        : assessment.priority === "moderate"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${(assessment.riskScore / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {showResponses && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg">Your Responses:</h3>
                {QUESTIONS.map((question, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                    <p className="font-medium text-gray-900">{question.text}</p>
                    <p className="text-gray-600">
                      {index === QUESTIONS.length - 1
                        ? savedResponses.find((r) => r.question === "Additional Information")?.answer ||
                          "No additional information provided"
                        : answers[`q${index + 1}`] || "No answer provided"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 pt-4">
              <Button onClick={handleConfirm} className="w-full" variant="default">
                Confirm and Proceed to Dashboard
              </Button>
              <Button onClick={handleReview} variant="outline" className="w-full">
                {showResponses ? "Hide My Responses" : "Review My Responses"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

