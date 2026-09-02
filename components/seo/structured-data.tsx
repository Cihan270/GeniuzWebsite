import { cn } from "@/lib/utils"

type StructuredDataProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[]
  className?: string
}

/** Renders JSON-LD for Organization, FAQ, WebSite, etc. */
export function StructuredData({ data, className }: StructuredDataProps) {
  const payload = Array.isArray(data)
    ? data.length === 1
      ? data[0]
      : data
    : data

  return (
    <script
      type="application/ld+json"
      className={cn(className)}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
    />
  )
}
