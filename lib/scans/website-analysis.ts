/**
 * Website Scan — measured dimensions (Fase 2b: all eight).
 *
 * Pure functions: extraction takes HTML text, scoring takes extracted facts.
 * No fetching here, so every rubric below is unit-testable without network.
 *
 * SCOPE AND ITS LIMITS. Everything is derived from the HTML as delivered, plus
 * robots.txt, llms.txt and the server response time. That makes every score
 * reproducible and free of external dependencies, but it also fixes the
 * ceiling:
 *
 *   - "Performance" measures structural signals (blocking scripts, document
 *     weight, server response, layout-shift risk). It is NOT a Lighthouse
 *     score and carries no field data about real users. Wire in the PageSpeed
 *     Insights API to replace scorePerformance when that is wanted.
 *   - "Toegankelijkheid" covers machine-checkable markup only. Colour
 *     contrast, focus order and keyboard traps need a rendered page — roughly
 *     the third of WCAG that automated tooling can reach at all.
 *   - "Contentkwaliteit" and "Conversiepad" measure structural proxies
 *     (volume, sentence length, contact routes, action elements), not
 *     editorial or persuasive quality. An LLM pass could judge those; it was
 *     deliberately left out because the same page must score the same twice.
 *
 * SCORING RUBRIEK — each dimension sums to 100. A score is only meaningful if
 * it is reproducible, so every point is tied to a named check and reported
 * back in `checks`.
 *
 *   SEO-basis (100)
 *     title aanwezig 10 · titellengte 30–60 tekens 5 · meta description 10 ·
 *     lengte 70–160 tekens 5 · precies één h1 15 · h2-structuur 10 ·
 *     canonical 10 · robots.txt bereikbaar en niet volledig blokkerend 10 ·
 *     sitemap gevonden 10 · ≥5 interne links 10 · alt-tekst op afbeeldingen 5
 *
 *   Metadata (100)
 *     og:title 15 · og:description 15 · og:image 20 · og:type+og:url 10 ·
 *     twitter:card 15 · html lang 15 · favicon 10
 *
 *   Structured data (100)
 *     JSON-LD aanwezig 30 · parseert zonder fout 20 · @context schema.org 10 ·
 *     Organization/LocalBusiness 15 · WebSite/WebPage 10 · BreadcrumbList 10 ·
 *     aanvullende types 5
 *
 *   AI / search-readiness (100)
 *     AI-crawlers niet geblokkeerd 25 · content leesbaar zonder JS 25 ·
 *     semantische landmarks 15 · JSON-LD voor entiteitsherkenning 15 ·
 *     koppenhiërarchie 10 · llms.txt 10
 *
 *   Performance — structurele signalen (100)
 *     geen render-blokkerende scripts 25 · documentgewicht 20 ·
 *     serverresponstijd 20 · afmetingen op afbeeldingen 15 ·
 *     lazy loading 10 · viewport-meta 10
 *
 *   Toegankelijkheid — machinecontroleerbaar (100)
 *     lang-attribuut 15 · alt-teksten 20 · labels op formuliervelden 20 ·
 *     koppenvolgorde zonder sprongen 15 · beschrijvende linkteksten 15 ·
 *     skip-link of main-landmark 15
 *
 *   Contentkwaliteit — structurele proxies (100)
 *     tekstvolume 25 · zinslengte 20 · alineastructuur 15 ·
 *     koppendichtheid 15 · opsommingen 10 · alinealengte 15
 *
 *   Conversiepad — structurele proxies (100)
 *     contactmogelijkheid 25 · formulierlengte 20 · actiegerichte elementen 20 ·
 *     direct klikbaar contact 15 · focus in de actie 10 · formulierlabels 10
 *
 * Deliberately NOT claimed: positions in search or generative engines. These
 * are structural readiness checks, not a ranking prediction.
 */

import type { WebsiteScanDimensionId } from "@/content/scans/website-demo"

export type WebsiteScanCheck = {
  id: string
  label: string
  points: number
  maxPoints: number
  detail: string
}

export type MeasuredDimension = {
  id: WebsiteScanDimensionId
  label: string
  score: number
  summary: string
  source: "measured"
  checks: readonly WebsiteScanCheck[]
}

export type HtmlFacts = {
  title: string | null
  metaDescription: string | null
  canonical: string | null
  lang: string | null
  favicon: string | null
  og: Record<string, string>
  twitter: Record<string, string>
  h1Count: number
  h2Count: number
  headingLevels: readonly number[]
  internalLinks: number
  externalLinks: number
  images: number
  /** Images carrying a non-empty alt attribute. */
  imagesWithAlt: number
  /** Images with alt="" — the correct marking for decorative images. */
  imagesWithEmptyAlt: number
  /** Images with no alt attribute at all — always a defect. */
  imagesWithoutAlt: number
  jsonLdBlocks: readonly string[]
  landmarks: readonly string[]
  textLength: number
  htmlLength: number

  // Performance signals
  hasViewportMeta: boolean
  /** <script src> in <head> without async/defer — blocks first render. */
  blockingScripts: number
  stylesheets: number
  imagesWithDimensions: number
  lazyImages: number

  // Accessibility signals
  formInputs: number
  labelledInputs: number
  /** True when heading levels never skip a step (h1 → h3). */
  headingOrderOk: boolean
  totalTextLinks: number
  /** Links whose only text is "klik hier", "lees meer", "hier", … */
  genericLinks: number
  hasSkipLink: boolean

  // Content signals
  words: number
  sentences: number
  paragraphs: number
  lists: number

  // Conversion signals
  forms: number
  ctaElements: number
  telLinks: number
  mailtoLinks: number
}

