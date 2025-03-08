"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [path, setPath] = useState<"upload" | "manual" | null>(null)

  useEffect(() => {
    const stepParam = searchParams.get("step")
    if (stepParam) {
      setStep(Number.parseInt(stepParam))
    }
  }, [searchParams])

  const totalSteps = path === "manual" ? 3 : 2

  async function handleSubmit(medicalHistory: string, symptoms: string) {
    try {
      localStorage.setItem("medicalHistory", medicalHistory)
      localStorage.setItem("currentSymptoms", symptoms)
      router.push("/realtime-assistant")
    } catch (error) {
      console.error("Error submitting medical information:", error)
    }
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span>
            {step === 1
              ? "Basic Information"
              : step === 2 && path === null
                ? "Document Upload"
                : step === 2 && path === "upload"
                  ? "Document Upload"
                  : "Medical Information"}
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#4B82EA] transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Complete Your Profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Enter your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              placeholder="YYYY/MM/DD"
              max={new Date().toISOString().split("T")[0]}
              className="h-10 text-base rounded-md"
              onChange={(e) => {
                const date = new Date(e.target.value)
                const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`
                e.target.value = formattedDate
              }}
            />
          </div>
          <Button className="w-full bg-[#4B82EA] hover:bg-[#3A71D9]" onClick={() => setStep(2)}>
            Continue
          </Button>
        </div>
      )}

      {step === 2 && path === null && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Upload Medical Records</h2>
          <p className="text-gray-600">Please upload your medical records or enter information manually</p>
          <div className="space-y-4">
            <Input type="file" accept=".pdf,.jpg,.png" onChange={() => setPath("upload")} />
            <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPath("manual")
                setStep(3)
              }}
            >
              Manually Fill In Forms
            </Button>
          </div>
          {path === "upload" && <Button className="w-full bg-[#4B82EA] hover:bg-[#3A71D9]">Submit</Button>}
        </div>
      )}

      {step === 3 && path === "manual" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Medical Information</h2>
          <div className="space-y-2">
            <Label htmlFor="history">Medical History</Label>
            <Textarea
              id="history"
              placeholder="Please list any pre-existing medical conditions, medications, allergies, or previous surgeries"
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="symptoms">Current Symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="Please describe your current symptoms in detail"
              className="min-h-[150px]"
            />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setStep(2)
              setPath(null)
            }}
          >
            Back
          </Button>
          <Button
            className="w-full bg-[#4B82EA] hover:bg-[#3A71D9]"
            onClick={() => {
              const historyInput = document.getElementById("history") as HTMLTextAreaElement
              const symptomsInput = document.getElementById("symptoms") as HTMLTextAreaElement
              handleSubmit(historyInput.value, symptomsInput.value)
            }}
          >
            Submit
          </Button>
        </div>
      )}
    </>
  )
}

