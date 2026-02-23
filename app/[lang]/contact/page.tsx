import type { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { FooterLanguageSwitcher } from "@/components/footer-language-switcher"
import { Logo } from "@/components/ui/logo"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const isEnglish = lang === "en"

  const title = isEnglish ? "Contact - SymbiozAI" : "Contact - SymbiozAI"
  const description = isEnglish
    ? "Contact the SymbiozAI team for any questions about our AI-Native CRM."
    : "Contactez l'équipe SymbiozAI pour toute question sur notre CRM IA-Native."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://symbioz.ai/${lang}/contact`,
      siteName: "SymbiozAI",
      images: [{ url: `/og?lang=${lang}`, width: 1200, height: 630, alt: title }],
      locale: isEnglish ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og?lang=${lang}`],
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}/contact`,
      languages: {
        "x-default": "https://symbioz.ai/fr/contact",
        en: "https://symbioz.ai/en/contact",
        fr: "https://symbioz.ai/fr/contact",
      },
    },
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact SymbiozAI",
  url: "https://symbioz.ai/contact",
  mainEntity: {
    "@type": "Organization",
    name: "SymbiozAI",
    url: "https://symbioz.ai",
    email: "contact@symbioz.ai",
  },
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const currentYear = new Date().getFullYear()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-white bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
        <main className="flex-grow flex flex-col px-4 sm:px-6 text-center py-[8vh] sm:py-[10vh]">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <Logo size="xl" />
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold mb-6">{dictionary.contact.title}</h1>

            <p className="mb-8 text-lg text-gray-600">
              {dictionary.contact.description}{" "}
              <a href="mailto:contact@symbioz.ai" className="text-blue-600 hover:underline">
                contact@symbioz.ai
              </a>
            </p>

            <Link
              href={`/${lang}`}
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] text-white font-medium rounded-md hover:opacity-90 transition-all duration-300"
            >
              {dictionary.contact.backToHome}
            </Link>
          </div>
        </main>

        <footer className="py-2 text-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} SymbiozAI. {dictionary.footer.copyright}
          </p>
          <div className="mt-3 flex justify-center">
            <FooterLanguageSwitcher currentLocale={lang} dictionary={dictionary} />
          </div>
        </footer>
      </div>
    </>
  )
}
