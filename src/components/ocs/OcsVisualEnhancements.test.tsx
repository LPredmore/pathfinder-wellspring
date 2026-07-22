import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { OcsVisualEnhancements } from "./OcsVisualEnhancements";

function installLegacyOcsSections() {
  document.body.innerHTML = `
    <section id="ocs-legitimate-path">
      <div>
        <div>Path introduction</div>
        <ol data-testid="legacy-path"><li>Legacy path</li></ol>
        <div>Path conclusion</div>
      </div>
    </section>
    <section data-testid="system-section">
      <div>
        <div>System introduction</div>
        <div class="mt-12 grid" data-testid="legacy-system-cards"></div>
      </div>
    </section>
    <section id="ocs-regional-path">
      <div>
        <div>Region introduction</div>
        <div class="mt-10" data-orientation="vertical" data-testid="legacy-region-map"></div>
        <div>Region actions</div>
      </div>
    </section>
    <section id="ocs-existing-companies"></section>
    <section data-testid="comparison-section">
      <div>
        <div>Comparison introduction</div>
        <div class="mt-10 overflow-hidden" data-testid="legacy-comparison"></div>
      </div>
    </section>
    <section id="ocs-faq"></section>
  `;
}

describe("OCS visual enhancements", () => {
  beforeEach(installLegacyOcsSections);
  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("replaces the legacy six-card path with one connected visual journey", async () => {
    render(<OcsVisualEnhancements />);

    await waitFor(() => {
      expect(screen.getByText("One connected journey—not six disconnected transactions.")).toBeInTheDocument();
    });

    const legacyPath = document.querySelector('[data-testid="legacy-path"]') as HTMLElement;
    expect(legacyPath.style.display).toBe("none");
    expect(screen.getByText("Understand the claim")).toBeInTheDocument();
    expect(screen.getByText("Help assemble the evidence package")).toBeInTheDocument();
  });

  it("adds the system image placeholder without removing the credibility cards", async () => {
    render(<OcsVisualEnhancements />);

    await waitFor(() => {
      expect(document.querySelector('[data-image-placeholder="ocs-system-capacity"]')).toBeInTheDocument();
    });

    expect(screen.getByText("The operating system is built.")).toBeInTheDocument();
    const legacyCards = document.querySelector('[data-testid="legacy-system-cards"]') as HTMLElement;
    expect(legacyCards.style.display).not.toBe("none");
  });

  it("replaces the regional placeholder with the VA Community Care regional map", async () => {
    render(<OcsVisualEnhancements />);

    await waitFor(() => {
      expect(screen.getByText("Regional availability")).toBeInTheDocument();
    });

    const legacyRegionMap = document.querySelector('[data-testid="legacy-region-map"]') as HTMLElement;
    expect(legacyRegionMap.style.display).toBe("none");

    expect(
      screen.getByAltText(
        /VA Community Care regional map showing the five Veteran Community Care Network regions/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Veterans nationwide can sign up. Availability changes by state.")).toBeInTheDocument();
  });

  it("adds a two-lane visual before preserving the detailed comparison", async () => {
    render(<OcsVisualEnhancements />);

    await waitFor(() => {
      expect(screen.getByText("Care-connected OCS model")).toBeInTheDocument();
    });

    expect(screen.getByText("Transaction-first model")).toBeInTheDocument();
    expect(screen.getByText("Continued treatment and support")).toBeInTheDocument();
    expect(document.querySelector('[data-testid="legacy-comparison"]')).toBeInTheDocument();
  });
});
