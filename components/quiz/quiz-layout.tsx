"use client";

import { ReactNode } from "react";

interface QuizLayoutProps {
  children: ReactNode;
}

export function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <main className="min-h-screen bg-[#1a1f36] text-white p-8">
      <div className="max-w-2xl mx-auto space-y-12 pt-12">
        {children}
      </div>
    </main>
  );
}