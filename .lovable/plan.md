# Diagnose the clinician signup 403

## What I know now

- Auth is fine — the request reaches the function (key fix from last turn worked).
- The function returns `403 {"ok":false}` with no `message`, so the client's fallback copy shows.
- Server logs show `ERROR Clinician interest provisioning failed: [object Object]` — the function caught an internal exception but logged it unhelpfully.
- The function source lives on the Billing Hub project, not in this repo (`supabase/functions/` doesn't contain it), so I can't edit its handler from here.

The single blocker is: **we don't know what the exception is.** Guessing at the payload shape or DB state without seeing the real error will burn turns.

## Plan: add one-shot client-side debug capture, then read it back

### Step 1 — Instrument `ClinicianInterestForm.tsx`
When the invoke fails, currently we throw away everything except `response?.message`. Change the catch path to also:

- `console.error` the raw `error` object, `error.name`, `error.message`, and (for `FunctionsHttpError`) `await error.context.text()` — this is the actual response body the edge function returned before the SDK stripped it down to `{ok:false}`.
- `console.error` the raw `response` if present.
- Keep the user-facing message unchanged.

That's ~10 lines inside the existing `if (error || response?.ok !== true)` block. No behavior change for successful submissions, no schema change, no new dependencies.

### Step 2 — User reproduces once
Ask the user to submit the form one more time from the preview. The console output will land in the next turn's `<console-logs>` context automatically.

### Step 3 — Diagnose from the real error text
With the actual response body in hand, one of three things will be true:

1. It names a validation problem (duplicate email, honeypot, missing field, RLS on a Billing Hub table). Fix on our side if it's a client payload issue; otherwise report exactly what needs changing on the Billing Hub function.
2. It's a downstream service failure (auth admin, email send, third-party). Report and hand back to the owner of that function.
3. It's opaque even in the body. Then I'll pull the function source from the Billing Hub project directly (via `supabase--read_query` on `supabase_functions` metadata / `curl` probes) and propose either a redeploy of a fixed version or a workaround.

## Out of scope
- Changing the edge function itself (source not in this repo).
- Any UI, copy, styling, or route changes.
- Touching the legacy Supabase client.
