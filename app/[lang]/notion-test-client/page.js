"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function NotionTestClientPage({ params }) {
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [envStatus, setEnvStatus] = useState({
    hasNotionApiKey: false,
    hasNotionDatabaseId: false,
  })

  // Charger le statut des variables d'environnement au chargement
  useEffect(() => {
    async function fetchEnvStatus() {
      try {
        const response = await fetch("/api/env-check")
        if (response.ok) {
          const data = await response.json()
          setEnvStatus({
            hasNotionApiKey: data.status.hasNotionApiKey,
            hasNotionDatabaseId: data.status.hasNotionDatabaseId,
          })
        }
      } catch (err) {
        console.error("Error fetching env status:", err)
      }
    }

    fetchEnvStatus()
  }, [])

  // Fonction pour tester la connexion à Notion côté client
  const testNotionConnection = async () => {
    setLoading(true)
    setError(null)
    setTestResult(null)

    try {
      // Vérifier les variables d'environnement
      if (!envStatus.hasNotionApiKey || !envStatus.hasNotionDatabaseId) {
        throw new Error("Les variables d'environnement ne sont pas configurées")
      }

      // Simuler un test de connexion
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setTestResult({
        success: true,
        timestamp: new Date().toISOString(),
        environment: envStatus,
        message: "Test de connexion simulé réussi",
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour tester la route API basique
  const testBasicApiRoute = async () => {
    setLoading(true)
    setError(null)
    setTestResult(null)

    try {
      const response = await fetch("/api/notion-basic")

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()

      setTestResult({
        success: true,
        timestamp: new Date().toISOString(),
        apiResponse: data,
        message: "Test de la route API basique réussi",
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Test de l'intégration Notion</h1>
      <p className="text-gray-600 mb-6">
        Cette page permet de tester l'intégration Notion sans utiliser les routes API complexes
      </p>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Options de test</h2>
          <p className="mb-4">Choisissez l'une des options de test suivantes :</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={testNotionConnection}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? "Test en cours..." : "Tester la connexion (simulation)"}
            </button>

            <button
              onClick={testBasicApiRoute}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              {loading ? "Test en cours..." : "Tester la route API basique"}
            </button>
          </div>
        </div>

        {/* Reste du code inchangé... */}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <Link
          href={`/${params.lang}/notion-diagnostic`}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Diagnostic Notion
        </Link>
        <Link
          href={`/${params.lang}/diagnostic`}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Diagnostic système
        </Link>
      </div>
    </div>
  )
}
