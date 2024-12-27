import WebhookForm from "@/app/components/webhook-form/webhook-form"

export default function WebhookPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Request</h1>
            <p>Answer the 3 question survey below with any goal you would like to achieve and receive a personalized visualization meditation in your inbox in less than 3 minutes.</p>
            <WebhookForm />
          </div>
        </div>
      </div>
    </div>
  )
}