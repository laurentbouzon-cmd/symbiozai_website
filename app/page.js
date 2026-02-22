"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default function HomePage() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setStatus("error")
      setMessage("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    try {
      // Simuler un délai pour l'expérience utilisateur
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Ici, vous pourriez intégrer Formspree ou un autre service externe
      // au lieu d'utiliser une API interne

      setStatus("success")
      setMessage("✅ You're on the list!")
      setEmail("")

      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch (error) {
      console.error("Error:", error)
      setStatus("error")
      setMessage("❌ Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
      <main className="flex-grow flex flex-col px-4 sm:px-6 text-center py-[8vh] sm:py-[10vh]">
        <div className="max-w-3xl mx-auto">
          <h1 className="flex justify-center">
            <Logo size="lg" />
          </h1>

          <h2 className="font-normal text-xl md:text-2xl mt-4">
            Le premier CRM 100% IA-Native. Conçu pour travailler à votre place.
          </h2>

          <div className="flex flex-col items-center justify-center my-6 sm:my-8 space-y-[0.35rem] text-gray-600 text-sm sm:text-base md:text-lg">
            <p className="text-center">
              Votre prospection, votre suivi client et vos mises à jour CRM sont complètement automatisés, pilotés
              depuis WhatsApp et Slack, avec un agent IA intégré. SymbiozAI transforme chaque échange en actions
              concrètes : qualification, relances, documentation, reporting… Votre cycle commercial s'opère seul, en
              continu.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 mb-4">
            <div className="relative max-w-md mx-auto">
              <div
                className={`flex flex-col sm:flex-row items-center p-0.5 bg-white rounded-lg border-2 transition-all duration-300 ${
                  status === "error" ? "border-red-300" : "border-gray-200"
                }`}
              >
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-10 px-4 bg-transparent outline-none text-gray-800"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto h-10 px-5 mt-1 sm:mt-0 bg-gradient-to-r from-[#1a237e] to-[#00e5ff] text-white font-medium rounded-md cursor-pointer disabled:opacity-70 hover:opacity-90 transition-all duration-300 min-w-[160px] text-sm whitespace-nowrap"
                >
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
                      Joining...
                    </span>
                  ) : (
                    "Join the waitlist"
                  )}
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

        <div className="flex-grow flex items-center justify-center mt-8 mb-2">
          <blockquote className="italic text-base sm:text-lg md:text-xl max-w-[95%] sm:max-w-[90%] md:max-w-[600px] mx-auto">
            "We believe the next generation of companies won't just use AI, they'll be built with it. Natively.
            Structurally. Intelligently."
          </blockquote>
        </div>
      </main>

      <footer className="py-2 text-center text-gray-400 text-sm">
        <p>&copy; {currentYear} SymbiozAI. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/contact" className="text-xs text-gray-400 hover:text-gray-600 mx-2">
            Contact
          </Link>
          <Link href="/status" className="text-xs text-gray-400 hover:text-gray-600 mx-2">
            System Status
          </Link>
        </div>
      </footer>
    </div>
  )
}
