import { getAllNavHrefs } from "@/content/navigation"
import { publishedRoutes } from "@/content/routes"
import { isReservedServiceDetailPath } from "@/content/services/details"
import { getSeoMatrix } from "@/lib/seo/matrix"

/**
 * Runtime IA guards — keep sitemap/nav/SEO aligned with Fase 1 rules.
 * Used by `npm run qa` (scripts/qa.ts); safe to call in development.
 */

const FORBIDDEN_NAV_SUBSTRINGS = ["/cases", "/en/", "/en"] as const

function pathWithoutHash(href: string): string {
  return href.split("#")[0] || "/"
}

export function assertFase1IaInvariants(): void {
  const errors: string[] = []

  for (const href of getAllNavHrefs()) {
    const path = pathWithoutHash(href)
    for (const forbidden of FORBIDDEN_NAV_SUBSTRINGS) {
      if (path === forbidden || path.startsWith(`${forbidden}/`)) {
        errors.push(`Nav contains forbidden path: ${href}`)
      }
    }
    if (isReservedServiceDetailPath(path)) {
      errors.push(`Nav links to reserved service detail: ${href}`)
    }
  }

  for (const route of publishedRoutes) {
    if (isReservedServiceDetailPath(route.path)) {
      errors.push(`Published route collides with reserved detail: ${route.path}`)
    }
    if (route.path.includes("/cases") || route.path.startsWith("/en")) {
      errors.push(`Published route must not be cases/en: ${route.path}`)
    }
  }

  for (const entry of getSeoMatrix()) {
    if (isReservedServiceDetailPath(entry.path)) {
      errors.push(`SEO matrix includes reserved detail: ${entry.path}`)
    }
    if (entry.path.includes("/cases") || entry.path.startsWith("/en")) {
      errors.push(`SEO matrix must not include cases/en: ${entry.path}`)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Fase 1 IA invariants failed:\n- ${errors.join("\n- ")}`)
  }
}
