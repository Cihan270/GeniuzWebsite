import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import {
  defaultLocale,
  isEnabledLocale,
  isLocale,
} from "@/lib/i18n/config"
import { LOCALE_COOKIE_NAME } from "@/lib/i18n/locale-cookie"

/**
 * Locale routing — Fase 1: only `/nl` is public.
 * - No locale prefix → redirect to `/nl…`
 * - Future locale (`/en…`) → redirect to NL equivalent (do not generate EN)
 * - Enabled locale → continue; refresh locale cookie
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split("/").filter(Boolean)
  const first = segments[0]

  if (first && isEnabledLocale(first)) {
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE_NAME, first, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  // `/en/...` or other reserved future locales → NL equivalent (never serve EN).
  if (first && isLocale(first) && !isEnabledLocale(first)) {
    const rest = segments.slice(1).join("/")
    const url = request.nextUrl.clone()
    url.pathname = rest ? `/${defaultLocale}/${rest}` : `/${defaultLocale}`
    const response = NextResponse.redirect(url)
    response.cookies.set(LOCALE_COOKIE_NAME, defaultLocale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  // Missing locale prefix → always NL (no Accept-Language EN routing in Fase 1).
  const url = request.nextUrl.clone()
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  const response = NextResponse.redirect(url)
  response.cookies.set(LOCALE_COOKIE_NAME, defaultLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}

export const config = {
  matcher: [
    /*
     * Skip API, Next internals, metadata, and public assets (e.g. /logo/*.webp).
     * Without the extension exclusion, locale redirect breaks images.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
}
