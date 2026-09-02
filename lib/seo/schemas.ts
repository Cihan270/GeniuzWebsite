import { absoluteUrl } from "@/lib/i18n/paths"
import { getSiteUrl, ORGANIZATION, SITE_NAME } from "@/lib/site"

/** JSON-LD helpers — Organization + BreadcrumbList. No Review schema. */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: getSiteUrl(),
    email: ORGANIZATION.email,
    description: ORGANIZATION.description,
  }
}

export type BreadcrumbItem = {
  name: string
  /** App path without locale, or absolute URL. */
  path: string
}

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : absoluteUrl(item.path),
    })),
  }
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    inLanguage: "nl-NL",
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
  }
}

export type FaqItem = {
  question: string
  answer: string
}

/** FAQPage schema — only when FAQ is visible on the page. */
export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export type ArticleJsonLdInput = {
  title: string
  description: string
  /** App path without locale, e.g. `/insights/slug`. */
  path: string
  /** ISO date string. */
  datePublished: string
  dateModified?: string
  /** Relative or absolute image URL for article hero. */
  image?: string
}

/** Article schema — only when a published insight article is visible. */
export function articleJsonLd(article: ArticleJsonLdInput) {
  const imageUrl = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${getSiteUrl()}${article.image.startsWith("/") ? article.image : `/${article.image}`}`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    inLanguage: "nl-NL",
    ...(imageUrl ? { image: [imageUrl] } : {}),
    author: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
    mainEntityOfPage: absoluteUrl(article.path),
  }
}
