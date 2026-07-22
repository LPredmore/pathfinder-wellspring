import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OcsIndustryCopyEnhancements } from "./OcsIndustryCopyEnhancements";

const dialogs = [
  ["VA Accredited Attorneys", "Original attorney copy"],
  ["Ratings Coaching Companies", "Original coaching copy"],
  ["Nexus Letter Factories", "Original Nexus copy"],
] as const;

function appendDialog(title: string, originalBody: string) {
  const dialog = document.createElement("div");
  dialog.setAttribute("role", "dialog");
  dialog.dataset.testIndustryDialog = title;

  const header = document.createElement("div");
  const heading = document.createElement("h2");
  heading.textContent = title;
  header.appendChild(heading);

  const body = document.createElement("div");
  body.dataset.testid = `legacy-${title}`;
  const paragraph = document.createElement("p");
  paragraph.textContent = originalBody;
  body.appendChild(paragraph);

  dialog.append(header, body);
  document.body.appendChild(dialog);

  return { dialog, body };
}

describe("OcsIndustryCopyEnhancements", () => {
  afterEach(() => {
    cleanup();
    document.querySelectorAll("[data-test-industry-dialog]").forEach((element) => element.remove());
  });

  it("replaces dialog copy when the industry modal mounts", async () => {
    render(<OcsIndustryCopyEnhancements />);

    const mountedDialogs = dialogs.map(([title, originalBody]) =>
      appendDialog(title, originalBody),
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "The veteran lives with the consequences while the backpay meter keeps running.",
        ),
      ).toBeInTheDocument();
      expect(screen.getByText("That is not advocacy. It is ratings engineering.")).toBeInTheDocument();
      expect(
        screen.getByText("That is not a continuum of care. It is a document supply chain."),
      ).toBeInTheDocument();
    });

    for (const { body } of mountedDialogs) {
      expect(body).toHaveStyle({ display: "none" });
    }

    expect(
      screen.getByText(
        "A clinician who disappears after selling the letter was never responsible for the veteran—only the transaction.",
      ),
    ).toBeInTheDocument();
  });

  it("handles dialogs that are already mounted", async () => {
    const { body } = appendDialog("VA Accredited Attorneys", "Original attorney copy");

    render(<OcsIndustryCopyEnhancements />);

    await waitFor(() => {
      expect(body).toHaveStyle({ display: "none" });
      expect(
        screen.getByText(
          "The veteran lives with the consequences while the backpay meter keeps running.",
        ),
      ).toBeInTheDocument();
    });
  });
});
