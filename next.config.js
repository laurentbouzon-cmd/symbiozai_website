/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour le référencement
  poweredByHeader: false, // Supprime l'en-tête X-Powered-By
  compress: true, // Active la compression gzip
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
}

module.exports = nextConfig
