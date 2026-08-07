# Make Google Ads auto-detect form submissions sitewide

## What you asked for

You want to use Google Ads' guided setup — where Ads opens your page, you fill in and submit the form, and Ads acknowledges the submission and creates the conversion action for you. That feature works off the Google tag's **automatic form interaction detection**, not off the custom events this site sends today.

## What's blocking it right now

Confirmed by capturing live tag traffic during a real Get Care submission:

1. **Google's automatic detection already works** — it sent `form_start` and `form_submit` to AW-16798905432 on its own. Good news: the underlying mechanism is functional.
2. **The site sends its own event also named `form_submit`.** Ads received two `form_submit` hits 26ms apart. If you build a conversion action on the auto-detected form, every submission counts twice.
3. **The Ads wizard can't reach the Get Care form.** It lives in a modal that only opens after clicking a floating button, on a page with no URL that lands directly on the form. The wizard loads a URL and looks for a form; it will not find this one.
4. Same reachability problem applies to the BTY and OCS forms, which are behind tabs/steps.

## The fix

### 1. Stop the name collision (sitewide)

Rename the site's own duplicate event from `form_submit` to `vw_form_success` in `src/lib/sitewideFormTracking.ts`. The per-form events (`client_signup_success`, `vw_form_submit_clinician`, etc.) stay unchanged. Google's automatic `form_submit` then becomes the single, unambiguous signal Ads' wizard detects, while the site keeps its own confirmed-success events for GA4 reporting.

Update `docs/sitewide-google-form-tracking.md` and `docs/get-care-google-ads-conversion.md` to describe the new contract, and update the affected tests.

### 2. Make every public form reachable by a direct URL

So the Ads wizard (and you, during setup) can land straight on a live form:

| Form | Direct URL to add |
| --- | --- |
| Get Care signup | `/get-care?signup=1` opens the modal on load |
| Clinician interest | already inline on `/clinicians` |
| Overflow referral | `/clinicians?overflow=1` expands the panel |
| BTY guest | `/beyondtheyellow?form=guest` |
| BTY nomination | `/beyondtheyellow?form=nomination` |
| OCS routing | `/operation-claims-success?form=routing` |

Each is a small URL-param check in the page component that sets the existing open/tab state. No form logic changes.

### 3. Guarantee auto-detection can see every form

`SitewideFormTrackingManager` already stamps stable `id`/`name` on registered forms. Two hardening changes:

- Extend the manager so an unregistered public form still gets a generated stable `id`/`name` derived from its route, instead of being ignored. That makes the fix genuinely global for forms added later.
- Add a dev-only console warning when a `<form>` renders on a public route without a registration entry, so new forms don't silently fall out of tracking.

### 4. Keep the success signal honest

Google's automatic `form_submit` fires on submit *attempt*, not on backend success — that's inherent to the Ads auto-detection you want. The site's `vw_form_success` events remain the accurate, backend-confirmed measure. Recommendation once setup is done: use the auto-detected conversion for Ads optimization, and compare against `vw_form_success` in GA4 to see the true completion rate.

## What you do in Google Ads afterward

1. Confirm you are in customer **691-549-0774** (earlier screenshots showed AW-11339741081, a different account — nothing would ever appear there).
2. New conversion action → Website → enter the direct URL from the table.
3. Choose the form-submission detection option, submit the form in the wizard's window, and accept the detected form.
4. Repeat per form using each direct URL.

## Technical summary

Files touched: `src/lib/sitewideFormTracking.ts`, `src/components/routing/SitewideFormTrackingManager.tsx`, `src/pages/GetCareWithSignup.tsx`, `src/pages/Clinicians.tsx`, `src/pages/BeyondTheYellowPage.tsx`, `src/pages/OperationClaimsSuccessPage.tsx`, the two docs, and the related test files. No backend, database, or edge function changes — Billing Hub is already returning `conversionEligible: true` correctly.
