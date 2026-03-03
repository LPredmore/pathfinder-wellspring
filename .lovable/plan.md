

## Diagnosis Recap

The `/challenge` page reads social links from `current_competitors.social_profiles`, a JSON blob copied from the application form. That blob stores platforms the applicant typed into a freeform "Other" field as `"platform": "Other"` — losing the actual platform name. Meanwhile, the normalized `creator_platforms` table stores the correct platform names (e.g., "SnapChat", "Reddit") because the form writes them properly there.

The `current_competitors` and `creator_applications` tables share the same IDs, so every competitor can be joined to their `creator_platforms` rows.

## The Right Fix: Query `creator_platforms` Instead of the JSON Blob

**Decision**: Stop reading `social_profiles` JSON from `current_competitors`. Instead, join `creator_platforms` by `creator_id` to get the correctly normalized platform data.

**Why this is the right call** (not just the easy one):

1. **Single source of truth.** The `creator_platforms` table is where the application form writes structured platform data. The `social_profiles` JSON blob is a legacy artifact — a denormalized copy that was never updated when the form started categorizing platforms properly. Reading from two sources for the same data guarantees drift.

2. **Already normalized.** `creator_platforms` has discrete columns for `platform_name`, `handle`, `follower_count`, and `approved_platform`. The JSON blob mashes everything into untyped objects with inconsistent keys. There is no reason to parse JSON when a proper relational table already exists.

3. **No data migration needed.** The `current_competitors.id` matches `creator_applications.id` which is the `creator_id` foreign key in `creator_platforms`. The join is already there — we just aren't using it.

4. **The `approved_platform` flag already exists.** `creator_platforms` tracks whether a platform was from the approved `sm_platforms` list or a custom "Other" entry. This gives you filtering capability the JSON blob never could.

## Implementation

### 1. Update `Challenge.tsx` query

Replace the current single-table query:
```
supabase.from("current_competitors").select("*")
```

With a query that fetches competitor info and joins their platforms:
```
supabase.from("current_competitors").select("*")
```
Then, for each competitor, fetch their platforms from `creator_platforms` using `competitor.id` as `creator_id`. (Or batch-fetch all platforms for all competitor IDs in a single query.)

The most efficient approach: fetch all competitors, collect their IDs, then fetch all `creator_platforms` rows where `creator_id` is in that set. Map them client-side.

### 2. Update `CompetitorCard` to use the joined data

Instead of parsing `competitor.social_profiles` (JSON), pass the `creator_platforms` rows as a typed array. The `PlatformIcon` component already handles the mapping — it just needs the correct `platform_name` string instead of `"Other"`.

### 3. Handle the true "Other" case

Robyn's platform is genuinely `"Other"` in `creator_platforms` (platform_name = "Other"). This is correct behavior — the Globe icon is the right fallback for an unrecognized platform. The difference is that Liberty's SnapChat and Kate's Reddit are no longer misclassified.

### 4. No schema changes needed

No new columns, no migrations, no data backfills. The data is already correct in `creator_platforms`. We're just pointing the frontend at the right table.

### Files Changed

| File | Change |
|---|---|
| `src/pages/Challenge.tsx` | Replace `social_profiles` JSON parsing with a second query to `creator_platforms`. Update `CompetitorCard` props to accept platform rows instead of JSON. |

### What This Fixes

| Creator | Before | After |
|---|---|---|
| Liberty Adams | SnapChat shows as Globe + text ("Other") | SnapChat icon, clickable link |
| Kate Inspires You | Reddit shows as Globe + text ("Other") | Reddit icon, clickable link |
| Robyn | Shows as Globe ("Other") | Still Globe — genuinely "Other" in the data, which is correct |

