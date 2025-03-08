"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

type Question = {
  id: string
  text: string
}

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

export function MedicalAssessment() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<MedicalAnalysis | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [currentAnswer, setCurrentAnswer] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchInitialAnalysis = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/medical-assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicalHistory: localStorage.getItem("medicalHistory") || "",
            symptoms: localStorage.getItem("currentSymptoms") || "",
          }),
        })
        const data: MedicalAnalysis = await response.json()
        setAnalysis(data)
        setQuestions(data.followUpQuestions.map((q, index) => ({ id: `q${index}`, text: q })))
      } catch (error) {
        console.error("Error fetching analysis:", error)
      }
      setLoading(false)
    }

    fetchInitialAnalysis()
  }, [])

  useEffect(() => {
    // Reset the current answer when moving to a new question
    setCurrentAnswer(undefined)
  }, [currentQuestionIndex])

  const handleAnswer = (answer: string) => {
    setCurrentAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (currentAnswer) {
      const currentQuestion = questions[currentQuestionIndex]
      const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer }
      setAnswers(newAnswers)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        submitAssessment(newAnswers)
      }
    }
  }

  const submitAssessment = async (finalAnswers: Record<string, string>) => {
    setLoading(true)
    try {
      const response = await fetch("/api/medical-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicalHistory: localStorage.getItem("medicalHistory") || "",
          symptoms: localStorage.getItem("currentSymptoms") || "",
          previousAnswers: finalAnswers,
        }),
      })
      const data: MedicalAnalysis = await response.json()
      setAnalysis(data)
      setQuestions(data.followUpQuestions.map((q, index) => ({ id: `q${index}`, text: q })))
      setCurrentQuestionIndex(0)
      setCurrentAnswer(undefined)
    } catch (error) {
      console.error("Error fetching updated analysis:", error)
    }
    setLoading(false)
  }

  const handleSubmit = () => {
    localStorage.setItem("medicalAssessmentAnswers", JSON.stringify(answers))
    localStorage.setItem("medicalAssessmentAdditionalInfo", additionalInfo)
    localStorage.setItem("medicalAssessmentAnalysis", JSON.stringify(analysis))
    router.push("/triage-results")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Analyzing your medical information...</span>
      </div>
    )
  }

  if (!analysis) {
    return <div>Error loading medical assessment. Please try again.</div>
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Medical Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        {currentQuestionIndex < questions.length ? (
          <form className="space-y-4">
            <Label className="text-lg">{currentQuestion.text}</Label>
            <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
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
            <p className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <Button onClick={handleNextQuestion} disabled={!currentAnswer} className="w-full">
              {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next Question"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <Label htmlFor="additionalInfo" className="text-lg">
              Is there anything else you'd like to add about your condition?
            </Label>
            <Textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
              placeholder="Feel free to provide any additional details or concerns..."
            />
            <Button onClick={handleSubmit} className="w-full">
              Submit Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

