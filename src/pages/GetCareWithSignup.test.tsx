import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GetCareWithSignup from "./GetCareWithSignup";

const mocks = vi.hoisted(() => ({
  invoke: vi.fn(),
  trackClientSignupSuccess: vi.fn(),
}));

vi.mock("./GetCare", () => ({
  default: () => <div className="clinicians-theme">Get Care</div>,
}));

vi.mock("@/integrations/supabase/client", () => ({
  billingHubSupabase: {
    functions: { invoke: mocks.invoke },
  },
  createWebsiteSubmissionKey: () => "client-signup-test-123",
}));

vi.mock("@/lib/clientSignupConversionTracking", () => ({
  CLIENT_SIGNUP_FORM_ID: "valorwell-get-care-signup",
  CLIENT_SIGNUP_FORM_NAME: "valorwell_get_care_signup",
  trackClientSignupSuccess: mocks.trackClientSignupSuccess,
}));

function openAndFillSignup() {
  fireEvent.click(
    screen.getByRole("button", { name: "Start CHAMPVA Intake" }),
  );
  fireEvent.change(screen.getByLabelText("First name"), {
    target: { value: "Jordan" },
  });
  fireEvent.change(screen.getByLabelText("Last name"), {
    target: { value: "Taylor" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: " Jordan@Example.com " },
  });
  fireEvent.change(screen.getByLabelText("Phone number"), {
    target: { value: " 555-0100 " },
  });
}

function submitSignup() {
  fireEvent.click(
    screen.getByRole("button", { name: "Create Account and Email Instructions" }),
  );
}

describe("GetCareWithSignup", () => {
  beforeEach(() => {
    mocks.invoke.mockResolvedValue({
      data: { ok: true, conversionEligible: true },
      error: null,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("exposes stable form metadata for Google tag diagnostics", () => {
    render(<GetCareWithSignup />);
    fireEvent.click(
      screen.getByRole("button", { name: "Start CHAMPVA Intake" }),
    );

    const form = screen
      .getByRole("button", { name: "Create Account and Email Instructions" })
      .closest("form");

    expect(form).toHaveAttribute("id", "valorwell-get-care-signup");
    expect(form).toHaveAttribute("name", "valorwell_get_care_signup");
  });

  it("tracks only when Billing Hub confirms a new account", async () => {
    render(<GetCareWithSignup />);
    openAndFillSignup();
    submitSignup();

    await waitFor(() => expect(mocks.invoke).toHaveBeenCalledOnce());
    expect(mocks.invoke).toHaveBeenCalledWith("register-client-website", {
      body: {
        firstName: "Jordan",
        lastName: "Taylor",
        email: "jordan@example.com",
        phone: "555-0100",
        website: "",
        submissionId: "client-signup-test-123",
      },
    });
    expect(mocks.trackClientSignupSuccess).toHaveBeenCalledOnce();
    expect(mocks.trackClientSignupSuccess).toHaveBeenCalledWith(
      "client-signup-test-123",
    );
    expect(
      await screen.findByRole("heading", { name: "Check your email to continue" }),
    ).toBeInTheDocument();
  });

  it("does not track a generic success that is not conversion eligible", async () => {
    mocks.invoke.mockResolvedValueOnce({
      data: { ok: true, conversionEligible: false },
      error: null,
    });

    render(<GetCareWithSignup />);
    openAndFillSignup();
    submitSignup();

    expect(
      await screen.findByRole("heading", { name: "Check your email to continue" }),
    ).toBeInTheDocument();
    expect(mocks.trackClientSignupSuccess).not.toHaveBeenCalled();
  });

  it("fails closed when an older response omits conversion eligibility", async () => {
    mocks.invoke.mockResolvedValueOnce({
      data: { ok: true },
      error: null,
    });

    render(<GetCareWithSignup />);
    openAndFillSignup();
    submitSignup();

    expect(
      await screen.findByRole("heading", { name: "Check your email to continue" }),
    ).toBeInTheDocument();
    expect(mocks.trackClientSignupSuccess).not.toHaveBeenCalled();
  });

  it("tracks a newly created account even when its access email fails", async () => {
    mocks.invoke.mockResolvedValueOnce({
      data: {
        ok: false,
        conversionEligible: true,
        error:
          "Your account may have been created, but we could not send the access email. Please try again.",
        code: "activation_email_failed",
      },
      error: null,
    });

    render(<GetCareWithSignup />);
    openAndFillSignup();
    submitSignup();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your account may have been created, but we could not send the access email. Please try again.",
    );
    expect(mocks.trackClientSignupSuccess).toHaveBeenCalledOnce();
    expect(mocks.trackClientSignupSuccess).toHaveBeenCalledWith(
      "client-signup-test-123",
    );
  });

  it("does not track a failed registration attempt", async () => {
    mocks.invoke.mockResolvedValueOnce({
      data: null,
      error: { message: "registration failed" },
    });

    render(<GetCareWithSignup />);
    openAndFillSignup();
    submitSignup();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "We could not create your account. Please try again.",
    );
    expect(mocks.trackClientSignupSuccess).not.toHaveBeenCalled();
  });
});
