import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AboutPage from "./AboutPage";

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

function renderAbout() {
  return render(
    <MemoryRouter initialEntries={["/about"]}>
      <AboutPage />
    </MemoryRouter>,
  );
}

describe("About ValorWell page", () => {
  afterEach(cleanup);

  it("explains ValorWell through the Care, Impact, and Community architecture", () => {
    renderAbout();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /ValorWell is building better systems around mental well-being, care, and community action/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Care$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Impact$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Community$/i })).toBeInTheDocument();
  });

  it("publishes only the already established founder role", () => {
    renderAbout();

    expect(
      screen.getByRole("heading", {
        name: /Luke — Founder, ValorWell · Host, Beyond The Yellow/i,
      }),
    ).toBeInTheDocument();
  });

  it("routes visitors into the current public architecture", () => {
    renderAbout();

    expect(screen.getAllByRole("link", { name: /Why ValorWell Exists/i })[0]).toHaveAttribute(
      "href",
      "/mission",
    );
    expect(screen.getAllByRole("link", { name: /See Impact/i })[0]).toHaveAttribute(
      "href",
      "/impact",
    );
    expect(screen.getAllByRole("link", { name: /Find Care/i })[0]).toHaveAttribute(
      "href",
      "/get-care",
    );
    expect(screen.getAllByRole("link", { name: /Support ValorWell/i })[0]).toHaveAttribute(
      "href",
      "/support",
    );
    expect(screen.getAllByRole("link", { name: /Explore Beyond The Yellow/i })[0]).toHaveAttribute(
      "href",
      "/beyond-the-yellow",
    );
  });

  it("does not expose Operation Claims Success", () => {
    renderAbout();

    const links = screen.getAllByRole("link");
    expect(
      links.some((link) => link.getAttribute("href") === "/operation-claims-success"),
    ).toBe(false);
    expect(screen.queryByText(/Operation Claims Success/i)).not.toBeInTheDocument();
  });
});
