
-- Allow admins to INSERT into site_config
CREATE POLICY "Admins can insert site_config"
ON public.site_config
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to UPDATE site_config
CREATE POLICY "Admins can update site_config"
ON public.site_config
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
