

## Diagnosis: Why Google Ads Can't Find a Form on /beyondtheyellow

### The core problem: There is no `<form>` in the page DOM

The "Apply to Compete" button on /beyondtheyellow does **not** render a form on the page. It renders a **Radix Dialog** (modal) that is **closed by default**. The `<form>` element only gets mounted into the DOM when a user clicks the button and the dialog opens.

Google Ads scans the page HTML looking for `<form>` elements to set up conversion tracking. Since the form lives inside a closed dialog, Google sees an empty page with no forms.

### There is also no form submission conversion event

Looking at `src/lib/tracking.ts`, the only conversion event defined is `trackDonateConversion` — which fires for donate/sponsor button clicks. There is **no conversion event for the creator application form submission**. The `CreatorApplicationForm` component's `onSubmit` handler updates Supabase but never calls `gtag("event", "conversion", ...)`.

### The Google Ads account mismatch

The conversion events in `tracking.ts` reference Ads account `AW-16798905432`, but `index.html` only configures `AW-11339741081`. The second account is never initialized via `gtag('config', 'AW-16798905432')`, which means even if a conversion event fires, it may not reliably reach the correct Ads account.

### Summary

1. **No visible form on page load** — the form is inside a closed modal dialog, so Google Ads' page scanner can't detect it.
2. **No conversion tracking on form submit** — the creator application form never fires a `gtag` conversion event.
3. **Missing Ads config** — the Ads account used in conversion events (`AW-16798905432`) is not configured in the global gtag setup in `index.html`.

All three of these need to be addressed for Google Ads to track creator application conversions on /beyondtheyellow.

