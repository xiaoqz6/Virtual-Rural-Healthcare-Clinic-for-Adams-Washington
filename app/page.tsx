import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-white">
              ADAMS HEALTH
            </Link>
            <nav className="flex gap-8">
              <Link href="/resources" className="text-white hover:text-gray-300 transition-colors">
                Resources
              </Link>
              <Link href="/emergency-services" className="text-white hover:text-gray-300 transition-colors">
                Emergency Services
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adams%20landing%20pic-XlhKsFkcFWxPrGj4FJfSMBBmvs16Kk.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-4">Adams Health AI</h1>
            <p className="text-2xl text-gray-300 mb-12">
              AI-powered dental and vision healthcare for rural communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-white bg-[#4CAF50] hover:bg-[#45a049] text-lg px-8 py-6 rounded"
              >
                <Link href="/login">I'M A PATIENT</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-white bg-[#4CAF50] hover:bg-[#45a049] text-lg px-8 py-6 rounded"
              >
                <Link href="/provider-login">I'M A HEALTHCARE PROVIDER</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-gray-700 to-gray-600 border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-white mb-8">
                Why Choose Adams County Virtual Clinic?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-12">
                {[
                  {
                    title: "Immediate Access to Care",
                    description:
                      "No more waiting or traveling hours for a dental check-up. Get an AI-powered dental exam right from your home.",
                  },
                  {
                    title: "Early Detection",
                    description:
                      "Our AI tools can identify early signs of dental issues like periodontitis, helping prevent severe pain and eating difficulties.",
                  },
                  {
                    title: "Affordable Care",
                    description:
                      "Access professional-grade diagnostics without the high costs, perfect for those without insurance.",
                  },
                  {
                    title: "Personalized Treatment Plans",
                    description: "Get tailored care recommendations based on your specific needs and health history.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 bg-gray-700 p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl"
                  >
                    <CheckCircle className="mt-1 flex-shrink-0 w-8 h-8 text-[#4CAF50]" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gray-800 shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-white mb-6">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-300 leading-relaxed text-center mb-8">
                At Adams County Virtual Clinic, we believe that everyone deserves access to high-quality dental and
                vision care, regardless of where they live. Our mission is to address these longstanding disparities by
                integrating AI-powered diagnostic tools, Large Language Models, and innovative healthcare solutions to
                enhance healthcare accessibility, improve diagnostic precision, and deliver equitable, high-quality
                care.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

