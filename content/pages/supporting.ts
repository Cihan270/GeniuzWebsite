import type {
  InsightsIndexContent,
  LegalPageContent,
  NotFoundContent,
} from "@/content/pages/types"
import { ORGANIZATION } from "@/lib/site"

export const notFoundPage: NotFoundContent = {
  eyebrow: "404",
  h1: "Deze pagina bestaat niet",
  lead: "Waarschijnlijk klopt het adres niet, of is de link verouderd. Hieronder staat waar je wel terechtkunt.",
  primaryCta: { label: "Naar de homepage", href: "/" },
  secondaryCta: { label: "Neem contact op", href: "/contact" },
  destinationsHeading: "Populaire bestemmingen",
  destinations: [
    {
      id: "consultancy",
      title: "AI Consultancy",
      summary: "Onderzoeken waar AI zinvol is, vóór er iets gebouwd wordt.",
      href: "/ai-consultancy",
    },
    {
      id: "development",
      title: "AI Development",
      summary: "Agents, workflows en maatwerk, gebouwd op analyse.",
      href: "/ai-development",
    },
    {
      id: "training",
      title: "AI Training",
      summary: "Workshops en kaders zodat technologie ook echt landt.",
      href: "/ai-training",
    },
    {
      id: "opportunity-scan",
      title: "AI Opportunity Scan",
      summary: "Een eerste indicatie van je AI-potentieel, in een paar minuten.",
      href: "/ai-opportunity-scan",
    },
    {
      id: "insights",
      title: "Insights",
      summary: "Artikelen over automatisering, strategie en implementatie.",
      href: "/insights",
    },
    {
      id: "over-ons",
      title: "Over Geniuz",
      summary: "Wie we zijn en hoe we werken.",
      href: "/over-ons",
    },
  ],
}

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

/** Bijwerken zodra de inhoud van privacy/cookiebeleid wijzigt. */
const LEGAL_LAST_UPDATED = "2026-09-06"

