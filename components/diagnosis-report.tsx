import { Card, CardContent } from "@/components/ui/card"
import { Eye, Stethoscope } from "lucide-react"

type ReportType = "vision" | "dental"

interface DiagnosisReportProps {
  type: ReportType
  date: string
}

const visionConditions = [
  {
    condition: "Mild myopia with slight astigmatism",
    explanation:
      "This means you have slight difficulty seeing distant objects clearly, and your eye's shape causes some distortion in your vision.",
    impact: "You may find it harder to read signs or see details far away, especially in low light conditions.",
    precautions: "Wearing corrective lenses (glasses or contacts) will help you see clearly at all distances.",
    progression: "Myopia can progress over time, especially in younger patients, so regular check-ups are important.",
  },
  {
    condition: "Early signs of digital eye strain",
    explanation: "This is caused by prolonged use of digital devices, leading to eye discomfort and fatigue.",
    impact: "You might experience headaches, blurred vision, or dry eyes after long periods of screen time.",
    precautions: "Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    progression: "This condition is usually temporary but can become chronic if not addressed.",
  },
]

const visionRecommendations = [
  {
    action: "Use prescribed corrective lenses",
    explanation: "These will help you see clearly at all distances, reducing eye strain and headaches.",
    instructions: "Wear your glasses or contacts as prescribed, especially when driving or reading.",
  },
  {
    action: "Take regular breaks from digital devices",
    explanation: "This helps reduce eye strain and prevents your vision from worsening.",
    instructions: "Use the 20-20-20 rule, and try to limit overall screen time when possible.",
  },
  {
    action: "Maintain good lighting",
    explanation: "Proper lighting reduces eye strain and makes it easier to focus.",
    instructions: "Ensure your workspace is well-lit, avoiding glare on screens.",
  },
]

const dentalConditions = [
  {
    condition: "Mild gingivitis",
    explanation: "This is an early stage of gum disease caused by plaque buildup on your teeth.",
    impact: "Your gums may be red, swollen, or bleed easily when brushing or flossing.",
    precautions: "Improving your oral hygiene can reverse this condition and prevent it from progressing.",
    progression: "If left untreated, it can develop into more serious periodontal disease.",
  },
  {
    condition: "Early enamel erosion",
    explanation: "This is the loss of tooth enamel, the protective outer layer of your teeth.",
    impact: "You may experience increased sensitivity to hot, cold, or sweet foods and drinks.",
    precautions: "Avoiding acidic foods and drinks can help prevent further erosion.",
    progression: "Enamel doesn't grow back, but the erosion process can be slowed or stopped with proper care.",
  },
]

const dentalRecommendations = [
  {
    action: "Improve brushing technique",
    explanation: "Proper brushing removes plaque and food particles that cause decay and gum disease.",
    instructions: "Brush for two minutes, twice a day, using a soft-bristled brush and fluoride toothpaste.",
  },
  {
    action: "Floss daily",
    explanation: "Flossing removes plaque and food particles from between teeth where your brush can't reach.",
    instructions: "Use a gentle up-and-down motion, curving the floss around each tooth.",
  },
  {
    action: "Use an antiseptic mouthwash",
    explanation: "Mouthwash can reduce plaque, freshen breath, and help fight gum disease.",
    instructions: "Rinse for 30 seconds after brushing and flossing, once or twice a day.",
  },
]

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function DiagnosisReport({ type, date }: DiagnosisReportProps) {
  const conditions = type === "vision" ? visionConditions : dentalConditions
  const recommendations = type === "vision" ? visionRecommendations : dentalRecommendations

  const randomCondition = getRandomItems(conditions, 1)[0]
  const randomRecommendations = getRandomItems(recommendations, 2)

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          {type === "vision" ? (
            <Eye className="mr-2 h-5 w-5 text-[#4B82EA]" />
          ) : (
            <Stethoscope className="mr-2 h-5 w-5 text-[#4B82EA]" />
          )}
          <h3 className="text-lg font-semibold">{type === "vision" ? "Vision Care" : "Dental Care"} Report</h3>
        </div>
        {date ? (
          <p className="text-sm text-gray-500 mb-4">
            Date: {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-4">No test date available</p>
        )}

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-lg mb-2">Their Condition: {randomCondition.condition}</h4>
            <p className="text-gray-700 mb-2">{randomCondition.explanation}</p>
            <p className="text-gray-700 mb-2">
              <strong>How this affects them:</strong> {randomCondition.impact}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Precautions:</strong> {randomCondition.precautions}
            </p>
            <p className="text-gray-700">
              <strong>Long-term outlook:</strong> {randomCondition.progression}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside space-y-2">
              {randomRecommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{rec.action}:</strong> {rec.explanation}
                  <br />
                  <span className="text-sm italic">How to do this: {rec.instructions}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-2">Follow-Up Plan:</h4>
            <p className="text-gray-700">
              Schedule your next {type === "vision" ? "eye exam" : "dental check-up"} in 6 months. However, if you
              experience{" "}
              {type === "vision"
                ? "changes in vision, increased eye strain, or persistent discomfort"
                : "tooth pain, increased sensitivity, or bleeding gums"}
              , please contact us immediately for an earlier appointment.
            </p>
            <p className="text-gray-700 mt-2">
              Remember, early detection and treatment are key to maintaining good {type === "vision" ? "eye" : "oral"}{" "}
              health. Don't hesitate to reach out if you have any questions or concerns.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

