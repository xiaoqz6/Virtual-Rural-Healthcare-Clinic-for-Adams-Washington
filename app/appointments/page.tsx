"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"

// Add types for appointments
type AppointmentStatus = "pending" | "confirmed" | "completed" | "canceled"
type Appointment = {
  id: number
  patientName: string
  time: string
  date: string
  condition: string
  status: AppointmentStatus
  caseType: "Dental" | "Vision"
}

// Add mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "John Doe",
    time: "09:00 AM",
    date: "2025-02-21",
    condition: "Dental Caries",
    status: "pending",
    caseType: "Dental",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    time: "10:30 AM",
    date: "2025-02-21",
    condition: "Myopia",
    status: "confirmed",
    caseType: "Vision",
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    time: "11:15 AM",
    date: "2025-02-21",
    condition: "Periodontitis",
    status: "completed",
    caseType: "Dental",
  },
  {
    id: 4,
    patientName: "Alice Brown",
    time: "02:00 PM",
    date: "2025-02-21",
    condition: "Astigmatism",
    status: "pending",
    caseType: "Vision",
  },
  {
    id: 5,
    patientName: "Charlie Davis",
    time: "03:30 PM",
    date: "2025-02-21",
    condition: "Root Canal",
    status: "confirmed",
    caseType: "Dental",
  },
]

// Add available time slots
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
]

const tabs = [
  { name: "Overview", href: "/provider-dashboard", current: false },
  { name: "Today's Patients", href: "/todays-patients", current: false },
  { name: "All Patients", href: "/active-patients", current: false },
  { name: "Pending Patients", href: "/provider-dashboard/pending-patients", current: false },
  { name: "Appointments", href: "/appointments", current: true },
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [appointments, setAppointments] = useState(mockAppointments)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setIsCalendarDialogOpen(false)
  }

  const getStatusBadge = (status: AppointmentStatus) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      canceled: "bg-red-100 text-red-800",
    }
    return styles[status]
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalOpen(true)
  }

  const handleStatusChange = (newStatus: AppointmentStatus) => {
    if (selectedAppointment) {
      setAppointments(
        appointments.map((apt) => (apt.id === selectedAppointment.id ? { ...apt, status: newStatus } : apt)),
      )
      toast.success(`Appointment status updated to ${newStatus}`)
      setIsDetailsModalOpen(false)
    }
  }

  const handleReschedule = () => {
    if (selectedAppointment && selectedTimeSlot) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === selectedAppointment.id ? { ...apt, time: selectedTimeSlot, status: "pending" } : apt,
        ),
      )
      toast.success("Appointment rescheduled and status updated to pending")
      setIsRescheduleModalOpen(false)
      setIsDetailsModalOpen(false)
    }
  }

  const handleCancel = () => {
    if (selectedAppointment && cancelReason) {
      setAppointments(
        appointments.map((apt) => (apt.id === selectedAppointment.id ? { ...apt, status: "canceled" } : apt)),
      )
      toast.success("Appointment canceled")
      setIsCancelModalOpen(false)
      setIsDetailsModalOpen(false)
      setCancelReason("")
    }
  }

  const isToday = (dateStr: string) => {
    const today = new Date()
    const appointmentDate = new Date(dateStr)
    return (
      today.getDate() === appointmentDate.getDate() &&
      today.getMonth() === appointmentDate.getMonth() &&
      today.getFullYear() === appointmentDate.getFullYear()
    )
  }

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

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-black mb-4">Appointments for February</h2>
            <Button variant="outline" className="bg-white hover:bg-gray-50 text-lg text-black border-gray-300">
              <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
              {date ? format(date, "MMMM d, yyyy") : "Select a date"}
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-black mb-4">February 2025</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="mx-auto"
              classNames={{
                day_today: "bg-blue-100 text-black font-bold",
                day: "text-black hover:bg-blue-50",
              }}
              modifiers={{
                hasAppointment: (date) => appointments.some((apt) => apt.date === format(date, "yyyy-MM-dd")),
              }}
              modifiersClassNames={{
                hasAppointment: "bg-green-100 font-semibold",
              }}
            />
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-black">
              Appointments for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
            </h3>
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 text-lg font-semibold text-black">Patient Name</th>
                      <th className="pb-2 text-lg font-semibold text-black">Time</th>
                      <th className="pb-2 text-lg font-semibold text-black">Condition</th>
                      <th className="pb-2 text-lg font-semibold text-black">Status</th>
                      <th className="pb-2 text-lg font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments
                      .filter((appointment) => appointment.date === format(date || new Date(), "yyyy-MM-dd"))
                      .map((appointment) => (
                        <tr key={appointment.id} className="border-b last:border-0">
                          <td className="py-3 text-lg text-black">{appointment.patientName}</td>
                          <td className="py-3 text-lg text-black">{appointment.time}</td>
                          <td className="py-3 text-lg text-black">{appointment.condition}</td>
                          <td className="py-3">
                            <Badge className={cn(getStatusBadge(appointment.status), "text-lg font-semibold")}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAppointmentClick(appointment)}
                              className="text-blue-600 hover:text-blue-800 border-blue-600 hover:border-blue-800"
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </div>

          {/* Appointment Details Modal */}
          <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
              </DialogHeader>
              {selectedAppointment && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Patient Name</Label>
                    <div className="font-medium">{selectedAppointment.patientName}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Appointment Time</Label>
                    <div className="font-medium">{selectedAppointment.time}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <div className="font-medium capitalize">{selectedAppointment.status}</div>
                  </div>
                  <div className="flex justify-end gap-2">
                    {selectedAppointment.status === "completed" ? (
                      <Button asChild>
                        <Link href={`/patient-review/${selectedAppointment.id}`}>View Report</Link>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsDetailsModalOpen(false)
                            setIsRescheduleModalOpen(true)
                          }}
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            setIsDetailsModalOpen(false)
                            setIsCancelModalOpen(true)
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Reschedule Modal */}
          <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reschedule Appointment</DialogTitle>
                <DialogDescription>Select a new time slot for this appointment</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Available Time Slots</Label>
                  <Select onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRescheduleModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReschedule} disabled={!selectedTimeSlot}>
                  Confirm Reschedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Cancel Modal */}
          <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogDescription>Please provide a reason for canceling this appointment</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Cancellation Reason</Label>
                  <Textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Enter the reason for cancellation..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCancelModalOpen(false)}>
                  Back
                </Button>
                <Button variant="destructive" onClick={handleCancel} disabled={!cancelReason}>
                  Confirm Cancellation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  )
}

