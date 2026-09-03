import type { ScanPageContent } from "@/content/pages/types"

export const websiteScanPage: ScanPageContent = {
  kind: "scan",
  scanType: "website",
  routeId: "website-scan",
  locale: "nl",
  path: "/website-scan",
  eyebrow: "Website Scan",
  h1: "Website Scan: techniek, content, vindbaarheid",
  h1Accent: "techniek, content, vindbaarheid",
  lead: "Vul een URL in en we halen de pagina op. Alle acht dimensies worden gemeten, en je kunt per dimensie uitklappen waar de score vandaan komt.",
  prototypeLabel: "Prototype — acht dimensies, gemeten uit de opgehaalde pagina",
  seo: {
    title: "Website Scan (prototype) | Geniuz",
    description:
      "Website Scan van Geniuz: techniek, content en vindbaarheid gemeten op de opgegeven URL. Acht dimensies met per controle een onderbouwing.",
  },
  disclaimer:
    "De opgegeven pagina wordt opgehaald en geanalyseerd, samen met robots.txt en llms.txt. Alleen openbaar bereikbare pagina's worden gescand; het resultaat wordt niet opgeslagen.",
  sections: [
    {
      id: "intro",
      heading: "Wat er gemeten wordt",
      body: "Acht dimensies, bepaald uit de opgehaalde HTML, robots.txt, llms.txt en de serverresponstijd: SEO-basis, performance, toegankelijkheid, contentkwaliteit, conversiepad, metadata, structured data en AI/search-readiness. Elke score is opgebouwd uit benoemde controles die je per dimensie kunt uitklappen, zodat je ziet welk punt waar vandaan komt.",
    },
    {
      id: "prototype",
      eyebrow: "Prototype",
      heading: "Wat deze scan niet doet",
      body: "De scan leest de HTML zoals die wordt geleverd; content die pas via JavaScript verschijnt telt niet mee, en dat meldt de scan apart. Performance meet structurele signalen en serverresponstijd, geen Lighthouse-meting met echte gebruikersdata. Toegankelijkheid dekt wat in de markup te controleren is — kleurcontrast en focusvolgorde vragen een gerenderde pagina. Contentkwaliteit en conversiepad meten structuur, geen redactionele of overtuigende kwaliteit. En de uitkomst voorspelt geen posities in zoek- of antwoordmachines.",
    },
  ],
  finalCta: {
    heading: "Meer dan een websitescan?",
    body: "Voor organisatiebrede AI-kansen start je bij de Opportunity Scan — of plan direct een adviesgesprek.",
    cta: { label: "Naar de Opportunity Scan", href: "/ai-opportunity-scan" },
  },
}
