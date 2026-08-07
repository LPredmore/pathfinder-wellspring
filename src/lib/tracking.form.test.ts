import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearRecentFormSubmissionIdsForTests,
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
    clearRecentFormSubmissionIdsForTests();
    vi.restoreAllMocks();
  });

  it.each([
    ["bty_guest_application_submit", "btyGuest"],
    ["bty_nomination_submit", "btyNomination"],
    ["ocs_form_submit", "ocsRouting"],
  ] as const)("routes %s into the successful-form pipeline", (eventName, formKey) => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackHomeEvent(eventName, { page: "test" }, `${formKey}-submission-1`);

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
        event_id: `${formKey}-submission-1`,
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

  it("deduplicates an immediate repeated success when an older caller omits an id", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackHomeEvent("ocs_form_submit", { page: "test" });
    trackHomeEvent("ocs_form_submit", { page: "test" });

    expect(gtag).toHaveBeenCalledTimes(4);
    expect(
      gtag.mock.calls.filter((call) => call[1] === "form_submit"),
    ).toHaveLength(1);
    expect(
      gtag.mock.calls.filter(
        (call) => call[1] === PUBLIC_FORMS.ocsRouting.eventName,
      ),
    ).toHaveLength(1);
  });

  it("deduplicates repeated calls with the same backend submission id", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackHomeEvent("bty_nomination_submit", {}, "nomination-submission-1");
    trackHomeEvent("bty_nomination_submit", {}, "nomination-submission-1");

    expect(gtag).toHaveBeenCalledTimes(4);
    expect(
      gtag.mock.calls.filter((call) => call[1] === "form_submit"),
    ).toHaveLength(1);
  });

  it("does not fire the retired one-off creator conversion", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(trackCreatorApplicationConversion()).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });
});
