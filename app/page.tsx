import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HomeCarousel } from "./components/home-carousel"

function Star({ className }: { className?: string }) {
  return <div className={`star ${className}`} />
}

export default function Home() {
  return (
    <div className="min-h-screen dark-navy flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Stars */}
      <Star className="top-[10%] left-[15%]" />
      <Star className="top-[20%] right-[25%]" />
      <Star className="top-[40%] left-[35%]" />
      <Star className="bottom-[30%] right-[15%]" />
      <Star className="bottom-[20%] left-[25%]" />
      
      <div className="max-w-md w-full">
        <HomeCarousel />

        <div className="mt-8 space-y-4 px-4">
          <Link href="/quiz">
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg rounded-full"
              size="lg"
            >
              Get started
            </Button>
          </Link>
          
          <div className="text-center">
            <Link 
              href="/auth/login" 
              className="text-gray-400 hover:text-white text-sm"
            >
              Already have an account? <span className="text-indigo-400">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
