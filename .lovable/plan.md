# Repair `/donate` conversion handoff

## Verified diagnosis

- The published `/donate` page does load both Google Ads destinations.
- A live browser trace recorded the donation conversion request for `AW-16798905432/2XDvCITusvcbENjoq8o-` at about 800 ms.
- The Givebutter navigation followed at about 1.36 seconds.
- The current implementation calls the conversion with an empty `event_callback` and redirects using an unrelated fixed timer. It therefore does not use Google's completion signal, and Tag Assistant loses its connection when the page leaves `valorwell.org`.
- This is not a missing-tag problem. It is an unreliable and difficult-to-observe redirect handoff.

## Implementation

1. Refactor donation tracking into a callback-driven function that:
   - waits briefly for `gtag` to be available,
   - sends the donation conversion once,
   - redirects only from Google's `event_callback`,
   - retains a bounded fallback timeout so visitors cannot become stuck.
2. Keep the existing `donate-go` attribution request and Givebutter fallback, but separate destination resolution from the final tracked redirect so neither can race the other.
3. Preserve `gclid`, `gbraid`, `wbraid`, and UTM handling exactly as it works now.
4. Keep the branded interstitial and manual Givebutter link; route the manual link through the same tracked handoff rather than bypassing it.

## Verification

- Test the published-style flow in Chromium and capture request timing.
- Confirm exactly one request uses the donation conversion label.
- Confirm the conversion request completes before the first Givebutter navigation.
- Confirm the normal, failed-edge-function, blocked-tag, and manual-link paths all still reach Givebutter within the timeout.

## Scope

Only the `/donate` tracking and redirect handoff will change. Google account settings, other conversion actions, and other pages will remain untouched.