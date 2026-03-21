

## Plan: Fix `/apps` Conversion Tracking Before Redirect

### The core problem

The `gtag.js` script is loaded with `async` in `index.html`. When `/apps` mounts, React's `useEffect` fires `window.location.replace()` almost instantly. The browser navigates away before `gtag.js` has finished loading and sending the pageview beacon. Google Ads never sees the visit.

### The right approach: use gtag's `event_callback`

The gtag API provides an `event_callback` parameter specifically for this use case -- it fires after the tracking beacon has been sent. We should:

1. Send an explicit `page_view` event to the Google Ads account (`AW-11339741081`) with an `event_callback` that triggers the redirect.
2. Set a hard timeout (2 seconds) as a fallback so users are never stranded if gtag fails to load.

This is the same pattern Google officially recommends for "click tracking before navigation" and is already partially used in your `tracking.ts` file (the `event_callback` and `transport_type: "beacon"` pattern in `trackDonateConversion`).

### Why not other approaches

- **Simple `setTimeout` delay**: Fragile. Too short and tracking still misses; too long and users wait needlessly. It doesn't actually confirm the beacon fired.
- **`navigator.sendBeacon`**: Would require manually constructing the Measurement Protocol payload, bypassing gtag entirely. Over-engineered and brittle.
- **Embedding bestselfs.com in an iframe**: Cross-origin issues, breaks the destination site's UX, and Google Ads would flag it.

### Changes

**1. Add `trackPageAndRedirect` to `src/lib/tracking.ts`**

A new utility function that:
- Calls `gtag('event', 'page_view', { send_to: 'AW-11339741081', event_callback: () => redirect() })`
- Sets a 2-second `setTimeout` fallback that redirects anyway if gtag never loads or the callback never fires
- Uses a `didRedirect` guard (same pattern as `/donate`) to prevent double navigation

**2. Update `src/pages/Apps.tsx`**

Replace the immediate `window.location.replace()` with a call to `trackPageAndRedirect('https://bestselfs.com')`. The component stays minimal -- just the "Redirecting..." message while the beacon fires.

### Why this is the right call

It guarantees the Google Ads pageview beacon completes on `valorwell.org` before leaving the domain. It uses Google's own callback mechanism rather than guessing timing. It follows the exact pattern your codebase already uses for conversion events. And the 2-second fallback ensures no user is ever stuck, even if an ad blocker kills gtag entirely.

