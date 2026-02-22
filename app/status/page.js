"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function StatusPage() {
  const [systemStatus, setSystemStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [envStatus, setEnvStatus] = useState(null)

  useEffect(() => {
    // Collecter les informations système côté client
    const collectSystemStatus = async () => {
      try {
        // Récupérer le statut des variables d'environnement côté serveur
        let serverEnvStatus = {}
        try {
          const envResponse = await fetch("/api/env-check")
          if (envResponse.ok) {
            const envData = await envResponse.json()
            serverEnvStatus = envData.status
          }
        } catch (envError) {
          console.error("Error fetching env status:", envError)
        }

        const status = {
          system: {
            status: "operational",
            lastChecked: new Date().toISOString(),
            environment: process.env.NODE_ENV || "unknown",
          },
          browser: {
            online: navigator.onLine,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
          },
          serverCheckedVars: serverEnvStatus,
        }

        setSystemStatus(status)
        setEnvStatus(serverEnvStatus)
      } catch (error) {
        console.error("Error collecting system status:", error)
        setSystemStatus({ error: error.message })
      } finally {
        setLoading(false)
      }
    }

    // Simuler un délai pour donner l'impression d'un diagnostic
    setTimeout(collectSystemStatus, 500)
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-2">System Status</h1>
      <p className="text-gray-600 mb-6">This page displays the current system status</p>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <span className="ml-3 text-lg">Checking system status...</span>
        </div>
      ) : !systemStatus ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>Unable to collect system information</p>
        </div>
      ) : systemStatus.error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{systemStatus.error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-green-800 mb-2">General Status</h2>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <p>System operational</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Last check: {new Date(systemStatus.system.lastChecked).toLocaleString()}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">System Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Environment</p>
                <p>{systemStatus.system.environment}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Connection Status</p>
                <p className={systemStatus.browser.online ? "text-green-600" : "text-red-600"}>
                  {systemStatus.browser.online ? "Online" : "Offline"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Platform</p>
                <p>{systemStatus.browser.platform}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Resolution</p>
                <p>{systemStatus.browser.screenSize}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">Environment Variables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Server-checked environment variables */}
              {envStatus &&
                Object.entries(envStatus).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-medium text-gray-500">{key.toUpperCase()}</p>
                    <p className={value ? "text-green-600" : "text-red-600"}>
                      {value ? "Configured" : "Not configured"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex space-x-4">
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Back to Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}
