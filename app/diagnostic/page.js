import Link from "next/link"

export default function DiagnosticPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Simplified Solution</h1>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Complete Simplification</h2>
        <p className="mb-4">To solve persistent problems, we've adopted a simplified solution:</p>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Removal of all problematic API routes</li>
          <li>Using an external service (Formspree) to handle form submissions</li>
          <li>Simplification of the architecture to avoid external dependencies</li>
          <li>Removal of internationalization to simplify routing</li>
        </ul>

        <p className="mt-4 text-green-700 font-medium">
          This approach ensures that the application works correctly in all environments.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">How It Works</h2>
        <p className="mb-4">
          The registration form now sends data directly to Formspree via a standard HTML submission, which:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Sends you an email for each new registration</li>
          <li>Stores all submissions in an online dashboard</li>
          <li>Allows data export in CSV format</li>
          <li>Offers integrations with other services (Zapier, Make, etc.)</li>
        </ul>
      </div>

      <div className="mt-8">
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
