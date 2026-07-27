import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildCreatorInterestPayload,
  UnifiedBtyForm,
  type CreatorInterestFormState,
} from "./UnifiedBtyForm";

const mocks = vi.hoisted(() => ({ rpc: vi.fn(), keyNumber: 0 }));

vi.mock("@/integrations/supabase/client", () => ({
  billingHubSupabase: { rpc: mocks.rpc },
  createWebsiteSubmissionKey: () => `submission-${++mocks.keyNumber}`,
}));

vi.mock("@/lib/tracking", () => ({
  trackHomeEvent: vi.fn(),
  trackCreatorApplicationConversion: vi.fn(),
}));

function fillRequired(email = "Person@Example.com") {
  fireEvent.change(screen.getByLabelText(/First name/), { target: { value: "Test" } });
  fireEvent.change(screen.getByLabelText(/Last name/), { target: { value: "Person" } });
  fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/What is your connection/), { target: { value: "veteran" } });
  fireEvent.change(screen.getByLabelText(/What are you doing/), {
    target: { value: "I organize community support and want to discuss what has worked." },
  });
  fireEvent.click(screen.getByLabelText(/I am comfortable being contacted/));
}

describe("UnifiedBtyForm", () => {
  beforeEach(() => {
    mocks.keyNumber = 0;
    mocks.rpc.mockReset();
    mocks.rpc.mockResolvedValue({ data: { ok: true }, error: null });
  });

  afterEach(cleanup);

  it("builds only the streamlined public RPC payload", () => {
    const state: CreatorInterestFormState = {
      firstName: " Test ",
      lastName: " Person ",
      email: " PERSON@EXAMPLE.COM ",
      phone: "",
      veteranConnection: "serves_veterans",
      conversationSummary: " A useful conversation about measurable community work. ",
      workLink: " https://example.com/work ",
      acknowledgment: true,
    };

    const payload = buildCreatorInterestPayload(state, "submission-fixed");

    expect(Object.keys(payload).sort()).toEqual([
      "consent",
      "conversation_summary",
      "email",
      "first_name",
      "last_name",
      "recording_ready",
      "source_page",
      "submission_key",
      "user_agent",
      "veteran_connection",
      "work_link",
    ].sort());
    expect(payload).toMatchObject({
      email: "person@example.com",
      veteran_connection: "serves_veterans",
      recording_ready: true,
      consent: true,
      work_link: "https://example.com/work",
    });
    expect(payload).not.toHaveProperty("relationship_types");
    expect(payload).not.toHaveProperty("follower_count");
    expect(payload).not.toHaveProperty("fundraising_goal");
  });

  it("renders a short podcast application without the removed intake fields", () => {
    render(<UnifiedBtyForm />);

    expect(screen.getByRole("heading", { name: /Apply to Be a Guest/ })).toBeInTheDocument();
    expect(screen.getByText(/about two minutes/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/^State/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Follower count/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fundraising interest/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Participation comfort level/i)).not.toBeInTheDocument();
  });

  it("shows client-side validation and does not call the RPC", () => {
    render(<UnifiedBtyForm />);
    fireEvent.click(screen.getByRole("button", { name: /Apply to be a guest/ }));

    expect(screen.getByRole("alert")).toHaveTextContent(/review the highlighted fields/i);
    expect(screen.getByText("First name is required.")).toBeInTheDocument();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("rejects email syntax that the database contract rejects", () => {
    render(<UnifiedBtyForm />);
    fillRequired("a@b.c");
    fireEvent.click(screen.getByRole("button", { name: /Apply to be a guest/ }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("rejects a non-HTTPS work link", () => {
    render(<UnifiedBtyForm />);
    fillRequired();
    fireEvent.change(screen.getByLabelText(/Link to your work/), {
      target: { value: "http://example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Apply to be a guest/ }));

    expect(screen.getByText("Enter a valid HTTPS link.")).toBeInTheDocument();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("submits the streamlined application through the dedicated RPC", async () => {
    render(<UnifiedBtyForm />);
    fillRequired();
    fireEvent.change(screen.getByLabelText(/Link to your work/), {
      target: { value: "https://example.com/work" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Apply to be a guest/ }));

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(1));
    expect(mocks.rpc).toHaveBeenCalledWith("submit_website_bty_guest_application", {
      p_payload: expect.objectContaining({
        submission_key: "submission-1",
        first_name: "Test",
        last_name: "Person",
        email: "person@example.com",
        veteran_connection: "veteran",
        recording_ready: true,
        consent: true,
        work_link: "https://example.com/work",
      }),
    });
    expect(await screen.findByRole("status")).toHaveTextContent(/received your guest application/i);
  });

  it("shows a safe generic failure and keeps the idempotency key for a retry", async () => {
    mocks.rpc
      .mockResolvedValueOnce({ data: null, error: { message: "relation secret_table does not exist" } })
      .mockResolvedValueOnce({ data: { ok: true }, error: null });

    render(<UnifiedBtyForm />);
    fillRequired();
    fireEvent.click(screen.getByRole("button", { name: /Apply to be a guest/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/could not submit the application/i);
    expect(screen.queryByText(/secret_table/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Apply to be a guest/ }));
    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(2));
    expect(mocks.rpc.mock.calls[0][1].p_payload.submission_key).toBe("submission-1");
    expect(mocks.rpc.mock.calls[1][1].p_payload.submission_key).toBe("submission-1");
  });
});
