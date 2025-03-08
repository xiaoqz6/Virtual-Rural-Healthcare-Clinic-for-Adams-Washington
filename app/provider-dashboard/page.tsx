"use client"

import Layout from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Users, Activity, CheckSquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "Overview", href: "/provider-dashboard", current: true },
  { name: "Today's Patients", href: "/todays-patients", current: false },
  { name: "All Patients", href: "/active-patients", current: false },
  { name: "Pending Patients", href: "/provider-dashboard/pending-patients", current: false },
  { name: "Appointments", href: "/appointments", current: false },
]

export default function ProviderDashboard() {
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

          {/* Metrics Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/todays-patients" className="block">
              <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-medium text-xl">Total Patients Today</h3>
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-7xl font-bold text-gray-900 mb-2">28</p>
                  <p className="text-green-600 text-lg font-medium">+4 from yesterday</p>
                </div>
              </Card>
            </Link>

            <Link href="/provider-dashboard/pending-patients" className="block">
              <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-medium text-xl">Pending Patients</h3>
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-7xl font-bold text-gray-900 mb-2">15</p>
                  <p className="text-gray-600 text-lg">Awaiting treatment</p>
                </div>
              </Card>
            </Link>

            <Link href="/active-patients" className="block">
              <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-medium text-xl">Completed Patients</h3>
                    <CheckSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-7xl font-bold text-gray-900 mb-2">13</p>
                  <p className="text-gray-600 text-lg">Treatments finished today</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

