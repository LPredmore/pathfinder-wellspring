import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getDonationAcquisition } from "@/lib/donationAttribution";

const DONATE_GO_URL = "https://ahqauomkgflopxgnlndd.functions.supabase.co/donate-go";
const GIVEBUTTER_FALLBACK = "https://givebutter.com/valorwellhelp";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function Donate() {
  const [destinationUrl, setDestinationUrl] = useState(GIVEBUTTER_FALLBACK);
  const hasStartedRedirect = useRef(false);

  const startRedirect = (url: string) => {
    if (hasStartedRedirect.current) return;
    hasStartedRedirect.current = true;
    window.location.replace(url);
  };

  useEffect(() => {
    const gtagFn = typeof window !== "undefined" ? window.gtag : undefined;
    if (typeof gtagFn === "function") {
      try {
        gtagFn("event", "page_view", {
          page_path: "/donate",
          page_title: "Donate",
          transport_type: "beacon",
        });
      } catch {
        // Analytics is best effort and must never block the donation handoff.
      }
    }

    void (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const acquisition = getDonationAcquisition();
        const requestedHandoffId = params.get("vw_handoff_id");
        const handoffId = requestedHandoffId && UUID_RE.test(requestedHandoffId)
          ? requestedHandoffId
          : crypto.randomUUID();

        const payload = {
          handoff_id: handoffId,
          gclid: acquisition?.gclid ?? null,
          gbraid: acquisition?.gbraid ?? null,
          wbraid: acquisition?.wbraid ?? null,
          utm_source: acquisition?.utm_source ?? null,
          utm_medium: acquisition?.utm_medium ?? null,
          utm_campaign: acquisition?.utm_campaign ?? null,
          utm_term: acquisition?.utm_term ?? null,
          utm_content: acquisition?.utm_content ?? null,
          landing_path: acquisition?.landing_path ?? null,
          referrer: acquisition?.referrer ?? null,
          client_captured_at: acquisition?.client_captured_at ?? null,
          entry_cta_source: params.get("vw_entry_source"),
          entry_cta_medium: params.get("vw_entry_medium"),
          entry_cta_campaign: params.get("vw_entry_campaign"),
          entry_cta_content: params.get("vw_entry_content"),
          checkout_cta_source: params.get("vw_checkout_source"),
          checkout_cta_medium: params.get("vw_checkout_medium"),
          checkout_cta_campaign: params.get("vw_checkout_campaign"),
          checkout_cta_content: params.get("vw_checkout_content"),
        };

        const controller = new AbortController();
        const requestTimeout = window.setTimeout(() => controller.abort(), 4000);
        let response: Response;
        try {
          response = await fetch(DONATE_GO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            signal: controller.signal,
            body: JSON.stringify(payload),
          });
        } finally {
          window.clearTimeout(requestTimeout);
        }

        const data = await response.json().catch(() => ({}));
        const redirectUrl = response.ok && typeof data.redirect_url === "string"
          ? data.redirect_url
          : GIVEBUTTER_FALLBACK;

        setDestinationUrl(redirectUrl);
        startRedirect(redirectUrl);
      } catch {
        setDestinationUrl(GIVEBUTTER_FALLBACK);
        startRedirect(GIVEBUTTER_FALLBACK);
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Donate | ValorWell</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/70">ValorWell Foundation</p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground">
            Taking you to our secure donation page
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your donation helps pay therapists to provide mental-health care to veterans who need another path to treatment. ValorWell and the ValorWell Foundation do not use donated funds for administrative or operating costs.*
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            *Excludes unavoidable third-party payment-processing fees deducted before funds are received by the Foundation.
          </p>
          <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-primary/15">
            <div className="h-full w-1/3 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Not redirected?{" "}
            <a href={destinationUrl} className="underline text-primary">
              Continue to Givebutter
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