export type RobotsFacts = {
  found: boolean
  /** User-agent tokens that are given a blanket Disallow: /. */
  blockedAgents: readonly string[]
  sitemaps: readonly string[]
}

/** AI/answer-engine crawlers we report on. */
export const AI_CRAWLER_AGENTS = [
  "gptbot",
  "oai-searchbot",
  "chatgpt-user",
  "claudebot",
  "anthropic-ai",
  "perplexitybot",
  "google-extended",
  "bingbot",
  "ccbot",
] as const

// ---------------------------------------------------------------------------
// Extraction
//
// Targeted regex rather than a DOM parser: everything read here lives in <head>
// or is a countable tag, where regex is adequate. Known limitation — malformed
// or heavily nested markup can skew counts. If body-structure checks are added
// later, swap this module for a real parser; the scoring functions take facts,
// not HTML, so they stay untouched.
// ---------------------------------------------------------------------------

function decodeEntities(value: string): string {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .trim()
}

function attr(tag: string, name: string): string | null {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"),
  )
  if (!match) return null
  const raw = match[2] ?? match[3] ?? match[4] ?? ""
  return decodeEntities(raw)
}

function stripNonContent(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
}

export function extractHtmlFacts(html: string, baseUrl: string): HtmlFacts {
  const og: Record<string, string> = {}
  const twitter: Record<string, string> = {}

  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const property = attr(tag, "property")?.toLowerCase()
    const name = attr(tag, "name")?.toLowerCase()
    const content = attr(tag, "content")
    if (!content) continue
    if (property?.startsWith("og:")) og[property.slice(3)] = content
    if (name?.startsWith("og:")) og[name.slice(3)] = content
    if (name?.startsWith("twitter:")) twitter[name.slice(8)] = content
    if (property?.startsWith("twitter:")) twitter[property.slice(8)] = content
  }

  const metaDescription =
    (html.match(/<meta\b[^>]*>/gi) ?? [])
      .map((tag) =>
        attr(tag, "name")?.toLowerCase() === "description"
          ? attr(tag, "content")
          : null,
      )
      .find((value): value is string => Boolean(value)) ?? null

  let canonical: string | null = null
  let favicon: string | null = null
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const rel = attr(tag, "rel")?.toLowerCase() ?? ""
    const href = attr(tag, "href")
    if (!href) continue
    if (rel === "canonical" && !canonical) canonical = href
    if (rel.includes("icon") && !favicon) favicon = href
  }

  const headingLevels: number[] = []
  for (const tag of html.match(/<h([1-6])\b[^>]*>/gi) ?? []) {
    const level = Number(tag.match(/<h([1-6])/i)?.[1])
    if (Number.isInteger(level)) headingLevels.push(level)
  }

  let internalLinks = 0
  let externalLinks = 0
  let telLinks = 0
  let mailtoLinks = 0
  let totalTextLinks = 0
  let genericLinks = 0
  let hasSkipLink = false
  let origin = ""
  try {
    origin = new URL(baseUrl).origin
  } catch {
    origin = ""
  }

  // Anchor text needs the element, not just the opening tag, so link quality
  // can be judged. Non-greedy match; unclosed anchors are simply missed.
  const GENERIC_LINK_TEXT =
    /^(klik hier|klik|hier|lees meer|meer|meer info(rmatie)?|read more|more|link|dit|deze|verder|bekijk)$/i

  for (const element of html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? []) {
    const open = element.match(/<a\b[^>]*>/i)?.[0] ?? ""
    const href = attr(open, "href")
    const text = decodeEntities(
      element
        .replace(/^<a\b[^>]*>/i, "")
        .replace(/<\/a>$/i, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " "),
    )

    if (text.length > 0) {
      totalTextLinks += 1
      if (GENERIC_LINK_TEXT.test(text)) genericLinks += 1
    }

    if (!href) continue
    if (/^#(main|content|inhoud)/i.test(href) || /overslaan|skip to/i.test(text)) {
      hasSkipLink = true
    }
    if (/^tel:/i.test(href)) {
      telLinks += 1
      continue
    }
    if (/^mailto:/i.test(href)) {
      mailtoLinks += 1
      continue
    }
    if (href.startsWith("#") || /^javascript:/i.test(href)) continue

    try {
      const resolved = new URL(href, baseUrl)
      if (origin && resolved.origin === origin) internalLinks += 1
      else externalLinks += 1
    } catch {
      // Unresolvable href — ignore rather than guess.
    }
  }

  const imageTags = html.match(/<img\b[^>]*>/gi) ?? []
  const imagesWithAlt = imageTags.filter((tag) => {
    const alt = attr(tag, "alt")
    return alt !== null && alt.length > 0
  }).length
  const imagesWithEmptyAlt = imageTags.filter(
    (tag) => attr(tag, "alt") === "",
  ).length
  const imagesWithoutAlt = imageTags.length - imagesWithAlt - imagesWithEmptyAlt
  const imagesWithDimensions = imageTags.filter(
    (tag) => attr(tag, "width") !== null && attr(tag, "height") !== null,
  ).length
  const lazyImages = imageTags.filter(
    (tag) => attr(tag, "loading")?.toLowerCase() === "lazy",
  ).length

  // Render-blocking scripts: only those inside <head> without async/defer.
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ""
  const blockingScripts = (head.match(/<script\b[^>]*>/gi) ?? []).filter(
    (tag) =>
      attr(tag, "src") !== null &&
      !/\basync\b/i.test(tag) &&
      !/\bdefer\b/i.test(tag) &&
      attr(tag, "type")?.toLowerCase() !== "module",
  ).length

  const stylesheets = (html.match(/<link\b[^>]*>/gi) ?? []).filter((tag) =>
    attr(tag, "rel")?.toLowerCase().split(/\s+/).includes("stylesheet"),
  ).length

  const hasViewportMeta = (html.match(/<meta\b[^>]*>/gi) ?? []).some(
    (tag) => attr(tag, "name")?.toLowerCase() === "viewport",
  )

  // Form controls. A control counts as labelled when it carries aria-label /
  // aria-labelledby / title, or when a <label for> points at its id.
  const labelFor = new Set(
    (html.match(/<label\b[^>]*>/gi) ?? [])
      .map((tag) => attr(tag, "for"))
      .filter((value): value is string => Boolean(value)),
  )
  const controlTags = [
    ...(html.match(/<input\b[^>]*>/gi) ?? []),
    ...(html.match(/<select\b[^>]*>/gi) ?? []),
    ...(html.match(/<textarea\b[^>]*>/gi) ?? []),
  ].filter((tag) => {
    const type = attr(tag, "type")?.toLowerCase()
    return type !== "hidden" && type !== "submit" && type !== "button"
  })
  const labelledInputs = controlTags.filter((tag) => {
    const id = attr(tag, "id")
    return (
      (id !== null && labelFor.has(id)) ||
      attr(tag, "aria-label") !== null ||
      attr(tag, "aria-labelledby") !== null ||
      attr(tag, "title") !== null
    )
  }).length

  const forms = (html.match(/<form\b[^>]*>/gi) ?? []).length

  // CTA-like elements: buttons, submit inputs, and anchors whose text reads as
  // an action. Deliberately conservative — this counts intent signals, not
  // conversion quality.
  const CTA_TEXT =
    /\b(plan|boek|vraag aan|aanvragen|neem contact|contact|offerte|demo|start|begin|probeer|download|inschrijven|aanmelden|bel|mail|get started|book|request|sign up)\b/i
  const ctaElements =
    (html.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) ?? []).length +
    (html.match(/<input\b[^>]*>/gi) ?? []).filter((tag) =>
      ["submit", "button"].includes(attr(tag, "type")?.toLowerCase() ?? ""),
    ).length +
    (html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? []).filter((el) =>
      CTA_TEXT.test(el.replace(/<[^>]+>/g, " ")),
    ).length

  const paragraphs = (html.match(/<p\b[^>]*>/gi) ?? []).length
  const lists = (html.match(/<(ul|ol|dl)\b[^>]*>/gi) ?? []).length

  let headingOrderOk = true
  for (let i = 1; i < headingLevels.length; i += 1) {
    const previous = headingLevels[i - 1]!
    const current = headingLevels[i]!
    if (current > previous + 1) {
      headingOrderOk = false
      break
    }
  }

  const jsonLdBlocks = (
    html.match(
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ) ?? []
  )
    .map((block) => block.replace(/^[\s\S]*?>/, "").replace(/<\/script>$/i, ""))
    .map((block) => block.trim())
    .filter(Boolean)

  const landmarks = ["main", "header", "footer", "nav", "article", "section"]
    .filter((tag) => new RegExp(`<${tag}\\b`, "i").test(html))

  const text = stripNonContent(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  const words = text ? text.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length : 0
  const sentences = text
    ? text.split(/[.!?…]+(?=\s|$)/).filter((s) => s.trim().length > 0).length
    : 0

  return {
    title: html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]
      ? decodeEntities(
          html
            .match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)![1]!
            .replace(/\s+/g, " "),
        ) || null
      : null,
    metaDescription,
    canonical,
    lang: attr(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang"),
    favicon,
    og,
    twitter,
    h1Count: headingLevels.filter((l) => l === 1).length,
    h2Count: headingLevels.filter((l) => l === 2).length,
    headingLevels,
    internalLinks,
    externalLinks,
    images: imageTags.length,
    imagesWithAlt,
    imagesWithEmptyAlt,
    imagesWithoutAlt,
    jsonLdBlocks,
    landmarks,
    textLength: text.length,
    htmlLength: html.length,

    hasViewportMeta,
    blockingScripts,
    stylesheets,
    imagesWithDimensions,
    lazyImages,

    formInputs: controlTags.length,
    labelledInputs,
    headingOrderOk,
    totalTextLinks,
    genericLinks,
    hasSkipLink,

    words,
    sentences,
    paragraphs,
    lists,

    forms,
    ctaElements,
    telLinks,
    mailtoLinks,
  }
}

