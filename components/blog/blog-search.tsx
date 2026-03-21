"use client"

import { Search } from "lucide-react"

interface BlogSearchProps {
  value: string
  onChange: (query: string) => void
  lang: string
}

export function BlogSearch({ value, onChange, lang }: BlogSearchProps) {
  const isFr = lang === "fr"

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isFr ? "Rechercher un article..." : "Search articles..."}
        className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]/20 transition-all duration-200 placeholder:text-gray-400"
      />
    </div>
  )
}
