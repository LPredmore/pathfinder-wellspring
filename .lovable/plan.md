

## Hardened Google Ads Conversion Tracking for Sponsor/Donate Buttons

### Overview

Create a reliable conversion tracking helper using `transport_type: "beacon"` and wire it to all donate/sponsor buttons across the site. The helper accepts optional `value` and `currency` parameters for future flexibility.

### Changes

**1. New file: `src/lib/tracking.ts`**

```ts
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
```

**2. Update `src/vite-env.d.ts`**

Add global `window.gtag` type declaration.

**3. Base Google tag -- already confirmed global**

The gtag.js snippet lives in `index.html`, which is the shell for the entire SPA. All routes (`/support`, `/competitions`, `/advocates`, etc.) share it. No changes needed.

**4. Wire `onClick` handlers**

Import `trackDonateConversion` and attach `onClick={() => trackDonateConversion()}` to:

- **`src/pages/Support.tsx`** -- 3 buttons (Sponsor a Session, Become a Monthly Sponsor, Sponsor Sessions Now)
- **`src/pages/Competitions.tsx`** -- 4 sponsor/donate buttons
- **`src/pages/Advocates.tsx`** -- 2 Sponsor a Session buttons

No `preventDefault` or `setTimeout`. Links use `target="_blank"` so the current page stays open and the beacon sends reliably.

### Technical Summary

| Aspect | Detail |
|--------|--------|
| New file | `src/lib/tracking.ts` |
| Modified files | `vite-env.d.ts`, `Support.tsx`, `Competitions.tsx`, `Advocates.tsx` |
| Dependencies | None |
| Transport | `beacon` for reliability on navigation |
| Conversion ID | `AW-16798905432/2XDvCITusvcbENjoq8o-` |

