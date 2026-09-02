/**
 * Site-wide constants. No secrets — public marketing config only.
 * Override base URL via NEXT_PUBLIC_SITE_URL in env when deploying.
 */

export const SITE_NAME = "Geniuz"

export const SITE_TAGLINE =
  "Eerst begrijpen wat waarde oplevert. Daarna bouwen wat werkelijk nodig is."

/** Placeholder until client confirms production domain. */
export const DEFAULT_SITE_URL = "https://www.geniuzaic.com"

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "")
  }
  return DEFAULT_SITE_URL
}

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Geniuz",
  /** Placeholder contact until confirmed. */
  email: "info@geniuzaic.com",
  description:
    "AI-consultancy met eigen uitvoeringskracht: onderzoeken, prioriteren, bouwen en implementeren.",
} as const
