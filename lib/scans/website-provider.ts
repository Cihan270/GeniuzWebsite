/**
 * Website Scan provider interface.
 *
 * Fase 2b: alle acht dimensies worden gemeten op de opgegeven URL
 * (HttpWebsiteScanProvider → /api/website-scan). De DemoDimension-vorm blijft
 * bestaan zodat een dimensie zonder meetbron opnieuw als demodata getoond kan
 * worden zonder de overall score te vervuilen — die telt alleen "measured".
 *
 * MockWebsiteScanProvider blijft bestaan voor tests en offline demo's.
 */

import {
  websiteScanDemoDimensions,
  websiteScanPrototypeMeta,
} from "@/content/scans/website-demo"
import type {
  MeasuredDimension,
  WebsiteScanCheck,
} from "@/lib/scans/website-analysis"
import type { WebsiteScanDimensionId } from "@/content/scans/website-demo"

/** Dimensions the scanner measures for real. All eight as of Fase 2b. */
export const WEBSITE_SCAN_MEASURED_IDS = [
  "seo",
  "performance",
  "accessibility",
  "content",
  "conversion",
  "metadata",
  "structured-data",
  "ai-search-readiness",
] as const satisfies readonly WebsiteScanDimensionId[]

export type DemoDimension = {
  id: WebsiteScanDimensionId
  label: string
  score: number
  summary: string
  source: "demo"
}

export type ReportDimension = MeasuredDimension | DemoDimension

export type WebsiteScanInput = {
  url: string
}

export type WebsiteScanReport = {
  requestedUrl: string
  /** Final URL after redirects — null when nothing was fetched. */
  finalUrl: string | null
  analyzedAt: string
  /** Average over measured dimensions only. Null when none were measured. */
  overallScore: number | null
  measuredCount: number
  demoCount: number
  dimensions: readonly ReportDimension[]
  notices: readonly string[]
  meta: typeof websiteScanPrototypeMeta
}

export interface WebsiteScanProvider {
  readonly id: string
  analyze(input: WebsiteScanInput): Promise<WebsiteScanReport>
}

export type { MeasuredDimension, WebsiteScanCheck }

/** Demo dimensions that have no measurement source yet. */
export function remainingDemoDimensions(): DemoDimension[] {
  const measured = new Set<string>(WEBSITE_SCAN_MEASURED_IDS)
  return websiteScanDemoDimensions
    .filter((dim) => !measured.has(dim.id))
    .map((dim) => ({
      id: dim.id,
      label: dim.label,
      score: dim.score,
      summary: dim.summary,
      source: "demo" as const,
    }))
}

export function overallFromMeasured(
  dimensions: readonly ReportDimension[],
): number | null {
  const measured = dimensions.filter((d) => d.source === "measured")
  if (measured.length === 0) return null
  const sum = measured.reduce((acc, d) => acc + d.score, 0)
  return Math.round(sum / measured.length)
}

export function composeReport(input: {
  requestedUrl: string
  finalUrl: string | null
  measured: readonly MeasuredDimension[]
  notices?: readonly string[]
}): WebsiteScanReport {
  const dimensions: ReportDimension[] = [
    ...input.measured,
    ...remainingDemoDimensions(),
  ]
  return {
    requestedUrl: input.requestedUrl,
    finalUrl: input.finalUrl,
    analyzedAt: new Date().toISOString(),
    overallScore: overallFromMeasured(dimensions),
    measuredCount: input.measured.length,
    demoCount: dimensions.length - input.measured.length,
    dimensions,
    notices: input.notices ?? [],
    meta: websiteScanPrototypeMeta,
  }
}

/** Calls the server route, which does the actual fetching and scoring. */
export class HttpWebsiteScanProvider implements WebsiteScanProvider {
  readonly id = "http-scan"

  async analyze(input: WebsiteScanInput): Promise<WebsiteScanReport> {
    const response = await fetch("/api/website-scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: input.url }),
    })

    const payload: unknown = await response.json().catch(() => null)

    if (!response.ok) {
      const message =
        payload &&
        typeof payload === "object" &&
        typeof (payload as { error?: unknown }).error === "string"
          ? (payload as { error: string }).error
          : "De scan kon niet worden uitgevoerd"
      throw new Error(message)
    }

    return (payload as { report: WebsiteScanReport }).report
  }
}

/** Fixed demonstration dataset — no network. Used by tests and offline demo. */
export class MockWebsiteScanProvider implements WebsiteScanProvider {
  readonly id = "mock-demo"

  async analyze(input: WebsiteScanInput): Promise<WebsiteScanReport> {
    await new Promise((resolve) => setTimeout(resolve, 700))
    const dimensions: ReportDimension[] = websiteScanDemoDimensions.map(
      (dim) => ({
        id: dim.id,
        label: dim.label,
        score: dim.score,
        summary: dim.summary,
        source: "demo" as const,
      }),
    )
    return {
      requestedUrl: input.url,
      finalUrl: null,
      analyzedAt: new Date().toISOString(),
      overallScore: null,
      measuredCount: 0,
      demoCount: dimensions.length,
      dimensions,
      notices: [],
      meta: websiteScanPrototypeMeta,
    }
  }
}

let defaultProvider: WebsiteScanProvider = new HttpWebsiteScanProvider()

export function getWebsiteScanProvider(): WebsiteScanProvider {
  return defaultProvider
}

/** Test / wiring hook. */
export function setWebsiteScanProvider(provider: WebsiteScanProvider): void {
  defaultProvider = provider
}
