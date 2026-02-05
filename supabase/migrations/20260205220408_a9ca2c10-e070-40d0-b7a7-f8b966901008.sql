-- Create table for support session inquiries
CREATE TABLE public.support_session_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  state text NOT NULL,
  seeking_care text NOT NULL,
  service_type text NOT NULL DEFAULT 'support-sessions',
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_session_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (same pattern as therapist_applications)
CREATE POLICY "Allow anonymous inserts"
ON public.support_session_inquiries
FOR INSERT
TO anon
WITH CHECK (true);