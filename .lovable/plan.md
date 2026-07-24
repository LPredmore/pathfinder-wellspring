# Diagnosis

## 1. Google tag coverage — already global
`index.html` loads `gtag.js` (AW-11339741081) and fires `config` calls for both Google Ads accounts (AW-11339741081, AW-16798905432) and both GA4 properties (G-TZMBM6V5DW, G-H5X3D2DGKB) in `<head>`. Because ValorWell is a single-page React app, this script executes once and stays active on every route (`/`, `/mission`, `/operation-claims-success`, `/beyondtheyellow`, `/partner`, `/clinicians`, `/get-care`, `/contact`, `/privacy`, `/faq`, `/support`, `/videos`, authority pages, etc.). No per-page tag installation is needed. Nothing to change here.

Caveat (not part of this fix): the site does not currently push a `page_view` on SPA route changes, so GA4 reports one pageview per session instead of per route. Flagging only — not fixing unless you ask.

## 2. Clinician signup failure — root cause confirmed
The form `ClinicianInterestForm` posts to the Billing Hub edge function `register-clinician-interest` using `billingHubSupabase` from `src/integrations/supabase/client.ts`. That client is constructed with a **hardcoded** publishable key:

```
BILLING_HUB_PUBLISHABLE_KEY = "sb_publishable_VVcb2HRrfnMm-T1Y0i7Gtw_qLhuPMYT"
```

I reproduced the failure against the Billing Hub project directly:

- With the hardcoded `sb_publishable_...` key → **HTTP 401** `{"message":"Invalid API key","hint":"...This API key might also be owned by another Supabase project."}` — the request never reaches the function.
- With the current anon key from `.env` (`VITE_SUPABASE_PUBLISHABLE_KEY`, JWT format, `ref=ahqauomkgflopxgnlndd`) → request reaches the function and returns 200/403 from function logic, not an auth error.

So the hardcoded `sb_publishable_...` key is stale/invalid for the current Billing Hub project. Every clinician submission from the live site fails at the Supabase edge before the function ever executes, which is why nothing shows in the function logs.

# Fix

Single, surgical edit to `src/integrations/supabase/client.ts`:

1. Replace both hardcoded Billing Hub constants with values read from Vite env:
   - `BILLING_HUB_URL` → `import.meta.env.VITE_SUPABASE_URL`
   - `BILLING_HUB_PUBLISHABLE_KEY` → `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`
   (The `.env` values already point at the Billing Hub project `ahqauomkgflopxgnlndd`, so this makes the client use the currently valid anon key and stays in sync with Lovable Cloud's auto-populated env.)
2. Leave the legacy client (`supabase`) untouched — it still needs its own hardcoded legacy URL/key because `.env` is bound to the Billing Hub project.

## Verification
- Rebuild, submit the clinician form from the preview, confirm the response is `{ok:true}` and the success state renders.
- If the function still returns `{ok:false}` after the auth fix, that is a separate function-side issue (validation, duplicate email, honeypot, etc.) on the Billing Hub project — I'll surface the exact reason from the function response and we can decide next steps then. Not touching function code in this change.

## Out of scope
- No changes to routes, copy, styling, analytics, forms other than the client key, or the legacy Supabase client.
