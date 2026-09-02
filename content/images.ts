/**
 * Curated stock imagery — local assets with brand-consistent alt text.
 * Photos are desaturated and overlaid via BrandImage; keep usage secondary to copy/diagrams.
 */

export type ImageKey =
  | "contact-meeting"
  | "editorial-workspace"
  | "sector-legal"
  | "sector-finance"
  | "sector-knowledge"
  | "insight-process"
  | "insight-roi"
  | "insight-adoption"
  | "insight-bedrijfsprocessen-ai"
  | "insight-kosten-ai-automatisering"
  | "insight-ai-agent-vs-chatbot"
  | "insight-ai-accountants"
  | "insight-ai-automatisering-bedrijven"
  | "insight-ai-advocaten"
  | "insight-ai-workflow"
  | "insight-custom-ai-oplossing"
  | "insight-chatgpt-zakelijk"
  | "insight-ai-strategie-implementatie"
  | "insight-n8n-make-zapier"
  | "insight-ai-agent-bedrijf"
  | "sectors-ambient"

export type SiteImage = {
  src: string
  alt: string
  /** Optional Unsplash attribution (visible in code comments / dev only). */
  credit?: string
  width: number
  height: number
}

export const siteImages: Record<ImageKey, SiteImage> = {
  "contact-meeting": {
    src: "/images/contact-meeting.webp",
    alt: "Professioneel overleg aan een vergadertafel",
    credit: "Unsplash",
    width: 800,
    height: 600,
  },
  "editorial-workspace": {
    src: "/images/editorial-workspace.webp",
    alt: "Modern kantoor met rustige werkplekken",
    credit: "Unsplash",
    width: 800,
    height: 600,
  },
  "sector-legal": {
    src: "/images/sector-legal.webp",
    alt: "Juridisch kenniswerk met documenten en onderzoek",
    credit: "Unsplash",
    width: 800,
    height: 600,
  },
  "sector-finance": {
    src: "/images/sector-finance.webp",
    alt: "Financiële analyse en data op een scherm",
    credit: "Unsplash",
    width: 800,
    height: 600,
  },
  "sector-knowledge": {
    src: "/images/sector-knowledge.webp",
    alt: "Team dat samenwerkt aan kennisintensief werk",
    credit: "Unsplash",
    width: 800,
    height: 600,
  },
  "insight-process": {
    src: "/images/insight-process.webp",
    alt: "Procesplanning en strategisch overleg",
    credit: "Unsplash",
    width: 640,
    height: 400,
  },
  "insight-roi": {
    src: "/images/insight-roi.webp",
    alt: "Data-analyse op een laptop",
    credit: "Unsplash",
    width: 640,
    height: 400,
  },
  "insight-adoption": {
    src: "/images/insight-adoption.webp",
    alt: "Workshop met teamleden aan een tafel",
    credit: "Unsplash",
    width: 640,
    height: 400,
  },
  "insight-bedrijfsprocessen-ai": {
    src: "/images/bedrijfsprocessen-ai.webp",
    alt: "Bedrijfsworkflow met laptop, documenten en verbonden processen",
    credit: "Unsplash",
    width: 640,
    height: 400,
  },
  "insight-kosten-ai-automatisering": {
    src: "/images/kosten-ai-automatisering.webp",
    alt: "Zakelijke besluitvormers die financiële en workflowinformatie bespreken",
    credit: "Unsplash",
    width: 640,
    height: 400,
  },
  "insight-ai-agent-vs-chatbot": {
    src: "/images/ai-agent-vs-chatbot.webp",
    alt: "Conceptuele vergelijking tussen conversatie-interface en bedrijfssystemen",
    credit: "Unsplash",
    width: 640,
    height: 400,
  },
  "insight-ai-accountants": {
    src: "/images/ai-accountants.webp",
    alt: "Accountant in een Nederlands kantoor met financiële documenten en laptop",
    credit: "Unsplash",
    width: 640,
    height: 400,
  },
  "insight-ai-automatisering-bedrijven": {
    src: "/images/ai-automatisering-bedrijven.webp",
    alt: "Modern Europees bedrijfsteam dat samenwerkt met digitale workflowvisualisatie",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "insight-ai-advocaten": {
    src: "/images/ai-advocaten.webp",
    alt: "Juridisch professional die documenten beoordeelt in een kantoor",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "insight-ai-workflow": {
    src: "/images/ai-workflow.webp",
    alt: "Business analyst die een workflow plant met whiteboard en laptop",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "insight-custom-ai-oplossing": {
    src: "/images/custom-ai-oplossing.webp",
    alt: "Productteam dat een maatwerk bedrijfsapplicatie bespreekt",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "insight-chatgpt-zakelijk": {
    src: "/images/chatgpt-zakelijk.webp",
    alt: "Professionele medewerker die een AI-chatinterface gebruikt op kantoor",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "insight-ai-strategie-implementatie": {
    src: "/images/ai-strategie-implementatie.webp",
    alt: "Executive workshop voor AI-strategie in een boardroom",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "insight-n8n-make-zapier": {
    src: "/images/n8n-make-zapier.webp",
    alt: "Technologische werkplek met abstracte workflow-builder interfaces",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "insight-ai-agent-bedrijf": {
    src: "/images/ai-agent-bedrijf.webp",
    alt: "Abstracte visualisatie van een AI-systeem dat bedrijfstools coördineert",
    credit: "Unsplash",
    width: 1280,
    height: 720,
  },
  "sectors-ambient": {
    src: "/images/sectors-ambient.webp",
    alt: "Professionele werkomgeving",
    credit: "Unsplash",
    width: 1200,
    height: 400,
  },
}

const sectorImageKeys: Record<string, ImageKey> = {
  "juridische-sector": "sector-legal",
  "financiele-sector": "sector-finance",
  "kennisintensieve-organisaties": "sector-knowledge",
  juridisch: "sector-legal",
  finance: "sector-finance",
  kennis: "sector-knowledge",
}

const insightImageKeys: Record<string, ImageKey> = {
  "ai-automatisering-bedrijven": "insight-ai-automatisering-bedrijven",
  "bedrijfsprocessen-automatiseren-ai": "insight-bedrijfsprocessen-ai",
  "kosten-ai-automatisering": "insight-kosten-ai-automatisering",
  "ai-agent-vs-chatbot": "insight-ai-agent-vs-chatbot",
  "ai-accountants-administratiekantoren": "insight-ai-accountants",
  "ai-advocaten-juridische-kantoren": "insight-ai-advocaten",
  "ai-workflow-bouwen": "insight-ai-workflow",
  "custom-ai-oplossing-bedrijf": "insight-custom-ai-oplossing",
  "chatgpt-zakelijk-gebruiken": "insight-chatgpt-zakelijk",
  "ai-implementeren-bedrijf": "insight-ai-strategie-implementatie",
  "n8n-vs-make-vs-zapier": "insight-n8n-make-zapier",
  "wat-is-een-ai-agent": "insight-ai-agent-bedrijf",
}

export function getSectorImageKey(sectorKey: string): ImageKey {
  return sectorImageKeys[sectorKey] ?? "sector-knowledge"
}

export function getInsightImageKey(slug: string): ImageKey {
  return insightImageKeys[slug] ?? "insight-process"
}

export function getSectorImage(sectorKey: string): SiteImage {
  return siteImages[getSectorImageKey(sectorKey)]
}

export function getInsightImage(slug: string): SiteImage {
  return siteImages[getInsightImageKey(slug)]
}

export function getImage(key: ImageKey): SiteImage {
  return siteImages[key]
}
