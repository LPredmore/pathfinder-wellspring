import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  applyPublicFormMetadata,
  createFormSubmissionEventId,
  identifyPublicForm,
  trackSuccessfulFormSubmission,
  type PublicFormKey,
} from "@/lib/sitewideFormTracking";

const MANAGER_TRACKED_FORMS = new Set<PublicFormKey>(["overflowReferral"]);
const PENDING_FORM_TIMEOUT_MS = 60_000;

function isManagerTrackedForm(value: string): value is PublicFormKey {
  return MANAGER_TRACKED_FORMS.has(value as PublicFormKey);
}

/**
 * Gives every public React/AJAX form a stable HTML id and name, including forms
 * that are mounted later inside dialogs, accordions, or conditional page states.
 * This lets Google tag diagnostics see the same form identity used by the
 * successful-form events.
 *
 * Forms that do not already own an explicit backend-success tracking callback
 * can be tracked here when their form is replaced by a confirmed success state.
 */
export function SitewideFormTrackingManager() {
  const location = useLocation();

  useEffect(() => {
    const pendingCleanupTimers = new Map<HTMLElement, number>();

    const clearPending = (container: HTMLElement) => {
      const timer = pendingCleanupTimers.get(container);
      if (timer !== undefined) window.clearTimeout(timer);
      pendingCleanupTimers.delete(container);
      delete container.dataset.pendingGoogleFormKey;
      delete container.dataset.pendingGoogleFormEventId;
    };

    const slugifyPath = (pathname: string) => {
      const slug = pathname.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
      return slug || "home";
    };

    const normalizeForms = () => {
      const routeSlug = slugifyPath(location.pathname);
      let unregisteredIndex = 0;

      document.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
        if (form.dataset.googleForm || form.dataset.googleFormUnregistered) {
          return;
        }
        const definition = identifyPublicForm(form, location.pathname);
        if (definition) {
          applyPublicFormMetadata(form, definition);
          return;
        }

        // Global safety net: any public form that is not registered in
        // PUBLIC_FORMS still receives a stable id and name so Google Ads'
        // automatic form detection can identify it consistently across loads.
        unregisteredIndex += 1;
        const suffix = unregisteredIndex > 1 ? `-${unregisteredIndex}` : "";
        if (!form.id) form.id = `valorwell-${routeSlug}-form${suffix}`;
        if (!form.getAttribute("name")) {
          form.setAttribute(
            "name",
            `valorwell_${routeSlug.replace(/-/g, "_")}_form${suffix.replace(/-/g, "_")}`,
          );
        }
        form.dataset.googleFormUnregistered = "true";

        if (import.meta.env.DEV) {
          console.warn(
            `[form-tracking] Unregistered form on ${location.pathname} (id="${form.id}"). ` +
              "Add it to PUBLIC_FORMS in src/lib/sitewideFormTracking.ts so its confirmed-success event is tracked.",
          );
        }
      });
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const definition = identifyPublicForm(form, location.pathname);
      if (!definition || !MANAGER_TRACKED_FORMS.has(definition.key)) return;

      const container = form.parentElement;
      if (!container) return;

      clearPending(container);
      container.dataset.pendingGoogleFormKey = definition.key;
      container.dataset.pendingGoogleFormEventId =
        createFormSubmissionEventId(definition.key);

      const timer = window.setTimeout(
        () => clearPending(container),
        PENDING_FORM_TIMEOUT_MS,
      );
      pendingCleanupTimers.set(container, timer);
    };

    const trackConfirmedStatuses = (root: Node) => {
      if (!(root instanceof HTMLElement)) return;

      const statuses: HTMLElement[] = [];
      if (root.matches('[role="status"]')) statuses.push(root);
      statuses.push(...root.querySelectorAll<HTMLElement>('[role="status"]'));

      for (const status of statuses) {
        const container = status.closest<HTMLElement>(
          "[data-pending-google-form-key]",
        );
        if (!container) continue;

        const formKey = container.dataset.pendingGoogleFormKey;
        const eventId = container.dataset.pendingGoogleFormEventId;
        if (!formKey || !eventId || !isManagerTrackedForm(formKey)) continue;

        // The overflow form is removed and replaced with its status only after
        // the backend confirms success. Loading or error status content cannot
        // convert while the form remains mounted.
        if (container.querySelector("form")) continue;

        trackSuccessfulFormSubmission(formKey, eventId);
        clearPending(container);
      }
    };

    normalizeForms();
    document.addEventListener("submit", handleSubmit, true);

    const observer = new MutationObserver((mutations) => {
      normalizeForms();
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(trackConfirmedStatuses);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("submit", handleSubmit, true);
      observer.disconnect();
      pendingCleanupTimers.forEach((timer) => window.clearTimeout(timer));
      pendingCleanupTimers.clear();
    };
  }, [location.pathname]);

  return null;
}
