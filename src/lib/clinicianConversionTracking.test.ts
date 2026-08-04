import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION,
  resolveClinicianConversionDestination,
  trackClinicianInterestRegistered,
} from "./clinicianConversionTracking";

describe("resolveClinicianConversionDestination", () => {
  it("accepts the exact Google Ads destination for Therapist Application Submitted", () => {
    expect(
      resolveClinicianConversionDestination(
        ` ${CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION} `,
      ),
    ).toBe(CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION);
  });

  it("rejects account-only IDs, placeholders, and other conversion actions", () => {
    expect(resolveClinicianConversionDestination("AW-16798905432")).toBeNull();
    expect(
      resolveClinicianConversionDestination("AW-16798905432/<label>"),
    ).toBeNull();
    expect(
      resolveClinicianConversionDestination(
        "AW-16798905432/6RqRCJ2PnfMbENjoq8o-",
      ),
    ).toBeNull();
    expect(
      resolveClinicianConversionDestination(
        "AW-11339741081/XWcdCMz27tscENjoq8o-",
      ),
    ).toBeNull();
  });
});

describe("trackClinicianInterestRegistered", () => {
  afterEach(() => {
    delete window.gtag;
    vi.restoreAllMocks();
  });

  it("sends the analytics event and verified Ads conversion by default", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(
      trackClinicianInterestRegistered("clinician-interest-123"),
    ).toBe(true);

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "form_submit", {
      event_category: "clinician_interest",
      event_label: "clinician_interest_registered",
      form_name: "clinician_interest",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "conversion", {
      send_to: CLINICIAN_GOOGLE_ADS_CONVERSION_DESTINATION,
      value: 1.0,
      currency: "USD",
      transaction_id: "clinician-interest-123",
      transport_type: "beacon",
    });
  });

  it("retains analytics but refuses an unverified conversion destination", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(
      trackClinicianInterestRegistered(
        "clinician-interest-123",
        "AW-16798905432/6RqRCJ2PnfMbENjoq8o-",
      ),
    ).toBe(false);

    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith("event", "form_submit", {
      event_category: "clinician_interest",
      event_label: "clinician_interest_registered",
      form_name: "clinician_interest",
    });
  });

  it("does not throw or report success when gtag is unavailable", () => {
    expect(
      trackClinicianInterestRegistered("clinician-interest-123"),
    ).toBe(false);
  });
});
