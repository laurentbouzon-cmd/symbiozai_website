"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getLocaleText } from "@/lib/locale-utils"

export default function ApiDiagnosticPage({ params }) {
  const dictionary = getLocaleText(params.lang)
  const [diagnosticResults, setDiagnosticResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [envStatus, setEnvStatus] = useState(null)

  useEffect(() => {
    // Charger le statut des variables d'environnement au chargement
    async function fetchEnvStatus() {
      try {
        const response = await fetch("/api/env-check")
        if (response.ok) {
          const data = await response.json()
          setEnvStatus(data.status)
        }
      } catch (err) {
        console.error("Error fetching env status:", err)
      }
    }

    fetchEnvStatus()
  }, [])

  const runDiagnostic = async () => {
    setLoading(true)
    setError(null)

    try {
      const results = {
        environment: {
          nodeEnv: process.env.NODE_ENV || "unknown",
          serverCheckedVars: envStatus || {},
        },
        apiTests: {},
      }

      // Tester différentes routes API
      const apiEndpoints = ["/api/hello", "/api/ping", "/api/simple-ping", "/api/status"]

      for (const endpoint of apiEndpoints) {
        try {
          const response = await fetch(endpoint, {
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          })

          const contentType = response.headers.get("content-type")

          if (contentType && contentType.includes("application/json")) {
            try {
              const data = await response.json()
              results.apiTests[endpoint] = {
                status: response.status,
                ok: response.ok,
                contentType,
                data,
              }
            } catch (jsonError) {
              results.apiTests[endpoint] = {
                status: response.status,
                ok: false,
                contentType,
                error: `JSON parse error: ${jsonError.message}`,
              }
            }
          } else {
            const text = await response.text()
            results.apiTests[endpoint] = {
              status: response.status,
              ok: response.ok,
              contentType,
              isHtml: text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html"),
              textPreview: text.length > 100 ? text.substring(0, 100) + "..." : text,
            }
          }
        } catch (error) {
          results.apiTests[endpoint] = {
            error: true,
            message: error.message,
          }
        }
      }

      setDiagnosticResults(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Diagnostic des API</h1>
      <p className="text-gray-600 mb-6">
        Cette page effectue un diagnostic des routes API pour identifier les problèmes potentiels
      </p>

      <button
        onClick={runDiagnostic}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Diagnostic en cours..." : "Lancer le diagnostic"}
      </button>

      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
        </div>
      )}

      {diagnosticResults && (
        <div className="mt-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Environnement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Node Environment</p>
                <p>{diagnosticResults.environment.nodeEnv}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Variables d'environnement</p>
                <ul className="list-disc list-inside text-sm">
                  {envStatus &&
                    Object.entries(envStatus).map(([key, value]) => (
                      <li key={key} className={value ? "text-green-600" : "text-red-600"}>
                        {key}: {value ? "Configuré" : "Non configuré"}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Résultats des tests API</h2>

            <div className="space-y-4">
              {Object.entries(diagnosticResults.apiTests).map(([endpoint, result]) => (
                <div key={endpoint} className="bg-white border rounded-lg overflow-hidden">
                  <div className={`p-3 ${result.ok ? "bg-green-100" : "bg-red-100"} border-b`}>
                    <h3 className="font-medium">{endpoint}</h3>
                    <div className="text-sm">
                      Status: <span className={result.ok ? "text-green-600" : "text-red-600"}>{result.status}</span>
                    </div>
                    {result.contentType && (
                      <div className="text-sm">
                        Content-Type:{" "}
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{result.contentType}</code>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    {result.error ? (
                      <div className="text-red-600 text-sm">{result.message || result.error}</div>
                    ) : result.data ? (
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    ) : result.textPreview ? (
                      <div>
                        <div className="text-sm font-medium mb-1">
                          {result.isHtml ? "HTML Response:" : "Text Response:"}
                        </div>
                        <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                          {result.textPreview}
                        </pre>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Recommandations</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Si les routes API renvoient du HTML au lieu de JSON, cela peut indiquer une erreur 404 ou 500</li>
              <li>Vérifiez que les routes API sont correctement implémentées et renvoient des réponses JSON valides</li>
              <li>Pour les routes qui fonctionnent, utilisez-les comme modèle pour corriger les autres</li>
              <li>Considérez l'utilisation de l'ancienne structure pages/api pour une meilleure compatibilité</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
