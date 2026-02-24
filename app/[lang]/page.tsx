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
import { ChatMockup } from "@/components/chat-mockup"

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const currentYear = new Date().getFullYear()

  // Données structurées pour les moteurs de recherche
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

  const missionPillars = [
    {
      icon: <GlassIcon type="zap" size={48} />,
      title: isFr ? "Automatisation totale" : "Total Automation",
      description: isFr
        ? "Fini les tâches répétitives. Votre CRM se met à jour seul, vos relances partent automatiquement, vos leads sont qualifiés en temps réel."
        : "No more repetitive tasks. Your CRM updates itself, follow-ups are sent automatically, leads are qualified in real-time.",
    },
    {
      icon: <GlassIcon type="message" size={48} />,
      title: isFr ? "Piloté par conversation" : "Conversation-Driven",
      description: isFr
        ? "Gérez tout depuis WhatsApp ou Slack. Demandez un rapport, lancez une relance, consultez un deal en langage naturel."
        : "Manage everything from WhatsApp or Slack. Request a report, trigger a follow-up, check a deal in natural language.",
    },
    {
      icon: <GlassIcon type="chart" size={48} />,
      title: isFr ? "Intelligence actionnable" : "Actionable Intelligence",
      description: isFr
        ? "Chaque interaction génère des insights. L'IA identifie les opportunités, anticipe les risques et vous guide vers la prochaine action."
        : "Every interaction generates insights. AI identifies opportunities, anticipates risks, and guides you to the next action.",
    },
  ]

  const features = [
    {
      icon: <GlassIcon type="database" size={40} />,
      title: isFr ? "Enrichissement automatique" : "Auto-enrichment",
      description: isFr
        ? "Contacts et entreprises enrichis automatiquement. Sans outil tiers."
        : "Contacts and companies enriched automatically. No third-party tool.",
    },
    {
      icon: <GlassIcon type="chrome" size={40} />,
      title: isFr ? "Import LinkedIn en un clic" : "One-click LinkedIn Import",
      description: isFr
        ? "Extension Chrome pour importer et enrichir vos contacts LinkedIn."
        : "Chrome extension to import and enrich your LinkedIn contacts.",
    },
    {
      icon: <GlassIcon type="target" size={40} />,
      title: isFr ? "Inbound & Outbound intelligent" : "Smart Inbound & Outbound",
      description: isFr
        ? "Nurturing et prospection orchestrés pour convertir chaque contact."
        : "Nurturing and outreach orchestrated to convert every contact.",
    },
    {
      icon: <GlassIcon type="refresh" size={40} />,
      title: isFr ? "Synchronisation automatique" : "Auto-sync",
      description: isFr
        ? "Emails, appels, meetings : tout est capturé et centralisé automatiquement."
        : "Emails, calls, meetings: everything is captured and centralized automatically.",
    },
    {
      icon: <GlassIcon type="users" size={40} />,
      title: isFr ? "Qualification intelligente" : "Smart Qualification",
      description: isFr
        ? "L'IA analyse chaque lead et attribue un score de qualification en temps réel."
        : "AI analyzes each lead and assigns a qualification score in real-time.",
    },
    {
      icon: <GlassIcon type="file" size={40} />,
      title: isFr ? "Documentation auto-générée" : "Auto-generated Documentation",
      description: isFr
        ? "Comptes-rendus, notes de meeting, résumés de deals : générés sans effort."
        : "Meeting notes, deal summaries, reports: generated effortlessly.",
    },
    {
      icon: <GlassIcon type="calendar" size={40} />,
      title: isFr ? "Relances programmées" : "Scheduled Follow-ups",
      description: isFr
        ? "L'IA planifie et envoie les relances au moment optimal pour chaque prospect."
        : "AI schedules and sends follow-ups at the optimal time for each prospect.",
    },
    {
      icon: <GlassIcon type="bell" size={40} />,
      title: isFr ? "Alertes proactives" : "Proactive Alerts",
      description: isFr
        ? "Soyez notifié des deals à risque, des opportunités à saisir et des actions prioritaires."
        : "Get notified about at-risk deals, hot opportunities, and priority actions.",
    },
    {
      icon: <GlassIcon type="chart" size={40} />,
      title: isFr ? "Reporting conversationnel" : "Conversational Reporting",
      description: isFr
        ? "Demandez vos KPIs en langage naturel. L'IA génère les rapports instantanément."
        : "Ask for your KPIs in natural language. AI generates reports instantly.",
    },
  ]

  const integrations = [
    {
      name: "WhatsApp",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    },
    {
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    },
    {
      name: "Gmail",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    },
    {
      name: "Google Calendar",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    },
    {
      name: "Notion",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    },
    {
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    },
    {
      name: "HubSpot",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg",
    },
    {
      name: "Pipedrive",
      logo: "https://www.pipedrive.com/favicon.ico",
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
        {/* Barre de navigation transparente avec liens à droite */}
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
            {/* Ambient glow */}
            <div
              className="hero-ambient-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, rgba(13,71,161,0.05) 40%, transparent 70%)" }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
              <h1 className="hero-item flex justify-center" style={{ animationDelay: "0ms" }}>
                <Logo size="xl" />
              </h1>

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

          {/* Maya AI Section */}
          <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Votre nouvelle interface" : "Your new interface"}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-center mb-4">
                  {isFr ? "Rencontrez Maya AI" : "Meet Maya AI"}
                </h3>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                  {isFr
                    ? "Oubliez les dashboards complexes et les clics interminables. Maya est votre agent IA personnel : elle opère votre croissance par la conversation."
                    : "Forget complex dashboards and endless clicks. Maya is your personal AI agent that manages your Autonomous Revenue Brain through conversation."}
                </p>
              </ScrollReveal>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Maya presentation */}
                <div className="order-2 lg:order-1">
                  <ScrollReveal stagger className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] rounded-full flex items-center justify-center text-white flex-shrink-0">
                        <GlassIcon type="bot" size={48} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {isFr ? "Pas un SaaS. Un collègue." : "Not a SaaS. A colleague."}
                        </h4>
                        <p className="text-gray-600">
                          {isFr
                            ? "Maya n'est pas une interface de plus à apprendre. C'est une IA qui comprend vos demandes, exécute les actions et vous tient informé, comme un assistant humain, mais disponible 24/7."
                            : "Maya is not another interface to learn. It's an AI that understands your requests, executes actions, and keeps you informed, like a human assistant, but available 24/7."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#e3f2fd] rounded-full flex items-center justify-center text-[#0d47a1] flex-shrink-0">
                        <GlassIcon type="message" size={48} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {isFr ? "Parlez, ne cliquez plus" : "Talk, don't click"}
                        </h4>
                        <p className="text-gray-600">
                          {isFr
                            ? '"Maya, envoie une relance à tous les leads chauds de cette semaine" et c\'est fait. Fini les 15 clics pour une action simple.'
                            : '"Maya, send a follow-up to all hot leads from this week" and it\'s done. No more 15 clicks for a simple action.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#e3f2fd] rounded-full flex items-center justify-center text-[#0d47a1] flex-shrink-0">
                        <GlassIcon type="sparkles" size={48} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {isFr ? "Proactive, pas réactive" : "Proactive, not reactive"}
                        </h4>
                        <p className="text-gray-600">
                          {isFr
                            ? "Maya vous alerte avant les problèmes : deals à risque, opportunités à saisir, relances oubliées. Elle anticipe vos besoins."
                            : "Maya alerts you before problems: at-risk deals, opportunities to seize, forgotten follow-ups. She anticipates your needs."}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right side - Chat mockup */}
                <div className="order-1 lg:order-2">
                  <ChatMockup
                    messages={[
                      {
                        type: "user",
                        text: isFr
                          ? "Maya, quel est le statut de mes deals cette semaine ?"
                          : "Maya, what's the status of my deals this week?",
                      },
                      {
                        type: "ai",
                        text: isFr
                          ? "Cette semaine, vous avez 12 deals actifs pour 45K€ de pipeline. 3 sont en négociation finale, dont TechCorp qui attend votre proposition. Voulez-vous que je prépare le devis ?"
                          : "This week, you have 12 active deals for $45K in pipeline. 3 are in final negotiation, including TechCorp awaiting your proposal. Want me to prepare the quote?",
                      },
                      {
                        type: "user",
                        text: isFr ? "Oui, et relance les 2 autres" : "Yes, and follow up on the other 2",
                      },
                      {
                        type: "ai",
                        text: isFr
                          ? "C'est fait. Devis TechCorp généré et relances envoyées à DataFlow et CloudNet. Je vous notifie dès qu'ils répondent."
                          : "Done. TechCorp quote generated and follow-ups sent to DataFlow and CloudNet. I'll notify you as soon as they respond.",
                      },
                    ]}
                    inputPlaceholder={isFr ? "Demandez à Maya..." : "Ask Maya..."}
                    agentName="Maya AI"
                    agentStatus={isFr ? "En ligne" : "Online"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Notre mission" : "Our Mission"}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                  {isFr ? "Une intelligence qui travaille pour vous" : "An intelligence that works for you"}
                </h3>
              </ScrollReveal>

              <ScrollReveal stagger className="grid md:grid-cols-3 gap-8">
                {missionPillars.map((pillar, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">{pillar.icon}</div>
                    <h4 className="text-xl font-semibold mb-2">{pillar.title}</h4>
                    <p className="text-gray-600">{pillar.description}</p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Fonctionnalités" : "Features"}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-center mb-4">
                  {isFr ? "Tout ce dont vous avez besoin" : "Everything you need"}
                </h3>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                  {isFr
                    ? "Des fonctionnalités pensées pour automatiser votre cycle commercial de bout en bout."
                    : "Features designed to automate your sales cycle from end to end."}
                </p>
              </ScrollReveal>

              <ScrollReveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
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

          {/* Quote Section */}
          <section className="py-16 px-4 sm:px-6">
            <ScrollReveal className="max-w-3xl mx-auto text-center">
              <blockquote className="italic text-xl md:text-2xl text-gray-700">"{dictionary.quote}"</blockquote>
            </ScrollReveal>
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
