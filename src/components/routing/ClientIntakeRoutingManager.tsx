import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CLIENT_PORTAL_HOSTS = new Set([
  "client.valorwell.org",
  "clients.valorwell.org",
]);

const SIGNUP_QUERY = "signup";

function isPortalLoginLink(anchor: HTMLAnchorElement): boolean {
  if (anchor.dataset.directPortal === "true") return true;
  const label = anchor.textContent?.trim().toLowerCase() ?? "";
  return label.includes("login") || label.includes("sign in");
}

/**
 * Keeps care-intake CTAs on the primary website while preserving explicit
 * client-login links as direct portal navigation.
 */
export function ClientIntakeRoutingManager() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const routeClientIntake = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || isPortalLoginLink(anchor)) return;

      try {
        const destination = new URL(anchor.href, window.location.href);
        if (!CLIENT_PORTAL_HOSTS.has(destination.hostname)) return;

        event.preventDefault();
        navigate(`/get-care?${SIGNUP_QUERY}=1`);
      } catch {
        // Leave malformed and non-HTTP links to the browser.
      }
    };

    document.addEventListener("click", routeClientIntake);
    return () => document.removeEventListener("click", routeClientIntake);
  }, [navigate]);

  useEffect(() => {
    if (location.pathname !== "/get-care") return;
    const params = new URLSearchParams(location.search);
    if (params.get(SIGNUP_QUERY) !== "1") return;

    let cancelled = false;
    let attempts = 0;

    const openSignup = () => {
      if (cancelled) return;
      const trigger = Array.from(document.querySelectorAll("button")).find(
        (button) => button.textContent?.trim() === "Start CHAMPVA Intake",
      );

      if (trigger instanceof HTMLButtonElement) {
        trigger.click();
        navigate("/get-care", { replace: true });
        return;
      }

      attempts += 1;
      if (attempts < 10) window.setTimeout(openSignup, 50);
    };

    window.setTimeout(openSignup, 0);
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search, navigate]);

  return null;
}
