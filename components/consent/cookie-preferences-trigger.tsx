"use client"

import { useCookieConsent } from "@/components/consent/cookie-consent-provider"

export function CookiePreferencesTrigger() {
  const { openPreferences, dict } = useCookieConsent()

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-xs text-white/55 transition-colors hover:text-white"
    >
      {dict.consent.footerLink}
    </button>
  )
}
