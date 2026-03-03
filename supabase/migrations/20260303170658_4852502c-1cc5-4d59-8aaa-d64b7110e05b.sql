SELECT setval(
  pg_get_serial_sequence('public.influencer_platforms', 'id'),
  COALESCE((SELECT MAX(id) FROM public.influencer_platforms), 0) + 1,
  false
);