import {
  defaultLocale,
  type EnabledLocale,
  isLocale,
} from "@/lib/i18n/config"
import { getSiteUrl } from "@/lib/site"

/**
 * Build a locale-prefixed pathname. Paths are relative without leading locale
 * (e.g. `/ai-consultancy` or `ai-consultancy`). Home is `/` or ``.
 */
export function localePath(
  path: string = "/",
  locale: EnabledLocale = defaultLocale,
): string {
  const normalized = normalizeAppPath(path)
  if (normalized === "/") {
    return `/${locale}`
  }
  return `/${locale}${normalized}`
}

/** Absolute URL for a published locale path (canonical / sitemap). */
export function absoluteUrl(
  path: string = "/",
  locale: EnabledLocale = defaultLocale,
): string {
  return `${getSiteUrl()}${localePath(path, locale)}`
}

/**
 * Strip a leading locale segment if present (enabled or future).
 * Returns app path starting with `/`.
 */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length === 0) return "/"
  if (isLocale(parts[0])) {
    const rest = parts.slice(1).join("/")
    return rest ? `/${rest}` : "/"
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`
}

function normalizeAppPath(path: string): string {
  if (!path || path === "/") return "/"
  const withSlash = path.startsWith("/") ? path : `/${path}`
  return withSlash.replace(/\/+$/, "") || "/"
}
