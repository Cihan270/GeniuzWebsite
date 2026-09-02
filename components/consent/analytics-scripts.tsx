"use client"

import { Analytics } from "@vercel/analytics/react"

import { useCookieConsent } from "@/components/consent/cookie-consent-provider"
import { FEATURE_ANALYTICS } from "@/lib/consent"

/**
 * Loads Vercel Analytics only after explicit analytics consent.
 * No-op when FEATURE_ANALYTICS is false or consent is missing/denied.
 */
export function AnalyticsScripts() {
  const { consent } = useCookieConsent()

  if (!FEATURE_ANALYTICS) return null
  if (!consent?.analytics) return null

  return <Analytics />
}

/** @deprecated Use `AnalyticsScripts` instead. */
export const GatedAnalytics = AnalyticsScripts
