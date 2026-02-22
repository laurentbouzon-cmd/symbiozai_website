"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function PingTestPage({ params }) {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)

  const pingEndpoints = ["/ping", "/api/ping", "/api/hello"]

  useEffect(() => {
    async function testPingEndpoints() {
      const newResults = {}

      for (const endpoint of pingEndpoints) {
        try {
          newResults[endpoint] = { status: "loading" }
          setResults({ ...newResults })

          const response = await fetch(endpoint, {
            cache: "no-store",
            headers: { Accept: "application/json" },
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

    testPingEndpoints()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ping Test</h1>
      <p className="text-gray-600 mb-6">
        Cette page teste les différentes routes API pour vérifier leur fonctionnement
      </p>

      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
          <p>Test des endpoints en cours...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pingEndpoints.map((endpoint) => (
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
      )}

      <div className="mt-6 space-x-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Rafraîchir les tests
        </button>
      </div>
    </div>
  )
}
