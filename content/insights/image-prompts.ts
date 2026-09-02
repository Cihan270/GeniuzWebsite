/**
 * Image generation prompts for insight hero images.
 * Assets should be saved to public/images/ as .webp (16:9 for hero/banner use).
 */

export type InsightImagePrompt = {
  slug: string
  filename: string
  imageKey: string
  alt: string
  prompt: string
}

export const insightImagePrompts: readonly InsightImagePrompt[] = [
  {
    slug: "ai-automatisering-bedrijven",
    filename: "ai-automatisering-bedrijven.webp",
    imageKey: "insight-ai-automatisering-bedrijven",
    alt: "Modern Europees bedrijfsteam dat samenwerkt met digitale workflowvisualisatie",
    prompt:
      "Premium editorial photograph of a modern European business team working in an office, subtle visualization of connected digital workflows and AI automation, realistic photography, sophisticated dark/neutral corporate aesthetic, no robots, no futuristic hologram clichés, no text in image, 16:9.",
  },
  {
    slug: "bedrijfsprocessen-automatiseren-ai",
    filename: "bedrijfsprocessen-ai.webp",
    imageKey: "insight-bedrijfsprocessen-ai",
    alt: "Bedrijfsworkflow met laptop, documenten en verbonden processen",
    prompt:
      "Realistic top-down editorial business workflow scene with laptop, documents and subtle connected workflow visualization, premium consultancy aesthetic, no text, 16:9.",
  },
  {
    slug: "kosten-ai-automatisering",
    filename: "kosten-ai-automatisering.webp",
    imageKey: "insight-kosten-ai-automatisering",
    alt: "Zakelijke besluitvormers die financiële en workflowinformatie bespreken",
    prompt:
      "Premium realistic photograph of business decision makers reviewing financial and workflow information on laptop, subtle technology context, European office, no text, 16:9.",
  },
  {
    slug: "ai-agent-vs-chatbot",
    filename: "ai-agent-vs-chatbot.webp",
    imageKey: "insight-ai-agent-vs-chatbot",
    alt: "Conceptuele vergelijking tussen conversatie-interface en bedrijfssystemen",
    prompt:
      "Elegant split conceptual editorial image showing conversational interface on one side and interconnected business systems/workflows on the other, realistic premium tech aesthetic, no humanoid robot, no text, 16:9.",
  },
  {
    slug: "ai-accountants-administratiekantoren",
    filename: "ai-accountants.webp",
    imageKey: "insight-ai-accountants",
    alt: "Accountant in een Nederlands kantoor met financiële documenten en laptop",
    prompt:
      "Photorealistic Dutch/European accounting office, accountant working with financial documents and laptop, subtle AI/data layer, premium professional photography, no text, 16:9.",
  },
  {
    slug: "ai-advocaten-juridische-kantoren",
    filename: "ai-advocaten.webp",
    imageKey: "insight-ai-advocaten",
    alt: "Juridisch professional die documenten beoordeelt in een kantoor",
    prompt:
      "Premium photorealistic European law office, legal professional reviewing documents, laptop, understated AI/document analysis visualization, sophisticated and trustworthy, no text, 16:9.",
  },
  {
    slug: "ai-workflow-bouwen",
    filename: "ai-workflow.webp",
    imageKey: "insight-ai-workflow",
    alt: "Business analyst die een workflow plant met whiteboard en laptop",
    prompt:
      "Premium realistic process/workflow planning scene with business analyst, laptop and whiteboard, subtle digital connection overlays, no text, 16:9.",
  },
  {
    slug: "custom-ai-oplossing-bedrijf",
    filename: "custom-ai-oplossing.webp",
    imageKey: "insight-custom-ai-oplossing",
    alt: "Productteam dat een maatwerk bedrijfsapplicatie bespreekt",
    prompt:
      "Professional product development team reviewing a custom business application, realistic European startup/consultancy environment, subtle AI interface, premium, no text, 16:9.",
  },
  {
    slug: "chatgpt-zakelijk-gebruiken",
    filename: "chatgpt-zakelijk.webp",
    imageKey: "insight-chatgpt-zakelijk",
    alt: "Professionele medewerker die een AI-chatinterface gebruikt op kantoor",
    prompt:
      "Realistic professional employee using an AI chat interface on laptop in modern office, screen not showing recognizable proprietary UI, security/privacy visual cues, premium editorial photography, no text, 16:9.",
  },
  {
    slug: "ai-implementeren-bedrijf",
    filename: "ai-strategie-implementatie.webp",
    imageKey: "insight-ai-strategie-implementatie",
    alt: "Executive workshop voor AI-strategie in een boardroom",
    prompt:
      "Executive workshop in modern European boardroom planning AI strategy, sticky notes/process diagrams, realistic premium consulting photography, no text, 16:9.",
  },
  {
    slug: "n8n-vs-make-vs-zapier",
    filename: "n8n-make-zapier.webp",
    imageKey: "insight-n8n-make-zapier",
    alt: "Technologische werkplek met abstracte workflow-builder interfaces",
    prompt:
      "Clean editorial technology workspace showing abstract workflow-builder interfaces on multiple screens, no recognizable logos required, realistic, premium, no text, 16:9.",
  },
  {
    slug: "wat-is-een-ai-agent",
    filename: "ai-agent-bedrijf.webp",
    imageKey: "insight-ai-agent-bedrijf",
    alt: "Abstracte visualisatie van een AI-systeem dat bedrijfstools coördineert",
    prompt:
      "Sophisticated abstract visualization of an AI system coordinating business tools such as email, CRM, documents and calendar, realistic UI-inspired editorial art, no humanoid robots, no text, 16:9.",
  },
]
