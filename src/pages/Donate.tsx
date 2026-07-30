import { useEffect } from "react";
import { trackDonateConversion } from "@/lib/tracking";

const DONATE_GO_URL = "https://asjhkidpuhqodryczuth.functions.supabase.co/donate-go";
const GIVEBUTTER_FALLBACK = "https://givebutter.com/valorwellhelp";

export default function Donate() {
  useEffect(() => {
    let didRedirect = false;

    // Fire tracking before any redirect. gtag only auto-fires page_view on a
    // hard page load, so client-side navigations to /donate need an explicit
    // beacon. transport_type: "beacon" survives the navigation away.
    const gtagFn = typeof window !== "undefined" ? window.gtag : undefined;
    if (typeof gtagFn === "function") {
      gtagFn("event", "page_view", {
        page_path: "/donate",
        page_title: "Donate",
        transport_type: "beacon",
      });
    }
    trackDonateConversion();

    // Minimum dwell so tag beacons (and Tag Assistant) can complete before we
    // navigate off-domain.
    const MIN_DWELL_MS = 800;
    const startedAt = Date.now();

    const redirect = (url: string) => {
      if (didRedirect) return;
      didRedirect = true;
      const wait = Math.max(0, MIN_DWELL_MS - (Date.now() - startedAt));
      window.setTimeout(() => window.location.replace(url), wait);
    };

    // Hard timeout fallback so users never get stuck
    const timeout = window.setTimeout(() => redirect(GIVEBUTTER_FALLBACK), 4000);


    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);

        const payload = {
          gclid: params.get("gclid"),
          gbraid: params.get("gbraid"),
          wbraid: params.get("wbraid"),
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
          utm_term: params.get("utm_term"),
          utm_content: params.get("utm_content"),
        };

        const res = await fetch(DONATE_GO_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.redirect_url) {
          redirect(GIVEBUTTER_FALLBACK);
          return;
        }

        redirect(data.redirect_url);
      } catch {
        redirect(GIVEBUTTER_FALLBACK);
      } finally {
        window.clearTimeout(timeout);
      }
    })();

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/70">ValorWell</p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">
          Taking you to our secure donation page
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your gift funds Operation Claims Success and care for veterans and their families.
        </p>
        <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-primary/15">
          <div className="h-full w-1/3 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Not redirected?{" "}
          <a href={GIVEBUTTER_FALLBACK} className="underline text-primary">
            Continue to Givebutter
          </a>
        </p>
      </div>
    </div>
  );
}

