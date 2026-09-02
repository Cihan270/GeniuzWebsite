"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import {
  createAcceptAllConsent,
  createConsent,
  createRejectAllConsent,
  readConsent,
  subscribeConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent"
import { CookiePreferences } from "@/components/consent/cookie-preferences"
import type { Dictionary } from "@/lib/dictionaries"
import type { EnabledLocale } from "@/lib/i18n/config"

export type CookieConsentContextValue = {
  consent: ConsentState | null
  hasDecided: boolean
  acceptAll: () => void
  rejectAll: () => void
  updateConsent: (partial: Pick<ConsentState, "analytics" | "marketing">) => void
  openPreferences: () => void
  closePreferences: () => void
  preferencesOpen: boolean
  locale: EnabledLocale
  dict: Dictionary
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
)

function getClientConsent(): ConsentState | null {
  return readConsent()
}

/** SSR snapshot — no consent on server; avoids reading localStorage. */
function getServerConsent(): ConsentState | null {
  return null
}

function getClientHasDecided(): boolean {
  return readConsent() !== null
}

/** Hide undecided state on SSR to prevent banner flash before hydration. */
function getServerHasDecided(): boolean {
  return true
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider")
  }
  return context
}

type CookieConsentProviderProps = {
  children: ReactNode
  locale: EnabledLocale
  dict: Dictionary
}

export function CookieConsentProvider({
  children,
  locale,
  dict,
}: CookieConsentProviderProps) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getClientConsent,
    getServerConsent,
  )
  const hasDecided = useSyncExternalStore(
    subscribeConsent,
    getClientHasDecided,
    getServerHasDecided,
  )
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  const acceptAll = useCallback(() => {
    writeConsent(createAcceptAllConsent())
  }, [])

  const rejectAll = useCallback(() => {
    writeConsent(createRejectAllConsent())
  }, [])

  const updateConsent = useCallback(
    (partial: Pick<ConsentState, "analytics" | "marketing">) => {
      writeConsent(createConsent(partial))
    },
    [],
  )

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true)
  }, [])

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false)
  }, [])

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasDecided,
      acceptAll,
      rejectAll,
      updateConsent,
      openPreferences,
      closePreferences,
      preferencesOpen,
      locale,
      dict,
    }),
    [
      consent,
      hasDecided,
      acceptAll,
      rejectAll,
      updateConsent,
      openPreferences,
      closePreferences,
      preferencesOpen,
      locale,
      dict,
    ],
  )

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <CookiePreferences />
    </CookieConsentContext.Provider>
  )
}
