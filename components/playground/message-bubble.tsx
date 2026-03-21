"use client"

import { useStreamingText } from "@/hooks/use-streaming-text"
import type { ProspectRow, DealCard } from "@/lib/playground-scenarios"
import { Fragment } from "react"

interface MessageBubbleProps {
  type: "user" | "ai"
  text?: string
  richContent?: "table" | "deals"
  richData?: unknown
  streaming?: boolean
  lang?: string
}

function ProspectTable({ data, lang }: { data: ProspectRow[]; lang: string }) {
  const isFr = lang === "fr"
  return (
    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-3 py-3 max-w-[90%]">
      <div className="grid grid-cols-4 gap-x-3 gap-y-1.5 text-xs">
        <div className="font-semibold text-gray-500 pb-1 border-b border-gray-100">{isFr ? "Entreprise" : "Company"}</div>
        <div className="font-semibold text-gray-500 pb-1 border-b border-gray-100">{isFr ? "Ville" : "City"}</div>
        <div className="font-semibold text-gray-500 pb-1 border-b border-gray-100">{isFr ? "Taille" : "Size"}</div>
        <div className="font-semibold text-gray-500 pb-1 border-b border-gray-100">{isFr ? "Secteur" : "Sector"}</div>
        {data.map((row) => (
          <Fragment key={row.company}>
            <div className="text-gray-800 font-medium truncate">{row.company}</div>
            <div className="text-gray-600 truncate">{row.city}</div>
            <div className="text-gray-600">{row.size}</div>
            <div className="text-gray-600 truncate">{row.sector}</div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function DealCards({ data }: { data: DealCard[] }) {
  return (
    <div className="flex flex-col gap-2 max-w-[90%]">
      {data.map((deal) => (
        <div
          key={deal.name}
          className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-3 py-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base flex-shrink-0">{deal.emoji}</span>
              <span className="text-sm font-semibold text-gray-800 truncate">{deal.name}</span>
              <span className="text-xs text-gray-500 flex-shrink-0">{deal.amount}</span>
            </div>
            <span className="text-xs font-bold text-[#0d47a1] bg-[#0d47a1]/10 px-2 py-0.5 rounded-full flex-shrink-0">
              {deal.score}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{deal.reason}</p>
        </div>
      ))}
    </div>
  )
}

export function MessageBubble({ type, text, richContent, richData, streaming = false, lang = "en" }: MessageBubbleProps) {
  const { displayedText, isStreaming: isStreamActive } = useStreamingText({
    text: text ?? "",
    speed: 50,
    enabled: streaming && !!text,
  })

  if (type === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-[#0d47a1] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%]">
          <p className="text-sm">{text}</p>
        </div>
      </div>
    )
  }

  // AI message with rich content (no text)
  if (richContent === "table" && richData) {
    return (
      <div className="flex justify-start">
        <ProspectTable data={richData as ProspectRow[]} lang={lang} />
      </div>
    )
  }

  if (richContent === "deals" && richData) {
    return (
      <div className="flex justify-start">
        <DealCards data={richData as DealCard[]} />
      </div>
    )
  }

  // AI message with text (potentially streaming)
  const shownText = streaming ? displayedText : text
  const showCursor = streaming && isStreamActive

  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-[85%] shadow-sm">
        <p className="text-sm text-gray-800">
          {shownText}
          {showCursor && <span className="inline-block w-0.5 h-3.5 bg-gray-400 ml-0.5 animate-pulse" />}
        </p>
      </div>
    </div>
  )
}
