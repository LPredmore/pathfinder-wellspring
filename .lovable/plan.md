

## Side-Effect Analysis: Migrating to `influencers` + `influencer_platforms` + `profiles`

### 1. The `profiles` table must be rebuilt — it's structurally broken

The current `profiles.id` is `bigint` with no FK to `auth.users`. It needs to be `uuid` referencing `auth.users(id)`. This means **dropping and recreating the table**. It's currently empty, so no data loss. But:

- **No RLS policies exist on `profiles`.** Since it will store plaintext passwords, you need a restrictive RLS policy (service_role only, no public/anon access). If this is missed, anyone with the anon key can read every user's plaintext password.
- **No other code references `profiles` for reads or writes today**, so the rebuild itself is safe.

### 2. The `app_role` enum only has `'admin'` and `'user'` — no `'influencer'`

The `role_options` table has `'influencer'` as a row, but that's just a reference lookup. The actual `user_roles.role` column is typed as `app_role` enum, which only accepts `'admin'` or `'user'`. Inserting `'influencer'` will fail with a Postgres error.

- **Side effect of `ALTER TYPE app_role ADD VALUE 'influencer'`**: The `has_role()` function, all RLS policies that use it, and the `user_roles` table all reference this enum. Adding a value is safe (Postgres enums are append-only), but you cannot remove it later without recreating the enum. This is a one-way door.
- **The TypeScript types file** (`src/integrations/supabase/types.ts`) will auto-regenerate to include `'influencer'` in the `app_role` union. Any code that exhaustively switches on `app_role` values will need updating — but today nothing does this on the frontend.

### 3. The `influencers` table has no `user_id` column

Adding `user_id uuid REFERENCES auth.users(id)` is straightforward, but:

- **The 18 existing influencer rows have no auth users linked to them.** Their `password` column is `NULL` for all rows. The original auth accounts were created by the edge function but the IDs were never stored in `influencers`. These existing rows will have `user_id = NULL` unless you backfill.
- **This means the existing 18 influencers cannot be linked to their auth accounts retroactively** without manually matching by email against `auth.users`. This isn't a blocker for new applicants, but existing data will be orphaned from the auth system.

### 4. The `influencers` table has no RLS policies

Right now it's wide open. The `/challenge` page needs public SELECT, but you also need to prevent anonymous users from updating or inserting arbitrary rows. The `influencer_platforms` table also has no RLS. Both need policies before going live.

### 5. The `creator_platforms` FK column is named `influencer_id`, not `creator_id`

Look at the schema: `creator_platforms` has a column called `influencer_id` (confusingly named). The current `Challenge.tsx` queries it as `creator_id` — which means the query in the code I just built is actually selecting a non-existent column. Let me verify...

Actually, looking at the query results, the data comes back with `creator_id` in the output. But the schema definition says the column is `influencer_id`. The Supabase types file confirms: `creator_platforms` has `influencer_id`, not `creator_id`. The FK relationship references `creator_applications.id`. So the column name in the table is `influencer_id` but the FK target is `creator_applications`. This naming inconsistency means:

- **When we switch the form to write to `influencer_platforms`**, the FK column is also `influencer_id`, which is consistent.
- **The `Challenge.tsx` code currently queries `creator_platforms` selecting `creator_id`** — this appears to work because Supabase may be aliasing, or there's a mismatch I need to flag. Either way, switching to `influencer_platforms` with `influencer_id` is cleaner.

### 6. The edge function `create-mission-partner` currently writes to `creator_applications`

Changing it to write to `profiles`, `user_roles`, and `influencers` instead means:

- **The edge function returns `appRow.id`** (the `creator_applications` row ID), which the form stores as `rowId` and uses for all subsequent writes. If we switch to returning the `influencers.id`, the form needs to use that ID for writing to `influencer_platforms` (step 2) and updating `influencers` (steps 3-4). This is a coordinated change — if the edge function deploys before the frontend updates, or vice versa, **new applications will break**.
- **The edge function has `verify_jwt = false`** in `config.toml`. This is intentional (anonymous applicants), but the new writes to `profiles` and `user_roles` use service_role in the edge function, so this is fine.

### 7. The form's final submit writes to `creator_applications`

Line 260: `.from("creator_applications" as any)`. This updates `pref_name`, `personal_mission`, `veteran_connection`, `status`, and `avatar_url`. Switching to `.from("influencers")` means:

- The `influencers` table has all these same columns, so the update payload is compatible.
- **But the `as any` cast exists because TypeScript types don't match.** After the migration, the auto-generated types will include `influencers` properly, so the cast can be removed. If we forget to remove it and leave `creator_applications`, the old table still gets written to.

### 8. The `/challenge` page currently reads from `current_competitors`

Switching to `influencers` requires a filter to show only active competitors. The `current_competitors` table is a manually curated subset (13 rows) of the 18 in `influencers`. There's no status flag that distinguishes them — they all have `status = 'new'` or `'partial'`. 

- **You need a new mechanism to mark who's an active competitor.** Options: a boolean `is_competing` column, a status value like `'competing'`, or keep the `current_competitors` table as-is for now. Without this, switching to `influencers` will either show all 18 applicants (including incomplete ones) or show none.
- **This is the biggest risk**: if you remove the `current_competitors` dependency without solving the filtering problem, the `/challenge` page breaks or shows wrong data.

### 9. Existing data duplication

`creator_applications` and `influencers` have identical IDs and data for the same 18 rows. `creator_platforms` and `influencer_platforms` have identical data (24 rows each). This duplication exists today. After the migration:

- **New applicants will only write to `influencers` + `influencer_platforms`.** The old tables become stale.
- **Any admin tooling or CRM views** that read from `creator_applications` will stop seeing new applicants. I searched the codebase and found no other frontend code reading from `creator_applications` or `creator_platforms` besides the form and challenge page. But if there's an external admin app (the "Therapist CRM" referenced in the Supabase project name), it may be reading from these tables.

### 10. Avatar storage path uses `rowId`

The avatar upload path is `${rowId}/photo.${ext}` in the `avatars` bucket. If `rowId` changes from `creator_applications.id` to `influencers.id`, and these IDs are the same (they are for existing data), existing avatars remain accessible. For new applicants, the `influencers.id` will be a new UUID, so avatars will be stored under a new path. No conflict.

### Summary: What Could Break

| Risk | Severity | Mitigation |
|---|---|---|
| `profiles` table exposed without RLS (plaintext passwords readable) | **Critical** | Add service_role-only RLS before deploying |
| `app_role` enum doesn't have `'influencer'` — edge function insert to `user_roles` will fail | **Critical** | Must be in same migration |
| No filter to distinguish active competitors from all influencers | **High** | Need a column or status value before switching `/challenge` away from `current_competitors` |
| Edge function + frontend must deploy together or new applications break | **High** | Deploy in single change |
| Existing 18 influencer rows have no `user_id` — orphaned from auth | **Medium** | Backfill by matching email to `auth.users`, or accept orphan state |
| `influencers` and `influencer_platforms` have no RLS policies | **Medium** | Add public SELECT + restricted write policies |
| External admin tools reading `creator_applications` won't see new data | **Medium** | Verify no external consumers; update if needed |
| `creator_platforms.influencer_id` naming confusion in current code | **Low** | Switching to `influencer_platforms` resolves this |

