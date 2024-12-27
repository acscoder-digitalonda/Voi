"use client"

import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/auth/providers"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      const { error } = await signInWithGoogle()
      if (error) throw error
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className="w-full"
      onClick={handleSignIn}
    >
      {isLoading ? (
        "Connecting..."
      ) : (
        <>
          
          Continue with Google
        </>
      )}
    </Button>
  )
}