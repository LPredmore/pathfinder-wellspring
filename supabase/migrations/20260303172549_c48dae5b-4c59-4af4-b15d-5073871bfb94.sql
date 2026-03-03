
-- Allow authenticated users to UPDATE their own influencer platforms
CREATE POLICY "Users can update own platforms"
ON public.influencer_platforms
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.influencers
    WHERE influencers.id = influencer_platforms.influencer_id
      AND influencers.user_id = auth.uid()
  )
);

-- Allow authenticated users to DELETE their own influencer platforms
CREATE POLICY "Users can delete own platforms"
ON public.influencer_platforms
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.influencers
    WHERE influencers.id = influencer_platforms.influencer_id
      AND influencers.user_id = auth.uid()
  )
);
