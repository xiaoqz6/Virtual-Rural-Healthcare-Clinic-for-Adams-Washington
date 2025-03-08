"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, PhoneOff } from "lucide-react"
import { RealtimeAPI } from "@/lib/realtime-api"
import type { SpeechRecognition, SpeechRecognitionEvent } from "speech-recognition"

type Message = {
  role: "assistant" | "user"
  content: string
}

export function RealtimeAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isCallActive, setIsCallActive] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const apiRef = useRef<RealtimeAPI | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBufferSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const callIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const api = new RealtimeAPI(process.env.NEXT_PUBLIC_OPENAI_API_KEY || "", "gpt-4o-realtime-preview-2024-12-17")

    apiRef.current = api

    api
      .connect()
      .then(() => {
        console.log("Connected to Realtime API")
        api.onMessage(handleServerMessage)
      })
      .catch((error) => {
        console.error("Failed to connect:", error)
        setError(`Failed to connect to the assistant: ${error.message}`)
      })

    return () => {
      api.close()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (callIntervalRef.current) {
        clearInterval(callIntervalRef.current)
      }
    }
  }, [])

  const handleServerMessage = (data: any) => {
    console.log("Received server message:", data)
    switch (data.type) {
      case "conversation.item.created":
        if (data.item.role === "assistant") {
          setMessages((prev) => [...prev, { role: "assistant", content: "" }])
        }
        break
      case "response.text.delta":
        setMessages((prev) => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage && lastMessage.role === "assistant") {
            lastMessage.content += data.delta
          }
          return newMessages
        })
        break
      case "response.audio.delta":
        handleAudioDelta(data.delta)
        break
      case "error":
        setError(`Error: ${data.error.message}`)
        break
      default:
        console.log("Unhandled message type:", data.type)
    }
  }

  const handleAudioDelta = (base64Audio: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const audioData = atob(base64Audio)
    const arrayBuffer = new ArrayBuffer(audioData.length)
    const view = new Uint8Array(arrayBuffer)
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i)
    }

    audioContextRef.current.decodeAudioData(arrayBuffer, (buffer) => {
      if (audioBufferSourceRef.current) {
        audioBufferSourceRef.current.stop()
      }
      audioBufferSourceRef.current = audioContextRef.current!.createBufferSource()
      audioBufferSourceRef.current.buffer = buffer
      audioBufferSourceRef.current.connect(audioContextRef.current!.destination)
      audioBufferSourceRef.current.start()
    })
  }

  const startCall = () => {
    setIsCallActive(true)
    setCallDuration(0)
    callIntervalRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)
    startListening()
  }

  const endCall = () => {
    setIsCallActive(false)
    if (callIntervalRef.current) {
      clearInterval(callIntervalRef.current)
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[event.results.length - 1][0].transcript
        setMessages((prev) => [...prev, { role: "user", content: transcript }])
        apiRef.current?.sendMessage(transcript)
        apiRef.current?.createResponse()
      }

      recognitionRef.current.onerror = (event: SpeechRecognitionEvent) => {
        console.error("Speech recognition error", event.error)
        setError(`Speech recognition error: ${event.error}`)
      }

      recognitionRef.current.start()
    } else {
      setError("Speech recognition is not supported in this browser.")
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser. Please use Chrome for the best experience.")
    }
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="h-[400px] overflow-y-auto space-y-4 p-4 border rounded-md">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === "assistant" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={isCallActive ? endCall : startCall} variant={isCallActive ? "destructive" : "default"}>
              {isCallActive ? <PhoneOff className="mr-2 h-4 w-4" /> : <Phone className="mr-2 h-4 w-4" />}
              {isCallActive ? "End Call" : "Start Call"}
            </Button>
            {isCallActive && (
              <div className="flex items-center">
                <span className="text-sm font-medium">Duration: {formatDuration(callDuration)}</span>
              </div>
            )}
          </div>
          {error && <div className="text-center text-red-600">Error: {error}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

