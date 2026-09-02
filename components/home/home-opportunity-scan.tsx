import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import {
  OpportunityScanVisual,
  Section,
  SectionHeader,
} from "@/components/marketing"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type HomeOpportunityScanProps = {
  content: HomePageContent["opportunityScan"]
  locale: EnabledLocale
}

export function HomeOpportunityScan({
  content,
  locale,
}: HomeOpportunityScanProps) {
  return (
    <Section theme="ink" id="opportunity-scan" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 size-[26rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_16%,transparent),transparent_68%)]"
      />
      <div aria-hidden className="geniuz-grain absolute inset-0 opacity-20" />

      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
        <Reveal luxury>
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            description={content.body}
          />
          <p className="mt-6 max-w-xl text-sm text-muted-foreground">
            {content.disclaimer}
          </p>
          <div className="mt-8 flex flex-col gap-5 border-t border-border pt-8">
            <p className="font-editorial text-xl italic leading-snug text-foreground/90">
              Indicatieve score en tijdswaardebandbreedte — geen schijnzekerheid.
            </p>
            <Button
              nativeButton={false}
              render={<Link href={navHref(content.cta.href, locale)} />}
              variant="accent"
              size="lg"
              className="w-fit"
            >
              {content.cta.label}
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </Reveal>

        <Reveal luxury>
          <OpportunityScanVisual className="min-h-[220px] lg:min-h-[260px]" />
        </Reveal>
      </div>
    </Section>
  )
}
