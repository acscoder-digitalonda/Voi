"use client";

import { Check, Bell, Star, Lock } from "lucide-react";

const steps = [
  {
    icon: Check,
    title: "Application installation",
    description: "You have provided the necessary information to create your personal plan.",
    completed: true
  },
  {
    icon: Lock,
    title: "Today: full access for free",
    description: "200+ meditations, effective bedtime stories, music, and sounds of nature."
  },
  {
    icon: Bell,
    title: "Day 5: reminder",
    description: "We'll send you an email and push notification when your trial period is about to end."
  },
  {
    icon: Star,
    title: "Day 7: end of the trial period",
    description: "Cancel anytime, no questions asked."
  }
];

export function TimelineSteps() {
  return (
    <div className="relative pl-8 space-y-8">
      {/* Timeline line */}
      <div className="absolute left-4 top-4 bottom-4 w-px bg-[#7c4dff]/30" />

      {steps.map((step, index) => (
        <div key={index} className="relative">
          {/* Timeline dot */}
          <div className={`absolute -left-8 w-8 h-8 rounded-full 
            ${step.completed ? 'bg-[#7c4dff]' : 'bg-[#7c4dff]/20'} 
            flex items-center justify-center`}
          >
            <step.icon size={16} className="text-white" />
          </div>

          <div className="space-y-1">
            <h3 className={`text-lg font-medium ${
              step.completed ? 'line-through text-gray-400' : 'text-white'
            }`}>
              {step.title}
            </h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}