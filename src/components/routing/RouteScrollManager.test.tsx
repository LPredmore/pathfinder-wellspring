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
      <div id="details">Mission details target</div>
      <div id="support">Partner support target</div>
    </>
  );
}

function renderRouter(initialEntry: string, children?: React.ReactNode) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <RouteScrollManager />
      <NavigationControls />
      {children}
    </MemoryRouter>,
  );
}

describe("RouteScrollManager", () => {
  const scrollTo = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    scrollTo.mockReset();
    vi.stubGlobal("scrollTo", scrollTo);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("resets ordinary pages and aligns hash destinations", () => {
    renderRouter("/");
    expect(scrollTo).toHaveBeenCalledTimes(1);

    scrollTo.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Mission" }));
    expect(scrollTo).toHaveBeenCalledTimes(1);

    scrollTo.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Mission details" }));
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("does not move the viewport for a same-page query-only change", () => {
    renderRouter("/mission");
    scrollTo.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "Mission query" }));

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("moves BTY calls to action to the selected form", () => {
    renderRouter(
      "/beyondtheyellow",
      <section id="bty-guest-interest">
        <button type="button">Nominate Someone</button>
        <form aria-label="BTY form" />
      </section>,
    );
    scrollTo.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "Nominate Someone" }));
    vi.advanceTimersByTime(60);

    expect(scrollTo).toHaveBeenCalledTimes(1);
  });
});
