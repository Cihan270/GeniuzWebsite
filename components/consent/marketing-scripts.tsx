"use client"

import { useCookieConsent } from "@/components/consent/cookie-consent-provider"
import { FEATURE_MARKETING } from "@/lib/consent"

/**
 * Loads marketing pixels only after explicit marketing consent.
 * Placeholder — Meta Pixel, LinkedIn, etc. can be added here later.
 */
export function MarketingScripts() {
  const { consent } = useCookieConsent()

  if (!FEATURE_MARKETING) return null
  if (!consent?.marketing) return null

  return null
}
