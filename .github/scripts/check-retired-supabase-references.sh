#!/usr/bin/env bash
set -euo pipefail

retired_pattern='asjhkidpuhqodryczuth|LEGACY_SUPABASE_URL|LEGACY_SUPABASE_PUBLISHABLE_KEY'
scan_paths=(
  src
  supabase
  .env
  .github/workflows
  package.json
  vite.config.ts
  wrangler.jsonc
)

if git grep -n -I -E "$retired_pattern" -- "${scan_paths[@]}"; then
  echo "Retired Therapist CRM infrastructure reference detected." >&2
  exit 1
fi

if git ls-files 'supabase/migrations/*' | grep -q .; then
  echo "The website repository must not own database migrations. Billing Hub schema changes belong in the canonical backend repository." >&2
  git ls-files 'supabase/migrations/*' >&2
  exit 1
fi

retired_function_paths=(
  supabase/functions/create-mission-partner
  supabase/functions/send-welcome-email
  supabase/functions/backfill-competitor-auth
  supabase/functions/send-bulk-welcome
)

for path in "${retired_function_paths[@]}"; do
  if git ls-files "$path/*" | grep -q .; then
    echo "Retired website function source detected: $path" >&2
    exit 1
  fi
done

if ! grep -qx 'project_id = "ahqauomkgflopxgnlndd"' supabase/config.toml; then
  echo "Website Supabase configuration must identify Billing Hub." >&2
  exit 1
fi

echo "Retired Supabase dependency guard passed."
