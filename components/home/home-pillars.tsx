import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { PillarsVisual, Section, SectionHeader } from "@/components/marketing"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type HomePillarsProps = {
  content: HomePageContent["pillars"]
  locale: EnabledLocale
}

export function HomePillars({ content, locale }: HomePillarsProps) {
  return (
    <Section theme="canvas" id="kerngebieden">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <Reveal luxury>
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            description={content.description}
          />
        </Reveal>
        <Reveal luxury>
          <PillarsVisual className="min-h-[200px] lg:min-h-[240px]" />
        </Reveal>
      </div>

      <Stagger
        luxury
        className="mt-14 grid gap-0 border-t border-border md:grid-cols-3"
      >
        {content.items.map((item, index) => (
          <StaggerItem
            luxury
            key={item.id}
            className="border-b border-border py-9 md:border-r md:border-b-0 md:px-7 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <Link
              href={navHref(item.href, locale)}
              className="group flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase transition-colors group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-2xl">
                <span className="home-link-sheen transition-colors group-hover:text-[color-mix(in_oklch,var(--foreground),var(--accent)_40%)]">
                  {item.title}
                </span>
              </h3>
              <p className="mt-4 flex-1 text-muted-foreground">{item.summary}</p>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Bekijk
                <ArrowUpRightIcon className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
