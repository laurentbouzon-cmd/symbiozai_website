import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"
import { FooterLanguageSwitcher } from "@/components/footer-language-switcher"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { GlassIcon } from "@/components/ui/glass-icon"
import { WaitlistForm } from "@/components/waitlist-form"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { ScrollReveal } from "@/components/scroll-reveal"
import { InteractivePlayground } from "@/components/playground/interactive-playground"

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const currentYear = new Date().getFullYear()

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
      logo: "https://symbioz.ai/icon.png",
      description: dictionary.description,
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@symbioz.ai",
        contactType: "customer service",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: dictionary.description,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
      },
    },
  ]

  const isFr = lang === "fr"

  const painPoints = [
    {
      icon: <GlassIcon type="clock" size={48} />,
      title: isFr ? "Le temps" : "Time",
      stat: isFr ? "3 à 5h / semaine" : "3 to 5h / week",
      description: isFr
        ? "Vos commerciaux passent en moyenne 3 à 5 heures par semaine à mettre à jour leur CRM. Ce sont des heures de vente en moins. Un commercial qui saisit est un commercial qui ne vend pas."
        : "Your salespeople spend an average of 3 to 5 hours per week updating their CRM. That's selling time lost. A rep who's typing is a rep who's not selling.",
    },
    {
      icon: <GlassIcon type="trending-down" size={48} />,
      title: isFr ? "Les deals" : "Deals",
      stat: isFr ? "20 à 30% récupérables" : "20 to 30% recoverable",
      description: isFr
        ? "Entre 20 et 30% des deals « perdus » ne sont pas perdus - ils sont juste différés. Mais votre CRM les a rangés en « Perdu » et n'en parle plus. Ces deals dorment jusqu'à ce que votre concurrent les réveille."
        : "20 to 30% of \"lost\" deals aren't actually lost - they're just deferred. But your CRM filed them as \"Lost\" and moved on. They sit dormant until a competitor wakes them up.",
    },
    {
      icon: <GlassIcon type="bell" size={48} />,
      title: isFr ? "Les relances" : "Follow-ups",
      stat: isFr ? "5 deals oubliés" : "5 deals forgotten",
      description: isFr
        ? "Un commercial gère 25 à 40 deals actifs en même temps. Il en oublie 5. Pas par négligence - par volume. Chaque relance oubliée est une fenêtre de décision que vous n'avez pas ouverte."
        : "A sales rep manages 25 to 40 active deals at once. They forget 5. Not out of carelessness - out of volume. Each missed follow-up is a decision window left closed.",
    },
  ]

  const features = [
    {
      icon: <GlassIcon type="refresh" size={48} />,
      title: isFr ? "Zéro saisie" : "Zero data entry",
      subtitle: isFr ? "Votre CRM se remplit sans vos commerciaux" : "Your CRM fills itself without your sales team",
      description: isFr
        ? "Gmail, Google Calendar, LinkedIn - SymbiozAI capture toutes les interactions commerciales automatiquement. Les contacts sont créés. Les deals sont mis à jour. L'historique est complet. Vos commerciaux n'ont plus qu'à vendre."
        : "Gmail, Google Calendar, LinkedIn - SymbiozAI captures all sales interactions automatically. Contacts are created. Deals are updated. History is complete. Your salespeople just sell.",
    },
    {
      icon: <GlassIcon type="bell" size={48} />,
      title: isFr ? "Pipeline vivant" : "Living pipeline",
      subtitle: isFr ? "Chaque deal a une date de relance. Maya ne l'oublie pas." : "Every deal has a follow-up date. Maya never forgets.",
      description: isFr
        ? "Le système identifie les deals qui stagnent, calcule le risque de chaque opportunité sur 6 facteurs, et vous alerte avant que ça parte en vrille. Pas de notification parasite - uniquement ce qui compte."
        : "The system identifies stalling deals, calculates risk on 6 factors, and alerts you before things go sideways. No noise - only what matters.",
    },
    {
      icon: <GlassIcon type="target" size={48} />,
      title: isFr ? "Réserve active" : "Active reserve",
      subtitle: isFr ? "Vos deals perdus deviennent un actif, pas un cimetière" : "Your lost deals become an asset, not a graveyard",
      description: isFr
        ? "SymbiozAI classe automatiquement vos deals perdus en P1, P2 ou P3. Il surveille les signaux de réactivation - levée de fonds, nouveau poste, changement de budget. Quand le moment est bon, il vous le dit."
        : "SymbiozAI automatically classifies lost deals into P1, P2, or P3. It monitors reactivation signals - fundraising, new role, budget change. When the time is right, it tells you.",
    },
    {
      icon: <GlassIcon type="chart" size={48} />,
      title: isFr ? "Pilotage en une question" : "Pipeline in one question",
      subtitle: isFr ? "L'état de votre pipeline en 5 secondes" : "Your pipeline status in 5 seconds",
      description: isFr
        ? "Fin de quarter. Board meeting dans 2 heures. Vous posez la question à Maya. Elle vous sort les chiffres, les deals à risque, les opportunités à accélérer. Pas de dashboard à construire. Juste la réponse."
        : "End of quarter. Board meeting in 2 hours. You ask Maya. She gives you the numbers, at-risk deals, and opportunities to accelerate. No dashboard to build. Just the answer.",
    },
  ]

  const integrations = [
    { name: "WhatsApp", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "Gmail", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "Google Calendar", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
    { name: "Pipedrive", logo: "https://www.pipedrive.com/favicon.ico" },
  ]

  const trustBadges = [
    {
      icon: <GlassIcon type="globe" size={40} />,
      title: isFr ? "Hébergé en Europe" : "Hosted in Europe",
      description: isFr
        ? "Vos données commerciales ne quittent pas le territoire européen."
        : "Your sales data never leaves European territory.",
    },
    {
      icon: <GlassIcon type="shield" size={40} />,
      title: isFr ? "RGPD by design" : "GDPR by design",
      description: isFr
        ? "Pas un add-on de conformité - une architecture où la confidentialité est structurelle."
        : "Not a compliance add-on - an architecture where privacy is structural.",
    },
    {
      icon: <GlassIcon type="cpu" size={40} />,
      title: isFr ? "Architecture AI-Native" : "AI-Native Architecture",
      description: isFr
        ? "Construit avec l'IA comme fondation, pas comme ajout. LLM-agnostique par design."
        : "Built with AI as the foundation, not as an add-on. LLM-agnostic by design.",
    },
    {
      icon: <GlassIcon type="unlock" size={40} />,
      title: isFr ? "Zéro vendor lock-in" : "Zero vendor lock-in",
      description: isFr
        ? "Vos données vous appartiennent. Export complet à tout moment."
        : "Your data belongs to you. Full export at any time.",
    },
  ]

  const productMetrics = [
    { value: "38+", label: isFr ? "agents IA - et ce n'est que le début" : "AI agents - and counting", live: true },
    { value: ">95%", label: isFr ? "de précision sur nos tests" : "accuracy on our test suite", live: false },
    { value: "< 30 min", label: isFr ? "pour être opérationnel" : "to be operational", live: false },
    { value: "130+", label: isFr ? "endpoints CRM" : "CRM endpoints", live: false },
  ]

  // Note: dangerouslySetInnerHTML below is safe — jsonLd is built from
  // our own static dictionary strings, not from user input.
  const jsonLdHtml = JSON.stringify(jsonLd)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
        {/* Navigation */}
        <header className="absolute top-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-end items-center">
              <MobileMenu lang={lang} dictionary={dictionary} />
              <nav className="hidden md:flex items-center space-x-10 mr-6 -ml-20">
                <Link href={`/${lang}`} className="text-black hover:text-gray-900 transition-colors">
                  {isFr ? "Accueil" : "Home"}
                </Link>
                <Link href={`/${lang}/manifeste`} className="text-black hover:text-gray-900 transition-colors">
                  {isFr ? "Manifeste" : "Manifesto"}
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
          <section className="flex flex-col px-4 sm:px-6 text-center min-h-screen justify-center relative">
            <div
              className="hero-ambient-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, rgba(13,71,161,0.05) 40%, transparent 70%)" }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
              <h1 className="sr-only">{dictionary.h1}</h1>
              <div className="hero-item flex justify-center" style={{ animationDelay: "0ms" }}>
                <Logo size="xl" />
              </div>

              <h2 className="hero-item font-normal text-xl md:text-2xl mt-4" style={{ animationDelay: "150ms" }}>
                {Array.isArray(dictionary.subtitle) ? (
                  <>
                    <span className="block">{dictionary.subtitle[0]}</span>
                    <span className="block">{dictionary.subtitle[1]}</span>
                  </>
                ) : (
                  dictionary.subtitle
                )}
              </h2>

              <div className="hero-item flex flex-col items-center justify-center my-6 sm:my-8 text-gray-600 text-sm sm:text-base md:text-lg" style={{ animationDelay: "300ms" }}>
                <p className="text-center max-w-3xl">{dictionary.description}</p>
              </div>

              <div className="hero-item" style={{ animationDelay: "450ms" }}>
                <WaitlistForm form={dictionary.form} lang={lang} />
              </div>
            </div>

            <ScrollIndicator />
          </section>

          {/* AI-Native Vision Banner */}
          <section className="py-8 px-4 sm:px-6 bg-white">
            <ScrollReveal className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-widest mb-2">
                {isFr ? "AI-Native Company" : "AI-Native Company"}
              </p>
              <p className="text-gray-600 text-base md:text-lg">
                {isFr
                  ? "Nous croyons que la prochaine génération d'entreprises sera construite avec l'IA - nativement, structurellement. SymbiozAI est le premier logiciel commercial conçu selon ce principe."
                  : "We believe the next generation of companies will be built with AI - natively, structurally. SymbiozAI is the first commercial software designed on this principle."}
              </p>
              <Link href={`/${lang}/manifeste`} className="inline-block mt-3 text-sm font-medium text-[#0d47a1] hover:text-[#00e5ff] transition-colors underline underline-offset-4">
                {isFr ? "Lire notre manifeste" : "Read our manifesto"}
              </Link>
            </ScrollReveal>
          </section>

          {/* Problem Section */}
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Le problème" : "The problem"}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                  {isFr ? "Ce que vous perdez chaque semaine sans le savoir" : "What you lose every week without knowing"}
                </h3>
              </ScrollReveal>

              <ScrollReveal stagger className="grid md:grid-cols-3 gap-8">
                {painPoints.map((point, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">{point.icon}</div>
                    <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider mb-1">{point.title}</p>
                    <p className="text-2xl font-bold mb-3">{point.stat}</p>
                    <p className="text-gray-600 text-sm">{point.description}</p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>

          {/* Solution / Maya Section */}
          <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "La solution" : "The solution"}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-center mb-4">
                  {isFr ? "Un système qui comprend, décide et exécute." : "A system that understands, decides, and executes."}
                </h3>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                  {isFr
                    ? "SymbiozAI n'est pas un CRM amélioré. C'est une nouvelle génération de logiciel commercial - AI-Native - qui opère votre pipeline de manière autonome. Opérationnel en moins de 30 minutes."
                    : "SymbiozAI is not an improved CRM. It's a new generation of commercial software - AI-Native - that operates your pipeline autonomously. Operational in under 30 minutes."}
                </p>
              </ScrollReveal>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <ScrollReveal stagger className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <GlassIcon type="refresh" size={48} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {isFr ? "Capture automatique" : "Automatic capture"}
                        </h4>
                        <p className="text-gray-600">
                          {isFr
                            ? "SymbiozAI se connecte à Gmail et Google Calendar. Chaque email, chaque réunion, chaque interaction - capturée, analysée, rattachée au bon deal. Zéro saisie."
                            : "SymbiozAI connects to Gmail and Google Calendar. Every email, every meeting, every interaction - captured, analyzed, linked to the right deal. Zero data entry."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <GlassIcon type="chart" size={48} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {isFr ? "Pipeline auto-piloté" : "Auto-piloted pipeline"}
                        </h4>
                        <p className="text-gray-600">
                          {isFr
                            ? "Le scoring de chaque deal est recalculé en continu sur 6 facteurs de risque. Les deals qui stagnent remontent. Les relances sont identifiées avant que vous le demandiez."
                            : "Each deal's score is continuously recalculated on 6 risk factors. Stalling deals surface. Follow-ups are identified before you ask."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <GlassIcon type="message" size={48} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {isFr ? "Pilotage conversationnel" : "Conversational control"}
                        </h4>
                        <p className="text-gray-600">
                          {isFr
                            ? "Vous parlez à Maya en français, comme à un collègue. « Passe TechVision en négociation. » « Qui n'a pas eu de contact depuis 15 jours ? » Réponse immédiate."
                            : "You talk to Maya in plain language, like a colleague. \"Move TechVision to negotiation.\" \"Who hasn't been contacted in 15 days?\" Instant answer."}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                <div className="order-1 lg:order-2">
                  <InteractivePlayground lang={lang} />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section — 4 features */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Concrètement" : "In practice"}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                  {isFr ? "Ce qui change avec SymbiozAI" : "What changes with SymbiozAI"}
                </h3>
              </ScrollReveal>

              <ScrollReveal stagger className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">{feature.icon}</div>
                    <h4 className="text-xl font-bold mb-1">{feature.title}</h4>
                    <p className="text-sm font-medium text-[#0d47a1] mb-3">{feature.subtitle}</p>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Construit pour durer" : "Built to last"}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                  {isFr ? "Une infrastructure AI-Native. Pas un gadget." : "An AI-Native infrastructure. Not a gadget."}
                </h3>
              </ScrollReveal>

              {/* Product metrics */}
              <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {productMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] bg-clip-text text-transparent">
                        {metric.value}
                      </p>
                      {metric.live && (
                        <span className="relative flex h-2.5 w-2.5 mt-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
                  </div>
                ))}
              </ScrollReveal>

              {/* Trust badges */}
              <ScrollReveal stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <div className="flex justify-center mb-3">{badge.icon}</div>
                    <h4 className="font-semibold mb-1">{badge.title}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                ))}
              </ScrollReveal>

              {/* Founder quote */}
              <ScrollReveal className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <blockquote className="italic text-gray-700 text-base md:text-lg leading-relaxed">
                    &ldquo;{dictionary.quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm font-semibold text-gray-900">
                    — Laurent Bouzon, {isFr ? "fondateur de SymbiozAI" : "founder of SymbiozAI"}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Integrations Section */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12">
                  {isFr ? "Connecté à vos outils" : "Connected to your tools"}
                </h3>
              </ScrollReveal>
              <ScrollReveal stagger className="flex flex-wrap justify-center gap-6 md:gap-8">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-5 h-5 relative flex-shrink-0">
                      <Image
                        src={integration.logo || "/placeholder.svg"}
                        alt={`${integration.name} logo`}
                        width={20}
                        height={20}
                        className="object-contain w-5 h-5"
                        unoptimized
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{integration.name}</span>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>

          {/* CTA Final Section */}
          <section id="cta-final" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#0d47a1] to-[#1a237e] text-white">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                  {isFr ? "Récupérez vos lundis matin." : "Take back your Monday mornings."}
                </h3>
                <p className="text-white/80 text-lg mb-4">
                  {isFr
                    ? "Votre pipeline, à jour, en permanence. Vos deals à risque, identifiés avant qu'ils partent. Vos commerciaux qui vendent au lieu de saisir."
                    : "Your pipeline, always up to date. At-risk deals, identified before they slip. Your salespeople selling instead of typing."}
                </p>
                <p className="text-white/60 text-sm mb-8">
                  {isFr
                    ? "Accès bêta privé pour les scaleups européennes. Onboarding en moins de 30 minutes."
                    : "Private beta access for European scaleups. Onboarding in under 30 minutes."}
                </p>
                <div className="max-w-md mx-auto">
                  <WaitlistForm form={dictionary.form} lang={lang} />
                </div>
                <p className="text-white/40 text-xs mt-4">
                  {isFr
                    ? "Sans engagement. Sans carte bancaire. Sans configuration de 3 semaines."
                    : "No commitment. No credit card. No 3-week setup."}
                </p>
              </ScrollReveal>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-gray-400 text-sm bg-white">
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
