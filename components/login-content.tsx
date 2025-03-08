"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { LogIn, UserPlus, PlayCircle } from "lucide-react"

export default function LoginContent() {
  const router = useRouter()

  const handleLogin = () => {
    // Navigate to the patient login page
    router.push("/patient-login")
  }

  return (
    <div className="mx-auto max-w-xl py-20 px-4">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardContent className="p-10 space-y-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Unlock AI-powered dental and vision diagnostics
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-md mx-auto">
              Get personalized care recommendations and access your diagnostic history anytime.
            </p>
          </div>
          <div className="space-y-6">
            <Button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <LogIn className="mr-2 h-6 w-6" />
              Log In
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full h-16 text-xl rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <Link href="/register" className="flex items-center justify-center">
                <UserPlus className="mr-2 h-6 w-6" />
                Register
              </Link>
            </Button>
            <div className="space-y-2">
              <p className="text-center text-gray-600 text-lg">
                Not ready to sign up? Try a free demo of our AI dental diagnostics.
              </p>
              <Button
                asChild
                variant="secondary"
                className="w-full h-16 text-xl rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
              >
                <Link href="/demo" className="flex items-center justify-center">
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Try Demo
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

