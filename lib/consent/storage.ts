import {
  CONSENT_STORAGE_KEY,
  type ConsentState,
  createRejectAllConsent,
} from "@/lib/consent/config"

const LEGACY_CONSENT_STORAGE_KEY = "geniuz-consent-v1"

/** Same-tab notification — `storage` only fires across tabs. */
export const CONSENT_CHANGE_EVENT = "cookie-consent-change"

/** Cached snapshot for useSyncExternalStore — must be referentially stable between reads. */
let consentSnapshotCache: {
  raw: string | null
  value: ConsentState | null
} | null = null

function invalidateConsentSnapshotCache(): void {
  consentSnapshotCache = null
}

function normalizeConsent(parsed: unknown): ConsentState | null {
  if (!parsed || typeof parsed !== "object") return null

  const record = parsed as Record<string, unknown>
  if (record.version !== 1 || record.necessary !== true) return null

  const updatedAt =
    typeof record.updatedAt === "string"
      ? record.updatedAt
      : typeof record.decidedAt === "string"
        ? record.decidedAt
        : null

  if (!updatedAt) return null

  return {
    version: 1,
    necessary: true,
    analytics: typeof record.analytics === "boolean" ? record.analytics : false,
    marketing: typeof record.marketing === "boolean" ? record.marketing : false,
    updatedAt,
  }
}

function persistConsent(state: ConsentState): void {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  window.localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY)
  invalidateConsentSnapshotCache()
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null

  try {
    const currentRaw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (currentRaw) {
      if (consentSnapshotCache?.raw === currentRaw) {
        return consentSnapshotCache.value
      }
      const current = normalizeConsent(JSON.parse(currentRaw))
      consentSnapshotCache = { raw: currentRaw, value: current }
      return current
    }

    const legacyRaw = window.localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY)
    if (!legacyRaw) {
      if (consentSnapshotCache?.raw === null) {
        return consentSnapshotCache.value
      }
      consentSnapshotCache = { raw: null, value: null }
      return null
    }

    const legacy = normalizeConsent(JSON.parse(legacyRaw))
    if (!legacy) {
      consentSnapshotCache = { raw: legacyRaw, value: null }
      return null
    }

    persistConsent(legacy)
    const migratedRaw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    consentSnapshotCache = { raw: migratedRaw, value: legacy }
    return legacy
  } catch {
    invalidateConsentSnapshotCache()
    return null
  }
}

export function writeConsent(state: ConsentState = createRejectAllConsent()): void {
  persistConsent(state)
  window.dispatchEvent(
    new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: state })
  )
}

export function hasConsentDecision(): boolean {
  return readConsent() !== null
}

export function subscribeConsent(onStoreChange: () => void): () => void {
  const handleChange = () => {
    invalidateConsentSnapshotCache()
    onStoreChange()
  }

  window.addEventListener("storage", handleChange)
  window.addEventListener(CONSENT_CHANGE_EVENT, handleChange)
  return () => {
    window.removeEventListener("storage", handleChange)
    window.removeEventListener(CONSENT_CHANGE_EVENT, handleChange)
  }
}
