import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OcsIndustryCopyEnhancements } from "./OcsIndustryCopyEnhancements";

const originalSections = [
  ["Back-pay attorneys and accredited agents", "Original attorney copy"],
  ["Rating-increase and claims-strategy companies", "Original coaching copy"],
  ["DBQ and Nexus-letter factories", "Original Nexus copy"],
] as const;

function LegacyIndustryAccordions() {
  return (
    <div>
      {originalSections.map(([title, body]) => (
        <div key={title} data-testid={`item-${title}`}>
          <div>
            <button type="button">{title}</button>
          </div>
          <div role="region">
            <div data-testid={`legacy-${title}`}>{body}</div>
          </div>
        </div>
      ))}
      <OcsIndustryCopyEnhancements />
    </div>
  );
}

describe("OcsIndustryCopyEnhancements", () => {
  afterEach(cleanup);

  it("replaces all three legacy accordion titles", () => {
    render(<LegacyIndustryAccordions />);

    expect(screen.getByRole("button", { name: "VA Accredited Attorneys" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ratings Coaching Companies" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Nexus Letter Factories" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Back-pay attorneys and accredited agents" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Rating-increase and claims-strategy companies" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "DBQ and Nexus-letter factories" }),
    ).not.toBeInTheDocument();
  });

  it("hides the legacy bodies and mounts the approved replacement copy", () => {
    render(<LegacyIndustryAccordions />);

    for (const [title] of originalSections) {
      expect(screen.getByTestId(`legacy-${title}`)).toHaveStyle({ display: "none" });
    }

    expect(
      screen.getByText("The veteran lives with the consequences while the backpay meter keeps running."),
    ).toBeInTheDocument();
    expect(screen.getByText("That is not advocacy. It is ratings engineering.")).toBeInTheDocument();
    expect(
      screen.getByText("That is not a continuum of care. It is a document supply chain."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A clinician who disappears after selling the letter was never responsible for the veteran—only the transaction.",
      ),
    ).toBeInTheDocument();
  });
});
