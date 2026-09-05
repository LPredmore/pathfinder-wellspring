import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  alignElementIfOutsideSafeViewport,
  scrollToPageElement,
} from "@/lib/pageScroll";
import "./route-scroll.css";

const BTY_SCROLL_TRIGGERS = [
  "i want to be a guest on bty",
  "nominate someone",
  "i want to nominate someone",
  "respond to the invitation",
];

const BTY_PATHS = new Set(["/beyond-the-yellow", "/beyondtheyellow"]);

function isBtyFormTrigger(button: HTMLButtonElement): boolean {
  const label = button.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
  return BTY_SCROLL_TRIGGERS.some((trigger) => label.includes(trigger));
}

function findSubmissionConfirmation(node: Node): HTMLElement | null {
  if (!(node instanceof HTMLElement)) return null;

  const status = node.matches('[role="status"]')
    ? node
    : node.querySelector<HTMLElement>('[role="status"]');
  if (status) return status;

  const ocsContainer = node.closest<HTMLElement>("#ocs-routing-form");
  if (ocsContainer && !ocsContainer.querySelector("form")) {
    return node;
  }

  return null;
}

/**
 * Coordinates page-level scrolling for React Router navigation, same-page
 * destinations, BTY form buttons, and compact form-confirmation replacements.
 */
export function RouteScrollManager() {
  const location = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const isInitialPage = previousPathname.current === null;
    const pathnameChanged = previousPathname.current !== location.pathname;
    previousPathname.current = location.pathname;

    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      const foundTarget = scrollToPageElement(targetId, "auto");
      if (!foundTarget && (isInitialPage || pathnameChanged)) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      return;
    }

    if (isInitialPage || pathnameChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!BTY_PATHS.has(location.pathname)) return;
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>("button");
      if (!button || !isBtyFormTrigger(button)) return;

      window.setTimeout(() => {
        const formOrConfirmation = document.querySelector<HTMLElement>(
          '#bty-guest-interest form, #bty-guest-interest [role="status"]',
        );
        if (formOrConfirmation) scrollToPageElement(formOrConfirmation);
      }, 60);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          const confirmation = findSubmissionConfirmation(node);
          if (confirmation) {
            alignElementIfOutsideSafeViewport(confirmation);
            return;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
