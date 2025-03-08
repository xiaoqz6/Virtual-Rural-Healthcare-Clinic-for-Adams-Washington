"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"
import { RiskMeter } from "@/components/risk-meter"

type MedicalAnalysis = {
  initialAssessment: string
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

export default function TriageResults() {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<MedicalAnalysis | null>(null)

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("medicalAssessmentAnalysis")
    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis))
    }
  }, [])

  const handleConfirm = () => {
    router.push("/dashboard")
  }

  const handleReview = () => {
    router.push("/medical-assessment")
  }

  if (!analysis) {
    return <div className="text-center py-12">Loading assessment...</div>
  }

  return (
    <div className="mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Your Health Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`p-4 rounded-lg ${
              analysis.priority === "high"
                ? "bg-red-50 border border-red-200"
                : analysis.priority === "moderate"
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-green-50 border border-green-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {analysis.priority === "high" ? (
                <AlertCircle className="text-red-600" />
              ) : analysis.priority === "moderate" ? (
                <AlertTriangle className="text-yellow-600" />
              ) : (
                <CheckCircle2 className="text-green-600" />
              )}
              <h2 className="font-semibold text-lg">
                {analysis.priority === "high"
                  ? "High Priority"
                  : analysis.priority === "moderate"
                    ? "Moderate Priority"
                    : "Low Priority"}
              </h2>
            </div>
            <p className="text-gray-700 font-medium">Recommended Action:</p>
            <p className="text-gray-600 mt-1">{analysis.recommendedAction}</p>
          </div>

          <RiskMeter score={analysis.riskScore} />

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Initial Assessment</h3>
            <p className="text-gray-600">{analysis.initialAssessment}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Risk Factors</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Pain Level: {analysis.riskFactors.painLevel}</li>
              <li>Bleeding: {analysis.riskFactors.bleeding}</li>
              <li>Fever: {analysis.riskFactors.fever}</li>
              <li>Chronic Conditions: {analysis.riskFactors.chronicConditions}</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Personalized Advice</h3>
            <p className="text-gray-600">{analysis.personalizedAdvice}</p>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              onClick={handleConfirm}
              className="w-full"
              variant={analysis.priority === "high" ? "destructive" : "default"}
            >
              Confirm and Proceed to Dashboard
            </Button>
            <Button onClick={handleReview} variant="outline" className="w-full">
              Review My Responses
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

