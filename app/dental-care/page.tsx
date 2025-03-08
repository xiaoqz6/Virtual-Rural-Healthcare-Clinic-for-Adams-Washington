"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, ArrowLeft } from "lucide-react"
import { DiagnosisReport } from "@/components/diagnosis-report"
import { CameraCapture } from "@/components/camera-capture"

export default function DentalCare() {
  const [diagnosisState, setDiagnosisState] = useState<"idle" | "camera" | "in-progress" | "complete">("idle")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (diagnosisState === "in-progress") {
      const timer = setTimeout(() => {
        setDiagnosisState("complete")
      }, 5000) // 5 seconds for the animation
      return () => clearTimeout(timer)
    }
  }, [diagnosisState])

  const startDiagnosis = () => {
    setDiagnosisState("camera")
  }

  const handleImageCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc)
    setDiagnosisState("in-progress")
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F9FF]">
        <div className="mx-auto max-w-7xl p-8">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center w-10 h-10 text-gray-800 hover:bg-gray-100"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-4xl font-bold tracking-tight text-[#1a1d24]">Dental Care</h1>
            <div className="w-[120px]"></div> {/* Spacer for alignment */}
          </div>

          <Card className="p-6">
            {diagnosisState === "idle" && (
              <div className="text-center">
                <Stethoscope className="mx-auto h-24 w-24 text-[#4B82EA] mb-4" />
                <h2 className="text-2xl font-semibold mb-4">AI-Powered Dental Diagnosis</h2>
                <p className="mb-4">Click the button below to start your AI-powered dental diagnosis.</p>
                <Button onClick={startDiagnosis}>Start Diagnosis</Button>
              </div>
            )}

            {diagnosisState === "camera" && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Capture Dental Image</h2>
                <p className="mb-4">Please take a clear photo of your teeth and gums for analysis.</p>
                <CameraCapture onCapture={handleImageCapture} />
              </div>
            )}

            {diagnosisState === "in-progress" && (
              <div className="text-center">
                <div className="relative mx-auto h-48 w-48 mb-4">
                  <div className="absolute inset-0 border-4 border-[#4B82EA] rounded-full animate-ping"></div>
                  <Stethoscope className="absolute inset-0 h-full w-full text-[#4B82EA] animate-pulse" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Diagnosis in progress...</h2>
                <p>Our AI is analyzing your dental health. This may take a few moments.</p>
              </div>
            )}

            {diagnosisState === "complete" && (
              <div className="text-center">
                <Stethoscope className="mx-auto h-24 w-24 text-[#4CAF50] mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Diagnosis Complete</h2>
                <p className="mb-4">Here's your dental diagnosis report, you can still view this in Health Overview:</p>
                <DiagnosisReport type="dental" date={new Date().toISOString().split("T")[0]} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  )
}

