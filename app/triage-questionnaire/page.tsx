import Layout from "@/components/layout"
import { TriageQuestionnaire } from "@/components/triage-questionnaire"

export default function TriageQuestionnairePage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Health Triage Questionnaire</h1>
        <TriageQuestionnaire />
      </div>
    </Layout>
  )
}

