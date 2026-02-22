"use client"

import { useState } from "react"
import Link from "next/link"

export default function FormspreeSetupPage({ params }) {
  const [formspreeId, setFormspreeId] = useState("")
  const [copied, setCopied] = useState(false)

  const formspreeEndpoint = formspreeId
    ? `https://formspree.io/f/${formspreeId}`
    : "https://formspree.io/f/your-form-id"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formspreeEndpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Configuration Formspree</h1>
      <p className="text-gray-600 mb-6">
        Cette page vous aide à configurer Formspree comme solution de secours pour les inscriptions
      </p>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Créez un compte sur{" "}
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Formspree
              </a>
            </li>
            <li>Créez un nouveau formulaire et obtenez l'ID du formulaire (la partie après "f/" dans l'URL)</li>
            <li>Ajoutez l'ID du formulaire ci-dessous pour générer l'URL complète</li>
            <li>
              Ajoutez cette URL comme variable d'environnement{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">FORMSPREE_WEBHOOK_SECRET</code> dans votre projet Vercel
            </li>
          </ol>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Générer l'URL Formspree</h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-grow">
              <label htmlFor="formspree-id" className="block text-sm font-medium text-gray-700 mb-1">
                ID du formulaire Formspree
              </label>
              <input
                type="text"
                id="formspree-id"
                value={formspreeId}
                onChange={(e) => setFormspreeId(e.target.value)}
                placeholder="xleqgkrw"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL complète à utiliser comme variable d'environnement
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={formspreeEndpoint}
                readOnly
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Configuration Vercel</h2>
          <p className="mb-2">Ajoutez la variable d'environnement suivante à votre projet Vercel :</p>
          <div className="bg-white p-3 rounded border border-yellow-200 text-sm font-mono">
            FORMSPREE_WEBHOOK_SECRET={formspreeEndpoint}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
