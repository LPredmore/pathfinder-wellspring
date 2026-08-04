import { beforeEach, describe, expect, it } from "vitest";
import {
  captureDonationAcquisition,
  clearDonationAcquisitionForTests,
  getDonationAcquisition,
} from "@/lib/donationAttribution";

describe("donation acquisition attribution", () => {
  beforeEach(() => {
    clearDonationAcquisitionForTests();
  });

  it("captures paid acquisition parameters and landing context", () => {
    captureDonationAcquisition(
      "?gclid=click-123&utm_source=google&utm_medium=cpc&utm_campaign=donors",
      "/partner?gclid=click-123",
      "https://www.google.com/",
    );

    expect(getDonationAcquisition()).toMatchObject({
      gclid: "click-123",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "donors",
      landing_path: "/partner?gclid=click-123",
      referrer: "https://www.google.com/",
    });
  });

  it("does not overwrite a paid click during internal navigation", () => {
    captureDonationAcquisition("?gclid=paid-click&utm_source=google", "/", "");
    captureDonationAcquisition("?vw_entry_source=home-hero", "/partner", "");

    expect(getDonationAcquisition()?.gclid).toBe("paid-click");
    expect(getDonationAcquisition()?.utm_source).toBe("google");
  });

  it("replaces an older paid click when a new paid click arrives", () => {
    captureDonationAcquisition("?gclid=old-click&utm_campaign=old", "/", "");
    captureDonationAcquisition("?gclid=new-click&utm_campaign=new", "/partner", "");

    expect(getDonationAcquisition()?.gclid).toBe("new-click");
    expect(getDonationAcquisition()?.utm_campaign).toBe("new");
  });
});
