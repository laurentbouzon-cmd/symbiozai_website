"use client"

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">An Error Occurred</h2>
      <p className="mb-6 text-gray-600">Sorry, an unexpected error has occurred.</p>
      <a href="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        Back to Home
      </a>
    </div>
  )
}
