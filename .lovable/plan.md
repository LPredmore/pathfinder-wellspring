

## Therapist Interest Form - Native Implementation

### Overview

Replace the external Google Form link with a native form embedded directly on the `/therapists` page. This stores submissions in Supabase for better conversion tracking and data ownership.

### Form Fields (from Google Form)

Based on the uploaded PDF, the form collects:

1. **First Name** (required) - text input
2. **Last Name** (required) - text input  
3. **Preferred Email** (required) - email input
4. **Phone Number** (required) - phone input
5. **Licensed States** (required) - multi-select checkboxes (all 50 states)
6. **License Type** (required) - single select radio:
   - Psychologist
   - Professional Counselor
   - Clinical Social Worker
   - Mental Health Counselor
   - Marriage & Family Therapist
7. **How did you hear about ValorWell?** (required) - single select:
   - Friend
   - Online Search
   - LinkedIn
   - Social Media
   - Email
   - Online Job Posting
8. **Telehealth experience?** (required) - Yes/No radio
9. **Why do you want to work with ValorWell?** (required) - textarea
10. **Weekly hours commitment** (required) - single select:
    - 30+ hours a week
    - 20-30 hours a week
    - 10-20 hours a week
    - Whenever I find time

### Database Design

Create a `therapist_applications` table to store submissions. Since no authentication is required, the table needs:
- Public INSERT access (anyone can submit)
- No SELECT/UPDATE/DELETE access (only admins via Supabase dashboard)

```text
Table: therapist_applications
---------------------------------
id              uuid (primary key, auto-generated)
first_name      text (not null)
last_name       text (not null)
email           text (not null)
phone           text (not null)
licensed_states text[] (array, not null)
license_type    text (not null)
referral_source text (not null)
telehealth_experience boolean (not null)
motivation      text (not null)
weekly_hours    text (not null)
created_at      timestamptz (default now())
```

### RLS Policy

Since there's no authentication:
- **INSERT**: Allow anonymous inserts (anyone can submit the form)
- **SELECT/UPDATE/DELETE**: Denied (data only accessible via Supabase dashboard)

This is appropriate because:
1. Form submissions are inherently public-facing (anyone can apply)
2. Applicant data should not be readable by other website visitors
3. Admin access happens through the Supabase dashboard, not the website

### Page Restructuring

The current page structure will be modified:
- Keep the hero and informational sections as-is
- Replace the navy CTA section (currently links to Google Form) with an embedded application form
- The form will be a Card component matching the site's design system
- Success state shows a confirmation message

### Form Validation

Client-side validation using Zod schema:
- Required field validation
- Email format validation
- Phone number format validation
- At least one state selected
- Input length limits for security

### Conversion Tracking

The form submission will trigger a Google Analytics event for conversion tracking:
```javascript
gtag('event', 'form_submit', {
  event_category: 'therapist_application',
  event_label: 'application_submitted'
});
```

This provides better tracking than the external Google Form because:
1. The event fires from the same domain
2. Full control over event parameters
3. No cross-domain tracking complications

### Implementation Order

1. **Database Migration**: Create `therapist_applications` table with RLS policies
2. **Form Component**: Build `TherapistApplicationForm.tsx` component with:
   - All 10 form fields
   - Multi-select for states using Checkbox components
   - Radio groups for single-select fields
   - Zod validation schema
   - Loading and success states
3. **Page Update**: Replace CTA section in `Therapists.tsx` with embedded form
4. **Analytics**: Add gtag conversion event on successful submission

---

### Technical Details

**New files:**
- `src/components/forms/TherapistApplicationForm.tsx` - Form component

**Modified files:**
- `src/pages/Therapists.tsx` - Embed form instead of external link

**Database migration:**
```sql
-- Create therapist applications table
create table public.therapist_applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  licensed_states text[] not null,
  license_type text not null,
  referral_source text not null,
  telehealth_experience boolean not null,
  motivation text not null,
  weekly_hours text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.therapist_applications enable row level security;

-- Allow anonymous inserts only
create policy "Allow anonymous inserts"
  on public.therapist_applications
  for insert
  to anon
  with check (true);

-- No select/update/delete policies = no access via API
```

**Form component structure:**
```text
TherapistApplicationForm
├── Form header ("Join Our Team")
├── Personal info section
│   ├── First Name (Input)
│   ├── Last Name (Input)
│   ├── Email (Input)
│   └── Phone (Input)
├── Professional info section
│   ├── Licensed States (Checkbox grid)
│   ├── License Type (RadioGroup)
│   └── Telehealth Experience (RadioGroup)
├── Additional info section
│   ├── How did you hear about us? (Select)
│   ├── Why ValorWell? (Textarea)
│   └── Weekly hours (Select)
└── Submit button
```

**Zod validation schema:**
```text
firstName: string, min 1, max 100
lastName: string, min 1, max 100
email: string, email format, max 255
phone: string, min 10, max 20
licensedStates: array of strings, min 1
licenseType: enum of valid types
referralSource: enum of valid sources
telehealthExperience: boolean
motivation: string, min 10, max 2000
weeklyHours: enum of valid options
```

