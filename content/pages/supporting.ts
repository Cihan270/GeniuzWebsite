import type {
  InsightsIndexContent,
  LegalPageContent,
} from "@/content/pages/types"

export const insightsIndexPage: InsightsIndexContent = {
  kind: "editorial",
  routeId: "insights",
  locale: "nl",
  path: "/insights",
  eyebrow: "Geniuz Insights",
  h1: "AI die verder gaat dan de hype.",
  h1Accent: "de hype.",
  lead: "Praktische inzichten over AI, automatisering en digitale innovatie. Voor organisaties die willen weten wat vandaag al werkt — en waar AI daadwerkelijk waarde toevoegt.",
  seo: {
    title: "Geniuz Insights — AI, automatisering & innovatie | Geniuz",
    description:
      "Praktische inzichten over AI-automatisering, strategie en implementatie voor Nederlandse organisaties. Geen hype, wel concrete handelingsperspectief.",
  },
  emptyLabel:
    "Nog geen gepubliceerde artikelen. We publiceren alleen wanneer de inhoud klaar is.",
  sections: [
    {
      id: "intro",
      eyebrow: "Kennisbank",
      heading: "Alle artikelen",
      body: "Filter op onderwerp of blader door onze artikelen over automatisering, strategie, sector-specifieke toepassingen en AI-ontwikkeling.",
    },
  ],
  finalCta: {
    heading: "Wil je sparren over wat AI voor jouw organisatie kan betekenen?",
    body: "Plan een vrijblijvend gesprek. We kijken naar processen, prioriteiten en realistische vervolgstappen — zonder verkooppraat.",
    cta: { label: "Plan een AI-gesprek", href: "/contact" },
  },
}

const legalConceptBanner =
  "Concept — juridisch te controleren. Deze tekst is een placeholder en vormt geen AVG-, cookie- of complianceclaim."

export const privacyPage: LegalPageContent = {
  kind: "legal",
  routeId: "privacy",
  locale: "nl",
  path: "/privacy",
  legalStatus: "draft_legal_review",
  eyebrow: "Juridisch",
  h1: "Privacy",
  lead: "Concepttekst over hoe Geniuz omgaat met persoonsgegevens. Nog niet juridisch goedgekeurd.",
  conceptBanner: legalConceptBanner,
  seo: {
    title: "Privacy | Geniuz",
    description:
      "Privacybeleid van Geniuz (concept — juridisch te controleren).",
    noIndex: true,
  },
  sections: [
    {
      id: "status",
      heading: "Status van dit document",
      body: "Dit is een conceptversie voor de website. Definitieve formuleringen, rollen (verwerkingsverantwoordelijke/verwerker), bewaartermijnen en rechten volgen na juridische review. Tot die tijd claimen we geen volledigheid of compliance.",
    },
    {
      id: "wie",
      heading: "Wie is Geniuz",
      body: "Geniuz is een AI-consultancy met eigen uitvoeringskracht. Contactgegevens, KvK-nummer en vestigingsadres worden hier opgenomen zodra ze definitief zijn vastgelegd. Tot die tijd: gebruik het contactformulier op de site.",
    },
    {
      id: "gegevens",
      heading: "Welke gegevens kunnen we verwerken",
      body: "Afhankelijk van je interactie kunnen dit onder meer zijn: naam, e-mailadres, bedrijfsnaam en berichtinhoud via het contactformulier; antwoorden en voortgang bij de AI Opportunity Scan (deels lokaal in je browser); en — alleen na toestemming — anonieme gebruiksstatistieken via Vercel Analytics. We verzamelen geen marketingprofilering in deze fase.",
    },
    {
      id: "doelen",
      heading: "Doelen (concept)",
      body: "Conceptueel: reageren op contactverzoeken, scans ondersteunen, de website verbeteren op basis van geaggregeerde statistieken (indien toegestaan), en wettelijke verplichtingen nakomen waar van toepassing. Exacte rechtsgrondslagen volgen in de juridische versie.",
    },
    {
      id: "delen",
      heading: "Delen met derden (concept)",
      body: "Technische verwerkers (bijvoorbeeld hosting, e-mailbezorging via Resend, en optioneel Vercel Analytics) kunnen gegevens verwerken in opdracht van Geniuz. Een actuele verwerkerslijst volgt na review. We verkopen geen persoonsgegevens.",
    },
    {
      id: "rechten",
      heading: "Jouw rechten",
      body: "Onder toepasselijk recht kun je rechten hebben rond inzage, correctie, verwijdering en bezwaar. Hoe je die uitoefent, en binnen welke termijnen, wordt hier beschreven na juridische afronding. Neem voorlopig contact op via het contactformulier — zonder dat dit een formele procedure claimt.",
    },
    {
      id: "contact",
      heading: "Contact over privacy",
      body: "Voor vragen over dit concept: gebruik de contactpagina. Een dedicated privacy-e-mailadres volgt wanneer de organisatiegegevens definitief zijn.",
    },
  ],
}

