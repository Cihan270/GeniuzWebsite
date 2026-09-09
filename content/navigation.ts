import { localePath } from "@/lib/i18n/paths"
import type { EnabledLocale } from "@/lib/i18n/config"
import { defaultLocale } from "@/lib/i18n/config"

/**
 * Fase 1 navigation — hubs only, no Cases, no LanguageSwitcher, no dienst-details.
 * Oplossingen: scans + Development-hub anchors (not detail URLs).
 */

export type NavLink = {
  id: string
  label: string
  /** App path without locale, may include hash (e.g. `/ai-development#ai-agents`). */
  href: string
  /** Optional badge shown in submenu (e.g. Website Scan prototype). */
  badge?: string
}

export type NavGroup = {
  id: string
  label: string
  items: readonly NavLink[]
}

export type NavItem =
  | { type: "link"; id: string; label: string; href: string }
  | { type: "group"; id: string; label: string; items: readonly NavLink[] }

export type SiteNavigation = {
  primary: readonly NavItem[]
  headerCta: NavLink
  footer: {
    diensten: readonly NavLink[]
    oplossingen: readonly NavLink[]
    sectoren: readonly NavLink[]
    bedrijf: readonly NavLink[]
    legal: readonly NavLink[]
  }
}

const navigationNl: SiteNavigation = {
  primary: [
    {
      type: "group",
      id: "diensten",
      label: "Diensten",
      items: [
        {
          id: "ai-consultancy",
          label: "AI Consultancy",
          href: "/ai-consultancy",
        },
        {
          id: "ai-development",
          label: "AI Development",
          href: "/ai-development",
        },
        {
          id: "ai-training",
          label: "AI Training",
          href: "/ai-training",
        },
      ],
    },
    {
      type: "group",
      id: "oplossingen",
      label: "Oplossingen",
      items: [
        {
          id: "ai-opportunity-scan",
          label: "AI Opportunity Scan",
          href: "/ai-opportunity-scan",
        },
        {
          id: "website-scan",
          label: "Website Scan",
          href: "/website-scan",
          badge: "Prototype",
        },
        {
          id: "dev-agents",
          label: "AI Agents",
          href: "/ai-development#ai-agents",
        },
        {
          id: "dev-workflows",
          label: "Workflow-automatisering",
          href: "/ai-development#workflow-automatisering",
        },
        {
          id: "dev-maatwerk",
          label: "Maatwerk AI-software",
          href: "/ai-development#maatwerk-ai-software",
        },
      ],
    },
    {
      type: "group",
      id: "sectoren",
      label: "Sectoren",
      items: [
        {
          id: "juridische-sector",
          label: "Juridische sector",
          href: "/sectoren/juridische-sector",
        },
        {
          id: "financiele-sector",
          label: "Financiële sector",
          href: "/sectoren/financiele-sector",
        },
        {
          id: "kennisintensieve-organisaties",
          label: "Kennisintensieve organisaties",
          href: "/sectoren/kennisintensieve-organisaties",
        },
      ],
    },
    {
      type: "link",
      id: "insights",
      label: "Insights",
      href: "/insights",
    },
    {
      type: "link",
      id: "over-ons",
      label: "Over Geniuz",
      href: "/over-ons",
    },
    {
      type: "link",
      id: "contact",
      label: "Contact",
      href: "/contact",
    },
  ],
  headerCta: {
    id: "plan-adviesgesprek",
    label: "Plan een adviesgesprek",
    href: "/contact",
  },
  footer: {
    diensten: [
      { id: "f-consultancy", label: "AI Consultancy", href: "/ai-consultancy" },
      { id: "f-development", label: "AI Development", href: "/ai-development" },
      { id: "f-training", label: "AI Training", href: "/ai-training" },
    ],
    oplossingen: [
      {
        id: "f-opportunity",
        label: "AI Opportunity Scan",
        href: "/ai-opportunity-scan",
      },
      {
        id: "f-website-scan",
        label: "Website Scan",
        href: "/website-scan",
        badge: "Prototype",
      },
    ],
    sectoren: [
      {
        id: "f-juridisch",
        label: "Juridische sector",
        href: "/sectoren/juridische-sector",
      },
      {
        id: "f-finance",
        label: "Financiële sector",
        href: "/sectoren/financiele-sector",
      },
      {
        id: "f-kennis",
        label: "Kennisintensieve organisaties",
        href: "/sectoren/kennisintensieve-organisaties",
      },
    ],
    bedrijf: [
      { id: "f-over", label: "Over Geniuz", href: "/over-ons" },
      { id: "f-insights", label: "Insights", href: "/insights" },
      { id: "f-contact", label: "Contact", href: "/contact" },
    ],
    legal: [
      { id: "f-privacy", label: "Privacy", href: "/privacy" },
      { id: "f-cookies", label: "Cookiebeleid", href: "/cookiebeleid" },
      // Algemene voorwaarden staan bewust niet in de footer zolang die pagina
      // een concept is: een niet-bindende placeholder onder die naam schaadt
      // meer dan hij oplevert. Terugzetten zodra de definitieve tekst er is.
    ],
  },
}

export function getNavigation(
  locale: EnabledLocale = defaultLocale,
): SiteNavigation {
  if (locale !== "nl") {
    // Fase 1: only NL navigation exists.
    return navigationNl
  }
  return navigationNl
}

/** Resolve a nav href to a locale-prefixed URL (hash preserved). */
export function navHref(
  href: string,
  locale: EnabledLocale = defaultLocale,
): string {
  const [pathPart, hash] = href.split("#")
  const localized = localePath(pathPart || "/", locale)
  return hash ? `${localized}#${hash}` : localized
}

/** Flat list of all primary + CTA hrefs for IA assertions / tests. */
export function getAllNavHrefs(
  locale: EnabledLocale = defaultLocale,
): string[] {
  const nav = getNavigation(locale)
  const hrefs: string[] = [nav.headerCta.href]
  for (const item of nav.primary) {
    if (item.type === "link") {
      hrefs.push(item.href)
    } else {
      for (const child of item.items) {
        hrefs.push(child.href)
      }
    }
  }
  return hrefs
}
