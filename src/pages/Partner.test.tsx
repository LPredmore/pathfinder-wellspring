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

describe("Partner donor journey", () => {
  afterEach(() => cleanup());

  it("opens with an early tracked donation action", () => {
    render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /next word should not be/i,
      }),
    ).toBeInTheDocument();

    const heroDonation = screen.getByRole("link", {
      name: "Help Keep the Bridge Open",
    });
    expect(heroDonation).toHaveAttribute(
      "href",
      "/donate?utm_source=partner-hero&utm_medium=site&utm_campaign=bridge-the-wait",
    );
  });

  it("routes every donation campaign through the tracked donate passthrough", () => {
    render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

    const donationLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/donate?"));

    expect(donationLinks.length).toBeGreaterThanOrEqual(6);
    for (const link of donationLinks) {
      expect(link.getAttribute("href")).toContain("utm_source=");
      expect(link.getAttribute("href")).toContain("utm_medium=site");
      expect(link.getAttribute("href")).toContain("utm_campaign=");
    }
  });

  it("uses a concise agreement-to-action sequence with reserved image spaces", () => {
    const { container } = render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

    expect(screen.getByText("Asking for help should lead to help.")).toBeInTheDocument();
    expect(
      screen.getByText(/Do you believe asking for help should lead somewhere/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Bridge the Wait")).toBeInTheDocument();
    expect(screen.getByText("Keep the Bridge Open")).toBeInTheDocument();
    expect(
      screen.getByText(/Your contribution helps move the mission/i),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("[data-image-placeholder]")).toHaveLength(2);
  });

  it("keeps organizational partnerships as a secondary handoff", () => {
    render(
      <MemoryRouter>
        <Partner />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Represent an organization that wants to work with ValorWell/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/The right partnership should make both missions harder to ignore/i),
    ).not.toBeInTheDocument();
  });
});
