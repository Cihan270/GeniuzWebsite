import type {
  SectorHubContent,
  SectorPageContent,
} from "@/content/pages/types"

export const sectorenHubPage: SectorHubContent = {
  kind: "sector-hub",
  routeId: "sectoren",
  locale: "nl",
  path: "/sectoren",
  h1: "AI in jouw sector",
  seo: {
    title: "Sectoren | Geniuz",
    description:
      "AI-consultancy en uitvoering voor juridische, financiële en kennisintensieve organisaties.",
  },
  eyebrow: "Sectoren",
  lead: "Elke sector heeft eigen processen, risico’s en adoptiedrempels. We starten vanuit die context — niet vanuit een generieke toolpitch.",
  sections: [
    {
      id: "intro",
      heading: "Sectorcontext eerst",
      body: "Juridisch, finance en kennisintensief werk delen één kenmerk: kwaliteit en controle wegen zwaar. AI helpt alleen als die kaders helder zijn en mensen weten waar hun oordeel blijft.",
    },
  ],
  sectorsHeading: "Focussectoren",
  sectorsDescription:
    "Drie gebieden waarin we processen, risico’s en adoptie goed herkennen. We werken ook daarbuiten wanneer de case het vraagt.",
  sectors: [
    {
      id: "juridisch",
      title: "Juridische sector",
      summary:
        "Kenniswerk met precisie, documentatie en zorgvuldige controle.",
      href: "/sectoren/juridische-sector",
    },
    {
      id: "finance",
      title: "Financiële sector",
      summary:
        "Volume en controle: automatisering zonder schijnzekerheid.",
      href: "/sectoren/financiele-sector",
    },
    {
      id: "kennis",
      title: "Kennisintensieve organisaties",
      summary:
        "Schaalbaar kenniswerk zonder kwaliteit te verliezen.",
      href: "/sectoren/kennisintensieve-organisaties",
    },
  ],
  note: "Werk je in een andere sector? Als processen, data en adoptie een zinvolle case vormen, denken we graag mee — zonder geforceerde sectorclaim.",
  finalCta: {
    heading: "Wil je AI bekijken vanuit jullie sectorprocessen?",
    body: "Plan een vrijblijvend gesprek, of start met de Opportunity Scan voor een eerste indicatie.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}

export const sectorJuridischPage: SectorPageContent = {
  kind: "sector",
  sectorKey: "juridische-sector",
  routeId: "sectoren-juridische-sector",
  locale: "nl",
  path: "/sectoren/juridische-sector",
  h1: "AI in juridische organisaties",
  seo: {
    title: "AI voor de juridische sector | Geniuz",
    description:
      "AI-consultancy voor juridische organisaties: processen, kenniswerk en verantwoorde automatisering zonder hype.",
  },
  eyebrow: "Juridische sector",
  lead: "Juridische processen vragen om precisie, controle en documentatie. AI helpt alleen als die kaders helder zijn — en als mensen blijven waar oordeel en verantwoordelijkheid horen.",
  sections: [
    {
      id: "intro",
      heading: "Kenniswerk met zorgvuldigheid",
      body: "Van dossierwerk tot kennisdeling: er is ruimte om repetitie te verminderen, zonder kwaliteit of geheimhouding te ondermijnen. We starten bij het proces, niet bij de tool.",
    },
  ],
  challenges: {
    eyebrow: "Herkenbaar",
    heading: "Waar het vaak knelt",
    items: [
      {
        id: "documenten",
        title: "Documentintensief werk",
        body: "Zoeken, samenvatten en structureren kost tijd — terwijl nuance en broncontrole onmisbaar blijven.",
      },
      {
        id: "kennis",
        title: "Kennis zit in mensen",
        body: "Ervaring is lastig overdraagbaar. AI kan ondersteunen, maar vervangt geen vakmanschap of toetsing.",
      },
      {
        id: "tools",
        title: "Tools zonder procesafspraken",
        body: "Losse AI-tools zonder beleid of workflow creëren risico’s sneller dan ze tijd opleveren.",
      },
    ],
  },
  focusAreas: {
    eyebrow: "Focus",
    heading: "Waar we typisch naar kijken",
    items: [
      {
        id: "kenniswerk",
        title: "Ondersteuning van kenniswerk",
        body: "Voorbereiding, structurering en terugvinden van informatie — met menselijke controle op uitkomsten.",
      },
      {
        id: "processen",
        title: "Processen en intake",
        body: "Herhaalbare stappen in intake, status en documentstromen die zich lenen voor gerichte automatisering.",
      },
      {
        id: "adoptie",
        title: "Adoptie en kaders",
        body: "Wanneer welke tool, welke data, en wanneer escalatie verplicht is — zonder compliance-theater.",
      },
    ],
  },
  approach: {
    eyebrow: "Aanpak",
    heading: "Onderzoeken vóór bouwen",
    body: "We brengen knelpunten en risico’s in kaart, prioriteren op haalbaarheid en adoptie, en bouwen of trainen alleen wat de case draagt. Geen verzonnen besparingscijfers of cases.",
  },
  relatedServices: {
    eyebrow: "Diensten",
    heading: "Relevant voor juridische organisaties",
    items: [
      {
        id: "consultancy",
        title: "AI Consultancy",
        summary: "Procesanalyse en prioritering vóór investering.",
        href: "/ai-consultancy",
      },
      {
        id: "development",
        title: "AI Development",
        summary: "Workflows en maatwerk op basis van analyse.",
        href: "/ai-development",
      },
      {
        id: "training",
        title: "AI Training",
        summary: "Vaardigheden en beleid voor veilig gebruik.",
        href: "/ai-training",
      },
    ],
  },
  finalCta: {
    heading: "Wil je AI toetsen op jullie juridische processen?",
    body: "Plan een vrijblijvend adviesgesprek. We kijken eerlijk of onderzoek, bouw of training de juiste volgende stap is.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}

export const sectorFinancePage: SectorPageContent = {
  kind: "sector",
  sectorKey: "financiele-sector",
  routeId: "sectoren-financiele-sector",
  locale: "nl",
  path: "/sectoren/financiele-sector",
  h1: "AI in financiële dienstverlening",
  seo: {
    title: "AI voor finance | Geniuz",
    description:
      "AI-consultancy voor de financiële sector: prioritering, processen en uitvoering met oog voor controle en adoptie.",
  },
  eyebrow: "Financiële sector",
  lead: "Financiële processen combineren volume met controle. We zoeken waar automatisering past — zonder schijnzekerheid over besparing, ROI of compliance.",
  sections: [
    {
      id: "intro",
      heading: "Waarde met controle",
      body: "Repetitieve stappen kunnen sneller. Beslissingen met impact, uitzonderingen en rapportage blijven mensenwerk — of krijgen expliciete checkpoints. Die scheiding maken we bewust.",
    },
  ],
  challenges: {
    eyebrow: "Herkenbaar",
    heading: "Waar het vaak knelt",
    items: [
      {
        id: "volume",
        title: "Hoog volume, veel herhaling",
        body: "Handmatige stappen stapelen zich op, terwijl uitzonderingen de doorlooptijd blijven bepalen.",
      },
      {
        id: "controle",
        title: "Controle versus snelheid",
        body: "Automatisering zonder audittrail of heldere overdracht creëert meer risico dan tijdswinst.",
      },
      {
        id: "pilots",
        title: "Pilots zonder prioritering",
        body: "Experimenten starten voordat duidelijk is welk proces, welke data en welke adoptie ertoe doen.",
      },
    ],
  },
  focusAreas: {
    eyebrow: "Focus",
    heading: "Waar we typisch naar kijken",
    items: [
      {
        id: "workflows",
        title: "Workflows met checkpoints",
        body: "Herhaalbare stromen versnellen, met menselijke controle waar oordeel of verantwoordelijkheid ligt.",
      },
      {
        id: "integraties",
        title: "Integraties met bestaande systemen",
        body: "AI verbinden met CRM, administratie of data die je al gebruikt — geen eiland naast het primaire proces.",
      },
      {
        id: "sturing",
        title: "Sturing en adoptie",
        body: "Managementkaders voor prioritering en medewerkers die weten wanneer ze AI wél en níet inzetten.",
      },
    ],
  },
  approach: {
    eyebrow: "Aanpak",
    heading: "Prioriteren op haalbaarheid en controle",
    body: "Eerst processen en risico’s, dan roadmap, dan bouw of training. Indicatieve tijdswaarde uit scans is geen businesscase — en implementatiekosten nemen we niet stilzwijgend mee als ‘besparing’.",
  },
  relatedServices: {
    eyebrow: "Diensten",
    heading: "Relevant voor finance",
    items: [
      {
        id: "consultancy",
        title: "AI Consultancy",
        summary: "Onderzoek en prioriteringsroadmap zonder schijn-ROI.",
        href: "/ai-consultancy",
      },
      {
        id: "development",
        title: "AI Development",
        summary: "Workflows, agents en integraties op analyse.",
        href: "/ai-development",
      },
      {
        id: "opportunity",
        title: "AI Opportunity Scan",
        summary: "Indicatieve score en tijdswaarde — zelfgerapporteerd.",
        href: "/ai-opportunity-scan",
      },
    ],
  },
  finalCta: {
    heading: "Wil je AI prioriteren met oog voor controle?",
    body: "Plan een gesprek over processen, risico’s en een realistische volgende stap.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}

export const sectorKennisPage: SectorPageContent = {
  kind: "sector",
  sectorKey: "kennisintensieve-organisaties",
  routeId: "sectoren-kennisintensieve-organisaties",
  locale: "nl",
  path: "/sectoren/kennisintensieve-organisaties",
  h1: "AI waar kenniswerk schaalbaar moet",
  seo: {
    title: "AI voor kennisintensieve organisaties | Geniuz",
    description:
      "AI voor kennisintensieve organisaties: van analyse tot implementatie, gericht op schaalbaar kenniswerk.",
  },
  eyebrow: "Kennisintensieve organisaties",
  lead: "Kenniswerk schaalt slecht met alleen meer FTE. AI kan helpen — als processen, data en kwaliteitscriteria het toelaten, en als mensen blijven sturen op inhoud.",
  sections: [
    {
      id: "intro",
      heading: "Schaal zonder kwaliteit te verliezen",
      body: "Adviesbureaus, onderzoeks- en expertiseorganisaties en vergelijkbare teams delen een spanning: meer vraag, beperkte capaciteit, hoge inhoudelijke lat. We zoeken waar ondersteuning zinvol is zonder de lat te verlagen.",
    },
  ],
  challenges: {
    eyebrow: "Herkenbaar",
    heading: "Waar het vaak knelt",
    items: [
      {
        id: "capaciteit",
        title: "Capaciteit versus inhoud",
        body: "Senior tijd gaat op aan herhaalbaar voorbereidingswerk dat beter ondersteund kan worden.",
      },
      {
        id: "kennisbasis",
        title: "Verspreide kennis",
        body: "Inzichten zitten in documenten, hoofden en projecten — moeilijk terugvindbaar, moeilijk overdraagbaar.",
      },
      {
        id: "kwaliteit",
        title: "Kwaliteit onder druk",
        body: "Sneller produceren mag nooit betekenen dat bronnen, nuance of toetsing verdwijnen.",
      },
    ],
  },
  focusAreas: {
    eyebrow: "Focus",
    heading: "Waar we typisch naar kijken",
    items: [
      {
        id: "kennisassistentie",
        title: "Kennisassistentie",
        body: "Zoeken, structureren en voorbereiden van materiaal — met expliciete menselijke review.",
      },
      {
        id: "workflows",
        title: "Project- en deliveryworkflows",
        body: "Herhaalbare stappen in voorstellen, rapportages of kenniscycli die zich lenen voor gerichte automatisering.",
      },
      {
        id: "vaardigheden",
        title: "Vaardigheden en beleid",
        body: "Teams die AI veilig en kritisch gebruiken, met afspraken die bij jullie werk passen.",
      },
    ],
  },
  approach: {
    eyebrow: "Aanpak",
    heading: "Van knelpunt naar uitvoerbare richting",
    body: "We analyseren waar tijd en kwaliteit botsen, prioriteren realistisch, en combineren consultancy met development en training waar dat nodig is. Geen opgeblazen cases of resultaatclaims.",
  },
  relatedServices: {
    eyebrow: "Diensten",
    heading: "Relevant voor kenniswerk",
    items: [
      {
        id: "consultancy",
        title: "AI Consultancy",
        summary: "Eerst begrijpen waar schaal zinvol is.",
        href: "/ai-consultancy",
      },
      {
        id: "training",
        title: "AI Training",
        summary: "Adoptie en kritische vaardigheden voor teams.",
        href: "/ai-training",
      },
      {
        id: "development",
        title: "AI Development",
        summary: "Maatwerk en workflows op jullie kennisprocessen.",
        href: "/ai-development",
      },
    ],
  },
  finalCta: {
    heading: "Wil je kenniswerk slimmer schalen — zonder de lat te verlagen?",
    body: "Plan een vrijblijvend gesprek over processen, prioriteiten en volgende stappen.",
    cta: {
      label: "Plan een adviesgesprek",
      href: "/contact",
    },
  },
}
