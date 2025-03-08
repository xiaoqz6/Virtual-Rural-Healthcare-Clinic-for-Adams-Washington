import Layout from "@/components/layout"
import { ChatForm } from "@/components/chat-form"

export default function AIChatbotPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F9FF] py-16">
        <div className="mx-auto max-w-4xl px-8">
          <ChatForm />
        </div>
      </div>
    </Layout>
  )
}

