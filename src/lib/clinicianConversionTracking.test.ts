import { afterEach, describe, expect, it, vi } from "vitest";
import {
  resolveClinicianConversionDestination,
  trackClinicianInterestRegistered,
} from "./clinicianConversionTracking";

describe("resolveClinicianConversionDestination", () => {
  it("accepts a complete destination for the canonical Google Ads account", () => {
    expect(
      resolveClinicianConversionDestination(
        " AW-11339741081/AbCdEf123_- ",
      ),
    ).toBe("AW-11339741081/AbCdEf123_-");
  });

  it("rejects an account-only ID, malformed label, or stale Ads account", () => {
    expect(resolveClinicianConversionDestination("AW-11339741081")).toBeNull();
    expect(
      resolveClinicianConversionDestination("AW-11339741081/<label>"),
    ).toBeNull();
    expect(
      resolveClinicianConversionDestination(
        "AW-16798905432/6RqRCJ2PnfMbENjoq8o-",
      ),
    ).toBeNull();
  });
});

describe("trackClinicianInterestRegistered", () => {
  afterEach(() => {
    delete window.gtag;
    vi.restoreAllMocks();
  });

  it("sends the analytics form event and canonical Ads conversion", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(
      trackClinicianInterestRegistered(
        "clinician-interest-123",
        "AW-11339741081/AbCdEf123_-",
      ),
    ).toBe(true);

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "form_submit", {
      event_category: "clinician_interest",
      event_label: "clinician_interest_registered",
      form_name: "clinician_interest",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "conversion", {
      send_to: "AW-11339741081/AbCdEf123_-",
      value: 1.0,
      currency: "USD",
      transaction_id: "clinician-interest-123",
      transport_type: "beacon",
    });
  });

  it("retains analytics but refuses to send a conversion to the stale account", () => {
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
      trackClinicianInterestRegistered(
        "clinician-interest-123",
        "AW-11339741081/AbCdEf123_-",
      ),
    ).toBe(false);
  });
});
