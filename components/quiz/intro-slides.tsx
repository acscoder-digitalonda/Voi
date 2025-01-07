"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";

export function IntroSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Meet Mo!",
      description: "Mo is the #1 app for sleep, meditation and rest.",
      illustration: (
        <div className="relative w-full h-96 mb-8">
          {/* Moon with Mo face */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-[#9d94ff] rounded-full relative">
              <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#1a1f36] rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#1a1f36] rounded-full"></div>
              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#1a1f36] rounded-full"></div>
            </div>
          </div>
          {/* Bed illustration */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <div className="w-48 h-24 bg-[#7c4dff]/30 rounded-lg relative">
              <div className="absolute -top-4 left-0 w-48 h-4 bg-[#7c4dff]/40 rounded-t-lg"></div>
              <div className="absolute -left-4 top-0 w-4 h-24 bg-[#7c4dff]/40"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8">
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center flex-grow">
        {slides[currentSlide].illustration}
        <h1 className="text-4xl font-bold mb-4 text-center">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          {slides[currentSlide].description}
        </p>
        <div className="flex gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-[#7c4dff]" : "bg-[#7c4dff]/30"
              }`}
            />
          ))}
        </div>
      </div>
      <Button 
        className="w-full max-w-md h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
        onClick={() => setCurrentSlide((prev) => prev + 1)}
      >
        Continue
      </Button>
    </div>
  );
}