export const privacyPage: LegalPageContent = {
  kind: "legal",
  routeId: "privacy",
  locale: "nl",
  path: "/privacy",
  legalStatus: "published",
  lastUpdated: LEGAL_LAST_UPDATED,
  showIdentity: true,
  eyebrow: "Juridisch",
  h1: "Privacyverklaring",
  lead: "Hoe Geniuz omgaat met persoonsgegevens die via deze website worden verwerkt.",
  seo: {
    title: "Privacyverklaring | Geniuz",
    description:
      "Hoe Geniuz omgaat met persoonsgegevens via deze website: welke gegevens we verwerken, waarom, hoe lang en welke rechten je hebt.",
  },
  sections: [
    {
      id: "wie",
      heading: "Wie verwerkt je gegevens",
      body: `${ORGANIZATION.legalName} is verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden verwerkt. Je vindt onze volledige gegevens hierboven. Heb je een vraag over je gegevens, mail dan naar ${ORGANIZATION.email}.`,
    },
    {
      id: "gegevens",
      heading: "Welke gegevens we verwerken",
      body: "We verzamelen alleen wat je zelf invult of wat nodig is om de site te laten werken. We vragen nooit om bijzondere persoonsgegevens en we kopen geen gegevens in bij derden.",
      items: [
        "Contactformulier: je naam, e-mailadres, organisatie (optioneel), het gekozen onderwerp en de inhoud van je bericht.",
        "AI Opportunity Scan: je naam, e-mailadres en organisatie wanneer je je resultaat ontgrendelt, samen met de antwoorden die je hebt ingevuld. Je voortgang staat daarnaast lokaal in je eigen browser, niet op onze servers.",
        "Website Scan: de URL die je zelf opgeeft. Wij halen die pagina op en analyseren de publiek beschikbare inhoud. We bewaren het rapport niet en koppelen het niet aan jou.",
        "Gebruiksstatistieken: alleen als je daarvoor toestemming geeft. Geaggregeerd en anoniem — geen profielen, geen tracking over websites heen.",
        "Technische logging: onze hostingprovider legt standaard verzoekgegevens vast, waaronder IP-adres, voor beveiliging en het oplossen van storingen.",
      ],
    },
    {
      id: "doelen",
      heading: "Waarom we ze verwerken",
      body: "Elke verwerking heeft een doel en een grondslag onder de AVG.",
      items: [
        "Reageren op je bericht of aanvraag — grondslag: uitvoering van of aanloop naar een overeenkomst (art. 6 lid 1 sub b AVG).",
        "Je scanresultaat toesturen en desgewenst opvolgen — grondslag: gerechtvaardigd belang bij zakelijke dienstverlening (art. 6 lid 1 sub f AVG). Je kunt hier altijd bezwaar tegen maken.",
        "De website verbeteren met gebruiksstatistieken — grondslag: jouw toestemming (art. 6 lid 1 sub a AVG). Je kunt die toestemming altijd intrekken.",
        "Beveiliging en storingsafhandeling — grondslag: gerechtvaardigd belang bij een werkende, veilige website.",
        "Voldoen aan wettelijke verplichtingen, zoals de fiscale bewaarplicht — grondslag: wettelijke plicht (art. 6 lid 1 sub c AVG).",
      ],
    },
    {
      id: "bewaartermijnen",
      heading: "Hoe lang we ze bewaren",
      body: "We bewaren gegevens niet langer dan nodig voor het doel waarvoor we ze kregen.",
      items: [
        "Contact- en scanberichten die niet tot een opdracht leiden: tot 24 maanden na het laatste contact.",
        "Gegevens die horen bij een opdracht: gedurende de opdracht en daarna zo lang als de wet vereist — voor de administratie geldt de fiscale bewaarplicht van zeven jaar.",
        "Je cookievoorkeur: staat lokaal in je browser tot je die wist of tot twaalf maanden verstrijken.",
        "Scanvoortgang in je browser: tot je die zelf wist via je browserinstellingen.",
      ],
    },
    {
      id: "delen",
      heading: "Met wie we ze delen",
      body: "We verkopen je gegevens niet en gebruiken ze niet voor advertenties. We schakelen wel dienstverleners in die namens ons verwerken, op basis van een verwerkersovereenkomst. Op dit moment zijn dat:",
      items: [
        "Vercel Inc. — hosting van de website en, alleen na jouw toestemming, geaggregeerde gebruiksstatistieken.",
        "Resend (Plus Five Five, Inc.) — bezorging van e-mail vanaf het contactformulier en de scan.",
        "Onze e-mailprovider, voor de mailbox waarin je bericht binnenkomt.",
      ],
    },
    {
      id: "doorgifte",
      heading: "Doorgifte buiten de EER",
      body: "Vercel en Resend zijn gevestigd in de Verenigde Staten en kunnen gegevens daar verwerken. Die doorgifte vindt plaats op basis van de standaardcontractbepalingen van de Europese Commissie, aangevuld met de waarborgen die deze partijen in hun verwerkersovereenkomst bieden.",
    },
    {
      id: "rechten",
      heading: "Jouw rechten",
      body: `Je hebt het recht op inzage, correctie, verwijdering en beperking van je gegevens, het recht op dataportabiliteit, en het recht om bezwaar te maken tegen verwerking op grond van gerechtvaardigd belang. Gaf je toestemming, dan kun je die altijd intrekken zonder dat dit afdoet aan verwerkingen daarvóór. Mail je verzoek naar ${ORGANIZATION.email}; we reageren binnen een maand. Ben je het oneens met hoe we je verzoek behandelen, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.`,
    },
    {
      id: "beveiliging",
      heading: "Beveiliging",
      body: "De site draait volledig over een versleutelde verbinding (HTTPS). Toegang tot berichten en scangegevens is beperkt tot de vennoten van Geniuz. We nemen passende technische en organisatorische maatregelen, maar geen enkele online dienst kan absolute veiligheid garanderen.",
    },
    {
      id: "geautomatiseerd",
      heading: "Geautomatiseerde besluitvorming",
      body: "De AI Opportunity Scan rekent een indicatieve score uit op basis van wat je zelf invult. Dat is een rekenhulp, geen besluit over jou: er zijn geen rechtsgevolgen aan verbonden en er komt altijd een mens aan te pas voordat we ergens op handelen.",
    },
    {
      id: "wijzigingen",
      heading: "Wijzigingen",
      body: "We passen deze verklaring aan wanneer de website of onze werkwijze verandert. De datum bovenaan geeft aan wanneer we dat voor het laatst deden.",
    },
  ],
}

