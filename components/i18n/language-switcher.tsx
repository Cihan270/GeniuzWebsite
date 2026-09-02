"use client"

/**
 * Language switcher — built for Fase 2 EN launch, not mounted while
 * FEATURE_I18N_UI is false. Do not import into header/footer until then.
 */

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  FEATURE_I18N_UI,
  enabledLocales,
  futureLocales,
  type EnabledLocale,
  type Locale,
} from "@/lib/i18n/config"
import { localePath, stripLocalePrefix } from "@/lib/i18n/paths"
import type { Dictionary } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"

type LanguageSwitcherProps = {
  locale: EnabledLocale
  dict: Dictionary
  className?: string
}

const localeLabels: Record<Locale, keyof Dictionary["languageSwitcher"]> = {
  nl: "nl",
  en: "en",
}

export function LanguageSwitcher({
  locale,
  dict,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname()

  // Built for EN launch; header/footer must not mount this while the flag is false.
  if (!FEATURE_I18N_UI) {
    return null
  }

  const appPath = stripLocalePrefix(pathname)
  const targets = [...enabledLocales, ...futureLocales] as Locale[]

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="navigation"
      aria-label={dict.languageSwitcher.label}
    >
      {targets.map((target) => {
        const isActive = target === locale
        const href = localePath(appPath, "nl")
        const labelKey = localeLabels[target]
        const isEnabled = target === "nl" || enabledLocales.includes(target as EnabledLocale)

        if (!isEnabled) {
          return (
            <Button
              key={target}
              size="xs"
              variant="ghost"
              disabled
              aria-disabled="true"
            >
              {dict.languageSwitcher[labelKey]}
            </Button>
          )
        }

        return (
          <Button
            key={target}
            size="xs"
            variant={isActive ? "secondary" : "ghost"}
            aria-current={isActive ? "true" : undefined}
            nativeButton={false}
            render={<Link href={href} />}
          >
            {dict.languageSwitcher[labelKey]}
          </Button>
        )
      })}
    </div>
  )
}
