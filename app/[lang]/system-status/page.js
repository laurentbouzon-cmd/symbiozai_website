"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function SystemStatusPage({ params }) {
  const [systemInfo, setSystemInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [envStatus, setEnvStatus] = useState(null)

  useEffect(() => {
    // Collecter les informations système côté client
    const collectSystemInfo = async () => {
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

        const info = {
          browser: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookiesEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            pixelRatio: window.devicePixelRatio,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          environment: {
            nodeEnv: process.env.NODE_ENV || "unknown",
          },
          performance: {
            memory:
              window.performance && window.performance.memory
                ? {
                    jsHeapSizeLimit: formatBytes(window.performance.memory.jsHeapSizeLimit),
                    totalJSHeapSize: formatBytes(window.performance.memory.totalJSHeapSize),
                    usedJSHeapSize: formatBytes(window.performance.memory.usedJSHeapSize),
                  }
                : "Not available",
            navigation:
              window.performance && window.performance.navigation
                ? {
                    redirectCount: window.performance.navigation.redirectCount,
                    type: getNavigationType(window.performance.navigation.type),
                  }
                : "Not available",
          },
          timestamp: new Date().toISOString(),
        }

        setSystemInfo(info)
        setEnvStatus(serverEnvStatus)
      } catch (error) {
        console.error("Error collecting system info:", error)
        setSystemInfo({ error: error.message })
      } finally {
        setLoading(false)
      }
    }

    // Simuler un délai pour donner l'impression d'un diagnostic
    setTimeout(() => {
      collectSystemInfo()
    }, 500)
  }, [])

  // Formater les octets en unités lisibles
  function formatBytes(bytes, decimals = 2) {
    if (!bytes) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  // Obtenir le type de navigation en texte
  function getNavigationType(type) {
    const types = {
      0: "Navigation normale",
      1: "Navigation avec rechargement",
      2: "Navigation retour/avant",
      255: "Navigation non définie",
    }
    return types[type] || `Type inconnu (${type})`
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">État du système</h1>
      <p className="text-gray-600 mb-6">
        Cette page affiche l'état actuel du système et les informations de diagnostic
      </p>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <span className="ml-3 text-lg">Collecte des informations système...</span>
        </div>
      ) : !systemInfo ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erreur</p>
          <p>Impossible de collecter les informations système</p>
        </div>
      ) : systemInfo.error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erreur</p>
          <p>{systemInfo.error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">État général</h2>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <p>Système opérationnel</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Dernière vérification: {new Date(systemInfo.timestamp).toLocaleString()}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h2 className="font-semibold">Informations navigateur</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">User Agent</p>
                  <p className="text-sm break-words">{systemInfo.browser.userAgent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Plateforme</p>
                  <p>{systemInfo.browser.platform}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Langue</p>
                  <p>{systemInfo.browser.language}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Résolution</p>
                  <p>
                    {systemInfo.browser.screenSize} (Ratio: {systemInfo.browser.pixelRatio}x)
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Fuseau horaire</p>
                  <p>{systemInfo.browser.timeZone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">État réseau</p>
                  <p>{systemInfo.browser.onLine ? "En ligne" : "Hors ligne"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Variables d'environnement vérifiées côté serveur */}
          {envStatus && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Variables d'environnement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(envStatus).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-medium text-gray-500">{key}</p>
                    <p className={value ? "text-green-600" : "text-red-600"}>{value ? "Configuré" : "Non configuré"}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Note: Pour des raisons de sécurité, les valeurs réelles des variables d'environnement ne sont pas
                  affichées. Seule la présence des variables est indiquée.
                </p>
              </div>
            </div>
          )}

          {systemInfo.performance.memory !== "Not available" && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h2 className="font-semibold">Performance</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mémoire JavaScript</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Limite du tas: {systemInfo.performance.memory.jsHeapSizeLimit}</li>
                      <li>Taille totale du tas: {systemInfo.performance.memory.totalJSHeapSize}</li>
                      <li>Taille utilisée du tas: {systemInfo.performance.memory.usedJSHeapSize}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Navigation</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Type: {systemInfo.performance.navigation.type}</li>
                      <li>Nombre de redirections: {systemInfo.performance.navigation.redirectCount}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Configuration des variables d'environnement</h2>
            <p className="mb-2">
              Pour que les diagnostics fonctionnent correctement, vous devez configurer les variables d'environnement
              suivantes:
            </p>
            <div className="bg-white p-3 rounded border border-yellow-200 text-sm font-mono">
              NOTION_API_KEY=votre_clé_api
              <br />
              NOTION_DATABASE_ID=votre_id_de_base_de_données
              <br />
              RESEND_API_KEY=votre_clé_api
              <br />
              EMAIL_FROM=votre_email
              <br />
              EMAIL_REPLY_TO=votre_email
            </div>
            <p className="mt-2 text-sm text-yellow-700">
              Les variables sont vérifiées côté serveur pour des raisons de sécurité.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex space-x-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Actualiser
        </button>
      </div>
    </div>
  )
}
