import { afterEach, describe, expect, it, vi } from "vitest";
import {
  PUBLIC_FORMS,
  applyPublicFormMetadata,
  clearTrackedFormSubmissionsForTests,
  identifyPublicForm,
  trackSuccessfulFormSubmission,
} from "./sitewideFormTracking";

describe("sitewide public form metadata", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    window.history.replaceState({}, "", "/");
  });

  it("identifies and normalizes a dynamically mounted public form on the canonical BTY route", () => {
    window.history.replaceState({}, "", "/beyond-the-yellow");
    const form = document.createElement("form");
    form.innerHTML = '<input id="guest-first-name" />';

    const definition = identifyPublicForm(form);
    expect(definition).toEqual(PUBLIC_FORMS.btyGuest);

    applyPublicFormMetadata(form, definition!);
    expect(form.id).toBe(PUBLIC_FORMS.btyGuest.id);
    expect(form.name).toBe(PUBLIC_FORMS.btyGuest.name);
    expect(form.dataset.googleForm).toBe("btyGuest");
    expect(form.dataset.googleFormEvent).toBe(
      PUBLIC_FORMS.btyGuest.eventName,
    );
  });

  it("keeps the legacy BTY route compatible with the canonical form definition", () => {
    const form = document.createElement("form");
    form.innerHTML = '<input id="nominee-first" />';

    expect(identifyPublicForm(form, "/beyondtheyellow")).toEqual(
      PUBLIC_FORMS.btyNomination,
    );
    expect(PUBLIC_FORMS.btyNomination.pathname).toBe("/beyond-the-yellow");
  });

  it("identifies the same form when the route has a trailing slash", () => {
    const form = document.createElement("form");
    form.innerHTML = '<input id="signup-first-name" />';

    expect(identifyPublicForm(form, "/get-care/")).toEqual(
      PUBLIC_FORMS.clientSignup,
    );
  });
});

describe("trackSuccessfulFormSubmission", () => {
  afterEach(() => {
    delete window.gtag;
    window.history.replaceState({}, "", "/");
    clearTrackedFormSubmissionsForTests();
    vi.restoreAllMocks();
  });

  it("emits one standard event and one stable per-form event", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    window.history.replaceState({}, "", "/clinicians");

    expect(
      trackSuccessfulFormSubmission(
        "clinicianInterest",
        "clinician-interest-123",
      ),
    ).toBe(true);

    const expectedParameters = {
      event_id: "clinician-interest-123",
      event_category: "form_submission",
      event_label: PUBLIC_FORMS.clinicianInterest.eventName,
      form_id: PUBLIC_FORMS.clinicianInterest.id,
      form_name: PUBLIC_FORMS.clinicianInterest.name,
      form_destination: `${window.location.origin}/clinicians`,
      form_submit_text: PUBLIC_FORMS.clinicianInterest.submitText,
      form_context: "clinicianInterest",
      success: true,
    };

    expect(gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      "vw_form_success",
      expectedParameters,
    );
    expect(gtag).toHaveBeenNthCalledWith(
      2,
      "event",
      PUBLIC_FORMS.clinicianInterest.eventName,
      expectedParameters,
    );
  });

  it("canonicalizes the legacy BTY route in successful-form analytics", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    window.history.replaceState({}, "", "/beyondtheyellow");

    expect(trackSuccessfulFormSubmission("btyGuest", "bty-guest-1")).toBe(true);

    const parameters = gtag.mock.calls[0]?.[2];
    expect(parameters?.form_destination).toBe(
      `${window.location.origin}/beyond-the-yellow`,
    );
  });

  it("deduplicates the same form and submission id", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(
      trackSuccessfulFormSubmission("clientSignup", "submission-1"),
    ).toBe(true);
    expect(
      trackSuccessfulFormSubmission("clientSignup", "submission-1"),
    ).toBe(false);
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it("does not include submitted values, query strings, or fragments", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    window.history.replaceState(
      {},
      "",
      "/get-care?email=patient@example.com#phone=555-0100",
    );

    trackSuccessfulFormSubmission("clientSignup", "submission-private");

    const serializedCalls = JSON.stringify(gtag.mock.calls);
    expect(serializedCalls).toContain(`${window.location.origin}/get-care`);
    expect(serializedCalls).not.toContain("patient@example.com");
    expect(serializedCalls).not.toContain("555-0100");
    expect(serializedCalls).not.toContain("?email=");
    expect(serializedCalls).not.toContain("#phone=");
    expect(serializedCalls).not.toContain("user_data");
  });

  it("fails closed without a valid id or Google tag", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(trackSuccessfulFormSubmission("ocsRouting", "  ")).toBe(false);
    expect(gtag).not.toHaveBeenCalled();

    delete window.gtag;
    expect(
      trackSuccessfulFormSubmission("ocsRouting", "ocs-submission-1"),
    ).toBe(false);
  });
});
