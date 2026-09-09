import {
  algemeneVoorwaardenPage,
  cookiebeleidPage,
  privacyPage,
} from "@/content/pages"
import type { LegalPageContent } from "@/content/pages/types"
import { missingLegalIdentityFields } from "@/lib/site"

/**
 * Guards for the legal pages.
 *
 * A page marked `published` presents itself to visitors as a real legal
 * document, so it may not ship while the statutory identification
 * (art. 3:15d BW) is still blank. Draft pages must keep their concept banner.
 */

const legalPages: readonly LegalPageContent[] = [
  privacyPage,
  cookiebeleidPage,
  algemeneVoorwaardenPage,
]

export function assertLegalPages(): void {
  const errors: string[] = []
  const published = legalPages.filter((p) => p.legalStatus === "published")

  if (published.length > 0) {
    const missing = missingLegalIdentityFields()
    if (missing.length > 0) {
      errors.push(
        `LEGAL_IDENTITY in lib/site.ts is incomplete (${missing.join(", ")}), ` +
          `but these pages are published: ${published
            .map((p) => p.path)
            .join(", ")}. Fill them in or set legalStatus back to "draft_legal_review".`,
      )
    }
  }

  for (const page of legalPages) {
    if (page.legalStatus === "draft_legal_review") {
      if (!page.conceptBanner) {
        errors.push(`${page.path}: draft legal page must carry a conceptBanner`)
      }
      continue
    }

    if (!page.lastUpdated) {
      errors.push(`${page.path}: published legal page must set lastUpdated`)
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(page.lastUpdated)) {
      errors.push(
        `${page.path}: lastUpdated must be an ISO date (got "${page.lastUpdated}")`,
      )
    }

    if (page.conceptBanner) {
      errors.push(
        `${page.path}: published legal page must not keep a conceptBanner`,
      )
    }

    if (page.seo.noIndex) {
      errors.push(
        `${page.path}: published legal page should be indexable — visitors and ` +
          `search engines expect to find it`,
      )
    }
  }

  if (!privacyPage.showIdentity) {
    errors.push(
      `${privacyPage.path}: the privacy statement must name the controller ` +
        `(set showIdentity)`,
    )
  }

  if (errors.length > 0) {
    throw new Error(`Legal page guards failed:\n- ${errors.join("\n- ")}`)
  }
}
