import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { BrandImage, Section, SectionHeader, SectorsVisual } from "@/components/marketing"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type HomeSectorsProps = {
  content: HomePageContent["sectors"]
  locale: EnabledLocale
}

export function HomeSectors({ content, locale }: HomeSectorsProps) {
  return (
    <Section theme="surface" id="sectoren">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <Reveal luxury>
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow={content.eyebrow}
              heading={content.heading}
              description={content.description}
              className="md:max-w-2xl"
            />
            <Button
              nativeButton={false}
              render={<Link href={navHref(content.href, locale)} />}
              variant="outline"
              className="w-fit shrink-0"
            >
              Alle sectoren
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </Reveal>
        <Reveal luxury>
          <SectorsVisual className="min-h-[200px] lg:min-h-[240px]" />
        </Reveal>
      </div>

      <Reveal luxury>
        <BrandImage
          imageKey="sectors-ambient"
          variant="ambient"
          className="mt-12 md:mt-14"
        />
      </Reveal>

      <Stagger luxury className="mt-14 grid gap-0 border-t border-border md:grid-cols-3">
        {content.items.map((item, index) => (
          <StaggerItem
            luxury
            key={item.id}
            className="border-b border-border py-9 md:border-r md:border-b-0 md:px-8 md:py-11 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <Link
              href={navHref(item.href, locale)}
              className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl">
                <span className="home-link-sheen">{item.title}</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100 group-focus-visible:opacity-100">
                Bekijk sector
                <ArrowUpRightIcon className="size-4" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
