import { useEffect } from "react";

const Donate = () => {
  useEffect(() => {
    (async function () {
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

        const res = await fetch(
          "https://asjhkidpuhqodryczuth.functions.supabase.co/donate-go",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        if (!res.ok || !data.redirect_url) {
          throw new Error(data?.error || "donate-go failed");
        }
        window.location.replace(data.redirect_url);
      } catch (e) {
        window.location.replace("https://givebutter.com/valorwellhelp");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-muted-foreground">Redirecting to donation page…</p>
    </div>
  );
};

export default Donate;
