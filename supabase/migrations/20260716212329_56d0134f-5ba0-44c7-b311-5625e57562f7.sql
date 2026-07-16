
-- ============================================================
-- 1) Enable RLS on public tables missing it
-- ============================================================
ALTER TABLE public.posted_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_cron_http_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_attribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.givebutter_donations ENABLE ROW LEVEL SECURITY;

-- Admin-only policies for previously unprotected internal tables
DROP POLICY IF EXISTS "Admins can read youtube_cron_http_log" ON public.youtube_cron_http_log;
CREATE POLICY "Admins can read youtube_cron_http_log"
  ON public.youtube_cron_http_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can read donation_attribution" ON public.donation_attribution;
CREATE POLICY "Admins can read donation_attribution"
  ON public.donation_attribution FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can read givebutter_donations" ON public.givebutter_donations;
CREATE POLICY "Admins can read givebutter_donations"
  ON public.givebutter_donations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- 2) Fix "always true" non-SELECT policies
-- ============================================================
-- Public-form INSERTs: keep public writeable but with a non-literal check
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.therapist_applications;
CREATE POLICY "Allow anonymous inserts"
  ON public.therapist_applications FOR INSERT TO anon, authenticated
  WITH CHECK (auth.role() IN ('anon','authenticated'));

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.support_session_inquiries;
CREATE POLICY "Allow anonymous inserts"
  ON public.support_session_inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (auth.role() IN ('anon','authenticated'));

DROP POLICY IF EXISTS "Anyone can insert influencer platforms" ON public.influencer_platforms;
CREATE POLICY "Anyone can insert influencer platforms"
  ON public.influencer_platforms FOR INSERT TO anon, authenticated
  WITH CHECK (auth.role() IN ('anon','authenticated'));

DROP POLICY IF EXISTS "Anyone can submit OCS inquiries" ON public.ocs_inquiries;
CREATE POLICY "Anyone can submit OCS inquiries"
  ON public.ocs_inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (auth.role() IN ('anon','authenticated'));

-- The two influencers "Service role" policies are unnecessary — service_role bypasses RLS
DROP POLICY IF EXISTS "Service role inserts influencers" ON public.influencers;
DROP POLICY IF EXISTS "Service role updates influencers" ON public.influencers;

-- ============================================================
-- 3) Limit anonymous exposure of influencers to safe columns only
-- ============================================================
REVOKE SELECT ON public.influencers FROM anon;
GRANT SELECT (
  id, first_name, last_name, pref_name, avatar_url, state,
  personal_mission, highest_follower_platform, highest_follower_count,
  is_competing, status, profile_complete, past_competitions, created_at
) ON public.influencers TO anon;

-- ============================================================
-- 4) Rebuild views with security_invoker=true; drop sensitive columns from influencers view
-- ============================================================
DROP VIEW IF EXISTS public.influencers_with_top_platform;
CREATE VIEW public.influencers_with_top_platform
  WITH (security_invoker = true) AS
SELECT
  i.id, i.created_at, i.first_name, i.last_name, i.state,
  i.motivation, i.veteran_connection, i.willing_to_share, i.comfort_level,
  i.fundraising_goal, i.additional_info, i.status, i.accepted_rules,
  i.pref_name, i.highest_follower_platform, i.personal_mission,
  i.avatar_url, i.profile_complete, i.past_competitions,
  i.highest_follower_count, i.user_id, i.is_competing,
  tp.platform_name AS top_platform,
  tp.follower_count AS top_follower_count
FROM influencers i
LEFT JOIN LATERAL (
  SELECT ip.platform_name, ip.follower_count
  FROM influencer_platforms ip
  WHERE ip.influencer_id = i.id
  ORDER BY ip.follower_count DESC NULLS LAST
  LIMIT 1
) tp ON true;
GRANT SELECT ON public.influencers_with_top_platform TO anon, authenticated;

DROP VIEW IF EXISTS public.competitors_with_influencer;
CREATE VIEW public.competitors_with_influencer
  WITH (security_invoker = true) AS
SELECT cc.id, cc.influencer_id, cc.pref_name, cc.comp_link,
       cc.accepted_rules, cc.division, cc.created_at,
       i.first_name, i.last_name, i.email, i.avatar_url
FROM current_competitors cc
JOIN influencers i ON cc.influencer_id = i.id;
GRANT SELECT ON public.competitors_with_influencer TO authenticated;

DROP VIEW IF EXISTS public.app_campaign_enrollments_with_entity;
CREATE VIEW public.app_campaign_enrollments_with_entity
  WITH (security_invoker = true) AS
SELECT e.id, e.campaign_id, e.entity_type, e.entity_id, e.status,
       e.current_step_order, e.enrolled_at, e.completed_at, e.cancelled_at,
       COALESCE(((i.first_name || ' '::text) || i.last_name),
                ((t.first_name || ' '::text) || t.last_name)) AS entity_name,
       COALESCE(i.email, t.email) AS entity_email
FROM app_campaign_enrollments e
LEFT JOIN influencers i ON e.entity_type = 'ambassador' AND e.entity_id = i.id
LEFT JOIN therapist_applications t ON e.entity_type = 'therapist' AND e.entity_id = t.id;
GRANT SELECT ON public.app_campaign_enrollments_with_entity TO authenticated;

-- ============================================================
-- 5) Set fixed search_path on the remaining public functions
-- ============================================================
ALTER FUNCTION public.auto_promote_incomplete() SET search_path = public;
ALTER FUNCTION public.enforce_youtube_schedule_requirements() SET search_path = public;
ALTER FUNCTION public.kick_youtube_run_due() SET search_path = public;
ALTER FUNCTION public.reset_stuck_youtube_uploads(integer) SET search_path = public;
ALTER FUNCTION public.set_youtube_upload_at_and_queue() SET search_path = public;
ALTER FUNCTION public.set_updated_at() SET search_path = public;

-- ============================================================
-- 6) Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated
--    (trigger functions do not need direct callability; keep has_role executable for RLS)
-- ============================================================
REVOKE EXECUTE ON FUNCTION public.handle_entity_status_change() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.notify_make_youtube_published() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.schedule_first_campaign_step() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.seed_user_instructions() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.sync_is_competing_on_delete() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.sync_is_competing_on_insert() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.sync_youtube_video_id_to_posted() FROM anon, authenticated, public;

-- ============================================================
-- 7) Storage: remove broad SELECT (listing) on avatars bucket.
--    Public bucket direct URLs still work; only listing via the API is removed.
-- ============================================================
DROP POLICY IF EXISTS "Public read access for avatars" ON storage.objects;
