import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Partner from "./Partner";

vi.mock("@/components/layout/Layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/SEO", () => ({
  SEO: () => null,
  BreadcrumbSchema: () => null,
}));

vi.mock("@/lib/tracking", () => ({
  trackHomeEvent: vi.fn(),
}));

function renderPartner() {
  return render(
    <MemoryRouter initialEntries={["/partner"]}>
      <Partner />
    </MemoryRouter>,
  );
}

describe("Partner organizational collaboration page", () => {
  afterEach(cleanup);

  it("leads with organizational collaboration rather than a donor campaign", () => {
    renderPartner();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /We do not need more logos around the mission/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("What Partnership Means Here")).toBeInTheDocument();
    expect(screen.getByText("Where Collaboration Can Fit")).toBeInTheDocument();
    expect(screen.queryByText("Bridge the Wait")).not.toBeInTheDocument();
  });

  it("routes the primary partnership actions to Contact and Impact", () => {
    renderPartner();

    expect(
      screen.getAllByRole("link", { name: /Start a Partnership Conversation/i })[0],
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: /See What ValorWell Can Verify/i }),
    ).toHaveAttribute("href", "/impact");
  });

  it("keeps financial support separate from partnership", () => {
    renderPartner();

    expect(screen.getByText("Partnership vs. Financial Support")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Support ValorWell/i }),
    ).toHaveAttribute("href", "/support");
    expect(screen.getByRole("link", { name: /Review Impact/i })).toHaveAttribute(
      "href",
      "/impact",
    );
  });

  it("routes into the current community architecture", () => {
    renderPartner();

    expect(
      screen.getByRole("link", { name: /Explore Beyond The Yellow/i }),
    ).toHaveAttribute("href", "/beyond-the-yellow");
    expect(screen.getByRole("link", { name: /Explore the Network/i })).toHaveAttribute(
      "href",
      "/network",
    );
    expect(screen.getByRole("link", { name: /Watch ValorWell/i })).toHaveAttribute(
      "href",
      "/watch",
    );
  });

  it("does not expose Operation Claims Success as a partnership route", () => {
    renderPartner();

    const links = screen.getAllByRole("link");
    expect(
      links.some((link) => link.getAttribute("href") === "/operation-claims-success"),
    ).toBe(false);
  });

  it("states the non-pay-to-play partnership boundaries", () => {
    renderPartner();

    expect(
      screen.getByText(/Financial support does not purchase a Beyond The Yellow feature/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A partner does not control clinician judgment/i),
    ).toBeInTheDocument();
  });
});
