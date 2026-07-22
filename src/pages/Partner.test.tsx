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

describe("Partner support mission page", () => {
  afterEach(cleanup);

  it("leads with the donor case for support", () => {
    render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

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
    render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

    const heroCta = screen.getByRole("link", {
      name: "Help Keep the Bridge Open",
    });
    expect(heroCta).toHaveAttribute(
      "href",
      "/donate?utm_source=partner-hero&utm_medium=site&utm_campaign=bridge-the-wait&utm_content=hero",
    );

    const monthlyCta = screen.getByRole("link", {
      name: "Become a Monthly Supporter",
    });
    expect(monthlyCta).toHaveAttribute(
      "href",
      "/donate?utm_source=partner-campaign-monthly&utm_medium=site&utm_campaign=monthly-support&utm_content=campaign-card",
    );
  });

  it("keeps organizational collaboration secondary", () => {
    render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

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
    render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

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
