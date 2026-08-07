import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLIENT_SIGNUP_ADS_CONVERSION,
  CLIENT_SIGNUP_EVENT_NAME,
  CLIENT_SIGNUP_FORM_ID,
  CLIENT_SIGNUP_FORM_NAME,
  clearTrackedSignupConversionsForTests,
  trackClientSignupSuccess,
} from "./clientSignupConversionTracking";
import {
  PUBLIC_FORMS,
  clearTrackedFormSubmissionsForTests,
} from "./sitewideFormTracking";

describe("trackClientSignupSuccess", () => {
  afterEach(() => {
    delete window.gtag;
    clearTrackedFormSubmissionsForTests();
    clearTrackedSignupConversionsForTests();
    vi.restoreAllMocks();
  });

  it("uses the shared client-signup form contract", () => {
    expect(CLIENT_SIGNUP_EVENT_NAME).toBe(PUBLIC_FORMS.clientSignup.eventName);
    expect(CLIENT_SIGNUP_FORM_ID).toBe(PUBLIC_FORMS.clientSignup.id);
    expect(CLIENT_SIGNUP_FORM_NAME).toBe(PUBLIC_FORMS.clientSignup.name);

    const gtag = vi.fn();
    window.gtag = gtag;

    expect(trackClientSignupSuccess("client-signup-123")).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(3);
    expect(gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      "vw_form_success",
      expect.objectContaining({
        event_id: "client-signup-123",
        form_id: CLIENT_SIGNUP_FORM_ID,
        form_name: CLIENT_SIGNUP_FORM_NAME,
      }),
    );
    expect(gtag).toHaveBeenNthCalledWith(
      2,
      "event",
      CLIENT_SIGNUP_EVENT_NAME,
      expect.any(Object),
    );
    expect(gtag).toHaveBeenNthCalledWith(
      3,
      "event",
      "conversion",
      expect.objectContaining({
        send_to: CLIENT_SIGNUP_ADS_CONVERSION,
        value: 1.0,
        currency: "USD",
        transaction_id: "client-signup-123",
      }),
    );
  });

  it("reports the Ads conversion only once per submission", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackClientSignupSuccess("client-signup-dupe");
    trackClientSignupSuccess("client-signup-dupe");

    const conversionCalls = gtag.mock.calls.filter(
      (call) => call[1] === "conversion",
    );
    expect(conversionCalls).toHaveLength(1);
  });
});
