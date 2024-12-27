"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { toneOptions } from "./tone-options"
import { FormData } from "@/app/types/form"
import { createClient } from "@/lib/supabase/client"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  goal: z.string().min(10, "Please provide more detail about your goal"),
  challenges: z.string().min(10, "Please describe your challenges in more detail"),
  tone: z.enum(["Calm and Grounding", "Encouraging and Uplifting ", "Empowering and Confident", "Reflective and Meditative", "Dynamic and Energizing"]),
})

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || ""
const WEBHOOK_USERNAME = process.env.NEXT_PUBLIC_WEBHOOK_USERNAME || ""
const WEBHOOK_PASSWORD = process.env.NEXT_PUBLIC_WEBHOOK_PASSWORD || ""

export default function WebhookForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<{ id: string; email: string } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function getUserData() {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error.message)
        return
      }
      if (user) {
        setUserData({
          id: user.id,
          email: user.email || ''
        })
      }
    }

    getUserData()
  }, [])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      goal: "",
      challenges: "",
      tone: "Calm and Grounding",
    },
  })

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true)

      // Save to Supabase first
      const { data: submission, error: dbError } = await supabase
        .from('AppSubmissions')
        .insert([{
          client_id: userData?.id,
          client_name: values.name,
          client_goal: values.goal,
          client_challenges: values.challenges,
          tone: values.tone
        }])
        .select()
        .single()

      if (dbError) {
        throw new Error("Failed to save submission")
      }

      // Only call webhook if save was successful
      if (submission) {
        const payload = {
          ...values,
          userId: userData?.id || '',
          userEmail: userData?.email || '',
          submissionId: submission.id
        }

        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(`${WEBHOOK_USERNAME}:${WEBHOOK_PASSWORD}`)
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          // Log webhook error but don't throw since data is saved
          console.error("Failed to submit to webhook")
        }
      }

      toast({
        title: "Success",
        description: "Your form has been submitted successfully.",
      })
      setTimeout(() => window.location.reload(), 2000)
      form.reset()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Goal</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What is one life-changing goal you'd like to achieve?"
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="challenges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenges You're Facing</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What’s been the biggest roadblock in achieving your goal so far?"
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What tone do you respond best to?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option ..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
