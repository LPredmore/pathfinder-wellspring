/**
 * Fires the Google Ads conversion event for donate/sponsor intent.
 * Default value is 1.0 USD. We can later pass actual donation amounts
 * via offline imports; this is for on-site intent tracking + compliance.
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
    event_callback: () => {
      // no-op; reserved for future if we ever need to delay navigation
    },
  });
}
