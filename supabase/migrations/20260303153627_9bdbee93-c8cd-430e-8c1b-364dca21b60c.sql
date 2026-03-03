
-- Backfill creator_platforms from creator_applications.social_profiles JSON
INSERT INTO public.creator_platforms (creator_id, platform_name, handle, follower_count, approved_platform)
SELECT
  ca.id,
  COALESCE(sm.name, profile->>'platform'),
  profile->>'handle',
  CASE
    WHEN (profile->>'followers') ~ '^\d+$' THEN (profile->>'followers')::bigint
    ELSE NULL
  END,
  sm.name IS NOT NULL
FROM public.creator_applications ca
CROSS JOIN LATERAL jsonb_array_elements(ca.social_profiles) AS profile
LEFT JOIN public.sm_platforms sm
  ON LOWER(sm.name) = LOWER(profile->>'platform')
WHERE ca.social_profiles IS NOT NULL
ON CONFLICT DO NOTHING;
