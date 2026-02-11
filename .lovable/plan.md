

## Creator Application Questionnaire — Updated Plan

### Overview

Create a dialog-based creator application form that replaces all "Apply to Compete" buttons/links on `/competitions` and `/advocates`. The form has 4 sections, saves to Supabase, and opens as a modal dialog.

---

### Database: New Table

**Migration: `creator_applications`**

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | No | gen_random_uuid() |
| created_at | timestamptz | No | now() |
| first_name | text | No | -- |
| last_name | text | No | -- |
| email | text | No | -- |
| state | text | No | -- |
| social_profiles | jsonb | No | -- |
| motivation | text | No | -- |
| veteran_connection | text | Yes | -- |
| willing_to_share | boolean | No | -- |
| comfort_level | text | No | -- |
| fundraising_goal | text | No | -- |
| additional_info | text | Yes | -- |
| status | text | No | 'new' |

- RLS enabled with anonymous INSERT policy (matches `therapist_applications` pattern)
- `social_profiles` stores repeating entries as JSON array: `[{"platform":"TikTok","handle":"@user","followers":5000}]`

---

### New File: `src/components/forms/CreatorApplicationForm.tsx`

A `Dialog` component with a customizable trigger button. Uses `react-hook-form` with `zod` validation and `useFieldArray` for the repeating social profiles block.

**Section 1 -- Basic Info**
- First Name (required, max 100)
- Last Name (required, max 100)
- Email (required, email)
- State (required, dropdown with all 50 US states as 2-letter codes)

**Section 2 -- Social Profiles (repeating)**
- "Add a social platform" button to add entries (minimum 1 required)
- Each entry: Platform dropdown (TikTok, Instagram, YouTube, LinkedIn, Facebook, X (Twitter), Podcast, Other), Handle/URL (text), Follower count (number)
- Remove button on each entry (hidden when only 1 remains)

**Section 3 -- Fit and Motivation**
- "Why do you want to be involved?" (required, textarea with placeholder prompt)
- "Personal connection to veterans?" (optional, RadioGroup with 5 options)

**Section 4 -- Fundraising Readiness**
- "Willing to share fundraiser link at least 2 times?" (required, Yes/No radio)
- "How comfortable asking audience to donate?" (required, RadioGroup: Very comfortable / Somewhat comfortable / Not very comfortable, but I'm willing to learn)
- "Realistic fundraising goal in 30 days?" (required, RadioGroup: 10 sessions ($500) / 25 sessions ($1,250) / 50 sessions ($2,500) / 100 sessions ($5,000+) / Not sure yet)
- "Anything else you want us to know?" (optional, textarea)

**On submit:** Inserts into `creator_applications` table, then shows a success confirmation inside the dialog.

**Component API:**
```text
<CreatorApplicationForm 
  buttonVariant="default" 
  buttonSize="lg" 
  buttonClassName="w-full" 
/>
```

---

### Files to Modify

**`src/pages/Competitions.tsx`** -- 3 replacements:
1. Line 147-149: Replace `<Link to="/competitions/apply">Apply to Compete</Link>` button in card footer with `<CreatorApplicationForm buttonClassName="w-full" />`
2. Line 300-302: Replace `<Link to="/competitions/apply">Apply to Compete</Link>` button in final CTA with `<CreatorApplicationForm buttonSize="lg" buttonVariant="outline" />`
3. Update FAQ answer for "how do I join?" to say "Click the Apply to Compete button on this page" instead of referencing a separate page

**`src/pages/Advocates.tsx`** -- 1 replacement:
1. Lines 120-123: Replace the `<Link to="/competitions/apply">` button in "How to Get Featured" with `<CreatorApplicationForm buttonSize="lg" />`

---

### Technical Details

| Aspect | Detail |
|--------|--------|
| Dialog | `max-h-[85vh] overflow-y-auto` for scrolling on smaller screens |
| Form sections | Visual dividers with section headings matching TherapistApplicationForm style |
| Validation | All required fields validated client-side with zod before Supabase insert |
| Social profiles | `useFieldArray` from react-hook-form; starts with 1 entry |
| Success state | Replaces form content with checkmark and "Application Received!" message |
| Supabase insert | Follows same pattern as TherapistApplicationForm (`supabase.from("creator_applications").insert(...)`) |