export const cookiebeleidPage: LegalPageContent = {
  kind: "legal",
  routeId: "cookiebeleid",
  locale: "nl",
  path: "/cookiebeleid",
  legalStatus: "published",
  lastUpdated: LEGAL_LAST_UPDATED,
  eyebrow: "Juridisch",
  h1: "Cookiebeleid",
  lead: "Welke cookies en lokale opslag deze site gebruikt, en hoe je je keuze aanpast.",
  seo: {
    title: "Cookiebeleid | Geniuz",
    description:
      "Overzicht van de cookies en lokale opslag op de website van Geniuz, en hoe je je voorkeuren beheert.",
  },
  sections: [
    {
      id: "kort",
      heading: "Kort samengevat",
      body: "Deze site gebruikt geen advertentiecookies en volgt je niet over andere websites. We plaatsen alleen wat nodig is om de site te laten werken, plus — uitsluitend als je daar toestemming voor geeft — anonieme gebruiksstatistieken.",
    },
    {
      id: "noodzakelijk",
      heading: "Noodzakelijk (altijd actief)",
      body: "Deze opslag is nodig om basisfuncties te laten werken. Hiervoor is geen toestemming vereist, omdat je er zelf om vraagt door de site te gebruiken.",
      items: [
        "NEXT_LOCALE (cookie) — onthoudt de taal van de site.",
        "geniuz_cookie_consent (lokale opslag) — bewaart je cookiekeuze, zodat we die niet elk bezoek opnieuw vragen.",
        "geniuz.opportunity-scan.v1 (lokale opslag) — bewaart je voortgang in de AI Opportunity Scan, zodat je niet opnieuw hoeft te beginnen. Blijft in je eigen browser.",
      ],
    },
    {
      id: "analytics",
      heading: "Statistieken (alleen met toestemming)",
      body: "Geef je toestemming, dan laden we Vercel Analytics: geaggregeerde, anonieme bezoekcijfers waarmee we zien welke pagina's nuttig zijn. Er worden geen profielen opgebouwd en niets wordt gedeeld met advertentienetwerken. Zonder toestemming laadt dit script niet — het staat standaard uit.",
    },
    {
      id: "niet",
      heading: "Wat we niet gebruiken",
      body: "Geen Google Analytics, geen Meta- of LinkedIn-pixel, geen advertentienetwerken, geen cross-site tracking en geen doorverkoop van gegevens.",
    },
    {
      id: "beheer",
      heading: "Je keuze aanpassen",
      body: "Bij je eerste bezoek kun je alles accepteren, alles weigeren of per categorie kiezen. Weigeren kost je geen enkele functionaliteit. Je kunt je keuze op elk moment wijzigen via de link Cookievoorkeuren onderaan iedere pagina. Wis je de opslag van deze site in je browser, dan verschijnt de vraag opnieuw.",
    },
    {
      id: "meer",
      heading: "Meer over je gegevens",
      body: "Wil je weten welke persoonsgegevens we verder verwerken, waarom en hoe lang? Dat staat in onze privacyverklaring.",
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
