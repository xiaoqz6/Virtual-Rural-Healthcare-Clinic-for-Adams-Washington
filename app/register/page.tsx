"use client"

import { Suspense } from "react"
import Layout from "@/components/layout"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

export default function RegisterPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-16 px-4">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
          <CardContent className="p-10">
            <h1 className="mb-8 text-4xl sm:text-5xl font-bold text-gray-900 text-center">Register for AdamsHealth</h1>
            <Suspense fallback={<div className="text-center text-xl">Loading registration form...</div>}>
              <RegistrationForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

function RegistrationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)

  useEffect(() => {
    const stepParam = searchParams.get("step")
    if (stepParam) {
      setStep(Number.parseInt(stepParam))
    }
  }, [searchParams])

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? "Basic Information" : "Document Upload"}</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#4B82EA] transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
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
              required
              placeholder="MM/DD/YYYY"
              max={new Date().toISOString().split("T")[0]}
              className="h-10 text-base rounded-md"
            />
          </div>
          <Button
            className="w-full bg-[#4B82EA] hover:bg-[#3A71D9]"
            onClick={() => router.push("/choose-input-method")}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Upload Medical Records</h2>
          <p className="text-gray-600">Please upload your medical records or enter information manually</p>
          <div className="space-y-4">
            <Input type="file" accept=".pdf,.jpg,.png" />
            <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => router.push("/upload-records")}>
              Manually Fill In Forms
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

