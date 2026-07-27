import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does not reset the document scroll position when the pathname
 * changes. Reset cross-page navigation to the top while leaving same-page hash
 * and query-string navigation alone for dedicated section-link handling.
 */
export function RouteScrollManager() {
  const location = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const isInitialPage = previousPathname.current === null;
    const pathnameChanged = previousPathname.current !== location.pathname;

    if ((isInitialPage && !location.hash) || (!isInitialPage && pathnameChanged)) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    previousPathname.current = location.pathname;
  }, [location.hash, location.pathname]);

  return null;
}
