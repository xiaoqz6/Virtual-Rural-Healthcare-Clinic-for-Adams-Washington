"use client"

import { useEffect } from "react"
import Layout from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Eye, Stethoscope, Activity, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  useEffect(() => {
    const audioPlayed = localStorage.getItem("dashboardAudioPlayed")

    if (!audioPlayed) {
      // Create audio instance
      const audio = new Audio(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Introduction%20patient%20dashboard-6CUyl3VEo69tlFTMubSmIwtlb5RXOS.mp3",
      )

      // Play audio
      const playAudio = async () => {
        try {
          await audio.play()
          localStorage.setItem("dashboardAudioPlayed", "true")
        } catch (error) {
          console.error("Error playing audio:", error)
        }
      }

      playAudio()

      // Cleanup function
      return () => {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, []) // Empty dependency array means this runs once on mount

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="mb-12 text-4xl font-bold tracking-tight text-white">Welcome to Your Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/vision-care" className="block">
              <Card
                className="h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gray-800 text-white relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-16%2019.02.41%20-%20A%20minimalistic,%20high-quality%20digital%20illustration%20of%20a%20human%20eye%20with%20a%20futuristic,%20technology-inspired%20touch.%20The%20design%20features%20clean%20gradients,%20so-0rScrDEs9R2qtc4690mcC6vJSZoSmT.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gray-900/80 hover:bg-gray-900/70 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-blue-900 p-3">
                      <Eye className="h-6 w-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Vision Care</h2>
                  </div>
                  <p className="text-lg text-gray-300">View your vision care history and upcoming appointments</p>
                </div>
              </Card>
            </Link>

            <Link href="/dental-care" className="block">
              <Card
                className="h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gray-800 text-white relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-16%2019.03.09%20-%20A%20minimalistic,%20high-quality%20digital%20illustration%20of%20a%20tooth%20with%20a%20futuristic,%20technology-inspired%20design.%20The%20image%20features%20clean%20gradients,%20soft%20l-zgxXfTtXuFKw07b29gMpusxC1hHTdY.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gray-900/80 hover:bg-gray-900/70 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-blue-900 p-3">
                      <Stethoscope className="h-6 w-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Dental Care</h2>
                  </div>
                  <p className="text-lg text-gray-300">Access your dental records and treatment plans</p>
                </div>
              </Card>
            </Link>

            <Link href="/health-overview" className="block">
              <Card
                className="h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gray-800 text-white relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-16%2019.08.42%20-%20A%20minimalistic,%20high-quality%20digital%20illustration%20of%20a%20futuristic%20heart%20rate%20or%20health%20monitoring%20symbol.%20The%20design%20features%20clean%20gradients,%20soft%20li-w0g5AXMRQY48bYSoefGoJT4QY1H1ED.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gray-900/80 hover:bg-gray-900/70 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-green-900 p-3">
                      <Activity className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Health Overview</h2>
                  </div>
                  <p className="text-lg text-gray-300">Track your overall health status and medical history</p>
                </div>
              </Card>
            </Link>

            <Link href="/ai-chatbot" className="block">
              <Card
                className="h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gray-800 text-white relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-02-16%2019.08.47%20-%20A%20minimalistic,%20high-quality%20digital%20illustration%20of%20an%20AI-powered%20chatbot%20icon%20with%20a%20futuristic,%20technology-inspired%20design.%20The%20image%20features%20clea-M5EYSjyhOtAdEKLtB2XPfAsjm0GBUK.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gray-900/80 hover:bg-gray-900/70 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-blue-900 p-3">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">AI Chatbot</h2>
                  </div>
                  <p className="text-lg text-gray-300">Get instant answers to your health-related questions</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

