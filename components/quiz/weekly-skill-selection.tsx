"use client";

import { Button } from "@/components/ui/button";

interface WeeklySkillSelectionProps {
  onSelect: (skill: string) => void;
}

const weeklySkills = [
  "Prioritizing",
  "Reducing distraction",
  "Procrastinating less"
];

export function WeeklySkillSelection({ onSelect }: WeeklySkillSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Which skill would help you next week?
        </h1>
        <p className="text-xl text-gray-300">
          We&apos;ll start here!
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {weeklySkills.map((skill) => (
          <Button
            key={skill}
            variant="secondary"
            className="w-full h-16 text-xl bg-[#7c4dff]/20 hover:bg-[#7c4dff]/30 text-white border-none"
            onClick={() => onSelect(skill)}
          >
            {skill}
          </Button>
        ))}
      </div>
    </div>
  );
}