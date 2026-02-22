"use client"

interface EnvVariablesCardProps {
  title: string
  variables: Record<string, boolean>
  description?: string
}

export function EnvVariablesCard({ title, variables, description }: EnvVariablesCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(variables).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm font-medium text-gray-500">
                {key.startsWith("has") ? key : `NEXT_PUBLIC_HAS_${key.toUpperCase()}`}
              </p>
              <p className={value ? "text-green-600" : "text-red-600"}>{value ? "Configured" : "Not configured"}</p>
            </div>
          ))}
        </div>
        {description && <p className="mt-3 text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  )
}
