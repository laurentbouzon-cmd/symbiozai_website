"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ApiTestMinimalContent({ params }) {
  const searchParams = useSearchParams()
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)

  const apiEndpoints = [
    { url: "/api/text", expectJson: false },
    { url: "/api/raw", expectJson: false },
    { url: "/api/minimal", expectJson: true },
    { url: "/api/ping", expectJson: true },
  ]

  useEffect(() => {
    async function testApis() {
      const newResults = {}

      for (const endpoint of apiEndpoints) {
        try {
          newResults[endpoint.url] = { status: "loading" }
          setResults({ ...newResults })

          const response = await fetch(endpoint.url)

          if (endpoint.expectJson) {
            try {
              const data = await response.json()
              newResults[endpoint.url] = {
                status: response.status,
                ok: response.ok,
                data,
              }
            } catch (jsonError) {
              const text = await response.text()
              newResults[endpoint.url] = {
                status: response.status,
                ok: response.ok,
                error: jsonError.message,
                text,
              }
            }
          } else {
            const text = await response.text()
            newResults[endpoint.url] = {
              status: response.status,
              ok: response.ok,
              text,
            }
          }
        } catch (error) {
          newResults[endpoint.url] = {
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal API Test</h1>
      <p className="mb-4 text-gray-600">Testing ultra-minimal API routes</p>

      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
          <p>Testing API endpoints...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint.url} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{endpoint.url}</h2>
              <div className="text-xs text-gray-500 mt-1">{endpoint.expectJson ? "Expects JSON" : "Expects Text"}</div>

              {results[endpoint.url]?.status === "loading" ? (
                <div className="flex items-center mt-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                  <p>Loading...</p>
                </div>
              ) : results[endpoint.url]?.error ? (
                <div className="mt-2 text-red-600">Error: {results[endpoint.url].message}</div>
              ) : (
                <div className="mt-2">
                  <div className="text-sm">
                    Status:{" "}
                    <span className={results[endpoint.url]?.ok ? "text-green-600" : "text-red-600"}>
                      {results[endpoint.url]?.status}
                    </span>
                  </div>

                  {results[endpoint.url]?.text && (
                    <div className="mt-2">
                      <div className="text-sm font-medium">Response Text:</div>
                      <div className="bg-gray-100 p-3 rounded overflow-auto mt-1">{results[endpoint.url].text}</div>
                    </div>
                  )}

                  {results[endpoint.url]?.data && (
                    <div className="mt-2">
                      <div className="text-sm font-medium">Response JSON:</div>
                      <pre className="bg-gray-100 p-3 rounded overflow-auto mt-1 max-h-60">
                        {JSON.stringify(results[endpoint.url].data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
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
