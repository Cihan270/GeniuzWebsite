export {
  fieldErrorsFromZod,
  opportunityInputsSchema,
  opportunityLeadSchema,
  opportunityScanApiSchema,
  opportunityStepSchemas,
  parseOpportunityInputs,
  type OpportunityInputsParsed,
  type OpportunityLeadParsed,
  type OpportunityScanApiPayload,
  type OpportunityStepId,
} from "@/lib/validations/opportunity-scan"

export {
  normalizeWebsiteUrl,
  websiteScanApiSchema,
  websiteScanInputSchema,
  type WebsiteScanApiPayload,
  type WebsiteScanInputParsed,
} from "@/lib/validations/website-scan"
