"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function GoogleSetupContent({ params }) {
  const searchParams = useSearchParams()
  const [jsonContent, setJsonContent] = useState("")
  const [copied, setCopied] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [sheetId, setSheetId] = useState("")
  const [sheetUrl, setSheetUrl] = useState("")
  const [step, setStep] = useState(1)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target.result
        // Vérifier que c'est un JSON valide
        JSON.parse(content)
        setJsonContent(content)
        setFileUploaded(true)
        // Passer automatiquement à l'étape suivante
        setStep(2)
      } catch (error) {
        alert("Le fichier n'est pas un JSON valide")
      }
    }
    reader.readAsText(file)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSheetUrlChange = (e) => {
    const url = e.target.value
    setSheetUrl(url)

    // Extraire l'ID de la feuille de l'URL
    try {
      const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
      if (match && match[1]) {
        setSheetId(match[1])
      } else {
        setSheetId("")
      }
    } catch (error) {
      setSheetId("")
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const formspreeEndpoint = sheetId ? `https://formspree.io/f/${sheetId}` : "https://formspree.io/f/your-form-id"

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Configuration Google Sheets</h1>
      <p className="text-gray-600 mb-6">
        Cet assistant vous guidera pas à pas pour configurer correctement l'intégration avec Google Sheets
      </p>

      {/* Indicateur d'étape */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-100" : "bg-gray-100"}`}
            >
              1
            </div>
            <span className="ml-2 text-sm">Credentials</span>
          </div>
          <div className={`flex-grow border-t ${step >= 2 ? "border-blue-300" : "border-gray-200"} mx-4`}></div>
          <div className={`flex items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-100" : "bg-gray-100"}`}
            >
              2
            </div>
            <span className="ml-2 text-sm">Google Sheet</span>
          </div>
          <div className={`flex-grow border-t ${step >= 3 ? "border-blue-300" : "border-gray-200"} mx-4`}></div>
          <div className={`flex items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-100" : "bg-gray-100"}`}
            >
              3
            </div>
            <span className="ml-2 text-sm">Variables</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Étape 1: Télécharger le fichier JSON des credentials */}
        {step === 1 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Étape 1: Télécharger le fichier JSON des credentials</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Créez un projet dans la{" "}
                  <a
                    href="https://console.cloud.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Console Google Cloud
                  </a>
                </li>
                <li>Activez l'API Google Sheets pour votre projet</li>
                <li>Créez un compte de service et téléchargez le fichier JSON des credentials</li>
                <li>Téléchargez le fichier JSON des credentials ci-dessous</li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Téléchargez le fichier JSON des credentials
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {fileUploaded && <div className="text-green-600">✅ Fichier JSON chargé avec succès</div>}
            </div>

            <div className="flex justify-between mt-6">
              <div></div>
              <button
                onClick={nextStep}
                disabled={!fileUploaded}
                className={`px-4 py-2 rounded ${
                  fileUploaded
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Étape 2: Configurer le Google Sheet */}
        {step === 2 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Étape 2: Configurer le Google Sheet</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Créez un nouveau Google Sheet ou utilisez un existant</li>
                <li>Assurez-vous que la première ligne contient des en-têtes (ex: Email, Date, Status)</li>
                <li>Partagez votre Google Sheet avec l'email du compte de service (avec accès en écriture)</li>
                <li>Copiez l'URL de votre Google Sheet ci-dessous</li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <label className="block text-sm font-medium text-gray-700">URL de votre Google Sheet</label>
              <input
                type="text"
                value={sheetUrl}
                onChange={handleSheetUrlChange}
                placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {sheetId && (
                <div className="text-green-600">
                  ✅ ID du Sheet détecté: <code className="bg-gray-100 px-1 py-0.5 rounded">{sheetId}</code>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Précédent
              </button>
              <button
                onClick={nextStep}
                disabled={!sheetId}
                className={`px-4 py-2 rounded ${
                  sheetId ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Étape 3: Variables d'environnement */}
        {step === 3 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Étape 3: Variables d'environnement</h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-green-800 mb-2">Configuration terminée!</h3>
              <p className="mb-2">Ajoutez les variables d'environnement suivantes à votre projet Vercel :</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">GOOGLE_CREDENTIALS_JSON</label>
                    <button
                      onClick={() => copyToClipboard(jsonContent)}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      {copied ? "Copié !" : "Copier"}
                    </button>
                  </div>
                  <div className="bg-gray-100 p-2 rounded border border-gray-300 text-xs overflow-auto max-h-20">
                    {jsonContent ? jsonContent.substring(0, 100) + "..." : "Aucun contenu"}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">GOOGLE_SHEET_ID</label>
                    <button
                      onClick={() => copyToClipboard(sheetId)}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Copier
                    </button>
                  </div>
                  <div className="bg-gray-100 p-2 rounded border border-gray-300 text-xs">{sheetId}</div>
                </div>
              </div>

              <div className="mt-4 text-sm">
                <p>
                  <strong>Note:</strong> Assurez-vous d'ajouter ces variables dans la section "Environment Variables" de
                  votre projet Vercel.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Étapes finales</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Redéployez votre application après avoir ajouté les variables d'environnement</li>
                <li>Testez l'intégration en soumettant le formulaire sur votre site</li>
                <li>Vérifiez que les données sont bien ajoutées à votre Google Sheet</li>
              </ol>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Précédent
              </button>
              <Link
                href={`/${params.lang}/google-diagnostic`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Vérifier la configuration
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
