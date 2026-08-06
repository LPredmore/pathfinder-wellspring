import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  applyPublicFormMetadata,
  identifyPublicForm,
} from "@/lib/sitewideFormTracking";

/**
 * Gives every public React/AJAX form a stable HTML id and name, including forms
 * that are mounted later inside dialogs, accordions, or conditional page states.
 * This lets Google tag diagnostics and automatic form detection see the same
 * form identity used by the successful-form events.
 */
export function SitewideFormTrackingManager() {
  const location = useLocation();

  useEffect(() => {
    const normalizeForms = () => {
      document.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
        const definition = identifyPublicForm(form, location.pathname);
        if (definition) applyPublicFormMetadata(form, definition);
      });
    };

    normalizeForms();

    const observer = new MutationObserver(normalizeForms);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}
