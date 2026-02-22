"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"

export default function ApiStatus({ params }) {
  const dictionary = getDictionary(params.lang)
  const [apiStatus, setApiStatus] = useState({})
  const [loading, setLoading] = useState(true)

  const apiRoutes = [
    { name: "/api/hello", path: "/api/hello" },
    { name: "/api/simple", path: "/api/simple" },
    { name: "/api/resend-status", path: "/api/resend-status" },
    { name: "/api/notion-simple-test", path: "/api/notion-simple-test" },
    { name: "/api/email-simple-test", path: "/api/email-simple-test", params: "?email=test@example.com" },
    { name: "/api/subscribe (POST)", path: "/api/subscribe", method: "POST", body: { email: "test@example.com" } },
  ]

  useEffect(() => {
    async function checkApiStatus() {
      const results = {}

      for (const route of apiRoutes) {
        try {
          setApiStatus((prev) => ({ ...prev, [route.path]: { status: "checking" } }))

          const fullPath = route.params ? `${route.path}${route.params}` : route.path

          const response = await fetch(fullPath, {
            method: route.method || "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: route.body ? JSON.stringify(route.body) : undefined,
          })

          const data = await response.json()

          results[route.path] = {
            status: response.ok ? "ok" : "error",
            statusCode: response.status,
            data: data,
          }
        } catch (error) {
          results[route.path] = {
            status: "error",
            error: error.message,
          }
        }
      }

      setApiStatus(results)
      setLoading(false)
    }

    checkApiStatus()
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">API Status Check</h1>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <span className="ml-2">Checking API routes...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {apiRoutes.map((route) => (
            <div key={route.path} className="border rounded-lg overflow-hidden">
              <div
                className={`p-4 ${
                  apiStatus[route.path]?.status === "ok"
                    ? "bg-green-100"
                    : apiStatus[route.path]?.status === "error"
                      ? "bg-red-100"
                      : "bg-gray-100"
                }`}
              >
                <h2 className="text-xl font-semibold">{route.name}</h2>
                <div className="mt-2">
                  <span className="font-medium">Status: </span>
                  <span
                    className={`${
                      apiStatus[route.path]?.status === "ok"
                        ? "text-green-600"
                        : apiStatus[route.path]?.status === "error"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {apiStatus[route.path]?.status === "ok"
                      ? "Working"
                      : apiStatus[route.path]?.status === "error"
                        ? "Error"
                        : "Checking..."}
                  </span>
                  {apiStatus[route.path]?.statusCode && (
                    <span className="ml-2 text-gray-500">(HTTP {apiStatus[route.path].statusCode})</span>
                  )}
                </div>
              </div>

              {apiStatus[route.path]?.data && (
                <div className="p-4 bg-gray-50 border-t">
                  <h3 className="font-medium mb-2">Response:</h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-60">
                    {JSON.stringify(apiStatus[route.path].data, null, 2)}
                  </pre>
                </div>
              )}

              {apiStatus[route.path]?.error && (
                <div className="p-4 bg-red-50 border-t">
                  <h3 className="font-medium mb-2">Error:</h3>
                  <pre className="bg-red-100 p-3 rounded text-sm text-red-800">{apiStatus[route.path].error}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          href={`/${params.lang}`}
          className="px-4 py-2 bg-gradient-to-r from-[#1a237e] to-[#00e5ff] text-white rounded hover:opacity-90 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
