import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLIENT_SIGNUP_EVENT_NAME,
  CLIENT_SIGNUP_FORM_ID,
  CLIENT_SIGNUP_FORM_NAME,
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
    vi.restoreAllMocks();
  });

  it("uses the shared client-signup form contract", () => {
    expect(CLIENT_SIGNUP_EVENT_NAME).toBe(PUBLIC_FORMS.clientSignup.eventName);
    expect(CLIENT_SIGNUP_FORM_ID).toBe(PUBLIC_FORMS.clientSignup.id);
    expect(CLIENT_SIGNUP_FORM_NAME).toBe(PUBLIC_FORMS.clientSignup.name);

    const gtag = vi.fn();
    window.gtag = gtag;

    expect(trackClientSignupSuccess("client-signup-123")).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(2);
    expect(gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      "form_submit",
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
  });
});
