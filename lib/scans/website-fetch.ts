/**
 * SSRF-hardened fetch for user-supplied URLs.
 *
 * A public endpoint that retrieves an arbitrary URL is a proxy into our own
 * network unless every hop is checked. Guards applied here:
 *
 *   1. scheme must be http/https, port must be 80/443
 *   2. hostname is DNS-resolved and every resolved address is checked against
 *      private / loopback / link-local ranges — checking the hostname string is
 *      not enough (an attacker controls their own DNS records)
 *   3. redirects are followed manually so every hop re-runs step 1–2
 *   4. hard timeout and response-size cap
 *
 * 169.254.169.254 is explicitly in scope: on most cloud hosts that endpoint
 * serves instance credentials.
 */

import { lookup } from "node:dns/promises"
import { isIP } from "node:net"

export const WEBSITE_FETCH_LIMITS = {
  /** Total budget for the whole redirect chain. */
  timeoutMs: 10_000,
  maxRedirects: 3,
  maxBytes: 2_000_000,
  userAgent:
    "GeniuzWebsiteScan/1.0 (+https://geniuz.nl/website-scan; respects robots.txt)",
} as const

export type FetchedDocument = {
  /** Final URL after redirects. */
  url: string
  status: number
  contentType: string
  body: string
  /** True when the body hit maxBytes and was cut off. */
  truncated: boolean
  /** Time to response headers on the final hop, in ms. Server-side only: this
   *  is not a browser metric and says nothing about rendering. */
  responseMs: number
  /** Bytes received for the document body. */
  bytes: number
}

export class UnsafeUrlError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnsafeUrlError"
  }
}

export class FetchFailedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "FetchFailedError"
  }
}

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".")
  if (parts.length !== 4) return null
  let out = 0
  for (const part of parts) {
    const n = Number(part)
    if (!Number.isInteger(n) || n < 0 || n > 255) return null
    out = out * 256 + n
  }
  return out
}

/** CIDR blocks that must never be reachable from a user-supplied URL. */
const BLOCKED_V4: readonly (readonly [string, number])[] = [
  ["0.0.0.0", 8], // "this network"
  ["10.0.0.0", 8], // RFC1918
  ["100.64.0.0", 10], // CGNAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link-local — includes cloud metadata
  ["172.16.0.0", 12], // RFC1918
  ["192.0.0.0", 24], // IETF protocol assignments
  ["192.0.2.0", 24], // TEST-NET-1
  ["192.88.99.0", 24], // 6to4 relay anycast
  ["192.168.0.0", 16], // RFC1918
  ["198.18.0.0", 15], // benchmarking
  ["198.51.100.0", 24], // TEST-NET-2
  ["203.0.113.0", 24], // TEST-NET-3
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved + broadcast
]

function isBlockedIpv4(ip: string): boolean {
  const value = ipv4ToInt(ip)
  if (value === null) return true
  return BLOCKED_V4.some(([base, bits]) => {
    const baseValue = ipv4ToInt(base)
    if (baseValue === null) return false
    const mask = bits === 0 ? 0 : (-1 << (32 - bits)) >>> 0
    return (value & mask) >>> 0 === (baseValue & mask) >>> 0
  })
}

