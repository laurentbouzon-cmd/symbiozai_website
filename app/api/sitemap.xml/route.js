export async function GET() {
  // Contenu de votre sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
<!-- Pages d'accueil -->
<url>
  <loc>https://symbioz.ai/</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en"/>
</url>
<url>
  <loc>https://symbioz.ai/fr</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en"/>
</url>
<url>
  <loc>https://symbioz.ai/en</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en"/>
</url>

<!-- Pages de manifeste -->
<url>
  <loc>https://symbioz.ai/manifeste</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/manifeste"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/manifeste"/>
</url>
<url>
  <loc>https://symbioz.ai/fr/manifeste</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/manifeste"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/manifeste"/>
</url>
<url>
  <loc>https://symbioz.ai/en/manifeste</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/manifeste"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/manifeste"/>
</url>

<!-- Pages de contact -->
<url>
  <loc>https://symbioz.ai/contact</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/contact"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/contact"/>
</url>
<url>
  <loc>https://symbioz.ai/fr/contact</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/contact"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/contact"/>
</url>
<url>
  <loc>https://symbioz.ai/en/contact</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/contact"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/contact"/>
</url>

<!-- Pages de statut -->
<url>
  <loc>https://symbioz.ai/status</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/status"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/status"/>
</url>
<url>
  <loc>https://symbioz.ai/fr/status</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/status"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/status"/>
</url>
<url>
  <loc>https://symbioz.ai/en/status</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/status"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/status"/>
</url>

<!-- Pages de confidentialité -->
<url>
  <loc>https://symbioz.ai/privacy</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/privacy"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/privacy"/>
</url>
<url>
  <loc>https://symbioz.ai/fr/privacy</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/privacy"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/privacy"/>
</url>
<url>
  <loc>https://symbioz.ai/en/privacy</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="https://symbioz.ai/fr/privacy"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://symbioz.ai/en/privacy"/>
</url>
</urlset>`

  // Créer une réponse avec le bon en-tête Content-Type
  const response = new Response(sitemap)

  // Définir explicitement les en-têtes
  response.headers.set("Content-Type", "application/xml")
  response.headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400")

  return response
}
