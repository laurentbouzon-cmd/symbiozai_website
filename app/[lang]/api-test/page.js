"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getLocaleText } from "@/lib/locale-utils"

export default function ApiTest({ params }) {
  const dictionary = getLocaleText(params.lang)
  const [result, setResult] = useState("Loading...")
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/simple")
        const data = await response.json()
        setResult(JSON.stringify(data, null, 2))
      } catch (err) {
        setError(err.message || "An error occurred")
        setResult("Failed to fetch data")
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">{dictionary.apiTest.title}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{dictionary.apiTest.apiResponse}</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-w-full">{result}</pre>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <strong>{dictionary.apiTest.error}</strong> {error}
          </div>
        )}
      </div>

      <div className="mt-4">
        <Link
          href={`/${params.lang}`}
          className="px-4 py-2 bg-gradient-to-r from-[#1a237e] to-[#00e5ff] text-white rounded hover:opacity-90 transition-all duration-300"
        >
          {dictionary.apiTest.backToHome}
        </Link>
      </div>
    </div>
  )
}
