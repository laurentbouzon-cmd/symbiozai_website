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
  // SEO P0-3 -- Force synchronous metadata rendering in <head> for search
  // engine crawlers. Next.js 15 default regex covers Chrome-Lighthouse +
  // OG scrapers (facebookexternalhit, LinkedInBot, Twitterbot, Slackbot,
  // Discordbot, WhatsApp) + some Google crawlers (AdsBot-Google,
  // Google-PageRenderer) but MISSES plain Googlebot/Bingbot variations
  // that do not include "Google-" or "-Google" suffixes. We extend the
  // matcher so that <title>, <meta name="description">, <link rel="canonical">,
  // and OG/Twitter tags land in <head> (not streamed) for all SEO-critical
  // user agents. Reference: next/dist/shared/lib/router/utils/html-bots.ts.
  htmlLimitedBots:
    /[\w-]+-Google|Google-[\w-]+|Googlebot|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|PetalBot|MojeekBot|SeznamBot|YandexBot|Yahoo|SemrushBot|AhrefsBot|GPTBot|ClaudeBot|OAI-SearchBot|PerplexityBot/i,
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
