"use client"

import { GlassIcon } from "@/components/ui/glass-icon"

interface PlaygroundHeaderProps {
  agentName: string
  statusText: string
}

export function PlaygroundHeader({ agentName, statusText }: PlaygroundHeaderProps) {
  return (
    <div className="bg-[#0d47a1] px-4 py-3 flex items-center gap-3 rounded-t-2xl">
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <GlassIcon type="bot" size={40} />
      </div>
      <div>
        <p className="text-white font-medium">{agentName}</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-white/70 text-sm">{statusText}</p>
        </div>
      </div>
    </div>
  )
}
