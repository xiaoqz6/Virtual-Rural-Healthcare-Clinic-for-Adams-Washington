"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function MedicalInformation() {
  const router = useRouter()
  const [medicalHistory, setMedicalHistory] = useState({
    chronicConditions: "",
    pastSurgeries: "",
    allergies: "",
    currentMedications: "",
  })
  const [currentSymptoms, setCurrentSymptoms] = useState("")

  const handleSubmit = () => {
    console.log("Medical History:", medicalHistory)
    console.log("Current Symptoms:", currentSymptoms)
    router.push("/medical-assessment")
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-12">
        <Card className="border-0 shadow-none">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Medical Information</h1>
                <Button variant="outline" onClick={() => router.push("/upload-records")} className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Medical History</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="chronic-conditions">Do you have any chronic medical conditions?</Label>
                      <Input
                        id="chronic-conditions"
                        value={medicalHistory.chronicConditions}
                        onChange={(e) => setMedicalHistory({ ...medicalHistory, chronicConditions: e.target.value })}
                        placeholder="E.g., diabetes, hypertension, asthma"
                      />
                    </div>
                    <div>
                      <Label htmlFor="past-surgeries">Have you had any past surgeries?</Label>
                      <Input
                        id="past-surgeries"
                        value={medicalHistory.pastSurgeries}
                        onChange={(e) => setMedicalHistory({ ...medicalHistory, pastSurgeries: e.target.value })}
                        placeholder="E.g., appendectomy in 2018, knee replacement in 2020"
                      />
                    </div>
                    <div>
                      <Label htmlFor="allergies">Do you have any allergies?</Label>
                      <Input
                        id="allergies"
                        value={medicalHistory.allergies}
                        onChange={(e) => setMedicalHistory({ ...medicalHistory, allergies: e.target.value })}
                        placeholder="E.g., penicillin, peanuts, latex"
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-medications">Are you currently taking any medications?</Label>
                      <Input
                        id="current-medications"
                        value={medicalHistory.currentMedications}
                        onChange={(e) => setMedicalHistory({ ...medicalHistory, currentMedications: e.target.value })}
                        placeholder="E.g., lisinopril 10mg daily, metformin 500mg twice daily"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Current Symptoms</h2>
                  <Textarea
                    value={currentSymptoms}
                    onChange={(e) => setCurrentSymptoms(e.target.value)}
                    placeholder="Please describe your current symptoms in detail"
                    className="min-h-[150px]"
                  />
                </div>

                <Button className="w-full bg-[#4B82EA] hover:bg-[#3A71D9]" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

