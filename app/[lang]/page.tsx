"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import { getDictionary } from "@/lib/dictionary"
import { FooterLanguageSwitcher } from "@/components/footer-language-switcher"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { GlassIcon } from "@/components/ui/glass-icon"

export default function Page({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setStatus("error")
      setMessage(dictionary.form.validation.required)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setMessage(dictionary.form.validation.invalid)
      return
    }

    setStatus("loading")

    try {
      // Appeler l'API pour enregistrer l'email
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, lang: params.lang }), // Ajouter la langue
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Une erreur s'est produite")
      }

      // Si l'enregistrement a réussi
      setStatus("success")
      setMessage(dictionary.form.success)
      setEmail("")

      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch (error) {
      console.error("Error:", error)
      setStatus("error")
      setMessage(dictionary.form.error)
    }
  }

  // Données structurées pour les moteurs de recherche
  const jsonLd = [
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

  const isFr = params.lang === "fr"

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
              <MobileMenu lang={params.lang} dictionary={dictionary} />
              <nav className="hidden md:flex items-center space-x-10 mr-6 -ml-20">
                <Link href={`/${params.lang}`} className="text-black hover:text-gray-900 transition-colors">
                  {isFr ? "Accueil" : "Home"}
                </Link>
                <Link href={`/${params.lang}/manifeste`} className="text-black hover:text-gray-900 transition-colors">
                  {isFr ? "Manifeste" : "Manifesto"}
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
          <section className="flex flex-col px-4 sm:px-6 text-center min-h-screen justify-center relative">
            <div className="max-w-3xl mx-auto">
              <h1 className="flex justify-center">
                <Logo size="xl" />
              </h1>

              <h2 className="font-normal text-xl md:text-2xl mt-4">
                {Array.isArray(dictionary.subtitle) ? (
                  <>
                    <span className="block">{dictionary.subtitle[0]}</span>
                    <span className="block">{dictionary.subtitle[1]}</span>
                  </>
                ) : (
                  dictionary.subtitle
                )}
              </h2>

              <div className="flex flex-col items-center justify-center my-6 sm:my-8 text-gray-600 text-sm sm:text-base md:text-lg">
                <p className="text-center max-w-3xl">{dictionary.description}</p>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative max-w-md mx-auto">
                  <div
                    className={`flex flex-col sm:flex-row items-center p-1 rounded-2xl transition-all duration-300 ${
                      status === "error" ? "border-red-300/50" : ""
                    }`}
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      boxShadow:
                        "0 8px 32px rgba(0, 229, 255, 0.15), inset 0 1px 1px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.08)",
                      border: "1.5px solid rgba(0, 229, 255, 0.4)",
                    }}
                  >
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={dictionary.form.placeholder}
                      required
                      className="w-full h-12 px-5 bg-transparent outline-none text-gray-900 text-center sm:text-left placeholder:text-gray-500"
                      disabled={status === "loading"}
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto h-11 px-6 mt-1 sm:mt-0 sm:mr-0.5 font-medium rounded-xl cursor-pointer disabled:opacity-70 transition-all duration-300 min-w-[160px] text-sm whitespace-nowrap text-white relative overflow-hidden group"
                      style={{
                        background: "linear-gradient(135deg, rgba(26, 35, 126, 0.9) 0%, rgba(0, 229, 255, 0.9) 100%)",
                        boxShadow: "0 4px 15px rgba(0, 229, 255, 0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
                      }}
                    >
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                        }}
                      />
                      <span className="relative z-10">
                        {status === "loading" ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {dictionary.form.joining}
                          </span>
                        ) : (
                          dictionary.form.button
                        )}
                      </span>
                    </button>
                  </div>
                </div>

                {status !== "idle" && (
                  <p
                    className={`mt-2 ${status === "success" ? "text-green-600" : "text-red-600"}`}
                    role="status"
                    aria-live="polite"
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>

            <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center">
              <div
                className="cursor-pointer group"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
              >
                <div className="w-6 h-10 rounded-full border-2 border-gray-400 group-hover:border-[#0d47a1] transition-colors duration-300 flex justify-center pt-2">
                  <div className="w-1 h-3 rounded-full bg-gray-400 group-hover:bg-[#0d47a1] animate-scroll-down" />
                </div>
              </div>
            </div>
          </section>

          {/* Maya AI Section */}
          <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
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

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Maya presentation */}
                <div className="order-2 lg:order-1">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#1a237e] to-[#00e5ff] rounded-full flex items-center justify-center text-white flex-shrink-0">
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
                  </div>
                </div>

                {/* Right side - Chat mockup */}
                <div className="order-1 lg:order-2">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto">
                    {/* Chat header */}
                    <div className="bg-gradient-to-r from-[#1a237e] to-[#0d47a1] px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <GlassIcon type="bot" size={40} />
                      </div>
                      <div>
                        <p className="text-white font-medium">Maya AI</p>
                        <p className="text-white/70 text-sm">{isFr ? "En ligne" : "Online"}</p>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="p-4 space-y-4 bg-gray-50 min-h-[300px]">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="bg-[#0d47a1] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%]">
                          <p className="text-sm">
                            {isFr
                              ? "Maya, quel est le statut de mes deals cette semaine ?"
                              : "Maya, what's the status of my deals this week?"}
                          </p>
                        </div>
                      </div>

                      {/* Maya response */}
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-[85%] shadow-sm">
                          <p className="text-sm text-gray-800">
                            {isFr
                              ? "Cette semaine, vous avez 12 deals actifs pour 45K€ de pipeline. 3 sont en négociation finale, dont TechCorp qui attend votre proposition. Voulez-vous que je prépare le devis ?"
                              : "This week, you have 12 active deals for $45K in pipeline. 3 are in final negotiation, including TechCorp awaiting your proposal. Want me to prepare the quote?"}
                          </p>
                        </div>
                      </div>

                      {/* User response */}
                      <div className="flex justify-end">
                        <div className="bg-[#0d47a1] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%]">
                          <p className="text-sm">
                            {isFr ? "Oui, et relance les 2 autres" : "Yes, and follow up on the other 2"}
                          </p>
                        </div>
                      </div>

                      {/* Maya confirmation */}
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-[85%] shadow-sm">
                          <p className="text-sm text-gray-800">
                            {isFr
                              ? "C'est fait. Devis TechCorp généré et relances envoyées à DataFlow et CloudNet. Je vous notifie dès qu'ils répondent."
                              : "Done. TechCorp quote generated and follow-ups sent to DataFlow and CloudNet. I'll notify you as soon as they respond."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chat input */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                        <input
                          type="text"
                          placeholder={isFr ? "Demandez à Maya..." : "Ask Maya..."}
                          className="bg-transparent outline-none flex-1 text-sm"
                          disabled
                        />
                        <button className="w-8 h-8 bg-gradient-to-r from-[#1a237e] to-[#00e5ff] rounded-full flex items-center justify-center text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14M12 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                {isFr ? "Notre mission" : "Our Mission"}
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                {isFr ? "Une intelligence qui travaille pour vous" : "An intelligence that works for you"}
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {missionPillars.map((pillar, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">{pillar.icon}</div>
                    <h4 className="text-xl font-semibold mb-2">{pillar.title}</h4>
                    <p className="text-gray-600">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Integrations Section */}
          <section className="py-16 sm:py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12">
                {isFr ? "Connecté à vos outils" : "Connected to your tools"}
              </h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
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
                    <span className="text-sm font-medium text-gray-700">{integration.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="italic text-xl md:text-2xl text-gray-700">"{dictionary.quote}"</blockquote>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-gray-400 text-sm bg-white">
          <p>
            &copy; {currentYear} SymbiozAI. {dictionary.footer.copyright}
          </p>
          <div className="mt-3 flex justify-center">
            <FooterLanguageSwitcher currentLocale={params.lang} dictionary={dictionary} />
          </div>
        </footer>
      </div>
    </>
  )
}
