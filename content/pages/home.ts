import type { HomePageContent } from "@/content/pages/types"

/**
 * Homepage content — Fase 4 wireframe.
 * Website Scan only as a compact development tile (no own homepage section).
 */
export const homePage: HomePageContent = {
  kind: "home",
  routeId: "home",
  locale: "nl",
  path: "/",
  h1: "Van AI-kans naar meetbaar resultaat.",
  seo: {
    title: "Geniuz | AI Consultancy en Maatwerk AI-oplossingen",
    description:
      "Geniuz helpt organisaties eerst te begrijpen waar AI waarde oplevert — daarna bouwen we wat werkelijk nodig is. Consultancy, development en training.",
  },
  sections: [
    {
      id: "positioning",
      heading: "Eerst begrijpen wat waarde oplevert",
      body: "Daarna bouwen wat werkelijk nodig is. Geen hype — wel onderzoek, prioritering en uitvoering.",
    },
    {
      id: "opportunity-scan",
      heading: "AI Opportunity Scan",
      body: "Indicatieve opportunity score en potentiële tijdswaarde — geen besparing of ROI.",
    },
  ],
  hero: {
    brand: "Geniuz",
    headline: "Van AI-kans naar meetbaar resultaat.",
    subheadline:
      "Geniuz onderzoekt waar AI jouw organisatie werkelijk vooruithelpt en ontwikkelt vervolgens de oplossingen die processen slimmer, sneller en schaalbaarder maken.",
    primaryCta: {
      label: "Plan een vrijblijvend AI-adviesgesprek",
      href: "/contact",
    },
    secondaryCta: {
      label: "Ontdek je AI-potentieel",
      href: "/ai-opportunity-scan",
    },
  },
  positioning: {
    strip: [
      "Onderzoeken",
      "Prioriteren",
      "Bouwen",
      "Implementeren",
    ],
    heading: "Eerst begrijpen wat waarde oplevert",
    body: "Daarna bouwen wat werkelijk nodig is. Geen hype — wel onderzoek, prioritering en uitvoering met eigen developmentcapaciteit.",
    problems: [
      {
        id: "handmatig",
        title: "Te veel handmatig werk",
        body: "Processen die herhaalbaar zijn blijven op menselijke capaciteit hangen.",
      },
      {
        id: "tools",
        title: "Tools zonder strategie",
        body: "Losse AI-tools worden aangeschaft zonder heldere proces- of adoptierichting.",
      },
      {
        id: "pilots",
        title: "Pilots zonder businesscase",
        body: "Experimenten starten voordat waarde, risico’s en haalbaarheid duidelijk zijn.",
      },
      {
        id: "adoptie",
        title: "Integratie en adoptie te laat",
        body: "Systemen, controle en mensen worden pas meegenomen als de pilot al loopt.",
      },
    ],
  },
  pillars: {
    eyebrow: "Kerngebieden",
    heading: "Consultancy, development en training — in samenhang",
    description:
      "Drie gebieden die elkaar versterken: eerst richting, dan bouw, dan adoptie.",
    items: [
      {
        id: "consultancy",
        title: "AI Consultancy",
        summary:
          "Onderzoeken waar AI zinvol is: processen, prioritering en roadmap vóór bouw.",
        href: "/ai-consultancy",
      },
      {
        id: "development",
        title: "AI Development",
        summary:
          "Agents, workflows, integraties en maatwerk — gebouwd op analyse, niet op hype.",
        href: "/ai-development",
      },
      {
        id: "training",
        title: "AI Training",
        summary:
          "Workshops, managementkaders en beleid zodat technologie ook echt landt.",
        href: "/ai-training",
      },
    ],
  },
  consultancy: {
    eyebrow: "AI Consultancy",
    heading: "Eerst onderzoeken, dan bouwen",
    body: "We brengen processen, knelpunten en haalbaarheid in kaart voordat er tools of agents worden gebouwd. Zo voorkom je pilots zonder adoptie.",
    href: "/ai-consultancy",
    offerings: [
      {
        id: "ai-scan",
        title: "AI-scan",
        summary: "Snel inzicht in kansen, risico’s en volgende stappen.",
      },
      {
        id: "procesanalyse",
        title: "Procesanalyse",
        summary: "Processen in kaart vóór automatisering of agents.",
      },
      {
        id: "ai-strategie",
        title: "AI-strategie",
        summary: "Van losse pilots naar samenhangende AI-richting.",
      },
      {
        id: "prioriteringsroadmap",
        title: "Prioriteringsroadmap",
        summary:
          "Prioriteren op haalbaarheid, waarde en adoptie — geen schijn-ROI.",
      },
    ],
    process: {
      eyebrow: "Werkwijze",
      heading: "Vijf stappen, zonder verzonnen doorlooptijden",
      steps: [
        {
          id: "kennismaken",
          title: "Kennismaken",
          body: "Context, doelen en waar het in de organisatie knelt.",
        },
        {
          id: "onderzoeken",
          title: "Onderzoeken",
          body: "Processen, data, risico’s en haalbaarheid in kaart.",
        },
        {
          id: "prioriteren",
          title: "Prioriteren",
          body: "Keuzes op waarde, complexiteit en adoptiekans.",
        },
        {
          id: "ontwikkelen",
          title: "Ontwikkelen",
          body: "Bouwen wat nodig is — met eigen uitvoeringskracht.",
        },
        {
          id: "implementeren",
          title: "Implementeren",
          body: "Inbedding, verbetering en begeleiding bij gebruik.",
        },
      ],
    },
  },
  development: {
    eyebrow: "AI Development",
    heading: "Oplossingen die op processen aansluiten",
    body: "We bouwen wat nodig is nadat duidelijk is welk proces, welke data en welke menselijke controle ertoe doen.",
    href: "/ai-development",
    solutions: [
      {
        id: "ai-agents",
        title: "AI Agents",
        summary: "Wanneer proces, data en controle klaar zijn.",
        href: "/ai-development#ai-agents",
      },
      {
        id: "workflow-automatisering",
        title: "Workflow-automatisering",
        summary: "Repetitieve stappen met checkpoints waar nodig.",
        href: "/ai-development#workflow-automatisering",
      },
      {
        id: "maatwerk-ai-software",
        title: "Maatwerk AI-software",
        summary: "Software op maat, gebouwd op eerdere analyse.",
        href: "/ai-development#maatwerk-ai-software",
      },
      {
        id: "website-scan",
        title: "Website Scan",
        summary:
          "Demonstratie van een scanflow voor techniek, content en vindbaarheid — los van de organisatiebrede Opportunity Scan.",
        href: "/website-scan",
        badge: "Prototype",
        prototypeNote: "Geen live crawl — vaste demodata.",
      },
    ],
  },
  sectors: {
    eyebrow: "Sectoren",
    heading: "AI in jouw sectorcontext",
    description:
      "We starten vanuit sectorprocessen en risico’s. We werken ook buiten deze focusgebieden wanneer de case het vraagt.",
    href: "/sectoren",
    items: [
      {
        id: "juridisch",
        title: "Juridische sector",
        summary: "Kenniswerk met precisie, controle en documentatie.",
        href: "/sectoren/juridische-sector",
      },
      {
        id: "finance",
        title: "Financiële sector",
        summary: "Volume en compliance — automatisering met controle.",
        href: "/sectoren/financiele-sector",
      },
      {
        id: "kennis",
        title: "Kennisintensieve organisaties",
        summary: "Schaalbaar kenniswerk zonder kwaliteit te verliezen.",
        href: "/sectoren/kennisintensieve-organisaties",
      },
    ],
  },
  opportunityScan: {
    eyebrow: "AI Opportunity Scan",
    heading: "Eerste indicatie van je AI-potentieel",
    body: "Beantwoord vragen over processen, uren en automatiseerbaarheid. Je krijgt een opportunity score en een bandbreedte voor indicatieve potentiële tijdswaarde — geen besparings- of ROI-garantie.",
    disclaimer:
      "Zelfgerapporteerd en indicatief. Vervangt geen proces-, technische of risicoanalyse. Implementatie-, onderhouds- en adoptiekosten zijn niet meegenomen.",
    cta: {
      label: "Start de Opportunity Scan",
      href: "/ai-opportunity-scan",
    },
  },
  about: {
    eyebrow: "Over Geniuz",
    heading: "Consultancy met eigen uitvoeringskracht",
    body: "Geniuz combineert businessanalyse, technologie en ondernemerschap. We positioneren ons eerlijk: geen groot bureau-theater, wel de drive om te onderzoeken wat werkt en het vervolgens te bouwen.",
    href: "/over-ons",
    founders: [
      {
        id: "ruchan",
        name: "Ruchan Genc",
        role: "Oprichter",
        bio: "Ondernemende en digitale achtergrond in webdesign, websites en digitale oplossingen. Verdiept zich actief in AI en praktische toepassing.",
      },
      {
        id: "cihan",
        name: "Cihan Uz",
        role: "Oprichter",
        bio: "HBO Business IT en ervaring met consultancy- en onderzoeksopdrachten binnen zijn opleiding. Focus op analyse, structuur en uitvoerbare richting.",
      },
    ],
  },
  insights: {
    eyebrow: "Insights",
    heading: "Kennis zonder hype",
    body: "Artikelen verschijnen alleen wanneer ze inhoudelijk klaar zijn. Tot die tijd geen filler-SEO.",
    href: "/insights",
    emptyLabel: "Nog geen gepubliceerde artikelen.",
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    heading: "Kort en duidelijk",
    items: [
      {
        id: "wat-doet-geniuz",
        question: "Wat doet Geniuz precies?",
        answer:
          "We helpen organisaties eerst te begrijpen waar AI waarde oplevert, en bouwen daarna wat werkelijk nodig is — consultancy, development en training in samenhang.",
      },
      {
        id: "opportunity-vs-website",
        question: "Wat is het verschil tussen de Opportunity Scan en de Website Scan?",
        answer:
          "De AI Opportunity Scan geeft een indicatie op organisatieniveau (processen, tijdswaarde). De Website Scan is in deze fase een expliciet prototype met vaste demodata — geen live crawl van jouw site.",
      },
      {
        id: "resultaten",
        question: "Garanderen jullie besparing of ROI?",
        answer:
          "Nee. We spreken van indicatieve potentiële tijdswaarde en opportunity-scores op basis van zelfgerapporteerde input. Dat vervangt geen businesscase of diepgaande analyse.",
      },
      {
        id: "sectoren",
        question: "Werken jullie alleen in juridisch, finance en kenniswerk?",
        answer:
          "Die sectoren zijn onze focus, maar we werken ook daarbuiten wanneer processen, data en adoptie een zinvolle case vormen.",
      },
      {
        id: "volgende-stap",
        question: "Wat is een goede eerste stap?",
        answer:
          "Plan een vrijblijvend adviesgesprek, of start de AI Opportunity Scan voor een eerste indicatie. Daarna bepalen we samen of dieper onderzoek zinvol is.",
      },
    ],
  },
  finalCta: {
    heading: "Klaar om te onderzoeken wat AI voor jullie kan betekenen?",
    body: "Plan een vrijblijvend adviesgesprek. Geen pitchdeck-theater — wel een eerlijk gesprek over processen, prioriteiten en volgende stappen.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}
