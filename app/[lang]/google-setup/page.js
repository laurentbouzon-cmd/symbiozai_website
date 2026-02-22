import { Suspense } from "react"
import GoogleSetupContent from "./content"

export default function GoogleSetupPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-lg text-gray-600">Loading Google setup interface...</p>
        </div>
      }
    >
      <GoogleSetupContent params={params} />
    </Suspense>
  )
}
