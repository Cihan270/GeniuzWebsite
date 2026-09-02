import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import {
  DevelopmentSystemsVisual,
  Section,
  SectionHeader,
} from "@/components/marketing"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type HomeDevelopmentProps = {
  content: HomePageContent["development"]
  locale: EnabledLocale
}

/**
 * Development + oplossingen. Website Scan is one compact tile with prototype label —
 * not a separate homepage section.
 */
export function HomeDevelopment({ content, locale }: HomeDevelopmentProps) {
  return (
    <Section theme="canvas" id="development">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <Reveal luxury>
          <div className="flex flex-col gap-6">
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
              className="w-fit shrink-0"
            >
              Naar AI Development
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </Reveal>
        <Reveal luxury>
          <DevelopmentSystemsVisual className="min-h-[220px] lg:min-h-[260px]" />
        </Reveal>
      </div>

      <Stagger luxury className="mt-14 grid gap-px bg-border sm:grid-cols-2">
        {content.solutions.map((item, index) => {
          const isPrototype = Boolean(item.badge)
          return (
            <StaggerItem luxury key={item.id} className="bg-background">
              <Link
                href={navHref(item.href, locale)}
                className="group relative flex h-full flex-col overflow-hidden p-7 outline-none transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:p-9"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-quart)] group-hover:scale-x-100"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  {item.badge ? (
                    <Badge variant="outline">{item.badge}</Badge>
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {item.summary}
                </p>
                {item.prototypeNote ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {item.prototypeNote}
                  </p>
                ) : null}
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium">
                  {isPrototype ? "Bekijk prototype" : "Meer over deze oplossing"}
                  <ArrowUpRightIcon className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
