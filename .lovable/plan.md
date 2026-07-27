## Revised assessment

The canonical repo is the Lovable project [ValorWell CRM](/projects/67d68fb5-d6d7-40fb-b409-203945e02edd). That changes the conclusion in a good way: **no SQL needs to be authored**. The migrations already exist, written and reviewed, in that project. They were simply never applied to the database.

### What I verified

- The CRM project's `supabase/config.toml` points at `project_id = "ahqauomkgflopxgnlndd"` — the **same Supabase database this website uses**. So the CRM project can apply migrations directly to production; there is no cross-account handoff problem.
- The CRM repo contains these three files:
  - `20260717225018_creator_community_interest_workflow.sql` — adds `relationship_contacts.review_state` (+ check constraint, indexes), `crm_notes.relationship_contact_id` (+ FK), the `relationship_interest_submission_conflicts` view, tenant-aware RLS policies, and `submit_website_creator_interest(jsonb)` granted to `anon`.
  - `20260718112222_website_bty_nomination_intake.sql` — adds `submit_website_bty_nomination(jsonb)` granted to `anon`, plus tenant hardening.
  - `20260718124000_retire_broad_bty_public_rpc.sql` — revokes `anon`/`authenticated` execute on the legacy broad `submit_website_bty_submission(jsonb)`, leaving it service-only.
- Against the live database:
  - `supabase_migrations.schema_migrations` jumps from `20260717204832` straight to `20260719112717`. **None of the three versions above are recorded as applied.**
  - `submit_website_creator_interest` and `submit_website_bty_nomination` do **not** exist in `pg_proc`. `submit_website_bty_submission`, `submit_website_ocs_inquiry`, and `submit_website_clinician_application` do exist.
  - `relationship_contacts` has no `review_state` column.
- This website calls the two missing functions from `src/components/intake/UnifiedBtyForm.tsx` (`submit_website_creator_interest`) and `src/components/intake/BtyNominationForm.tsx` (`submit_website_bty_nomination`).

### Root cause, in one sentence

The BTY creator-interest and nomination forms fail because the two RPCs they call were authored in the CRM project but the migrations were never run against `ahqauomkgflopxgnlndd`; the database still only has the older broad BTY function.

### Known risk to flag

The three files are timestamped *before* migrations that have since been applied (`20260719112717_establish_relationship_crm_architecture.sql` and everything after). Applying them now runs them out of order, so later policies/columns may already have been redefined by newer migrations. The files are largely idempotent (`add column if not exists`, `create index if not exists`, `drop policy if exists` / `create policy`), but two things must be checked before/after applying:

