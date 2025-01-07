"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";

interface QuizQuestionProps {
  title: string;
  description: string;
  options: string[];
  onSelect: (option: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  selectedOption?: string;
}

export function QuizQuestion({
  title,
  description,
  options,
  onSelect,
  onBack,
  currentStep,
  totalSteps,
  selectedOption,
}: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-4xl font-bold tracking-tight">
              {title}
            </h1>
          </div>
          <span className="text-gray-400">
            {currentStep}/{totalSteps}
          </span>
        </div>
        <p className="text-xl text-gray-300">
          {description}
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <Button
              key={option}
              variant="secondary"
              className={`w-full h-16 text-xl relative ${
                isSelected 
                  ? "bg-[#7c4dff]/40 hover:bg-[#7c4dff]/50" 
                  : "bg-[#7c4dff]/20 hover:bg-[#7c4dff]/30"
              } text-white border-none`}
              onClick={() => onSelect(option)}
            >
              <span className="flex-1">{option}</span>
              {isSelected && (
                <Check className="w-6 h-6 text-[#7c4dff] absolute right-4" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}