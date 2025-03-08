"use client"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mic, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function RealtimeAssistantPage() {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
  })

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "userInfo") {
        setUserInfo(event.data.userInfo)
        localStorage.setItem("userInfo", JSON.stringify(event.data.userInfo))
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(() => {
    const audioPlayed = localStorage.getItem("realtimeAssistantAudioPlayed")

    if (!audioPlayed) {
      // Create audio instance
      const audio = new Audio(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/introduction%20voice%20assistant-pXcmOeAiRFCowWbqMAicOWrQk7T1QF.mp3",
      )

      // Play audio
      const playAudio = async () => {
        try {
          await audio.play()
          localStorage.setItem("realtimeAssistantAudioPlayed", "true")
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

  const handleSubmit = () => {
    router.push("/dashboard")
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F9FF] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-600">Virtual Health Assistant</h1>

          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center">
                <Mic className="w-6 h-6 mr-2 text-blue-500" />
                Provide Your Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base">
                <li>Click the microphone icon in the chat below to begin speaking.</li>
                <li>Provide your information as requested by the assistant.</li>
                <li>The assistant will confirm the information it has recorded.</li>
                <li>You can correct any mistakes by speaking again.</li>
                <li>Once you've completed providing your information, click the "Submit" button below.</li>
              </ol>
            </CardContent>
          </Card>

          <div className="w-full h-[400px] sm:h-[500px] mb-6 rounded-lg overflow-hidden shadow-md">
            <iframe
              src={`https://app.millis.ai/agents/embedded?id=-OJByf2wgsEa1DG46FKi&k=4MwIyTlYMeEZwtLelQelob7nmILWacuY&c=eJxlkN9qwyAUxl9FhEECSaqhyVZ72Ufo7W5MdFZmj0FP6Fjpu%2B%2BEjIVREOH7%2FPydP3eOHoPNXN35GAHsiB4cV%2Fz0J5qm4RX3Jliyz6gTkkwzwBo8Y5z4gwL0%2FRmDegg2KRMxb5CPV3X14z%2FKatU56HxZaMOMGOGU8%2FLmAxKDmRSnOl%2B0ibdCMMHabvpiyQ26kP2BVMtke2A71omXsjy%2Bw6DHT5fiDKb2V%2B2sYsGD1al2SRtvAQspO2NdtUCKfc%2FWs2NSEOHJfWt%2FsTGZpR1J1XMM3qw9tF1Xse0STbsvjzTj1gWNQjr7b9qB7EXFMWnIY%2FITcoVptrQQ63wECs65vtmM%2FPEDUymAhw%3D%3D&onUserInfoCapture=${encodeURIComponent(`
  (userInfo) => {
    window.parent.postMessage({ type: 'userInfo', userInfo }, '*');
  }
`)}`}
              width="100%"
              height="100%"
              allow="microphone"
            ></iframe>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg py-4 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl flex items-center"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Submit and Continue to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

