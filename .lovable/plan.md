# Make the Google Ads form-detection wizard work on /get-care

## Root cause (confirmed)

Your website is not tagged for the Google Ads account you're working in.

- The live site loads exactly two Google tags: `G-H5X3D2DGKB` (Analytics) and `AW-16798905432` (Ads). Verified in the published `index.html` and the published JS bundle.
- The account you are running the conversion wizard in is **AW-6832312938**.

Google Ads' guided form detection works by opening your page and listening for form activity **reported to the tag of the account you're in**. Since `AW-6832312938` has no tag on the page, the wizard sees no Google tag for itself and never acknowledges the submission. It has nothing to do with the form.

Everything else already checks out:

- Two real signups succeeded tonight — Billing Hub logged `accountCreated: true, conversionEligible: true, source: valorwell_get_care`, HTTP 200 both times.
- The published bundle contains the stable form id `valorwell-get-care-signup`, `vw_form_success`, and `client_signup_success`.
- `https://www.valorwell.org/get-care?signup=1` loads live with the intake form already open and visible — confirmed in a real browser against production.
- Google's automatic `form_start` / `form_submit` detection is firing; it just goes to `AW-16798905432`.

## The fix

### 1. Add the second Ads account to the site tag

In `index.html`, add one line next to the existing configs:

```js
gtag("config", "AW-6832312938");
```

That's the whole functional change. The Google tag then reports the automatic `form_start` / `form_submit` events to **both** Ads accounts, so the wizard running in `AW-6832312938` can detect and acknowledge the Get Care form.

Keep `AW-16798905432` configured — removing it would break the existing donate conversion that already fires against it.

### 2. Decide which account is canonical (your call, no code impact today)

You now have three IDs in play across our conversation: `AW-16798905432` (on the site), `AW-11339741081` (earlier screenshot), `AW-6832312938` (current). Long term, one Ads account should own conversions. Once you tell me which, I'll drop the others from the tag so reporting isn't split.

### 3. Update the docs

`docs/sitewide-google-form-tracking.md` currently names customer `691-549-0774` / `AW-16798905432` as the required account. Update it to record both tagged Ads accounts and note which one is canonical.

## What you do in Google Ads after this ships

1. Publish the site so the new tag config is live.
2. In `AW-6832312938`: Goals → Conversions → New conversion action → Website.
3. Enter `https://www.valorwell.org/get-care?signup=1` — the page loads with the form already open.
4. Choose the form-submission detection option and submit the form in the wizard's window. It will now see the tag and acknowledge the form.
5. Repeat with the other direct URLs (`/clinicians`, `/beyondtheyellow?form=guest`, `/beyondtheyellow?form=nomination`, `/operation-claims-success?form=routing`).

Note: each wizard test submission creates a real client account in Billing Hub. Use a throwaway email you can identify.

## Technical summary

Files touched: `index.html` (one added `gtag("config", ...)` line) and `docs/sitewide-google-form-tracking.md`. No React, backend, database, or edge function changes — the form, its stable identity, its direct URL, and its confirmed-success events are all already correct and live.
