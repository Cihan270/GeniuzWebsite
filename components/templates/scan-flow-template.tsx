import type { ReactNode } from "react"

import { FinalCta } from "@/components/marketing/final-cta"
import {
  DevelopmentSystemsVisual,
  OpportunityScanVisual,
  Section,
  SectionHeader,
} from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { ScanDisclaimer } from "@/components/scans/scan-disclaimer"
import { PageHero } from "@/components/templates/page-hero"
import { Badge } from "@/components/ui/badge"
import type { ScanPageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type ScanFlowTemplateProps = {
  content: ScanPageContent
  locale: EnabledLocale
  /** Client island: OpportunityScanFlow or WebsiteScanFlow */
  scan: ReactNode
}

export function ScanFlowTemplate({
  content,
  locale,
  scan,
}: ScanFlowTemplateProps) {
  const breadcrumbLabel =
    content.scanType === "website" ? "Website Scan" : "AI Opportunity Scan"
  const [intro, ...restSections] = content.sections

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        variant="premium"
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: breadcrumbLabel },
        ]}
        eyebrow={content.eyebrow}
        title={content.h1}
        titleAccent={content.h1Accent}
        lead={content.lead}
        visual={
          content.scanType === "opportunity" ? (
            <OpportunityScanVisual className="min-h-[240px] lg:min-h-[min(42vh,320px)]" />
          ) : (
            <DevelopmentSystemsVisual className="min-h-[240px] lg:min-h-[min(42vh,320px)]" />
          )
        }
      >
        {content.prototypeLabel ? (
          <Badge
            variant="outline"
            className="border-white/25 text-foreground"
          >
            {content.prototypeLabel}
          </Badge>
        ) : null}
      </PageHero>

      <Section theme="canvas" id="scan" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-0 size-[22rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_10%,transparent),transparent_70%)]"
        />
        <div className="relative">
          <Reveal luxury>
            <ScanDisclaimer className="mb-10 max-w-3xl">
              {content.disclaimer}
            </ScanDisclaimer>
          </Reveal>
          {scan}
        </div>
      </Section>

      {intro ? (
        <Section
          theme="ink"
          id={intro.id}
          className="relative overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 size-[26rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_14%,transparent),transparent_68%)]"
          />
          <div aria-hidden className="geniuz-grain absolute inset-0 opacity-20" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
            <Reveal luxury>
              <SectionHeader
                eyebrow={intro.eyebrow ?? content.eyebrow}
                heading={intro.heading}
                description={intro.body}
              />
            </Reveal>
            <Reveal luxury>
              <p className="border-t border-border pt-8 font-editorial text-xl italic leading-snug text-foreground/90 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                {content.scanType === "website"
                  ? "Structurele meting van de opgegeven pagina — geen voorspelling van posities."
                  : "Indicatieve score en tijdswaardebandbreedte — geen schijnzekerheid."}
              </p>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {restSections.map((section, index) => (
        <Section
          key={section.id}
          theme={index % 2 === 0 ? "surface" : "canvas"}
          id={section.id}
        >
          <Reveal luxury>
            <SectionHeader
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.body}
            />
          </Reveal>
        </Section>
      ))}

      <FinalCta
        premium
        heading={content.finalCta.heading}
        body={content.finalCta.body}
        cta={content.finalCta.cta}
        locale={locale}
      />
    </main>
  )
}
