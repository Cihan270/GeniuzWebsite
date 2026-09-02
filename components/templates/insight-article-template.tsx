import { BrandImage, Container, FinalCta, Section } from "@/components/marketing"
import { Eyebrow } from "@/components/marketing/eyebrow"
import { FaqAccordion } from "@/components/marketing/faq-accordion"
import {
  InsightCategoryBadge,
  InsightContent,
  RelatedInsights,
} from "@/components/insights"
import {
  extractH2Headings,
  filterDuplicateIntro,
} from "@/components/insights/insight-article-utils"
import { InsightArticleSidebar } from "@/components/insights/insight-article-sidebar"
import { PageHero } from "@/components/templates/page-hero"
import {
  estimateReadingTime,
  getRelatedInsights,
  type Insight,
} from "@/content/insights"
import type { EnabledLocale } from "@/lib/i18n/config"

type InsightArticleTemplateProps = {
  insight: Insight
  locale: EnabledLocale
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function InsightArticleTemplate({
  insight,
  locale,
}: InsightArticleTemplateProps) {
  const dateLabel = insight.publishedAt
    ? formatDate(insight.publishedAt)
    : null
  const readingTime = estimateReadingTime(insight)
  const related = getRelatedInsights(insight)
  const filteredSections = filterDuplicateIntro(insight.sections, insight.intro)
  const headings = extractH2Headings(filteredSections)

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        variant="premium"
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: insight.title },
        ]}
        eyebrow="Geniuz Insights"
        title={insight.title}
        lead={insight.description}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground lg:hidden">
          <InsightCategoryBadge category={insight.category} />
          {dateLabel && insight.publishedAt ? (
            <time dateTime={insight.publishedAt}>{dateLabel}</time>
          ) : null}
          <span>{readingTime} min leestijd</span>
        </div>
      </PageHero>

      <div className="relative z-10 bg-geniuz-canvas">
        <Container size="wide" className="relative -mt-10 md:-mt-16 lg:-mt-20">
          <div className="relative overflow-hidden">
            <BrandImage
              imageKey={insight.imageKey}
              variant="banner"
              className="aspect-[2/1] max-h-[min(50vh,480px)] w-full"
              priority
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-geniuz-ink/8"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            />
          </div>
        </Container>
      </div>

      <Section theme="canvas" id="artikel" className="pt-12 md:pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,12.5rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] xl:gap-16">
          <InsightArticleSidebar
            category={insight.category}
            dateLabel={dateLabel}
            publishedAt={insight.publishedAt}
            readingTime={readingTime}
            headings={headings}
          />

          <article className="insight-article-body min-w-0 border-l border-border/80 pl-8 md:pl-10 lg:pl-12 xl:pl-14">
            <header className="max-w-4xl">
              <Eyebrow>{insight.category}</Eyebrow>
              <p className="font-editorial mt-6 text-[1.35rem] leading-[1.58] text-foreground/95 italic md:mt-7 md:text-[1.5rem] md:leading-[1.6] lg:text-[1.625rem]">
                {insight.intro}
              </p>
            </header>

            <div className="mt-10 md:mt-12 lg:mt-14">
              <InsightContent
                sections={insight.sections}
                intro={insight.intro}
                locale={locale}
              />
            </div>

            {insight.faq && insight.faq.length > 0 ? (
              <div className="mt-16 border-t border-border/70 pt-14 md:mt-20 md:pt-16 lg:mt-24 lg:pt-20">
                <Eyebrow>Veelgestelde vragen</Eyebrow>
                <h2 className="mt-5 font-editorial text-2xl italic tracking-tight md:text-[1.75rem] lg:text-[2rem]">
                  Antwoorden op de belangrijkste vragen
                </h2>
                <FaqAccordion items={insight.faq} className="mt-8 max-w-4xl" />
              </div>
            ) : null}
          </article>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section theme="surface" id="gerelateerd">
          <RelatedInsights
            articles={related.map((item) => ({
              slug: item.slug,
              title: item.title,
              category: item.category,
              description: item.description,
            }))}
            locale={locale}
          />
        </Section>
      ) : null}

      <FinalCta
        premium
        heading={insight.cta.heading}
        body={insight.cta.body}
        cta={{ label: insight.cta.label, href: insight.cta.href }}
        locale={locale}
      />
    </main>
  )
}
