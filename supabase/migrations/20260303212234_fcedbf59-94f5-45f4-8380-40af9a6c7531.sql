
-- Trigger function: fires edge function when youtube_status becomes 'published'
CREATE OR REPLACE FUNCTION public.notify_make_youtube_published()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _url text;
  _headers jsonb;
  _body jsonb;
BEGIN
  -- Only fire when youtube_status changes TO 'published'
  IF (TG_OP = 'UPDATE'
      AND NEW.youtube_status = 'published'
      AND (OLD.youtube_status IS DISTINCT FROM 'published'))
  THEN
    _url := 'https://asjhkidpuhqodryczuth.supabase.co/functions/v1/notify-make-youtube-published';
    _headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    );

    _body := to_jsonb(NEW);

    PERFORM net.http_post(
      url := _url,
      headers := _headers,
      body := _body
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Attach trigger to social_content
CREATE TRIGGER trg_notify_make_youtube_published
AFTER UPDATE ON public.social_content
FOR EACH ROW
EXECUTE FUNCTION public.notify_make_youtube_published();
