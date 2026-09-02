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
  lead: "Een expliciet prototype van hoe we websitescan-inzichten presenteren. Vul een URL in voor de flow — het resultaat is altijd vaste demodata, geen live crawl.",
  prototypeLabel: "Prototype / demonstratie — geen live crawl",
  seo: {
    title: "Website Scan (prototype) | Geniuz",
    description:
      "Website Scan-prototype van Geniuz: demonstratieresultaat met vaste demodata. Geen live crawl of echte websitescan in deze versie.",
  },
  disclaimer:
    "Dit is een expliciet prototype. Je kunt een URL invullen voor de UX-flow; het resultaat is altijd een vaste demonstratiedataset en geen live analyse van jouw site.",
  sections: [
    {
      id: "intro",
      heading: "Demonstratie van de scanflow",
      body: "De Website Scan staat los van de organisatiebrede AI Opportunity Scan. In deze versie tonen we vaste demoscores (SEO, performance, toegankelijkheid, content, conversie, metadata, structured data, AI/search-readiness).",
    },
    {
      id: "prototype",
      eyebrow: "Prototype",
      heading: "Geen live crawl",
      body: "Er is geen analyze-API die een crawl claimt. Scores komen uit een vaste demodataset. Later kan een echte provider dezelfde UI voeden.",
    },
  ],
  finalCta: {
    heading: "Meer dan een websitescan?",
    body: "Voor organisatiebrede AI-kansen start je bij de Opportunity Scan — of plan direct een adviesgesprek.",
    cta: { label: "Naar de Opportunity Scan", href: "/ai-opportunity-scan" },
  },
}
