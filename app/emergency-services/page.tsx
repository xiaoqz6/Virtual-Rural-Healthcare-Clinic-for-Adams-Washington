import Layout from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Phone, MapPin } from "lucide-react"

export default function EmergencyServices() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl py-12">
        <h1 className="mb-4 text-center text-5xl font-bold tracking-tight text-red-600">
          Emergency Services Assistance
        </h1>
        <p className="mb-12 text-center text-2xl text-gray-600">We&apos;re here to guide you in urgent situations.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-8 w-8 text-[#DC3545]" />
                <h2 className="text-2xl font-semibold text-[#DC3545]">Emergency Hotline</h2>
              </div>
              <p className="text-lg text-gray-600">For life-threatening emergencies, call 911 immediately.</p>
              <a
                href="tel:911"
                className="block w-full rounded-md bg-[#DC3545] px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-[#BB2D3B]"
              >
                Call 911 Now
              </a>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-[#4B82EA]" />
                <h2 className="text-2xl font-semibold text-[#4B82EA]">Find Emergency Care</h2>
              </div>
              <p className="text-lg text-gray-600">Locate the nearest emergency medical facilities.</p>
              <a
                href="https://www.google.com/maps/search/emergency+hospital+near+me"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md bg-[#4B82EA] px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-[#3A71D9]"
              >
                Find Emergency Care Near Me
              </a>
            </div>
          </Card>
        </div>

        <div className="mt-12 rounded-lg bg-blue-50 p-6 text-center">
          <p className="text-lg text-gray-700">
            If you are experiencing a medical emergency, do not wait. Dial 911 immediately or proceed to the nearest
            emergency room.
          </p>
        </div>
      </div>
    </Layout>
  )
}

