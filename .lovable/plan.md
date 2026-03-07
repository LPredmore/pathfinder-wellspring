

## Plan: Update Creator Application Conversion Tracking ID

This is straightforward. The new Google Ads conversion label you provided is `AW-16798905432/Ps8yCJDJqoQcENjoq8o-`. The current code in `src/lib/tracking.ts` already fires a manual `gtag('event', 'conversion', ...)` call on successful submission — it just has the old label (`6RqRCJ2PnfMbENjoq8o-`).

### Change

**`src/lib/tracking.ts`** — Update line 29's `send_to` value from:
```
AW-16798905432/6RqRCJ2PnfMbENjoq8o-
```
to:
```
AW-16798905432/Ps8yCJDJqoQcENjoq8o-
```

That's it. The function `trackCreatorApplicationConversion()` is already called at the right moment (after successful Supabase submission in `CreatorApplicationForm.tsx`), and gtag.js is already loaded in `index.html`. No other files need changes.

