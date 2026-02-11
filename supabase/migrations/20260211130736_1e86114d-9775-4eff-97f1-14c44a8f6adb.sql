
CREATE TABLE public.site_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON public.site_config FOR SELECT USING (true);

INSERT INTO public.site_config (key, value)
VALUES ('therapists_video_url', 'https://youtube.com/shorts/-Nf6h6DwWGs?si=B-8fOeMcRpPVLnUm');
