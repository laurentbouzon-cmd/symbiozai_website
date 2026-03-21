import type { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isFr = lang === "fr"
  return {
    title: isFr ? "Conditions Générales d'Utilisation | SymbiozAI" : "Terms of Service | SymbiozAI",
    description: isFr ? "CGU du service SymbiozAI" : "Terms of service for SymbiozAI",
  }
}

export default async function CGUPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const isFr = lang === "fr"

  return (
    <div className="min-h-screen bg-white">
      <SharedHeader lang={lang} dictionary={dictionary} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
          {isFr ? "Conditions Générales d'Utilisation" : "Terms of Service"}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {isFr ? "Dernière mise à jour : 21 mars 2026" : "Last updated: March 21, 2026"}
        </p>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700">
          <h2>{isFr ? "1. Objet" : "1. Purpose"}</h2>
          <p>
            {isFr
              ? "Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation du service SymbiozAI, accessible à l'adresse symbioz.ai, édité par ADM HOLDING (SIREN 933 805 855). En accédant au site ou en utilisant le service, vous acceptez les présentes CGU dans leur intégralité."
              : "These Terms of Service (ToS) define the terms and conditions for using the SymbiozAI service, accessible at symbioz.ai, published by ADM HOLDING (SIREN 933 805 855). By accessing the website or using the service, you agree to these ToS in their entirety."}
          </p>

          <h2>{isFr ? "2. Description du service" : "2. Service Description"}</h2>
          <p>
            {isFr
              ? "SymbiozAI est un CRM AI-Native qui automatise la gestion de la relation client grâce à l'intelligence artificielle. Le service inclut la capture automatique des interactions, le pilotage de pipeline commercial, la prospection assistée par IA, et l'interface conversationnelle avec l'assistant Maya. Le service est actuellement en phase de bêta privée."
              : "SymbiozAI is an AI-Native CRM that automates customer relationship management using artificial intelligence. The service includes automatic interaction capture, commercial pipeline management, AI-assisted prospecting, and a conversational interface with the Maya assistant. The service is currently in private beta phase."}
          </p>

          <h2>{isFr ? "3. Accès au service" : "3. Access to the Service"}</h2>
          <p>
            {isFr
              ? "L'accès à la bêta privée est soumis à inscription via le formulaire de la liste d'attente. ADM HOLDING se réserve le droit d'accepter ou de refuser toute demande d'accès sans avoir à justifier sa décision. Le service est accessible 24h/24, 7j/7, sous réserve des interruptions pour maintenance."
              : "Access to the private beta requires registration via the waitlist form. ADM HOLDING reserves the right to accept or refuse any access request without justification. The service is accessible 24/7, subject to maintenance interruptions."}
          </p>

          <h2>{isFr ? "4. Données et confidentialité" : "4. Data and Privacy"}</h2>
          <p>
            {isFr ? (
              <>
                Les données commerciales importées dans SymbiozAI restent la propriété exclusive de l&apos;utilisateur. ADM HOLDING s&apos;engage à ne pas utiliser les données clients à des fins autres que le fonctionnement du service. Le traitement des données personnelles est détaillé dans notre <Link href={`/${lang}/privacy`} className="text-[#0d47a1]">politique de confidentialité</Link>. Les données sont hébergées en France (OVH, Roubaix) conformément au RGPD.
              </>
            ) : (
              <>
                Commercial data imported into SymbiozAI remains the exclusive property of the user. ADM HOLDING commits not to use client data for purposes other than operating the service. Personal data processing is detailed in our <Link href={`/${lang}/privacy`} className="text-[#0d47a1]">privacy policy</Link>. Data is hosted in France (OVH, Roubaix) in compliance with the GDPR.
              </>
            )}
          </p>

          <h2>{isFr ? "5. Propriété intellectuelle" : "5. Intellectual Property"}</h2>
          <p>
            {isFr
              ? "La marque SymbiozAI, le logo, les logiciels, algorithmes, interfaces et contenus du site sont la propriété exclusive d'ADM HOLDING. L'utilisateur bénéficie d'un droit d'utilisation personnel et non exclusif du service, limité à la durée de son abonnement ou de sa participation à la bêta."
              : "The SymbiozAI brand, logo, software, algorithms, interfaces, and website content are the exclusive property of ADM HOLDING. The user benefits from a personal, non-exclusive right to use the service, limited to the duration of their subscription or beta participation."}
          </p>

          <h2>{isFr ? "6. Responsabilité" : "6. Liability"}</h2>
          <p>
            {isFr
              ? "SymbiozAI est fourni « en l'état » pendant la phase de bêta. ADM HOLDING ne garantit pas l'absence d'interruptions, d'erreurs ou de bugs. L'utilisateur reconnaît utiliser le service en bêta à ses propres risques. ADM HOLDING ne saurait être tenue responsable des dommages indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le service."
              : "SymbiozAI is provided \"as is\" during the beta phase. ADM HOLDING does not guarantee the absence of interruptions, errors, or bugs. The user acknowledges using the beta service at their own risk. ADM HOLDING shall not be held liable for indirect damages resulting from the use or inability to use the service."}
          </p>

          <h2>{isFr ? "7. Résiliation" : "7. Termination"}</h2>
          <p>
            {isFr
              ? "L'utilisateur peut résilier son compte à tout moment en contactant contact@symbioz.ai. ADM HOLDING se réserve le droit de suspendre ou résilier l'accès d'un utilisateur en cas de violation des présentes CGU, sans préavis ni indemnité."
              : "The user may terminate their account at any time by contacting contact@symbioz.ai. ADM HOLDING reserves the right to suspend or terminate a user's access in case of violation of these ToS, without notice or compensation."}
          </p>

          <h2>{isFr ? "8. Droit applicable" : "8. Applicable Law"}</h2>
          <p>
            {isFr
              ? "Les présentes CGU sont régies par le droit français. Tout litige sera soumis à la compétence exclusive des tribunaux de Paris, France."
              : "These Terms of Service are governed by French law. Any dispute shall be subject to the exclusive jurisdiction of the courts of Paris, France."}
          </p>

          <h2>{isFr ? "9. Contact" : "9. Contact"}</h2>
          <p>
            {isFr
              ? "Pour toute question relative aux présentes CGU, contactez-nous à :"
              : "For any questions regarding these Terms of Service, contact us at:"}
            <br />
            <strong>Email:</strong> <a href="mailto:contact@symbioz.ai">contact@symbioz.ai</a><br />
            <strong>ADM HOLDING</strong> — 60 rue François Ier, 75008 Paris, France
          </p>
        </div>
      </main>

      <SharedFooter lang={lang} dictionary={dictionary} />
    </div>
  )
}
