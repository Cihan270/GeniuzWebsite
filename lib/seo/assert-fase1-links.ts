import { getNavigation } from "@/content/navigation"
import {
  getPublishedInsightPaths,
  getPublishedInsights,
} from "@/content/insights"
import {
  aiConsultancyPage,
  aiDevelopmentPage,
  aiOpportunityScanPage,
  aiTrainingPage,
  homePage,
  overOnsPage,
  sectorFinancePage,
  sectorJuridischPage,
  sectorKennisPage,
  sectorenHubPage,
  websiteScanPage,
} from "@/content/pages"
import { publishedRoutes } from "@/content/routes"
import { isReservedServiceDetailPath } from "@/content/services/details"
import {
  opportunityNextStepCopy,
  opportunityOutcomeCopy,
} from "@/content/scans/opportunity"

/**
 * Link + content QA guards for Fase 1.
 * Ensures public hrefs resolve to published routes / known hub anchors.
 */

const MAX_PUBLISHED_INSIGHTS = 12

function pathWithoutHash(href: string): string {
  return href.split("#")[0] || "/"
}

function hashOf(href: string): string | undefined {
  const i = href.indexOf("#")
  if (i < 0) return undefined
  return href.slice(i + 1) || undefined
}

function collectNavHrefs(): string[] {
  const nav = getNavigation("nl")
  const hrefs: string[] = [nav.headerCta.href]

  for (const item of nav.primary) {
    if (item.type === "link") {
      hrefs.push(item.href)
    } else {
      for (const child of item.items) {
        hrefs.push(child.href)
      }
    }
  }

  for (const group of Object.values(nav.footer)) {
    for (const link of group) {
      hrefs.push(link.href)
    }
  }

  return hrefs
}

function collectContentHrefs(): string[] {
  const hrefs: string[] = []

  hrefs.push(
    homePage.hero.primaryCta.href,
    homePage.hero.secondaryCta.href,
    homePage.consultancy.href,
    homePage.development.href,
    homePage.sectors.href,
    homePage.opportunityScan.cta.href,
    homePage.about.href,
    homePage.insights.href,
    homePage.finalCta.cta.href,
  )
  for (const item of homePage.pillars.items) hrefs.push(item.href)
  for (const s of homePage.development.solutions) hrefs.push(s.href)
  for (const s of homePage.sectors.items) hrefs.push(s.href)

  for (const hub of [aiConsultancyPage, aiDevelopmentPage, aiTrainingPage]) {
    hrefs.push(hub.primaryCta.href)
    if (hub.secondaryCta) hrefs.push(hub.secondaryCta.href)
    hrefs.push(hub.finalCta.cta.href)
    for (const o of hub.offerings) {
      if (o.href) hrefs.push(o.href)
    }
    for (const r of hub.related.items) hrefs.push(r.href)
  }

  hrefs.push(sectorenHubPage.finalCta.cta.href)
  for (const s of sectorenHubPage.sectors) hrefs.push(s.href)

  for (const sector of [
    sectorJuridischPage,
    sectorFinancePage,
    sectorKennisPage,
  ]) {
    hrefs.push(sector.finalCta.cta.href)
    for (const r of sector.relatedServices.items) hrefs.push(r.href)
  }

  for (const scan of [aiOpportunityScanPage, websiteScanPage]) {
    hrefs.push(scan.finalCta.cta.href)
  }

  hrefs.push(overOnsPage.finalCta.cta.href)

  for (const step of Object.values(opportunityNextStepCopy)) {
    hrefs.push(step.href)
  }

  return hrefs
}

function allowedPaths(): Set<string> {
  const paths = new Set<string>(publishedRoutes.map((r) => r.path))
  for (const p of getPublishedInsightPaths()) {
    paths.add(p)
  }
  return paths
}

function knownDevelopmentAnchors(): Set<string> {
  const anchors = new Set<string>()
  for (const o of aiDevelopmentPage.offerings) {
    if (o.anchorId) anchors.add(o.anchorId)
  }
  for (const s of aiDevelopmentPage.sections) {
    anchors.add(s.id)
  }
  anchors.add("aanbod")
  anchors.add("werkwijze")
  anchors.add("gerelateerd")
  anchors.add("faq")
  return anchors
}

/** Assert all public nav + content links resolve; no reserved/en/cases paths. */
export function assertFase1PublicLinks(): void {
  const errors: string[] = []
  const allowed = allowedPaths()
  const devAnchors = knownDevelopmentAnchors()
  const hrefs = new Set([...collectNavHrefs(), ...collectContentHrefs()])

  for (const href of hrefs) {
    const path = pathWithoutHash(href)
    const hash = hashOf(href)

    if (path.includes("/cases") || path === "/en" || path.startsWith("/en/")) {
      errors.push(`Public href points to forbidden path: ${href}`)
      continue
    }

    if (isReservedServiceDetailPath(path)) {
      errors.push(`Public href points to reserved service detail: ${href}`)
      continue
    }

    if (!allowed.has(path)) {
      errors.push(`Public href has no published route: ${href}`)
      continue
    }

    if (hash && path === "/ai-development" && !devAnchors.has(hash)) {
      errors.push(`Unknown AI Development anchor: #${hash} (from ${href})`)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Fase 1 public links failed:\n- ${errors.join("\n- ")}`)
  }
}

/** Insights cap + opportunity / prototype content guards. */
export function assertFase1ContentGuards(): void {
  const errors: string[] = []
  const published = getPublishedInsights()

  if (published.length > MAX_PUBLISHED_INSIGHTS) {
    errors.push(
      `Too many published insights: ${published.length} (max ${MAX_PUBLISHED_INSIGHTS})`,
    )
  }

  if (
    opportunityOutcomeCopy.timeValueLabel !==
    "Indicatieve potentiële tijdswaarde"
  ) {
    errors.push(
      `Opportunity time-value label drifted: "${opportunityOutcomeCopy.timeValueLabel}"`,
    )
  }

  if (!/indicatief/i.test(opportunityOutcomeCopy.scoreLabel)) {
    errors.push(
      `Opportunity score label must stay indicative: "${opportunityOutcomeCopy.scoreLabel}"`,
    )
  }

  for (const term of opportunityOutcomeCopy.forbiddenTerms) {
    const lines = [
      opportunityOutcomeCopy.scoreLabel,
      opportunityOutcomeCopy.timeValueLabel,
      opportunityOutcomeCopy.timeValueNote,
      opportunityOutcomeCopy.weeklyHoursLabel,
      opportunityOutcomeCopy.categoriesLabel,
      opportunityOutcomeCopy.nextStepLabel,
      opportunityOutcomeCopy.softGateHeading,
      opportunityOutcomeCopy.softGateBody,
      opportunityOutcomeCopy.softGateSubmit,
      opportunityOutcomeCopy.softGateSuccess,
    ]
    for (const line of lines) {
      if (!line.toLowerCase().includes(term.toLowerCase())) continue
      if (/\b(geen|niet)\b/i.test(line)) continue
      errors.push(
        `Opportunity outcome copy contains forbidden term "${term}" without negation: ${line}`,
      )
    }
  }

  if (!websiteScanPage.prototypeLabel) {
    errors.push("Website Scan page missing prototypeLabel")
  } else if (!/prototype/i.test(websiteScanPage.prototypeLabel)) {
    errors.push(
      `Website Scan prototypeLabel must mention prototype: "${websiteScanPage.prototypeLabel}"`,
    )
  }

  if (errors.length > 0) {
    throw new Error(`Fase 1 content guards failed:\n- ${errors.join("\n- ")}`)
  }
}
