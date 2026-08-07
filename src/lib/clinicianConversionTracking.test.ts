import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLINICIAN_INTEREST_EVENT_NAME,
  CLINICIAN_INTEREST_FORM_ID,
  CLINICIAN_INTEREST_FORM_NAME,
  trackClinicianInterestRegistered,
} from "./clinicianConversionTracking";
import {
  PUBLIC_FORMS,
  clearTrackedFormSubmissionsForTests,
} from "./sitewideFormTracking";

describe("trackClinicianInterestRegistered", () => {
  afterEach(() => {
    delete window.gtag;
    clearTrackedFormSubmissionsForTests();
    vi.restoreAllMocks();
  });

  it("uses the shared clinician form contract without an Ads label", () => {
    expect(CLINICIAN_INTEREST_FORM_ID).toBe(
      PUBLIC_FORMS.clinicianInterest.id,
    );
    expect(CLINICIAN_INTEREST_FORM_NAME).toBe(
      PUBLIC_FORMS.clinicianInterest.name,
    );
    expect(CLINICIAN_INTEREST_EVENT_NAME).toBe(
      PUBLIC_FORMS.clinicianInterest.eventName,
    );

    const gtag = vi.fn();
    window.gtag = gtag;

    expect(
      trackClinicianInterestRegistered("clinician-interest-123"),
    ).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(2);
    expect(gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      "vw_form_success",
      expect.objectContaining({
        event_id: "clinician-interest-123",
        form_id: CLINICIAN_INTEREST_FORM_ID,
        form_name: CLINICIAN_INTEREST_FORM_NAME,
      }),
    );
    expect(gtag).toHaveBeenNthCalledWith(
      2,
      "event",
      CLINICIAN_INTEREST_EVENT_NAME,
      expect.any(Object),
    );
  });

  it("fails closed when gtag is unavailable", () => {
    expect(
      trackClinicianInterestRegistered("clinician-interest-123"),
    ).toBe(false);
  });
});
