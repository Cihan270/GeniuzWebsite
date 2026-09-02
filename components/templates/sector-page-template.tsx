import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { BrandImage } from "@/components/marketing"
import { FinalCta } from "@/components/marketing/final-cta"
import { Section, SectionHeader } from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { PageHero } from "@/components/templates/page-hero"
import { getSectorImageKey } from "@/content/images"
import { navHref } from "@/content/navigation"
import type { SectorPageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type SectorPageTemplateProps = {
  content: SectorPageContent
  locale: EnabledLocale
}

export function SectorPageTemplate({
  content,
  locale,
}: SectorPageTemplateProps) {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sectoren", href: "/sectoren" },
          { label: content.eyebrow },
        ]}
        eyebrow={content.eyebrow}
        title={content.h1}
        lead={content.lead}
        primaryCta={{
          label: "Plan een adviesgesprek",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Alle sectoren",
          href: "/sectoren",
        }}
      />

      {content.sections.map((section) => (
        <Section key={section.id} theme="canvas" id={section.id}>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
              <SectionHeader
                eyebrow={section.eyebrow}
                heading={section.heading}
                description={section.body}
              />
              <BrandImage
                imageKey={getSectorImageKey(content.sectorKey)}
                variant="editorial"
                className="lg:justify-self-end"
              />
            </div>
          </Reveal>
        </Section>
      ))}

      <Section theme="surface" id="knelpunten">
        <Reveal>
          <SectionHeader
            eyebrow={content.challenges.eyebrow}
            heading={content.challenges.heading}
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
          {content.challenges.items.map((item) => (
            <StaggerItem key={item.id}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section theme="ink" id="focus">
        <Reveal>
          <SectionHeader
            eyebrow={content.focusAreas.eyebrow}
            heading={content.focusAreas.heading}
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-0 border-t border-border md:grid-cols-3">
          {content.focusAreas.items.map((item) => (
            <StaggerItem
              key={item.id}
              className="border-b border-border py-8 md:border-r md:border-b-0 md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section theme="canvas" id="aanpak">
        <Reveal>
          <SectionHeader
            eyebrow={content.approach.eyebrow}
            heading={content.approach.heading}
            description={content.approach.body}
          />
        </Reveal>
      </Section>

      <Section theme="surface" id="diensten">
        <Reveal>
          <SectionHeader
            eyebrow={content.relatedServices.eyebrow}
            heading={content.relatedServices.heading}
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
          {content.relatedServices.items.map((item) => (
            <StaggerItem key={item.id}>
              <Link
                href={navHref(item.href, locale)}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <h3 className="text-lg group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  Bekijk
                  <ArrowUpRightIcon className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
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
