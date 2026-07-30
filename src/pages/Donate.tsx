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

    const redirect = (url: string) => {
      if (didRedirect) return;
      didRedirect = true;
      window.location.replace(url);
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
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-muted-foreground">Redirecting to donation page…</p>
    </div>
  );
}
