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
