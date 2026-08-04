export const CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION =
  "AW-16798905432/XWcdCMz27tscENjoq8o-";

/**
 * Returns the clinician conversion destination only when it exactly matches
 * the Google Ads conversion action issued for Therapist Application Submitted.
 * This prevents an account-only ID, another conversion label, or a stale
 * destination from silently receiving clinician leads.
 */
export function resolveClinicianConversionDestination(
  rawDestination: string | undefined =
    CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION,
): string | null {
  const destination = rawDestination?.trim();

  return destination === CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION
    ? destination
    : null;
}

/**
 * Records a successful clinician-interest registration.
 *
 * The general form event is sent to the configured Google destinations for
 * analytics continuity. The Google Ads conversion is sent only to the exact
 * Therapist Application Submitted conversion action supplied by Google Ads.
 */
export function trackClinicianInterestRegistered(
  submissionId: string,
  rawDestination: string | undefined =
    CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION,
): boolean {
  if (typeof window === "undefined") return false;

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") return false;

  gtagFn("event", "form_submit", {
    event_category: "clinician_interest",
    event_label: "clinician_interest_registered",
    form_name: "clinician_interest",
  });

  const sendTo = resolveClinicianConversionDestination(rawDestination);
  if (!sendTo) return false;

  gtagFn("event", "conversion", {
    send_to: sendTo,
    value: 1.0,
    currency: "USD",
    transaction_id: submissionId,
    transport_type: "beacon",
  });

  return true;
}