/**
 * Minimal robots.txt reader: collects blanket `Disallow: /` per user-agent
 * group and any Sitemap lines. Path-level rules are out of scope — we only
 * report whether a crawler is shut out entirely.
 */
export function parseRobotsTxt(text: string): RobotsFacts {
  const blocked = new Set<string>()
  const sitemaps: string[] = []
  let currentAgents: string[] = []
  let groupDisallowsAll = false

  const flush = () => {
    if (groupDisallowsAll) for (const a of currentAgents) blocked.add(a)
  }

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.split("#")[0]?.trim() ?? ""
    if (!line) continue
    const [rawKey, ...rest] = line.split(":")
    const key = rawKey?.trim().toLowerCase() ?? ""
    const value = rest.join(":").trim()

    if (key === "user-agent") {
      // A new agent line after directives starts a new group.
      if (currentAgents.length > 0 && groupDisallowsAll) {
        flush()
        currentAgents = []
        groupDisallowsAll = false
      }
      currentAgents.push(value.toLowerCase())
      continue
    }
    if (key === "sitemap" && value) {
      sitemaps.push(value)
      continue
    }
    if (key === "disallow" && (value === "/" || value === "/*")) {
      groupDisallowsAll = true
    }
    if (key === "allow" && value === "/") {
      groupDisallowsAll = false
    }
  }
  flush()

  return { found: true, blockedAgents: [...blocked], sitemaps }
}

