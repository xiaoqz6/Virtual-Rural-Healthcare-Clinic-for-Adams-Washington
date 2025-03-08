"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, Loader2, Eye, Stethoscope } from "lucide-react"

// Define sets of diagnostic responses
const dentalResponses = [
  {
    condition: "mild gingivitis",
    description: "This is a reversible gum disease that can be managed with improved oral hygiene.",
    recommendation: "Focus on thorough brushing and flossing, and consider using an antiseptic mouthwash.",
  },
  {
    condition: "early-stage periodontitis",
    description: "You may experience gum recession and should seek professional evaluation.",
    recommendation: "Schedule an appointment with a dentist for a comprehensive periodontal examination.",
  },
  {
    condition: "possible tooth decay",
    description: "Early intervention can prevent further progression and more invasive treatments.",
    recommendation: "Book a dental check-up to assess the extent of decay and discuss treatment options.",
  },
  {
    condition: "enamel erosion",
    description: "This can lead to increased sensitivity and vulnerability to decay.",
    recommendation: "Use a toothpaste for sensitive teeth and consider dietary changes to reduce acid exposure.",
  },
]

const visionResponses = [
  {
    condition: "mild dry eye syndrome",
    description: "This can cause irritation and blurry vision, especially during prolonged screen use.",
    recommendation: "Try artificial tears and take regular breaks when using digital devices.",
  },
  {
    condition: "early-stage diabetic retinopathy",
    description: "This condition requires careful monitoring to prevent vision loss.",
    recommendation: "Schedule a comprehensive eye exam with an ophthalmologist specializing in diabetic eye care.",
  },
  {
    condition: "refractive error",
    description: "This could be nearsightedness, farsightedness, or astigmatism affecting your vision clarity.",
    recommendation: "Book an eye exam to determine the specific refractive error and discuss correction options.",
  },
  {
    condition: "digital eye strain",
    description: "Prolonged screen time can lead to temporary vision issues and discomfort.",
    recommendation: "Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
  },
]

function generateAIResponse(careType: string, symptoms: string) {
  const responses = careType === "dental" ? dentalResponses : visionResponses
  const keywords = symptoms.toLowerCase().split(" ")

  // Simple keyword matching
  let matchedResponse = responses.find((response) =>
    keywords.some((keyword) => response.condition.includes(keyword) || response.description.includes(keyword)),
  )

  // If no match, choose a random response
  if (!matchedResponse) {
    matchedResponse = responses[Math.floor(Math.random() * responses.length)]
  }

  return `Based on your input, it looks like you may have ${matchedResponse.condition}. ${matchedResponse.description} ${matchedResponse.recommendation}`
}

export default function DemoPage() {
  const router = useRouter()
  const [careType, setCareType] = useState<"vision" | "dental">("dental")
  const [symptoms, setSymptoms] = useState("")
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(careType, symptoms)
      setAiResponse(response)
      setStep(2)
      setLoading(false)
    }, 2000)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F9FF] py-16">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="mb-12 text-5xl font-bold tracking-tight text-[#1a1d24]">AI Diagnostic Demo</h1>

          {step === 1 && (
            <Card className="p-8">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <RadioGroup
                    defaultValue="dental"
                    onValueChange={(value) => setCareType(value as "vision" | "dental")}
                    className="flex justify-center space-x-4 mb-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dental" id="dental" />
                      <Label htmlFor="dental" className="text-xl cursor-pointer">
                        Dental Care
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vision" id="vision" />
                      <Label htmlFor="vision" className="text-xl cursor-pointer">
                        Vision Care
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="space-y-2">
                    <Label htmlFor="symptoms" className="text-xl text-gray-700">
                      Describe your {careType === "dental" ? "dental" : "vision"} symptoms
                    </Label>
                    <Input
                      id="symptoms"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder={
                        careType === "dental"
                          ? "E.g., My gums bleed when I brush my teeth"
                          : "E.g., I have trouble reading small text"
                      }
                      required
                      className="h-14 text-xl rounded-md"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 text-xl rounded-md shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Get AI Diagnosis
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <Card className="p-8 transition-shadow hover:shadow-lg">
                <div className="mb-6 flex items-center gap-4">
                  {careType === "dental" ? (
                    <Stethoscope className="h-10 w-10 text-[#4B82EA]" />
                  ) : (
                    <Eye className="h-10 w-10 text-[#4B82EA]" />
                  )}
                  <h2 className="text-3xl font-semibold">{careType === "dental" ? "Dental Care" : "Vision Care"}</h2>
                </div>
                <p className="text-xl text-gray-600 mb-6">{aiResponse}</p>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-xl font-medium text-center mb-4">
                    Sign up to use our AI Vision and Dental tools for more detailed diagnostics and personalized
                    insights!
                  </p>
                  <Button
                    onClick={() => router.push("/register")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 text-xl rounded-md shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl flex items-center justify-center"
                  >
                    Sign Up for Full Access
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

