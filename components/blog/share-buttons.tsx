"use client"

import { useState } from "react"
import { Linkedin, Twitter, Link2, Check } from "lucide-react"

interface ShareButtonsProps {
  title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  function getUrl(): string {
    if (typeof window !== "undefined") {
      return window.location.href
    }
    return ""
  }

  function shareLinkedIn() {
    const url = getUrl()
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  function shareTwitter() {
    const url = getUrl()
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  async function copyLink() {
    const url = getUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = url
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center gap-1 relative">
      <button
        onClick={shareLinkedIn}
        className="p-2 text-gray-400 hover:text-[#0d47a1] transition-colors duration-200"
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={shareTwitter}
        className="p-2 text-gray-400 hover:text-[#0d47a1] transition-colors duration-200"
        aria-label="Partager sur Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={copyLink}
        className="p-2 text-gray-400 hover:text-[#0d47a1] transition-colors duration-200"
        aria-label="Copier le lien"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
      </button>
      {copied && (
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-900 rounded px-2 py-1 whitespace-nowrap animate-fade-in">
          Lien copié !
        </span>
      )}
    </div>
  )
}
