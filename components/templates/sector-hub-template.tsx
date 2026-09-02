import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { FinalCta } from "@/components/marketing/final-cta"
import { Section, SectionHeader, SectorsVisual } from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { PageHero } from "@/components/templates/page-hero"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { SectorHubContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type SectorHubTemplateProps = {
  content: SectorHubContent
  locale: EnabledLocale
}

export function SectorHubTemplate({
  content,
  locale,
}: SectorHubTemplateProps) {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        variant="premium"
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sectoren" },
        ]}
        eyebrow={content.eyebrow}
        title={content.h1}
        lead={content.lead}
        primaryCta={{
          label: "Plan een adviesgesprek",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Opportunity Scan",
          href: "/ai-opportunity-scan",
        }}
        visual={<SectorsVisual className="min-h-[240px] lg:min-h-[min(42vh,320px)]" />}
      />

      {content.sections.map((section) => (
        <Section key={section.id} theme="canvas" id={section.id}>
          <Reveal>
            <SectionHeader
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.body}
            />
          </Reveal>
        </Section>
      ))}

      <Section theme="surface" id="focussectoren">
        <Reveal>
          <SectionHeader
            eyebrow="Overzicht"
            heading={content.sectorsHeading}
            description={content.sectorsDescription}
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-0 border-t border-border md:grid-cols-3">
          {content.sectors.map((sector, index) => (
            <StaggerItem
              key={sector.id}
              className="border-b border-border py-8 md:border-r md:border-b-0 md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <Link
                href={navHref(sector.href, locale)}
                className="group flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-xl transition-colors group-hover:text-[color-mix(in_oklch,var(--foreground),var(--accent)_35%)]">
                  {sector.title}
                </h2>
                <p className="mt-3 flex-1 text-muted-foreground">
                  {sector.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                  Bekijk sector
                  <ArrowUpRightIcon className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {content.note ? (
          <Reveal>
            <p className="mt-12 max-w-3xl text-sm text-muted-foreground">
              {content.note}
            </p>
            <div className="mt-6">
              <Button
                nativeButton={false}
                render={<Link href={navHref("/contact", locale)} />}
                variant="outline"
              >
                Neem contact op
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </Reveal>
        ) : null}
      </Section>

      <FinalCta
        heading={content.finalCta.heading}
        body={content.finalCta.body}
        cta={content.finalCta.cta}
        locale={locale}
      />
    </main>
  )
}
