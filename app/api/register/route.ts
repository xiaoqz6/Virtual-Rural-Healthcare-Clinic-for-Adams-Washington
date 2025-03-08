import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing environment variables for Supabase")
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(req: Request) {
  const { firstName, lastName, phone, dob } = await req.json()

  console.log("Received registration data:", { firstName, lastName, phone, dob })

  if (!lastName || !phone) {
    console.error("Missing required fields")
    return NextResponse.json({ success: false, error: "Last name and phone number are required" }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from("patients")
      .insert([{ first_name: firstName, last_name: lastName, phone_number: phone, date_of_birth: dob }])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Registration successful:", data)
    return NextResponse.json({ success: true, patient: data[0] })
  } catch (error) {
    console.error("Error registering patient:", error)
    return NextResponse.json(
      { success: false, error: "Failed to register patient: " + (error as Error).message },
      { status: 500 },
    )
  }
}

