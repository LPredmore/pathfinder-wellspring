import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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
  fireEvent.change(screen.getByLabelText(/First name/), {
    target: { value: "Test" },
  });
  fireEvent.change(screen.getByLabelText(/Last name/), {
    target: { value: "Person" },
  });
  fireEvent.change(screen.getByLabelText(/^Email/), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/^State/), {
    target: { value: "TX" },
  });
  fireEvent.click(screen.getByLabelText("Creator or influencer"));
  fireEvent.change(screen.getByLabelText(/Why are you interested/), {
    target: { value: "I want to help tell useful stories." },
  });
  fireEvent.change(screen.getByLabelText(/How would you like to participate/), {
    target: { value: "I can create educational community content." },
  });
  fireEvent.change(screen.getByLabelText(/Are you willing to share/), {
    target: { value: "not_sure" },
  });
  fireEvent.change(screen.getByLabelText(/Participation comfort level/), {
    target: { value: "flexible" },
  });
  fireEvent.click(
    screen.getByLabelText(/I consent to ValorWell contacting me/),
  );
}

describe("UnifiedBtyForm", () => {
  beforeEach(() => {
    mocks.keyNumber = 0;
    mocks.rpc.mockResolvedValue({ data: { success: true }, error: null });
  });

  afterEach(cleanup);

  it("builds only the public RPC whitelist and omits empty optional fields", () => {
    const state: CreatorInterestFormState = {
      firstName: " Test ",
      lastName: " Person ",
      preferredName: "",
      email: " PERSON@EXAMPLE.COM ",
      phone: "",
      state: "TX",
      veteranAffiliation: "none",
      veteranConnection: "",
      motivation: "A useful motivation",
      participationPreferences: "A useful participation plan",
      willingToShare: "not_sure",
      comfortLevel: "not_sure",
      personalMission: "",
      fundraisingGoal: "",
      additionalInformation: "",
      roleCodes: ["bty_promoter"],
      socials: [],
      consent: true,
    };
    const payload = buildCreatorInterestPayload(state, "submission-fixed");
    expect(Object.keys(payload).sort()).toEqual(
      [
        "comfort_level",
        "consent",
        "email",
        "first_name",
        "last_name",
        "motivation",
        "participation",
        "relationship_types",
        "social_profiles",
        "source_page",
        "state",
        "submission_key",
        "user_agent",
        "veteran_affiliation",
        "willing_to_share",
      ].sort(),
    );
    expect(payload).toMatchObject({
      email: "person@example.com",
      participation: "A useful participation plan",
      relationship_types: ["bty_promoter"],
    });
    expect(payload).not.toHaveProperty("password");
    expect(payload).not.toHaveProperty("avatar");
    expect(payload).not.toHaveProperty("competition");
  });

  it("renders an anonymous interest form without account or avatar fields", () => {
    render(<UnifiedBtyForm />);
    expect(
      screen.getByRole("heading", { name: /Beyond The Yellow guest interest/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/does not create an account/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/avatar|photo|upload/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Social profile 1/)).not.toBeInTheDocument();
  });

  it("shows client-side validation and does not call the RPC", () => {
    render(<UnifiedBtyForm />);
    fireEvent.submit(
      screen.getByRole("button", { name: /Send my interest/ }).closest("form")!,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      /review the highlighted fields/i,
    );
    expect(screen.getByText("First name is required.")).toBeInTheDocument();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("rejects email syntax that the database contract rejects", () => {
    render(<UnifiedBtyForm />);
    fillRequired("a@b.c");
    fireEvent.click(screen.getByRole("button", { name: /Send my interest/ }));
    expect(
      screen.getByText("Enter a valid email address."),
    ).toBeInTheDocument();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("rejects an aggregate UTF-8 payload before calling the RPC", () => {
    render(<UnifiedBtyForm />);
    fillRequired();
    const text1900 = "🚀".repeat(1900);
    fireEvent.change(screen.getByLabelText(/Why are you interested/), {
      target: { value: text1900 },
    });
    fireEvent.change(
      screen.getByLabelText(/How would you like to participate/),
      { target: { value: text1900 } },
    );
    fireEvent.change(screen.getByLabelText(/Personal mission/), {
      target: { value: text1900 },
    });
    fireEvent.change(screen.getByLabelText(/Anything else/), {
      target: { value: "🚀".repeat(3900) },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send my interest/ }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      /review the highlighted fields/i,
    );
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("adds several social rows, removes one, and submits only the remaining normalized row", async () => {
    render(<UnifiedBtyForm />);
    fillRequired();
    fireEvent.click(screen.getByRole("button", { name: /Add social profile/ }));
    fireEvent.click(screen.getByRole("button", { name: /Add social profile/ }));
    const platformSelects = screen.getAllByLabelText(/^Platform/);
    fireEvent.change(platformSelects[0], { target: { value: "Instagram" } });
    fireEvent.change(platformSelects[1], { target: { value: "YouTube" } });
    const handles = screen.getAllByLabelText(/Handle or username/);
    fireEvent.change(handles[0], { target: { value: "@remove-me" } });
    fireEvent.change(handles[1], { target: { value: "@keep-me" } });
    fireEvent.change(screen.getAllByLabelText(/Follower count/)[1], {
      target: { value: "1200" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Remove social profile 1" }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Send my interest/ }));

    await waitFor(() => expect(mocks.rpc).toHaveBeenCalledTimes(1));
    expect(mocks.rpc).toHaveBeenCalledWith("submit_website_creator_interest", {
      p_payload: expect.objectContaining({
        email: "person@example.com",
        relationship_types: ["creator"],
        social_profiles: [
          { platform: "YouTube", handle: "@keep-me", follower_count: 1200 },
        ],
      }),
    });
  });

  it("shows a safe generic failure without exposing backend details", async () => {
    mocks.rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "relation secret_table does not exist" },
    });
    render(<UnifiedBtyForm />);
    fillRequired();
    fireEvent.click(screen.getByRole("button", { name: /Send my interest/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "We could not submit the form right now.",
    );
    expect(screen.queryByText(/secret_table/)).not.toBeInTheDocument();
  });

  it("submits the same normalized email twice with separate idempotency keys", async () => {
    const first = render(<UnifiedBtyForm />);
    fillRequired(" Repeat@Example.com ");
    fireEvent.click(screen.getByRole("button", { name: /Send my interest/ }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      /received your interest/i,
    );
    first.unmount();

    render(<UnifiedBtyForm />);
    fillRequired("repeat@example.com");
    fireEvent.click(screen.getByRole("button", { name: /Send my interest/ }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      /received your interest/i,
    );

    expect(mocks.rpc).toHaveBeenCalledTimes(2);
    const firstPayload = mocks.rpc.mock.calls[0][1].p_payload;
    const secondPayload = mocks.rpc.mock.calls[1][1].p_payload;
    expect(firstPayload.email).toBe("repeat@example.com");
    expect(secondPayload.email).toBe("repeat@example.com");
    expect(firstPayload.submission_key).not.toBe(secondPayload.submission_key);
  });
});
