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

function isManagerTrackedForm(value: string): value is PublicFormKey {
  return MANAGER_TRACKED_FORMS.has(value as PublicFormKey);
}

/**
 * Gives every public React/AJAX form a stable HTML id and name, including forms
 * that are mounted later inside dialogs, accordions, or conditional page states.
 * This lets Google tag diagnostics and automatic form detection see the same
 * form identity used by the successful-form events.
 *
 * Forms that do not already own an explicit backend-success tracking callback
 * can be tracked here when their form is replaced by a confirmed status state.
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

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const definition = identifyPublicForm(form, location.pathname);
      if (!definition || !MANAGER_TRACKED_FORMS.has(definition.key)) return;

      const container = form.parentElement;
      if (!container) return;

      container.dataset.pendingGoogleFormKey = definition.key;
      container.dataset.pendingGoogleFormEventId =
        createFormSubmissionEventId(definition.key);
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

        trackSuccessfulFormSubmission(formKey, eventId);
        delete container.dataset.pendingGoogleFormKey;
        delete container.dataset.pendingGoogleFormEventId;
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
    };
  }, [location.pathname]);

  return null;
}
