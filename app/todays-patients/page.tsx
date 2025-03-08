"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Stethoscope } from "lucide-react"
import { format } from "date-fns"

const tabs = [
  { name: "Overview", href: "/provider-dashboard", current: false },
  { name: "Today's Patients", href: "/todays-patients", current: true },
  { name: "All Patients", href: "/active-patients", current: false },
  { name: "Pending Patients", href: "/provider-dashboard/pending-patients", current: false },
  { name: "Appointments", href: "/appointments", current: false },
]

// Mock data for today's patients (combine dental and vision)
const mockTodaysPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    condition: "Dental Caries",
    status: "pending",
    case: "Dental",
    appointmentTime: "2025-08-15T09:00:00",
    report: {
      diagnosis: "Moderate dental caries with early-stage gingivitis",
      treatment: "Dental filling and professional cleaning",
      notes:
        "Patient reports increased sensitivity to cold foods. Recommend fluoride treatment and improved oral hygiene routine.",
      additionalDetails: {
        xrayFindings: "Multiple carious lesions detected on molars",
        oralHygieneStatus: "Fair, with room for improvement",
        recommendedFollowUp: "3-month check-up to monitor progress",
      },
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    condition: "Gingivitis",
    status: "completed",
    case: "Dental",
    appointmentTime: "2025-08-15T10:30:00",
    report: {
      diagnosis: "Mild gingivitis with localized inflammation",
      treatment: "Deep cleaning and improved oral hygiene instructions",
      notes:
        "Patient shows good compliance with previous recommendations. Bleeding on probing has reduced since last visit.",
      additionalDetails: {
        pocketDepths: "Mostly within normal range, few 4mm pockets",
        plaqueLevels: "Reduced from previous visit",
        homeCarePlan: "Recommended interdental brushes and saltwater rinses",
      },
    },
  },
  {
    id: 3,
    name: "Frank Miller",
    age: 63,
    condition: "Cataracts",
    status: "high-risk",
    case: "Vision",
    appointmentTime: "2025-08-15T11:00:00",
    report: {
      diagnosis: "Advanced bilateral cataracts",
      treatment: "Cataract surgery recommended for both eyes",
      notes:
        "Patient reports significant difficulty with night driving and reading. Discussed surgical options and potential outcomes.",
      additionalDetails: {
        visualAcuity: "OD: 20/70, OS: 20/80",
        intraocularPressure: "OD: 18 mmHg, OS: 19 mmHg",
        fundusExamination: "Difficult due to lens opacity",
        surgicalPlan: "Schedule right eye surgery first, followed by left eye after 2-4 weeks",
      },
    },
  },
  {
    id: 4,
    name: "Grace Taylor",
    age: 37,
    condition: "Myopia",
    status: "completed",
    case: "Vision",
    appointmentTime: "2025-08-15T13:30:00",
    report: {
      diagnosis: "Progressive myopia with mild astigmatism",
      treatment: "Updated prescription for corrective lenses",
      notes:
        "Patient concerned about increasing myopia. Discussed lifestyle factors and potential interventions to slow progression.",
      additionalDetails: {
        refraction: "OD: -4.50 -0.75 x 180, OS: -4.25 -0.50 x 175",
        axialLength: "OD: 25.2 mm, OS: 25.1 mm",
        corneaTopography: "Regular astigmatism, no signs of keratoconus",
        recommendations: "Consider orthokeratology or atropine therapy to manage myopia progression",
      },
    },
  },
  {
    id: 5,
    name: "Bob Johnson",
    age: 58,
    condition: "Periodontitis",
    status: "high-risk",
    case: "Dental",
    appointmentTime: "2025-08-15T14:00:00",
    report: {
      diagnosis: "Advanced periodontitis with bone loss",
      treatment: "Scaling and root planing, possible referral to periodontist",
      notes:
        "Patient has a history of smoking and diabetes. Emphasized importance of quitting smoking and maintaining good glycemic control.",
      additionalDetails: {
        pocketDepths: "Multiple sites with 6-8mm pockets",
        mobilityGrades: "Grade II mobility on teeth #18, #19",
        radiographicFindings: "Generalized horizontal bone loss, vertical defects on #30, #31",
        systemicConsiderations: "Coordinating care with patient's endocrinologist",
      },
    },
  },
  {
    id: 6,
    name: "Henry Clark",
    age: 55,
    condition: "Glaucoma",
    status: "pending",
    case: "Vision",
    appointmentTime: "2025-08-15T15:30:00",
    report: {
      diagnosis: "Suspected early-stage open-angle glaucoma",
      treatment: "Further tests required, possible medication",
      notes:
        "Patient has a family history of glaucoma. No noticeable vision changes reported, but optic nerve shows suspicious cupping.",
      additionalDetails: {
        intraocularPressure: "OD: 23 mmHg, OS: 24 mmHg",
        visualFieldTest: "Early superior arcuate defect in left eye",
        opticalCoherenceTomography: "RNFL thinning in both eyes, more pronounced in left eye",
        gonioscopy: "Open angles in both eyes",
        managementPlan: "Start with prostaglandin analogue drops, schedule follow-up in 6 weeks",
      },
    },
  },
]

