/**
 * NL UI dictionary — shell strings (nav/footer labels live in content/navigation).
 * EN dictionary lands when professional translations exist; do not machine-translate.
 */
export const nlDictionary = {
  meta: {
    siteName: "Geniuz",
    defaultTitle: "Geniuz | AI Consultancy en Maatwerk AI-oplossingen",
    titleTemplate: "%s | Geniuz",
  },
  a11y: {
    skipToContent: "Ga naar inhoud",
    mainNav: "Hoofdnavigatie",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    mobileNav: "Mobiel menu",
  },
  brand: {
    name: "Geniuz",
    homeAriaLabel: "Geniuz — naar homepage",
  },
  footer: {
    tagline:
      "Eerst begrijpen wat waarde oplevert. Daarna bouwen wat werkelijk nodig is.",
    diensten: "Diensten",
    oplossingen: "Oplossingen",
    sectoren: "Sectoren",
    bedrijf: "Bedrijf",
    legal: "Juridisch",
    rights: "Alle rechten voorbehouden.",
  },
  consent: {
    title: "Cookies en lokale opslag",
    description:
      "We gebruiken noodzakelijke opslag voor je cookiekeuze, de sitetaal (Nederlands) en tijdelijke scanvoortgang. Optioneel: anonieme gebruiksstatistieken via Vercel Analytics — alleen na toestemming. Geen marketingcookies.",
    necessaryLabel: "Noodzakelijk",
    necessaryDescription:
      "Consentkeuze, locale en scanvoortgang. Altijd actief.",
    analyticsLabel: "Analytics",
    analyticsDescription:
      "Anonieme, geaggregeerde statistieken via Vercel Analytics. Staat uit tot je toestemt.",
    accept: "Begrepen",
    acceptAll: "Alles accepteren",
    acceptNecessary: "Alleen noodzakelijk",
    rejectAll: "Alles weigeren",
    save: "Opslaan",
    savePreferences: "Voorkeuren opslaan",
    manage: "Voorkeuren beheren",
    preferencesTitle: "Cookievoorkeuren",
    alwaysActive: "Altijd actief",
    marketingLabel: "Marketing",
    marketingDescription:
      "Advertentie- en remarketingcookies. Staan uit; er zijn nog geen marketing-scripts actief.",
    privacyLink: "Privacy",
    cookieLink: "Cookiebeleid",
    footerLink: "Cookievoorkeuren",
  },
  languageSwitcher: {
    label: "Taal",
    nl: "Nederlands",
    en: "English",
  },
} as const

export type Dictionary = typeof nlDictionary
