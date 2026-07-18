import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Replaces only the form inside an existing page section while preserving all
 * surrounding approved page content. This is temporary migration scaffolding
 * until the legacy page files are fully refactored.
 */
export function LegacyFormPortal({
  targetId,
  children,
}: {
  targetId: string;
  children: ReactNode;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const section = document.getElementById(targetId);
    if (!section) return;

    const legacyForm = section.querySelector("form") as HTMLElement | null;
    const firstContentContainer = section.firstElementChild as HTMLElement | null;
    const formContainer = legacyForm?.parentElement ?? firstContentContainer ?? section;
    const previousDisplay = legacyForm?.style.display ?? "";
    if (legacyForm) legacyForm.style.display = "none";

    const host = document.createElement("div");
    host.dataset.billingHubIntake = targetId;
    formContainer.appendChild(host);
    setTarget(host);

    return () => {
      setTarget(null);
      host.remove();
      if (legacyForm) legacyForm.style.display = previousDisplay;
    };
  }, [targetId]);

  return target ? createPortal(children, target) : null;
}
