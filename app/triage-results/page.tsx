import { Suspense } from "react"
import TriageResults from "@/components/triage-results"
import Layout from "@/components/layout"

export default function TriageResultsPage() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading triage results...</div>}>
        <TriageResults />
      </Suspense>
    </Layout>
  )
}

