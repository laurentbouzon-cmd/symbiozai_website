export default function Loading() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
      <p className="text-lg text-gray-600">Loading Notion API test interface...</p>
    </div>
  )
}
