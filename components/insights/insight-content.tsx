import Link from "next/link"

import {
  filterDuplicateIntro,
  slugifyHeading,
  splitPrologueAndChapters,
} from "@/components/insights/insight-article-utils"
import {
  InlineSegments,
  InsightCategoryBadge,
} from "@/components/insights/insights-category-filter"
import { Eyebrow } from "@/components/marketing/eyebrow"
import type { InsightBlock } from "@/content/insights/types"
import { navHref } from "@/content/navigation"
import type { EnabledLocale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type InsightContentProps = {
  sections: readonly InsightBlock[]
  intro: string
  locale: EnabledLocale
  className?: string
}

function resolveHref(href: string, locale: EnabledLocale): string {
  if (href.startsWith("http") || href.startsWith("#")) return href
  return navHref(href, locale)
}

function BlockRenderer({
  block,
  locale,
}: {
  block: InsightBlock
  locale: EnabledLocale
}) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            id={slugifyHeading(block.text)}
            className="scroll-mt-28 text-balance font-editorial text-[1.75rem] italic tracking-tight text-foreground md:text-[2rem] lg:text-[2.125rem]"
          >
            <span
              aria-hidden
              className="mb-5 block h-px w-12 bg-accent md:mb-6"
            />
            {block.text}
          </h2>
        )
      }
      return (
        <h3 className="text-balance pt-1 text-lg font-medium tracking-tight md:text-xl">
          {block.text}
        </h3>
      )

    case "paragraph":
      return (
        <p className="max-w-[68ch] text-[1.0625rem] leading-[1.78] text-foreground/88 md:text-[1.09375rem] md:leading-[1.8]">
          <InlineSegments
            segments={block.segments.map((segment) =>
              segment.kind === "link"
                ? { ...segment, href: resolveHref(segment.href, locale) }
                : segment,
            )}
          />
        </p>
      )

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul"
      return (
        <ListTag
          className={cn(
            "max-w-[68ch] space-y-3.5 text-[1.0625rem] leading-[1.75] text-foreground/88",
            block.ordered
              ? "list-decimal pl-5 marker:font-mono marker:text-accent"
              : "list-none pl-0",
          )}
        >
          {block.items.map((item) => (
            <li
              key={item.slice(0, 48)}
              className={cn(
                !block.ordered &&
                  "relative pl-7 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-3 before:-translate-y-1/2 before:bg-accent before:content-['']",
              )}
            >
              {item}
            </li>
          ))}
        </ListTag>
      )
    }

    case "callout":
      return (
        <aside className="relative max-w-[68ch] py-1 pl-8 md:pl-10">
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent"
          />
          {block.title ? (
            <p className="mb-3 text-xs font-medium tracking-[0.14em] text-accent uppercase">
              {block.title}
            </p>
          ) : null}
          <p className="font-editorial text-lg leading-[1.65] text-foreground/90 italic md:text-xl md:leading-[1.68]">
            <InlineSegments
              segments={block.segments.map((segment) =>
                segment.kind === "link"
                  ? { ...segment, href: resolveHref(segment.href, locale) }
                  : segment,
              )}
            />
          </p>
        </aside>
      )

    case "table":
      return (
        <figure className="max-w-none overflow-x-auto border-y border-border">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                {block.headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-0 py-4 pr-6 text-left text-[0.6875rem] font-medium tracking-[0.14em] text-muted-foreground uppercase last:pr-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border/60 last:border-0"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-0 py-4 pr-6 align-top text-[0.9375rem] leading-relaxed text-foreground/88 last:pr-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? (
            <figcaption className="pt-3 text-xs text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )
  }
}

function BlockGroup({
  blocks,
  locale,
  className,
}: {
  blocks: readonly InsightBlock[]
  locale: EnabledLocale
  className?: string
}) {
  return (
    <div className={cn("space-y-6 md:space-y-7", className)}>
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} locale={locale} />
      ))}
    </div>
  )
}

export function InsightContent({
  sections,
  intro,
  locale,
  className,
}: InsightContentProps) {
  const filtered = filterDuplicateIntro(sections, intro)
  const { prologue, chapters } = splitPrologueAndChapters(filtered)

  return (
    <div className={cn("insight-prose", className)}>
      {prologue.length > 0 ? (
        <BlockGroup
          blocks={prologue}
          locale={locale}
          className="pb-4 md:pb-6"
        />
      ) : null}

      {chapters.map((chapter, index) => (
        <section
          key={index}
          aria-labelledby={
            chapter[0]?.type === "heading" && chapter[0].level === 2
              ? slugifyHeading(chapter[0].text)
              : undefined
          }
          className="border-t border-border/60 pt-14 md:pt-16 lg:pt-20"
        >
          <BlockGroup blocks={chapter} locale={locale} />
        </section>
      ))}
    </div>
  )
}

type RelatedInsightsProps = {
  articles: readonly {
    slug: string
    title: string
    category: import("@/content/insights/types").InsightCategory
    description: string
  }[]
  locale: EnabledLocale
  heading?: string
}

export function RelatedInsights({
  articles,
  locale,
  heading = "Gerelateerde artikelen",
}: RelatedInsightsProps) {
  if (articles.length === 0) return null

  return (
    <aside>
      <Eyebrow>Verder lezen</Eyebrow>
      <h2 className="mt-5 font-editorial text-2xl italic tracking-tight md:text-[1.75rem] lg:text-[2rem]">
        {heading}
      </h2>
      <ul className="mt-10 divide-y divide-border border-t border-border md:mt-12">
        {articles.map((article, index) => (
          <li
            key={article.slug}
            className="grid grid-cols-[auto_1fr] gap-5 py-8 md:gap-8 md:py-10 lg:py-12"
          >
            <span
              aria-hidden
              className="font-mono text-xs tracking-[0.14em] text-accent tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <InsightCategoryBadge category={article.category} />
              <h3 className="mt-3">
                <Link
                  href={navHref(`/insights/${article.slug}`, locale)}
                  className="font-editorial text-xl italic leading-snug text-foreground outline-none transition-opacity hover:opacity-80 hover:underline hover:underline-offset-[0.2em] focus-visible:ring-2 focus-visible:ring-ring md:text-2xl"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {article.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
