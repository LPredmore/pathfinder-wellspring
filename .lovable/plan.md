

## Plan: Add Settings Tab with Welcome Email Template + Auto-Send on Signup

### Overview
Add a "Settings" tab to the Admin Dashboard with an email template editor. Create an edge function that sends a welcome email via Resend when a new mission partner signs up (called from the existing `create-mission-partner` function).

### What changes

**1. Database: `site_config` table (no migration needed)**
The `site_config` table already exists with `key`/`value` columns and public SELECT RLS. We need to add admin INSERT/UPDATE policies and store two keys: `welcome_email_subject` and `welcome_email_body`. Data inserts will use the insert tool.

**2. Database migration: Add admin write access to `site_config`**
Add RLS policies so admins can INSERT and UPDATE rows in `site_config`.

**3. `src/pages/AdminDashboard.tsx`**
- Wrap the list view in a Tabs component with two tabs: "Mission Partners" (current list) and "Settings".
- The Settings tab contains a card with subject and body fields for the welcome email template.
- Body field supports `{{first_name}}`, `{{last_name}}`, `{{email}}`, `{{password}}` placeholders with a helper legend.
- Load/save from `site_config` table using keys `welcome_email_subject` and `welcome_email_body`.
- The detail view (when an influencer is selected) stays outside the tabs as it does now.

**4. New edge function: `supabase/functions/send-welcome-email/index.ts`**
- Accepts `{ to, first_name, last_name, email, password }` from the `create-mission-partner` function.
- Reads the email template from `site_config`.
- Replaces placeholders with actual values.
- Sends via Resend API using a `RESEND_API_KEY` secret.
- Returns success/failure. If no template is configured, silently skips.

**5. Update `supabase/functions/create-mission-partner/index.ts`**
- After successful influencer creation, call `send-welcome-email` internally (via fetch to the function URL) passing the new user's details and the generated password.
- Fire-and-forget so signup isn't blocked by email delivery.

**6. `supabase/config.toml`**
- Add `[functions.send-welcome-email]` with `verify_jwt = false`.

**7. Secret: `RESEND_API_KEY`**
- Will prompt you to provide the Resend API key, stored as a Supabase secret.

### Placeholder variables for the template
- `{{first_name}}` — partner's first name
- `{{last_name}}` — partner's last name  
- `{{email}}` — partner's email/login
- `{{password}}` — the generated password

