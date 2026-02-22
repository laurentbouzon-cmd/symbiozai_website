"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ApiTestEmailContent({ params }) {
  const searchParams = useSearchParams()
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)
  const [testEmail, setTestEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false)

  const apiEndpoints = ["/api/email-check", "/api/email-import"]

  // Valider le format de l'email
  useEffect(() => {
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail))
  }, [testEmail])

  useEffect(() => {
    async function testApis() {
      const newResults = {}

      for (const endpoint of apiEndpoints) {
        try {
          newResults[endpoint] = { status: "loading" }
          setResults({ ...newResults })

          const response = await fetch(endpoint)
          let data

          try {
            data = await response.json()
          } catch (jsonError) {
            data = { jsonError: jsonError.message, text: await response.text() }
          }

          newResults[endpoint] = {
            status: response.status,
            ok: response.ok,
            data,
          }
        } catch (error) {
          newResults[endpoint] = {
            error: true,
            message: error.message,
          }
        }
      }

      setResults(newResults)
      setLoading(false)
    }

    testApis()
  }, [])

  const handleSendTest = async () => {
    if (!isValidEmail) return

    try {
      setResults((prev) => ({
        ...prev,
        "/api/email-minimal": { status: "loading" },
      }))

      const response = await fetch(`/api/email-minimal?email=${encodeURIComponent(testEmail)}`)
      let data

      try {
        data = await response.json()
      } catch (jsonError) {
        data = { jsonError: jsonError.message, text: await response.text() }
      }

      setResults((prev) => ({
        ...prev,
        "/api/email-minimal": {
          status: response.status,
          ok: response.ok,
          data,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        "/api/email-minimal": {
          error: true,
          message: error.message,
        },
      }))
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Email API Test</h1>

      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
          <p>Testing API endpoints...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{endpoint}</h2>

              {results[endpoint]?.status === "loading" ? (
                <div className="flex items-center mt-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                  <p>Loading...</p>
                </div>
              ) : results[endpoint]?.error ? (
                <div className="mt-2 text-red-600">Error: {results[endpoint].message}</div>
              ) : (
                <div className="mt-2">
                  <div className="text-sm">
                    Status:{" "}
                    <span className={results[endpoint]?.ok ? "text-green-600" : "text-red-600"}>
                      {results[endpoint]?.status}
                    </span>
                  </div>
                  <pre className="mt-2 bg-gray-100 p-3 rounded overflow-auto max-h-60">
                    {JSON.stringify(results[endpoint]?.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}

          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">/api/email-minimal</h2>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 border rounded"
              />
              <button
                onClick={handleSendTest}
                disabled={!isValidEmail}
                className={`px-4 py-2 rounded ${
                  isValidEmail
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Send Test Email
              </button>
            </div>

            {results["/api/email-minimal"] && (
              <div className="mt-4">
                {results["/api/email-minimal"]?.status === "loading" ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                    <p>Sending email...</p>
                  </div>
                ) : results["/api/email-minimal"]?.error ? (
                  <div className="text-red-600">Error: {results["/api/email-minimal"].message}</div>
                ) : (
                  <div>
                    <div className="text-sm">
                      Status:{" "}
                      <span className={results["/api/email-minimal"]?.ok ? "text-green-600" : "text-red-600"}>
                        {results["/api/email-minimal"]?.status}
                      </span>
                    </div>
                    <pre className="mt-2 bg-gray-100 p-3 rounded overflow-auto max-h-60">
                      {JSON.stringify(results["/api/email-minimal"]?.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
