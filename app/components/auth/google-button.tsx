import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export function GoogleButton({ className }: { className?: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <Button 
      onClick={handleGoogleSignIn} 
      className={`w-full ${className}`}
    >
      Sign in with Google
    </Button>
  )
}
