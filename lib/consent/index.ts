export {
  CONSENT_STORAGE_KEY,
  FEATURE_ANALYTICS,
  FEATURE_MARKETING,
  consentCategories,
  createAcceptAllConsent,
  createAcceptedConsent,
  createConsent,
  createRejectAllConsent,
  getActiveConsentCategories,
  type ConsentCategory,
  type ConsentCategoryId,
  type ConsentState,
} from "@/lib/consent/config"

export {
  hasConsentDecision,
  readConsent,
  subscribeConsent,
  writeConsent,
  CONSENT_CHANGE_EVENT,
} from "@/lib/consent/storage"
