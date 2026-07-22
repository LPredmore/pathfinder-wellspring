import { useEffect, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import ccnRegionalMap from "@/assets/ccn-regional-map.jpg.asset.json";
import ocsSystemCapacity from "@/assets/ocs-system-capacity.png.asset.json";
import {
  ArrowDown,
  Check,
  ClipboardCheck,
  FileSearch,
  FileText,
  GitBranch,
  Network,
  Stethoscope,
  Users,
} from "lucide-react";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;

type PortalMounts = {
  path: HTMLElement | null;
  system: HTMLElement | null;
  regions: HTMLElement | null;
  comparison: HTMLElement | null;
};

const emptyMounts: PortalMounts = {
  path: null,
  system: null,
  regions: null,
  comparison: null,
};

const pathwaySteps: Array<{
  number: string;
  phase: string;
  title: string;
  body: string;
  icon: Icon;
}> = [
  {
    number: "01",
    phase: "Clarity",
    title: "Understand the claim",
    body: "Review current conditions and ratings, identify potentially overlooked direct or secondary conditions, explain rating criteria, and identify missing evidence.",
    icon: FileSearch,
  },
  {
    number: "02",
    phase: "Clarity",
    title: "Find the available care path",
    body: "ValorWell checks the veteran's state and current availability, then determines whether care can be provided directly or through an eligible outside mental-health provider.",
    icon: Compass,
  },
  {
    number: "03",
    phase: "Care + clinical understanding",
    title: "Build clinical understanding",
    body: "Treatment creates longitudinal context for veterans with no diagnosis, limited prior care, or an extensive treatment history.",
    icon: Stethoscope,
  },
  {
    number: "04",
    phase: "Care + clinical understanding",
    title: "Examine every legitimate connection",
    body: "Consider direct connection, secondary connection, aggravation, delayed recognition, lay evidence, and credible explanations for missing military records.",
    icon: GitBranch,
  },
  {
    number: "05",
    phase: "Documentation + evidence",
    title: "Prepare the documentation",
    body: "When clinically appropriate, complete DBQs, prepare Nexus opinions, review records, and provide follow-up or appeal-related responses.",
    icon: ClipboardCheck,
  },
  {
    number: "06",
    phase: "Documentation + evidence",
    title: "Help assemble the evidence package",
    body: "Organize the medical support for a well-supported claim while the veteran or chosen representative remains responsible for filing and management.",
    icon: FileText,
  },
];


const transactionLane = [
  "Desired rating or document",
  "One-time evaluation",
  "Purchased deliverable",
  "Document delivered",
  "Relationship ends",
];

const careLane = [
  "Veteran's condition and history",
  "Evaluation and real care",
  "Longitudinal clinical understanding",
  "Evidence and responsible documentation",
  "Continued treatment and support",
];

function createMount(
  anchor: Element | null,
  name: keyof PortalMounts,
  options: { hideAnchor?: boolean } = {},
) {
  if (!(anchor instanceof HTMLElement) || !anchor.parentElement) return null;

  const host = document.createElement("div");
  host.dataset.ocsVisualMount = name;
  anchor.parentElement.insertBefore(host, anchor);

  const previousDisplay = anchor.style.display;
  if (options.hideAnchor) anchor.style.display = "none";

  return {
    host,
    cleanup: () => {
      if (options.hideAnchor) anchor.style.display = previousDisplay;
      host.remove();
    },
  };
}

function ConnectedPathway() {
  return (
    <div className="mt-12" data-ocs-visual="connected-pathway">
      <div className="grid gap-3 rounded-2xl border border-[#3B5147]/15 bg-white p-4 sm:grid-cols-3 sm:p-5">
        {[
          ["01–02", "Clarity"],
          ["03–04", "Care + clinical understanding"],
          ["05–06", "Documentation + evidence"],
        ].map(([range, phase]) => (
          <div key={phase} className="rounded-xl bg-[#F4F1E8] px-4 py-3 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3B5147]/55">
              Steps {range}
            </p>
            <p className="mt-1 font-bold text-[#3B5147]">{phase}</p>
          </div>
        ))}
      </div>

      <ol className="relative mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="pointer-events-none absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-[#3B5147]/20 md:block lg:left-0 lg:top-9 lg:h-px lg:w-full"
          aria-hidden
        />
        {pathwaySteps.map(({ number, phase, title, body, icon: Icon }) => (
          <li
            key={number}
            className="relative rounded-2xl border border-[#3B5147]/15 bg-white p-6 shadow-[0_12px_40px_-32px_rgba(17,24,20,0.45)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B5147] text-sm font-extrabold text-white ring-8 ring-[#F4F1E8]">
                {number}
              </div>
              <Icon className="h-6 w-6 text-[#D7A92E]" aria-hidden />
            </div>
            <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3B5147]/55">
              {phase}
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#111814]">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#111814]/70">{body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex items-center justify-center gap-3 text-sm font-bold text-[#3B5147]">
        <Check className="h-5 w-5 text-[#D7A92E]" aria-hidden />
        One connected journey—not six disconnected transactions.
      </div>
    </div>
  );
}

function SystemCapacityPlaceholder() {
  return (
    <div className="mt-12" data-ocs-visual="system-capacity">
      <img
        src={ocsSystemCapacity.url}
        alt="Cinematic visualization of the Operation Claims Success operating system: a working command center overlooking a connected national care network at sunset."
        className="h-auto w-full rounded-2xl border border-white/10"
      />
    </div>
  );
}

function RegionalExplorer() {
  return (
    <div className="mt-10" data-ocs-visual="regional-explorer">
      <div className="rounded-2xl border border-[#3B5147]/15 bg-[#F4F1E8] p-5 sm:p-7">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3B5147]/55">
            Regional availability
          </p>
          <h3 className="mt-3 text-2xl font-bold text-[#111814]">
            Veterans nationwide can sign up. Availability changes by state.
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#111814]/65">
            The regional map helps explain the broader VA Community Care environment. It does not
            determine whether a specific clinician is available today. ValorWell checks the
            current path after the veteran signs up.
          </p>
        </div>

        <div className="mt-7">
          <img
            src={ccnRegionalMap.url}
            alt="VA Community Care regional map showing the five Veteran Community Care Network regions managed by Optum Serve and TriWest Healthcare Alliance."
            className="h-auto w-full rounded-2xl border border-[#3B5147]/15 bg-white"
          />
        </div>
      </div>
    </div>
  );
}

function Lane({
  title,
  eyebrow,
  steps,
  positive,
}: {
  title: string;
  eyebrow: string;
  steps: string[];
  positive?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${positive ? "border-[#3B5147]/25 bg-[#3B5147] text-white" : "border-[#B24A3A]/20 bg-[#F4F1E8]"}`}>
      <p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${positive ? "text-[#D7A92E]" : "text-[#B24A3A]"}`}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      <ol className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <li key={step}>
            <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${positive ? "border-white/10 bg-white/[0.055]" : "border-[#3B5147]/12 bg-white"}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${positive ? "bg-[#D7A92E] text-[#111814]" : "bg-[#B24A3A]/10 text-[#B24A3A]"}`}>
                {index + 1}
              </span>
              <span className={`text-sm font-semibold ${positive ? "text-white/88" : "text-[#111814]/76"}`}>{step}</span>
            </div>
            {index < steps.length - 1 && (
              <ArrowDown className={`mx-auto my-1 h-4 w-4 ${positive ? "text-[#D7A92E]/70" : "text-[#B24A3A]/45"}`} aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ModelComparisonVisual() {
  return (
    <div className="mt-10" data-ocs-visual="model-comparison">
      <div className="grid gap-5 lg:grid-cols-2">
        <Lane eyebrow="A deliverable ends the relationship" title="Transaction-first model" steps={transactionLane} />
        <Lane eyebrow="The veteran remains at the center" title="Care-connected OCS model" steps={careLane} positive />
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-[#111814]/62">
        The detailed comparison below preserves the important clinical, financial, and ethical
        distinctions behind these two pathways.
      </p>
    </div>
  );
}

export function OcsVisualEnhancements() {
  const [mounts, setMounts] = useState<PortalMounts>(emptyMounts);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const nextMounts: PortalMounts = { ...emptyMounts };

    const pathSection = document.getElementById("ocs-legitimate-path");
    const pathList = pathSection?.querySelector("ol") ?? null;
    const pathMount = createMount(pathList, "path", { hideAnchor: true });
    if (pathMount) {
      nextMounts.path = pathMount.host;
      cleanups.push(pathMount.cleanup);
    }

    const systemSection = pathSection?.nextElementSibling ?? null;
    const systemCards = systemSection?.querySelector(".mt-12.grid") ?? null;
    const systemMount = createMount(systemCards, "system");
    if (systemMount) {
      nextMounts.system = systemMount.host;
      cleanups.push(systemMount.cleanup);
    }

    const regionSection = document.getElementById("ocs-regional-path");
    const legacyRegionAccordion =
      regionSection?.querySelector('[data-orientation="vertical"]') ??
      regionSection?.querySelector(".mt-10") ??
      null;
    const regionMount = createMount(legacyRegionAccordion, "regions", { hideAnchor: true });
    if (regionMount) {
      nextMounts.regions = regionMount.host;
      cleanups.push(regionMount.cleanup);
    }

    const companiesSection = document.getElementById("ocs-existing-companies");
    const comparisonSection = companiesSection?.nextElementSibling ?? null;
    const comparisonTable = comparisonSection?.querySelector(".mt-10.overflow-hidden") ?? null;
    const comparisonMount = createMount(comparisonTable, "comparison");
    if (comparisonMount) {
      nextMounts.comparison = comparisonMount.host;
      cleanups.push(comparisonMount.cleanup);
    }

    setMounts(nextMounts);

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      {mounts.path && createPortal(<ConnectedPathway />, mounts.path)}
      {mounts.system && createPortal(<SystemCapacityPlaceholder />, mounts.system)}
      {mounts.regions && createPortal(<RegionalExplorer />, mounts.regions)}
      {mounts.comparison && createPortal(<ModelComparisonVisual />, mounts.comparison)}
    </>
  );
}
