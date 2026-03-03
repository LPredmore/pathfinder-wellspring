
-- Admin can update influencers
CREATE POLICY "Admins can update influencers"
ON public.influencers FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin can manage all influencer platforms
CREATE POLICY "Admins can insert influencer platforms"
ON public.influencer_platforms FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update influencer platforms"
ON public.influencer_platforms FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete influencer platforms"
ON public.influencer_platforms FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can read user_roles (needed to check other users' roles)
CREATE POLICY "Admins can read all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
