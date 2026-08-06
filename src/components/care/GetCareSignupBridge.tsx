import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ClientAccountSignupForm } from "./ClientAccountSignupForm";

const CLIENT_PORTAL_ORIGINS = new Set([
  "https://client.valorwell.org/",
  "https://clients.valorwell.org/",
]);

export function GetCareSignupBridge() {
  const location = useLocation();
  const isGetCarePage = location.pathname === "/get-care";

  useEffect(() => {
    if (!isGetCarePage) return;

    const handlePortalClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      let normalizedHref: string;
      try {
        const url = new URL(anchor.href);
        normalizedHref = `${url.origin}/`;
      } catch {
        return;
      }

      if (!CLIENT_PORTAL_ORIGINS.has(normalizedHref)) return;

      const signup = document.getElementById("client-signup");
      if (!signup) return;

      event.preventDefault();
      signup.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handlePortalClick);
    return () => document.removeEventListener("click", handlePortalClick);
  }, [isGetCarePage]);

  if (!isGetCarePage) return null;

  return (
    <section
      aria-label="Create a ValorWell client account"
      className="clinicians-theme border-t border-[color:var(--cl-ink)]/10 bg-[color:var(--cl-canvas)] py-16 md:py-24"
    >
      <div className="container-wide">
        <ClientAccountSignupForm />
      </div>
    </section>
  );
}
