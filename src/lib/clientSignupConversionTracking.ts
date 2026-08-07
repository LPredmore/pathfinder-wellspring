import {
  PUBLIC_FORMS,
  trackSuccessfulFormSubmission,
} from "./sitewideFormTracking";

export const CLIENT_SIGNUP_EVENT_NAME = PUBLIC_FORMS.clientSignup.eventName;
export const CLIENT_SIGNUP_FORM_ID = PUBLIC_FORMS.clientSignup.id;
export const CLIENT_SIGNUP_FORM_NAME = PUBLIC_FORMS.clientSignup.name;

/**
 * Google Ads "Sign-up (1)" conversion action.
 *
 * The action was created as a page-load conversion in the Ads UI, but the
 * signup confirmation is rendered in place without a URL change. Firing the
 * same event snippet directly at the confirmed-success boundary is the
 * supported equivalent and is more accurate: it counts only accounts that
 * Billing Hub actually created.
 */
export const CLIENT_SIGNUP_ADS_CONVERSION =
  "AW-16798905432/e1LYCMH0ud0cENjoq8o-";

const trackedSignupConversions = new Set<string>();

/**
 * Records a newly created website client account through the shared successful-
 * form pipeline and reports the Google Ads signup conversion. Billing Hub
 * remains authoritative about whether the request is conversion eligible.
 */
export function trackClientSignupSuccess(submissionId: string): boolean {
  const tracked = trackSuccessfulFormSubmission("clientSignup", submissionId);

  if (typeof window === "undefined") return tracked;

  const normalizedSubmissionId = submissionId.trim();
  if (!normalizedSubmissionId) return tracked;
  if (trackedSignupConversions.has(normalizedSubmissionId)) return tracked;

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") return tracked;

  try {
    gtagFn("event", "conversion", {
      send_to: CLIENT_SIGNUP_ADS_CONVERSION,
      value: 1.0,
      currency: "USD",
      transaction_id: normalizedSubmissionId,
      transport_type: "beacon",
    });
    trackedSignupConversions.add(normalizedSubmissionId);
  } catch {
    /* Conversion reporting must never break the signup confirmation. */
  }

  return tracked;
}

export function clearTrackedSignupConversionsForTests(): void {
  trackedSignupConversions.clear();
}
