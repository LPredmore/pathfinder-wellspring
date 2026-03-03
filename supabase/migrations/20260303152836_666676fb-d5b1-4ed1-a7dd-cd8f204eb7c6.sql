
-- 1. Make creator_id NOT NULL and add FK to creator_applications
ALTER TABLE public.creator_platforms
  ALTER COLUMN creator_id SET NOT NULL;

ALTER TABLE public.creator_platforms
  ADD CONSTRAINT creator_platforms_creator_id_fkey
  FOREIGN KEY (creator_id) REFERENCES public.creator_applications(id) ON DELETE CASCADE;

-- 2. Enable RLS on sm_platforms + public SELECT
ALTER TABLE public.sm_platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read platforms"
  ON public.sm_platforms
  FOR SELECT
  USING (true);

-- 3. Enable RLS on creator_platforms + anonymous INSERT + SELECT
ALTER TABLE public.creator_platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert creator platforms"
  ON public.creator_platforms
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read creator platforms"
  ON public.creator_platforms
  FOR SELECT
  USING (true);
