import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"

/**
 * Robots — allow public site; disallow API and future/non-public IA.
 * Explicit disallow for /en and /cases guards accidental publication.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/en", "/en/", "/cases", "/cases/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
