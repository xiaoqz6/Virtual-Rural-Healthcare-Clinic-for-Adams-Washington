"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const QUESTIONS = [
  { id: "q1", text: "Are you experiencing severe pain?", yes: 3, no: 0, unsure: 1 },
  { id: "q2", text: "Have you noticed any changes in your symptoms recently?", yes: 2, no: 0, unsure: 1 },
  { id: "q3", text: "Do you have any pre-existing medical conditions?", yes: 3, no: 0, unsure: 2 },
  { id: "q4", text: "Are you currently taking any medications?", yes: 2, no: 0, unsure: 1 },
  { id: "q5", text: "Have you had a fever in the past few days?", yes: 3, no: 0, unsure: 1 },
  { id: "q6", text: "Have you had unexplained weight loss or fatigue?", yes: 3, no: 0, unsure: 2 },
  {
    id: "q7",
    text: "Is there anything else you'd like to add about your condition?",
    type: "text",
  },
]

function calculateRiskScore(answers: Record<string, string>): number {
  return Object.entries(answers).reduce((score, [questionId, answer]) => {
    const question = QUESTIONS.find((q) => q.id === questionId)
    if (!question || question.type === "text") return score
    if (answer === "yes") return score + question.yes
    if (answer === "unsure") return score + question.unsure
    return score
  }, 0)
}

export default function MedicalAssessment() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState<string>("")

  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1
  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const isTextQuestion = currentQuestion.type === "text"

  const handleAnswer = (answer: string) => {
    setCurrentAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (currentAnswer) {
      const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer }
      setAnswers(newAnswers)

      if (!isLastQuestion) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCurrentAnswer("") // Reset the current answer to an empty string
      } else {
        handleSubmit(newAnswers)
      }
    }
  }

  const handleSubmit = (finalAnswers: Record<string, string>) => {
    localStorage.setItem("medicalAssessmentAnswers", JSON.stringify(finalAnswers))
    router.push("/triage-confirmation")
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Medical Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {isTextQuestion ? (
                <div className="space-y-4">
                  <Label htmlFor="additionalInfo" className="text-lg">
                    {currentQuestion.text}
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    rows={4}
                    placeholder="Feel free to provide any additional details or concerns..."
                    className="resize-none"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Label className="text-lg">{currentQuestion.text}</Label>
                  <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswer}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="unsure" />
                      <Label htmlFor="unsure">Unsure</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <p className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {QUESTIONS.length}
              </p>

              <Button
                onClick={handleNextQuestion}
                disabled={!currentAnswer}
                className="w-full"
                variant={isLastQuestion ? "default" : "default"}
              >
                {isLastQuestion ? "Submit Assessment" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

