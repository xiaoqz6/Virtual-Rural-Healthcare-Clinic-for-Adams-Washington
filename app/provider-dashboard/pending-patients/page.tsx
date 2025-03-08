"use client"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "Overview", href: "/provider-dashboard", current: false },
  { name: "Today's Patients", href: "/todays-patients", current: false },
  { name: "All Patients", href: "/active-patients", current: false },
  { name: "Pending Patients", href: "/provider-dashboard/pending-patients", current: true },
  { name: "Appointments", href: "/appointments", current: false },
]

// Combined mock data for pending patients (both dental and vision)
const mockPendingPatients = [
  {
    id: 1,
    name: "John Doe",
    appointmentTime: "09:00 AM",
    age: 45,
    condition: "Dental Caries",
    case: "Dental",
    status: "pending",
  },
  {
    id: 4,
    name: "Alice Brown",
    appointmentTime: "02:00 PM",
    age: 29,
    condition: "Root Canal",
    case: "Dental",
    status: "pending",
  },
  {
    id: 6,
    name: "Eva Wilson",
    appointmentTime: "03:30 PM",
    age: 41,
    condition: "Tooth Extraction",
    case: "Dental",
    status: "pending",
  },
  {
    id: 9,
    name: "Henry Clark",
    appointmentTime: "02:30 PM",
    age: 55,
    condition: "Glaucoma",
    case: "Vision",
    status: "pending",
  },
  {
    id: 12,
    name: "Karen Lee",
    appointmentTime: "11:45 AM",
    age: 33,
    condition: "Dry Eye Syndrome",
    case: "Vision",
    status: "pending",
  },
]

export default function PendingPatientsPage() {
  const router = useRouter()

  return (
    <Layout isProvider={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Pending Patients</h1>
            <p className="text-gray-600 text-xl">Review and manage patients awaiting treatment</p>
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

          {/* Pending Patients List */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Today's Pending Patients List</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Appointment Time</th>
                      <th className="p-4 text-left">Age</th>
                      <th className="p-4 text-left">Condition</th>
                      <th className="p-4 text-left">Case</th>
                      <th className="p-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPendingPatients.map((patient) => (
                      <tr key={patient.id} className="border-t">
                        <td className="p-4 font-medium">{patient.name}</td>
                        <td className="p-4">{patient.appointmentTime}</td>
                        <td className="p-4">{patient.age}</td>
                        <td className="p-4">{patient.condition}</td>
                        <td className="p-4">{patient.case}</td>
                        <td className="p-4">
                          <Button
                            onClick={() => router.push(`/patient-review/${patient.id}`)}
                            variant="outline"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Review
                          </Button>
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

