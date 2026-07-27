import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BtyNominationForm } from "./BtyNominationForm";

const mocks = vi.hoisted(() => ({ rpc: vi.fn(), keyNumber: 0 }));

vi.mock("@/integrations/supabase/client", () => ({
  billingHubSupabase: { rpc: mocks.rpc },
  createWebsiteSubmissionKey: () => `nomination-${++mocks.keyNumber}`,
}));

vi.mock("@/lib/tracking", () => ({ trackHomeEvent: vi.fn() }));

function fillIndividualNomination() {
  fireEvent.change(screen.getByLabelText(/Their first name/), { target: { value: "Helpful" } });
  fireEvent.change(screen.getByLabelText(/Their last name/), { target: { value: "Person" } });
  fireEvent.change(screen.getByLabelText(/Their email address/), { target: { value: "Helpful@Example.com" } });
  fireEvent.change(screen.getByLabelText(/Is this person connected/), { target: { value: "yes" } });
  fireEvent.change(screen.getByLabelText(/Why should this person/), {
    target: { value: "They consistently organize useful community support." },
  });
  fireEvent.click(screen.getByLabelText(/I am providing this information in good faith/));
}

describe("BtyNominationForm", () => {
  beforeEach(() => {
    mocks.keyNumber = 0;
    mocks.rpc.mockReset();
    mocks.rpc.mockResolvedValue({ data: { ok: true }, error: null });
  });

  afterEach(cleanup);

  it("asks for the nominated person's contact information instead of the submitter's", () => {
    render(<BtyNominationForm />);

    expect(screen.getByText("Nominated person's contact information")).toBeInTheDocument();
    expect(screen.getByLabelText(/Their email address/)).toBeInTheDocument();
    expect(screen.queryByText("Your contact information")).not.toBeInTheDocument();
    expect(screen.getByText(/providing this information in good faith/i)).toBeInTheDocument();
    expect(screen.queryByText(/I consent to ValorWell contacting me/i)).not.toBeInTheDocument();
  });

  it("submits an individual using the nominee's contact information", async () => {
    render(<BtyNominationForm />);
    fillIndividualNomination();
    fireEvent.click(screen.getByRole("button", { name: "Submit nomination" }));

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(1));
    expect(mocks.rpc).toHaveBeenCalledWith("submit_website_bty_contact_nomination", {
      p_payload: expect.objectContaining({
        submission_key: "nomination-1",
        nomination_type: "individual",
        first_name: "Helpful",
        last_name: "Person",
        email: "helpful@example.com",
        veteran_connection: "yes",
        reason: "They consistently organize useful community support.",
        consent: true,
      }),
    });
    expect(mocks.rpc.mock.calls[0][1].p_payload).not.toHaveProperty("organization_name");
    expect(await screen.findByRole("status")).toHaveTextContent(/Thank you for the nomination/);
  });

  it("collects the organization and its contact person's information", async () => {
    render(<BtyNominationForm />);
    fireEvent.click(screen.getByLabelText("organization"));

    fireEvent.change(screen.getByLabelText(/Organization name/), { target: { value: "Helpful Group" } });
    fireEvent.change(screen.getByLabelText(/Contact person's first name/), { target: { value: "Casey" } });
    fireEvent.change(screen.getByLabelText(/Contact person's last name/), { target: { value: "Leader" } });
    fireEvent.change(screen.getByLabelText(/Contact person's email address/), { target: { value: "Casey@Example.com" } });
    fireEvent.change(screen.getByLabelText(/Contact person's role or title/), { target: { value: "Director" } });
    fireEvent.change(screen.getByLabelText(/Is the organization connected/), { target: { value: "unknown" } });
    fireEvent.change(screen.getByLabelText(/Why should this organization/), {
      target: { value: "The organization provides visible and practical community support." },
    });
    fireEvent.click(screen.getByLabelText(/I am providing this information in good faith/));
    fireEvent.click(screen.getByRole("button", { name: "Submit nomination" }));

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(1));
    expect(mocks.rpc).toHaveBeenCalledWith("submit_website_bty_contact_nomination", {
      p_payload: expect.objectContaining({
        nomination_type: "organization",
        organization_name: "Helpful Group",
        first_name: "Casey",
        last_name: "Leader",
        email: "casey@example.com",
        role_title: "Director",
        veteran_connection: "unknown",
      }),
    });
  });

  it("keeps one idempotency key when a failed request is retried", async () => {
    mocks.rpc
      .mockResolvedValueOnce({ data: null, error: { message: "backend detail" } })
      .mockResolvedValueOnce({ data: { ok: true }, error: null });

    render(<BtyNominationForm />);
    fillIndividualNomination();

    fireEvent.click(screen.getByRole("button", { name: "Submit nomination" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/could not send/i);
    expect(screen.queryByText(/backend detail/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit nomination" }));
    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(2));
    expect(mocks.rpc.mock.calls[0][1].p_payload.submission_key).toBe("nomination-1");
    expect(mocks.rpc.mock.calls[1][1].p_payload.submission_key).toBe("nomination-1");
  });
});
