# Website Supabase boundary

Billing Hub is the only Supabase project used by the ValorWell website.

This repository owns source for these public website support functions only:

- `notify-make-youtube-published`
- `r2-sign-urls`
- `register-clinician-interest`

The website repository does **not** own database schema migrations, clinical or CRM tables, staff/client authentication infrastructure, campaign functions, or retired creator-interest workflows. Those belong to the canonical Billing Hub backend repositories.

Do not add a `supabase/migrations` directory here. Do not introduce a second Supabase URL, project reference, publishable key, or compatibility client.
