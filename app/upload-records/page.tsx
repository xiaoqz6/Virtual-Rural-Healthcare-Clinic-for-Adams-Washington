"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UploadRecords() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("File size exceeds 10MB limit.")
        setSelectedFile(null)
      } else {
        setSelectedFile(file)
        setError(null)
      }
    }
  }

  const handleManualEntry = () => {
    router.push("/medical-information")
  }

  const handleSubmit = () => {
    if (selectedFile) {
      // Handle file upload logic here
      console.log("Uploading file:", selectedFile)
      router.push("/medical-assessment")
    } else {
      setError("Please select a file to upload.")
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Upload Medical Records</CardTitle>
            <CardDescription>Please upload your medical records or enter information manually</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>
              </div>

              {selectedFile && (
                <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50">
                  <FileText className="flex-shrink-0 inline w-4 h-4 mr-3" />
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">File selected:</span> {selectedFile.name}
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">OR</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={handleManualEntry}>
                Manually Fill In Forms
              </Button>

              <Button
                className="w-full bg-[#4B82EA] hover:bg-[#3A71D9]"
                onClick={handleSubmit}
                disabled={!selectedFile}
              >
                {selectedFile ? "Upload and Continue" : "Select a File to Upload"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

