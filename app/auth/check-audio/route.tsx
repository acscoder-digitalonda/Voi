// app/api/check-audio/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const submissionId = searchParams.get("submissionId")

  if (!submissionId) {
    return NextResponse.json({ error: "submissionId is required" }, { status: 400 })
  }

  try {
    // Replace this with your actual logic to check the audio status
    const status = await checkAudioFileStatus(parseInt(submissionId))

    return NextResponse.json({ status })
  } catch (error) {
    console.error("Error checking audio status:", error)
    return NextResponse.json({ error: "Failed to check audio status" }, { status: 500 })
  }
}

async function checkAudioFileStatus(submissionId: number): Promise<string> {
  try {
    // Query the AppSubmissions table for the row with the given submissionId
    const { data, error } = await supabase
      .from("AppSubmissions")
      .select("audio_link")
      .eq("id", submissionId)
      .single() // Ensure only one row is returned

    if (error) {
      throw error
    }

    // Check if the row exists and if audio_link is not null
    if (data && data.audio_link) {
      return "success"
    } else {
      return "pending"
    }
  } catch (error) {
    console.error("Error checking audio file status:", error)
    throw error // Rethrow the error to handle it in the calling function
  }
}