"use client"

import DashboardNav from "./dashboard-nav"
import WebhookForm from "../components/webhook-form/webhook-form"
import SubmissionsList from "../components/submissions-list/submissions-list"
import ProtectedRoute from "../auth/protected-route"
import { useEffect, useState } from "react"
import { getSession } from "@/lib/auth/session"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { Card,  CardContent } from "@/components/ui/card";
import { Submission } from "../types/submission"
import { useRouter } from "next/navigation" 

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()  
  useEffect(() => {
    async function loadData() {
      try {
        // Get user session
        const session = await getSession()
        if (session) {
          setUser(session.user)
          
          // Fetch submissions for the user
          const { data, error } = await supabase
            .from('AppSubmissions')
            .select('*')
            .eq('client_id', session.user.id)
            .order('created_at', { ascending: false })

          if (error) throw error
          
          setSubmissions(data || [])
        }else{
          router.push("/")
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (!user || isLoading) {
    return null
  }

  return (
    <ProtectedRoute>
       
      <div className="min-h-screen bg-gray-50">
        <DashboardNav user={user} />
        <main className="container mx-auto py-8 px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="px-10 py-12">
            {submissions.length > 0 ? (
              <SubmissionsList submissions={submissions} />
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Instructions</h2>
                <p className="mb-6">Answer the 3 question survey below with any goal you would like to achieve and receive a personalized visualization meditation in your inbox in less than 3 minutes.</p>
                <WebhookForm />
              </>
            )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
