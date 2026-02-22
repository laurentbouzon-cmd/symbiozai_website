"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function GoogleSheetTestContent({ params }) {
  const searchParams = useSearchParams()
  const [testEmail, setTestEmail] = useState("")
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sheetInfo, setSheetInfo] = useState(null)
  const [infoLoading, setInfoLoading] = useState(true)

  // Charger les informations sur la configuration Google Sheets
  useEffect(() => {
    async function fetchSheetInfo() {
      try {
        setInfoLoading(true)
        const response = await fetch("/api/google-sheet-info")

        if (response.ok) {
          const data = await response.json()
          setSheetInfo(data)
        } else {
          const errorData = await response.json()
          setError(`Erreur lors de la récupération des informations: ${errorData.message || response.statusText}`)
        }
      } catch (err) {
        console.error("Erreur:", err)
        setError(`Erreur lors de la récupération des informations: ${err.message}`)
      } finally {
        setInfoLoading(false)
      }
    }

    fetchSheetInfo()
  }, [])

  const testGoogleSheet = async () => {
    if (!testEmail || !testEmail.includes("@")) {
      setError("Veuillez entrer une adresse email valide")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setTestResult(null)

      const response = await fetch("/api/google-sheet-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: testEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors du test d'écriture dans Google Sheet")
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
      <h1 className="text-2xl font-bold mb-2">Test d'écriture Google Sheet</h1>
      <p className="text-gray-600 mb-6">
        Cet outil teste l'écriture dans votre Google Sheet et diagnostique les problèmes potentiels
      </p>

      <div className="space-y-6">
        {/* Informations sur la configuration */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Configuration actuelle</h2>

          {infoLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
              <p>Chargement des informations...</p>
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : sheetInfo ? (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Google Sheet ID:</span>{" "}
                {sheetInfo.sheetId ? (
                  <span className="text-green-600">{sheetInfo.sheetId} ✅</span>
                ) : (
                  <span className="text-red-600">Non configuré ❌</span>
                )}
              </div>

              <div>
                <span className="font-medium">Compte de service:</span>{" "}
                {sheetInfo.serviceAccount ? (
                  <span className="text-green-600">{sheetInfo.serviceAccount} ✅</span>
                ) : (
                  <span className="text-red-600">Non configuré ❌</span>
                )}
              </div>

              <div>
                <span className="font-medium">Méthode d'authentification:</span>{" "}
                <span className="text-green-600">{sheetInfo.authMethod || "Non détectée"}</span>
              </div>

              {sheetInfo.sheetId && sheetInfo.serviceAccount && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="font-medium text-yellow-800">Vérification importante :</p>
                  <p className="text-sm">
                    Assurez-vous que le compte de service <strong>{sheetInfo.serviceAccount}</strong> a été ajouté comme
                    éditeur dans votre Google Sheet. C'est la cause la plus fréquente des problèmes d'écriture.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p>Aucune information disponible</p>
          )}
        </div>

        {/* Test d'écriture */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Test d'écriture</h2>
          <p className="mb-4">
            Entrez une adresse email de test pour vérifier si l'écriture dans Google Sheet fonctionne correctement.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="email@exemple.com"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={testGoogleSheet}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Test en cours..." : "Tester l'écriture"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        )}

        {testResult && (
          <div
            className={`bg-${testResult.success ? "green" : "yellow"}-50 border border-${
              testResult.success ? "green" : "yellow"
            }-200 rounded-lg p-4`}
          >
            <h2 className={`text-lg font-semibold text-${testResult.success ? "green" : "yellow"}-800 mb-2`}>
              Résultat du test
            </h2>
            <p className="mb-4">{testResult.message}</p>

            {testResult.details && (
              <div className="bg-white p-3 rounded border border-gray-200">
                <h3 className="font-medium mb-2">Détails</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(testResult.details, null, 2)}
                </pre>
              </div>
            )}

            {testResult.success && (
              <p className="mt-4 text-green-700">
                ✅ Le test a réussi ! Vérifiez votre Google Sheet pour confirmer que les données ont été ajoutées.
              </p>
            )}

            {!testResult.success && testResult.troubleshooting && (
              <div className="mt-4">
                <p className="font-medium">Suggestions de dépannage :</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {testResult.troubleshooting.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Checklist de dépannage */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Checklist de dépannage</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Vérifiez les permissions :</strong> Assurez-vous que le compte de service a été ajouté comme
              éditeur dans votre Google Sheet
            </li>
            <li>
              <strong>Vérifiez l'ID du Sheet :</strong> Confirmez que l'ID du Google Sheet est correct
            </li>
            <li>
              <strong>Vérifiez le nom de l'onglet :</strong> Par défaut, le code utilise "Subscribers" comme nom
              d'onglet
            </li>
            <li>
              <strong>Vérifiez l'API Google Sheets :</strong> Assurez-vous que l'API Google Sheets est activée dans
              votre projet Google Cloud
            </li>
            <li>
              <strong>Vérifiez les logs :</strong> Consultez les logs de votre application dans Vercel pour voir s'il y
              a des erreurs
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <Link
          href={`/${params.lang}/google-setup`}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Configuration Google
        </Link>
      </div>
    </div>
  )
}
