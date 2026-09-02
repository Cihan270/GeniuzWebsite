import { notFound } from "next/navigation"

import { InsightArticleTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import {
  getPublishedInsightBySlug,
  getPublishedInsights,
} from "@/content/insights"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildMetadataFromSeo } from "@/lib/seo/metadata"
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
} from "@/lib/seo/schemas"

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return getPublishedInsights().map((insight) => ({
    slug: insight.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const insight = getPublishedInsightBySlug(slug)
  if (!insight) return {}
  return buildMetadataFromSeo(insight.seo, `/insights/${insight.slug}`)
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = localeParam as EnabledLocale
  const insight = getPublishedInsightBySlug(slug)

  if (!insight || !insight.publishedAt) {
    notFound()
  }

  const path = `/insights/${insight.slug}`

  const structuredData: Record<string, unknown>[] = [
    organizationJsonLd(),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: insight.title, path },
    ]),
    articleJsonLd({
      title: insight.title,
      description: insight.description,
      path,
      datePublished: insight.publishedAt,
      image: insight.seo.ogImage,
    }),
  ]

  if (insight.faq && insight.faq.length > 0) {
    structuredData.push(
      faqJsonLd(
        insight.faq.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      ),
    )
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <InsightArticleTemplate insight={insight} locale={locale} />
    </>
  )
}
