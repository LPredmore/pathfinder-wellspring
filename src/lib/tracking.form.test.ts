import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackCreatorApplicationConversion,
  trackHomeEvent,
} from "./tracking";
import {
  PUBLIC_FORMS,
  clearTrackedFormSubmissionsForTests,
} from "./sitewideFormTracking";

describe("shared form routing from legacy website events", () => {
  afterEach(() => {
    delete window.gtag;
    clearTrackedFormSubmissionsForTests();
    vi.restoreAllMocks();
  });

  it.each([
    ["bty_guest_application_submit", "btyGuest"],
    ["bty_nomination_submit", "btyNomination"],
    ["ocs_form_submit", "ocsRouting"],
  ] as const)("routes %s into the successful-form pipeline", (eventName, formKey) => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackHomeEvent(eventName, { page: "test" });

    expect(gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      eventName,
      expect.objectContaining({ page: "test" }),
    );
    expect(gtag).toHaveBeenNthCalledWith(
      2,
      "event",
      "form_submit",
      expect.objectContaining({
        form_id: PUBLIC_FORMS[formKey].id,
        form_name: PUBLIC_FORMS[formKey].name,
      }),
    );
    expect(gtag).toHaveBeenNthCalledWith(
      3,
      "event",
      PUBLIC_FORMS[formKey].eventName,
      expect.any(Object),
    );
  });

  it("does not fire the retired one-off creator conversion", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(trackCreatorApplicationConversion()).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });
});
