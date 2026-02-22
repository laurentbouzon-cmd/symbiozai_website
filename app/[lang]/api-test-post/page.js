"use client"

import { useState } from "react"
import Link from "next/link"

export default function ApiTestPost({ params }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTestPost = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/post-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ test: true }),
      })

      const data = await response.json()
      setResult({
        status: response.status,
        ok: response.ok,
        data,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">POST API Test</h1>

      <button
        onClick={handleTestPost}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Testing..." : "Test POST API"}
      </button>

      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>}

      {result && (
        <div className="mt-4">
          <div className="text-sm">
            Status: <span className={result.ok ? "text-green-600" : "text-red-600"}>{result.status}</span>
          </div>

          <pre className="mt-2 bg-gray-100 p-3 rounded overflow-auto max-h-60">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
