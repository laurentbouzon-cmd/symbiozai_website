import type { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import type { PrivacySection } from "@/lib/dictionary"
import { FooterLanguageSwitcher } from "@/components/footer-language-switcher"
import { Logo } from "@/components/ui/logo"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === "en"

  return {
    title: isEnglish ? "Privacy Policy - SymbiozAI" : "Politique de confidentialité - SymbiozAI",
    description: isEnglish
      ? "SymbiozAI privacy policy. Learn how we collect and use your data."
      : "Politique de confidentialité de SymbiozAI. Découvrez comment nous collectons et utilisons vos données.",
    robots: { index: false },
    alternates: {
      canonical: `https://symbioz.ai/${lang}/privacy`,
      languages: {
        "x-default": "https://symbioz.ai/fr/privacy",
        en: "https://symbioz.ai/en/privacy",
        fr: "https://symbioz.ai/fr/privacy",
      },
    },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const currentYear = new Date().getFullYear()
  const privacy = dictionary.privacy

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex justify-center items-center py-6 border-b border-gray-100">
        <Link href={`/${lang}`}>
          <Logo size="lg" />
        </Link>
      </header>

      <main className="flex-grow py-12 px-4 sm:px-6">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 text-center">
            {privacy.title}
          </h1>

          <p className="text-sm text-gray-400 text-center mb-10">
            {privacy.lastUpdated} {currentYear}
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            {privacy.sections.map((section: PrivacySection, index: number) => (
              <div key={index}>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.heading}</h2>
                <p>
                  {section.content}{" "}
                  {index === privacy.sections.length - 1 && (
                    <a href="mailto:privacy@symbioz.ai" className="text-[#0d47a1] hover:underline">
                      privacy@symbioz.ai
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${lang}`}
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] text-white font-medium rounded-md hover:opacity-90 transition-all duration-300"
            >
              {privacy.backToHome}
            </Link>
          </div>
        </article>
      </main>

      <footer className="py-4 text-center text-gray-400 text-sm border-t border-gray-100">
        <p>
          &copy; {currentYear} SymbiozAI. {dictionary.footer.copyright}
        </p>
        <div className="mt-3 flex justify-center">
          <FooterLanguageSwitcher currentLocale={lang} dictionary={dictionary} />
        </div>
      </footer>
    </div>
  )
}
