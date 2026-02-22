"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function KeyFormatterContent({ params }) {
  const searchParams = useSearchParams()
  const [inputKey, setInputKey] = useState("")
  const [formattedKey, setFormattedKey] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)

  const formatKey = () => {
    try {
      setError(null)

      if (!inputKey.trim()) {
        setError("Veuillez entrer une clé privée")
        return
      }

      let key = inputKey.trim()

      // Supprimer les en-têtes et pieds de page existants s'ils existent
      key = key.replace(/-----BEGIN PRIVATE KEY-----/g, "")
      key = key.replace(/-----END PRIVATE KEY-----/g, "")

      // Supprimer tous les sauts de ligne existants
      key = key.replace(/\r?\n|\r/g, "")

      // Ajouter les en-têtes et pieds de page avec des sauts de ligne
      const formattedKey = `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----`

      setFormattedKey(formattedKey)
    } catch (err) {
      setError(`Erreur lors du formatage: ${err.message}`)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Formateur de clé privée Google</h1>
      <p className="text-gray-600 mb-6">
        Cet outil vous aide à formater correctement votre clé privée Google en ajoutant les sauts de ligne nécessaires
      </p>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Collez votre clé privée actuelle dans le champ ci-dessous</li>
            <li>Cliquez sur "Formater la clé" pour ajouter les sauts de ligne nécessaires</li>
            <li>Copiez la clé formatée et utilisez-la comme nouvelle valeur pour GOOGLE_PRIVATE_KEY</li>
            <li>Redéployez votre application pour appliquer les changements</li>
          </ol>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Votre clé privée actuelle</h2>
          <textarea
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Collez votre clé privée ici..."
            className="w-full h-32 p-2 border border-gray-300 rounded-md font-mono text-sm"
          />
          <button onClick={formatKey} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Formater la clé
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        )}

        {formattedKey && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-green-800">Clé formatée avec sauts de ligne</h2>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>
            <pre className="bg-white p-3 rounded border border-green-200 overflow-auto max-h-60 text-xs whitespace-pre-wrap">
              {formattedKey}
            </pre>
            <p className="mt-2 text-sm text-green-700">
              Cette clé contient maintenant les sauts de ligne nécessaires pour fonctionner correctement.
            </p>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Alternative : Utiliser le fichier JSON</h2>
          <p className="mb-2">
            Si cette méthode ne fonctionne toujours pas, nous vous recommandons d'utiliser le fichier JSON complet des
            credentials :
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Téléchargez le fichier JSON des credentials depuis la console Google Cloud</li>
            <li>Copiez tout le contenu du fichier</li>
            <li>
              Ajoutez-le comme variable d'environnement{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">GOOGLE_CREDENTIALS_JSON</code>
            </li>
            <li>Redéployez votre application</li>
          </ol>
          <p className="mt-2 text-sm">
            <Link href={`/${params.lang}/google-setup`} className="text-blue-600 hover:underline">
              Utilisez notre assistant de configuration Google pour vous guider
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
        <Link
          href={`/${params.lang}/google-diagnostic`}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Retour au diagnostic
        </Link>
      </div>
    </div>
  )
}