export const ROBOTS_NOT_FOUND: RobotsFacts = {
  found: false,
  blockedAgents: [],
  sitemaps: [],
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

function check(
  id: string,
  label: string,
  points: number,
  maxPoints: number,
  detail: string,
): WebsiteScanCheck {
  return { id, label, points: Math.round(points), maxPoints, detail }
}

function total(checks: readonly WebsiteScanCheck[]): number {
  const earned = checks.reduce((sum, c) => sum + c.points, 0)
  const max = checks.reduce((sum, c) => sum + c.maxPoints, 0)
  if (max === 0) return 0
  return Math.round((earned / max) * 100)
}

function weakest(checks: readonly WebsiteScanCheck[], count: number): string[] {
  return [...checks]
    .filter((c) => c.points < c.maxPoints)
    .sort((a, b) => a.points / a.maxPoints - b.points / b.maxPoints)
    .slice(0, count)
    .map((c) => c.label.toLowerCase())
}

function summarise(
  score: number,
  checks: readonly WebsiteScanCheck[],
  strongLine: string,
): string {
  const gaps = weakest(checks, 2)
  if (gaps.length === 0) return strongLine
  return `Aandachtspunten: ${gaps.join(" en ")}.`
}

/**
 * Alt-text credit.
 *
 * alt="" is the correct marking for a decorative image, so it must not be
 * scored as a missing alt. We cannot tell decorative from meaningful, so an
 * empty alt gets half credit and the detail text says why — the reader can
 * judge whether their images really are decorative.
 */
function altCredit(facts: HtmlFacts): { share: number; detail: string } {
  if (facts.images === 0) {
    return { share: 1, detail: "Geen afbeeldingen op de pagina" }
  }
  const share =
    (facts.imagesWithAlt + facts.imagesWithEmptyAlt * 0.5) / facts.images

  const parts = [`${facts.imagesWithAlt} van ${facts.images} met alt-tekst`]
  if (facts.imagesWithEmptyAlt > 0) {
    parts.push(
      `${facts.imagesWithEmptyAlt} met alt="" (correct voor decoratieve afbeeldingen, maar niet voor betekenisdragende)`,
    )
  }
  if (facts.imagesWithoutAlt > 0) {
    parts.push(`${facts.imagesWithoutAlt} zonder alt-attribuut`)
  }
  return { share, detail: parts.join(", ") }
}

export function scoreSeo(facts: HtmlFacts, robots: RobotsFacts): MeasuredDimension {
  const titleLength = facts.title?.length ?? 0
  const descLength = facts.metaDescription?.length ?? 0
  const alt = altCredit(facts)

  const checks = [
    check(
      "title",
      "Paginatitel",
      facts.title ? 10 : 0,
      10,
      facts.title ? `Titel gevonden (${titleLength} tekens)` : "Geen <title> gevonden",
    ),
    check(
      "title-length",
      "Titellengte",
      titleLength >= 30 && titleLength <= 60 ? 5 : titleLength > 0 ? 2 : 0,
      5,
      titleLength >= 30 && titleLength <= 60
        ? "Lengte binnen 30–60 tekens"
        : `Lengte ${titleLength} tekens, streef naar 30–60`,
    ),
    check(
      "meta-description",
      "Meta description",
      facts.metaDescription ? 10 : 0,
      10,
      facts.metaDescription
        ? `Aanwezig (${descLength} tekens)`
        : "Geen meta description gevonden",
    ),
    check(
      "meta-description-length",
      "Lengte meta description",
      descLength >= 70 && descLength <= 160 ? 5 : descLength > 0 ? 2 : 0,
      5,
      descLength >= 70 && descLength <= 160
        ? "Lengte binnen 70–160 tekens"
        : `Lengte ${descLength} tekens, streef naar 70–160`,
    ),
    check(
      "single-h1",
      "Eén h1",
      facts.h1Count === 1 ? 15 : facts.h1Count === 0 ? 0 : 7,
      15,
      facts.h1Count === 1
        ? "Precies één h1 gevonden"
        : `${facts.h1Count} h1-koppen gevonden, één is de norm`,
    ),
    check(
      "h2-structure",
      "Koppenstructuur",
      facts.h2Count >= 2 ? 10 : facts.h2Count === 1 ? 5 : 0,
      10,
      `${facts.h2Count} h2-koppen gevonden`,
    ),
    check(
      "canonical",
      "Canonical",
      facts.canonical ? 10 : 0,
      10,
      facts.canonical ? "Canonical aanwezig" : "Geen canonical-link gevonden",
    ),
    check(
      "robots",
      "robots.txt",
      robots.found ? 10 : 0,
      10,
      robots.found ? "robots.txt bereikbaar" : "Geen robots.txt gevonden",
    ),
    check(
      "sitemap",
      "Sitemap",
      robots.sitemaps.length > 0 ? 10 : 0,
      10,
      robots.sitemaps.length > 0
        ? `${robots.sitemaps.length} sitemap(s) opgegeven in robots.txt`
        : "Geen sitemap opgegeven in robots.txt",
    ),
    check(
      "internal-links",
      "Interne links",
      facts.internalLinks >= 5 ? 10 : facts.internalLinks * 2,
      10,
      `${facts.internalLinks} interne links gevonden`,
    ),
    check("image-alt", "Alt-teksten", alt.share * 5, 5, alt.detail),
  ]

  const score = total(checks)
  return {
    id: "seo",
    label: "SEO-basis",
    score,
    source: "measured",
    checks,
    summary: summarise(score, checks, "Alle basiscontroles op SEO zijn in orde."),
  }
}

export function scoreMetadata(facts: HtmlFacts): MeasuredDimension {
  const checks = [
    check("og-title", "og:title", facts.og.title ? 15 : 0, 15,
      facts.og.title ? "Aanwezig" : "Ontbreekt — deelbaarheid op social lijdt hieronder"),
    check("og-description", "og:description", facts.og.description ? 15 : 0, 15,
      facts.og.description ? "Aanwezig" : "Ontbreekt"),
    check("og-image", "og:image", facts.og.image ? 20 : 0, 20,
      facts.og.image ? "Aanwezig" : "Ontbreekt — gedeelde links tonen geen voorvertoning"),
    check("og-basics", "og:type en og:url",
      (facts.og.type ? 5 : 0) + (facts.og.url ? 5 : 0), 10,
      [facts.og.type ? "og:type" : null, facts.og.url ? "og:url" : null]
        .filter(Boolean).join(" en ") || "Beide ontbreken"),
    check("twitter-card", "twitter:card", facts.twitter.card ? 15 : 0, 15,
      facts.twitter.card ? `Type ${facts.twitter.card}` : "Ontbreekt"),
    check("lang", "Taalattribuut", facts.lang ? 15 : 0, 15,
      facts.lang ? `lang="${facts.lang}"` : "Geen lang-attribuut op <html>"),
    check("favicon", "Favicon", facts.favicon ? 10 : 0, 10,
      facts.favicon ? "Aanwezig" : "Geen icon-link gevonden"),
  ]

  const score = total(checks)
  return {
    id: "metadata",
    label: "Metadata",
    score,
    source: "measured",
    checks,
    summary: summarise(score, checks, "Metadata is compleet."),
  }
}

export function scoreStructuredData(facts: HtmlFacts): MeasuredDimension {
  const parsed: unknown[] = []
  let parseFailures = 0

  for (const block of facts.jsonLdBlocks) {
    try {
      const value: unknown = JSON.parse(block)
      if (Array.isArray(value)) parsed.push(...value)
      else parsed.push(value)
    } catch {
      parseFailures += 1
    }
  }

  const types = new Set<string>()
  let hasSchemaContext = false

  const collect = (node: unknown): void => {
    if (!node || typeof node !== "object") return
    const record = node as Record<string, unknown>
    const context = record["@context"]
    if (typeof context === "string" && /schema\.org/i.test(context)) {
      hasSchemaContext = true
    }
    const type = record["@type"]
    if (typeof type === "string") types.add(type.toLowerCase())
    if (Array.isArray(type)) {
      for (const t of type) if (typeof t === "string") types.add(t.toLowerCase())
    }
    const graph = record["@graph"]
    if (Array.isArray(graph)) for (const child of graph) collect(child)
  }
  for (const node of parsed) collect(node)

  const hasOrg = types.has("organization") || types.has("localbusiness")
  const hasSite = types.has("website") || types.has("webpage")
  const hasBreadcrumb = types.has("breadcrumblist")
  const extraTypes = [...types].filter(
    (t) =>
      !["organization", "localbusiness", "website", "webpage", "breadcrumblist"].includes(t),
  )

  const checks = [
    check("jsonld-present", "JSON-LD aanwezig",
      facts.jsonLdBlocks.length > 0 ? 30 : 0, 30,
      facts.jsonLdBlocks.length > 0
        ? `${facts.jsonLdBlocks.length} JSON-LD blok(ken)`
        : "Geen JSON-LD gevonden"),
    check("jsonld-valid", "Geldige JSON",
      facts.jsonLdBlocks.length === 0 ? 0 : parseFailures === 0 ? 20 : 8, 20,
      facts.jsonLdBlocks.length === 0
        ? "Niets te valideren"
        : parseFailures === 0
          ? "Alle blokken parseren correct"
          : `${parseFailures} blok(ken) bevatten ongeldige JSON`),
    check("schema-context", "schema.org context", hasSchemaContext ? 10 : 0, 10,
      hasSchemaContext ? "@context verwijst naar schema.org" : "Geen schema.org @context"),
    check("type-organization", "Organization", hasOrg ? 15 : 0, 15,
      hasOrg ? "Organisatiegegevens gemarkeerd" : "Geen Organization/LocalBusiness"),
    check("type-website", "WebSite/WebPage", hasSite ? 10 : 0, 10,
      hasSite ? "Sitecontext gemarkeerd" : "Geen WebSite/WebPage"),
    check("type-breadcrumb", "BreadcrumbList", hasBreadcrumb ? 10 : 0, 10,
      hasBreadcrumb ? "Kruimelpad gemarkeerd" : "Geen BreadcrumbList"),
    check("type-extra", "Aanvullende types",
      extraTypes.length > 0 ? 5 : 0, 5,
      extraTypes.length > 0
        ? `Ook gevonden: ${extraTypes.slice(0, 4).join(", ")}`
        : "Geen aanvullende schema-types"),
  ]

  const score = total(checks)
  return {
    id: "structured-data",
    label: "Structured data",
    score,
    source: "measured",
    checks,
    summary: summarise(score, checks, "Structured data is breed toegepast."),
  }
}

export function scoreAiReadiness(
  facts: HtmlFacts,
  robots: RobotsFacts,
  llmsTxtFound: boolean,
): MeasuredDimension {
  const blockedAi = AI_CRAWLER_AGENTS.filter(
    (agent) =>
      robots.blockedAgents.includes(agent) || robots.blockedAgents.includes("*"),
  )

  // Two different problems look alike on the surface and must not be conflated:
  // a thin page (little text, little markup) is a content issue, while an SPA
  // shell (little text, lots of markup) is a rendering issue. Only the ratio
  // separates them, so only a low ratio may be reported as client-side rendering.
  const textRatio = facts.htmlLength === 0 ? 0 : facts.textLength / facts.htmlLength
  const readableWithoutJs = facts.textLength >= 1200 && textRatio >= 0.05
  const partiallyReadable = facts.textLength >= 400
  const looksClientRendered = textRatio < 0.05 && facts.textLength < 1200

  const hasMain = facts.landmarks.includes("main")
  const landmarkPoints =
    (hasMain ? 8 : 0) +
    (facts.landmarks.includes("nav") ? 4 : 0) +
    (facts.landmarks.includes("article") || facts.landmarks.includes("section") ? 3 : 0)

  const orderedHeadings =
    facts.headingLevels.length >= 3 && facts.h1Count >= 1 && facts.h2Count >= 1

  const checks = [
    check("ai-crawlers", "Toegang AI-crawlers",
      blockedAi.length === 0 ? 25 : Math.max(0, 25 - blockedAi.length * 6), 25,
      blockedAi.length === 0
        ? robots.found
          ? "Geen AI-crawler volledig geblokkeerd in robots.txt"
          : "Geen robots.txt — crawlers worden niet geblokkeerd"
        : `Volledig geblokkeerd: ${blockedAi.join(", ")}`),
    check("readable-without-js", "Content zonder JavaScript",
      readableWithoutJs ? 25 : partiallyReadable ? 12 : 0, 25,
      readableWithoutJs
        ? `${facts.textLength} tekens direct leesbaar in de HTML`
        : looksClientRendered
          ? `Veel markup, weinig tekst (${facts.textLength} tekens) — de content wordt waarschijnlijk via JavaScript geladen`
          : `Weinig tekst op de pagina (${facts.textLength} tekens), maar wel direct leesbaar in de HTML`),
    check("landmarks", "Semantische structuur", landmarkPoints, 15,
      facts.landmarks.length > 0
        ? `Gevonden: ${facts.landmarks.join(", ")}`
        : "Geen semantische landmarks (main, nav, article)"),
    check("jsonld-entities", "Machineleesbare entiteiten",
      facts.jsonLdBlocks.length > 0 ? 15 : 0, 15,
      facts.jsonLdBlocks.length > 0
        ? "JSON-LD helpt engines entiteiten herkennen"
        : "Geen JSON-LD om entiteiten uit af te leiden"),
    check("heading-hierarchy", "Koppenhiërarchie",
      orderedHeadings ? 10 : facts.headingLevels.length > 0 ? 4 : 0, 10,
      orderedHeadings
        ? "Duidelijke h1/h2-opbouw"
        : `${facts.headingLevels.length} ${facts.headingLevels.length === 1 ? "kop" : "koppen"}, opbouw onvolledig`),
    check("llms-txt", "llms.txt", llmsTxtFound ? 10 : 0, 10,
      llmsTxtFound
        ? "llms.txt aanwezig"
        : "Geen llms.txt — opkomende conventie, nog geen standaard"),
  ]

  const score = total(checks)
  return {
    id: "ai-search-readiness",
    label: "AI / search-readiness",
    score,
    source: "measured",
    checks,
    summary: summarise(
      score,
      checks,
      "Structureel goed vindbaar voor zoek- en antwoordmachines.",
    ),
  }
}

export type ResponseTiming = {
  /** Time to response headers, in ms. */
  responseMs: number
  /** Document size in bytes. */
  bytes: number
}

export function scorePerformance(
  facts: HtmlFacts,
  timing: ResponseTiming,
): MeasuredDimension {
  const kb = Math.round(timing.bytes / 1024)
  const imageDimShare =
    facts.images === 0 ? 1 : facts.imagesWithDimensions / facts.images
  const lazyShare = facts.images === 0 ? 1 : facts.lazyImages / facts.images

  const checks = [
    check("blocking-scripts", "Render-blokkerende scripts",
      facts.blockingScripts === 0 ? 25 : facts.blockingScripts <= 2 ? 15 : 5, 25,
      facts.blockingScripts === 0
        ? "Geen blokkerende scripts in de <head>"
        : `${facts.blockingScripts} script(s) in de <head> zonder async of defer`),
    check("document-weight", "Documentgewicht",
      kb < 100 ? 20 : kb < 300 ? 12 : kb < 1000 ? 5 : 0, 20,
      `HTML is ${kb} kB${kb < 100 ? "" : " — groot documenten vertragen de eerste weergave"}`),
    check("response-time", "Serverresponstijd",
      timing.responseMs < 500 ? 20 : timing.responseMs < 1000 ? 14 : timing.responseMs < 2000 ? 8 : 2, 20,
      `${timing.responseMs} ms tot de eerste response vanaf deze server`),
    check("image-dimensions", "Afmetingen op afbeeldingen", imageDimShare * 15, 15,
      facts.images === 0
        ? "Geen afbeeldingen op de pagina"
        : `${facts.imagesWithDimensions} van ${facts.images} afbeeldingen heeft width en height — voorkomt verspringende layout`),
    check("lazy-images", "Lazy loading", lazyShare * 10, 10,
      facts.images === 0
        ? "Geen afbeeldingen op de pagina"
        : `${facts.lazyImages} van ${facts.images} afbeeldingen laadt vertraagd`),
    check("viewport", "Viewport-meta", facts.hasViewportMeta ? 10 : 0, 10,
      facts.hasViewportMeta
        ? "Aanwezig — pagina schaalt mee op mobiel"
        : "Ontbreekt — mobiel wordt de desktoplayout ingezoomd getoond"),
  ]

  const score = total(checks)
  return {
    id: "performance",
    label: "Performance",
    score,
    source: "measured",
    checks,
    summary: summarise(
      score,
      checks,
      "Structurele performance-signalen zijn in orde.",
    ),
  }
}

export function scoreAccessibility(facts: HtmlFacts): MeasuredDimension {
  const alt = altCredit(facts)
  const labelShare =
    facts.formInputs === 0 ? 1 : facts.labelledInputs / facts.formInputs
  const genericShare =
    facts.totalTextLinks === 0 ? 0 : facts.genericLinks / facts.totalTextLinks

  const checks = [
    check("lang", "Taalattribuut", facts.lang ? 15 : 0, 15,
      facts.lang
        ? `lang="${facts.lang}" — schermlezers kiezen de juiste uitspraak`
        : "Geen lang-attribuut op <html>"),
    check("image-alt", "Alt-teksten", alt.share * 20, 20, alt.detail),
    check("input-labels", "Labels op formuliervelden", labelShare * 20, 20,
      facts.formInputs === 0
        ? "Geen formuliervelden op de pagina"
        : `${facts.labelledInputs} van ${facts.formInputs} velden heeft een label of aria-label`),
    check("heading-order", "Koppenvolgorde",
      facts.headingLevels.length === 0 ? 0 : facts.headingOrderOk ? 15 : 6, 15,
      facts.headingLevels.length === 0
        ? "Geen koppen gevonden"
        : facts.headingOrderOk
          ? "Geen overgeslagen niveaus"
          : "Er worden koppenniveaus overgeslagen (bijvoorbeeld h1 naar h3)"),
    check("link-text", "Beschrijvende linkteksten",
      Math.max(0, 15 - genericShare * 60), 15,
      facts.genericLinks === 0
        ? "Geen linkteksten als 'klik hier' of 'lees meer'"
        : `${facts.genericLinks} van ${facts.totalTextLinks} links heeft een nietszeggende tekst`),
    check("skip-link", "Navigatie overslaan",
      facts.hasSkipLink ? 15 : facts.landmarks.includes("main") ? 9 : 0, 15,
      facts.hasSkipLink
        ? "Skip-link aanwezig"
        : facts.landmarks.includes("main")
          ? "Geen skip-link, wel een <main>-landmark om naartoe te springen"
          : "Geen skip-link en geen <main>-landmark"),
  ]

  const score = total(checks)
  return {
    id: "accessibility",
    label: "Toegankelijkheid",
    score,
    source: "measured",
    checks,
    summary: summarise(
      score,
      checks,
      "De controleerbare toegankelijkheidssignalen zijn in orde.",
    ),
  }
}

export function scoreContent(facts: HtmlFacts): MeasuredDimension {
  const avgSentence =
    facts.sentences === 0 ? 0 : Math.round(facts.words / facts.sentences)
  const wordsPerParagraph =
    facts.paragraphs === 0 ? 0 : Math.round(facts.words / facts.paragraphs)
  const headingsPer300 =
    facts.words === 0 ? 0 : (facts.headingLevels.length / facts.words) * 300

  const checks = [
    check("volume", "Tekstvolume",
      facts.words >= 300 ? 25 : facts.words >= 150 ? 15 : facts.words >= 50 ? 7 : 0, 25,
      `${facts.words} woorden in de HTML`),
    check("sentence-length", "Zinslengte",
      avgSentence >= 10 && avgSentence <= 22 ? 20
        : avgSentence >= 8 && avgSentence <= 28 ? 12
          : avgSentence === 0 ? 0 : 5, 20,
      avgSentence === 0
        ? "Geen zinnen gevonden"
        : `Gemiddeld ${avgSentence} woorden per zin${avgSentence >= 10 && avgSentence <= 22 ? "" : " — 10 tot 22 leest het prettigst"}`),
    check("paragraphs", "Alineastructuur",
      facts.paragraphs >= 3 ? 15 : facts.paragraphs * 5, 15,
      `${facts.paragraphs} alinea's`),
    check("heading-density", "Koppen per 300 woorden",
      headingsPer300 >= 1 && headingsPer300 <= 6 ? 15
        : facts.headingLevels.length > 0 ? 8 : 0, 15,
      facts.words === 0
        ? "Geen tekst om koppen tegen af te zetten"
        : `${headingsPer300.toFixed(1)} koppen per 300 woorden`),
    check("lists", "Opsommingen", facts.lists > 0 ? 10 : 0, 10,
      facts.lists > 0
        ? `${facts.lists} lijst(en) — breekt lange tekst op`
        : "Geen opsommingen gevonden"),
    // Deliberately not a text-to-markup ratio here: that same fact is already
    // weighed under Performance (documentgewicht) and AI-readiness (SPA-shell
    // detection). Counting it a third time would let one framework artefact
    // dominate three dimensions.
    check("paragraph-length", "Alinealengte",
      wordsPerParagraph === 0 ? 0
        : wordsPerParagraph >= 20 && wordsPerParagraph <= 120 ? 15
          : wordsPerParagraph < 20 ? 8 : 5, 15,
      wordsPerParagraph === 0
        ? "Geen alinea's om te meten"
        : `Gemiddeld ${wordsPerParagraph} woorden per alinea${
            wordsPerParagraph >= 20 && wordsPerParagraph <= 120
              ? ""
              : wordsPerParagraph < 20
                ? " — erg kort, tekst oogt gefragmenteerd"
                : " — lange blokken lezen zwaar"
          }`),
  ]

  const score = total(checks)
  return {
    id: "content",
    label: "Contentkwaliteit",
    score,
    source: "measured",
    checks,
    summary: summarise(
      score,
      checks,
      "De structurele contentsignalen zijn in orde.",
    ),
  }
}

export function scoreConversion(facts: HtmlFacts): MeasuredDimension {
  const hasContactRoute =
    facts.forms > 0 || facts.telLinks > 0 || facts.mailtoLinks > 0
  const labelShare =
    facts.formInputs === 0 ? 0 : facts.labelledInputs / facts.formInputs

  const checks = [
    check("contact-route", "Contactmogelijkheid", hasContactRoute ? 25 : 0, 25,
      hasContactRoute
        ? [
            facts.forms > 0 ? `${facts.forms} formulier(en)` : null,
            facts.telLinks > 0 ? "telefoonlink" : null,
            facts.mailtoLinks > 0 ? "e-maillink" : null,
          ].filter(Boolean).join(", ")
        : "Geen formulier, telefoonlink of e-maillink op deze pagina"),
    check("form-length", "Formulierlengte",
      facts.forms === 0 ? 0
        : facts.formInputs <= 7 ? 20
          : facts.formInputs <= 12 ? 12 : 5, 20,
      facts.forms === 0
        ? "Geen formulier op deze pagina"
        : `${facts.formInputs} invulvelden${facts.formInputs <= 7 ? "" : " — elk extra veld kost invullers"}`),
    check("cta-present", "Actiegerichte elementen",
      facts.ctaElements === 0 ? 0 : facts.ctaElements <= 12 ? 20 : 12, 20,
      facts.ctaElements === 0
        ? "Geen knoppen of links met een duidelijke actie"
        : `${facts.ctaElements} knoppen of links met een actiegerichte tekst`),
    check("direct-contact", "Direct klikbaar contact",
      facts.telLinks > 0 && facts.mailtoLinks > 0 ? 15
        : facts.telLinks > 0 || facts.mailtoLinks > 0 ? 9 : 0, 15,
      facts.telLinks + facts.mailtoLinks === 0
        ? "Telefoonnummer en e-mailadres zijn niet aanklikbaar"
        : `${facts.telLinks} telefoon- en ${facts.mailtoLinks} e-maillink(s)`),
    check("cta-focus", "Focus in de actie",
      facts.ctaElements === 0 ? 0 : facts.ctaElements <= 8 ? 10 : 4, 10,
      facts.ctaElements <= 8
        ? "Beperkt aantal concurrerende acties"
        : `${facts.ctaElements} acties op één pagina concurreren om aandacht`),
    check("form-labels", "Labels op het formulier",
      facts.forms === 0 ? 0 : labelShare * 10, 10,
      facts.forms === 0
        ? "Geen formulier op deze pagina"
        : `${facts.labelledInputs} van ${facts.formInputs} velden is gelabeld`),
  ]

  const score = total(checks)
  return {
    id: "conversion",
    label: "Conversiepad",
    score,
    source: "measured",
    checks,
    summary: summarise(
      score,
      checks,
      "De conversiesignalen op deze pagina zijn compleet.",
    ),
  }
}

export function buildMeasuredDimensions(input: {
  facts: HtmlFacts
  robots: RobotsFacts
  llmsTxtFound: boolean
  timing: ResponseTiming
}): readonly MeasuredDimension[] {
  return [
    scoreSeo(input.facts, input.robots),
    scorePerformance(input.facts, input.timing),
    scoreAccessibility(input.facts),
    scoreContent(input.facts),
    scoreConversion(input.facts),
    scoreMetadata(input.facts),
    scoreStructuredData(input.facts),
    scoreAiReadiness(input.facts, input.robots, input.llmsTxtFound),
  ]
}
