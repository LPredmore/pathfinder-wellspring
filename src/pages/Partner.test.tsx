import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Partner from "./Partner";

vi.mock("@/components/layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/SEO", () => ({
  SEO: () => null,
  BreadcrumbSchema: () => null,
}));

function renderPartner() {
  return render(
    <MemoryRouter initialEntries={["/partner"]}>
      <Partner />
    </MemoryRouter>,
  );
}

function checkoutUrl(name: string) {
  const href = screen.getByRole("link", { name }).getAttribute("href");
  expect(href).toBeTruthy();
  const url = new URL(href!, "https://valorwell.org");
  expect(url.pathname).toBe("/donate");
  expect(url.searchParams.get("vw_handoff_id")).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  return url;
}

describe("Partner support mission page", () => {
  afterEach(cleanup);

  it("leads with the donor case for support", () => {
    renderPartner();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /When a veteran finally says, “I’m ready for help,”/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Asking for help should lead to help.")).toBeInTheDocument();
    expect(screen.getByText("Bridge the Wait")).toBeInTheDocument();
  });

  it("routes donor CTAs through the tracked donate passthrough", () => {
    renderPartner();

    const heroCta = checkoutUrl("Help Keep the Bridge Open");
    expect(heroCta.searchParams.get("vw_checkout_source")).toBe("partner-hero");
    expect(heroCta.searchParams.get("vw_checkout_medium")).toBe("site");
    expect(heroCta.searchParams.get("vw_checkout_campaign")).toBe("bridge-the-wait");
    expect(heroCta.searchParams.get("vw_checkout_content")).toBe("hero");

    const monthlyCta = checkoutUrl("Become a Monthly Supporter");
    expect(monthlyCta.searchParams.get("vw_checkout_source")).toBe("partner-campaign-monthly");
    expect(monthlyCta.searchParams.get("vw_checkout_campaign")).toBe("monthly-support");
    expect(monthlyCta.searchParams.get("vw_checkout_content")).toBe("campaign-card");
  });

  it("keeps organizational collaboration secondary", () => {
    renderPartner();

    expect(
      screen.getByText("Represent an organization that wants to work with ValorWell?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore BTY/i })).toHaveAttribute(
      "href",
      "/beyondtheyellow",
    );
    expect(screen.queryByText(/Tell Us What You're Building/i)).not.toBeInTheDocument();
  });

  it("renders the three approved campaign visuals", () => {
    renderPartner();

    expect(
      screen.getByAltText(/crane lowers the final section of a bridge/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/person stands before a wall of fragmented panels/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/person walks a warmly lit stone pathway/i),
    ).toBeInTheDocument();
  });
});
