/**
 * Consent categories — only what the site actually uses.
 * Analytics appears when Vercel Analytics is wired; marketing is UI-ready for future scripts.
 */

export const CONSENT_STORAGE_KEY = "geniuz_cookie_consent"

/** True once `@vercel/analytics` is installed and gated behind consent. */
export const FEATURE_ANALYTICS = true

/** When false, no marketing scripts load; category remains visible in preferences UI. */
export const FEATURE_MARKETING = false

export type ConsentCategoryId = "necessary" | "analytics" | "marketing"

export type ConsentCategory = {
  id: ConsentCategoryId
  required: boolean
  /** When false, category is omitted from UI entirely. */
  enabled: boolean
}

export const consentCategories: readonly ConsentCategory[] = [
  {
    id: "necessary",
    required: true,
    enabled: true,
  },
  {
    id: "analytics",
    required: false,
    enabled: FEATURE_ANALYTICS,
  },
  {
    id: "marketing",
    required: false,
    enabled: true,
  },
] as const

export type ConsentState = {
  version: 1
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export function getActiveConsentCategories(): ConsentCategory[] {
  return consentCategories.filter((c) => c.enabled)
}

export function createConsent(options?: {
  analytics?: boolean
  marketing?: boolean
}): ConsentState {
  return {
    version: 1,
    necessary: true,
    analytics: FEATURE_ANALYTICS && Boolean(options?.analytics),
    marketing: Boolean(options?.marketing),
    updatedAt: new Date().toISOString(),
  }
}

export function createAcceptAllConsent(): ConsentState {
  return createConsent({ analytics: true, marketing: true })
}

export function createRejectAllConsent(): ConsentState {
  return createConsent({ analytics: false, marketing: false })
}

/** @deprecated Use `createRejectAllConsent` instead. */
export function createAcceptedConsent(): ConsentState {
  return createRejectAllConsent()
}
