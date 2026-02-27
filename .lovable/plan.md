

## Update Creator Application Form and Session Pricing

### Overview

Two changes: (1) remove the "willing to share" field from the application form, and (2) update all session pricing from $50/session to $75/session site-wide, plus add a 5-session option to the fundraising goals.

### Changes

**1. `src/components/forms/CreatorApplicationForm.tsx`**

- **Remove `willingToShare` from the Zod schema** (line 84): Delete the `willingToShare` field entirely
- **Remove from `STEP_FIELDS`** (line 105): Remove `"willingToShare"` from the step 4 array
- **Remove the `willingToShare` watch** (line 150)
- **Remove the "willing to share" radio group UI** (lines 468-484): Delete the entire block
- **Remove `willing_to_share` from step 3 save payload** (line 206)
- **Remove `willing_to_share` from `onSubmit` final payload** (line 241)
- **Remove `willing_to_share` from the fallback insert** (line 275)
- **Update `FUNDRAISING_GOALS`** (lines 62-68): Change to $75/session math and add 5-session option:
  - `"5 sessions ($375)"`
  - `"10 sessions ($750)"`
  - `"25 sessions ($1,875)"`
  - `"50 sessions ($3,750)"`
  - `"100 sessions ($7,500+)"`
  - `"Not sure yet"`

**2. `src/pages/Competitions.tsx`** -- Update all $50 references to $75:

- SEO description (line 86): `$75 sponsors 1 session`
- Hero badge (line 113): `$75 sponsors 1 therapy session`
- Creator card bullet (line 144): `$75 = 1 session`
- Sponsor card grid (lines 183-186): Recalculate with $75 and add 5-session tier:
  - `$75 = 1 session`
  - `$150 = 2 sessions`
  - `$375 = 5 sessions`
  - `$750 = 10 sessions`
- Eligibility section (currently says 25 sessions / $1,250): Update to `$1,875`

**3. `src/pages/Support.tsx`** -- Update $50 references to $75:

- SEO description: `$75 sponsors 1 session`
- Hero badge: `$75 sponsors 1 therapy session`
- Donation tier grid: Recalculate with $75 and add 5-session option
- Monthly sponsor line: `$75/month`

**4. `src/pages/Advocates.tsx`** -- Update $50 references to $75:

- SEO description: `$75 sponsors 1 session`
- Hero badge: `$75 sponsors 1 therapy session`

### Note on Database

You mentioned you'll manually delete the `willing_to_share` column in Supabase -- the code changes will simply stop reading/writing that column, so both can happen in any order without breaking anything.

