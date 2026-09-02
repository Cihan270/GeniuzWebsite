import Link from "next/link"

import { FinalCta } from "@/components/marketing/final-cta"
import { Section, SectionHeader } from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { PageHero } from "@/components/templates/page-hero"
import { navHref } from "@/content/navigation"
import {
  isPublishableServiceDetail,
  type ServiceDetailContent,
} from "@/content/services/details"
import type { EnabledLocale } from "@/lib/i18n/config"

const hubLabels: Record<ServiceDetailContent["hub"], string> = {
  "ai-consultancy": "AI Consultancy",
  "ai-development": "AI Development",
  "ai-training": "AI Training",
}

const hubPaths: Record<ServiceDetailContent["hub"], string> = {
  "ai-consultancy": "/ai-consultancy",
  "ai-development": "/ai-development",
  "ai-training": "/ai-training",
}

type ServiceDetailTemplateProps = {
  content: ServiceDetailContent
  locale: EnabledLocale
}

/**
 * ServiceDetail page template — prepared for contentfase.
 * Do not mount via `page.tsx` while status is `reserved` (Fase 1).
 * Callers should gate with `isPublishableServiceDetail` before rendering publicly.
 */
export function ServiceDetailTemplate({
  content,
  locale,
}: ServiceDetailTemplateProps) {
  if (!isPublishableServiceDetail(content)) {
    throw new Error(
      `ServiceDetailTemplate requires published content with h1/seo/lead. Got status="${content.status}" for ${content.path}`,
    )
  }

  const hubLabel = hubLabels[content.hub]
  const hubPath = hubPaths[content.hub]

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: hubLabel, href: hubPath },
          { label: content.h1 },
        ]}
        eyebrow={content.eyebrow ?? hubLabel}
        title={content.h1}
        lead={content.lead}
        primaryCta={
          content.finalCta?.cta ?? {
            label: "Plan een adviesgesprek",
            href: "/contact",
          }
        }
        secondaryCta={{
          label: `Terug naar ${hubLabel}`,
          href: hubPath,
        }}
      />

      {content.sections?.map((section, index) => (
        <Section
          key={section.id}
          theme={index % 2 === 0 ? "canvas" : "surface"}
          id={section.id}
        >
          <Reveal>
            <SectionHeader
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.body}
            />
          </Reveal>
        </Section>
      ))}

      {content.outcomes && content.outcomes.length > 0 ? (
        <Section theme="ink" id="resultaatrichting">
          <Reveal>
            <SectionHeader
              eyebrow="Richting"
              heading="Wat dit oplevert — zonder schijnresultaten"
              description="Uitkomsten zijn richtinggevend en contextafhankelijk. Geen verzonnen cases of ROI-claims."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {content.outcomes.map((item) => (
              <StaggerItem key={item.id}>
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}

      <Section theme="surface" id="hub">
        <Reveal>
          <SectionHeader
            heading={`Onderdeel van ${hubLabel}`}
            description="Dit detail hoort bij de diensthub. Start daar voor het volledige overzicht."
          />
          <p className="mt-6">
            <Link
              href={navHref(hubPath, locale)}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Naar {hubLabel}
            </Link>
          </p>
        </Reveal>
      </Section>

      {content.finalCta ? (
        <FinalCta
          heading={content.finalCta.heading}
          body={content.finalCta.body}
          cta={content.finalCta.cta}
          locale={locale}
        />
      ) : (
        <FinalCta
          heading="Wil je dit verder verkennen?"
          body="Plan een vrijblijvend adviesgesprek over processen, prioriteiten en volgende stappen."
          cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
          locale={locale}
        />
      )}
    </main>
  )
}
