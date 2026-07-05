
CREATE TABLE public.ocs_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lane TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  role_title TEXT,
  website TEXT,
  social_link TEXT,
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  source_page TEXT NOT NULL DEFAULT '/operation-claims-success',
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.ocs_inquiries TO anon;
GRANT INSERT ON public.ocs_inquiries TO authenticated;
GRANT ALL ON public.ocs_inquiries TO service_role;

ALTER TABLE public.ocs_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit; nobody can read except service_role (dashboard/admin uses service_role).
CREATE POLICY "Anyone can submit OCS inquiries"
  ON public.ocs_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
