import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SmileIcon as Tooth, Eye, MessageSquare } from "lucide-react"
import Image from "next/image"

export default function Resources() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Title & Introduction */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Understanding the AI Behind Your Diagnosis
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              At Adams County Virtual Clinic, we prioritize transparency and trust in AI-assisted healthcare. This page
              provides detailed information on the AI-powered tools we use for dental and vision diagnostics, along with
              an explanation of our Large Language Model (LLM) that enhances patient-provider interactions.
            </p>
          </div>

          {/* Dental AI Section */}
          <Card className="mb-8 overflow-hidden bg-blue-50 border-none">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Tooth className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl text-gray-900">Dental AI: Overjet</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl mb-2">What is Overjet?</h3>
                    <p className="text-gray-600">
                      Overjet is an FDA-cleared AI system that revolutionizes dental X-ray analysis. It provides
                      dentists with powerful tools to detect and measure dental conditions with unprecedented precision.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">How it Works:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Detects dental conditions through X-rays, CT, and 3D scans</li>
                      <li>Analyzes Electronic Health Records to forecast future dental health risks</li>
                      <li>Assists dentists in treatment planning by quantifying gum disease severity</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Why It Matters for You:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Early detection of dental issues</li>
                      <li>More consistent and accurate diagnoses</li>
                      <li>Better understanding of your dental health</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen_comp_9-IJ4IkAI4XACwY57CC1x75aeVovlsOr.gif"
                  alt="Overjet AI dental analysis demonstration"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* Vision AI Section */}
          <Card className="mb-8 overflow-hidden bg-blue-50 border-none">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="order-2 md:order-1 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vision-SvffX6wBG2ujeLAdByjGoGxtgmOz0u.png"
                  alt="IDx-DR vision screening system"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl text-gray-900">Vision AI: IDx-DR</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl mb-2">What is IDx-DR?</h3>
                    <p className="text-gray-600">
                      IDx-DR is an FDA-approved AI tool that revolutionizes diabetic retinopathy screening. It enables
                      quick and accurate detection of vision problems related to diabetes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">How it Works:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Uses fundus camera to capture high-resolution retinal images</li>
                      <li>AI analyzes images for signs of diabetic retinopathy</li>
                      <li>Provides immediate classification of disease severity</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Why It Matters for You:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Early detection of vision problems</li>
                      <li>Faster screening process</li>
                      <li>Reduced need for specialist visits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* LLM Section */}
          <Card className="bg-blue-50 border-none">
            <CardHeader className="p-8">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-3xl text-gray-900">
                  How Our Large Language Model (LLM) Supports You
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                <h3 className="text-xl">What It Does:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-4">
                  <li>Provides instant answers to patient questions about symptoms, treatments, and care options</li>
                  <li>Helps healthcare providers analyze symptoms and suggest relevant clinical guidelines</li>
                  <li>Supports multilingual conversations for better accessibility</li>
                  <li>Ensures consistent and evidence-based responses to health-related queries</li>
                  <li>Maintains privacy and security while delivering personalized healthcare information</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

