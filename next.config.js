/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour le référencement
  poweredByHeader: false, // Supprime l'en-tête X-Powered-By
  compress: true, // Active la compression gzip
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.pipedrive.com" },
      { protocol: "https", hostname: "symbioz.ai" },
    ],
  },
  experimental: {
    scrollRestoration: true, // Restaure la position de défilement
  },
  // /features was fused into /mcp post-pivot 2026-04-23. /about was removed
  // 2026-04-23 ter (founder narrative merged into /manifeste + /mcp).
  // Preserve SEO equity from legacy URLs with permanent (301) redirects.
  async redirects() {
    return [
      {
        source: "/features",
        destination: "/mcp",
        permanent: true,
      },
      {
        source: "/:lang(en|fr)/features",
        destination: "/:lang/mcp",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:lang(en|fr)/about",
        destination: "/:lang",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
