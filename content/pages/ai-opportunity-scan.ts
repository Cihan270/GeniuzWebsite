import type { ScanPageContent } from "@/content/pages/types"

export const aiOpportunityScanPage: ScanPageContent = {
  kind: "scan",
  scanType: "opportunity",
  routeId: "ai-opportunity-scan",
  locale: "nl",
  path: "/ai-opportunity-scan",
  eyebrow: "AI Opportunity Scan",
  h1: "Ontdek je AI-potentieel (indicatie)",
  h1Accent: "AI-potentieel",
  lead: "Beantwoord een korte reeks vragen over één proces. Je krijgt een opportunity score en — na ontgrendeling — een bandbreedte voor indicatieve potentiële tijdswaarde. Geen besparing- of ROI-garantie.",
  seo: {
    title: "AI Opportunity Scan | Geniuz",
    description:
      "Indicatieve AI Opportunity Scan: opportunity score en potentiële tijdswaarde op basis van zelfgerapporteerde procesinput — geen besparing of ROI-garantie.",
  },
  disclaimer:
    "Resultaten zijn indicatief en gebaseerd op zelfgerapporteerde gegevens. Ze vervangen geen proces-, technische of risicoanalyse en geen businesscase. Implementatie-, onderhouds- en adoptiekosten zijn niet meegenomen. We spreken van indicatieve potentiële tijdswaarde — niet van besparing of ROI.",
  sections: [
    {
      id: "intro",
      heading: "Van procesinput naar indicatie",
      body: "Je beantwoordt vragen over uren, betrokkenheid, repetitie, automatiseerbaarheid, menselijke controle en complexiteit. De uitkomst is een opportunity score plus een bandbreedte voor potentiële tijdswaarde.",
    },
    {
      id: "uitkomst",
      eyebrow: "Uitkomsttaal",
      heading: "Score, tijdswaarde, volgende stap",
      body: "Je krijgt een indicatieve score, categorieën voor verbetering en een aanbevolen vervolgstap. Geen schijnnauwkeurige euro-ROI.",
    },
  ],
  finalCta: {
    heading: "Liever direct sparren?",
    body: "De scan is een startpunt. In een adviesgesprek brengen we scherpte aan in scope, risico’s en wat er écht gebouwd moet worden.",
    cta: { label: "Plan een adviesgesprek", href: "/contact" },
  },
}
