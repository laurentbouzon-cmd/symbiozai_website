"use client"

import { useState } from "react"

interface CodeBlockProps {
  code: string
  language?: "bash" | "json" | "text"
  caption?: string
}

/**
 * CodeBlock — dark terminal/editor block with copy-to-clipboard.
 * Keeps the dark tone consistent across /mcp and /features install snippets.
 */
export function CodeBlock({ code, language = "bash", caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API can fail in non-secure contexts; silently ignore.
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 text-sm shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between border-b border-gray-800/80 px-4 py-2 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500/60" aria-hidden="true" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500/60" aria-hidden="true" />
          <span className="ml-3 font-mono tracking-tight text-gray-500">{caption ?? language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-gray-800 px-2.5 py-1 font-medium text-gray-300 transition hover:border-gray-600 hover:text-white"
          aria-label="Copy to clipboard"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-gray-100 md:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}
