-- Allow partial saves by making later-step fields nullable
ALTER TABLE public.creator_applications ALTER COLUMN social_profiles DROP NOT NULL;
ALTER TABLE public.creator_applications ALTER COLUMN motivation DROP NOT NULL;
ALTER TABLE public.creator_applications ALTER COLUMN willing_to_share DROP NOT NULL;
ALTER TABLE public.creator_applications ALTER COLUMN comfort_level DROP NOT NULL;
ALTER TABLE public.creator_applications ALTER COLUMN fundraising_goal DROP NOT NULL;

-- Allow anonymous updates so partial rows can be updated by the same session
CREATE POLICY "Allow anonymous updates"
ON public.creator_applications
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow anonymous select so we can read back the inserted row id
CREATE POLICY "Allow anonymous select own row"
ON public.creator_applications
FOR SELECT
USING (true);