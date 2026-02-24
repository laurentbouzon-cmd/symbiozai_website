"use client"

import { useEffect, useRef, useState } from "react"
import { GlassIcon } from "@/components/ui/glass-icon"

interface ChatMessage {
  type: "user" | "ai"
  text: string
}

interface ChatMockupProps {
  messages: ChatMessage[]
  inputPlaceholder: string
  agentName: string
  agentStatus: string
}

export function ChatMockup({ messages, inputPlaceholder, agentName, agentStatus }: ChatMockupProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const delays = [400, 1300, 2300, 3300]

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el)
          delays.slice(0, messages.length).forEach((delay, index) => {
            setTimeout(() => setVisibleCount((c) => c + 1), delay)
          })
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [messages.length])

  const showTyping = visibleCount < messages.length && messages[visibleCount]?.type === "ai"

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto">
      {/* Chat header */}
      <div className="bg-[#0d47a1] px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <GlassIcon type="bot" size={40} />
        </div>
        <div>
          <p className="text-white font-medium">{agentName}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-white/70 text-sm">{agentStatus}</p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="p-4 space-y-4 bg-gray-50 min-h-[300px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex transition-all duration-500 ${
              index < visibleCount ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            } ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.type === "user" ? (
              <div className="bg-[#0d47a1] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-[80%]">
                <p className="text-sm">{msg.text}</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-[85%] shadow-sm">
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder={inputPlaceholder}
            className="bg-transparent outline-none flex-1 text-sm"
            disabled
          />
          <button className="w-8 h-8 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] rounded-full flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
