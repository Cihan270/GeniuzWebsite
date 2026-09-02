import { z } from "zod"

/**
 * Website Scan input — URL is collected for UX only.
 * Mock provider ignores the host and returns fixed demodata.
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

export function normalizeWebsiteUrl(url: string): string {
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}
