-- Add has_icon boolean column to sm_platforms (defaults false for new platforms)
ALTER TABLE public.sm_platforms ADD COLUMN has_icon boolean NOT NULL DEFAULT false;

-- Set true for all 11 current platforms (we're adding icons for all of them)
UPDATE public.sm_platforms SET has_icon = true;