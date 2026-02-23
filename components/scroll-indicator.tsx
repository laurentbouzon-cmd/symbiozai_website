"use client"

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center">
      <div
        className="cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 group-hover:border-[#0d47a1] transition-colors duration-300 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-gray-400 group-hover:bg-[#0d47a1] animate-scroll-down" />
        </div>
      </div>
    </div>
  )
}
