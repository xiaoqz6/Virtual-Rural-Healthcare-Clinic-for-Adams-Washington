"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Eye, SmileIcon as Tooth } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditableSection } from "@/components/editable-section"
import { toast } from "react-hot-toast"
import { Toaster } from "react-hot-toast"
import Image from "next/image"

// Add this type definition after the existing types
type ScanStatus = "pending" | "accepted" | "rejected" | "modified"

// Extended mock patient data for all patients
const mockPatients = {
  // Dental Patients
  1: {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    medicalHistory: "Previous root canal, mild gingivitis",
    currentSymptoms: "Tooth sensitivity, bleeding gums",
    appointmentTime: "2025-08-15T09:00:00",
    case: "Dental",
    condition: "Dental Caries",
    status: "pending",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-06-15",
          procedure: "Dental Cleaning",
          notes: "Regular checkup, mild plaque buildup noted",
        },
        {
          date: "2025-04-20",
          procedure: "Root Canal",
          notes: "Successful procedure on tooth #18",
        },
      ],
      medications: ["Amoxicillin (completed course)", "Ibuprofen (as needed)"],
      allergies: ["Penicillin"],
    },
    aiReport: {
      diagnosis: "Moderate dental caries with early-stage gingivitis",
      riskLevel: "Moderate",
      keyFindings: [
        "Multiple carious lesions detected",
        "Gingival inflammation present",
        "Signs of enamel erosion on molars",
      ],
      recommendations: [
        "Immediate treatment for active caries",
        "Enhanced oral hygiene routine",
        "Regular fluoride treatments",
      ],
    },
    treatmentPlan: {
      immediate: ["Dental filling on affected teeth", "Professional cleaning and scaling"],
      shortTerm: ["Follow-up appointment in 2 weeks", "Evaluate response to treatment"],
      longTerm: ["Regular 3-month checkups", "Consider sealants for preventive care", "Monitor gum health closely"],
      estimatedCost: "$850-1200",
      estimatedDuration: "2-3 visits",
    },
  },
  2: {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    medicalHistory: "No significant dental history",
    currentSymptoms: "Gum inflammation, bleeding during brushing",
    appointmentTime: "2025-08-15T10:30:00",
    case: "Dental",
    condition: "Gingivitis",
    status: "completed",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-01",
          procedure: "Dental Cleaning",
          notes: "Early signs of gingivitis observed",
        },
      ],
      medications: ["None"],
      allergies: ["None reported"],
    },
    aiReport: {
      diagnosis: "Early-stage gingivitis with good prognosis",
      riskLevel: "Low",
      keyFindings: [
        "Gingival inflammation localized to anterior teeth",
        "Good overall oral hygiene",
        "No bone loss detected",
      ],
      recommendations: ["Professional cleaning", "Improved flossing technique", "Anti-gingivitis mouthwash"],
    },
    treatmentPlan: {
      immediate: ["Deep cleaning", "Oral hygiene instruction"],
      shortTerm: ["Follow-up in 1 month", "Review home care routine"],
      longTerm: ["Regular 6-month checkups", "Maintain improved oral hygiene routine"],
      estimatedCost: "$400-600",
      estimatedDuration: "1-2 visits",
    },
  },
  3: {
    id: 3,
    name: "Bob Johnson",
    age: 58,
    gender: "Male",
    medicalHistory: "Type 2 diabetes, previous periodontal treatment",
    currentSymptoms: "Severe gum recession, loose teeth",
    appointmentTime: "2025-08-15T14:00:00",
    case: "Dental",
    condition: "Periodontitis",
    status: "high-risk",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-10",
          procedure: "Periodontal Assessment",
          notes: "Advanced periodontal disease noted",
        },
        {
          date: "2025-06-15",
          procedure: "Emergency Visit",
          notes: "Tooth mobility concerns",
        },
      ],
      medications: ["Metformin", "Blood pressure medication"],
      allergies: ["Sulfa drugs"],
    },
    aiReport: {
      diagnosis: "Advanced periodontitis complicated by diabetes",
      riskLevel: "High",
      keyFindings: [
        "Significant bone loss detected",
        "Multiple areas of deep pocketing",
        "Compromised tooth stability",
      ],
      recommendations: [
        "Immediate periodontal intervention",
        "Coordination with primary care physician",
        "Intensive periodontal therapy",
      ],
    },
    treatmentPlan: {
      immediate: ["Full periodontal assessment", "Scaling and root planing"],
      shortTerm: ["Antibiotic therapy", "Weekly follow-ups"],
      longTerm: ["3-month periodontal maintenance", "Regular diabetic monitoring", "Consider implant planning"],
      estimatedCost: "$2000-3000",
      estimatedDuration: "4-6 months of active treatment",
    },
  },
  4: {
    id: 4,
    name: "Alice Brown",
    age: 29,
    gender: "Female",
    medicalHistory: "Previous cavity fillings",
    currentSymptoms: "Severe tooth pain, sensitivity to hot/cold",
    appointmentTime: "2025-08-16T11:15:00",
    case: "Dental",
    condition: "Root Canal",
    status: "pending",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-20",
          procedure: "Emergency Assessment",
          notes: "Severe pulpitis diagnosed",
        },
      ],
      medications: ["None"],
      allergies: ["Latex"],
    },
    aiReport: {
      diagnosis: "Irreversible pulpitis requiring root canal therapy",
      riskLevel: "Moderate",
      keyFindings: [
        "Deep decay reaching pulp",
        "Positive response to cold testing",
        "Periapical radiolucency visible on X-ray",
      ],
      recommendations: ["Immediate root canal treatment", "Post-operative crown", "Regular follow-up"],
    },
    treatmentPlan: {
      immediate: ["Root canal procedure", "Temporary filling"],
      shortTerm: ["Permanent crown placement", "Post-operative check"],
      longTerm: ["Annual X-rays", "Regular checkups"],
      estimatedCost: "$1500-2000",
      estimatedDuration: "2 visits",
    },
  },
  5: {
    id: 5,
    name: "Charlie Davis",
    age: 52,
    gender: "Male",
    medicalHistory: "Bridge work, multiple fillings",
    currentSymptoms: "Broken tooth, difficulty chewing",
    appointmentTime: "2025-08-16T15:45:00",
    case: "Dental",
    condition: "Dental Crown",
    status: "completed",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-25",
          procedure: "Crown Preparation",
          notes: "Tooth #19 prepared for crown",
        },
        {
          date: "2025-08-08",
          procedure: "Crown Placement",
          notes: "Final crown cemented",
        },
      ],
      medications: ["Blood pressure medication"],
      allergies: ["None"],
    },
    aiReport: {
      diagnosis: "Successfully treated fractured tooth with crown",
      riskLevel: "Low",
      keyFindings: ["Crown properly seated", "Good marginal fit", "Normal bite alignment"],
      recommendations: ["Regular cleaning schedule", "Night guard recommended", "Monitor adjacent teeth"],
    },
    treatmentPlan: {
      immediate: ["Final crown adjustment if needed", "Bite check"],
      shortTerm: ["2-week follow-up", "Night guard fitting"],
      longTerm: ["Regular 6-month checkups", "Monitor crown margins"],
      estimatedCost: "$1200-1500",
      estimatedDuration: "Completed",
    },
  },
  6: {
    id: 6,
    name: "Eva Wilson",
    age: 41,
    gender: "Female",
    medicalHistory: "Wisdom teeth removal 5 years ago",
    currentSymptoms: "Severe pain, swelling around molar",
    appointmentTime: "2025-08-17T13:30:00",
    case: "Dental",
    condition: "Tooth Extraction",
    status: "pending",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-08-01",
          procedure: "Emergency Exam",
          notes: "Severe decay, non-restorable tooth",
        },
      ],
      medications: ["None"],
      allergies: ["Codeine"],
    },
    aiReport: {
      diagnosis: "Non-restorable tooth requiring extraction",
      riskLevel: "Moderate",
      keyFindings: ["Extensive decay below gumline", "Periapical infection present", "Adjacent teeth stable"],
      recommendations: ["Immediate extraction", "Consider implant replacement", "Antibiotic therapy"],
    },
    treatmentPlan: {
      immediate: ["Tooth extraction", "Antibiotic prescription"],
      shortTerm: ["Post-operative check", "Discuss replacement options"],
      longTerm: ["Implant consultation", "Monitor space maintenance"],
      estimatedCost: "$300-500",
      estimatedDuration: "1 visit plus follow-up",
    },
  },
  // Vision Patients
  7: {
    id: 7,
    name: "Frank Miller",
    age: 63,
    gender: "Male",
    medicalHistory: "Hypertension, early-stage cataracts noted 1 year ago",
    currentSymptoms: "Increasing glare sensitivity, blurred vision",
    appointmentTime: "2025-08-18T10:00:00",
    case: "Vision",
    condition: "Cataracts",
    status: "high-risk",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-06-01",
          procedure: "Comprehensive Eye Exam",
          notes: "Significant cataract progression",
        },
        {
          date: "2025-07-15",
          procedure: "Pre-surgical Assessment",
          notes: "Candidate for surgery",
        },
      ],
      medications: ["Blood pressure medication", "Eye drops"],
      allergies: ["None"],
    },
    aiReport: {
      diagnosis: "Advanced bilateral cataracts requiring surgical intervention",
      riskLevel: "High",
      keyFindings: [
        "Nuclear sclerotic cataracts both eyes",
        "Significant vision deterioration",
        "Impact on daily activities",
      ],
      recommendations: ["Schedule cataract surgery", "Pre-operative testing", "Discuss IOL options"],
    },
    treatmentPlan: {
      immediate: ["Complete pre-operative testing", "Schedule surgery dates"],
      shortTerm: ["First eye surgery", "Post-operative care"],
      longTerm: ["Second eye surgery", "Regular monitoring", "Updated prescription"],
      estimatedCost: "$3500-4500 per eye",
      estimatedDuration: "2-3 months total",
    },
  },
  8: {
    id: 8,
    name: "Grace Taylor",
    age: 37,
    gender: "Female",
    medicalHistory: "Myopia since childhood",
    currentSymptoms: "Increased difficulty with night driving",
    appointmentTime: "2025-08-18T11:30:00",
    case: "Vision",
    condition: "Myopia",
    status: "completed",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-20",
          procedure: "Vision Test",
          notes: "Prescription update needed",
        },
      ],
      medications: ["None"],
      allergies: ["None"],
    },
    aiReport: {
      diagnosis: "Progressive myopia with recent stabilization",
      riskLevel: "Low",
      keyFindings: ["Mild prescription change", "Healthy retinal examination", "Good ocular health"],
      recommendations: ["Updated prescription", "Blue light protection", "Regular exercise"],
    },
    treatmentPlan: {
      immediate: ["New glasses prescription", "Contact lens fitting"],
      shortTerm: ["Follow-up in 1 month", "Night driving assessment"],
      longTerm: ["Annual comprehensive exams", "Monitor progression"],
      estimatedCost: "$350-500",
      estimatedDuration: "1-2 visits",
    },
  },
  9: {
    id: 9,
    name: "Henry Clark",
    age: 55,
    gender: "Male",
    medicalHistory: "Family history of glaucoma",
    currentSymptoms: "Peripheral vision changes, eye pressure",
    appointmentTime: "2025-08-19T14:30:00",
    case: "Vision",
    condition: "Glaucoma",
    status: "pending",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-01",
          procedure: "Glaucoma Screening",
          notes: "Elevated intraocular pressure",
        },
      ],
      medications: ["None"],
      allergies: ["Sulfa drugs"],
    },
    aiReport: {
      diagnosis: "Early-stage open-angle glaucoma",
      riskLevel: "High",
      keyFindings: ["Elevated intraocular pressure", "Early visual field changes", "Optic nerve changes"],
      recommendations: ["Begin pressure-lowering drops", "Regular pressure checks", "Visual field monitoring"],
    },
    treatmentPlan: {
      immediate: ["Prescribe eye drops", "Baseline visual field test"],
      shortTerm: ["Pressure check in 2 weeks", "Medication adjustment"],
      longTerm: ["Quarterly monitoring", "Annual visual field tests"],
      estimatedCost: "$1200-1800 annually",
      estimatedDuration: "Ongoing management",
    },
  },
  10: {
    id: 10,
    name: "Ivy Anderson",
    age: 48,
    gender: "Female",
    medicalHistory: "Computer-intensive work",
    currentSymptoms: "Blurred vision at multiple distances",
    appointmentTime: "2025-08-19T13:15:00",
    case: "Vision",
    condition: "Astigmatism",
    status: "completed",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-10",
          procedure: "Vision Assessment",
          notes: "Astigmatism correction needed",
        },
      ],
      medications: ["None"],
      allergies: ["None"],
    },
    aiReport: {
      diagnosis: "Moderate astigmatism with digital eye strain",
      riskLevel: "Low",
      keyFindings: ["Regular astigmatism both eyes", "Digital strain symptoms", "Normal eye health"],
      recommendations: ["Updated prescription", "Computer glasses", "Workplace ergonomics"],
    },
    treatmentPlan: {
      immediate: ["New prescription glasses", "Computer vision assessment"],
      shortTerm: ["Ergonomic consultation", "Follow-up check"],
      longTerm: ["Annual eye exams", "Monitor changes"],
      estimatedCost: "$400-600",
      estimatedDuration: "2 visits",
    },
  },
  11: {
    id: 11,
    name: "Jack White",
    age: 70,
    gender: "Male",
    medicalHistory: "Diabetes, hypertension",
    currentSymptoms: "Central vision loss, difficulty reading",
    appointmentTime: "2025-08-20T16:00:00",
    case: "Vision",
    condition: "Macular Degeneration",
    status: "high-risk",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-05",
          procedure: "Retinal Examination",
          notes: "Wet AMD diagnosed",
        },
        {
          date: "2025-07-20",
          procedure: "Treatment Consultation",
          notes: "Treatment options discussed",
        },
      ],
      medications: ["Diabetes medication", "Blood pressure medication"],
      allergies: ["Contrast dye"],
    },
    aiReport: {
      diagnosis: "Wet age-related macular degeneration",
      riskLevel: "High",
      keyFindings: [
        "Active choroidal neovascularization",
        "Central vision affected",
        "Requires immediate intervention",
      ],
      recommendations: ["Begin anti-VEGF therapy", "Vision rehabilitation", "Home safety assessment"],
    },
    treatmentPlan: {
      immediate: ["Initial anti-VEGF injection", "Vision aids prescription"],
      shortTerm: ["Monthly injections", "Progress monitoring"],
      longTerm: ["Ongoing treatment series", "Quality of life support"],
      estimatedCost: "$2000-3000 per treatment series",
      estimatedDuration: "Long-term management",
    },
  },
  12: {
    id: 12,
    name: "Karen Lee",
    age: 33,
    gender: "Female",
    medicalHistory: "Contact lens wearer",
    currentSymptoms: "Eye irritation, burning sensation",
    appointmentTime: "2025-08-20T09:45:00",
    case: "Vision",
    condition: "Dry Eye Syndrome",
    status: "pending",
    patientHistory: {
      previousVisits: [
        {
          date: "2025-07-30",
          procedure: "Eye Examination",
          notes: "Tear film evaluation",
        },
      ],
      medications: ["Antihistamines"],
      allergies: ["Seasonal allergies"],
    },
    aiReport: {
      diagnosis: "Moderate dry eye syndrome with meibomian gland dysfunction",
      riskLevel: "Moderate",
      keyFindings: ["Reduced tear break-up time", "Meibomian gland blockage", "Contact lens intolerance"],
      recommendations: ["Artificial tears regimen", "Warm compress therapy", "Contact lens adjustment"],
    },
    treatmentPlan: {
      immediate: ["Prescribe artificial tears", "Begin gland expression"],
      shortTerm: ["Review contact lens fit", "Evaluate response"],
      longTerm: ["Maintenance therapy", "Regular monitoring"],
      estimatedCost: "$200-400",
      estimatedDuration: "3-4 visits",
    },
  },
}

