import type { ServiceHubContent } from "@/content/pages/types"

export const aiConsultancyPage: ServiceHubContent = {
  kind: "service-hub",
  routeId: "ai-consultancy",
  locale: "nl",
  path: "/ai-consultancy",
  h1: "AI-consultancy die eerst waarde onderzoekt",
  h1Accent: "waarde onderzoekt",
  seo: {
    title: "AI Consultancy | Geniuz",
    description:
      "AI-consultancy voor organisaties die eerst willen begrijpen waar AI waarde oplevert — onderzoek, prioritering en roadmap vóór bouw.",
  },
  eyebrow: "AI Consultancy",
  lead: "We onderzoeken processen, knelpunten en haalbaarheid voordat er tools of agents worden gebouwd. Zo voorkom je pilots zonder adoptie — en bouw je alleen wat werkelijk nodig is.",
  primaryCta: {
    label: "Plan een adviesgesprek",
    href: "/contact",
  },
  secondaryCta: {
    label: "Start de Opportunity Scan",
    href: "/ai-opportunity-scan",
  },
  sections: [
    {
      id: "intro",
      heading: "Eerst begrijpen, dan bouwen",
      body: "Veel AI-trajecten starten bij een toolkeuze. Wij starten bij het proces: waar zit repetitie, waar zit risico, en waar is menselijke controle onmisbaar? Pas daarna volgt een roadmap — en indien nodig eigen development.",
    },
    {
      id: "voor-wie",
      eyebrow: "Voor wie",
      heading: "Organisaties die richting willen vóór investering",
      body: "Voor teams die AI serieus willen inzetten, maar geen losse pilots of schijn-ROI. Denk aan kenniswerk, compliancegevoelige processen en organisaties die adoptie even zwaar wegen als techniek.",
    },
  ],
  offeringsHeading: "Wat we doen binnen consultancy",
  offeringsDescription:
    "Vier bouwstenen die we los of in samenhang inzetten, afhankelijk van waar je organisatie staat.",
  offerings: [
    {
      id: "ai-scan",
      title: "AI-scan",
      summary: "Snel inzicht in kansen, risico’s en volgende stappen.",
      body: "Een gerichte intake over processen, data en volwassenheid. Je krijgt een helder beeld van waar onderzoek zinvol is — zonder belofte van besparing of ROI.",
      anchorId: "ai-scan",
    },
    {
      id: "procesanalyse",
      title: "Procesanalyse",
      summary: "Processen in kaart vóór automatisering of agents.",
      body: "We leggen stappen, uitzonderingen, systemen en beslispunten vast. Dat voorkomt dat je automatiseert wat eerst herontworpen of gestandaardiseerd moet worden.",
      anchorId: "procesanalyse",
    },
    {
      id: "ai-strategie",
      title: "AI-strategie",
      summary: "Van losse pilots naar samenhangende AI-richting.",
      body: "Prioriteiten, kaders en keuzes die passen bij jullie organisatie — inclusief wat je bewust níet doet. Strategie zonder uitvoeringspad blijft een document; daarom houden we development dichtbij.",
      anchorId: "ai-strategie",
    },
    {
      id: "roi-roadmap",
      title: "Prioriteringsroadmap",
      summary: "Prioriteren op haalbaarheid, waarde en adoptie — geen schijn-ROI.",
      body: "We ordenen kansen op impact, complexiteit en adoptiekans. Waar we over tijdswaarde spreken, is dat indicatief en zelfgerapporteerd — geen businesscase-vervanging.",
      anchorId: "roi-roadmap",
    },
  ],
  process: {
    eyebrow: "Werkwijze",
    heading: "Vijf stappen, zonder verzonnen doorlooptijden",
    body: "Elke stap is concreet genoeg om te sturen, open genoeg om aan jullie context te passen.",
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
  related: {
    eyebrow: "Vervolg",
    heading: "Van analyse naar uitvoering en adoptie",
    items: [
      {
        id: "development",
        title: "AI Development",
        summary: "Agents, workflows en integraties — gebouwd op eerdere analyse.",
        href: "/ai-development",
      },
      {
        id: "training",
        title: "AI Training",
        summary: "Workshops, managementkaders en beleid voor veilige adoptie.",
        href: "/ai-training",
      },
      {
        id: "opportunity",
        title: "AI Opportunity Scan",
        summary:
          "Indicatieve score en potentiële tijdswaarde — geen besparingsgarantie.",
        href: "/ai-opportunity-scan",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    heading: "Consultancy, kort uitgelegd",
    items: [
      {
        id: "wanneer-consultancy",
        question: "Wanneer heeft AI-consultancy zin?",
        answer:
          "Als je vermoedt dat AI kan helpen, maar nog niet weet waar, met welke risico’s, en in welke volgorde. Consultancy voorkomt dat je eerst een tool koopt en daarna pas het proces begrijpt.",
      },
      {
        id: "roi",
        question: "Leveren jullie een ROI-berekening?",
        answer:
          "Nee. We prioriteren op haalbaarheid, waarde en adoptie. Indicatieve tijdswaarde uit scans of intake is geen businesscase en vervangt geen diepere analyse.",
      },
      {
        id: "daarna-bouwen",
        question: "Bouwen jullie ook wat jullie adviseren?",
        answer:
          "Ja, wanneer dat past. Geniuz combineert consultancy met eigen development — zodat de roadmap niet eindigt bij een slide.",
      },
    ],
  },
  finalCta: {
    heading: "Wil je eerst begrijpen waar AI waarde oplevert?",
    body: "Plan een vrijblijvend adviesgesprek. We kijken naar processen, prioriteiten en of dieper onderzoek zinvol is.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}
