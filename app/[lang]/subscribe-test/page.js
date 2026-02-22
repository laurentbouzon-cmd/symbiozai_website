"use client"

import { useState } from "react"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"

export default function SubscribeTestPage({ params }) {
  const dictionary = getDictionary(params.lang)
  const [email, setEmail] = useState("")
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const subscribeEndpoints = ["/api/subscribe", "/api/subscribe-simple"]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const newResults = {}

    for (const endpoint of subscribeEndpoints) {
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

        const contentType = response.headers.get("content-type")

        if (contentType && contentType.includes("application/json")) {
          try {
            const data = await response.json()
            newResults[endpoint] = {
              status: response.status,
              ok: response.ok,
              contentType,
              data,
            }
          } catch (jsonError) {
            newResults[endpoint] = {
              status: response.status,
              ok: false,
              contentType,
              error: `JSON parse error: ${jsonError.message}`,
              text: await response.text(),
            }
          }
        } else {
          const text = await response.text()
          newResults[endpoint] = {
            status: response.status,
            ok: response.ok,
            contentType,
            isHtml: text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html"),
            text: text.length > 500 ? text.substring(0, 500) + "..." : text,
          }
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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test d'inscription</h1>
      <p className="text-gray-600 mb-6">Cette page teste les différentes routes API d'inscription</p>

      <form onSubmit={handleSubmit} className="mb-8">
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
            {loading ? "Test en cours..." : "Tester l'inscription"}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {subscribeEndpoints.map((endpoint) => (
          <div key={endpoint} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{endpoint}</h2>

            {!results[endpoint] ? (
              <p className="text-gray-500 mt-2">Pas encore testé</p>
            ) : results[endpoint]?.status === "loading" ? (
              <div className="flex items-center mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                <p>Test en cours...</p>
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

                {results[endpoint]?.contentType && (
                  <div className="text-sm mt-1">
                    Content-Type:{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{results[endpoint].contentType}</code>
                  </div>
                )}

                {results[endpoint]?.data && (
                  <div className="mt-2">
                    <div className="text-sm font-medium">JSON Response:</div>
                    <pre className="mt-1 bg-gray-100 p-3 rounded overflow-auto max-h-60">
                      {JSON.stringify(results[endpoint].data, null, 2)}
                    </pre>
                  </div>
                )}

                {results[endpoint]?.text && (
                  <div className="mt-2">
                    <div className="text-sm font-medium">
                      {results[endpoint].isHtml ? "HTML Response:" : "Text Response:"}
                    </div>
                    <pre className="mt-1 bg-gray-100 p-3 rounded overflow-auto max-h-60 text-xs">
                      {results[endpoint].text}
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
