const CANONICAL_GOOGLE_ADS_ACCOUNT_ID = "AW-11339741081";
const GOOGLE_ADS_CONVERSION_DESTINATION_PATTERN =
  /^AW-\d+\/[A-Za-z0-9_-]+$/;

/**
 * Returns the Google Ads destination only when it is a complete conversion
 * destination for ValorWell's canonical Ads account. This prevents a stale
 * account ID or an account-only tag ID from silently receiving the lead.
 */
export function resolveClinicianConversionDestination(
  rawDestination: string | undefined =
    import.meta.env.VITE_GOOGLE_ADS_CLINICIAN_CONVERSION_SEND_TO,
): string | null {
  const destination = rawDestination?.trim();

  if (
    !destination ||
    !GOOGLE_ADS_CONVERSION_DESTINATION_PATTERN.test(destination) ||
    !destination.startsWith(`${CANONICAL_GOOGLE_ADS_ACCOUNT_ID}/`)
  ) {
    return null;
  }

  return destination;
}

/**
 * Records a successful clinician-interest registration.
 *
 * The general form event is sent to the configured Google destinations for
 * analytics continuity. The Google Ads conversion is sent only when the exact
 * conversion action destination has been configured for AW-11339741081.
 */
export function trackClinicianInterestRegistered(
  submissionId: string,
  rawDestination: string | undefined =
    import.meta.env.VITE_GOOGLE_ADS_CLINICIAN_CONVERSION_SEND_TO,
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
