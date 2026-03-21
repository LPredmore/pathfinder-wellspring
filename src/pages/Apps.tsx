import { useEffect } from "react";
import { trackPageAndRedirect } from "@/lib/tracking";

export default function Apps() {
  useEffect(() => {
    trackPageAndRedirect("https://bestselfs.com");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-muted-foreground">Redirecting…</p>
    </div>
  );
}
