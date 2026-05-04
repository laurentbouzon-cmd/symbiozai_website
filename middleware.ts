import { type NextRequest, NextResponse } from "next/server"

// Définir les langues supportées
const locales = ["en", "fr"]
const defaultLocale = "en"

export function middleware(request: NextRequest) {
  // Obtenir le chemin demandé
  const pathname = request.nextUrl.pathname

  // Éviter les redirections en boucle en vérifiant si nous avons déjà redirigé
  const hasRedirectHeader =
    request.headers.get("x-middleware-rewrite") ||
    request.headers.get("x-middleware-next") ||
    request.headers.get("location")
  if (hasRedirectHeader) return NextResponse.next()

  // Vérifier si le chemin a déjà une locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Si le chemin a déjà une locale, injecter un header x-locale sur la
  // requête forwardée vers Next pour que le root layout (app/layout.tsx)
  // puisse l'exploiter via `headers()` et appliquer <html lang={locale}>
  // de manière dynamique (SEO P0-2, hreflang + a11y + GEO NLP extraction).
  if (pathnameHasLocale) {
    const detectedLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) || defaultLocale
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-locale", detectedLocale)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Si le chemin est la racine, rediriger vers la locale par défaut
  if (pathname === "/") {
    // Essayer de détecter la langue préférée de l'utilisateur
    const acceptLanguage = request.headers.get("accept-language") || ""
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim())
      .find((lang) => locales.some((locale) => lang.startsWith(locale)))

    // Utiliser la langue préférée ou la langue par défaut
    const locale = preferredLocale?.startsWith("fr") ? "fr" : defaultLocale

    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Pour tous les autres chemins, ajouter la locale par défaut
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
}

export const config = {
  // Matcher pour les routes qui doivent être traitées par le middleware
  matcher: [
    // Ignorer les fichiers statiques, les API et la route OG (image dynamique
    // rendue à la racine `/og`, hors segment `[lang]`).
    "/((?!api|og|_next/static|_next/image|favicon\\.ico|favicon\\.svg|sitemap\\.xml|robots\\.txt|images|.*\\.png$|.*\\.svg$).*)",
  ],
}