function isBlockedIpv6(ip: string): boolean {
  const value = ip.toLowerCase().split("%")[0] ?? ""

  // IPv4-mapped (::ffff:192.168.0.1) and IPv4-compatible forms must be
  // unwrapped, otherwise a private v4 address slips through as "v6".
  const mapped = value.match(/^::(?:ffff:)?(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped?.[1]) return isBlockedIpv4(mapped[1])

  if (value === "::" || value === "::1") return true
  if (/^f[cd][0-9a-f]{2}:/.test(value)) return true // fc00::/7 unique local
  if (/^fe[89ab][0-9a-f]:/.test(value)) return true // fe80::/10 link-local
  if (value.startsWith("ff")) return true // multicast
  return false
}

function isBlockedAddress(ip: string): boolean {
  const family = isIP(ip)
  if (family === 4) return isBlockedIpv4(ip)
  if (family === 6) return isBlockedIpv6(ip)
  return true
}

/**
 * Validates scheme/port and resolves the hostname, rejecting when any resolved
 * address is non-public. Returns the resolved addresses for logging/debugging.
 */
export async function assertPublicUrl(rawUrl: string): Promise<URL> {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new UnsafeUrlError("Ongeldige URL")
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new UnsafeUrlError("Alleen http- en https-URL's worden gescand")
  }

  if (parsed.port !== "" && parsed.port !== "80" && parsed.port !== "443") {
    throw new UnsafeUrlError("Alleen poort 80 en 443 worden gescand")
  }

  const hostname = parsed.hostname.replace(/^\[|\]$/g, "")

  // A literal IP in the URL skips DNS entirely — check it directly.
  if (isIP(hostname)) {
    if (isBlockedAddress(hostname)) {
      throw new UnsafeUrlError("Dit adres valt buiten het publieke internet")
    }
    return parsed
  }

  let addresses: { address: string }[]
  try {
    addresses = await lookup(hostname, { all: true })
  } catch {
    throw new FetchFailedError("Domeinnaam kon niet worden opgezocht")
  }

  if (addresses.length === 0) {
    throw new FetchFailedError("Domeinnaam leverde geen adres op")
  }

  for (const { address } of addresses) {
    if (isBlockedAddress(address)) {
      throw new UnsafeUrlError("Dit adres valt buiten het publieke internet")
    }
  }

  return parsed
}

async function readCapped(
  response: Response,
  maxBytes: number,
): Promise<{ body: string; truncated: boolean }> {
  if (!response.body) return { body: "", truncated: false }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  let truncated = false

  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue
      total += value.byteLength
      if (total > maxBytes) {
        chunks.push(value.slice(0, value.byteLength - (total - maxBytes)))
        truncated = true
        break
      }
      chunks.push(value)
    }
  } finally {
    await reader.cancel().catch(() => {})
  }

  const merged = new Uint8Array(chunks.reduce((n, c) => n + c.byteLength, 0))
  let offset = 0
  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.byteLength
  }

  return { body: new TextDecoder("utf-8").decode(merged), truncated }
}

/**
 * Fetches a public URL, re-validating every redirect hop.
 * Throws UnsafeUrlError / FetchFailedError — both are safe to surface.
 */
export async function fetchPublicUrl(
  rawUrl: string,
  init: { accept?: string; timeoutMs?: number } = {},
): Promise<FetchedDocument> {
  const timeoutMs = init.timeoutMs ?? WEBSITE_FETCH_LIMITS.timeoutMs
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    let current = rawUrl

    for (let hop = 0; hop <= WEBSITE_FETCH_LIMITS.maxRedirects; hop += 1) {
      const safeUrl = await assertPublicUrl(current)

      let response: Response
      const startedAt = Date.now()
      try {
        response = await fetch(safeUrl, {
          method: "GET",
          redirect: "manual",
          signal: controller.signal,
          headers: {
            "user-agent": WEBSITE_FETCH_LIMITS.userAgent,
            accept: init.accept ?? "text/html,application/xhtml+xml",
            "accept-language": "nl,en;q=0.8",
          },
        })
      } catch (error) {
        if (controller.signal.aborted) {
          throw new FetchFailedError("De website reageerde niet binnen 10 seconden")
        }
        throw new FetchFailedError(
          error instanceof Error && error.message
            ? `Website niet bereikbaar (${error.message})`
            : "Website niet bereikbaar",
        )
      }

      const location = response.headers.get("location")
      if (response.status >= 300 && response.status < 400 && location) {
        if (hop === WEBSITE_FETCH_LIMITS.maxRedirects) {
          throw new FetchFailedError("Te veel doorverwijzingen")
        }
        current = new URL(location, safeUrl).toString()
        continue
      }

      const responseMs = Date.now() - startedAt

      const { body, truncated } = await readCapped(
        response,
        WEBSITE_FETCH_LIMITS.maxBytes,
      )

      return {
        url: safeUrl.toString(),
        status: response.status,
        contentType: response.headers.get("content-type") ?? "",
        body,
        truncated,
        responseMs,
        bytes: new TextEncoder().encode(body).byteLength,
      }
    }

    throw new FetchFailedError("Te veel doorverwijzingen")
  } finally {
    clearTimeout(timer)
  }
}