export default function PatientReviewPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = Number.parseInt(params.id as string)
  const [patient, setPatient] = useState(mockPatients[patientId as keyof typeof mockPatients])
  const [scanStatus, setScanStatus] = useState<ScanStatus>("pending")

  useEffect(() => {
    // This effect will run when the component mounts or when patientId changes
    const fetchedPatient = mockPatients[patientId as keyof typeof mockPatients]
    if (fetchedPatient) {
      setPatient(fetchedPatient)
    }
  }, [patientId])

  if (!patient) {
    return (
      <Layout isProvider={true}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Patient Not Found</h1>
          </div>
        </div>
      </Layout>
    )
  }

  const handleSaveAIReport = (section: keyof typeof patient.aiReport, newContent: string) => {
    setPatient((prevPatient) => ({
      ...prevPatient,
      aiReport: {
        ...prevPatient.aiReport,
        [section]: newContent,
      },
    }))
  }

  const handleSaveTreatmentPlan = (section: keyof typeof patient.treatmentPlan, newContent: string) => {
    setPatient((prevPatient) => ({
      ...prevPatient,
      treatmentPlan: {
        ...prevPatient.treatmentPlan,
        [section]: newContent,
      },
    }))
  }

  const getScanImage = (patientCase: string) => {
    if (patientCase === "Dental") {
      const dentalScans = [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/three-types-of-dental-x-rays-rTIk1ZKHJkyHuQjiJXDIr700lTd9Ft.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dental-x-ray-1-CuZjZGZvwGeCQ5qgqeHAFT07x1TrNb.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%B1%8F2025-02-21%20%E4%B8%8A%E5%8D%8811.19.29-phX8WGucNGNCYvw69R44fkTwonKd36.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%B1%8F2025-02-21%20%E4%B8%8A%E5%8D%8811.19.08-XGgkNYLYU2NHia0FDVsR3uEoxILmac.png",
      ]
      return dentalScans[Math.floor(Math.random() * dentalScans.length)]
    } else if (patientCase === "Vision") {
      const visionScans = [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eye-scan.jpg-bR3xedKK60s8b16t6CT8OtlS1LrC2O.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/optomap-retinal-exam.jpg-uZDfpKnVkiR8tmPSaZIucaM6hqk5VM.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25046-retinal-imaging.jpg-fjAfcCW6bgYXmn2uz9Y22QLMEPvaXb.jpeg",
      ]
      return visionScans[Math.floor(Math.random() * visionScans.length)]
    }
    return null
  }

  const handleGenerateFinalReport = () => {
    toast.success("Successfully sent to patient", {
      duration: 3000,
      position: "bottom-right",
    })
  }

  return (
    <Layout isProvider={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Patient List
            </Button>
          </div>

          {/* Main title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {patient.case === "Dental" ? (
              <>
                <Tooth className="inline-block mr-2 h-8 w-8 text-blue-600" />
                Dental Patient Review
              </>
            ) : (
              <>
                <Eye className="inline-block mr-2 h-8 w-8 text-blue-600" />
                Vision Patient Review
              </>
            )}
          </h1>

          {/* Patient Summary Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Patient Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="font-semibold w-48">Name:</span>
                  <span>{patient.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold w-48">Age:</span>
                  <span>{patient.age}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold w-48">Gender:</span>
                  <span>{patient.gender}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold w-48">Medical History:</span>
                  <span>{patient.medicalHistory}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold w-48">Current Symptoms:</span>
                  <span>{patient.currentSymptoms}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient History Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Patient History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Previous Visits</h3>
                  <div className="space-y-4">
                    {patient.patientHistory.previousVisits.map((visit, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{visit.procedure}</span>
                          <span className="text-gray-600">{visit.date}</span>
                        </div>
                        <p className="text-gray-700">{visit.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Medications</h3>
                  <ul className="list-disc list-inside">
                    {patient.patientHistory.medications.map((medication, index) => (
                      <li key={index} className="text-gray-700">
                        {medication}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Allergies</h3>
                  <ul className="list-disc list-inside">
                    {patient.patientHistory.allergies.map((allergy, index) => (
                      <li key={index} className="text-gray-700">
                        {allergy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-Generated Report Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">AI-Generated Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <EditableSection
                  title="Diagnosis"
                  content={patient.aiReport.diagnosis}
                  onSave={(newContent) => handleSaveAIReport("diagnosis", newContent)}
                />
                <EditableSection
                  title="Risk Level"
                  content={patient.aiReport.riskLevel}
                  onSave={(newContent) => handleSaveAIReport("riskLevel", newContent)}
                />
                <EditableSection
                  title="Key Findings"
                  content={patient.aiReport.keyFindings.join("\n")}
                  onSave={(newContent) => handleSaveAIReport("keyFindings", newContent.split("\n"))}
                />
                <EditableSection
                  title="Recommendations"
                  content={patient.aiReport.recommendations.join("\n")}
                  onSave={(newContent) => handleSaveAIReport("recommendations", newContent.split("\n"))}
                />
              </div>
              {(patient.case === "Dental" || patient.case === "Vision") && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    {patient.case === "Vision" ? "AI-Generated Vision Scan:" : "Scan Image:"}
                  </h3>
                  <div className="space-y-4">
                    <div className="relative aspect-square w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden">
                      <Image
                        src={getScanImage(patient.case) || "/placeholder.svg"}
                        alt={`${patient.case} scan for ${patient.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Treatment Planning Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">AI Treatment Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <EditableSection
                  title="Immediate Actions"
                  content={patient.treatmentPlan.immediate.join("\n")}
                  onSave={(newContent) => handleSaveTreatmentPlan("immediate", newContent.split("\n"))}
                />
                <EditableSection
                  title="Short-term Plan"
                  content={patient.treatmentPlan.shortTerm.join("\n")}
                  onSave={(newContent) => handleSaveTreatmentPlan("shortTerm", newContent.split("\n"))}
                />
                <EditableSection
                  title="Long-term Plan"
                  content={patient.treatmentPlan.longTerm.join("\n")}
                  onSave={(newContent) => handleSaveTreatmentPlan("longTerm", newContent.split("\n"))}
                />
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <EditableSection
                    title="Estimated Cost"
                    content={patient.treatmentPlan.estimatedCost}
                    onSave={(newContent) => handleSaveTreatmentPlan("estimatedCost", newContent)}
                  />
                  <EditableSection
                    title="Estimated Duration"
                    content={patient.treatmentPlan.estimatedDuration}
                    onSave={(newContent) => handleSaveTreatmentPlan("estimatedDuration", newContent)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleGenerateFinalReport}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Final Report
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}

