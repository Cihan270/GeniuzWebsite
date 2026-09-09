import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/i18n/paths"
import { defaultLocale } from "@/lib/i18n/config"
import { getSiteUrl, SITE_NAME } from "@/lib/site"
import type { PageSeo } from "@/content/pages/types"
import type { PublishedRouteId } from "@/content/routes"
import { getPageContent } from "@/content/pages"
import { getPublishedRoute } from "@/content/routes"

function resolveOgImage(ogImage?: string): string | undefined {
  if (!ogImage) return undefined
  if (ogImage.startsWith("http")) return ogImage
  return `${getSiteUrl()}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
}

/**
 * Build Next.js Metadata for a published NL route.
 * Canonical = NL URL only. No hreflang in Fase 1.
 */
export function buildPageMetadata(routeId: PublishedRouteId): Metadata {
  const page = getPageContent(routeId)
  const route = getPublishedRoute(routeId)
  return buildMetadataFromSeo(page.seo, route.path)
}

export function buildMetadataFromSeo(
  seo: PageSeo,
  path: string,
): Metadata {
  const canonical = absoluteUrl(path, defaultLocale)

  return {
    // Absolute: content titles already carry the brand suffix, so the layout's
    // "%s | Geniuz" template would duplicate it.
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical,
      // No languages / hreflang until EN is professionally translated.
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "nl_NL",
      type: "website",
      ...(seo.ogImage
        ? { images: [{ url: resolveOgImage(seo.ogImage)! }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