1. Whether the `drop policy` + `create policy` blocks would **regress** policies that a newer migration replaced with a stricter version on `relationship_contacts`, `relationship_social_profiles`, `relationship_contact_roles`, `relationship_influencer_profiles`, `website_submissions`, and `crm_notes`.
2. Whether `website_submissions.source_system` / `payload` shape still matches (the website repo's contact table uses `source` / `source_record_key`, which those functions already account for).

If regression risk is real, the correct move is a **new forward-dated migration in the CRM project** that contains only the two function definitions + grants (and, if still missing, the `review_state` / `relationship_contact_id` columns), skipping the historical policy rewrites.

### Work in this website repo

Essentially none. Once the RPCs exist, `UnifiedBtyForm.tsx` and `BtyNominationForm.tsx` should work as written. Afterwards I would:
- Regenerate `src/integrations/supabase/types.ts` so the two new RPC names are typed.
- Re-run the existing tests `UnifiedBtyForm.test.tsx` and `BtyNominationForm.test.tsx`.
- Live-verify one creator-interest and one nomination submission and confirm the rows land.

---

## Copy-and-paste instructions for the ValorWell CRM project

Paste everything below into a new chat in the ValorWell CRM Lovable project.

```text
The ValorWell public website (project c758642f-82dd-4b2c-89f4-751876e059fc) has two broken
Beyond The Yellow intake forms. Both call RPCs that exist as migration files in THIS repo
but were never applied to the shared Supabase database (ahqauomkgflopxgnlndd).

CONFIRMED FACTS (already verified against production):
- public.submit_website_creator_interest(jsonb) does NOT exist in pg_proc.
- public.submit_website_bty_nomination(jsonb) does NOT exist in pg_proc.
- public.relationship_contacts has NO review_state column.
- supabase_migrations.schema_migrations goes 20260717204832 -> 20260719112717, so these
  three files in supabase/migrations/ were never applied:
    20260717225018_creator_community_interest_workflow.sql
    20260718112222_website_bty_nomination_intake.sql
    20260718124000_retire_broad_bty_public_rpc.sql
- The website calls these RPCs anonymously (anon role) from the browser.

DO THIS, IN ORDER. Do not write new business logic — reuse the SQL already in this repo.

STEP 1 — Drift audit (read-only, report before changing anything).
For each of the three unapplied files, compare its statements against the CURRENT live
schema. Specifically report:
  a) Which columns/constraints/indexes/views in those files are already present.
  b) Every "drop policy ... / create policy ..." in those files where the live policy has
     since been REPLACED by a newer applied migration. List table, policy name, live
     definition, and the definition the old file would install. These are regressions and
     must NOT be re-applied.
  c) Whether website_submissions still has source_system, submission_type, status,
     contact_id, payload, source_record_key, submitted_at with the shapes those functions
     assume.

STEP 2 — Write ONE new forward-dated migration (do not retro-apply the old files).
Name it something like 20260727HHMMSS_restore_website_bty_public_intake.sql. It must contain
ONLY what is still missing, copied verbatim from the two source files:
  - alter table public.relationship_contacts add column if not exists review_state text
    + the relationship_contacts_review_state_check constraint (guarded by if-not-exists)
    + the review-queue and interest-source indexes, if absent.
  - alter table public.crm_notes add column if not exists relationship_contact_id uuid
    + the relationship_contacts_tenant_id_id_key unique constraint
    + crm_notes_relationship_contact_id_fkey, if absent.
  - the relationship_interest_submission_conflicts view (security_invoker = true), if absent.
  - create or replace function public.submit_website_creator_interest(jsonb) — copied
    verbatim from 20260717225018_creator_community_interest_workflow.sql.
  - create or replace function public.submit_website_bty_nomination(jsonb) — copied
    verbatim from 20260718112222_website_bty_nomination_intake.sql.
  - the grants exactly as written in the source files:
      revoke all on function ... from public, anon, authenticated, service_role;
      grant execute on function ... to anon, authenticated;
  - the anon table revokes those files perform (revoke all on table
    public.website_submissions from anon, etc.) ONLY if anon currently holds privileges.
  - the 20260718124000 revoke of submit_website_bty_submission(jsonb) from anon/authenticated,
    with grant execute to service_role — but ONLY AFTER you confirm no live website code path
    still calls it. It is NOT called by the two forms above.
DO NOT include any policy DDL that Step 1 flagged as a regression. Keep the tenant-aware
policies from those files ONLY where the live policy is still the older role-only version.

STEP 3 — Verify with SQL after the migration runs:
  - both functions exist in pg_proc with the correct signatures;
  - has_function_privilege('anon', 'public.submit_website_creator_interest(jsonb)','EXECUTE')
    and the same for submit_website_bty_nomination = true;
  - anon has NO direct table privileges on relationship_contacts, relationship_contact_roles,
    relationship_social_profiles, relationship_influencer_profiles, website_submissions;
  - relationship_contacts.review_state and crm_notes.relationship_contact_id exist;
  - the existing checks in supabase/verification/ for these workflows pass.

STEP 4 — Report back to me with:
  - the final migration filename,
  - the Step 1 drift findings,
  - anything you deliberately skipped and why,
  - confirmation that the two RPCs are anon-executable.
Then I will re-test both forms from the website.
```
