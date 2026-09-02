"use client"

import Link from "next/link"

import { useCookieConsent } from "@/components/consent/cookie-consent-provider"
import { Button } from "@/components/ui/button"
import { localePath } from "@/lib/i18n/paths"
import { cn } from "@/lib/utils"

/**
 * First-visit cookie banner. Accept / reject / open preferences modal via provider.
 */
export function ConsentBanner() {
  const { hasDecided, acceptAll, rejectAll, openPreferences, locale, dict } =
    useCookieConsent()

  if (hasDecided) return null

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
      className={cn(
        "border-border bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t shadow-[0_-8px_30px_rgba(18,33,43,0.08)] backdrop-blur-md",
        "px-4 py-4 sm:px-6",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2
            id="consent-title"
            className="font-heading text-sm font-semibold text-foreground"
          >
            {dict.consent.title}
          </h2>
          <p
            id="consent-description"
            className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
          >
            {dict.consent.description}{" "}
            <Link
              href={localePath("/privacy", locale)}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {dict.consent.privacyLink}
            </Link>
            {" · "}
            <Link
              href={localePath("/cookiebeleid", locale)}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {dict.consent.cookieLink}
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="default" size="sm" onClick={acceptAll}>
            {dict.consent.acceptAll}
          </Button>
          <Button variant="outline" size="sm" onClick={rejectAll}>
            {dict.consent.rejectAll}
          </Button>
          <Button variant="outline" size="sm" onClick={openPreferences}>
            {dict.consent.manage}
          </Button>
        </div>
      </div>
    </div>
  )
}
