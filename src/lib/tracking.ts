/**
 * Fires the Google Ads conversion event for donate/sponsor intent.
 */
export function trackDonateConversion(value: number = 1.0, currency: string = "USD") {
  if (typeof window === "undefined") return;

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") return;

  gtagFn("event", "conversion", {
    send_to: "AW-16798905432/2XDvCITusvcbENjoq8o-",
    value,
    currency,
    transport_type: "beacon",
    event_callback: () => {},
  });
}

/**
 * Fires the Google Ads conversion event for creator application submissions.
 */
export function trackCreatorApplicationConversion() {
  if (typeof window === "undefined") return;

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") return;

  gtagFn("event", "conversion", {
    send_to: "AW-16798905432/Ps8yCJDJqoQcENjoq8o-",
    value: 1.0,
    currency: "USD",
    transport_type: "beacon",
    event_callback: () => {},
  });
}

/**
 * Fires the Google Ads conversion event for VibeTales outbound clicks,
 * then opens the destination URL in a new tab.
 * Uses event_callback so the new tab opens only after the beacon is sent.
 * Hard 2-second timeout ensures users are never stranded.
 */
export function trackVibeTalesOutboundClick(url: string) {
  let didOpen = false;

  const openUrl = () => {
    if (didOpen) return;
    didOpen = true;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (typeof window === "undefined") return;

  const timeout = window.setTimeout(openUrl, 2000);

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") {
    window.clearTimeout(timeout);
    openUrl();
    return;
  }

  gtagFn("event", "conversion", {
    send_to: "AW-16798905432/YutLCKDmnqAcENjoq8o-",
    value: 1.0,
    currency: "USD",
    event_callback: () => {
      window.clearTimeout(timeout);
      openUrl();
    },
  });
}

/**
 * Generic outbound-click tracker for app landing pages (Ninja-Do, SkillsQuest, etc.).
 * Reuses the same Google Ads conversion as VibeTales until per-app labels are provided.
 */
export function trackAppOutboundClick(url: string) {
  trackVibeTalesOutboundClick(url);
}

/**
 * Sends a page_view beacon to Google Ads, then redirects.
 * Uses event_callback so the redirect only fires after the beacon is sent.
 * Hard 2-second timeout ensures users are never stranded.
 */
export function trackPageAndRedirect(destinationUrl: string) {
  let didRedirect = false;

  const redirect = () => {
    if (didRedirect) return;
    didRedirect = true;
    window.location.replace(destinationUrl);
  };

  const timeout = window.setTimeout(redirect, 2000);

  if (typeof window === "undefined") {
    redirect();
    return;
  }

  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") {
    redirect();
    return;
  }

  gtagFn("event", "page_view", {
    send_to: "AW-11339741081",
    transport_type: "beacon",
    event_callback: () => {
      window.clearTimeout(timeout);
      redirect();
    },
  });
}

/**
 * Generic homepage event tracker. Safely no-ops when gtag is unavailable.
 * Uses GA4 custom-event shape via gtag.
 */
export function trackHomeEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtagFn = window.gtag;
  if (typeof gtagFn !== "function") return;
  try {
    gtagFn("event", name, { event_category: "homepage", ...params });
  } catch {
    /* no-op */
  }
}
