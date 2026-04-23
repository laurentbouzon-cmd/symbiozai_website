interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * StructuredData: generic JSON-LD injector.
 * Content is built from our own static copy, so it is safe.
 */
export function StructuredData({ data }: StructuredDataProps) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <script type="application/ld+json">
      {JSON.stringify(payload)}
    </script>
  )
}
