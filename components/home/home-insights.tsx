import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { BrandImage, Section, SectionHeader } from "@/components/marketing"
import { Button } from "@/components/ui/button"
import { getFeaturedInsights } from "@/content/insights"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"
import { localePath } from "@/lib/i18n/paths"

type HomeInsightsProps = {
  content: HomePageContent["insights"]
  locale: EnabledLocale
}

export function HomeInsights({ content, locale }: HomeInsightsProps) {
  const published = getFeaturedInsights(3)

  return (
    <Section theme="surface" id="insights">
      <Reveal luxury>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            description={content.body}
            className="md:max-w-2xl"
          />
          <Button
            nativeButton={false}
            render={<Link href={navHref(content.href, locale)} />}
            variant="outline"
            className="shrink-0 self-start md:self-auto"
          >
            Alle insights
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </Reveal>

      {published.length === 0 ? (
        <Reveal luxury>
          <p className="mt-10 border-t border-border pt-8 text-sm text-muted-foreground">
            {content.emptyLabel}
          </p>
        </Reveal>
      ) : (
        <ul className="mt-10 divide-y divide-border border-t border-border">
          {published.map((insight) => (
            <li key={insight.slug}>
              <Link
                href={localePath(`/insights/${insight.slug}`, locale)}
                className="group flex flex-col gap-4 py-6 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-center sm:gap-8"
              >
                <BrandImage
                  imageKey={insight.imageKey}
                  variant="thumbnail"
                  className="sm:order-first"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-editorial text-xl italic group-hover:underline group-hover:underline-offset-4">
                    {insight.title}
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {insight.publishedAt
                      ? new Date(insight.publishedAt).toLocaleDateString("nl-NL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : null}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
