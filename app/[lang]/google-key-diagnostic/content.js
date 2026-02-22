"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function GoogleKeyDiagnosticContent({ params }) {
  const searchParams = useSearchParams()
  const [diagnosticInfo, setDiagnosticInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fixedKey, setFixedKey] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchDiagnostic() {
      try {
        setLoading(true)

        // Récupérer les informations de diagnostic
        const response = await fetch("/api/google-key-fix", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "diagnose" }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setDiagnosticInfo(data.diagnostics)
        if (data.diagnostics.fixedKey) {
          setFixedKey(data.diagnostics.fixedKey.fixed)
        }
      } catch (err) {
        console.error("Error fetching Google diagnostic:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDiagnostic()
  }, [])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Diagnostic avancé Google</h1>
      <p className="text-gray-600 mb-6">
        Cet outil analyse en détail votre configuration Google et propose des solutions pour résoudre les problèmes
      </p>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <span className="ml-3 text-lg">Analyse en cours...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Recommandations */}
          {diagnosticInfo.recommendations && diagnosticInfo.recommendations.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Recommandations</h2>
              <div className="space-y-4">
                {diagnosticInfo.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      rec.priority === "high"
                        ? "bg-red-50 border border-red-200"
                        : rec.priority === "medium"
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <h3 className="font-medium">{rec.title}</h3>
                    <p className="text-sm mt-1">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problèmes détectés */}
          {((diagnosticInfo.privateKey &&
            diagnosticInfo.privateKey.problems &&
            diagnosticInfo.privateKey.problems.length > 0) ||
            (diagnosticInfo.credentialsJson &&
              diagnosticInfo.credentialsJson.problems &&
              diagnosticInfo.credentialsJson.problems.length > 0) ||
            (diagnosticInfo.missingVars && diagnosticInfo.missingVars.length > 0)) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Problèmes détectés</h2>

              {diagnosticInfo.privateKey &&
                diagnosticInfo.privateKey.problems &&
                diagnosticInfo.privateKey.problems.length > 0 && (
                  <div className="mb-3">
                    <h3 className="font-medium">Problèmes avec la clé privée :</h3>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {diagnosticInfo.privateKey.problems.map((problem, index) => (
                        <li key={index} className="text-sm text-red-700">
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {diagnosticInfo.credentialsJson &&
                diagnosticInfo.credentialsJson.problems &&
                diagnosticInfo.credentialsJson.problems.length > 0 && (
                  <div className="mb-3">
                    <h3 className="font-medium">Problèmes avec les credentials JSON :</h3>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {diagnosticInfo.credentialsJson.problems.map((problem, index) => (
                        <li key={index} className="text-sm text-red-700">
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {diagnosticInfo.missingVars && diagnosticInfo.missingVars.length > 0 && (
                <div>
                  <h3 className="font-medium">Variables manquantes :</h3>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {diagnosticInfo.missingVars.map((variable, index) => (
                      <li key={index} className="text-sm text-red-700">
                        {variable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Clé privée corrigée */}
          {fixedKey && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Clé privée corrigée</h2>
              <p className="mb-2">
                Nous avons corrigé le format de votre clé privée. Copiez cette version corrigée et utilisez-la comme
                nouvelle valeur pour la variable d'environnement{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">GOOGLE_PRIVATE_KEY</code>.
              </p>

              {diagnosticInfo.fixedKey && diagnosticInfo.fixedKey.changes && (
                <div className="mb-3">
                  <h3 className="font-medium text-sm">Modifications apportées :</h3>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {diagnosticInfo.fixedKey.changes.map((change, index) => (
                      <li key={index} className="text-xs text-green-700">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-3 flex flex-col space-y-2">
                <div className="flex justify-end">
                  <button
                    onClick={() => copyToClipboard(fixedKey)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    {copied ? "Copié !" : "Copier la clé corrigée"}
                  </button>
                </div>
                <div className="bg-white p-3 rounded border border-green-200 text-xs overflow-auto max-h-40 whitespace-pre-wrap">
                  {fixedKey}
                </div>
              </div>
            </div>
          )}

          {/* Diagnostic détaillé */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Diagnostic détaillé</h2>

            <div className="space-y-4">
              {/* Clé privée */}
              <div className="bg-white p-3 rounded border border-gray-200">
                <h3 className="font-medium">Clé privée</h3>
                {diagnosticInfo.privateKey && diagnosticInfo.privateKey.available ? (
                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Longueur:</span> {diagnosticInfo.privateKey.length} caractères
                    </p>
                    <p>
                      <span className="font-medium">En-tête PEM:</span>{" "}
                      {diagnosticInfo.privateKey.hasPemHeader ? "✅ Présent" : "❌ Absent"}
                    </p>
                    <p>
                      <span className="font-medium">Pied de page PEM:</span>{" "}
                      {diagnosticInfo.privateKey.hasPemFooter ? "✅ Présent" : "❌ Absent"}
                    </p>
                    <p>
                      <span className="font-medium">Sauts de ligne littéraux (\n):</span>{" "}
                      {diagnosticInfo.privateKey.hasLiteralNewlines ? "✅ Présents" : "❌ Absents"}
                    </p>
                    <p>
                      <span className="font-medium">Vrais sauts de ligne:</span>{" "}
                      {diagnosticInfo.privateKey.hasRealNewlines ? "✅ Présents" : "❌ Absents"}
                    </p>
                    <p>
                      <span className="font-medium">Début:</span>{" "}
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                        {diagnosticInfo.privateKey.firstChars}
                      </code>
                    </p>
                    <p>
                      <span className="font-medium">Fin:</span>{" "}
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                        {diagnosticInfo.privateKey.lastChars}
                      </code>
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-red-600 text-sm">Non configurée</p>
                )}
              </div>

              {/* Credentials JSON */}
              <div className="bg-white p-3 rounded border border-gray-200">
                <h3 className="font-medium">Credentials JSON</h3>
                {diagnosticInfo.credentialsJson && diagnosticInfo.credentialsJson.available ? (
                  diagnosticInfo.credentialsJson.valid ? (
                    <div className="mt-2 space-y-1 text-sm">
                      <p className="text-green-600 font-medium">✅ JSON valide</p>
                      <p>
                        <span className="font-medium">Clé privée:</span>{" "}
                        {diagnosticInfo.credentialsJson.hasPrivateKey ? "✅ Présente" : "❌ Absente"}
                      </p>
                      <p>
                        <span className="font-medium">Email client:</span>{" "}
                        {diagnosticInfo.credentialsJson.hasClientEmail ? "✅ Présent" : "❌ Absent"}
                      </p>
                      <p>
                        <span className="font-medium">Champs présents:</span>{" "}
                        {diagnosticInfo.credentialsJson.fields.join(", ")}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2 space-y-1 text-sm">
                      <p className="text-red-600 font-medium">❌ JSON invalide</p>
                      <p>
                        <span className="font-medium">Erreur:</span> {diagnosticInfo.credentialsJson.error}
                      </p>
                      <p>
                        <span className="font-medium">Longueur:</span> {diagnosticInfo.credentialsJson.length}{" "}
                        caractères
                      </p>
                      <p>
                        <span className="font-medium">Aperçu:</span>{" "}
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                          {diagnosticInfo.credentialsJson.preview}
                        </code>
                      </p>
                    </div>
                  )
                ) : (
                  <p className="mt-2 text-yellow-600 text-sm">Non configurés</p>
                )}
              </div>

              {/* Autres variables */}
              <div className="bg-white p-3 rounded border border-gray-200">
                <h3 className="font-medium">Autres variables</h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(diagnosticInfo.otherVars).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium">{key}:</span>{" "}
                      <span className={value ? "text-green-600" : "text-red-600"}>
                        {value ? "✅ Configuré" : "❌ Non configuré"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Solution pour l'erreur DECODER */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Solution pour l'erreur DECODER</h2>
            <p className="mb-3">
              L'erreur <code className="bg-gray-100 px-1 py-0.5 rounded">DECODER routines::unsupported</code> est
              généralement causée par un problème de format de la clé privée. Voici comment la résoudre :
            </p>

            <div className="space-y-4">
              <div className="bg-white p-3 rounded border border-yellow-200">
                <h3 className="font-medium">Option 1 : Utiliser la clé corrigée (recommandé)</h3>
                <p className="mt-1 text-sm">
                  Si une clé corrigée est disponible ci-dessus, copiez-la et utilisez-la comme nouvelle valeur pour la
                  variable d'environnement <code className="bg-gray-100 px-1 py-0.5 rounded">GOOGLE_PRIVATE_KEY</code>.
                </p>
              </div>

              <div className="bg-white p-3 rounded border border-yellow-200">
                <h3 className="font-medium">Option 2 : Utiliser le fichier JSON complet</h3>
                <p className="mt-1 text-sm">
                  La méthode la plus fiable consiste à utiliser le fichier JSON complet des credentials :
                </p>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                  <li>Téléchargez le fichier JSON des credentials depuis la console Google Cloud</li>
                  <li>Copiez tout le contenu du fichier</li>
                  <li>
                    Ajoutez-le comme variable d'environnement{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">GOOGLE_CREDENTIALS_JSON</code>
                  </li>
                </ol>
                <p className="mt-2 text-sm">
                  <Link href={`/${params.lang}/google-setup`} className="text-blue-600 hover:underline">
                    Utilisez notre outil de configuration Google pour vous aider
                  </Link>
                </p>
              </div>

              <div className="bg-white p-3 rounded border border-yellow-200">
                <h3 className="font-medium">Option 3 : Formater manuellement la clé</h3>
                <p className="mt-1 text-sm">
                  Si les options ci-dessus ne fonctionnent pas, vous pouvez formater manuellement la clé :
                </p>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                  <li>
                    Assurez-vous que la clé commence par{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">-----BEGIN PRIVATE KEY-----</code>
                  </li>
                  <li>
                    Assurez-vous que la clé se termine par{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">-----END PRIVATE KEY-----</code>
                  </li>
                  <li>
                    Assurez-vous que les sauts de ligne sont correctement formatés (utilisez{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">\n</code> et non{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">\\n</code>)
                  </li>
                  <li>Assurez-vous que la clé n'est pas tronquée</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <Link
          href={`/${params.lang}/google-setup`}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Configurer Google
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
