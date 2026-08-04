const STORAGE_KEY = "valorwell_donation_acquisition_v1";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

export interface DonationAcquisition {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  landing_path: string;
  referrer: string | null;
  client_captured_at: string;
}

const MARKETING_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function clean(value: string | null, maxLength = 512) {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, maxLength) : null;
}

function hasClickId(value: DonationAcquisition) {
  return Boolean(value.gclid || value.gbraid || value.wbraid);
}

function isFresh(value: DonationAcquisition) {
  const capturedAt = Date.parse(value.client_captured_at);
  return Number.isFinite(capturedAt) && Date.now() - capturedAt <= ATTRIBUTION_TTL_MS;
}

export function getDonationAcquisition(): DonationAcquisition | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DonationAcquisition;
    if (!parsed || !isFresh(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function captureDonationAcquisition(
  search = typeof window !== "undefined" ? window.location.search : "",
  landingPath = typeof window !== "undefined"
    ? `${window.location.pathname}${window.location.search}`
    : "/",
  referrer = typeof document !== "undefined" ? document.referrer : "",
): DonationAcquisition | null {
  if (!isBrowser()) return null;

  const params = new URLSearchParams(search);
  const hasMarketingParameter = MARKETING_KEYS.some((key) => clean(params.get(key), 512));
  const existing = getDonationAcquisition();
  if (!hasMarketingParameter) return existing;

  const candidate: DonationAcquisition = {
    gclid: clean(params.get("gclid"), 256),
    gbraid: clean(params.get("gbraid"), 256),
    wbraid: clean(params.get("wbraid"), 256),
    utm_source: clean(params.get("utm_source"), 256),
    utm_medium: clean(params.get("utm_medium"), 256),
    utm_campaign: clean(params.get("utm_campaign"), 256),
    utm_term: clean(params.get("utm_term"), 512),
    utm_content: clean(params.get("utm_content"), 512),
    landing_path: landingPath.slice(0, 2048),
    referrer: clean(referrer, 2048),
    client_captured_at: new Date().toISOString(),
  };

  // A new paid-click identifier is authoritative. UTM-only visits replace an
  // older UTM-only touch, but never erase a still-valid paid click identifier.
  const shouldReplace = !existing || hasClickId(candidate) || !hasClickId(existing);
  if (!shouldReplace) return existing;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(candidate));
  return candidate;
}

export function clearDonationAcquisitionForTests() {
  if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
}