export const cookiebeleidPage: LegalPageContent = {
  kind: "legal",
  routeId: "cookiebeleid",
  locale: "nl",
  path: "/cookiebeleid",
  legalStatus: "draft_legal_review",
  eyebrow: "Juridisch",
  h1: "Cookiebeleid",
  lead: "Conceptoverzicht van cookies en lokale opslag op deze site. Geen marketingcookies in deze fase.",
  conceptBanner: legalConceptBanner,
  seo: {
    title: "Cookiebeleid | Geniuz",
    description:
      "Cookiebeleid van Geniuz (concept — juridisch te controleren).",
    noIndex: true,
  },
  sections: [
    {
      id: "status",
      heading: "Status van dit document",
      body: "Dit cookiebeleid is een concept. Het beschrijft alleen wat de site in deze fase daadwerkelijk gebruikt. Het is geen volledige of goedgekeurde cookiemelding onder ePrivacy/AVG.",
    },
    {
      id: "noodzakelijk",
      heading: "Noodzakelijke opslag",
      body: "We slaan lokaal op: je cookie-/consentkeuze, de sitetaal (Nederlands via een locale-cookie) en tijdelijke voortgang van scans in localStorage. Zonder deze opslag werken die basisfuncties niet betrouwbaar.",
    },
    {
      id: "analytics",
      heading: "Analytics (optioneel)",
      body: "Als je daarvoor toestemming geeft, laden we Vercel Analytics voor geaggregeerde, anonieme gebruiksstatistieken. Analytics staat standaard uit tot je expliciet toestemt. Er is geen Google Analytics, Microsoft Clarity of marketingpixel in deze fase.",
    },
    {
      id: "niet",
      heading: "Wat we niet doen in deze fase",
      body: "Geen marketingcookies, geen advertentienetwerken, geen cross-site tracking en geen ‘toekomstige’ cookiecategorieën zonder bijbehorende techniek.",
    },
    {
      id: "beheer",
      heading: "Voorkeuren beheren",
      body: "Bij je eerste bezoek kun je via de cookiebanner alles accepteren, alles weigeren of je voorkeuren per categorie instellen. Je kunt je keuze later wijzigen via de link Cookievoorkeuren in de footer. Je kunt localStorage in je browser wissen om de banner opnieuw te zien.",
    },
  ],
}

export const algemeneVoorwaardenPage: LegalPageContent = {
  kind: "legal",
  routeId: "algemene-voorwaarden",
  locale: "nl",
  path: "/algemene-voorwaarden",
  legalStatus: "draft_legal_review",
  eyebrow: "Juridisch",
  h1: "Algemene voorwaarden",
  lead: "Conceptkader voor dienstverlening via Geniuz. Nog niet juridisch goedgekeurd of bindend als definitieve voorwaarden.",
  conceptBanner: legalConceptBanner,
  seo: {
    title: "Algemene voorwaarden | Geniuz",
    description:
      "Algemene voorwaarden van Geniuz (concept — juridisch te controleren).",
    noIndex: true,
  },
  sections: [
    {
      id: "status",
      heading: "Status van dit document",
      body: "Dit is een concept. Tot juridische review en publicatie van een definitieve versie gelden eventuele projectafspraken in offertes of overeenkomsten boven deze tekst. Deze pagina creëert geen rechten of plichten op zichzelf.",
    },
    {
      id: "diensten",
      heading: "Diensten (concept)",
      body: "Geniuz biedt AI-consultancy, development en training. Concrete scope, planning en prijs volgen uit een aparte overeenkomst of opdrachtbevestiging — niet uit deze websitepagina.",
    },
    {
      id: "offertes",
      heading: "Offertes en overeenkomsten",
      body: "Concept: offertes zijn vrijblijvend tot schriftelijke aanvaarding, tenzij anders vermeld. Wijzigingen in scope kunnen leiden tot aangepaste planning of kosten. Details volgen in de juridische versie.",
    },
    {
      id: "intellectueel",
      heading: "Intellectueel eigendom (concept)",
      body: "Placeholder: rechten op geleverde materialen, code en documentatie worden per opdracht vastgelegd. Niets op deze pagina vormt een overdracht van IP.",
    },
    {
      id: "aansprakelijkheid",
      heading: "Aansprakelijkheid (concept)",
      body: "Placeholder voor beperkingen, uitsluitingen en verzekering. Indicatieve scans en prototypes op de website zijn geen adviesgarantie en vervangen geen trajectanalyse of businesscase.",
    },
    {
      id: "recht",
      heading: "Toepasselijk recht (concept)",
      body: "Het toepasselijke recht, forumkeuze en overige slotbepalingen worden hier opgenomen na juridische afronding.",
    },
  ],
}
