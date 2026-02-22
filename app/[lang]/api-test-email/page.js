import { Suspense } from "react"
import ApiTestEmailContent from "./content"

export default function ApiTestEmailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-lg text-gray-600">Loading email test interface...</p>
        </div>
      }
    >
      <ApiTestEmailContent params={params} />
    </Suspense>
  )
}
