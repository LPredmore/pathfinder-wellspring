const DEFAULT_HEADER_HEIGHT = 64;
const SAFE_GAP = 16;
const SAFE_BOTTOM_GAP = 24;

export type PageScrollBehavior = ScrollBehavior;

function getHeaderOffset(): number {
  if (typeof document === "undefined") return DEFAULT_HEADER_HEIGHT + SAFE_GAP;
  const header = document.querySelector<HTMLElement>("header.sticky, header");
  const height = header?.getBoundingClientRect().height ?? DEFAULT_HEADER_HEIGHT;
  return Math.max(DEFAULT_HEADER_HEIGHT + SAFE_GAP, Math.ceil(height) + SAFE_GAP);
}

function getElementScrollMargin(element: HTMLElement): number {
  if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
    return 0;
  }
  const value = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop);
  return Number.isFinite(value) ? value : 0;
}

export function preferredPageScrollBehavior(): PageScrollBehavior {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "auto";
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollToPageElement(
  target: string | HTMLElement,
  behavior: PageScrollBehavior = preferredPageScrollBehavior(),
): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  const element =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!element) return false;

  const offset = Math.max(getHeaderOffset(), getElementScrollMargin(element));
  const top = Math.max(0, window.scrollY + element.getBoundingClientRect().top - offset);
  window.scrollTo({ top, left: 0, behavior });
  return true;
}

export function alignElementIfOutsideSafeViewport(element: HTMLElement): boolean {
  if (typeof window === "undefined") return false;
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const safeTop = Math.max(getHeaderOffset(), getElementScrollMargin(element));
  const safeBottom = Math.max(safeTop, window.innerHeight - SAFE_BOTTOM_GAP);
  const isFullyVisible = rect.top >= safeTop && rect.bottom <= safeBottom;

  if (isFullyVisible) return false;
  return scrollToPageElement(element, "auto");
}
