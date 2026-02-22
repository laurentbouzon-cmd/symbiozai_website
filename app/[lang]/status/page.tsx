"use client"

import { useState, useEffect } from "react"
import { FooterLanguageSwitcher } from "@/components/footer-language-switcher"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { getDictionary } from "@/lib/dictionary"
import Link from "next/link"

export default function StatusPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const [systemStatus, setSystemStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [envStatus, setEnvStatus] = useState<any>(null)

  useEffect(() => {
    // Collecter les informations système côté client
    const collectSystemStatus = async () => {
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

        const status = {
          system: {
            status: "operational",
            lastChecked: new Date().toISOString(),
            environment: process.env.NODE_ENV || "unknown",
          },
          browser: {
            online: navigator.onLine,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
          },
          serverCheckedVars: serverEnvStatus,
        }

        setSystemStatus(status)
        setEnvStatus(serverEnvStatus)
      } catch (error) {
        console.error("Error collecting system status:", error)
        setSystemStatus({ error: error.message || "Unknown error" })
      } finally {
        setLoading(false)
      }
    }

    // Simuler un délai pour donner l'impression d'un diagnostic
    setTimeout(() => {
      collectSystemStatus()
    }, 500)
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
      {/* Barre de navigation transparente avec liens à droite */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-end items-center">
            {/* Menu pour mobile */}
            <MobileMenu lang={params.lang} dictionary={dictionary} />

            {/* Menu pour desktop - décalé de 2cm vers la gauche */}
            <nav className="hidden md:flex items-center space-x-10 mr-6 -ml-20">
              <Link href={`/${params.lang}`} className="text-gray-700 hover:text-gray-900 transition-colors">
                {params.lang === "fr" ? "Accueil" : "Home"}
              </Link>
              <Link href={`/${params.lang}/manifeste`} className="text-gray-700 hover:text-gray-900 transition-colors">
                {params.lang === "fr" ? "Manifeste" : "Manifesto"}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-2">{dictionary.status.title}</h1>
        <p className="text-gray-600 mb-6">{dictionary.status.description}</p>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            <span className="ml-3 text-lg">
              {params.lang === "fr" ? "Vérification de l'état du système..." : "Checking system status..."}
            </span>
          </div>
        ) : !systemStatus ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">{params.lang === "fr" ? "Erreur" : "Error"}</p>
            <p>
              {params.lang === "fr"
                ? "Impossible de collecter les informations système"
                : "Unable to collect system information"}
            </p>
          </div>
        ) : systemStatus.error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">{params.lang === "fr" ? "Erreur" : "Error"}</p>
            <p>{systemStatus.error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">{dictionary.status.generalStatus}</h2>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <p>{dictionary.status.systemOperational}</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {dictionary.status.lastCheck}{" "}
                {new Date(systemStatus.system.lastChecked).toLocaleString(params.lang === "fr" ? "fr-FR" : "en-US")}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">{dictionary.status.systemInfo}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{dictionary.status.environment}</p>
                  <p>{systemStatus.system.environment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{dictionary.status.connectionStatus}</p>
                  <p className={systemStatus.browser.online ? "text-green-600" : "text-red-600"}>
                    {systemStatus.browser.online ? dictionary.status.online : dictionary.status.offline}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{dictionary.status.platform}</p>
                  <p>{systemStatus.browser.platform}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{dictionary.status.resolution}</p>
                  <p>{systemStatus.browser.screenSize}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-purple-800 mb-2">
                {params.lang === "fr" ? "Variables d'environnement" : "Environment Variables"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Variables vérifiées côté serveur */}
                {envStatus &&
                  Object.entries(envStatus).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm font-medium text-gray-500">{key.toUpperCase()}</p>
                      <p className={value ? "text-green-600" : "text-red-600"}>
                        {value
                          ? params.lang === "fr"
                            ? "Configuré"
                            : "Configured"
                          : params.lang === "fr"
                            ? "Non configuré"
                            : "Not configured"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex space-x-4">
          <a href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {params.lang === "fr" ? "Retour à l'accueil" : "Back to Home"}
          </a>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            {dictionary.status.refresh}
          </button>
        </div>
      </div>

      {/* Footer avec le sélecteur de langue */}
      <footer className="py-4 text-center text-gray-400 text-sm mt-auto">
        <p>
          &copy; {new Date().getFullYear()} SymbiozAI. {dictionary.footer.copyright}
        </p>
        <div className="mt-3 flex justify-center">
          <FooterLanguageSwitcher currentLocale={params.lang} dictionary={dictionary} />
        </div>
      </footer>
    </div>
  )
}
