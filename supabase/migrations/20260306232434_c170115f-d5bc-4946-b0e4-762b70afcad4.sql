CREATE POLICY "Public can view published long content"
ON public.posted_content
FOR SELECT
TO anon, authenticated
USING (
  post_length = 'Long'
  AND youtube_video_id IS NOT NULL
  AND status = 'posted'
);