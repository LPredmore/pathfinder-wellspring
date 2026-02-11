
CREATE TABLE public.creator_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  social_profiles JSONB NOT NULL,
  motivation TEXT NOT NULL,
  veteran_connection TEXT,
  willing_to_share BOOLEAN NOT NULL,
  comfort_level TEXT NOT NULL,
  fundraising_goal TEXT NOT NULL,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

ALTER TABLE public.creator_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
ON public.creator_applications
FOR INSERT
WITH CHECK (true);
