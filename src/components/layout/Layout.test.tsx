import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Link, MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";

vi.mock("./Header", () => ({ Header: () => <header>Header</header> }));
vi.mock("./Footer", () => ({ Footer: () => <footer>Footer</footer> }));

const scrollToMock = vi.fn();

describe("Layout partner-page scrolling", () => {
  beforeEach(() => {
    scrollToMock.mockClear();
    vi.stubGlobal("scrollTo", scrollToMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("scrolls to the top whenever the partner page opens", () => {
    render(
      <MemoryRouter initialEntries={["/partner?utm_source=test"]}>
        <Layout>Partner content</Layout>
      </MemoryRouter>,
    );

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  it("scrolls to the top again for another partner navigation", async () => {
    render(
      <MemoryRouter initialEntries={["/partner?utm_source=first"]}>
        <Layout>
          <Link to="/partner?utm_source=second">Open partner again</Link>
        </Layout>
      </MemoryRouter>,
    );

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("link", { name: "Open partner again" }));

    await waitFor(() => expect(scrollToMock).toHaveBeenCalledTimes(2));
  });

  it("does not force scrolling on unrelated pages", () => {
    render(
      <MemoryRouter initialEntries={["/mission"]}>
        <Layout>Mission content</Layout>
      </MemoryRouter>,
    );

    expect(scrollToMock).not.toHaveBeenCalled();
  });
});
