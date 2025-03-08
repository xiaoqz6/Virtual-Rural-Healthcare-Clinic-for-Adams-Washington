"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { LogIn, UserPlus } from "lucide-react"

export default function PatientLogin() {
  const router = useRouter()
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate credentials here
    router.push("/choose-input-method")
  }

  return (
    <Layout>
      <div className="mx-auto max-w-xl py-20 px-4">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
          <CardContent className="p-10 space-y-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Patient Login</h1>
              <p className="text-xl sm:text-2xl text-gray-700 max-w-md mx-auto">
                Access your personalized health dashboard and AI-powered diagnostics
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-lg text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                  className="h-14 text-lg rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
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
            <div className="text-center">
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-800 text-lg flex items-center justify-center"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

