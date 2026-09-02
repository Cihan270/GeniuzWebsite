/**
 * Locale configuration — Fase 1: NL only.
 * EN remains architecturally reserved (`futureLocales`) until professional translations exist.
 */

export const defaultLocale = "nl" as const

/** Locales that may be served / indexed in Fase 1. */
export const enabledLocales = ["nl"] as const

/** Reserved for later contentfase — never emit in sitemap/nav/hreflang until enabled. */
export const futureLocales = ["en"] as const

export type EnabledLocale = (typeof enabledLocales)[number]
export type FutureLocale = (typeof futureLocales)[number]
export type Locale = EnabledLocale | FutureLocale

export const FEATURE_I18N_UI = false

export function isEnabledLocale(value: string): value is EnabledLocale {
  return (enabledLocales as readonly string[]).includes(value)
}

export function isLocale(value: string): value is Locale {
  return (
    (enabledLocales as readonly string[]).includes(value) ||
    (futureLocales as readonly string[]).includes(value)
  )
}
