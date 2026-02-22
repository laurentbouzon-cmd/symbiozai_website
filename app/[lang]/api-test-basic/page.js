import { Suspense } from "react"
import ApiTestBasicContent from "./content"

export default function ApiTestBasicPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-lg text-gray-600">Loading API test interface...</p>
        </div>
      }
    >
      <ApiTestBasicContent params={params} />
    </Suspense>
  )
}
