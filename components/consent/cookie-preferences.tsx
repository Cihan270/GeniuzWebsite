"use client"

import { useState } from "react"

import { useCookieConsent } from "@/components/consent/cookie-consent-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FEATURE_ANALYTICS, FEATURE_MARKETING } from "@/lib/consent"
import { cn } from "@/lib/utils"

export function CookiePreferences() {
  const {
    consent,
    preferencesOpen,
    closePreferences,
    updateConsent,
    dict,
  } = useCookieConsent()

  const [analyticsOptIn, setAnalyticsOptIn] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [syncedOpen, setSyncedOpen] = useState(false)

  // Seed the toggles from stored consent on the closed → open transition.
  // Adjusting state during render (instead of in an effect) avoids the extra
  // commit, and keeps the user's in-dialog toggles from being overwritten if
  // consent changes while the dialog is open.
  if (preferencesOpen !== syncedOpen) {
    setSyncedOpen(preferencesOpen)
    if (preferencesOpen) {
      setAnalyticsOptIn(consent?.analytics ?? false)
      setMarketingOptIn(consent?.marketing ?? false)
    }
  }

  function handleSave() {
    updateConsent({ analytics: analyticsOptIn, marketing: marketingOptIn })
    closePreferences()
  }

  return (
    <Dialog
      open={preferencesOpen}
      onOpenChange={(open) => {
        if (!open) closePreferences()
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.consent.preferencesTitle}</DialogTitle>
        </DialogHeader>

        <ul className="space-y-2">
          <li
            className={cn(
              "rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm",
            )}
          >
            <label className="flex gap-3">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-[var(--geniuz-ink)]"
                checked
                disabled
                readOnly
                aria-label={dict.consent.necessaryLabel}
              />
              <span>
                <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="font-medium text-foreground">
                    {dict.consent.necessaryLabel}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {dict.consent.alwaysActive}
                  </span>
                </span>
                <span className="mt-0.5 block text-muted-foreground">
                  {dict.consent.necessaryDescription}
                </span>
              </span>
            </label>
          </li>

          {FEATURE_ANALYTICS ? (
            <li
              className={cn(
                "rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm",
              )}
            >
              <label className="flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-[var(--geniuz-ink)]"
                  checked={analyticsOptIn}
                  onChange={(event) => setAnalyticsOptIn(event.target.checked)}
                />
                <span>
                  <span className="block font-medium text-foreground">
                    {dict.consent.analyticsLabel}
                  </span>
                  <span className="mt-0.5 block text-muted-foreground">
                    {dict.consent.analyticsDescription}
                  </span>
                </span>
              </label>
            </li>
          ) : null}

          {FEATURE_MARKETING ? (
            <li
              className={cn(
                "rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm",
              )}
            >
              <label className="flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-[var(--geniuz-ink)]"
                  checked={marketingOptIn}
                  onChange={(event) => setMarketingOptIn(event.target.checked)}
                />
                <span>
                  <span className="block font-medium text-foreground">
                    {dict.consent.marketingLabel}
                  </span>
                  <span className="mt-0.5 block text-muted-foreground">
                    {dict.consent.marketingDescription}
                  </span>
                </span>
              </label>
            </li>
          ) : null}
        </ul>

        <DialogFooter className="mt-2 border-t-0 bg-transparent p-0 sm:justify-end">
          <Button variant="default" size="sm" onClick={handleSave}>
            {dict.consent.savePreferences}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
