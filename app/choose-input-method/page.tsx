"use client"

import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Mic } from "lucide-react"

export default function ChooseInputMethod() {
  const router = useRouter()

  const handleManualInput = () => {
    router.push("/upload-records")
  }

  const handleVoiceInput = () => {
    router.push("/realtime-assistant")
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F9FF] py-16">
        <div className="mx-auto max-w-2xl px-4">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Choose Input Method</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-lg text-center text-gray-700">How would you like to provide your basic information?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={handleManualInput}
                  className="h-24 text-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  <Pencil className="mr-2 h-6 w-6" />
                  Manual Input
                </Button>
                <Button
                  onClick={handleVoiceInput}
                  className="h-24 text-xl bg-green-600 hover:bg-green-700 transition-all duration-300"
                >
                  <Mic className="mr-2 h-6 w-6" />
                  Voice Input
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

