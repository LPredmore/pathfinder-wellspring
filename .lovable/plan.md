## Diagnosis (confirmed)

- The clinician form calls edge function `register-clinician-interest` on the Billing Hub project (`ahqauomkgflopxgnlndd`).
- The deployed version returns `403 {"ok":false}` and logs `Clinician interest provisioning failed: [object Object]` — internal exception, opaque body, no CORS allowance for the Lovable preview origin.
- Its source is not in this repo, so we can't patch it in place.

## What I'll do (Option A: reimplement)

Create a new edge function in **this repo** at `supabase/functions/register-clinician-interest/index.ts` and let Lovable deploy it to project `ahqauomkgflopxgnlndd`, replacing the failing version. No client-side changes to the form's happy path.

### Function contract (matches what the form already sends)

Request body:
```
{ firstName, lastName, email, communicationConsent, company, submissionKey }
```

Behavior:
1. **CORS**: allow any origin (`*`) with the headers Supabase JS actually sends (`authorization, apikey, content-type, x-client-info, x-supabase-*`). Handle `OPTIONS` preflight. Every response — success and error — carries CORS headers.
2. **Validation** via Zod: names 1–100, valid email ≤255, `communicationConsent === true`, `company` and `submissionKey` optional strings. On failure → `400 { ok:false, message }` with CORS headers.
3. **Honeypot**: if `company` is non-empty, return `200 { ok:true, lifecycle:"invite_sent" }` without writing anything (silent drop of bots).
4. **Insert** one row into `public.website_submissions` using the service-role client:
   - `tenant_id = '00000000-0000-0000-0000-000000000001'` (matches existing rows)
   - `submission_type = 'clinician_interest'`
   - `normalized_lane = 'provider_recruiting'`
   - `source_system = 'website'`
   - `source_record_key = submissionKey` (dedupes retries)
   - `consent = communicationConsent`
   - `payload = { first_name, last_name, email, source: 'clinician_interest_form' }`
   - Use `upsert` on `source_record_key` (or catch unique-violation and treat as success) so a double-click doesn't 500.
5. **Return** `200 { ok:true, lifecycle:"invite_sent" }` on success. On unexpected error, `500 { ok:false, message:"..." }` **and** log the full stack with `console.error("register-clinician-interest failed", err)` — no more `[object Object]`.

### Auth / config

- Function config: `verify_jwt = false` (public intake form). Add `[functions.register-clinician-interest]` block to `supabase/config.toml`.
- Uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the platform-provided env (no new secrets required).

### Client cleanup (small, no logic change)

- Remove the temporary `console.error` debug block added in the last turn to `src/components/forms/ClinicianInterestForm.tsx`. Keep everything else as-is.

## Out of scope

- No changes to Billing Hub tables, RLS, or downstream provisioning (invite email, auth user creation). If a follow-up "send invite email" step is required, we add it in a second pass once we confirm submissions land in `website_submissions`.
- No UI, copy, route, or styling changes.
- No touching the legacy Supabase client or any other function.

## Verification after deploy

1. `supabase--curl_edge_functions` POST with a valid payload → expect `200 { ok:true, ... }`.
2. `supabase--read_query` on `website_submissions` → new row with `submission_type='clinician_interest'`.
3. Submit the form once from the preview → success screen renders, no console errors.
