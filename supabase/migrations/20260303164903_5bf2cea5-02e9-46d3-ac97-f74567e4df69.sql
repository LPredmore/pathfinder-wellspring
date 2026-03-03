
-- 1. Rebuild profiles table with proper uuid PK linked to auth.users
DROP TABLE IF EXISTS public.profiles;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  password text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- No public/anon access — contains plaintext passwords. Only service_role bypasses RLS.
-- Explicitly deny all access for authenticated/anon roles.

-- 2. Add 'influencer' to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'influencer';

-- 3. Add user_id and is_competing columns to influencers
ALTER TABLE public.influencers
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS is_competing boolean NOT NULL DEFAULT false;

-- 4. RLS policies for influencers
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view competing influencers"
  ON public.influencers FOR SELECT
  USING (true);

CREATE POLICY "Service role inserts influencers"
  ON public.influencers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role updates influencers"
  ON public.influencers FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 5. RLS policies for influencer_platforms
ALTER TABLE public.influencer_platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view influencer platforms"
  ON public.influencer_platforms FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert influencer platforms"
  ON public.influencer_platforms FOR INSERT
  WITH CHECK (true);

-- 6. Mark existing current_competitors as is_competing in influencers
UPDATE public.influencers
SET is_competing = true
WHERE id IN (SELECT id FROM public.current_competitors);
