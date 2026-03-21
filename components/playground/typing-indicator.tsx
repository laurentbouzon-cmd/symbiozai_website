"use client"

interface TypingIndicatorProps {
  visible: boolean
}

export function TypingIndicator({ visible }: TypingIndicatorProps) {
  return (
    <div
      className={`flex justify-start transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"
      }`}
    >
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
        <div className="flex gap-1 items-center h-4">
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  )
}
