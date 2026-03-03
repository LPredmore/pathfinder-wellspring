

## Redesign the Mission Partner Application Form

### Architecture Decision: Edge Function for Account Creation

The form needs to create a Supabase auth account with a generated password and store that password in `creator_applications.password`. This **cannot** be done from the client — `supabase.auth.admin.createUser()` requires the service role key, which must never be exposed client-side. The right approach is an **edge function** that:

1. Generates a random password
2. Calls `auth.admin.createUser({ email, password })` using the service role key
3. Inserts the initial `creator_applications` row (with the plaintext password) in the same transaction
4. Returns the row ID to the client

This keeps the service role key server-side and ensures the auth account and application row are created atomically. The client form calls this edge function at the end of Step 1 instead of doing a direct Supabase insert.

### Storage: Avatar Uploads

The existing `content-media` bucket is private. Avatar photos for competitors need to be publicly viewable on `/challenge`. Rather than making `content-media` public (it likely has other private assets), we create a **new public bucket** called `avatars`. The form uploads to `avatars/{application_id}/photo.{ext}` and stores the public URL in `creator_applications.avatar_url`.

### New Form Structure (4 steps, down from 5)

The old form had 5 steps covering campaign-specific fields (comfort level, fundraising goal, participation agreement). Those are removed — this is now a general application to participate in **future** competitions. The agreement and campaign-specific onboarding happen later, administratively.

**Step 1 — Welcome + Basic Info**
- Thank-you message: brief text thanking them for their eagerness to be part of Beyond the Yellow
- First Name, Last Name, Email, State (dropdown)
- On "Next": calls edge function `create-mission-partner` which creates auth account + inserts partial `creator_applications` row with generated password
- Error handling: if email already exists in auth, show a clear message

**Step 2 — Social Profiles**
- Intro copy: "ValorWell is as committed to supporting you as you are to supporting us. We will promote your social media profiles while you are competing for us. Please list them all below."
- Same multi-entry social profile UI (platform dropdown, handle, followers) — reuse existing pattern
- Saves to `creator_applications.social_profiles` via direct Supabase update (row already exists from Step 1)

**Step 3 — Profile & Mission**
- Photo upload (stored to `avatars` bucket → URL saved to `creator_applications.avatar_url`)
- Competition Display Name (saved to `pref_name`)
- "Why do you want to be part of Beyond the Yellow?" textarea (saved to `personal_mission`)

**Step 4 — Veteran Connection**
- Same veteran connection radio group as before (optional)
- On submit: final update to row, sets `status` to `'new'`

### Database Changes

1. **Create `avatars` storage bucket** (public) with RLS policy allowing anonymous uploads and public reads
2. No schema changes needed — all required columns already exist on `creator_applications` (`password`, `avatar_url`, `personal_mission`, `pref_name`)

### Edge Function: `create-mission-partner`

**Location:** `supabase/functions/create-mission-partner/index.ts`

- Accepts POST with `{ first_name, last_name, email, state }`
- Generates a 16-char random password
- Creates auth user via `supabase.auth.admin.createUser({ email, password, email_confirm: true })`
- Inserts into `creator_applications` with the user data + plaintext password + `status: 'partial'`
- Returns `{ id: <row_id> }`
- If email already taken in auth, returns 409 with clear error message
- Uses `SUPABASE_SERVICE_ROLE_KEY` (already configured in secrets)

### Form Schema Changes

The zod schema is simplified:
- **Removed**: `comfortLevel`, `fundraisingGoal`, `additionalInfo`, `acceptedRules`
- **Added**: `personalMission` (required, max 2000 chars), `prefName` now lives in Step 3
- **Kept**: `firstName`, `lastName`, `email`, `state`, `socialProfiles`, `veteranConnection`

### Button Text Change

The trigger button text changes from "Become a Mission Partner" to **"Apply to Compete"** — clearer about the intent being future competition participation.

### Files Touched

| File | Action |
|---|---|
| `supabase/functions/create-mission-partner/index.ts` | New edge function |
| `src/components/forms/CreatorApplicationForm.tsx` | Rewrite: 4-step form, edge function call, avatar upload, new copy |
| DB migration | Create `avatars` public bucket + RLS policies |

### What's Removed

- Comfort level question
- Fundraising goal question  
- Additional info field
- Full participation agreement + checkbox (this belongs in competition-specific onboarding, not general application)
- The `motivation` field is replaced by `personal_mission` which maps to the same-named column

