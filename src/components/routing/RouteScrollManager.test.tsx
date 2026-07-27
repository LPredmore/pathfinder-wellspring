import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { RouteScrollManager } from "./RouteScrollManager";

function NavigationControls() {
  const navigate = useNavigate();

  return (
    <>
      <button type="button" onClick={() => navigate("/mission")}>Mission</button>
      <button type="button" onClick={() => navigate("/mission#details")}>Mission details</button>
      <button type="button" onClick={() => navigate("/mission?source=test")}>Mission query</button>
      <button type="button" onClick={() => navigate("/partner#support")}>Partner support</button>
    </>
  );
}

function renderRouter(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <RouteScrollManager />
      <NavigationControls />
    </MemoryRouter>,
  );
}

describe("RouteScrollManager", () => {
  const scrollTo = vi.fn();

  beforeEach(() => {
    scrollTo.mockReset();
    vi.stubGlobal("scrollTo", scrollTo);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("resets initial non-anchor pages and every cross-page navigation to the top", () => {
    renderRouter("/");
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: "auto" });

    scrollTo.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Mission" }));
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: "auto" });

    scrollTo.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Partner support" }));
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("does not interfere with same-page hash or query navigation", () => {
    renderRouter("/mission");
    scrollTo.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "Mission details" }));
    fireEvent.click(screen.getByRole("button", { name: "Mission query" }));

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("preserves a direct initial anchor for later same-page anchor handling", () => {
    renderRouter("/mission#details");
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
