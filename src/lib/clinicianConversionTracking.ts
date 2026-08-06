import {
  PUBLIC_FORMS,
  trackSuccessfulFormSubmission,
} from "./sitewideFormTracking";

export const CLINICIAN_INTEREST_FORM_ID = PUBLIC_FORMS.clinicianInterest.id;
export const CLINICIAN_INTEREST_FORM_NAME = PUBLIC_FORMS.clinicianInterest.name;
export const CLINICIAN_INTEREST_EVENT_NAME =
  PUBLIC_FORMS.clinicianInterest.eventName;

/**
 * Records a successful clinician-interest registration through the shared
 * form_submit pipeline. No conversion-action label is embedded in application
 * code; Google Ads can use the standard or stable per-form event.
 */
export function trackClinicianInterestRegistered(
  submissionId: string,
): boolean {
  return trackSuccessfulFormSubmission("clinicianInterest", submissionId);
}
