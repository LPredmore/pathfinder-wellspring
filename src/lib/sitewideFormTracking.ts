export type PublicFormKey =
  | "clientSignup"
  | "clinicianInterest"
  | "overflowReferral"
  | "btyGuest"
  | "btyNomination"
  | "ocsRouting";

export interface PublicFormDefinition {
  key: PublicFormKey;
  id: string;
  name: string;
  eventName: string;
  submitText: string;
  pathname: string;
  selectors: readonly string[];
}

export const PUBLIC_FORMS: Record<PublicFormKey, PublicFormDefinition> = {
  clientSignup: {
    key: "clientSignup",
    id: "valorwell-get-care-signup",
    name: "valorwell_get_care_signup",
    eventName: "client_signup_success",
    submitText: "Create Account and Email Instructions",
    pathname: "/get-care",
    selectors: ["#signup-first-name"],
  },
  clinicianInterest: {
    key: "clinicianInterest",
    id: "valorwell-clinician-interest",
    name: "valorwell_clinician_interest",
    eventName: "vw_form_submit_clinician",
    submitText: "Start My Onboarding",
    pathname: "/clinicians",
    selectors: ["#clinician-first-name"],
  },
  overflowReferral: {
    key: "overflowReferral",
    id: "valorwell-overflow-referral",
    name: "valorwell_overflow_referral",
    eventName: "vw_form_submit_overflow",
    submitText: "Add My Practice",
    pathname: "/clinicians",
    selectors: ["#overflow-practice-name"],
  },
  btyGuest: {
    key: "btyGuest",
    id: "valorwell-bty-guest-application",
    name: "valorwell_bty_guest_application",
    eventName: "vw_form_submit_bty_guest",
    submitText: "Apply to be a guest",
    pathname: "/beyondtheyellow",
    selectors: ["#guest-first-name"],
  },
  btyNomination: {
    key: "btyNomination",
    id: "valorwell-bty-nomination",
    name: "valorwell_bty_nomination",
    eventName: "vw_form_submit_bty_nomination",
    submitText: "Submit nomination",
    pathname: "/beyondtheyellow",
    selectors: ["#nominee-first"],
  },
  ocsRouting: {
    key: "ocsRouting",
    id: "valorwell-ocs-routing",
    name: "valorwell_ocs_routing",
    eventName: "vw_form_submit_ocs",
    submitText: "Send My Information",
    pathname: "/operation-claims-success",
    selectors: ['input[name="ocs-lane"]'],
  },
};

const trackedSubmissions = new Set<string>();

export interface SuccessfulFormEventParameters {
  event_id: string;
  event_category: "form_submission";
  event_label: string;
  form_id: string;
  form_name: string;
  form_destination: string;
  form_submit_text: string;
  form_context: PublicFormKey;
  success: true;
  transport_type: "beacon";
}

export function identifyPublicForm(
  form: HTMLFormElement,
  pathname = typeof window === "undefined" ? "" : window.location.pathname,
): PublicFormDefinition | null {
  for (const definition of Object.values(PUBLIC_FORMS)) {
    if (definition.pathname !== pathname) continue;
    if (definition.selectors.some((selector) => form.querySelector(selector))) {
      return definition;
    }
  }

  return null;
}

export function applyPublicFormMetadata(
  form: HTMLFormElement,
  definition: PublicFormDefinition,
): void {
  form.id = definition.id;
  form.setAttribute("name", definition.name);
  form.dataset.googleForm = definition.key;
  form.dataset.googleFormEvent = definition.eventName;
}

export function createFormSubmissionEventId(formKey: PublicFormKey): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return `${formKey}-${globalThis.crypto.randomUUID()}`;
  }

  return `${formKey}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Emits the same standard successful-form event for every public website form,
 * plus one stable per-form event that can be selected in Google Analytics or
 * Google Ads without adding a conversion snippet to the website.
 *
 * Submitted field values are deliberately excluded. The destination contains
 * only the origin and pathname, never a query string or fragment.
 */
export function trackSuccessfulFormSubmission(
  formKey: PublicFormKey,
  submissionId: string,
): boolean {
  if (typeof window === "undefined") return false;

  const normalizedSubmissionId = submissionId.trim();
  if (!normalizedSubmissionId) return false;

  const definition = PUBLIC_FORMS[formKey];
  const dedupeKey = `${formKey}:${normalizedSubmissionId}`;
  if (trackedSubmissions.has(dedupeKey)) return false;

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") return false;

  const parameters: SuccessfulFormEventParameters = {
    event_id: normalizedSubmissionId,
    event_category: "form_submission",
    event_label: definition.eventName,
    form_id: definition.id,
    form_name: definition.name,
    form_destination: `${window.location.origin}${window.location.pathname}`,
    form_submit_text: definition.submitText,
    form_context: formKey,
    success: true,
    transport_type: "beacon",
  };

  try {
    gtagFn("event", "form_submit", parameters);
    gtagFn("event", definition.eventName, parameters);
    trackedSubmissions.add(dedupeKey);
    return true;
  } catch {
    return false;
  }
}

export function clearTrackedFormSubmissionsForTests(): void {
  trackedSubmissions.clear();
}
