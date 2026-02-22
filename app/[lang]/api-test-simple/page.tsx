"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function ApiTestSimple({ params }: { params: { lang: string } }) {
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  const apiEndpoints = ["/api/ping", "/api/hello", "/api/test"]

  useEffect(() => {
    async function testApis() {
      const newResults: Record<string, any> = {}

      for (const endpoint of apiEndpoints) {
        try {
          const response = await fetch(endpoint)
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

    testApis()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple API Test</h1>

      {loading ? (
        <p>Testing API endpoints...</p>
      ) : (
        <div className="space-y-6">
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{endpoint}</h2>

              {results[endpoint]?.error ? (
                <div className="mt-2 text-red-600">Error: {results[endpoint].message}</div>
              ) : (
                <div className="mt-2">
                  <div className="text-sm">
                    Status:{" "}
                    <span className={results[endpoint]?.ok ? "text-green-600" : "text-red-600"}>
                      {results[endpoint]?.status}
                    </span>
                  </div>
                  <pre className="mt-2 bg-gray-100 p-3 rounded overflow-auto">
                    {JSON.stringify(results[endpoint]?.data, null, 2)}
                  </pre>
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
