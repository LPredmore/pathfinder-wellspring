import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLIENT_SIGNUP_EVENT_NAME,
  CLIENT_SIGNUP_FORM_ID,
  CLIENT_SIGNUP_FORM_NAME,
  trackClientSignupSuccess,
} from "./clientSignupConversionTracking";

describe("trackClientSignupSuccess", () => {
  afterEach(() => {
    delete window.gtag;
    window.history.replaceState({}, "", "/");
    vi.restoreAllMocks();
  });

  it("emits one unique success event and one standard form event", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    window.history.replaceState({}, "", "/get-care");

    expect(trackClientSignupSuccess("client-signup-123")).toBe(true);

    const expectedParameters = {
      event_id: "client-signup-123",
      event_category: "client_signup",
      event_label: "client_account_created",
      form_id: CLIENT_SIGNUP_FORM_ID,
      form_name: CLIENT_SIGNUP_FORM_NAME,
      form_destination: `${window.location.origin}/get-care`,
      form_submit_text: "Create Account and Email Instructions",
      signup_source: "valorwell_get_care",
      transport_type: "beacon",
    };

    expect(gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      CLIENT_SIGNUP_EVENT_NAME,
      expectedParameters,
    );
    expect(gtag).toHaveBeenNthCalledWith(
      2,
      "event",
      "form_submit",
      expectedParameters,
    );
  });

  it("does not emit the same successful submission twice", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(trackClientSignupSuccess("client-signup-deduped")).toBe(true);
    expect(trackClientSignupSuccess("client-signup-deduped")).toBe(false);
    expect(gtag).toHaveBeenCalledTimes(2);
  });

  it("does not emit events when the submission ID or Google tag is unavailable", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    expect(trackClientSignupSuccess("   ")).toBe(false);
    expect(gtag).not.toHaveBeenCalled();

    delete window.gtag;
    expect(trackClientSignupSuccess("client-signup-no-tag")).toBe(false);
  });

  it("never includes submitted identity or contact values", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackClientSignupSuccess("client-signup-no-pii");

    const serializedCalls = JSON.stringify(gtag.mock.calls);
    expect(serializedCalls).not.toContain("email");
    expect(serializedCalls).not.toContain("phone");
    expect(serializedCalls).not.toContain("first_name");
    expect(serializedCalls).not.toContain("last_name");
    expect(serializedCalls).not.toContain("user_data");
  });

  it("excludes query strings and fragments from the form destination", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    window.history.replaceState(
      {},
      "",
      "/get-care?email=patient@example.com#phone=555-0100",
    );

    expect(trackClientSignupSuccess("client-signup-private-url")).toBe(true);

    const serializedCalls = JSON.stringify(gtag.mock.calls);
    expect(serializedCalls).toContain(
      `${window.location.origin}/get-care`,
    );
    expect(serializedCalls).not.toContain("patient@example.com");
    expect(serializedCalls).not.toContain("555-0100");
    expect(serializedCalls).not.toContain("?email=");
    expect(serializedCalls).not.toContain("#phone=");
  });
});
