CREATE TABLE public.bty_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lane text NOT NULL,
  first_name text,
  last_name text,
  email text,
  phone text,
  organization text,
  role_title text,
  website text,
  social_link text,
  subject_name text,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  tags text[] NOT NULL DEFAULT ARRAY[]::text[],
  source_page text,
  user_agent text,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.bty_submissions TO anon, authenticated;
GRANT ALL ON public.bty_submissions TO service_role;

ALTER TABLE public.bty_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a BTY story or nomination"
  ON public.bty_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true AND char_length(lane) > 0);
