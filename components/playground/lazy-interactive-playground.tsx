"use client"

import dynamic from "next/dynamic"

const InteractivePlayground = dynamic(
  () =>
    import("./interactive-playground").then((mod) => ({
      default: mod.InteractivePlayground,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto">
        {/* Skeleton header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] animate-pulse" />
          <div className="flex-1">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-14 bg-gray-100 rounded mt-1 animate-pulse" />
          </div>
        </div>
        {/* Skeleton messages area */}
        <div
          className="p-4 space-y-3 bg-gray-50"
          style={{ height: "400px" }}
        >
          <div className="flex justify-start">
            <div className="h-12 w-3/4 bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="flex justify-start">
            <div className="h-8 w-1/2 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
        {/* Skeleton input bar */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] rounded-full" />
          </div>
        </div>
      </div>
    ),
  }
)

interface LazyInteractivePlaygroundProps {
  lang: string
}

export function LazyInteractivePlayground({ lang }: LazyInteractivePlaygroundProps) {
  return <InteractivePlayground lang={lang} />
}
