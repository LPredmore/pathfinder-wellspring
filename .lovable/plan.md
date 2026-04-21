

## Plan: Track Outbound Clicks on /vibetales

### What needs to happen

Google Ads gave you a conversion snippet that fires when a user clicks an outbound link. We need to wire this into the three external buttons on `/vibetales`:

1. **Try on Web** → `https://vibetales.bestselfs.com/`
2. **iOS App** → Apple App Store
3. **Android App** → Google Play
4. **Get Started Free** (bottom CTA) → `https://vibetales.bestselfs.com/`

(I'll include the bottom CTA too since it's the same kind of outbound conversion — let me know if you want it excluded.)

### How we'll build it

**Add a new tracking function to `src/lib/tracking.ts`** — `trackVibeTalesOutboundClick(url)`. It mirrors the exact pattern from Google's snippet and matches the existing `trackPageAndRedirect` helper already in the file:

- Fires `gtag('event', 'conversion', { send_to: 'AW-16798905432/YutLCKDmnqAcENjoq8o-', value: 1.0, currency: 'USD', event_callback })`
- Uses a 2-second hard timeout fallback (same safety pattern already in the codebase) so users are never stranded if gtag fails or is blocked
- Navigates to the destination URL via `window.location.href = url` once the beacon fires

**Update `src/pages/VibeTales.tsx`** — Convert the four outbound `<a>` buttons from plain anchor tags into buttons with `onClick` handlers that call the new tracking function. We'll keep them visually identical, keep `target="_blank"` behavior by opening the URL in a new window from the callback (using `window.open` instead of `window.location` for these, since they're external apps you probably want opening in a new tab — confirming that matches current behavior).

### Files changed

- **`src/lib/tracking.ts`** — Add `trackVibeTalesOutboundClick` function
- **`src/pages/VibeTales.tsx`** — Wire the four outbound buttons to call it

### Note on behavior

The current buttons open in a new tab (`target="_blank"`). Google's snippet uses `window.location = url` which navigates the current tab. We'll preserve your current new-tab behavior by calling `window.open(url, '_blank')` inside the `event_callback` instead, so the conversion still fires reliably and the user experience doesn't change.

