import type { ServiceHubContent } from "@/content/pages/types"

export const aiDevelopmentPage: ServiceHubContent = {
  kind: "service-hub",
  routeId: "ai-development",
  locale: "nl",
  path: "/ai-development",
  h1: "AI bouwen die aansluit op je processen",
  h1Accent: "aansluit op je processen",
  seo: {
    title: "AI Development | Geniuz",
    description:
      "Maatwerk AI-development: agents, workflows, integraties en platforms — gebouwd op analyse, niet op hype.",
  },
  eyebrow: "AI Development",
  lead: "We bouwen wat nodig is nadat duidelijk is welk proces, welke data en welke menselijke controle ertoe doen. Uitvoering met context — geen losse demos zonder adoptiepad.",
  primaryCta: {
    label: "Plan een adviesgesprek",
    href: "/contact",
  },
  secondaryCta: {
    label: "Bekijk AI Consultancy",
    href: "/ai-consultancy",
  },
  sections: [
    {
      id: "intro",
      heading: "Uitvoering met context",
      body: "Development volgt analyse. We starten niet bij een agent-template, maar bij het werk dat mensen vandaag doen: uitzonderingen, systemen, verantwoordelijkheden. Zo blijft menselijke controle waar die hoort.",
    },
    {
      id: "aanpak",
      eyebrow: "Aanpak",
      heading: "Van proces naar werkende oplossing",
      body: "Integraties, workflows of maatwerk — alleen als de case het draagt. We documenteren aannames, falen openlijk waar nodig, en plannen adoptie mee in plaats van achteraf.",
    },
  ],
  offeringsHeading: "Oplossingen op deze hub",
  offeringsDescription:
    "Ankers voor navigatie en SEO op hubniveau. Unieke detailpagina’s volgen in een latere contentfase — hier geen dunne SEO-subroutes.",
  offerings: [
    {
      id: "ai-agents",
      title: "AI Agents",
      summary: "Nuttig wanneer het proces, de data en de controle klaar zijn.",
      body: "Agents die taken overnemen of voorbereiden, met checkpoints waar menselijke beoordeling verplicht blijft. Alleen zinvol als input, tools en uitkomstcriteria helder zijn.",
      anchorId: "ai-agents",
    },
    {
      id: "chatbots",
      title: "Chatbots",
      summary: "Met integratie in bestaande systemen en aandacht voor adoptie.",
      body: "Niet als losse widget, maar gekoppeld aan kennisbronnen, escalatiepaden en de systemen die je al gebruikt.",
      anchorId: "chatbots",
    },
    {
      id: "voice-agents",
      title: "Voice Agents",
      summary: "Voor gerichte, herhaalbare gesprekprocessen.",
      body: "Inzetbaar waar gesprekken gestandaardiseerd genoeg zijn en waar logging, overdracht en menselijke overname zijn geregeld.",
      anchorId: "voice-agents",
    },
    {
      id: "workflow-automatisering",
      title: "Workflow-automatisering",
      summary: "Repetitieve stappen versnellen met menselijke checkpoints waar nodig.",
      body: "Van intake tot statusupdate: we automatiseren wat herhaalbaar is en laten oordeel en uitzonderingen bij mensen.",
      anchorId: "workflow-automatisering",
    },
    {
      id: "maatwerk-ai-software",
      title: "Maatwerk AI-software",
      summary: "Software op maat, gebouwd op eerdere analyse.",
      body: "Wanneer standaardtools tekortschieten. Scope volgt uit procesanalyse — niet uit feature-wishlists.",
      anchorId: "maatwerk-ai-software",
    },
    {
      id: "crm-api-integraties",
      title: "CRM- en API-integraties",
      summary: "AI verbinden met systemen die je al gebruikt.",
      body: "Data en acties in de systemen van alledag, zodat AI geen eiland wordt naast het echte werk.",
      anchorId: "crm-api-integraties",
    },
    {
      id: "websites-platforms",
      title: "Websites & platforms",
      summary: "Digitale platforms met AI-ondersteuning waar het past.",
      body: "Websites en interne platforms die processen ondersteunen — met AI alleen waar het werk écht versnelt of kwalitatief versterkt.",
      anchorId: "websites-platforms",
    },
    {
      id: "website-scan",
      title: "Website Scan",
      summary:
        "Prototype / demonstratie: vaste demodata, geen live crawl. Los van de organisatiebrede Opportunity Scan.",
      body: "Een UX-demo van een scanflow voor techniek, content en vindbaarheid. Resultaten zijn gelabeld als demodata — geen claim op een live analyse van jouw domein.",
      anchorId: "website-scan",
      badge: "Prototype",
      href: "/website-scan",
    },
  ],
  related: {
    eyebrow: "Samenhang",
    heading: "Development staat zelden alleen",
    items: [
      {
        id: "consultancy",
        title: "AI Consultancy",
        summary: "Onderzoek en prioritering vóór bouw.",
        href: "/ai-consultancy",
      },
      {
        id: "training",
        title: "AI Training",
        summary: "Adoptie, vaardigheden en beleid naast de techniek.",
        href: "/ai-training",
      },
      {
        id: "opportunity",
        title: "AI Opportunity Scan",
        summary: "Eerste indicatie op organisatieniveau — geen ROI.",
        href: "/ai-opportunity-scan",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    heading: "Development, kort uitgelegd",
    items: [
      {
        id: "zonder-analyse",
        question: "Kunnen jullie meteen bouwen zonder consultancy?",
        answer:
          "Soms, als scope en risico’s al helder zijn. Vaak is een korte analyse goedkoper dan een herbouw. We zeggen het eerlijk als jullie al genoeg input hebben.",
      },
      {
        id: "website-scan-live",
        question: "Is de Website Scan een live crawl van mijn site?",
        answer:
          "Nee. In deze fase is het een expliciet prototype met vaste demodata. Het staat los van de AI Opportunity Scan op organisatieniveau.",
      },
      {
        id: "onderhoud",
        question: "Nemen jullie onderhoud en adoptie mee?",
        answer:
          "We plannen implementatie en gebruik mee. Exacte onderhoudsafspraken hangen van de oplossing af — die maken we expliciet, zonder compliance-theater.",
      },
    ],
  },
  finalCta: {
    heading: "Klaar om te bouwen wat het proces écht nodig heeft?",
    body: "Vertel waar het knelt. We bepalen samen of development, eerst analyse, of training de juiste volgende stap is.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}
