import {
  PUBLIC_FORMS,
  trackSuccessfulFormSubmission,
} from "./sitewideFormTracking";

export const CLIENT_SIGNUP_EVENT_NAME = PUBLIC_FORMS.clientSignup.eventName;
export const CLIENT_SIGNUP_FORM_ID = PUBLIC_FORMS.clientSignup.id;
export const CLIENT_SIGNUP_FORM_NAME = PUBLIC_FORMS.clientSignup.name;

/**
 * Records a newly created website client account through the shared successful-
 * form pipeline. Billing Hub remains authoritative about whether the request is
 * conversion eligible.
 */
export function trackClientSignupSuccess(submissionId: string): boolean {
  return trackSuccessfulFormSubmission("clientSignup", submissionId);
}
