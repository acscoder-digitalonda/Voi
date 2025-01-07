"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";
import fetchStrapiAPI from "@/lib/strapi";

// Define the interface for a single question from the Strapi API
interface StrapiQuestion {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Question: string;
    Answer: string;
}

// Define the interface for the Strapi API Response
interface StrapiQuizResponse {
    data: {
        id: number;
        attributes: {
            questions: {
                data: StrapiQuestion[];
            };
        };
    }[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Define the interface for quiz question
interface QuestionType {
  id:number,
  question:string,
  options:string[]
}

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [questions, setQuestions] = useState<QuestionType[]>([]); // State to hold fetched questions
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const router = useRouter();


    useEffect(() => {
       const fetchQuestions = async () => {
        try {
            const data = await fetchStrapiAPI<StrapiQuizResponse>('/quizzes');
            if (data && data.data) {
            const quizData = data.data;
            if (!quizData) {
                throw new Error("No quiz data found");
            }
            const mappedQuestions: QuestionType[] = quizData.map((item: StrapiQuestion) => ({
                id: item.id,
                question: item.Question,
                options: item.Answer.split("\n")
            }));
            
                setQuestions(mappedQuestions);
                setLoading(false);
            } else {
                setError("Failed to fetch quiz questions.");
                setLoading(false);
            }
        } catch (err: any) {
          setError(err.message || "An error occurred while fetching the quiz questions.");
          setLoading(false);
        }
    };
        fetchQuestions();
    }, []);

 


  const handleAnswer = (answer: string) => {
      
    Cookies.set('quiz-answers', JSON.stringify(answer));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
        // Quiz completed - redirect to registration
        Cookies.set('quiz-completed', "true");
        router.push("/auth/register");
    }
    };


  // If we've somehow gone past the last question, reset to the last one
  const questionIndex = Math.min(currentQuestion, questions.length - 1);
  const question = questions[questionIndex];

    if (loading) {
        return <div className="min-h-screen dark-navy flex items-center justify-center">Loading questions...</div>;
    }

    if (error) {
        return <div className="min-h-screen dark-navy flex items-center justify-center">Error: {error}</div>;
    }


    if (!question) {
        return <div className="min-h-screen dark-navy flex items-center justify-center">No questions available.</div>
    }

  return (
    <div className="min-h-screen dark-navy flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Back button */}
        <Button
          onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))}
          disabled={currentQuestion === 0}
          className="text-gray-400 hover:text-gray-300"
          variant="ghost"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

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
            const isSelected = answers[currentQuestion] === option;
            return (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full py-6 text-lg rounded-xl border transition-all duration-200 relative ${
                  isSelected
                    ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700 border-gray-700 text-white"
                }`}
                variant="ghost"
              >
                <span className="flex items-center justify-between w-full">
                  {option}
                  {isSelected && <Check className="w-5 h-5 text-white ml-2" />}
                </span>
              </Button>
            );
          })}
        </div>

        <div className="text-center text-gray-400 mt-8">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}
