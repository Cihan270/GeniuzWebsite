import type { InsightBlock } from "@/content/insights/types"

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function blockPlainText(block: InsightBlock): string {
  if (block.type === "paragraph" || block.type === "callout") {
    return block.segments
      .map((segment) => (segment.kind === "text" ? segment.value : segment.label))
      .join("")
  }
  if (block.type === "heading") return block.text
  return ""
}

/** Skip the opening paragraph when it repeats the hero intro. */
export function filterDuplicateIntro(
  sections: readonly InsightBlock[],
  intro: string,
): InsightBlock[] {
  if (sections.length === 0) return []

  const first = sections[0]
  if (
    first.type === "paragraph" &&
    blockPlainText(first).trim() === intro.trim()
  ) {
    return sections.slice(1) as InsightBlock[]
  }

  return [...sections]
}

export function extractH2Headings(sections: readonly InsightBlock[]): string[] {
  return sections
    .filter((block) => block.type === "heading" && block.level === 2)
    .map((block) => (block.type === "heading" ? block.text : ""))
}

export function splitPrologueAndChapters(sections: readonly InsightBlock[]): {
  prologue: InsightBlock[]
  chapters: InsightBlock[][]
} {
  const firstH2Index = sections.findIndex(
    (block) => block.type === "heading" && block.level === 2,
  )
  const prologue =
    firstH2Index === -1 ? [...sections] : sections.slice(0, firstH2Index)
  const rest = firstH2Index === -1 ? [] : sections.slice(firstH2Index)

  const chapters: InsightBlock[][] = []
  let current: InsightBlock[] = []

  for (const block of rest) {
    if (block.type === "heading" && block.level === 2 && current.length > 0) {
      chapters.push(current)
      current = [block]
    } else {
      current.push(block)
    }
  }

  if (current.length > 0) chapters.push(current)

  return { prologue, chapters }
}
