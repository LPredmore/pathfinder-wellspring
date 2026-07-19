import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MissionPageBase from "./MissionPage";
import PartnerPageBase from "./Partner";
import { trackHomeEvent } from "@/lib/tracking";

type ElementProps = {
  children?: ReactNode;
  className?: string;
  to?: string;
  [key: string]: unknown;
};

const buildWithUsOptions = [
  {
    label: "I am a clinician wanting to work with ValorWell",
    href: "/clinicians",
    event: "mission_lane_build_clinician",
  },
  {
    label: "I want to partner with or support ValorWell",
    href: "/partner",
    event: "mission_lane_build_partner",
  },
  {
    label: "I want to show my Beyond The Yellow mission",
    href: "/beyondtheyellow",
    event: "mission_lane_build_bty",
  },
] as const;

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

function BuildWithUsMenu() {
  return (
    <div className="group relative z-20">
      <button
        type="button"
        aria-haspopup="menu"
        aria-label="Choose how you want to build with ValorWell"
        className="lane-card block h-full w-full rounded-lg border-2 border-[hsl(var(--mission-ink))]/15 bg-[hsl(var(--mission-paper))]/60 p-8 text-left"
      >
        <h3 className="text-2xl font-bold text-[hsl(var(--mission-ink))]">
          Build With Us
        </h3>
        <p className="mt-4 text-[hsl(var(--mission-ink))]/75">
          Clinicians, partners, supporters, sponsors, and mission-builders — choose
          your path.
        </p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--mission-forest))]">
          Choose a Path <ArrowRight className="h-4 w-4" />
        </span>
      </button>

      <div
        role="menu"
        aria-label="Build with ValorWell pathways"
        className="invisible pointer-events-none absolute left-0 right-0 top-full z-30 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      >
        <div className="overflow-hidden rounded-lg border-2 border-[hsl(var(--mission-forest))] bg-[hsl(var(--mission-paper))] shadow-xl">
          {buildWithUsOptions.map((option) => (
            <Link
              key={option.href}
              to={option.href}
              role="menuitem"
              onClick={() =>
                trackHomeEvent(option.event, {
                  page: "mission",
                })
              }
              className="flex items-center justify-between gap-4 border-b border-[hsl(var(--mission-ink))]/10 px-5 py-4 text-sm font-bold text-[hsl(var(--mission-ink))] last:border-b-0 hover:bg-[hsl(var(--mission-gold))]/20 focus:bg-[hsl(var(--mission-gold))]/20 focus:outline-none"
            >
              <span>{option.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[hsl(var(--mission-forest))]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
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

function transformMissionNode(node: ReactNode): ReactNode {
  if (Array.isArray(node)) {
    return node.map(transformMissionNode);
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement<ElementProps>;
  const props = element.props;
  const isBuildWithUsCard =
    props.to === "/partner" &&
    typeof props.className === "string" &&
    props.className.includes("lane-card") &&
    getNodeText(props.children).includes("Build With Us");

  if (isBuildWithUsCard) {
    return <BuildWithUsMenu key={String(element.key ?? "build-with-us")} />;
  }

  if (props.children === undefined) {
    return element;
  }

  return cloneElement(
    element,
    undefined,
    Children.map(props.children, transformMissionNode),
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
 * These wrappers keep the established page layouts intact while consolidating
 * individual clinician traffic at /clinicians. They can be removed when the
 * underlying Mission and Partner pages receive their planned full rebuilds.
 */
export function MissionPageWithPathways() {
  return transformMissionNode(MissionPageBase());
}

export function PartnerPageWithClinicianHandoff() {
  return transformPartnerNode(PartnerPageBase());
}
