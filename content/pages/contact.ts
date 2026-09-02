import type { ContactPageContent } from "@/content/pages/types"
import { ORGANIZATION } from "@/lib/site"

export const contactPage: ContactPageContent = {
  kind: "utility",
  routeId: "contact",
  locale: "nl",
  path: "/contact",
  eyebrow: "Contact",
  h1: "Plan een vrijblijvend AI-adviesgesprek",
  h1Accent: "AI-adviesgesprek",
  lead: "Vertel kort waar je tegenaan loopt. We reageren met een voorstel voor een gesprek — geen pitchdeck-theater, wel een eerlijke inschatting van of en hoe we kunnen helpen.",
  seo: {
    title: "Contact | Geniuz",
    description:
      "Neem contact op met Geniuz voor een vrijblijvend AI-adviesgesprek of vragen over consultancy, development of training.",
  },
  sections: [
    {
      id: "intro",
      heading: "Wat we graag weten",
      body: "Hoe meer context over processen, sector en wat je al hebt geprobeerd, hoe gerichter we kunnen sparren. Geen verplichtingen — alleen een eerste stap.",
    },
  ],
  form: {
    nameLabel: "Naam",
    emailLabel: "E-mail",
    companyLabel: "Organisatie",
    companyOptional: "(optioneel)",
    topicLabel: "Onderwerp",
    messageLabel: "Bericht",
    submitLabel: "Verstuur bericht",
    submittingLabel: "Bezig…",
    successHeading: "Bericht ontvangen",
    successBody:
      "Bedankt. We hebben je bericht ontvangen en nemen zo snel mogelijk contact op. Check ook je inbox voor een bevestiging (als mail is geconfigureerd).",
    errorGeneric:
      "Versturen lukte niet. Probeer het later opnieuw of mail ons rechtstreeks.",
    topics: [
      { value: "adviesgesprek", label: "Adviesgesprek" },
      { value: "opportunity-scan", label: "AI Opportunity Scan" },
      { value: "consultancy", label: "AI Consultancy" },
      { value: "development", label: "AI Development" },
      { value: "training", label: "AI Training" },
      { value: "overig", label: "Overig" },
    ],
  },
  aside: {
    heading: "Direct mailen",
    body: "Liever zelf het gesprek openen? Stuur een mail — we reageren zo snel mogelijk.",
    emailLabel: ORGANIZATION.email,
  },
}
