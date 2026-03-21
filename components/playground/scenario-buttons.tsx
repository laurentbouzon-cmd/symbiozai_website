"use client"

import type { ScenarioButton } from "@/lib/playground-scenarios"

interface ScenarioButtonsProps {
  buttons: ScenarioButton[]
  onSelect: (id: string) => void
  disabled: boolean
  playedIds: Set<string>
}

export function ScenarioButtons({ buttons, onSelect, disabled, playedIds }: ScenarioButtonsProps) {
  const availableButtons = buttons.filter((btn) => !playedIds.has(btn.id))

  if (availableButtons.length === 0) return null

  return (
    <div className="flex flex-col gap-2 pl-2">
      {availableButtons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => onSelect(btn.id)}
          disabled={disabled}
          aria-label={`${btn.emoji} ${btn.label}`}
          className={`text-left text-sm px-4 py-2.5 rounded-xl border transition-all duration-200
            ${
              disabled
                ? "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                : "border-[#0d47a1]/20 text-[#0d47a1] hover:bg-[#0d47a1]/5 hover:border-[#0d47a1]/40 cursor-pointer"
            }`}
        >
          {btn.emoji} {btn.label}
        </button>
      ))}
    </div>
  )
}
