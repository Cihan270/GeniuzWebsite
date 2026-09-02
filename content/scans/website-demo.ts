/**
 * Website Scan — fixed demonstration payload + flow copy.
 * No Math.random(), no live crawl. UI must label results as demo.
 */

export type WebsiteScanDimensionId =
  | "seo"
  | "performance"
  | "accessibility"
  | "content"
  | "conversion"
  | "metadata"
  | "structured-data"
  | "ai-search-readiness"

export type WebsiteScanDimension = {
  id: WebsiteScanDimensionId
  label: string
  /** Fixed demo score 0–100. */
  score: number
  summary: string
}

export const websiteScanPrototypeMeta = {
  label: "Prototype / demonstratie — geen live crawl",
  resultBanner:
    "Demonstratieresultaat — vaste demodata, geen analyse van de ingevoerde URL.",
  providerNote:
    "Later: ScanProvider.analyze(input). Fase 1 gebruikt alleen MockWebsiteScanProvider + deze dataset.",
} as const

export const websiteScanFlowCopy = {
  urlLabel: "Website-URL",
  urlHelp:
    "Je kunt een URL invullen voor de flow. Het resultaat blijft een vaste demonstratiedataset.",
  urlPlaceholder: "www.voorbeeld.nl",
  submitLabel: "Toon demonstratie",
  loadingLabel: "Demonstratie laden…",
  overallLabel: "Overall score (demo)",
  dimensionsLabel: "Dimensies (vaste demodata)",
  resetLabel: "Andere URL proberen",
} as const

/** Fixed demonstratie scores — identical for every URL in the prototype. */
export const websiteScanDemoDimensions: readonly WebsiteScanDimension[] = [
  {
    id: "seo",
    label: "SEO-basis",
    score: 62,
    summary: "Demonstratie: titel/meta en interne linkstructuur deels aanwezig.",
  },
  {
    id: "performance",
    label: "Performance",
    score: 58,
    summary: "Demonstratie: ruimte voor snellere LCP en minder blocking resources.",
  },
  {
    id: "accessibility",
    label: "Toegankelijkheid",
    score: 71,
    summary: "Demonstratie: basiscontrast oké; focusstates en labels verbeterbaar.",
  },
  {
    id: "content",
    label: "Contentkwaliteit",
    score: 66,
    summary: "Demonstratie: heldere kernboodschap; dunne dienstsubpagina’s vermeden.",
  },
  {
    id: "conversion",
    label: "Conversiepad",
    score: 54,
    summary: "Demonstratie: CTA aanwezig; formulierflow nog niet geoptimaliseerd.",
  },
  {
    id: "metadata",
    label: "Metadata",
    score: 60,
    summary: "Demonstratie: OG-tags deels; canonicals consistent per NL-URL.",
  },
  {
    id: "structured-data",
    label: "Structured data",
    score: 48,
    summary: "Demonstratie: Organization/Breadcrumb voorbereid; geen Review-schema.",
  },
  {
    id: "ai-search-readiness",
    label: "AI / search-readiness",
    score: 57,
    summary: "Demonstratie: duidelijke IA helpt; geen claim op generative engine ranking.",
  },
] as const

export function getWebsiteScanDemoReport() {
  const scores = websiteScanDemoDimensions.map((d) => d.score)
  const overall = Math.round(
    scores.reduce((sum, s) => sum + s, 0) / scores.length,
  )
  return {
    isPrototype: true as const,
    overallScore: overall,
    dimensions: websiteScanDemoDimensions,
    meta: websiteScanPrototypeMeta,
  }
}
