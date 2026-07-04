/**
 * Lightweight, resilient homepage event tracker.
 * Uses gtag if present; silently no-ops otherwise so the page never breaks.
 */
export type HomepageEvent =
  | "homepage_hero_find_path"
  | "homepage_hero_see_build"
  | "homepage_route_care"
  | "homepage_route_veteran"
  | "homepage_route_family"
  | "homepage_route_clinician"
  | "homepage_route_partner"
  | "homepage_route_watch"
  | "homepage_ocs_click"
  | "homepage_bty_watch"
  | "homepage_bty_story"
  | "homepage_watch_hub"
  | "homepage_clinician_click"
  | "homepage_partner_click"
  | "homepage_support_click"
  | "homepage_intro_click"
  | "homepage_about_click"
  | "homepage_final_care"
  | "homepage_final_veteran"
  | "homepage_final_clinician"
  | "homepage_final_watch"
  | "homepage_final_bty"
  | "homepage_final_partner";

export function trackHomepageEvent(name: HomepageEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtagFn !== "function") return;
  try {
    gtagFn("event", name, { event_category: "homepage", ...(params || {}) });
  } catch {
    /* no-op */
  }
}
