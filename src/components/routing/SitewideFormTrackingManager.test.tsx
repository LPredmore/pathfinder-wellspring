import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { SitewideFormTrackingManager } from "./SitewideFormTrackingManager";
import {
  PUBLIC_FORMS,
  clearTrackedFormSubmissionsForTests,
} from "@/lib/sitewideFormTracking";

describe("SitewideFormTrackingManager", () => {
  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
    delete window.gtag;
    clearTrackedFormSubmissionsForTests();
    vi.restoreAllMocks();
  });

  it("normalizes a form mounted after the route renders", async () => {
    render(
      <MemoryRouter initialEntries={["/beyondtheyellow"]}>
        <SitewideFormTrackingManager />
      </MemoryRouter>,
    );

    const form = document.createElement("form");
    form.innerHTML = '<input id="nominee-first" />';
    document.body.append(form);

    await waitFor(() => {
      expect(form.id).toBe(PUBLIC_FORMS.btyNomination.id);
      expect(form.name).toBe(PUBLIC_FORMS.btyNomination.name);
    });
  });

  it("does not track a status while the submitted form remains mounted", async () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(
      <MemoryRouter initialEntries={["/clinicians"]}>
        <SitewideFormTrackingManager />
      </MemoryRouter>,
    );

    const container = document.createElement("div");
    const form = document.createElement("form");
    form.innerHTML = '<input id="overflow-practice-name" />';
    container.append(form);
    document.body.append(container);

    await waitFor(() =>
      expect(form.id).toBe(PUBLIC_FORMS.overflowReferral.id),
    );

    fireEvent.submit(form);
    const status = document.createElement("div");
    status.setAttribute("role", "status");
    status.textContent = "The request could not be completed.";
    container.append(status);

    await waitFor(() => expect(status).toBeInTheDocument());
    expect(gtag).not.toHaveBeenCalled();
  });

  it("tracks the overflow form only after its confirmed status replaces it", async () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(
      <MemoryRouter initialEntries={["/clinicians"]}>
        <SitewideFormTrackingManager />
      </MemoryRouter>,
    );

    const container = document.createElement("div");
    const form = document.createElement("form");
    form.innerHTML = '<input id="overflow-practice-name" />';
    container.append(form);
    document.body.append(container);

    await waitFor(() =>
      expect(form.id).toBe(PUBLIC_FORMS.overflowReferral.id),
    );

    fireEvent.submit(form);
    expect(gtag).not.toHaveBeenCalled();

    form.remove();
    const status = document.createElement("div");
    status.setAttribute("role", "status");
    status.textContent = "Your practice has been added.";
    container.append(status);

    await waitFor(() => expect(gtag).toHaveBeenCalledTimes(2));
    expect(gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      "vw_form_success",
      expect.objectContaining({
        form_id: PUBLIC_FORMS.overflowReferral.id,
        form_name: PUBLIC_FORMS.overflowReferral.name,
      }),
    );
  });
});
