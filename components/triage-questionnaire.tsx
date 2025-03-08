"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

type Question = {
  id: string
  text: string
  weight: number
}

export function TriageQuestionnaire() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [riskScore, setRiskScore] = useState(0)
  const router = useRouter()

  const fetchQuestions = async () => {
    const response = await fetch("/api/triage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medicalHistory: ["heart_disease", "diabetes"], // This should be dynamic based on user's actual medical history
        answers,
      }),
    })
    const data = await response.json()
    setQuestions(data.questions)
  }

  useEffect(() => {
    fetchQuestions()
  }, [answers]) // Added answers to the dependency array

  const calculateRiskScore = (newAnswers: Record<string, string>) => {
    return questions.reduce((score, question) => {
      return score + (newAnswers[question.id] === "yes" ? question.weight : 0)
    }, 0)
  }

  const handleAnswer = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    // Update risk score
    const newRiskScore = calculateRiskScore(newAnswers)
    setRiskScore(newRiskScore)

    // Fetch new questions based on the updated answers
    await fetchQuestions()

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Determine priority level
      let priorityLevel = "Low"
      if (newRiskScore >= 7) {
        priorityLevel = "High"
      } else if (newRiskScore >= 4) {
        priorityLevel = "Moderate"
      }

      // Navigate to results page
      router.push(`/triage-results?score=${newRiskScore}&priority=${priorityLevel}`)
    }
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Health Triage Questionnaire</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <Label>{currentQuestion.text}</Label>
            <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion.id]}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mt-4">
            <p>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p>Current Risk Score: {riskScore}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

