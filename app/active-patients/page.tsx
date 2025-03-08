"use client"

import { useState, useEffect, useCallback } from "react"
import Layout from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smile, Eye } from "lucide-react"

// Navigation tabs configuration
const tabs = [
  { name: "Overview", href: "/provider-dashboard", current: false },
  { name: "Today's Patients", href: "/todays-patients", current: false },
  { name: "All Patients", href: "/active-patients", current: true },
  { name: "Pending Patients", href: "/provider-dashboard/pending-patients", current: false },
  { name: "Appointments", href: "/appointments", current: false },
]

// Mock data for dental patients
const mockDentalPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    condition: "Dental Caries",
    status: "pending",
    case: "Dental",
    appointmentTime: "2025-08-15T09:00:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    condition: "Gingivitis",
    status: "completed",
    case: "Dental",
    appointmentTime: "2025-08-15T10:30:00",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 58,
    condition: "Periodontitis",
    status: "high-risk",
    case: "Dental",
    appointmentTime: "2025-08-15T14:00:00",
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 29,
    condition: "Root Canal",
    status: "pending",
    case: "Dental",
    appointmentTime: "2025-08-16T11:15:00",
  },
  {
    id: 5,
    name: "Charlie Davis",
    age: 52,
    condition: "Dental Crown",
    status: "completed",
    case: "Dental",
    appointmentTime: "2025-08-16T15:45:00",
  },
  {
    id: 6,
    name: "Eva Wilson",
    age: 41,
    condition: "Tooth Extraction",
    status: "pending",
    case: "Dental",
    appointmentTime: "2025-08-17T13:30:00",
  },
]

// Mock data for vision patients
const mockVisionPatients = [
  {
    id: 1,
    name: "Frank Miller",
    age: 63,
    condition: "Cataracts",
    status: "high-risk",
    case: "Vision",
    appointmentTime: "2025-08-18T10:00:00",
  },
  {
    id: 2,
    name: "Grace Taylor",
    age: 37,
    condition: "Myopia",
    status: "completed",
    case: "Vision",
    appointmentTime: "2025-08-18T11:30:00",
  },
  {
    id: 3,
    name: "Henry Clark",
    age: 55,
    condition: "Glaucoma",
    status: "pending",
    case: "Vision",
    appointmentTime: "2025-08-19T14:30:00",
  },
  {
    id: 4,
    name: "Ivy Anderson",
    age: 48,
    condition: "Astigmatism",
    status: "completed",
    case: "Vision",
    appointmentTime: "2025-08-19T13:15:00",
  },
  {
    id: 5,
    name: "Jack White",
    age: 70,
    condition: "Macular Degeneration",
    status: "high-risk",
    case: "Vision",
    appointmentTime: "2025-08-20T16:00:00",
  },
  {
    id: 6,
    name: "Karen Lee",
    age: 33,
    condition: "Dry Eye Syndrome",
    status: "pending",
    case: "Vision",
    appointmentTime: "2025-08-20T09:45:00",
  },
]

export default function ActivePatientsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dental")
  const [timeFilter, setTimeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [filteredPatients, setFilteredPatients] = useState(mockDentalPatients)

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

  const applyFilters = useCallback(() => {
    let patients = activeTab === "dental" ? mockDentalPatients : mockVisionPatients

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date()
      patients = patients.filter((patient) => {
        const appointmentDate = new Date(patient.appointmentTime)
        switch (timeFilter) {
          case "today":
            return appointmentDate.toDateString() === now.toDateString()
          case "7days":
            return (now.getTime() - appointmentDate.getTime()) / (1000 * 3600 * 24) <= 7
          case "1month":
            return (now.getTime() - appointmentDate.getTime()) / (1000 * 3600 * 24) <= 30
          case "2months":
            return (now.getTime() - appointmentDate.getTime()) / (1000 * 3600 * 24) <= 60
          case "year":
            return appointmentDate.getFullYear() === now.getFullYear()
          default:
            return true
        }
      })
    }

    // Apply status filter
    if (statusFilter !== "all") {
      patients = patients.filter((patient) => patient.status === statusFilter)
    }

    // Apply sorting
    patients.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "age":
          return a.age - b.age
        case "appointmentTime":
          return new Date(a.appointmentTime).getTime() - new Date(b.appointmentTime).getTime()
        default:
          return 0
      }
    })

    setFilteredPatients(patients)
  }, [activeTab, timeFilter, statusFilter, sortBy])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  return (
    <Layout isProvider={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
            <p className="text-gray-600 text-xl">
              AI-powered diagnostic tools for dental and vision healthcare in Adams County
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

          {/* Case Type Tabs */}
          <div className="flex gap-4 mb-8">
            <Button
              variant={activeTab === "dental" ? "default" : "outline"}
              onClick={() => setActiveTab("dental")}
              className={cn(
                "text-lg py-6 px-8 flex items-center gap-2",
                activeTab === "dental"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-900 hover:bg-gray-100",
              )}
            >
              <Smile className="h-5 w-5" />
              Dental Cases
            </Button>
            <Button
              variant={activeTab === "vision" ? "default" : "outline"}
              onClick={() => setActiveTab("vision")}
              className={cn(
                "text-lg py-6 px-8 flex items-center gap-2",
                activeTab === "vision"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-900 hover:bg-gray-100",
              )}
            >
              <Eye className="h-5 w-5" />
              Vision Cases
            </Button>
          </div>

          {/* Case Management Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Case Management</h2>
              <div className="flex gap-4 items-center">
                <Select onValueChange={(value) => setTimeFilter(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7days">Past 7 Days</SelectItem>
                    <SelectItem value="1month">Past 1 Month</SelectItem>
                    <SelectItem value="2months">Past 2 Months</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setStatusFilter(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="high-risk">High Risk</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="age">Age</SelectItem>
                    <SelectItem value="appointmentTime">Appointment Time</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="default"
                  className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={applyFilters}
                >
                  Apply Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Patient List */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Patient List</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Age</th>
                      <th className="p-4 text-left">Condition</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Case</th>
                      <th className="p-4 text-left">Appointment Date & Time</th>
                      <th className="p-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="border-t">
                        <td className="p-4 font-medium">{patient.name}</td>
                        <td className="p-4">{patient.age}</td>
                        <td className="p-4">{patient.condition}</td>
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
                        <td className="p-4">{new Date(patient.appointmentTime).toLocaleString()}</td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => router.push(`/patient-review/${patient.id}`)}
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

