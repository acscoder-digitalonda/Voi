"use client"

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { useEffect } from "react"
import { Goal } from "lucide-react"
import { Submission } from "../../types/submission"

interface SubmissionsListProps {
  submissions: Submission[]
}

const getDirectLink = (link: string) => {
  const fileId = link.match(/[-\w]{25,}/)?.[0];
  return fileId ? `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_ACCESS_KEY}` : '';
};

export default function SubmissionsList({ submissions }: SubmissionsListProps) {
  const checkAudioStatus = async (submissionId: string) => {
    try {
      const response = await fetch(`/auth/check-audio?submissionId=${submissionId}`)
      const result = await response.json()
      console.log("  audio status:", result.status)
      if (result.status === "success") {
        window.location.reload()
      } else {
        setTimeout(() => checkAudioStatus(submissionId), 20000)
      }
    } catch (error) {
      console.error("Error checking audio status:", error)
      setTimeout(() => checkAudioStatus(submissionId), 20000)
    }
  }

  useEffect(() => {
    submissions.forEach((submission) => {
      if (!submission.audio_link) {
        setTimeout(() => checkAudioStatus(submission.id),20000)
      }
    })
  }, [submissions])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Submissions</h2>
      {submissions.map((submission) => (
        <div key={submission.id}>
          <CardTitle>{submission.client_name}</CardTitle>
          <p className="text-sm text-gray-500 mb-4">
            {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
          </p>
        
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Goal className="h-4 w-4 text-gray-500" />
                <h3 className="font-semibold">Goal & Challenges</h3>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600">{submission.client_goal}</p>
                <p className="text-gray-600">{submission.client_challenges}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Tone</h3>
              <p className="text-gray-600">{submission.tone}</p>
            </div>
            <div>
              {submission.audio_link ? (
                <>
                  <h3 className="font-semibold mb-2">Audio</h3>
                  <audio controls>
                    <source src={getDirectLink(submission.audio_link)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold mb-2">Audio</h3>
                  <div className="flex items-start justify-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                  <p className="text-gray-500">
                    We're currently creating your audio file. This process usually takes about 10 minutes.<br/>
                    We'll send you an email as soon as it's ready. Thank you for your patience!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
