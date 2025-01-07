"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import Cookies from "js-cookie"

const questions = [
  {
    id: 1,
    question: "How would you describe your ideal voice?",
    options: [
      "Warm and friendly",
      "Professional and clear",
      "Energetic and dynamic",
      "Calm and soothing"
    ]
  },
  {
    id: 2,
    question: "What type of content will you be creating?",
    options: [
      "Podcasts",
      "Audiobooks",
      "Educational content",
      "Personal messages"
    ]
  },
  {
    id: 3,
    question: "Which accent do you prefer?",
    options: [
      "American",
      "British",
      "Australian",
      "Neutral"
    ]
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const router = useRouter()

  // Load saved answers from cookies on mount
  useEffect(() => {
    const savedAnswers = Cookies.get('quiz-answers')
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)
      setAnswers(parsedAnswers)
      setCurrentQuestion(parsedAnswers.length)
    }
  }, [])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    
    // Save answers to cookie
    Cookies.set('quiz-answers', JSON.stringify(newAnswers))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Quiz completed - redirect to registration
      Cookies.set('quiz-completed', 'true')
      router.push('/auth/register')
    }
  }

  // If we've answered all questions, redirect to registration
  useEffect(() => {
    if (answers.length === questions.length) {
      router.push('/auth/register')
    }
  }, [answers.length, router])

  // If we've somehow gone past the last question, reset to the last one
  const questionIndex = Math.min(currentQuestion, questions.length - 1)
  const question = questions[questionIndex]

  return (
    <div className="min-h-screen dark-navy flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            {question.question}
          </h2>
        </div>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === option
            return (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full py-6 text-lg rounded-xl border transition-all duration-200 relative ${
                  isSelected 
                    ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-500 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-white'
                }`}
                variant="ghost"
              >
                <span className="flex items-center justify-between w-full">
                  {option}
                  {isSelected && (
                    <Check className="w-5 h-5 text-white ml-2" />
                  )}
                </span>
              </Button>
            )
          })}
        </div>

        <div className="text-center text-gray-400 mt-8">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  )
}
