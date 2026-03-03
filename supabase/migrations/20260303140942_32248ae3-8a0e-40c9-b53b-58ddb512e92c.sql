
-- Add avatar_url column for Supabase Storage image URLs
ALTER TABLE public.current_competitors ADD COLUMN avatar_url text;

-- Enable RLS
ALTER TABLE public.current_competitors ENABLE ROW LEVEL SECURITY;

-- Public read access for the challenge page
CREATE POLICY "Public can view competitors"
ON public.current_competitors
FOR SELECT
USING (true);

-- Admin full access
CREATE POLICY "Admin full access"
ON public.current_competitors
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
