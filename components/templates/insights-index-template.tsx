import { FinalCta, Section, SectionHeader } from "@/components/marketing"
import {
  InsightArticleCard,
  InsightsArticleGrid,
} from "@/components/insights"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/templates/page-hero"
import {
  getFeaturedInsight,
  getPublishedInsights,
  type Insight,
} from "@/content/insights"
import type { InsightsIndexContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type InsightsIndexTemplateProps = {
  content: InsightsIndexContent
  locale: EnabledLocale
  articles?: readonly Insight[]
}

export function InsightsIndexTemplate({
  content,
  locale,
  articles,
}: InsightsIndexTemplateProps) {
  const published = articles ?? getPublishedInsights()
  const featured = getFeaturedInsight()

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        variant="premium"
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: content.eyebrow },
        ]}
        eyebrow={content.eyebrow}
        title={content.h1}
        titleAccent={content.h1Accent}
        lead={content.lead}
      />

      {published.length === 0 ? (
        <Section theme="canvas" id="artikelen">
          <p className="border-t border-border pt-8 text-sm text-muted-foreground">
            {content.emptyLabel}
          </p>
        </Section>
      ) : (
        <>
          {featured ? (
            <Section theme="surface" id="uitgelicht">
              <Reveal luxury>
                <SectionHeader
                  eyebrow="Uitgelicht"
                  heading="Meest recent"
                  description="Praktische inzichten voor besluitvormers die AI willen inzetten met oog voor proces, risico en rendement."
                />
              </Reveal>
              <Reveal luxury>
                <InsightArticleCard
                  insight={featured}
                  locale={locale}
                  featured
                  className="mt-10"
                />
              </Reveal>
            </Section>
          ) : null}

          <Section theme="canvas" id="artikelen">
            <Reveal luxury>
              <SectionHeader
                eyebrow={content.sections[0]?.eyebrow}
                heading={content.sections[0]?.heading ?? "Alle artikelen"}
                description={content.sections[0]?.body}
              />
            </Reveal>
            <InsightsArticleGrid
              articles={published}
              featuredSlug={featured?.slug ?? ""}
              locale={locale}
            />
          </Section>
        </>
      )}

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
