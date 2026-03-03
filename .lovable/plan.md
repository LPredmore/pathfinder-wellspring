

## Updated Plan: Social Profiles → `creator_platforms` with Foreign Key

### Database Migration

1. **Add foreign key** on `creator_platforms.creator_id` → `creator_applications.id` with `ON DELETE CASCADE`
2. **Make `creator_id` NOT NULL** (every platform entry must belong to an application)
3. **Enable RLS on `sm_platforms`** + public SELECT policy (anyone can read the platform list)
4. **Enable RLS on `creator_platforms`** + anonymous INSERT policy + anonymous SELECT policy (applicants write their entries; `/challenge` page may read them)

### Form Component Changes (`CreatorApplicationForm.tsx`)

1. On dialog open, fetch platform names from `sm_platforms` table
2. Render them as dropdown options + a hardcoded "Other" at the end
3. When "Other" is selected, show a free-text input for the platform name
4. On Step 2 "Next", insert rows into `creator_platforms` (not JSON into `creator_applications.social_profiles`) with:
   - `creator_id` = application row ID from Step 1
   - `platform_name` = selected name or free-text value
   - `handle` = user-entered handle
   - `follower_count` = user-entered count
   - `approved_platform` = `true` if platform matches an `sm_platforms` name, `false` for custom entries

### Files Touched

| File | Action |
|---|---|
| DB migration | FK constraint, NOT NULL on creator_id, RLS policies on both tables |
| `src/components/forms/CreatorApplicationForm.tsx` | Fetch from `sm_platforms`, "Other" free-text, save to `creator_platforms` |

