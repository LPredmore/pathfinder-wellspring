import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CircleHelp,
  ClipboardCheck,
  Compass,
  DollarSign,
  FileText,
  HeartHandshake,
  Map,
  Network,
  Scale,
  ShieldCheck,
  Stethoscope,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackHomeEvent } from "@/lib/tracking";

const FORM_ANCHOR = "ocs-routing-form";
const SOLUTION_ANCHOR = "ocs-legitimate-path";
const REGIONS_ANCHOR = "ocs-regional-path";
const COMPANIES_ANCHOR = "ocs-existing-companies";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "operation-claims-success", ...params });

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
};

function Eyebrow({
  children,
  tone = "evergreen",
}: {
  children: ReactNode;
  tone?: "evergreen" | "ember" | "yellow" | "light";
}) {
  const className =
    tone === "ember"
      ? "text-[#B24A3A]"
      : tone === "yellow"
        ? "text-[#D7A92E]"
        : tone === "light"
          ? "text-white/70"
          : "text-[#3B5147]";

  return <p className={`text-xs font-bold uppercase tracking-[0.22em] ${className}`}>{children}</p>;
}

function SectionHeading({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl ${
        light ? "text-white" : "text-[#111814]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

function ImagePlaceholder({
  title,
  description,
  aspect = "video",
  dark = false,
}: {
  title: string;
  description: string;
  aspect?: "video" | "wide" | "portrait";
  dark?: boolean;
}) {
  const aspectClass = aspect === "portrait" ? "aspect-[4/5]" : aspect === "wide" ? "aspect-[2/1]" : "aspect-video";

  return (
    <div
      role="img"
      aria-label={`${title}. ${description}`}
      className={`${aspectClass} flex w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center ${
        dark
          ? "border-white/25 bg-white/[0.06] text-white"
          : "border-[#3B5147]/25 bg-[#F4F1E8] text-[#111814]"
      }`}
    >
      <div className="max-w-md">
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
            dark ? "bg-white/10 text-[#D7A92E]" : "bg-[#3B5147]/10 text-[#3B5147]"
          }`}
        >
          <FileText className="h-6 w-6" aria-hidden />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] opacity-70">Image placeholder</p>
        <p className="mt-2 text-lg font-bold">{title}</p>
        <p className="mt-2 text-sm opacity-70">{description}</p>
      </div>
    </div>
  );
}

function Guardrail({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "warn" }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border-l-4 px-5 py-4 text-sm leading-relaxed md:text-base ${
        tone === "warn"
          ? "border-[#B24A3A] bg-[#B24A3A]/5 text-[#111814]"
          : "border-[#3B5147] bg-[#F4F1E8] text-[#111814]"
      }`}
    >
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#3B5147]" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

function IconCard({
  icon: Icon,
  title,
  children,
  dark = false,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        dark ? "border-white/10 bg-white/[0.05] text-white" : "border-[#3B5147]/15 bg-white text-[#111814]"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          dark ? "bg-[#D7A92E]/15 text-[#D7A92E]" : "bg-[#3B5147]/10 text-[#3B5147]"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <div className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/72" : "text-[#111814]/72"}`}>{children}</div>
    </div>
  );
}

const disconnectedSystems = [
  {
    icon: Stethoscope,
    title: "Mental health care",
    body: "Evaluation, treatment, continuity, and a clinician who actually understands the veteran over time.",
  },
  {
    icon: Compass,
    title: "VA Community Care",
    body: "Eligibility, referral, authorization, network participation, clinician registration, and state-specific availability.",
  },
  {
    icon: ClipboardCheck,
    title: "Clinical documentation",
    body: "Medical evidence, independent clinical judgment, causation analysis, and documentation that reflects what is supportable.",
  },
  {
    icon: Scale,
    title: "VA adjudication",
    body: "C&P examinations, evidence review, service-connection decisions, ratings, appeals, and final VA authority.",
  },
];

const legitimatePath = [
  {
    number: "01",
    title: "Understand the legitimate options",
    body: "Give veterans clear education about the pathways that may actually apply without pretending ValorWell controls VA decisions.",
  },
  {
    number: "02",
    title: "Reach a real clinician",
    body: "Connect the veteran with a licensed, mission-aligned clinician when an authorized or separately funded care path and actual capacity exist.",
  },
  {
    number: "03",
    title: "Build real clinical understanding",
    body: "Let treatment create the longitudinal context that one appointment, one form, or one purchased opinion cannot replace.",
  },
  {
    number: "04",
    title: "Document what is clinically supportable",
    body: "When appropriate, the clinician independently determines what the history, evidence, treatment record, and clinical judgment support.",
  },
  {
    number: "05",
    title: "Continue the care and defend the record",
    body: "The relationship does not end when a document is produced. Continued care preserves the clinical record when the VA reaches a different conclusion.",
  },
];

const buildStatus = [
  {
    icon: Building2,
    status: "BUILT",
    title: "Clinical operating infrastructure",
    body: "Telehealth care delivery, clinician workflows, scheduling, documentation, billing, and the systems needed to operate real treatment relationships.",
  },
  {
    icon: FileText,
    status: "BUILT",
    title: "Care-connected documentation capability",
    body: "Internal clinical and technical infrastructure that can support Nexus-related documentation when the clinician determines it is appropriate.",
  },
  {
    icon: Network,
    status: "EXECUTABLE",
    title: "Regions 1–3 registration pathway",
    body: "ValorWell's organization-level setup is far enough along to begin registering qualified clinicians one by one through the current VACCN process.",
  },
  {
    icon: Users,
    status: "SCALING NOW",
    title: "Nationwide clinician capacity",
    body: "The largest missing piece is enough licensed clinicians in enough states to turn the infrastructure into broad veteran access.",
  },
];

const comparisonRows = [
  ["The desired outcome starts the process", "The veteran's clinical need starts the process"],
  ["The document or rating increase is the product", "Care and clinical truth are the foundation"],
  ["One-time encounter", "Longitudinal clinical context"],
  ["The conclusion is marketed in advance", "The clinician independently decides"],
  ["Revenue may grow with back pay or rating increase", "Clinician compensation is tied to care delivered"],
  ["The relationship often ends after delivery", "Treatment and support can continue"],
  ["The veteran carries the downstream risk", "The model is designed to protect the veteran and clinician"],
];

const generalFaqs = [
  {
    value: "community-care",
    question: "What is VA Community Care?",
    preview: "A VA-authorized pathway for eligible veterans to receive care from participating community providers.",
    answer: (
      <div className="space-y-4">
        <p>
          VA Community Care is not a private insurance plan and it is not a provider choosing to bill the VA. The VA must determine
          that the veteran and requested service qualify for community care, issue the appropriate referral or authorization, and use
          a participating, properly registered provider.
        </p>
        <p>
          Provider readiness also matters. An organization may have completed part of the network process while an individual clinician
          still needs registration, state licensure, readiness evidence, availability, and an appropriate authorization.
        </p>
      </div>
    ),
  },
  {
    value: "staff-confusion",
    question: "Why is the Community Care referral process so difficult?",
    preview: "The process contains multiple handoffs, regional contractors, local VA procedures, and provider-registration requirements.",
    answer: (
      <div className="space-y-4">
        <p>
          The VACCN referral process is complicated even for many of the people responsible for administering it. Veterans may receive
          conflicting explanations, referrals may stall between offices, and the veteran may not know who owns the next action.
        </p>
        <p>
          Operation Claims Success will not pretend that asking the right question guarantees approval. It will help make the questions,
          responsibilities, regional differences, and current ValorWell availability understandable.
        </p>
      </div>
    ),
  },
  {
    value: "choose-valorwell",
    question: "Can a veteran ask the VA to send them to ValorWell?",
    preview: "A veteran may ask about a specific participating provider, but the request does not create authorization.",
    answer: (
      <p>
        A veteran may ask the VA care team whether Community Care is available and whether a specific participating provider can be
        requested. The VA controls eligibility, referral, and authorization. ValorWell can accept the care only when the veteran's
        authorization, state, clinician registration, capacity, and clinical fit align.
      </p>
    ),
  },
  {
    value: "nexus-service",
    question: "Is Operation Claims Success a Nexus Letter company?",
    preview: "No. Documentation is one care-connected layer inside a much larger veteran-care system.",
    answer: (
      <div className="space-y-4">
        <p>
          ValorWell has built infrastructure to support clinicians with Nexus-related documentation. But the public product is not a
          letter and the veteran cannot purchase a predetermined conclusion.
        </p>
        <p>
          A clinician may support the medical relationship to service, decline to support it, determine the evidence is insufficient,
          or require more care and context. The VA—not the clinician or ValorWell—makes the final service-connection and rating decision.
        </p>
      </div>
    ),
  },
  {
    value: "every-letter",
    question: "Will every veteran in care receive supporting documentation?",
    preview: "No. A request does not determine the clinical conclusion.",
    answer: (
      <p>
        Documentation is considered when clinically appropriate. Free does not mean automatic. Treatment does not guarantee service
        connection. The veteran's preferred outcome, a donor, a sponsor, the software, or ValorWell leadership cannot override the
        clinician's independent judgment.
      </p>
    ),
  },
  {
    value: "appeals",
    question: "What happens when the VA disagrees with the treating record?",
    preview: "Continued care creates evidence that can respond to a one-time examination or incomplete interpretation.",
    answer: (
      <div className="space-y-4">
        <p>
          A treating clinician does not control the VA's decision. But months of documented care can provide a deeper clinical record
          than a brief examination. When clinically supportable, follow-up documentation can explain the history, symptoms, treatment,
          and medical reasoning already present in the record.
        </p>
        <p className="font-semibold text-[#111814]">
          In the completed appeals supported by this care-connected model to date, veterans have prevailed nearly every time. Past results
          do not guarantee any future VA outcome.
        </p>
      </div>
    ),
  },
  {
    value: "cost",
    question: "What does zero cost to the veteran mean?",
    preview: "ValorWell does not bill the veteran for OCS care or clinically appropriate documentation.",
    answer: (
      <div className="space-y-4">
        <p>
          In Regions 1–3, care is delivered through the applicable VA Community Care pathway when the authorization and registered
          clinician are in place. In Regions 4–5, where the TriWest reimbursement pathway remains blocked, treatment requires separately
          funded care resources and an available licensed clinician.
        </p>
        <p>
          Funding does not create VA eligibility or override licensure, capacity, clinical fit, or the clinician's independent judgment.
        </p>
      </div>
    ),
  },
];

export default function OperationClaimsSuccessPage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    track("ocs_page_view");
    const hero = document.getElementById("ocs-hero");
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string, event: string) => {
    track(event);
    scrollToId(id);
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#111814]">
      <Helmet>
        <title>Operation Claims Success | Building the Legitimate Path for Veterans</title>
        <meta
          name="description"
          content="Operation Claims Success is ValorWell's work to replace predatory veteran claims workarounds with real care, VA-aligned access pathways, clinically responsible documentation, and continued support."
        />
        <link rel="canonical" href="https://valorwell.org/operation-claims-success" />
        <meta property="og:title" content="Veterans Deserve a Legitimate Path | Operation Claims Success" />
        <meta
          property="og:description"
          content="The predatory model survives because veterans do not have a legitimate alternative. Operation Claims Success is being built to take that excuse away."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://valorwell.org/operation-claims-success" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />
      <main>
        <section id="ocs-hero" className="relative overflow-hidden bg-[#3B5147] text-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#D7A92E]/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-black/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:py-32">
            <div className="lg:col-span-7">
              <Eyebrow tone="yellow">Operation Claims Success · By ValorWell</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                Veterans deserve a <span className="text-[#D7A92E]">legitimate path.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-xl font-semibold leading-relaxed text-white md:text-2xl">
                The predatory model survives because veterans do not have a legitimate alternative. Operation Claims Success
                is being built to take that excuse away.
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg">
                ValorWell has spent years building the clinical systems, provider infrastructure, VA-aligned pathways,
                documentation technology, and continued-care model required to replace transactional claims support with
                something real.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goTo(SOLUTION_ANCHOR, "ocs_hero_solution")}
                  className="inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3.5 text-sm font-bold text-[#111814] transition hover:brightness-95"
                >
                  See the System We Built <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(FORM_ANCHOR, "ocs_hero_join")}
                  className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/[0.06] px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10"
                >
                  Join the Build
                </button>
              </div>
              <p className="mt-7 text-lg font-bold text-[#D7A92E]">Build the path. End the workaround.</p>
            </div>

            <div className="lg:col-span-5">
              <ImagePlaceholder
                dark
                aspect="portrait"
                title="Founder-led OCS hero visual"
                description="Recommended: Luke in the foreground with a sophisticated veteran-care system map behind him—clinical care, VA Community Care, documentation, and continued support converging into one pathway."
              />
            </div>
          </div>
        </section>

        <nav aria-label="On this page" className="sticky top-16 z-30 hidden border-y border-[#3B5147]/15 bg-[#F4F1E8]/95 backdrop-blur md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4 py-3 text-sm">
            {[
              ["The Missing System", "ocs-disconnected-system"],
              ["The Legitimate Path", SOLUTION_ANCHOR],
              ["What Is Built", "ocs-built"],
              ["Regional Reality", REGIONS_ANCHOR],
              ["Existing Companies", COMPANIES_ANCHOR],
              ["Join the Build", FORM_ANCHOR],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToId(id)}
                className="whitespace-nowrap font-medium text-[#111814]/65 hover:text-[#3B5147]"
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <section id="ocs-disconnected-system" className="scroll-mt-28 border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-4xl">
              <Eyebrow>The problem beneath the problem</Eyebrow>
              <SectionHeading>Veterans are forced to navigate systems that were never designed to work together.</SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-[#111814]/72">
                Each system has different rules, different decision-makers, different evidence, and different failure points.
                Veterans are expected to understand how all of them interact even though no single organization owns the entire path.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {disconnectedSystems.map((item) => (
                <IconCard key={item.title} icon={item.icon} title={item.title}>
                  {item.body}
                </IconCard>
              ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <ImagePlaceholder
                  aspect="wide"
                  title="Disconnected veteran systems diagram"
                  description="Show the veteran in the center of four disconnected systems with conflicting handoffs, then contrast it with the connected OCS pathway."
                />
              </div>
              <div className="lg:col-span-5">
                <p className="text-2xl font-bold leading-tight text-[#3B5147] md:text-3xl">
                  When nobody owns the whole journey, the veteran becomes the project manager.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-[#111814]/72">
                  That is where extended waitlists, stalled referrals, contradictory guidance, expensive workarounds, and
                  one-time documentation transactions begin.
                </p>
                <Guardrail tone="warn">
                  Veterans did not create this market. Confusion created the demand. Bad incentives learned how to monetize it.
                </Guardrail>
              </div>
            </div>
          </div>
        </section>

        <section id={SOLUTION_ANCHOR} className="scroll-mt-28 border-b border-[#3B5147]/10 bg-[#F4F1E8] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow>The legitimate alternative</Eyebrow>
              <SectionHeading>The system veterans have always needed is not another claims company.</SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-[#111814]/72">
                It is one connected pathway built around the veteran rather than the transaction.
              </p>
            </div>

            <ol className="mt-12 space-y-4">
              {legitimatePath.map((step) => (
                <li key={step.number} className="grid gap-4 rounded-2xl border border-[#3B5147]/15 bg-white p-6 md:grid-cols-[5rem_1fr] md:p-7">
                  <span className="text-3xl font-extrabold text-[#3B5147]/35 md:text-4xl">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#111814] md:text-2xl">{step.title}</h3>
                    <p className="mt-2 max-w-4xl leading-relaxed text-[#111814]/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-2xl bg-[#3B5147] px-6 py-8 text-center text-white md:px-10">
              <p className="text-2xl font-bold md:text-4xl">The document is not the product.</p>
              <p className="mt-3 text-xl font-semibold text-[#D7A92E] md:text-2xl">The veteran's health is the purpose.</p>
              <p className="mx-auto mt-4 max-w-3xl text-white/70">
                Documentation follows what is clinically true. The care continues after the document exists.
              </p>
            </div>
          </div>
        </section>

        <section id="ocs-built" className="scroll-mt-28 border-b border-white/10 bg-[#111814] py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow tone="yellow">Years of infrastructure before the announcement</Eyebrow>
                <SectionHeading light>We did not announce the idea and then start figuring it out.</SectionHeading>
                <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/72">
                  ValorWell has spent years building the clinical technology, care-delivery systems, documentation capability,
                  provider workflows, billing infrastructure, and operating controls required to make the model possible.
                </p>
              </div>
              <div className="lg:col-span-4">
                <p className="text-3xl font-extrabold leading-tight text-[#D7A92E] md:text-5xl">Now the biggest missing piece is you.</p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {buildStatus.map((item) => (
                <IconCard key={item.title} icon={item.icon} title={item.title} dark>
                  <span className="mb-3 inline-flex rounded-full bg-[#D7A92E]/15 px-3 py-1 text-xs font-bold tracking-wider text-[#D7A92E]">
                    {item.status}
                  </span>
                  <p>{item.body}</p>
                </IconCard>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-7">
                <Eyebrow tone="yellow">Clinicians in Regions 1–3</Eyebrow>
                <h3 className="mt-4 text-3xl font-bold">The registration path can begin immediately.</h3>
                <p className="mt-4 text-white/72">
                  ValorWell's organization-level work is complete enough to begin clinician-by-clinician VACCN registration.
                  External response and activation timing cannot be guaranteed, but the organization is not waiting to invent
                  the system. It is waiting for enough qualified clinicians to move through the path.
                </p>
                <Link
                  to="/clinicians"
                  onClick={() => track("ocs_clinician_page")}
                  className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-5 py-3 text-sm font-bold text-[#111814] hover:brightness-95"
                >
                  Join the Clinician Mission <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-7">
                <Eyebrow tone="yellow">Clinicians and funders in Regions 4–5</Eyebrow>
                <h3 className="mt-4 text-3xl font-bold">The clinical system can operate. The reimbursement pathway cannot.</h3>
                <p className="mt-4 text-white/72">
                  TriWest remains the external blocker. Until that changes, veteran care requires licensed clinicians,
                  separately funded treatment capacity, and a confirmed clinical path. Funding bridges payment; it does not
                  create VA authorization or override clinical standards.
                </p>
                <button
                  type="button"
                  onClick={() => goTo(FORM_ANCHOR, "ocs_regions45_join")}
                  className="mt-7 inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
                >
                  Help Build the Bridge <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id={REGIONS_ANCHOR} className="scroll-mt-28 border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Eyebrow>Regional reality</Eyebrow>
            <SectionHeading>One national mission. Two very different operating realities.</SectionHeading>
            <p className="mt-5 max-w-4xl text-lg text-[#111814]/72">
              The regional distinction is not marketing geography. It determines whether the care can be reimbursed through
              the current VA Community Care contractor or must be supported through a separate care-funding bridge.
            </p>

            <Accordion type="single" collapsible className="mt-10 space-y-4">
              <AccordionItem value="regions-map" className="overflow-hidden rounded-2xl border border-[#3B5147]/15 bg-[#F4F1E8] px-5">
                <AccordionTrigger
                  onClick={() => track("ocs_region_map_expand")}
                  className="gap-6 py-6 text-left hover:no-underline"
                >
                  <span>
                    <span className="flex items-center gap-2 text-lg font-bold text-[#111814] md:text-xl">
                      <Map className="h-5 w-5 text-[#3B5147]" aria-hidden /> Where can Operation Claims Success operate?
                    </span>
                    <span className="mt-2 block pr-5 text-sm font-normal text-[#111814]/65">
                      Open the VA Community Care Network regional explanation and map placeholder.
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-7">
                  <ImagePlaceholder
                    aspect="wide"
                    title="United States VACCN regional map"
                    description="User-supplied map should show Regions 1–3 as Clinician Registration Path Open and Regions 4–5 as TriWest Reimbursement Path Blocked. Include a clear legend and state boundaries."
                  />
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl border border-[#3B5147]/15 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3B5147]">Regions 1–3</p>
                      <h3 className="mt-2 text-xl font-bold">Clinician registration path open</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#111814]/70">
                        ValorWell is at clinician-registration execution. Availability still depends on the specific clinician,
                        state, completed registration evidence, VA authorization, capacity, and clinical fit.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#B24A3A]/25 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B24A3A]">Regions 4–5</p>
                      <h3 className="mt-2 text-xl font-bold">TriWest reimbursement path blocked</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#111814]/70">
                        TriWest has not provided a completion timeline. Care requires separately funded resources, a licensed
                        clinician, available capacity, and an approved clinical intake path.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id={COMPANIES_ANCHOR} className="scroll-mt-28 border-b border-[#3B5147]/10 bg-[#F4F1E8] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow tone="ember">The question everyone should ask</Eyebrow>
              <SectionHeading>Aren't there already companies that do this?</SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-[#111814]/72">
                There are companies that help veterans pursue disability claims. They do not build the connected care-first
                system Operation Claims Success is building—and many profit directly from the gaps that system leaves behind.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="mt-10 space-y-4"
              onValueChange={(value) => value && track("ocs_company_expand", { category: value })}
            >
              <AccordionItem value="why-veterans-use" className="rounded-2xl border border-[#3B5147]/15 bg-white px-5">
                <AccordionTrigger className="py-6 text-left text-lg font-bold hover:no-underline md:text-xl">
                  First: why veterans should never feel ashamed for using them
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-7 text-base leading-relaxed text-[#111814]/72">
                  <p>
                    When a veteran has waited, been denied, received conflicting information, or spent months trying to
                    understand a process nobody explains clearly, the person promising a faster answer sounds reasonable.
                  </p>
                  <p>Veterans did not create this market. They used the options available inside a system that failed to provide a legitimate alternative.</p>
                  <p className="font-semibold text-[#111814]">
                    Our criticism is aimed at the business models that recognized the desperation, monetized it, and left
                    veterans carrying the consequences—not at the veterans who did what they had to do.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="back-pay" className="rounded-2xl border border-[#3B5147]/15 bg-white px-5">
                <AccordionTrigger className="py-6 text-left hover:no-underline">
                  <span>
                    <span className="flex items-center gap-2 text-lg font-bold text-[#111814] md:text-xl">
                      <Scale className="h-5 w-5 text-[#B24A3A]" aria-hidden /> Back-pay attorneys and accredited agents
                    </span>
                    <span className="mt-2 block pr-5 text-sm font-normal text-[#111814]/62">
                      When compensation is tied to past-due benefits, delay can increase the value of the fee.
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-7 text-base leading-relaxed text-[#111814]/72">
                  <p>
                    Veterans sometimes need qualified legal representation, especially in complex appeals. The problem is the
                    incentive structure: when the representative's payment is calculated from back pay, a larger retroactive
                    award can produce a larger fee.
                  </p>
                  <p>
                    That does not prove every attorney intentionally delays every case. It does mean the veteran needs speed
                    while the fee structure can grow as the case takes longer.
                  </p>
                  <p className="border-l-4 border-[#B24A3A] pl-4 font-semibold text-[#111814]">
                    A system in which delay can increase the representative's compensation is not the system veterans deserve.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rating-companies" className="rounded-2xl border border-[#3B5147]/15 bg-white px-5">
                <AccordionTrigger className="py-6 text-left hover:no-underline">
                  <span>
                    <span className="flex items-center gap-2 text-lg font-bold text-[#111814] md:text-xl">
                      <DollarSign className="h-5 w-5 text-[#B24A3A]" aria-hidden /> Rating-increase and claims-strategy companies
                    </span>
                    <span className="mt-2 block pr-5 text-sm font-normal text-[#111814]/62">
                      When the company is paid based on the increase, the incentive is to maximize the increase—not protect the veteran from downstream risk.
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-7 text-base leading-relaxed text-[#111814]/72">
                  <p>
                    A performance-based fee can look veteran-friendly because the company earns more only when the veteran earns
                    more. The danger begins when the process stops asking what is actually supported and starts asking what
                    symptoms, diagnoses, or claims will produce the largest possible rating.
                  </p>
                  <p>
                    Coaching veterans to exaggerate subjective symptoms or pursue conditions that are not real may increase an
                    individual award in the short term. It also creates fraud exposure, proposed reductions, overpayments,
                    clawbacks, and a broader institutional response of tighter controls and greater suspicion.
                  </p>
                  <p className="border-l-4 border-[#B24A3A] pl-4 font-semibold text-[#111814]">
                    The company gets paid today. Veterans navigate the harder system tomorrow.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="letter-factories" className="rounded-2xl border border-[#3B5147]/15 bg-white px-5">
                <AccordionTrigger className="py-6 text-left hover:no-underline">
                  <span>
                    <span className="flex items-center gap-2 text-lg font-bold text-[#111814] md:text-xl">
                      <FileText className="h-5 w-5 text-[#B24A3A]" aria-hidden /> DBQ and Nexus-letter factories
                    </span>
                    <span className="mt-2 block pr-5 text-sm font-normal text-[#111814]/62">
                      A clinical opinion should not be sold like a retail product with the conclusion selected before the evaluation.
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-7 text-base leading-relaxed text-[#111814]/72">
                  <p>
                    A one-time private evaluation is not automatically fraudulent or medically worthless. The predatory model
                    appears when the desired conclusion is marketed in advance, the clinician has little meaningful relationship
                    with the veteran, the veteran pays thousands for one document, and the company disappears when the evidence is questioned.
                  </p>
                  <p>
                    Veterans may be left with no continued treatment, no longitudinal record, no clinician prepared to explain
                    the opinion later, and all of the risk if the VA reviews the claim and challenges the evidence.
                  </p>
                  <p className="border-l-4 border-[#B24A3A] pl-4 font-semibold text-[#111814]">
                    A document without ongoing clinical responsibility is a transaction. Operation Claims Success is building a clinical relationship.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-10 rounded-2xl bg-[#111814] p-7 text-white md:p-10">
              <p className="text-2xl font-bold leading-tight md:text-4xl">
                We do not intend to peacefully coexist with a business model that profits from veteran confusion.
              </p>
              <p className="mt-4 text-2xl font-extrabold text-[#D7A92E] md:text-4xl">We intend to make that model obsolete.</p>
              <p className="mt-6 max-w-4xl text-lg text-white/72">
                Not by selling a better workaround—by building the legitimate path veterans should have had all along.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Eyebrow>The difference in one view</Eyebrow>
            <SectionHeading>Transaction-first versus care-first.</SectionHeading>
            <p className="mt-5 max-w-4xl text-lg text-[#111814]/72">
              The difference is not Nexus Letter versus no Nexus Letter. It is outcome-first transactional support versus care-connected clinical support.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-[#3B5147]/15">
              <div className="grid grid-cols-2 bg-[#111814] text-white">
                <div className="border-r border-white/10 p-4 font-bold md:p-5">Transaction-first model</div>
                <div className="p-4 font-bold text-[#D7A92E] md:p-5">Operation Claims Success</div>
              </div>
              {comparisonRows.map(([bad, good]) => (
                <div key={bad} className="grid grid-cols-2 border-t border-[#3B5147]/12 bg-[#F4F1E8]">
                  <div className="flex gap-3 border-r border-[#3B5147]/12 p-4 text-sm text-[#111814]/72 md:p-5 md:text-base">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-[#B24A3A]" aria-hidden />
                    <span>{bad}</span>
                  </div>
                  <div className="flex gap-3 p-4 text-sm font-medium text-[#111814] md:p-5 md:text-base">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3B5147]" aria-hidden />
                    <span>{good}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-[#F4F1E8] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <Eyebrow>Why nobody has built it</Eyebrow>
                <SectionHeading>Because a shortcut is easier to sell than infrastructure is to build.</SectionHeading>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#111814]/72">
                  <p>A document can be sold in one transaction.</p>
                  <p>
                    A real care-first system requires licensed clinicians, multi-state coverage, payer relationships, provider
                    registration, referral pathways, clinical policies, evidence standards, secure technology, ongoing treatment,
                    quality controls, and the discipline to refuse conclusions that cannot be clinically supported.
                  </p>
                  <p className="text-2xl font-bold text-[#3B5147]">The workaround can be launched in weeks. The better path has to be engineered.</p>
                </div>
              </div>
              <div className="lg:col-span-6">
                <ImagePlaceholder
                  title="OCS infrastructure visual"
                  description="Recommended: a sophisticated layered system blueprint showing clinicians, VA pathways, secure technology, evidence standards, continued care, and regional funding converging into one operating system."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <Eyebrow>Learn as deep as you need</Eyebrow>
            <SectionHeading>Questions veterans and informed partners ask.</SectionHeading>
            <p className="mt-5 max-w-3xl text-lg text-[#111814]/72">
              The basic idea should be clear in seconds. The details are here for people who want to understand how the system actually works.
            </p>

            <Accordion
              type="single"
              collapsible
              className="mt-10 space-y-3"
              onValueChange={(value) => value && track("ocs_faq_expand", { item: value })}
            >
              {generalFaqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value} className="rounded-2xl border border-[#3B5147]/15 bg-[#F4F1E8] px-5">
                  <AccordionTrigger className="gap-6 py-5 text-left hover:no-underline">
                    <span>
                      <span className="flex items-center gap-2 text-base font-bold text-[#111814] md:text-lg">
                        <CircleHelp className="h-4 w-4 shrink-0 text-[#3B5147]" aria-hidden /> {faq.question}
                      </span>
                      <span className="mt-1 block pr-4 text-sm font-normal text-[#111814]/62">{faq.preview}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-[#111814]/72">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-[#3B5147] py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Eyebrow tone="yellow">The clinician mission</Eyebrow>
                <SectionHeading light>Every clinician who joins turns infrastructure into actual veteran access.</SectionHeading>
                <p className="mt-6 text-lg leading-relaxed text-white/75">
                  The technology, workflows, documentation systems, and Regions 1–3 organization path do not treat anyone by
                  themselves. Licensed clinicians do. Every state staffed is another place where a veteran may no longer have to
                  choose between waiting and buying a workaround.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Clinical judgment stays clinical.",
                    "No pay-for-letter pressure.",
                    "Real treatment relationships.",
                    "Systems built around the clinical work.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D7A92E]" aria-hidden />
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/clinicians"
                    onClick={() => track("ocs_clinician_primary")}
                    className="inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-sm font-bold text-[#111814] hover:brightness-95"
                  >
                    Join the Clinician Mission <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <button
                    type="button"
                    onClick={() => goTo(FORM_ANCHOR, "ocs_clinician_form")}
                    className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
                  >
                    Talk to ValorWell
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <ImagePlaceholder
                  dark
                  aspect="portrait"
                  title="Mission-aligned clinician visual"
                  description="Recommended: a grounded telehealth clinician working with a veteran, with subtle system overlays showing state coverage and veteran access—not generic stock therapy imagery."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-[#F4F1E8] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow>More than one way to move the mission</Eyebrow>
              <SectionHeading>What can you help unlock?</SectionHeading>
              <p className="mt-5 text-lg text-[#111814]/72">
                Clinicians create capacity. Veteran organizations create trust. Supporters fund blocked care. Creators and connectors help the legitimate path reach people before the predators do.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                [Stethoscope, "I am a clinician", "I can provide care, help staff a state, and build a responsible documentation system."],
                [Users, "I represent an organization", "I can educate, collaborate, introduce veterans, or help improve the pathway."],
                [HeartHandshake, "I can support care", "I can help fund clinician sessions where the reimbursement path is blocked."],
                [Wrench, "I can expand the system", "I can bring technology, media, reach, relationships, expertise, or a critical introduction."],
              ].map(([Icon, title, body]) => (
                <button
                  key={String(title)}
                  type="button"
                  onClick={() => goTo(FORM_ANCHOR, `ocs_lane_${String(title).toLowerCase().replace(/\W+/g, "_")}`)}
                  className="group rounded-2xl border border-[#3B5147]/15 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#3B5147]/40 hover:shadow-md"
                >
                  <Icon className="h-6 w-6 text-[#3B5147]" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold text-[#111814]">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#111814]/68">{String(body)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3B5147]">
                    Find My Path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id={FORM_ANCHOR} className="scroll-mt-28 border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <Eyebrow>Now the only thing missing is you</Eyebrow>
            <SectionHeading>Choose the part of the path you can help build.</SectionHeading>
            <p className="mt-5 max-w-3xl text-lg text-[#111814]/72">
              This is a mission-routing form, not a clinical intake. Veterans may ask questions and follow the build. Clinicians,
              organizations, supporters, creators, and connectors can identify the role they are ready to play.
            </p>
            <div className="mt-10" />
          </div>
        </section>

        <section className="bg-[#111814] py-24 text-white md:py-32">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <Eyebrow tone="yellow">Build the path. End the workaround.</Eyebrow>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              The system does not need another shortcut.
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-xl font-semibold text-[#D7A92E] md:text-2xl">
              It needs the pathway the shortcuts were compensating for.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
              Operation Claims Success is ValorWell's work to build that path—aggressively, transparently, and without promising what we do not control.
            </p>
            <button
              type="button"
              onClick={() => goTo(FORM_ANCHOR, "ocs_final_join")}
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-7 py-3.5 text-sm font-bold text-[#111814] hover:brightness-95"
            >
              Join the Build <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </section>
      </main>

      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#3B5147]/15 bg-[#F4F1E8]/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => goTo(FORM_ANCHOR, "ocs_sticky_join")}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white"
          >
            Join the Build <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
