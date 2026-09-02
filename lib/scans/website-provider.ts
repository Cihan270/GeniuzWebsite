/**
 * Website Scan provider interface.
 * Fase 1: MockWebsiteScanProvider returns fixed demodata only — no crawl.
 */

import {
  getWebsiteScanDemoReport,
  websiteScanPrototypeMeta,
} from "@/content/scans/website-demo"

export type WebsiteScanInput = {
  /** User-entered URL for UX only — ignored by the mock provider. */
  url: string
}

export type WebsiteScanReport = ReturnType<typeof getWebsiteScanDemoReport> & {
  requestedUrl: string
  analyzedAt: string
}

export interface WebsiteScanProvider {
  readonly id: string
  analyze(input: WebsiteScanInput): Promise<WebsiteScanReport>
}

/** Always returns the fixed demonstration dataset. */
export class MockWebsiteScanProvider implements WebsiteScanProvider {
  readonly id = "mock-demo"

  async analyze(input: WebsiteScanInput): Promise<WebsiteScanReport> {
    // Brief delay so the prototype flow feels intentional, not instant/fake-live.
    await new Promise((resolve) => setTimeout(resolve, 700))
    const demo = getWebsiteScanDemoReport()
    return {
      ...demo,
      requestedUrl: input.url,
      analyzedAt: new Date().toISOString(),
      meta: websiteScanPrototypeMeta,
    }
  }
}

let defaultProvider: WebsiteScanProvider = new MockWebsiteScanProvider()

export function getWebsiteScanProvider(): WebsiteScanProvider {
  return defaultProvider
}

/** Test / future wiring hook — production Fase 1 always uses the mock. */
export function setWebsiteScanProvider(provider: WebsiteScanProvider): void {
  defaultProvider = provider
}
