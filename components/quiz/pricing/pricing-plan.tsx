"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimelineSteps } from "./timeline-steps";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function PricingPlan() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <button 
        onClick={() => router.back()} 
        className="absolute right-6 top-6 text-gray-400 hover:text-white"
      >
        <X size={24} />
      </button>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Try App<br />for free
        </h1>
        <p className="text-xl text-gray-300">
          Only available on the first launch.
        </p>
      </div>

      <TimelineSteps />

      <div className="space-y-6 pt-8">
        <div className="text-center space-y-2">
          <p className="text-lg">7 days free</p>
          <p className="text-gray-400">then $59.99 annually ($5 per month)</p>
        </div>

        <Button 
          className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
          onClick={() => router.push("/auth/register")}
        >
          Continue for free
        </Button>

        <Link 
          href="/plans" 
          className="block text-center text-[#7c4dff] hover:text-[#651fff] transition-colors"
        >
          All plans
        </Link>
      </div>
    </div>
  );
}