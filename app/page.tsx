import { Button } from "@/components/ui/button"
import { LockKeyhole } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <LockKeyhole className="h-12 w-12 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Application Portal</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard and manage your applications
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/auth/login">
            <Button className="w-full mb-4" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" className="w-full" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}