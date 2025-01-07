"use client";

import { PricingPlan } from "@/components/quiz/pricing/pricing-plan";
import { QuizLayout } from "@/components/quiz/quiz-layout";

export default function QuizResultsPage() {
  return (
    <QuizLayout>
      <PricingPlan />
    </QuizLayout>
  );
}