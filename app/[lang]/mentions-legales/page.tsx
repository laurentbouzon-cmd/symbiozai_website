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
    title: isFr ? "Mentions légales | SymbiozAI" : "Legal Notice | SymbiozAI",
    description: isFr ? "Mentions légales du site symbioz.ai" : "Legal notice for symbioz.ai",
  }
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const isFr = lang === "fr"

  return (
    <div className="min-h-screen bg-white">
      <SharedHeader lang={lang} dictionary={dictionary} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
          {isFr ? "Mentions légales" : "Legal Notice"}
        </h1>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700">
          <h2>{isFr ? "Éditeur du site" : "Website Publisher"}</h2>
          <p>
            {isFr ? (
              <>
                Le site <strong>symbioz.ai</strong> est édité par la société <strong>ADM HOLDING</strong>, société par actions simplifiée (SAS) au capital social variable, immatriculée au Registre du Commerce et des Sociétés sous le numéro <strong>SIREN 933 805 855</strong> (SIRET 933 805 855 00014).
              </>
            ) : (
              <>
                The website <strong>symbioz.ai</strong> is published by <strong>ADM HOLDING</strong>, a simplified joint stock company (SAS) with variable share capital, registered under <strong>SIREN 933 805 855</strong> (SIRET 933 805 855 00014).
              </>
            )}
          </p>

          <p>
            <strong>{isFr ? "Siège social" : "Registered Office"}:</strong> 60 rue François Ier, 75008 Paris, France<br />
            <strong>{isFr ? "Président" : "President"}:</strong> Laurent Bouzon<br />
            <strong>{isFr ? "Code APE" : "Activity Code"}:</strong> 66.30Z — {isFr ? "Gestion de fonds" : "Fund management"}<br />
            <strong>{isFr ? "Date de création" : "Date of Creation"}:</strong> 3 {isFr ? "octobre" : "October"} 2024
          </p>

          <h2>{isFr ? "Contact" : "Contact"}</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:contact@symbioz.ai">contact@symbioz.ai</a><br />
            <strong>{isFr ? "Site web" : "Website"}:</strong> <a href="https://symbioz.ai">https://symbioz.ai</a>
          </p>

          <h2>{isFr ? "Hébergement" : "Hosting"}</h2>
          <p>
            {isFr ? (
              <>
                Le site est hébergé par <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix, France. Téléphone : +33 9 72 10 10 07. Les données sont hébergées en France, au sein de l&apos;Union européenne.
              </>
            ) : (
              <>
                The website is hosted by <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix, France. Phone: +33 9 72 10 10 07. Data is hosted in France, within the European Union.
              </>
            )}
          </p>

          <h2>{isFr ? "Propriété intellectuelle" : "Intellectual Property"}</h2>
          <p>
            {isFr
              ? "L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, logiciels, etc.) est la propriété exclusive d'ADM HOLDING ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'ADM HOLDING."
              : "All content on this website (text, images, graphics, logos, icons, software, etc.) is the exclusive property of ADM HOLDING or its partners and is protected by French and international intellectual property laws. Any reproduction, representation, modification, publication, or adaptation of all or part of the elements of the site, by any means or process, is prohibited without prior written authorization from ADM HOLDING."}
          </p>

          <h2>{isFr ? "Données personnelles" : "Personal Data"}</h2>
          <p>
            {isFr ? (
              <>
                Le traitement des données personnelles est décrit dans notre <Link href={`/${lang}/privacy`} className="text-[#0d47a1]">politique de confidentialité</Link>. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données personnelles. Pour exercer ces droits, contactez-nous à <a href="mailto:contact@symbioz.ai">contact@symbioz.ai</a>.
              </>
            ) : (
              <>
                The processing of personal data is described in our <Link href={`/${lang}/privacy`} className="text-[#0d47a1]">privacy policy</Link>. In accordance with the GDPR, you have the right to access, rectify, delete, and port your personal data. To exercise these rights, contact us at <a href="mailto:contact@symbioz.ai">contact@symbioz.ai</a>.
              </>
            )}
          </p>

          <h2>{isFr ? "Responsabilité" : "Liability"}</h2>
          <p>
            {isFr
              ? "ADM HOLDING s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Le site symbioz.ai est fourni en l'état et est accessible sans aucune garantie de disponibilité."
              : "ADM HOLDING strives to provide information as accurate as possible. However, it cannot be held responsible for omissions, inaccuracies, or deficiencies in updates, whether caused by itself or by third-party partners providing this information. The symbioz.ai website is provided as-is and is accessible without any guarantee of availability."}
          </p>
        </div>
      </main>

      <SharedFooter lang={lang} dictionary={dictionary} />
    </div>
  )
}
