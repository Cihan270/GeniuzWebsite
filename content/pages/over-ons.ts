import type { EditorialPageContent } from "@/content/pages/types"

export const overOnsPage: EditorialPageContent = {
  kind: "editorial",
  routeId: "over-ons",
  locale: "nl",
  path: "/over-ons",
  eyebrow: "Over Geniuz",
  h1: "Consultancy met eigen uitvoeringskracht",
  h1Accent: "eigen uitvoeringskracht",
  lead: "Geniuz helpt organisaties eerst te begrijpen waar AI waarde oplevert — en bouwt daarna wat werkelijk nodig is. Geen hype, geen theater: onderzoeken, prioriteren, bouwen en implementeren.",
  seo: {
    title: "Over Geniuz | Geniuz",
    description:
      "Geniuz is AI-consultancy met eigen uitvoeringskracht. Eerst waarde begrijpen, daarna bouwen wat nodig is.",
  },
  sections: [
    {
      id: "positionering",
      eyebrow: "Positionering",
      heading: "Eerst begrijpen. Daarna bouwen.",
      body: "Te vaak start AI bij tools of pilots zonder scherpe probleemstelling. Wij beginnen bij processen, data, risico’s en adoptie — en koppelen advies aan concrete uitvoering. Dat betekent: eerlijke scope, haalbare stappen en geen beloftes over besparing of ROI zonder onderbouwing.",
    },
    {
      id: "aanpak",
      eyebrow: "Aanpak",
      heading: "Van inzicht naar implementatie",
      body: "Onze kerngebieden — consultancy, development en training — horen bij elkaar. Analyse zonder bouw blijft papier; bouw zonder adoptie blijft op de plank. We werken in korte, toetsbare stappen en maken expliciet wat indicatief is versus wat eerst dieper onderzocht moet worden.",
    },
  ],
  team: {
    eyebrow: "Team",
    heading: "Wie je spreekt",
    body: "Een klein, ondernemend team. We groeien bewust — geen opgeblazen bureauclaim, wel verantwoordelijkheid voor wat we adviseren en bouwen.",
    portraitNote: "",
    members: [
      {
        id: "ruchan",
        name: "Ruchan Genc",
        role: "Oprichter",
        bio: "Ondernemende en digitale achtergrond in webdesign, websites en digitale oplossingen. Verdiept zich actief in AI en praktische toepassing in organisaties.",
      },
      {
        id: "cihan",
        name: "Cihan Uz",
        role: "Oprichter",
        bio: "Business IT & Management aan Windesheim en de pre-master Business Information Technology aan de Universiteit Twente. Voerde advies- en procesopdrachten uit voor onder meer Politie Nederland, DUO, Univé en Nedap. Focus op procesanalyse, architectuur en uitvoerbare richting.",
      },
    ],
  },
  principles: {
    eyebrow: "Werkwijze",
    heading: "Waar we scherp op blijven",
    items: [
      {
        id: "waarde-eerst",
        title: "Waarde vóór technologie",
        body: "Eerst vaststellen welk proces of welke beslissing ertoe doet. Tools volgen daarna — niet andersom.",
      },
      {
        id: "eerlijk-indicatief",
        title: "Eerlijk over onzekerheid",
        body: "Scores en tijdswaarde-ranges zijn indicatief. Ze vervangen geen businesscase, risicoanalyse of technische due diligence.",
      },
      {
        id: "mens-en-adoptie",
        title: "Mens en adoptie meenemen",
        body: "Automatisering zonder toezicht, beleid en training faalt. We bouwen met menselijke controle en veranderkracht in het vizier.",
      },
    ],
  },
  finalCta: {
    heading: "Kennismaken?",
    body: "Plan een vrijblijvend adviesgesprek. We luisteren eerst naar processen en knelpunten — daarna bepalen we samen of en hoe Geniuz kan helpen.",
    cta: { label: "Plan een adviesgesprek", href: "/contact" },
  },
}
