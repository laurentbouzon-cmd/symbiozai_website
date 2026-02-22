"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function NotionDiagnosticPage({ params }) {
  const [diagnosticInfo, setDiagnosticInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [apiTestResult, setApiTestResult] = useState(null)
  const [apiTestLoading, setApiTestLoading] = useState(false)
  const [apiTestError, setApiTestError] = useState(null)
  const [envStatus, setEnvStatus] = useState(null)

  useEffect(() => {
    async function runDiagnostic() {
      try {
        setLoading(true)

        // Vérifier les variables d'environnement côté serveur via API
        let envInfo = {
          nodeEnv: process.env.NODE_ENV || "unknown",
        }

        try {
          const envResponse = await fetch("/api/env-check")
          if (envResponse.ok) {
            const envData = await envResponse.json()
            envInfo = {
              ...envInfo,
              ...envData.status,
            }
          }
        } catch (envError) {
          console.error("Error fetching env status:", envError)
        }

        // Simuler un délai pour donner l'impression d'un diagnostic
        await new Promise((resolve) => setTimeout(resolve, 500))

        setDiagnosticInfo({
          timestamp: new Date().toISOString(),
          environment: envInfo,
          clientInfo: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
          },
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    runDiagnostic()
  }, [])

  // Reste du code inchangé...

  // Fonction pour tester la route API notion-basic
  const testNotionBasicApi = async () => {
    setApiTestLoading(true)
    setApiTestError(null)
    setApiTestResult(null)

    try {
      const response = await fetch("/api/notion-basic")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setApiTestResult(data)
    } catch (err) {
      console.error("Error testing Notion API:", err)
      setApiTestError(err.message)
    } finally {
      setApiTestLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Notion Diagnostic</h1>
      <p className="text-gray-600 mb-6">Cette page affiche les informations de diagnostic pour l'intégration Notion</p>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <span className="ml-3 text-lg">Exécution du diagnostic...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Horodatage</p>
                <p>{diagnosticInfo.timestamp}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Environnement</p>
                <p>{diagnosticInfo.environment.nodeEnv}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Configuration Notion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">API Key configurée</p>
                <p className={diagnosticInfo.environment.hasNotionApiKey ? "text-green-600" : "text-red-600"}>
                  {diagnosticInfo.environment.hasNotionApiKey ? "Oui" : "Non"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID de base de données configuré</p>
                <p className={diagnosticInfo.environment.hasNotionDatabaseId ? "text-green-600" : "text-red-600"}>
                  {diagnosticInfo.environment.hasNotionDatabaseId ? "Oui" : "Non"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Note: Pour des raisons de sécurité, les valeurs réelles des variables d'environnement ne sont pas
                affichées. Seule la présence des variables est indiquée.
              </p>
            </div>
          </div>

          {/* Reste du code inchangé... */}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <Link
          href={`/${params.lang}/diagnostic`}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Retour au diagnostic
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Actualiser le diagnostic
        </button>
      </div>
    </div>
  )
}
