export {
  calculateOpportunity,
  complexityCorrectionFromScale,
  OPPORTUNITY_HOUR_RATE_EUR,
  OPPORTUNITY_WORKING_WEEKS,
  opportunityInputKeys,
  oversightFactorFromScale,
  recommendNextStep,
  selectImprovementCategories,
  type ImprovementCategoryId,
  type OpportunityInputs,
  type OpportunityResult,
} from "@/lib/scans/opportunity-scoring"

export {
  clearOpportunityScan,
  createEmptyOpportunityPersisted,
  OPPORTUNITY_SCAN_STORAGE_KEY,
  readOpportunityScan,
  writeOpportunityScan,
  type OpportunityLead,
  type OpportunityScanPersisted,
} from "@/lib/scans/opportunity-storage"

export {
  getWebsiteScanProvider,
  MockWebsiteScanProvider,
  setWebsiteScanProvider,
  type WebsiteScanInput,
  type WebsiteScanProvider,
  type WebsiteScanReport,
} from "@/lib/scans/website-provider"
