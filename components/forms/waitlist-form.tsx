"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isValidEmail } from "@/lib/utils"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setStatus("error")
      setMessage("Email is required")
      return
    }

    if (!isValidEmail(email)) {
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
    <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 mb-4 w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading"}
            aria-label="Email address"
            className={status === "error" ? "border-red-300" : ""}
          />
        </div>
        <Button type="submit" isLoading={status === "loading"} className="whitespace-nowrap">
          {status === "loading" ? "Joining..." : "Join the waitlist"}
        </Button>
      </div>

      {status !== "idle" && (
        <p
          className={`mt-2 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  )
}
