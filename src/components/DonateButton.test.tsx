import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { DonateButton } from "./DonateButton";

describe("DonateButton routing", () => {
  afterEach(cleanup);

  it("routes donation CTAs outside the partner page to the partner journey", () => {
    render(
      <MemoryRouter initialEntries={["/mission"]}>
        <DonateButton source="mission-test" utmCampaign="mission-support">
          Support ValorWell
        </DonateButton>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Support ValorWell" })).toHaveAttribute(
      "href",
      "/partner?utm_source=mission-test&utm_medium=site&utm_campaign=mission-support",
    );
  });

  it("keeps partner-page campaign CTAs routed through the donate passthrough", () => {
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

    expect(screen.getByRole("link", { name: "Fund a Session" })).toHaveAttribute(
      "href",
      "/donate?utm_source=partner-test&utm_medium=site&utm_campaign=bridge-the-wait&utm_content=campaign-card",
    );
  });
});
