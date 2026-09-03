import { NextResponse } from "next/server"

import { composeReport } from "@/lib/scans/website-provider"
import {
  FetchFailedError,
  scanWebsite,
  UnsafeUrlError,
} from "@/lib/scans/website-scanner"
import {
  normalizeWebsiteUrl,
  websiteScanApiSchema,
} from "@/lib/validations/website-scan"

export const runtime = "nodejs"
/** Fetching a third-party site is never cacheable at the edge. */
export const dynamic = "force-dynamic"

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 } as const
const CACHE_TTL_MS = 15 * 60_000

/**
 * In-memory rate limit and result cache.
 *
 * Per-instance only: on a serverless platform each cold start gets its own
 * map, so this throttles honest bursts, not a determined attacker. Move to
 * Redis/Upstash before this endpoint is promoted or linked publicly.
 */
const hits = new Map<string, number[]>()
const cache = new Map<string, { at: number; body: unknown }>()

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown"
  return request.headers.get("x-real-ip") ?? "unknown"
}

function rateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  )
  if (recent.length >= RATE_LIMIT.maxRequests) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(k)
    }
  }
  return false
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 })
  }

  const parsed = websiteScanApiSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Validatie mislukt",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    )
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Te veel scans achter elkaar. Probeer het over een minuut opnieuw." },
      { status: 429 },
    )
  }

  const url = normalizeWebsiteUrl(parsed.data.url)

  const cacheKey = url.toLowerCase()
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return NextResponse.json(cached.body)
  }

  try {
    const measurement = await scanWebsite(url)
    const payload = {
      ok: true,
      report: composeReport({
        requestedUrl: url,
        finalUrl: measurement.finalUrl,
        measured: measurement.dimensions,
        notices: measurement.notices,
      }),
    }

    cache.set(cacheKey, { at: Date.now(), body: payload })
    if (cache.size > 200) {
      const oldest = [...cache.entries()].sort((a, b) => a[1].at - b[1].at)[0]
      if (oldest) cache.delete(oldest[0])
    }

    return NextResponse.json(payload)
  } catch (error) {
    if (error instanceof UnsafeUrlError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    if (error instanceof FetchFailedError) {
      return NextResponse.json({ error: error.message }, { status: 502 })
    }
    console.error("website-scan failed", error)
    return NextResponse.json(
      { error: "De scan kon niet worden voltooid" },
      { status: 500 },
    )
  }
}
