import {
  callout,
  h2,
  link,
  para,
  table,
  text,
  ul,
} from "@/content/insights/helpers"
import type { Insight } from "@/content/insights/types"

export const aiAgentVsChatbot: Insight = {
  slug: "ai-agent-vs-chatbot",
  locale: "nl",
  title: "AI-agent vs chatbot: wat is het verschil?",
  description:
    "Wat is het verschil tussen een chatbot en een AI-agent? Vergelijk mogelijkheden, risico's en toepassingen voor bedrijfsprocessen.",
  category: "AI Development",
  publishedAt: "2026-08-07",
  imageKey: "insight-ai-agent-vs-chatbot",
  intro:
    "Een chatbot communiceert vooral. Een AI-agent kan — binnen duidelijke grenzen — redeneren over een taak, tools gebruiken en stappen uitvoeren.",
  sections: [
    para(
      text("Een chatbot communiceert vooral. Een AI-agent kan — binnen duidelijke grenzen — redeneren over een taak, tools gebruiken en stappen uitvoeren."),
    ),
    para(
      text("Dat klinkt als een subtiel verschil, maar het heeft grote gevolgen voor wat je bouwt, welke risico's je neemt en welke resultaten je kunt verwachten. Veel organisaties gebruiken de termen door elkaar, terwijl de technische en operationele implicaties sterk uiteenlopen."),
    ),
    para(
      text("In dit artikel leggen we het verschil uit, geven we concrete voorbeelden en helpen we bepalen wanneer welke aanpak past."),
    ),
    h2("Wat is een chatbot?"),
    para(
      text("Een chatbot is primair een conversatie-interface. Het ontvangt vragen, zoekt antwoorden (vaak uit een kennisbank of vooraf geschreven scripts) en geeft een tekstuele respons terug."),
    ),
    para(text("Kenmerken van een chatbot:")),
    ul(
      "beperkt tot conversatie — vraag en antwoord;",
      "antwoorden komen uit vaste scripts, FAQ's of een gecontroleerde kennisbank;",
      "beperkte of geen interactie met externe systemen;",
      "voorspelbaar gedrag binnen gedefinieerde scenario's;",
      "relatief eenvoudig te implementeren en te testen.",
    ),
    para(
      text("Chatbots zijn geschikt wanneer het doel is: informatie verstrekken, eenvoudige vragen beantwoorden of gebruikers door een vast proces leiden."),
    ),
    h2("Wat is een AI-agent?"),
    para(
      text("Een AI-agent combineert een taalmodel met instructies, context, tools en een beslissingslus. Het kan niet alleen antwoorden geven, maar ook acties voorbereiden of uitvoeren binnen vooraf gedefinieerde permissies."),
    ),
    para(text("Kenmerken van een AI-agent:")),
    ul(
      "kan redeneren over een taak en meerdere stappen plannen;",
      "heeft toegang tot tools: API's, databases, e-mail, CRM, kalender;",
      "kan informatie ophalen, verwerken en resultaten terugkoppelen;",
      "werkt met een feedbacklus: actie → evaluatie → vervolgstap;",
      "vereist duidelijke permissies, logging en menselijke controle.",
    ),
    para(
      text("Meer achtergrond over wat een agent precies is en welke onderdelen nodig zijn, lees je in "),
      link("Wat is een AI-agent?", "/insights/wat-is-een-ai-agent"),
      text("."),
    ),
    h2("Het belangrijkste verschil: praten versus handelen"),
    para(
      text("De kern van het verschil: een chatbot praat, een agent kan handelen."),
    ),
    para(
      text("Een chatbot vertelt je hoe je een retour aanvraagt. Een agent kan — met de juiste permissies — het retourverzoek opzoeken in het CRM, controleren of de order in aanmerking komt, een concept-e-mail opstellen en een taak aanmaken voor goedkeuring."),
    ),
    para(
      text("Dat maakt agents krachtiger, maar ook complexer en risicovoller. Meer autonomie vraagt om strakkere governance."),
    ),
    table(
      ["Aspect", "Chatbot", "AI-agent"],
      [
        [
          "Conversatie",
          "Vraag-antwoord binnen gedefinieerde scenario's",
          "Meerstapsdialogen met contextbehoud en taakgericht redeneren",
        ],
        [
          "Kennis ophalen",
          "FAQ, scripts of statische kennisbank",
          "Dynamisch ophalen uit meerdere bronnen en systemen",
        ],
        [
          "API/toolgebruik",
          "Beperkt of afwezig",
          "Actief: CRM, e-mail, databases, kalender, documenten",
        ],
        [
          "Meerstapsuitvoering",
          "Nee — één respons per interactie",
          "Ja — kan meerdere stappen plannen en uitvoeren",
        ],
        [
          "Autonomie",
          "Laag — volgt vaste paden",
          "Variabel — afhankelijk van ontwerp en permissies",
        ],
        [
          "Risico",
          "Beperkt — vooral onjuiste antwoorden",
          "Hoger — ongewenste acties, datalekken, foutieve beslissingen",
        ],
        [
          "Geschikte use cases",
          "FAQ, website-support, interne kennisvragen",
          "Procesautomatisering, sales-ondersteuning, administratieve workflows",
        ],
      ],
      "Vergelijking chatbot vs AI-agent",
    ),
    h2("Voorbeeld: klantenservice"),
    para(
      text("Een chatbot op de website beantwoordt vragen over openingstijden, retourbeleid en productinformatie. Complexere vragen worden doorgestuurd naar een medewerker."),
    ),
    para(
      text("Een AI-agent in klantenservice kan een binnenkomende klantvraag analyseren, de orderstatus opzoeken in het ERP-systeem, een conceptantwoord opstellen op basis van het dossier en — na goedkeuring — het antwoord versturen en het ticket bijwerken."),
    ),
    para(
      text("Het verschil: de chatbot informeert, de agent voert een proces uit."),
    ),
    h2("Voorbeeld: sales"),
    para(
      text("Een chatbot helpt websitebezoekers met algemene productinformatie en verwijst door naar het contactformulier."),
    ),
    para(
      text("Een AI-agent in sales kan na een meeting de gespreksnotities samenvatten, het CRM-record bijwerken, een follow-upmail opstellen en een taak aanmaken voor de accountmanager — alles ter review voordat het wordt verstuurd."),
    ),
    h2("Voorbeeld: interne administratie"),
    para(
      text("Een chatbot beantwoordt interne vragen over vakantiebeleid of expense procedures."),
    ),
    para(
      text("Een AI-agent kan een ingediend declaratieformulier uitlezen, controleren tegen het beleid, ontbrekende velden signaleren en een voorstel doen voor goedkeuring of afwijzing — met logging van elke stap."),
    ),
    h2("Wanneer heb je géén AI-agent nodig?"),
    para(
      text("Niet elke situatie vraagt om een agent. Een chatbot of eenvoudige workflow volstaat wanneer:"),
    ),
    ul(
      "het proces volledig voorspelbaar is (IF X → THEN Y);",
      "er geen interpretatie van vrije tekst nodig is;",
      "er geen interactie met externe systemen vereist is;",
      "het volume laag is en handmatig werk acceptabel blijft;",
      "het risico van autonome acties te groot is.",
    ),
    para(
      text("In veel gevallen is een AI-ondersteunde workflow — deterministische stappen aangevuld met AI voor interpretatie — effectiever dan een volledig autonome agent."),
    ),
    h2("Risico's van autonome agents"),
    para(
      text("Agents met te veel autonomie kunnen:"),
    ),
    ul(
      "ongewenste acties uitvoeren (verkeerde e-mails versturen, data wijzigen);",
      "hallucineren en toch met zekerheid handelen;",
      "gevoelige informatie blootstellen via verkeerde tool-aanroepen;",
      "moeilijk te debuggen zijn zonder adequate logging;",
      "medewerkers ontmoedigen als het systeem onvoorspelbaar gedrag vertoont.",
    ),
    callout(
      "Geen autonome medewerkers",
      text("Presenteer agents niet als zelfstandige medewerkers. Ze zijn tools die — binnen duidelijke grenzen — taken kunnen uitvoeren onder menselijk toezicht."),
    ),
    h2("Human-in-the-loop en permissions"),
    para(
      text("Elke agent moet worden ontworpen met het principe van least privilege: alleen de permissies die nodig zijn voor de taak. Daarnaast:"),
    ),
    ul(
      "mensen keuren kritieke acties goed voordat ze worden uitgevoerd;",
      "alle acties worden gelogd voor audit en debugging;",
      "er is een duidelijk escalatiepad bij twijfel of fouten;",
      "medewerkers kunnen het systeem overschrijven of stoppen.",
    ),
    h2("Agentic workflows als praktisch alternatief"),
    para(
      text("In de praktijk is een agentic workflow — een reeks stappen waarbij AI interpreteert en voorbereidt, maar deterministische code de uitvoering regelt — vaak robuuster dan een volledig autonome agent."),
    ),
    para(
      text("Denk aan: inkomende e-mail → classificatie (AI) → CRM ophalen (code) → conceptantwoord (AI) → goedkeuring (mens) → versturen (code) → CRM bijwerken (code)."),
    ),
    para(
      text("Meer over het bouwen van zulke workflows lees je in "),
      link("Van handmatig naar automatisch: zo bouw je een goede AI-workflow", "/insights/ai-workflow-bouwen"),
      text(" en op onze pagina over "),
      link("AI-agents", "/ai-development#ai-agents"),
      text("."),
    ),
    h2("Conclusie"),
    para(
      text("Chatbots en AI-agents dienen verschillende doelen. Chatbots zijn geschikt voor informatieverstrekking en eenvoudige conversaties. Agents zijn geschikt wanneer een proces meerdere stappen, systeeminteractie en interpretatie vereist — mits je autonomie, permissies en menselijke controle zorgvuldig ontwerpt."),
    ),
    para(
      text("De vraag is niet 'chatbot of agent?', maar 'hoeveel autonomie heeft dit proces nodig — en hoeveel durf ik toe te staan?'"),
    ),
  ],
  faq: [
    {
      id: "verschil",
      question: "Wat is het belangrijkste verschil tussen een chatbot en een AI-agent?",
      answer:
        "Een chatbot communiceert vooral: vraag en antwoord. Een AI-agent kan daarnaast redeneren over een taak, tools gebruiken en stappen uitvoeren binnen gedefinieerde permissies.",
    },
    {
      id: "wanneer-agent",
      question: "Wanneer heb ik een AI-agent nodig?",
      answer:
        "Wanneer een proces meerdere stappen vereist, interactie met externe systemen nodig is en interpretatie van vrije tekst of documenten centraal staat — én wanneer je de risico's van autonomie kunt beheersen.",
    },
    {
      id: "risico",
      question: "Zijn AI-agents riskant?",
      answer:
        "Ze kunnen riskant zijn wanneer ze te veel autonomie krijgen zonder logging, permissies of menselijke goedkeuring. Ontwerp altijd met least privilege en human-in-the-loop.",
    },
  ],
  relatedSlugs: [
    "wat-is-een-ai-agent",
    "ai-workflow-bouwen",
    "ai-automatisering-bedrijven",
  ],
  cta: {
    heading: "Van chatbot naar geïntegreerde AI-workflow",
    body: "Geniuz helpt organisaties bepalen welke aanpak past bij hun processen — en bouwt oplossingen met de juiste balans tussen automatisering en controle.",
    label: "Plan een AI-gesprek",
    href: "/contact",
  },
  seo: {
    title: "AI-agent vs chatbot: verschil en toepassingen | Geniuz",
    description:
      "Wat is het verschil tussen een chatbot en een AI-agent? Vergelijk mogelijkheden, risico's en toepassingen voor bedrijfsprocessen.",
    ogImage: "/images/ai-agent-vs-chatbot.webp",
  },
}