export default function TodaysPatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof mockTodaysPatients)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "high-risk":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const today = new Date()
  const formattedDate = format(today, "MMMM d, yyyy")

  return (
    <Layout isProvider={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Today's Patients</h1>
            <p className="text-gray-600 text-xl">
              Overview of all patients scheduled for today, including dental and vision cases
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="bg-[#2A2E37]/70 rounded-xl p-1 shadow-2xl">
              <nav className="flex" aria-label="Tabs">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={cn(
                      "relative px-4 py-2 text-lg font-medium rounded-lg transition-all duration-200",
                      tab.current
                        ? "bg-black text-white shadow-lg translate-y-[-1px]"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                    {tab.current && (
                      <div
                        className="absolute inset-0 rounded-lg opacity-50"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
                        }}
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Patient List */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Today's Patient List</h2>
                <span className="text-lg text-gray-600">{formattedDate}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Age</th>
                      <th className="p-4 text-left">Condition</th>
                      <th className="p-4 text-left">Appointment Time</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Case</th>
                      <th className="p-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTodaysPatients
                      .sort((a, b) => new Date(a.appointmentTime).getTime() - new Date(b.appointmentTime).getTime())
                      .map((patient) => (
                        <tr key={patient.id} className="border-t">
                          <td className="p-4 font-medium">{patient.name}</td>
                          <td className="p-4">{patient.age}</td>
                          <td className="p-4">{patient.condition}</td>
                          <td className="p-4">
                            {new Date(patient.appointmentTime).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </td>
                          <td className="p-4">
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium",
                                getStatusBadgeClass(patient.status),
                              )}
                            >
                              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-4">{patient.case}</td>
                          <td className="p-4">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                              <Button
                                onClick={() => {
                                  setSelectedPatient(patient)
                                  setIsDialogOpen(true)
                                }}
                                variant="outline"
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Review
                              </Button>
                              <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[625px] border-2 border-gray-200 bg-white rounded-lg shadow-xl">
                                <DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4 border-b">
                                  <div className="flex items-center gap-2">
                                    <Stethoscope className="h-6 w-6 text-blue-600" />
                                    <DialogTitle className="text-2xl font-semibold">
                                      {patient?.case} Care Report
                                    </DialogTitle>
                                  </div>
                                </DialogHeader>
                                <ScrollArea className="max-h-[calc(100vh-300px)] px-6 py-4">
                                  <div className="space-y-8 pb-8">
                                    <div>
                                      <p className="text-gray-600">Date: {new Date().toISOString().split("T")[0]}</p>
                                    </div>

                                    <div>
                                      <h3 className="text-xl font-semibold mb-2">
                                        Their Condition: {patient?.condition}
                                      </h3>
                                      <p className="text-gray-700">{patient?.report.diagnosis}</p>
                                    </div>

                                    <div>
                                      <h3 className="text-lg font-semibold mb-2">How this affects them:</h3>
                                      <p className="text-gray-700">{patient?.report.notes}</p>
                                    </div>

                                    <div>
                                      <h3 className="text-lg font-semibold mb-2">Precautions:</h3>
                                      <p className="text-gray-700">
                                        Follow recommended treatment plan and maintain regular check-ups.
                                      </p>
                                    </div>

                                    <div>
                                      <h3 className="text-lg font-semibold mb-2">Long-term outlook:</h3>
                                      <p className="text-gray-700">
                                        With proper care and following the treatment plan, we expect significant
                                        improvement in your condition.
                                      </p>
                                    </div>

                                    <div>
                                      <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
                                      <ul className="space-y-4">
                                        {Object.entries(patient?.report.additionalDetails || {}).map(([key, value]) => (
                                          <li key={key}>
                                            <p className="font-medium">
                                              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                              :
                                            </p>
                                            <p className="text-gray-700">{value}</p>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div>
                                      <h3 className="text-lg font-semibold mb-2">Follow-Up Plan:</h3>
                                      <p className="text-gray-700">
                                        Schedule your next check-up in 3 months. However, if you experience any
                                        concerning symptoms, please contact us immediately.
                                      </p>
                                    </div>
                                  </div>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

