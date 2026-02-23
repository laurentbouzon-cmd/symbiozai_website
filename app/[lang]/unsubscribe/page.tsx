"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"

export default function UnsubscribePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ email?: string }>
}) {
  const { lang } = use(params)
  const { email } = use(searchParams)
  const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">("idle")

  const t = {
    fr: {
      title: "Se désinscrire",
      confirm: "Confirmer la désinscription",
      confirmText: (e: string) => `Supprimer ${e} de la waitlist SymbiozAI ?`,
      button: "Confirmer",
      success: "Tu as bien été désinscrit.",
      successSub: "Tu ne recevras plus d'emails de notre part.",
      error: "Une erreur s'est produite. Réessaie plus tard.",
      back: "Retour au site",
      noEmail: "Lien invalide.",
    },
    en: {
      title: "Unsubscribe",
      confirm: "Confirm unsubscription",
      confirmText: (e: string) => `Remove ${e} from the SymbiozAI waitlist?`,
      button: "Confirm",
      success: "You have been unsubscribed.",
      successSub: "You won't receive any more emails from us.",
      error: "An error occurred. Please try again later.",
      back: "Back to site",
      noEmail: "Invalid link.",
    },
  }

  const copy = lang === "fr" ? t.fr : t.en

  async function handleUnsubscribe() {
    setStatus("loading")
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setStatus(data.success ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center p-8">
        <p className="text-gray-400">{copy.noEmail}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {status === "success" ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{copy.success}</h1>
            <p className="text-gray-400 mb-8">{copy.successSub}</p>
            <Link href={`/${lang}`} className="text-[#0088C2] hover:underline">{copy.back}</Link>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{copy.confirm}</h1>
            <p className="text-gray-400 mb-8">{copy.confirmText(email)}</p>
            {status === "error" && (
              <p className="text-red-400 mb-4">{copy.error}</p>
            )}
            <div className="flex gap-4">
              <button
                onClick={handleUnsubscribe}
                disabled={status === "loading"}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "..." : copy.button}
              </button>
              <Link
                href={`/${lang}`}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
              >
                {copy.back}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
