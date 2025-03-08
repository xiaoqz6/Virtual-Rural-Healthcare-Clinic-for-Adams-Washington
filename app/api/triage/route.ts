import { NextResponse } from "next/server"

// Define types
type Question = {
  id: string
  text: string
  weight: number
}

type Condition = {
  id: string
  name: string
  followUpQuestions: Question[]
}

// Predefined questions and weights
const generalQuestions: Question[] = [
  { id: "q1", text: "Are you experiencing chest pain?", weight: 3 },
  { id: "q2", text: "Do you have a fever?", weight: 2 },
  { id: "q3", text: "Are you having difficulty breathing?", weight: 3 },
  { id: "q4", text: "Do you have a severe headache?", weight: 2 },
  { id: "q5", text: "Have you experienced sudden weakness or numbness?", weight: 3 },
]

// Condition-specific follow-up questions
const conditions: Condition[] = [
  {
    id: "heart_disease",
    name: "Heart Disease",
    followUpQuestions: [
      { id: "hd1", text: "Have you experienced shortness of breath?", weight: 2 },
      { id: "hd2", text: "Do you have swelling in your legs or ankles?", weight: 1 },
    ],
  },
  {
    id: "diabetes",
    name: "Diabetes",
    followUpQuestions: [
      { id: "d1", text: "Have you noticed unusual thirst or frequent urination?", weight: 2 },
      { id: "d2", text: "Have you experienced unexplained weight loss?", weight: 1 },
    ],
  },
]

export async function POST(req: Request) {
  const { medicalHistory, answers }: { medicalHistory: string[]; answers: Record<string, string> } = await req.json()

  // Start with general questions
  let personalizedQuestions = [...generalQuestions]

  // Add condition-specific questions based on medical history
  conditions.forEach((condition) => {
    if (medicalHistory.includes(condition.id)) {
      personalizedQuestions = personalizedQuestions.concat(condition.followUpQuestions)
    }
  })

  // Add dynamic follow-up questions based on answers
  if (answers["q1"] === "yes") {
    personalizedQuestions.push({ id: "q1_followup", text: "Is the chest pain severe or getting worse?", weight: 2 })
  }
  if (answers["q2"] === "yes") {
    personalizedQuestions.push({ id: "q2_followup", text: "Has your fever lasted more than 3 days?", weight: 1 })
  }

  return NextResponse.json({ questions: personalizedQuestions })
}

