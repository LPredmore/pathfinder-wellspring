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

-- Allow anonymous inserts only (public form submissions)
create policy "Allow anonymous inserts"
  on public.therapist_applications
  for insert
  to anon
  with check (true);

-- No select/update/delete policies = data only accessible via Supabase dashboard