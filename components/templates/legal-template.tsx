import { Container } from "@/components/marketing/container"
import { Section, SectionHeader } from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/templates/page-hero"
import type { LegalPageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type LegalTemplateProps = {
  content: LegalPageContent
  locale: EnabledLocale
}

/**
 * Lean utility template for legal concept pages.
 * Surfaces draft_legal_review as a visible banner — no marketing FinalCta.
 */
export function LegalTemplate({ content, locale }: LegalTemplateProps) {
  return (
    <main className="flex flex-1 flex-col">
      {content.legalStatus === "draft_legal_review" ? (
        <div
          role="status"
          className="border-b border-border bg-[color-mix(in_oklch,var(--geniuz-gold)_12%,var(--geniuz-canvas))]"
        >
          <Container size="default" className="py-3">
            <p className="text-sm font-medium text-foreground">
              {content.conceptBanner}
            </p>
          </Container>
        </div>
      ) : null}

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: content.h1 },
        ]}
        eyebrow={content.eyebrow}
        title={content.h1}
        lead={content.lead}
      />

      {content.sections.map((section, index) => (
        <Section
          key={section.id}
          theme={index % 2 === 0 ? "canvas" : "surface"}
          id={section.id}
        >
          <Reveal>
            <SectionHeader
              heading={section.heading}
              description={section.body}
            />
          </Reveal>
        </Section>
      ))}
    </main>
  )
}
