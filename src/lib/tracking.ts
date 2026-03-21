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
