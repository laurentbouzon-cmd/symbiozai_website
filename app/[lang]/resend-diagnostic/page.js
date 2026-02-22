"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function ResendDiagnosticPage({ params }) {
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

        // Simuler un délai pour donner l'impression d'un diagnostic
        await new Promise((resolve) => setTimeout(resolve, 500))

        setDiagnosticInfo({
          timestamp: new Date().toISOString(),
          environment: {
            nodeEnv: process.env.NODE_ENV || "unknown",
            serverCheckedVars: serverEnvStatus,
          },
          clientInfo: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
          },
        })

        setEnvStatus(serverEnvStatus)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    runDiagnostic()
  }, [])

  // Fonction pour tester la route API resend-status
  const testResendApi = async () => {
    setApiTestLoading(true)
    setApiTestError(null)
    setApiTestResult(null)

    try {
      const response = await fetch("/api/resend-status")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setApiTestResult(data)
    } catch (err) {
      console.error("Error testing Resend API:", err)
      setApiTestError(err.message)
    } finally {
      setApiTestLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Resend Diagnostic</h1>
      <p className="text-gray-600 mb-6">Cette page affiche les informations de diagnostic pour l'intégration Resend</p>

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

          {envStatus && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Configuration Resend</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">API Key configurée</p>
                  <p className={envStatus.hasResendApiKey ? "text-green-600" : "text-red-600"}>
                    {envStatus.hasResendApiKey ? "Oui" : "Non"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email d'expéditeur configuré</p>
                  <p className={envStatus.hasEmailFrom ? "text-green-600" : "text-red-600"}>
                    {envStatus.hasEmailFrom ? "Oui" : "Non"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email de réponse configuré</p>
                  <p className={envStatus.hasEmailReplyTo ? "text-green-600" : "text-red-600"}>
                    {envStatus.hasEmailReplyTo ? "Oui" : "Non"}
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
          )}

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">Test de l'API Resend</h2>
            <p className="mb-4">
              Cliquez sur le bouton ci-dessous pour tester la route API de statut Resend. Cela vérifiera si les routes
              API fonctionnent correctement.
            </p>

            <button
              onClick={testResendApi}
              disabled={apiTestLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-purple-300"
            >
              {apiTestLoading ? "Test en cours..." : "Tester la route API Resend"}
            </button>

            {apiTestError && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p className="font-bold">Erreur de test API</p>
                <p>{apiTestError}</p>
              </div>
            )}

            {apiTestResult && (
              <div className="mt-4">
                <h3 className="font-medium text-purple-800 mb-2">Résultat du test API</h3>
                <pre className="bg-white p-3 rounded border border-purple-200 overflow-auto text-sm">
                  {JSON.stringify(apiTestResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Informations client</h2>
            <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
              {JSON.stringify(diagnosticInfo.clientInfo, null, 2)}
            </pre>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Étapes de dépannage</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Vérifiez que la variable d'environnement{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">RESEND_API_KEY</code> est correctement définie.
              </li>
              <li>
                Vérifiez que la variable d'environnement{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">EMAIL_FROM</code> est correctement définie avec une
                adresse email valide.
              </li>
              <li>Assurez-vous que le domaine de l'adresse email d'expéditeur est vérifié dans Resend.</li>
              <li>
                Vérifiez que la variable d'environnement{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">EMAIL_REPLY_TO</code> est correctement définie.
              </li>
              <li>Assurez-vous que l'API key Resend a les permissions nécessaires pour envoyer des emails.</li>
            </ol>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">Configuration des variables d'environnement</h2>
            <p className="mb-2">
              Pour que ce diagnostic fonctionne correctement, vous devez configurer les variables d'environnement
              suivantes:
            </p>
            <div className="bg-white p-3 rounded border border-indigo-200 text-sm font-mono">
              RESEND_API_KEY=votre_clé_api_resend
              <br />
              EMAIL_FROM=votre_email_expéditeur
              <br />
              EMAIL_REPLY_TO=votre_email_réponse
            </div>
            <p className="mt-2 text-sm text-indigo-700">
              Les variables sont vérifiées côté serveur pour des raisons de sécurité.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Problèmes connus</h2>
            <p className="mb-2">
              Si vous rencontrez l'erreur "Unknown error" lors de la prévisualisation des routes API, cela peut être dû
              à des limitations de l'environnement de prévisualisation. Voici quelques solutions alternatives :
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Utilisez les pages de diagnostic statiques (comme celle-ci) qui ne dépendent pas des routes API</li>
              <li>Déployez l'application sur Vercel pour tester les routes API dans un environnement de production</li>
              <li>
                Exécutez l'application localement avec{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">npm run dev</code> pour tester les routes API
              </li>
            </ul>
          </div>
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
