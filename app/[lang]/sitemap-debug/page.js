"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function SitemapDebugPage({ params }) {
  const [testResults, setTestResults] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sitemapUrls = ["/api/sitemap.xml", "/api/sitemap-alt", "/api/sitemap-test"]

  useEffect(() => {
    async function testSitemaps() {
      try {
        setLoading(true)

        const results = {}

        // Tester chaque URL de sitemap
        for (const url of sitemapUrls) {
          try {
            // Tester avec HEAD pour obtenir les en-têtes
            const headResponse = await fetch(url, {
              method: "HEAD",
            })

            // Récupérer les en-têtes
            const headers = {}
            headResponse.headers.forEach((value, key) => {
              headers[key] = value
            })

            // Tester avec GET pour obtenir le contenu
            const getResponse = await fetch(url)
            const content = await getResponse.text()

            results[url] = {
              status: headResponse.status,
              ok: headResponse.ok,
              headers: headers,
              contentPreview: content.substring(0, 200) + "...",
              contentLength: content.length,
            }
          } catch (urlError) {
            results[url] = {
              error: true,
              message: urlError.message,
            }
          }
        }

        setTestResults(results)
      } catch (err) {
        console.error("Error testing sitemaps:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    testSitemaps()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Débogage des Sitemaps</h1>
      <p className="text-gray-600 mb-6">
        Cette page teste plusieurs implémentations de sitemap pour identifier celle qui fonctionne correctement
      </p>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <span className="ml-3 text-lg">Tests en cours...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sitemapUrls.map((url) => (
            <div key={url} className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">URL: {url}</h2>

              {testResults[url]?.error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p className="font-bold">Erreur</p>
                  <p>{testResults[url].message}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p>
                      <span className="font-medium">Statut HTTP:</span>{" "}
                      <span className={testResults[url]?.ok ? "text-green-600" : "text-red-600"}>
                        {testResults[url]?.status} {testResults[url]?.ok ? "✅" : "❌"}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Taille du contenu:</span> {testResults[url]?.contentLength}{" "}
                      caractères
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">En-têtes HTTP:</h3>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      {Object.entries(testResults[url]?.headers || {}).map(([key, value]) => (
                        <div key={key} className="mb-1">
                          <span className="font-mono text-sm">
                            <strong>{key}:</strong> {value}
                            {key.toLowerCase() === "content-type" && (
                              <span
                                className={
                                  value.includes("application/xml") ? "text-green-600 ml-2" : "text-red-600 ml-2"
                                }
                              >
                                {value.includes("application/xml") ? "✅" : "❌"}
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Aperçu du contenu:</h3>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 font-mono text-xs overflow-auto max-h-40">
                      {testResults[url]?.contentPreview}
                    </div>
                  </div>

                  {testResults[url]?.headers["content-type"]?.includes("application/xml") ? (
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-green-700">✅ Ce sitemap a le bon type MIME: application/xml</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-red-700">
                        ❌ Ce sitemap n'a pas le bon type MIME. Content-Type actuel:{" "}
                        {testResults[url]?.headers["content-type"] || "non défini"}
                      </p>
                    </div>
                  )}

                  <div className="mt-2">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Ouvrir ce sitemap dans un nouvel onglet →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Recommandations</h2>

            <p className="mb-4">
              Après avoir déployé ces modifications, utilisez cette page pour déterminer quelle URL de sitemap
              fonctionne correctement (celle avec Content-Type: application/xml).
            </p>

            <p className="mb-2">
              Ensuite, mettez à jour votre fichier robots.txt pour n'inclure que cette URL et soumettez-la à Google
              Search Console.
            </p>

            <div className="bg-white p-3 rounded border border-blue-200 font-mono text-sm">
              # Exemple de robots.txt mis à jour
              <br />
              User-agent: *<br />
              Allow: /<br />
              <br /># Sitemap location
              <br />
              Sitemap: https://symbioz.ai/api/sitemap-test
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href={`/${params.lang}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
