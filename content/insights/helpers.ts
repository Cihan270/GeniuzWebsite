import type { InlineSegment, Insight, InsightBlock } from "./types"

export function text(value: string): InlineSegment {
  return { kind: "text", value }
}

export function link(label: string, href: string): InlineSegment {
  return { kind: "link", label, href }
}

export function para(...segments: InlineSegment[]): InsightBlock {
  return { type: "paragraph", segments }
}

export function h2(value: string): InsightBlock {
  return { type: "heading", level: 2, text: value }
}

export function h3(value: string): InsightBlock {
  return { type: "heading", level: 3, text: value }
}

export function ul(...items: string[]): InsightBlock {
  return { type: "list", items }
}

export function ol(...items: string[]): InsightBlock {
  return { type: "list", items, ordered: true }
}

export function callout(
  title: string | undefined,
  ...segments: InlineSegment[]
): InsightBlock {
  return { type: "callout", title, segments }
}

export function table(
  headers: string[],
  rows: string[][],
  caption?: string,
): InsightBlock {
  return { type: "table", headers, rows, caption }
}

function segmentWords(segments: InlineSegment[]): number {
  return segments.reduce((sum, s) => {
    const value = s.kind === "text" ? s.value : s.label
    return sum + value.split(/\s+/).filter(Boolean).length
  }, 0)
}

function blockWords(block: InsightBlock): number {
  switch (block.type) {
    case "paragraph":
    case "callout":
      return segmentWords(block.segments)
    case "heading":
      return block.text.split(/\s+/).filter(Boolean).length
    case "list":
      return block.items.reduce(
        (sum, item) => sum + item.split(/\s+/).filter(Boolean).length,
        0,
      )
    case "table":
      return [
        ...(block.headers ?? []),
        ...block.rows.flat(),
        block.caption ?? "",
      ].reduce((sum, cell) => sum + cell.split(/\s+/).filter(Boolean).length, 0)
  }
}

/** Estimate reading time in minutes (200 wpm, minimum 1). */
export function estimateReadingTime(insight: Pick<Insight, "intro" | "sections" | "faq">): number {
  let words =
    insight.intro.split(/\s+/).filter(Boolean).length +
    insight.sections.reduce((sum, block) => sum + blockWords(block), 0)

  if (insight.faq) {
    for (const item of insight.faq) {
      words +=
        item.question.split(/\s+/).filter(Boolean).length +
        item.answer.split(/\s+/).filter(Boolean).length
    }
  }

  return Math.max(1, Math.ceil(words / 200))
}
