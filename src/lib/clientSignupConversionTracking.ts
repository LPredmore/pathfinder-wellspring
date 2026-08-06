export const CLIENT_SIGNUP_EVENT_NAME = "client_signup_success";
export const CLIENT_SIGNUP_FORM_ID = "valorwell-get-care-signup";
export const CLIENT_SIGNUP_FORM_NAME = "valorwell_get_care_signup";

const trackedSubmissionIds = new Set<string>();

interface ClientSignupEventParameters {
  event_id: string;
  event_category: "client_signup";
  event_label: "client_account_created";
  form_id: typeof CLIENT_SIGNUP_FORM_ID;
  form_name: typeof CLIENT_SIGNUP_FORM_NAME;
  form_destination: string;
  form_submit_text: "Create Account and Email Instructions";
  signup_source: "valorwell_get_care";
  transport_type: "beacon";
}

/**
 * Records the completed website signup only after the registration endpoint has
 * confirmed success. No name, email, phone number, URL query value, fragment,
 * or other user-provided form value is included in either Google event.
 *
 * The unique event is the authoritative conversion signal. The standard
 * form_submit event is retained for Google tag diagnostics and form reporting.
 */
export function trackClientSignupSuccess(submissionId: string): boolean {
  if (typeof window === "undefined") return false;

  const normalizedSubmissionId = submissionId.trim();
  if (!normalizedSubmissionId) return false;
  if (trackedSubmissionIds.has(normalizedSubmissionId)) return false;

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") return false;

  const eventParameters: ClientSignupEventParameters = {
    event_id: normalizedSubmissionId,
    event_category: "client_signup",
    event_label: "client_account_created",
    form_id: CLIENT_SIGNUP_FORM_ID,
    form_name: CLIENT_SIGNUP_FORM_NAME,
    form_destination: `${window.location.origin}${window.location.pathname}`,
    form_submit_text: "Create Account and Email Instructions",
    signup_source: "valorwell_get_care",
    transport_type: "beacon",
  };

  gtagFn("event", CLIENT_SIGNUP_EVENT_NAME, eventParameters);
  gtagFn("event", "form_submit", eventParameters);
  trackedSubmissionIds.add(normalizedSubmissionId);

  return true;
}
