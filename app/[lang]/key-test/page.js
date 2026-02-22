"use client"

import { useState } from "react"
import Link from "next/link"

export default function KeyTestPage({ params }) {
  const [inputKey, setInputKey] = useState("")
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const testKey = async () => {
    try {
      setLoading(true)
      setError(null)
      setTestResult(null)

      if (!inputKey.trim()) {
        setError("Veuillez entrer une clé privée")
        return
      }

      const response = await fetch("/api/key-format-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: inputKey }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors du test de la clé")
      }

      setTestResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Test de format de clé privée</h1>
      <p className="text-gray-600 mb-6">
        Cet outil vérifie si votre clé privée est correctement formatée pour être utilisée avec Google API
      </p>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Votre clé privée</h2>
          <textarea
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Collez votre clé privée ici pour la tester..."
            className="w-full h-32 p-2 border border-gray-300 rounded-md font-mono text-sm"
          />
          <button
            onClick={testKey}
            disabled={loading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Test en cours..." : "Tester la clé"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        )}

        {testResult && (
          <div
            className={`bg-${testResult.analysis.isValid ? "green" : "yellow"}-50 border border-${testResult.analysis.isValid ? "green" : "yellow"}-200 rounded-lg p-4`}
          >
            <h2 className={`text-lg font-semibold text-${testResult.analysis.isValid ? "green" : "yellow"}-800 mb-2`}>
              Résultat du test
            </h2>
            <p className="mb-4">{testResult.message}</p>

            <div className="bg-white p-3 rounded border border-gray-200">
              <h3 className="font-medium mb-2">Analyse détaillée</h3>
              <ul className="space-y-1">
                <li>En-tête PEM: {testResult.analysis.hasPemHeader ? "✅ Présent" : "❌ Manquant"}</li>
                <li>Pied de page PEM: {testResult.analysis.hasPemFooter ? "✅ Présent" : "❌ Manquant"}</li>
                <li>Sauts de ligne: {testResult.analysis.hasNewlines ? "✅ Présents" : "❌ Manquants"}</li>
                <li>Longueur: {testResult.analysis.length} caractères</li>
              </ul>
            </div>

            {!testResult.analysis.isValid && (
              <div className="mt-4">
                <p className="font-medium">Recommandations:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {!testResult.analysis.hasPemHeader && (
                    <li>
                      Ajoutez l'en-tête{" "}
                      <code className="bg-gray-100 px-1 py-0.5 rounded">-----BEGIN PRIVATE KEY-----</code>
                    </li>
                  )}
                  {!testResult.analysis.hasPemFooter && (
                    <li>
                      Ajoutez le pied de page{" "}
                      <code className="bg-gray-100 px-1 py-0.5 rounded">-----END PRIVATE KEY-----</code>
                    </li>
                  )}
                  {!testResult.analysis.hasNewlines && (
                    <li>Ajoutez des sauts de ligne après l'en-tête et avant le pied de page</li>
                  )}
                  <li>
                    <Link href={`/${params.lang}/key-formatter`} className="text-blue-600 hover:underline">
                      Utilisez notre outil de formatage de clé
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <Link
          href={`/${params.lang}/key-formatter`}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Formater une clé
        </Link>
      </div>
    </div>
  )
}
