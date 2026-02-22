"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"

export default function ApiV1TestPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const [email, setEmail] = useState("")
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)

  const apiEndpoints = ["/api/v1/subscribe", "/api/v1/subscribe-simple"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const newResults: Record<string, any> = {}

    for (const endpoint of apiEndpoints) {
      try {
        newResults[endpoint] = { status: "loading" }
        setResults({ ...newResults })

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        newResults[endpoint] = {
          status: response.status,
          ok: response.ok,
          data,
        }
      } catch (error: any) {
        newResults[endpoint] = {
          error: true,
          message: error.message,
        }
      }
    }

    setResults(newResults)
    setLoading(false)
  }

  const testGetEndpoints = async () => {
    setLoading(true)

    const newResults: Record<string, any> = {}

    for (const endpoint of apiEndpoints) {
      try {
        newResults[`${endpoint} (GET)`] = { status: "loading" }
        setResults((prev) => ({ ...prev, ...newResults }))

        const response = await fetch(endpoint)
        const data = await response.json()

        newResults[`${endpoint} (GET)`] = {
          status: response.status,
          ok: response.ok,
          data,
        }
      } catch (error: any) {
        newResults[`${endpoint} (GET)`] = {
          error: true,
          message: error.message,
        }
      }
    }

    setResults((prev) => ({ ...prev, ...newResults }))
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API v1 Test</h1>
      <p className="text-gray-600 mb-6">Cette page teste la nouvelle architecture API standardisée</p>

      <div className="mb-8 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
              className="flex-grow px-4 py-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading || !email}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Test en cours..." : "Tester POST"}
            </button>
          </div>
        </form>

        <button
          onClick={testGetEndpoints}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
        >
          {loading ? "Test en cours..." : "Tester GET"}
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(results).map(([endpoint, result]) => (
          <div key={endpoint} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{endpoint}</h2>

            {result?.status === "loading" ? (
              <div className="flex items-center mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                <p>Test en cours...</p>
              </div>
            ) : result?.error ? (
              <div className="mt-2 text-red-600">Error: {result.message}</div>
            ) : (
              <div className="mt-2">
                <div className="text-sm">
                  Status: <span className={result?.ok ? "text-green-600" : "text-red-600"}>{result?.status}</span>
                </div>

                {result?.data && (
                  <div className="mt-2">
                    <div className="text-sm font-medium">Response:</div>
                    <pre className="mt-1 bg-gray-100 p-3 rounded overflow-auto max-h-60">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
