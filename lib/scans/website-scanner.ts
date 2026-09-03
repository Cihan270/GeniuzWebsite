/**
 * Website Scan orchestration (server-only).
 *
 * Fetches the page plus robots.txt and llms.txt, then runs the pure scorers
 * from website-analysis. Side files are best-effort: a missing robots.txt is a
 * finding, not an error.
 */

import "server-only"

import {
  buildMeasuredDimensions,
  extractHtmlFacts,
  parseRobotsTxt,
  ROBOTS_NOT_FOUND,
  type MeasuredDimension,
  type RobotsFacts,
} from "@/lib/scans/website-analysis"
import {
  fetchPublicUrl,
  FetchFailedError,
  UnsafeUrlError,
} from "@/lib/scans/website-fetch"

export type ScanMeasurement = {
  finalUrl: string
  dimensions: readonly MeasuredDimension[]
  notices: readonly string[]
}

export { FetchFailedError, UnsafeUrlError }

async function fetchSideFile(
  origin: string,
  path: string,
): Promise<string | null> {
  try {
    const result = await fetchPublicUrl(`${origin}${path}`, {
      accept: "text/plain,*/*",
      timeoutMs: 5_000,
    })
    if (result.status !== 200) return null
    // Sites that serve an HTML 404 page with status 200 would otherwise be
    // read as a valid robots.txt.
    if (/<html|<!doctype/i.test(result.body.slice(0, 200))) return null
    return result.body
  } catch {
    return null
  }
}

export async function scanWebsite(url: string): Promise<ScanMeasurement> {
  const page = await fetchPublicUrl(url)

  if (page.status >= 400) {
    throw new FetchFailedError(
      `De website gaf statuscode ${page.status} terug`,
    )
  }
  if (page.contentType && !/html|xml/i.test(page.contentType)) {
    throw new FetchFailedError(
      `Deze URL levert geen HTML op (${page.contentType.split(";")[0]})`,
    )
  }

  const notices: string[] = []
  if (page.truncated) {
    notices.push(
      "De pagina is groter dan 2 MB en is gedeeltelijk geanalyseerd.",
    )
  }
  if (page.url !== url) {
    notices.push(`Doorverwezen naar ${page.url}`)
  }

  const origin = new URL(page.url).origin
  const [robotsText, llmsText] = await Promise.all([
    fetchSideFile(origin, "/robots.txt"),
    fetchSideFile(origin, "/llms.txt"),
  ])

  const robots: RobotsFacts = robotsText
    ? parseRobotsTxt(robotsText)
    : ROBOTS_NOT_FOUND

  const facts = extractHtmlFacts(page.body, page.url)

  // Only warn about JS rendering when the markup-to-text ratio actually points
  // that way — a small static page is thin content, not a rendering problem.
  const textRatio =
    facts.htmlLength === 0 ? 0 : facts.textLength / facts.htmlLength
  if (facts.textLength < 1200 && textRatio < 0.05) {
    notices.push(
      "Deze pagina bevat veel markup en weinig tekst. Als de content via JavaScript wordt geladen, meet deze scan alleen wat er in de broncode staat.",
    )
  }

  return {
    finalUrl: page.url,
    dimensions: buildMeasuredDimensions({
      facts,
      robots,
      llmsTxtFound: llmsText !== null,
      timing: { responseMs: page.responseMs, bytes: page.bytes },
    }),
    notices,
  }
}
