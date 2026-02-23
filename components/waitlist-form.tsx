"use client"

import { useState } from "react"
import type { FormDictionary } from "@/lib/dictionary"

export function WaitlistForm({ form, lang }: { form: FormDictionary; lang: string }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setStatus("error")
      setMessage(form.validation.required)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setMessage(form.validation.invalid)
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Une erreur s'est produite")
      }

      setStatus("success")
      setMessage(form.success)
      setEmail("")

      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch (error) {
      console.error("Error:", error)
      setStatus("error")
      setMessage(form.error)
    }
  }

  return (
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
            placeholder={form.placeholder}
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {form.joining}
                </span>
              ) : (
                form.button
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
  )
}
