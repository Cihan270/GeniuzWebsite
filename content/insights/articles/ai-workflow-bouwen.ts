import {
  callout,
  h2,
  h3,
  link,
  para,
  text,
  ul,
} from "@/content/insights/helpers"
import type { Insight } from "@/content/insights/types"

export const aiWorkflowBouwen: Insight = {
  slug: "ai-workflow-bouwen",
  locale: "nl",
  title: "AI-workflow bouwen: van idee naar werkende automatisering",
  description:
    "Leer in tien stappen hoe je een AI-workflow ontwerpt die daadwerkelijk waarde oplevert — met aandacht voor menselijke controle, integraties en opschaling.",
  category: "AI Automatisering",
  publishedAt: "2026-07-17",
  imageKey: "insight-ai-workflow",
  intro:
    "Een AI-workflow is meer dan een prompt in een chatvenster. Het is een keten van stappen waarin informatie binnenkomt, wordt verwerkt, doorgestuurd naar systemen en op het juiste moment menselijke beoordeling krijgt.",
  sections: [
    para(
      text("Een AI-workflow is meer dan een prompt in een chatvenster. Het is een keten van stappen waarin informatie binnenkomt, wordt verwerkt, doorgestuurd naar systemen en op het juiste moment menselijke beoordeling krijgt."),
    ),
    para(
      text("Organisaties die alleen losse AI-tools introduceren, zien vaak beperkt effect. Organisaties die workflows ontwerpen — met duidelijke inputs, outputs, beslispunten en integraties — bouwen AI in hun operationele structuur in."),
    ),
    para(
      text("In dit artikel doorlopen we tien stappen om van idee naar werkende automatisering te komen. We sluiten af met een concreet voorbeeld. Meer context over welke processen geschikt zijn, vind je in ons artikel over "),
      link("AI-automatisering voor bedrijven", "/insights/ai-automatisering-bedrijven"),
      text("."),
    ),
    h2("Stap 1: Kies één concreet proces"),
    para(
      text("Begin klein. Kies één proces dat vaak voorkomt, duidelijk afgebakend is en waar medewerkers structureel tijd aan kwijt zijn."),
    ),
    para(text("Goede startkandidaten hebben vaak:")),
    ul(
      "veel repetitieve stappen;",
      "voorspelbare inputs (e-mail, formulier, document);",
      "beperkte maar niet nul interpretatie;",
      "integraties met bestaande systemen (CRM, ERP, ticketing);",
      "een acceptabel risicoprofiel voor automatisering.",
    ),
    para(
      text("Probeer niet meteen het hele bedrijf te transformeren. Eén goed werkende workflow levert meer op dan tien half afgemaakte experimenten."),
    ),
    h2("Stap 2: Beschrijf de huidige workflow"),
    para(
      text("Teken of beschrijf hoe het proces vandaag werkt — niet hoe het zou moeten werken op papier, maar hoe het echt loopt."),
    ),
    para(text("Noteer per stap:")),
    ul(
      "wie handelt;",
      "welk systeem wordt gebruikt;",
      "welke informatie binnenkomt;",
      "waar vertraging of fouten ontstaan;",
      "waar uitzonderingen optreden.",
    ),
    para(
      text("Deze beschrijving wordt de basis voor ontwerp en later voor testen. Zonder procesinzicht bouw je automatisering op aannames."),
    ),
    h2("Stap 3: Identificeer handmatige stappen"),
    para(
      text("Markeer welke stappen puur handmatig zijn: kopiëren, plakken, classificeren, samenvatten, doorsturen, status bijwerken."),
    ),
    para(
      text("Niet elke handmatige stap is automatiseerbaar. Sommige stappen vereisen menselijk oordeel, empathie of verantwoordelijkheid. Het doel is niet alles te elimineren, maar de juiste stappen te selecteren."),
    ),
    callout(
      "Tip",
      text("Vraag medewerkers welke stappen het meest frustrerend of tijdrovend zijn. Hun input voorkomt dat je automatiseert wat op papier logisch lijkt, maar in de praktijk zelden voorkomt."),
    ),
    h2("Stap 4: Bepaal waar AI waarde toevoegt"),
    para(
      text("Niet elke stap in een workflow vraagt om AI. Traditionele automatisering volstaat wanneer regels volledig vastliggen."),
    ),
    para(text("AI is vooral relevant wanneer het systeem moet:")),
    ul(
      "ongestructureerde tekst interpreteren;",
      "documenten of berichten classificeren;",
      "informatie samenvatten;",
      "conceptteksten genereren;",
      "vervolgstappen suggereren op basis van context.",
    ),
    para(
      text("Het verschil tussen een losse chatbot en een workflow die meerdere systemen verbindt, leggen we uit in "),
      link("AI-agent vs chatbot", "/insights/ai-agent-vs-chatbot"),
      text("."),
    ),
    h2("Stap 5: Definieer inputs en outputs"),
    para(
      text("Elke workflow heeft duidelijke grenzen nodig. Wat triggert de flow? Wat is het eindresultaat?"),
    ),
    para(text("Definieer concreet:")),
    ul(
      "trigger (bijv. nieuwe e-mail, formulierinzending, statuswijziging);",
      "verwachte inputvelden of documenttypes;",
      "output (conceptantwoord, CRM-record, taak, notificatie);",
      "succescriteria (wanneer is de flow geslaagd?).",
    ),
    para(
      text("Vage definities leiden tot vage resultaten. Hoe preciezer input en output, hoe betrouwbaarder de automatisering."),
    ),
    h2("Stap 6: Ontwerp beslispunten en menselijke controle"),
    para(
      text("Een volwassen AI-workflow bevat expliciete beslismomenten: wanneer gaat de flow door, wanneer stopt deze, wanneer schakelt een medewerker in?"),
    ),
    para(text("Ontwerp vanaf het begin:")),
    ul(
      "reviewmomenten voor AI-output;",
      "escalatie bij lage confidence of afwijkende input;",
      "logging van beslissingen en wijzigingen;",
      "duidelijke verantwoordelijkheid per stap.",
    ),
    para(
      text("Human-in-the-loop is geen achteraf-patch. Het hoort in het ontwerp, vooral wanneer fouten financiële, juridische of reputatierisico's met zich meebrengen."),
    ),
    h2("Stap 7: Kies tools en integraties"),
    para(
      text("De toolkeuze volgt uit het proces, niet andersom. Sommige workflows passen bij no-code platforms; andere vragen maatwerk integraties of een dedicated AI-agent."),
    ),
    para(text("Beoordeel tools op:")),
    ul(
      "integratiemogelijkheden met bestaande systemen;",
      "beveiliging en toegangsbeheer;",
      "mogelijkheid tot logging en monitoring;",
      "schaalbaarheid en onderhoud;",
      "kosten bij groeiend volume.",
    ),
    para(
      text("Meer over technische realisatie vind je op onze pagina "),
      link("AI Development", "/ai-development#workflow-automatisering"),
      text(", waar we workflowautomatisering als onderdeel van maatwerkoplossingen behandelen."),
    ),
    h2("Stap 8: Bouw en test een pilot"),
    para(
      text("Bouw een minimale versie van de workflow en test met echte maar beperkte data — niet alleen met voorbeelden die toevallig goed werken."),
    ),
    para(text("Test expliciet op:")),
    ul(
      "standaardgevallen;",
      "uitzonderingen en randgevallen;",
      "foutieve of incomplete input;",
      "systeemstoringen of API-fouten;",
      "gedrag wanneer AI-output wordt afgewezen.",
    ),
    para(
      text("Een pilot moet falen mogen in een gecontroleerde omgeving. Beter nu ontdekken welke uitzonderingen ontbreken dan later in productie."),
    ),
    h2("Stap 9: Meet resultaat en risico's"),
    para(
      text("Automatisering is pas succesvol wanneer je kunt aantonen wat er veranderd is — in tijd, kwaliteit, fouten of doorlooptijd."),
    ),
    para(text("Meet minimaal:")),
    ul(
      "tijd per case vóór en na automatisering;",
      "aantal handmatige interventies;",
      "foutpercentages of herstelacties;",
      "tevredenheid van gebruikers;",
      "incidenten of near-misses.",
    ),
    para(
      text("Meet ook risico's, niet alleen efficiency. Een workflow die sneller is maar vaker foutieve output produceert, is geen succes."),
    ),
    h2("Stap 10: Schaal gecontroleerd op"),
    para(
      text("Pas wanneer de pilot stabiel presteert, breid je uit naar meer gebruikers, afdelingen of procesvarianten."),
    ),
    para(text("Bij opschaling:")),
    ul(
      "update documentatie en training;",
      "monitor performance continu;",
      "plan periodieke review van prompts, regels en integraties;",
      "houd een fallback voor handmatige verwerking beschikbaar.",
    ),
    para(
      text("Opschalen zonder governance leidt tot schaduwprocessen: iedereen gebruikt AI net iets anders, zonder centrale kwaliteitscontrole."),
    ),
    h2("Voorbeeld: van e-mail naar CRM-update"),
    para(
      text("Onderstaand voorbeeld illustreert hoe stappen samenkomen in één praktische workflow voor klantenservice of sales."),
    ),
    h3("1. E-mail binnenkomst"),
    para(
      text("Een inkomende e-mail triggert de workflow. Het systeem leest afzender, onderwerp en inhoud."),
    ),
    h3("2. Classificatie"),
    para(
      text("AI bepaalt het onderwerp (offerteaanvraag, klacht, support, factuur) en schat urgentie in op basis van vooraf gedefinieerde criteria."),
    ),
    h3("3. CRM-koppeling"),
    para(
      text("De workflow zoekt een bestaand contact of organisatie in het CRM. Bij een nieuwe afzender wordt een conceptrecord aangemaakt ter review."),
    ),
    h3("4. Conceptantwoord"),
    para(
      text("Op basis van classificatie en CRM-context genereert AI een conceptreactie. Relevante productinformatie komt uit een gecontroleerde kennisbank."),
    ),
    h3("5. Goedkeuring"),
    para(
      text("Een medewerker ziet samenvatting, classificatie, conceptantwoord en CRM-voorstel in één scherm. Pas na goedkeuring gaat de flow verder."),
    ),
    h3("6. Verzenden"),
    para(
      text("Na goedkeuring wordt het antwoord verstuurd via het e-mailsysteem. De verzonden tekst wordt gelogd."),
    ),
    h3("7. CRM bijwerken"),
    para(
      text("De workflow werkt het CRM bij: notitie, status, follow-up-taak of pipeline-stap — afhankelijk van het type aanvraag."),
    ),
    callout(
      "Wat dit voorbeeld laat zien",
      text("AI doet het voorbereidende werk. Integraties verbinden systemen. De medewerker behoudt controle op wat de klant daadwerkelijk ontvangt. Dat is het verschil tussen een demo en een productieworkflow."),
    ),
    h2("Veelgemaakte fouten"),
    para(text("Bij workflowprojecten zien we regelmatig:")),
    ul(
      "te brede scope in de eerste versie;",
      "geen duidelijke eigenaar van het proces;",
      "automatisering zonder fallback;",
      "AI zonder bronbeperking of kwaliteitscontrole;",
      "opschalen voordat uitzonderingen zijn getest;",
      "meten op 'het werkt' in plaats van op businessresultaat.",
    ),
    para(
      text("Deze fouten zijn vermijdbaar wanneer je proces, techniek en governance parallel ontwerpt."),
    ),
    h2("Conclusie"),
    para(
      text("Een AI-workflow bouwen is geen technisch side-project. Het is procesontwerp met technologie — waarbij menselijke controle, integraties en meetbare resultaten centraal staan."),
    ),
    para(
      text("Organisaties die workflows systematisch ontwerpen, testen en opschalen, maken van AI geen los experiment maar een structureel onderdeel van hoe ze werken."),
    ),
  ],
  faq: [
    {
      id: "verschil",
      question: "Wat is het verschil tussen een AI-workflow en een chatbot?",
      answer:
        "Een chatbot reageert op losse vragen. Een AI-workflow verbindt meerdere stappen: trigger, verwerking, integraties, review en output. Workflows zijn ontworpen voor terugkerende bedrijfsprocessen, niet voor ad-hoc gesprekken.",
    },
    {
      id: "tools",
      question: "Heb je altijd maatwerk nodig?",
      answer:
        "Nee. Eenvoudige workflows passen vaak bij no-code of low-code platforms. Complexere processen met meerdere systemen, strikte beveiliging of specifieke bedrijfslogica vragen vaker maatwerk.",
    },
    {
      id: "tijd",
      question: "Hoe lang duurt het bouwen van een AI-workflow?",
      answer:
        "Dat hangt af van procescomplexiteit, integraties, datakwaliteit en governance-eisen. Een gerichte pilot kan binnen enkele weken; een robuuste productie-workflow vraagt vaak meer tijd voor testen en adoptie.",
    },
    {
      id: "controle",
      question: "Moet elke AI-workflow menselijke controle hebben?",
      answer:
        "Niet elke stap, maar elke workflow met risicovolle output hoort reviewmomenten te hebben. De mate van controle hangt af van wat er mis kan gaan en wat een fout kost.",
    },
    {
      id: "start",
      question: "Waar begin je met workflowautomatisering?",
      answer:
        "Kies één frequent proces, beschrijf de huidige flow, identificeer handmatige stappen en bouw een kleine pilot met duidelijke inputs, outputs en meetpunten.",
    },
  ],
  relatedSlugs: [
    "ai-automatisering-bedrijven",
    "ai-agent-vs-chatbot",
    "custom-ai-oplossing-bedrijf",
  ],
  cta: {
    heading: "Klaar om jouw workflow te analyseren?",
    body: "Laat Geniuz jouw workflow analyseren.",
    label: "Plan een gesprek",
    href: "/contact",
  },
  seo: {
    title: "AI-workflow bouwen: stappenplan | Geniuz",
    description:
      "Leer in tien stappen hoe je een AI-workflow ontwerpt die daadwerkelijk waarde oplevert — met aandacht voor menselijke controle, integraties en opschaling.",
    ogImage: "/images/ai-workflow.webp",
  },
}
