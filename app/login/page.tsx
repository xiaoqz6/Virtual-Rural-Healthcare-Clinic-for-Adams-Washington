import { Suspense } from "react"
import Layout from "@/components/layout"
import LoginContent from "@/components/login-content"

export default function Login() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </Layout>
  )
}

