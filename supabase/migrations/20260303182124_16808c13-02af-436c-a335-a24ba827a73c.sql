
-- Add influencer_id column to current_competitors with FK to influencers
ALTER TABLE public.current_competitors
ADD COLUMN influencer_id uuid REFERENCES public.influencers(id);

-- Add index for the FK
CREATE INDEX idx_current_competitors_influencer_id ON public.current_competitors(influencer_id);
