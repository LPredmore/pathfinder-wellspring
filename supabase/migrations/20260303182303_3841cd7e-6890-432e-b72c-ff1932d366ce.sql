
-- Populate current_competitors from influencers where is_competing = true
INSERT INTO public.current_competitors (influencer_id, first_name, last_name, email, state, pref_name, personal_mission, avatar_url, status)
SELECT id, first_name, last_name, email, state, pref_name, personal_mission, avatar_url, status
FROM public.influencers
WHERE is_competing = true
AND id NOT IN (SELECT influencer_id FROM public.current_competitors WHERE influencer_id IS NOT NULL);
