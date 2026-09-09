import { notFound } from "next/navigation"

/**
 * Catch-all for unmatched paths under a locale.
 *
 * Without this, Next resolves an unknown URL to the *root* `app/not-found.tsx`,
 * which renders outside `app/[locale]/layout.tsx` — so the visitor lands on a
 * 404 with no header, no navigation and no way back. Matching here and throwing
 * `notFound()` keeps the miss inside the locale segment, where
 * `app/[locale]/not-found.tsx` renders with the full chrome.
 *
 * Lowest routing priority, so it never shadows a real page.
 */
export default function LocaleCatchAll(): never {
  notFound()
}
