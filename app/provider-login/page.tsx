"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"

export default function ProviderLogin() {
  const router = useRouter()
  const [employeeId, setEmployeeId] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate credentials here
    console.log("Employee ID:", employeeId)
    console.log("Full Name:", fullName)
    console.log("Password:", password) // Log the password (for demonstration only)
    router.push("/provider-dashboard")
  }

  return (
    <Layout isProvider={true}>
      <div className="mx-auto max-w-xl py-20 px-4">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
          <CardContent className="p-10 space-y-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Healthcare Provider Login</h1>
              <p className="text-xl sm:text-2xl text-gray-700 max-w-md mx-auto">
                Access your provider dashboard and manage patient care
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-lg text-gray-700">
                  Employee ID
                </Label>
                <Input
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter your Employee ID"
                  required
                  className="h-14 text-lg rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-lg text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-14 text-lg rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-14 text-lg rounded-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl flex items-center justify-center"
              >
                <LogIn className="mr-2 h-6 w-6" />
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

