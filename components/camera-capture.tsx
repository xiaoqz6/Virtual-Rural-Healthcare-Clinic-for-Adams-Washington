"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw, Loader } from "lucide-react"

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [cameraState, setCameraState] = useState<"loading" | "ready" | "error">("loading")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    initializeCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const initializeCamera = async (retryCount = 0) => {
    try {
      setCameraState("loading")
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setCameraState("ready")
    } catch (err) {
      console.error("Error accessing the camera", err)
      if (retryCount < 3) {
        setTimeout(() => initializeCamera(retryCount + 1), 1000)
      } else {
        setCameraState("error")
      }
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext("2d")?.drawImage(video, 0, 0)
      const imageSrc = canvas.toDataURL("image/jpeg")
      setCapturedImage(imageSrc)
      stopCamera()
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    initializeCamera()
  }

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage)
    }
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
          {cameraState === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader className="w-8 h-8 animate-spin" />
            </div>
          )}
          {cameraState === "error" && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <p>Camera access error. Please check permissions and try again.</p>
            </div>
          )}
          {!capturedImage ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${cameraState !== "ready" ? "hidden" : ""}`}
            />
          ) : (
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-white rounded-full"></div>
          </div>
        </div>
        {!capturedImage ? (
          <Button
            onClick={captureImage}
            disabled={cameraState !== "ready"}
            className="w-full py-4 bg-black text-white text-lg font-medium hover:bg-gray-900 
                       disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Capture Image
          </Button>
        ) : (
          <div className="flex justify-between">
            <Button variant="outline" onClick={retakePhoto} className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Retake
            </Button>
            <Button onClick={confirmPhoto}>Confirm</Button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Card>
  )
}

