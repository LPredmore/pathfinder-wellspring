import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { DonateButton } from "./DonateButton";

function linkUrl(name: string) {
  const href = screen.getByRole("link", { name }).getAttribute("href");
  expect(href).toBeTruthy();
  return new URL(href!, "https://valorwell.org");
}

describe("DonateButton routing", () => {
  afterEach(cleanup);

  it("routes donation CTAs outside the partner page without overwriting acquisition UTMs", () => {
    render(
      <MemoryRouter initialEntries={["/mission"]}>
        <DonateButton source="mission-test" utmCampaign="mission-support">
          Support ValorWell
        </DonateButton>
      </MemoryRouter>,
    );

    const url = linkUrl("Support ValorWell");
    expect(url.pathname).toBe("/partner");
    expect(url.searchParams.get("vw_entry_source")).toBe("mission-test");
    expect(url.searchParams.get("vw_entry_medium")).toBe("site");
    expect(url.searchParams.get("vw_entry_campaign")).toBe("mission-support");
    expect(url.searchParams.has("utm_source")).toBe(false);
  });

  it("routes partner-page CTAs through an idempotent checkout handoff", () => {
    render(
      <MemoryRouter initialEntries={["/partner"]}>
        <DonateButton
          source="partner-test"
          utmCampaign="bridge-the-wait"
          utmContent="campaign-card"
        >
          Fund a Session
        </DonateButton>
      </MemoryRouter>,
    );

    const url = linkUrl("Fund a Session");
    expect(url.pathname).toBe("/donate");
    expect(url.searchParams.get("vw_checkout_source")).toBe("partner-test");
    expect(url.searchParams.get("vw_checkout_medium")).toBe("site");
    expect(url.searchParams.get("vw_checkout_campaign")).toBe("bridge-the-wait");
    expect(url.searchParams.get("vw_checkout_content")).toBe("campaign-card");
    expect(url.searchParams.get("vw_handoff_id")).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(url.searchParams.has("utm_source")).toBe(false);
  });
});
