/**
 * AI Opportunity Scan — content/config + UI copy.
 * Scoring lives in lib/scans; language rules are fixed here.
 */

export type OpportunityInputFieldId =
  | "totalProcessHoursPerWeek"
  | "involvedEmployees"
  | "repetitiveShare"
  | "automatableShare"
  | "requiredHumanOversight"
  | "implementationComplexity"

export type OpportunityInputField = {
  id: OpportunityInputFieldId
  label: string
  help: string
  valueKind: "number" | "percent" | "scale"
  unit?: string
  min?: number
  max?: number
}

/**
 * Outcome copy rules — enforce in UI:
 * - Use “indicatieve potentiële tijdswaarde”
 * - Never “besparing” or “ROI” as guaranteed outcome
 */
export const opportunityOutcomeCopy = {
  scoreLabel: "Opportunity score (indicatief)",
  timeValueLabel: "Indicatieve potentiële tijdswaarde",
  timeValueNote:
    "Getoond als bandbreedte. Implementatie-, onderhouds- en adoptiekosten zijn niet meegenomen.",
  weeklyHoursLabel: "Indicatieve uren per week",
  categoriesLabel: "Verbeterrichtingen",
  nextStepLabel: "Aanbevolen volgende stap",
  softGateHeading: "Ontgrendel de volledige indicatie",
  softGateBody:
    "Je ziet eerst de opportunity score. Vul je gegevens in om de tijdswaardebandbreedte, verbeterrichtingen en vervolgstap te zien. We gebruiken dit om je resultaat te bewaren en — indien geconfigureerd — een bevestiging te sturen.",
  softGateSubmit: "Toon volledige indicatie",
  softGateSuccess: "Volledige indicatie ontgrendeld",
  restartLabel: "Opnieuw beginnen",
  forbiddenTerms: ["besparing", "ROI", "garantie"] as const,
} as const

export const opportunityScaleOptions = [
  { value: 1, label: "Laag" },
  { value: 2, label: "Beperkt" },
  { value: 3, label: "Gemiddeld" },
  { value: 4, label: "Hoog" },
  { value: 5, label: "Zeer hoog" },
] as const

export const opportunityInputFields: readonly OpportunityInputField[] = [
  {
    id: "totalProcessHoursPerWeek",
    label: "Totale procesuren per week",
    help: "Geschatte uren die het proces in totaal per week kost.",
    valueKind: "number",
    unit: "uur",
    min: 1,
    max: 500,
  },
  {
    id: "involvedEmployees",
    label: "Aantal betrokken medewerkers",
    help: "Hoeveel mensen structureel bij dit proces betrokken zijn.",
    valueKind: "number",
    unit: "medewerkers",
    min: 1,
    max: 500,
  },
  {
    id: "repetitiveShare",
    label: "Repetitief aandeel",
    help: "Welk deel van het werk herhalend is.",
    valueKind: "percent",
    unit: "%",
    min: 0,
    max: 100,
  },
  {
    id: "automatableShare",
    label: "Geschatte automatiseerbaarheid",
    help: "Welk deel technisch en organisatorisch automatiseerbaar lijkt.",
    valueKind: "percent",
    unit: "%",
    min: 0,
    max: 100,
  },
  {
    id: "requiredHumanOversight",
    label: "Benodigde menselijke controle",
    help: "Hoeveel menselijke controle nodig blijft (hogere controle → lagere tijdswaarde).",
    valueKind: "scale",
    min: 1,
    max: 5,
  },
  {
    id: "implementationComplexity",
    label: "Implementatiecomplexiteit",
    help: "Complexiteit van data, systemen, governance en change.",
    valueKind: "scale",
    min: 1,
    max: 5,
  },
]

export const opportunitySteps = [
  {
    id: "process",
    title: "Procescontext",
    description: "Omvang van het proces en wie erbij betrokken is.",
    fields: ["totalProcessHoursPerWeek", "involvedEmployees"] as const,
  },
  {
    id: "nature",
    title: "Aard van het werk",
    description: "Repetitie en geschatte automatiseerbaarheid.",
    fields: ["repetitiveShare", "automatableShare"] as const,
  },
  {
    id: "constraints",
    title: "Randvoorwaarden",
    description: "Menselijke controle en implementatiecomplexiteit.",
    fields: ["requiredHumanOversight", "implementationComplexity"] as const,
  },
  {
    id: "result",
    title: "Indicatie",
    description: "Opportunity score en — na ontgrendeling — tijdswaarde.",
    fields: [] as const,
  },
] as const

export const opportunityImprovementCategoryCopy = {
  automatisering: {
    title: "Automatisering",
    body: "Herhalende stappen lenen zich voor workflow- of RPA-achtige ondersteuning.",
  },
  "agent-ondersteuning": {
    title: "Agent-ondersteuning",
    body: "Taken waarbij mensen blijven sturen, maar een agent voorbereidt of uitvoert.",
  },
  integratie: {
    title: "Integratie",
    body: "Waarde hangt af van koppelingen met bestaande systemen en data.",
  },
  "training-adoptie": {
    title: "Training & adoptie",
    body: "Menselijke controle of complexiteit vraagt om kaders, training en change.",
  },
  "nader-onderzoek": {
    title: "Nader onderzoek",
    body: "Eerst proces- en risicoanalyse; de indicatie alleen is onvoldoende sturing.",
  },
} as const

export const opportunityNextStepCopy = {
  adviesgesprek: {
    title: "Plan een adviesgesprek",
    body: "De indicatie wijst op voldoende potentieel om samen scherpte aan te brengen in scope en aanpak.",
    href: "/contact",
    cta: "Plan een adviesgesprek",
  },
  procesverdieping: {
    title: "Verdiep het procesbeeld",
    body: "De signalen vragen om een scherpere proces- of risicoanalyse voordat je bouwt.",
    href: "/contact",
    cta: "Bespreek een verdieping",
  },
  "website-scan": {
    title: "Bekijk de Website Scan-prototype",
    body: "Los van dit organisatieproces: bekijk hoe we websitescan-inzichten presenteren (demonstratie).",
    href: "/website-scan",
    cta: "Open Website Scan",
  },
} as const

/**
 * Directional formula (implemented in lib/scans/opportunity-scoring.ts):
 * indicativeWeeklyHours =
 *   totalProcessHoursPerWeek × repetitiveShare × automatableShare
 *   × (1 − requiredHumanOversightFactor)
 * Annual time-value range = f(hours, headcount context, hourRate, weeks)
 *   × complexity correction — always as a range + explanation.
 */
export const opportunityFormulaNotes = {
  indicativeWeeklyHours:
    "totalProcessHoursPerWeek × repetitiveShare × automatableShare × (1 − requiredHumanOversightFactor)",
  annualTimeValueRange:
    "f(indicativeWeeklyHours, headcountContext, hourRate, weeks) × complexityCorrection — always a range",
} as const

export const opportunityImprovementCategories = [
  "automatisering",
  "agent-ondersteuning",
  "integratie",
  "training-adoptie",
  "nader-onderzoek",
] as const

export function getOpportunityField(
  id: OpportunityInputFieldId,
): OpportunityInputField {
  const field = opportunityInputFields.find((f) => f.id === id)
  if (!field) throw new Error(`Unknown opportunity field: ${id}`)
  return field
}
