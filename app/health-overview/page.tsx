"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast, Toaster } from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DiagnosisReport } from "@/components/diagnosis-report"

// Mock data for diagnosis reports
const mockReports = [
  { id: 1, type: "vision" as const, date: "2025-02-15" },
  { id: 2, type: "dental" as const, date: "2025-02-20" },
]

export default function HealthOverview() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAppointmentScheduled, setIsAppointmentScheduled] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const router = useRouter()

  const availableTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F9FF] py-16">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center w-10 h-10"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-5xl font-bold tracking-tight text-[#1a1d24]">Health Overview</h1>
            <div className="w-[120px]"></div> {/* Spacer for alignment */}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Diagnosis Reports</CardTitle>
              </CardHeader>
              <CardContent>
                {mockReports.length > 0 ? (
                  mockReports.map((report) => <DiagnosisReport key={report.id} type={report.type} date={report.date} />)
                ) : (
                  <p className="text-lg text-gray-600">
                    No tests have been conducted yet. Schedule an appointment to get started.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Schedule Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border p-4"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 text-xl py-6">
                      <CalendarIcon className="mr-2 h-6 w-6" />
                      Schedule Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Schedule Appointment</DialogTitle>
                      <DialogDescription className="text-lg">
                        {selectedDate
                          ? `You're scheduling an appointment for ${selectedDate.toDateString()}`
                          : "Please select a date on the calendar"}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedDate && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-xl">
                            Select a time
                          </Label>
                          <Select onValueChange={(value) => setSelectedTime(value)}>
                            <SelectTrigger id="time" className="text-lg py-6">
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTimeSlots.map((time) => (
                                <SelectItem key={time} value={time} className="text-lg">
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          className="w-full text-xl py-6"
                          onClick={() => {
                            if (selectedTime) {
                              setIsAppointmentScheduled(true)
                              toast.success(
                                `Appointment scheduled for ${selectedDate.toDateString()} at ${selectedTime}`,
                                { duration: 5000 },
                              )
                            } else {
                              toast.error("Please select a time slot")
                            }
                          }}
                          disabled={!selectedTime}
                        >
                          Confirm Appointment
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}

