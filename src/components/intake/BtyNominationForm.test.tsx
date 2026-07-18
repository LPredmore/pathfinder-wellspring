import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BtyNominationForm } from "./BtyNominationForm";

const mocks = vi.hoisted(() => ({ rpc: vi.fn(), keyNumber: 0 }));

vi.mock("@/integrations/supabase/client", () => ({
  billingHubSupabase: { rpc: mocks.rpc },
  createWebsiteSubmissionKey: () => `nomination-${++mocks.keyNumber}`,
}));

vi.mock("@/lib/tracking", () => ({ trackHomeEvent: vi.fn() }));

function fillNomination() {
  fireEvent.change(screen.getByLabelText("Individual name"), { target: { value: "Helpful Person" } });
  fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Test" } });
  fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Nominator" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "Test@Example.com" } });
  fireEvent.change(screen.getByLabelText(/What real action/), { target: { value: "They consistently organize useful community support." } });
  fireEvent.click(screen.getByLabelText(/I consent to ValorWell contacting me/));
}

describe("BtyNominationForm", () => {
  beforeEach(() => {
    mocks.keyNumber = 0;
    mocks.rpc.mockResolvedValue({ data: { submission_id: "submission-id" }, error: null });
  });

  afterEach(cleanup);

  it("submits an anonymous nomination through the dedicated Billing Hub RPC", async () => {
    render(<BtyNominationForm />);
    fillNomination();
    fireEvent.click(screen.getByRole("button", { name: "Submit nomination" }));

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(1));
    expect(mocks.rpc).toHaveBeenCalledWith("submit_website_bty_nomination", {
      p_payload: expect.objectContaining({
        submission_key: "nomination-1",
        first_name: "Test",
        last_name: "Nominator",
        email: "test@example.com",
        subject_name: "Helpful Person",
        nomination_type: "individual",
        action: "They consistently organize useful community support.",
        consent: true,
      }),
    });
    expect(await screen.findByRole("status")).toHaveTextContent(/Thank you for the nomination/);
  });

  it("keeps one idempotency key when a failed request is retried", async () => {
    mocks.rpc
      .mockResolvedValueOnce({ data: null, error: { message: "backend detail" } })
      .mockResolvedValueOnce({ data: { submission_id: "submission-id" }, error: null });
    render(<BtyNominationForm />);
    fillNomination();

    fireEvent.click(screen.getByRole("button", { name: "Submit nomination" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/could not send/i);
    fireEvent.click(screen.getByRole("button", { name: "Submit nomination" }));

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(2));
    expect(mocks.rpc.mock.calls[0][1].p_payload.submission_key).toBe("nomination-1");
    expect(mocks.rpc.mock.calls[1][1].p_payload.submission_key).toBe("nomination-1");
    expect(screen.queryByText(/backend detail/)).not.toBeInTheDocument();
  });
});
