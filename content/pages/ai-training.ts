import type { ServiceHubContent } from "@/content/pages/types"

export const aiTrainingPage: ServiceHubContent = {
  kind: "service-hub",
  routeId: "ai-training",
  locale: "nl",
  path: "/ai-training",
  h1: "Training die adoptie en beleid versterkt",
  h1Accent: "adoptie en beleid versterkt",
  seo: {
    title: "AI Training | Geniuz",
    description:
      "AI-training voor management en medewerkers: workshops, vaardigheden en beleid — gericht op veilige, bruikbare adoptie.",
  },
  eyebrow: "AI Training",
  lead: "Zonder adoptie en duidelijke kaders blijft AI een pilot. Training verbindt tooling met dagelijks werk — voor management én medewerkers, met aandacht voor verantwoord gebruik.",
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
      heading: "Technologie volgt mensen",
      body: "Nieuwe tools landen alleen als mensen weten wanneer ze die wél en níet gebruiken, hoe ze kwaliteit bewaken, en welke kaders de organisatie stelt. Training is daarom geen bijzaak na oplevering.",
    },
    {
      id: "context",
      eyebrow: "Aanpak",
      heading: "Praktijkgericht, niet generiek hype",
      body: "Sessies en programma’s sluiten aan op jullie processen en risico’s. Geen eindeloze tool-demo’s zonder werkcontext — wel oefenen, besliskaders en afspraken die blijven hangen.",
    },
  ],
  offeringsHeading: "Onze programma’s",
  offeringsDescription:
    "Vier richtingen, van praktische workshops tot beleid en managementkaders. We stemmen inhoud en niveau af op je team.",
  offerings: [
    {
      id: "workshops",
      title: "Workshops",
      summary: "Hands-on sessies gekoppeld aan jullie processen.",
      body: "Korte, gerichte sessies waarin teams AI toepassen op eigen voorbeelden — met ruimte voor twijfel, fouten en scherpe criteria voor kwaliteit.",
      anchorId: "workshops",
    },
    {
      id: "managementtraining",
      title: "Managementtraining",
      summary: "Besliskaders voor prioritering, risico’s en investeringen.",
      body: "Voor leidinggevenden die keuzes moeten maken over pilots, leveranciers en adoptie — zonder schijnzekerheid over ROI of compliance.",
      anchorId: "managementtraining",
    },
    {
      id: "medewerkers",
      title: "Medewerkerstraining",
      summary: "Vaardigheden en werkwijzen voor veilig dagelijks gebruik.",
      body: "Prompting alleen is niet genoeg: we oefenen controle, brongebruik, escalatie en wanneer menselijk oordeel verplicht blijft.",
      anchorId: "medewerkers",
    },
    {
      id: "ai-beleid-veiligheid",
      title: "AI-beleid & veiligheid",
      summary: "Kaders voor verantwoord gebruik zonder compliance-theater.",
      body: "Praktische afspraken over data, tools en verantwoordelijkheden. Geen lege AVG-claims — wel duidelijke werkafspraken die juridische review later kunnen voeden.",
      anchorId: "ai-beleid-veiligheid",
    },
  ],
  related: {
    eyebrow: "Samenhang",
    heading: "Training versterkt consultancy en development",
    items: [
      {
        id: "consultancy",
        title: "AI Consultancy",
        summary: "Richting en prioritering vóór of naast training.",
        href: "/ai-consultancy",
      },
      {
        id: "development",
        title: "AI Development",
        summary: "Oplossingen die mensen ook echt moeten kunnen gebruiken.",
        href: "/ai-development",
      },
      {
        id: "sectoren",
        title: "Sectoren",
        summary: "Context voor juridisch, finance en kennisintensief werk.",
        href: "/sectoren",
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    heading: "Training, kort uitgelegd",
    items: [
      {
        id: "interne-vs-extern",
        question: "Vervangt training jullie consultancy?",
        answer:
          "Nee. Training versnelt adoptie en scherpt kaders. Consultancy en development blijven nodig wanneer processen, prioriteiten of software nog openstaan.",
      },
      {
        id: "beleid-avg",
        question: "Leveren jullie een AVG-proof AI-beleid?",
        answer:
          "Nee. We helpen met praktische kaders en werkwijzen. Juridische toetsing blijft bij jullie adviseurs — wij claimen geen compliancegarantie.",
      },
      {
        id: "op-maat",
        question: "Zijn sessies op maat of standaard?",
        answer:
          "Altijd met jullie context. De opbouw is herbruikbaar; voorbeelden, risico’s en oefeningen volgen jullie processen.",
      },
    ],
  },
  finalCta: {
    heading: "Wil je adoptie net zo serieus nemen als de techniek?",
    body: "Plan een gesprek over workshops, managementkaders of beleid — afgestemd op jullie team.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}
