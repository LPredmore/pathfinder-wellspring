import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import PartnerPageBase from "./Partner";

type ElementProps = {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join(" ");
  }

  if (isValidElement(node)) {
    return getNodeText((node.props as ElementProps).children);
  }

  return "";
}

function TherapistHandoff() {
  return (
    <details className="group mt-8 max-w-xl border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-canvas)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-[color:var(--cl-evergreen)] marker:hidden">
        <span>I am a therapist interested in working with ValorWell</span>
        <span
          className="text-lg transition-transform group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <div className="border-t border-[color:var(--cl-evergreen)]/20 px-5 py-5">
        <p className="text-sm leading-relaxed text-[color:var(--cl-ink)]/75">
          Individual clinicians can review current opportunities and submit one
          clinician application on the recruiting page.
        </p>
        <Link
          to="/clinicians"
          className="mt-4 inline-flex items-center text-sm font-bold uppercase tracking-wide text-[color:var(--cl-ember)] hover:text-[color:var(--cl-ink)]"
        >
          View Clinician Opportunities →
        </Link>
      </div>
    </details>
  );
}

function transformPartnerNode(node: ReactNode): ReactNode {
  if (Array.isArray(node)) {
    return node.map(transformPartnerNode);
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement<ElementProps>;
  const props = element.props;
  const transformedElement =
    props.children === undefined
      ? element
      : cloneElement(
          element,
          undefined,
          Children.map(props.children, transformPartnerNode),
        );

  const isPrimaryPartnerCta =
    element.type === "div" &&
    props.className === "mt-10" &&
    getNodeText(props.children).includes("Tell Us What You're Building");

  if (!isPrimaryPartnerCta) {
    return transformedElement;
  }

  return (
    <Fragment key={String(element.key ?? "partner-therapist-handoff")}>
      {transformedElement}
      <TherapistHandoff />
    </Fragment>
  );
}

/**
 * Temporary wrapper retained for the existing Partner page until that page is
 * rebuilt. The Mission page now owns its pathways directly.
 */
export function PartnerPageWithClinicianHandoff() {
  return transformPartnerNode(PartnerPageBase());
}
