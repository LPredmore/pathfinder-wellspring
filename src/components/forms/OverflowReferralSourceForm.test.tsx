import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OverflowReferralSourceForm } from "./OverflowReferralSourceForm";

const mocks = vi.hoisted(() => ({ rpc: vi.fn(), keyNumber: 0 }));

vi.mock("@/integrations/supabase/client", () => ({
  billingHubSupabase: { rpc: mocks.rpc },
  createWebsiteSubmissionKey: () => `overflow-${++mocks.keyNumber}`,
}));

function openForm() {
  fireEvent.click(
    screen.getByRole("button", { name: /Join the Overflow Referral Network/i }),
  );
}

function fillRequired() {
  fireEvent.change(screen.getByLabelText("Practice name"), {
    target: { value: "Veteran Family Counseling" },
  });
  fireEvent.change(screen.getByLabelText("Primary contact name"), {
    target: { value: "Alex Morgan" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: " Referrals@Example.com " },
  });
  fireEvent.change(screen.getByLabelText("Phone (optional)"), {
    target: { value: "816-555-0199" },
  });
  fireEvent.click(screen.getByLabelText("CHAMPVA"));
  fireEvent.click(screen.getByLabelText(/VA Community Care Network/));
}

describe("OverflowReferralSourceForm", () => {
  beforeEach(() => {
    mocks.keyNumber = 0;
    mocks.rpc.mockResolvedValue({
      data: { success: true, status: "new", account_created: false },
      error: null,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("keeps the form collapsed until requested", () => {
    render(<OverflowReferralSourceForm />);

    expect(
      screen.getByRole("heading", {
        name: /Already credentialed with VACCN, CHAMPVA, or TRICARE/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Practice name")).not.toBeInTheDocument();

    openForm();
    expect(screen.getByLabelText("Practice name")).toBeInTheDocument();
  });

  it("collects only practice reference information and no account fields", () => {
    render(<OverflowReferralSourceForm />);
    openForm();

    expect(screen.getByLabelText("Practice name")).toBeInTheDocument();
    expect(screen.getByLabelText("Primary contact name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone (optional)")).toBeInTheDocument();
    expect(screen.getByLabelText("CHAMPVA")).toBeInTheDocument();
    expect(screen.getByLabelText(/VA Community Care Network/)).toBeInTheDocument();
    expect(screen.getByLabelText("TRICARE")).toBeInTheDocument();

    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/license number/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/create account/i)).not.toBeInTheDocument();
  });

  it("requires contact fields and at least one credentialed program", async () => {
    render(<OverflowReferralSourceForm />);
    openForm();
    fireEvent.click(screen.getByRole("button", { name: "Add My Practice" }));

    expect(await screen.findByText("Practice name is required.")).toBeInTheDocument();
    expect(screen.getByText("Primary contact name is required.")).toBeInTheDocument();
    expect(screen.getByText("Select at least one program.")).toBeInTheDocument();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("submits normalized reference data without creating an account", async () => {
    render(<OverflowReferralSourceForm />);
    openForm();
    fillRequired();
    fireEvent.click(screen.getByRole("button", { name: "Add My Practice" }));

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(1));
    expect(mocks.rpc).toHaveBeenCalledWith("submit_overflow_referral_source", {
      p_payload: expect.objectContaining({
        practice_name: "Veteran Family Counseling",
        primary_contact_name: "Alex Morgan",
        email: "referrals@example.com",
        phone: "816-555-0199",
        credentialed_programs: ["champva", "vaccn"],
        submission_key: "overflow-1",
        source_page: "/clinicians",
      }),
    });

    expect(await screen.findByRole("status")).toHaveTextContent(
      /added to our overflow referral reference list/i,
    );
    expect(screen.getByRole("status")).not.toHaveTextContent(/account created/i);
  });

  it("shows a safe generic error", async () => {
    mocks.rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "private table details" },
    });

    render(<OverflowReferralSourceForm />);
    openForm();
    fillRequired();
    fireEvent.click(screen.getByRole("button", { name: "Add My Practice" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "We could not add your practice right now. Please try again.",
    );
    expect(screen.queryByText(/private table details/i)).not.toBeInTheDocument();
  });
});
