import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DiagnosisReport } from "@/components/diagnosis-report"

interface PatientReportProps {
  patient: {
    id: number
    name: string
    age: number
    condition: string
  }
}

export function PatientReport({ patient }: PatientReportProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{patient.name}'s Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Condition:</strong> {patient.condition}
          </p>
          <DiagnosisReport
            type={patient.condition.toLowerCase().includes("vision") ? "vision" : "dental"}
            date={new Date().toISOString().split("T")[0]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

