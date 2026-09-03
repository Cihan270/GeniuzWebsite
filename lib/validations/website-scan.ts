import { z } from "zod"

/**
 * Website Scan input.
 *
 * Fase 2a: the URL is actually fetched server-side, so this schema is a real
 * gate rather than UX decoration. Network-level safety (private ranges,
 * redirects, ports) is enforced separately in lib/scans/website-fetch.
 */
export const websiteScanInputSchema = z.object({
  url: z
    .string({ error: "Vul een URL in" })
    .trim()
    .min(1, "Vul een URL in")
    .max(500, "URL is te lang")
    .refine(
      (value) => {
        try {
          const withProtocol = /^https?:\/\//i.test(value)
            ? value
            : `https://${value}`
          const parsed = new URL(withProtocol)
          return Boolean(parsed.hostname) && parsed.hostname.includes(".")
        } catch {
          return false
        }
      },
      { message: "Vul een geldige website-URL in" },
    ),
})

export type WebsiteScanInputParsed = z.infer<typeof websiteScanInputSchema>

/** Body accepted by POST /api/website-scan. */
export const websiteScanApiSchema = websiteScanInputSchema

export type WebsiteScanApiPayload = z.infer<typeof websiteScanApiSchema>

export function normalizeWebsiteUrl(url: string): string {
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}
