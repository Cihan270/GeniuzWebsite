import { FinalCta } from "@/components/marketing/final-cta"
import { Section, SectionHeader } from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/templates/page-hero"
import type { PublishableCase } from "@/content/cases"
import type { EnabledLocale } from "@/lib/i18n/config"

type CaseTemplateProps = {
  content: PublishableCase
  locale: EnabledLocale
}

/**
 * Case study template — prepared for contentfase.
 * Do not mount via `page.tsx` in Fase 1 (no public cases, no nav, no sitemap).
 * Callers must only pass publishable case content when real cases exist.
 */
export function CaseTemplate({ content, locale }: CaseTemplateProps) {
  if (content.status !== "published" || !content.publishedAt) {
    throw new Error(
      `CaseTemplate requires published case content. Got status="${content.status}" for ${content.slug}`,
    )
  }

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cases", href: "/cases" },
          { label: content.title },
        ]}
        eyebrow={content.sector}
        title={content.title}
        lead={content.summary}
      />

      <Section theme="canvas" id="uitdaging">
        <Reveal>
          <SectionHeader heading="Uitdaging" description={content.challenge} />
        </Reveal>
      </Section>

      <Section theme="surface" id="aanpak">
        <Reveal>
          <SectionHeader heading="Aanpak" description={content.approach} />
        </Reveal>
      </Section>

      <Section theme="ink" id="resultaat">
        <Reveal>
          <SectionHeader
            heading="Resultaatrichting"
            description={content.outcome}
          />
        </Reveal>
      </Section>

      <FinalCta
        heading="Vergelijkbare uitdaging?"
        body="Plan een vrijblijvend adviesgesprek. We kijken samen of een vergelijkbare aanpak past — zonder verzonnen beloftes."
        cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
        locale={locale}
      />
    </main>
  )
}
