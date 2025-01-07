import { createClient } from "../supabase/client"
import { User } from "@supabase/supabase-js"

export async function getSession() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export type Session = {
  user: User
  access_token: string
  expires_in: number
  expires_at: number
  refresh_token: string
  token_type: string
}
