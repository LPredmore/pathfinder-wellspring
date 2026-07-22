import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ocsHeroImage from "@/assets/operation-claims-success-hero.png.asset.json";
import disconnectedSystemsImage from "@/assets/disconnected-veteran-systems.png.asset.json";
import vaAccreditedAttorneysImage from "@/assets/va-accredited-attorneys.png.asset.json";
import {
  ArrowRight,
  Check,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Compass,
  DollarSign,
  FileSearch,
  FileText,
  HeartHandshake,
  Map,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const companyCategories: Array<{ title: string; body: string[] }> = [
  {
    title: "VA Accredited Attorneys",
    body: [
      "Veterans sometimes need legal representation. The structural problem is that when payment is calculated from past-due benefits, a larger retroactive award can produce a larger fee.",
      "This does not prove every attorney intentionally delays cases. It does mean the veteran needs speed while the fee can grow as the case takes longer.",
    ],
  },
  {
    title: "Ratings Coaching Companies",
    body: [
      "When a company is paid based on an increase, the incentive can shift from what is supported to what symptoms or claims produce the largest award.",
      "Exaggerated or unsupported claims expose veterans to fraud concerns, reductions, overpayments, clawbacks, and tighter controls for everyone who comes next.",
    ],
  },
  {
    title: "Nexus Letter Factories",
    body: [
      "A one-time private evaluation is not automatically worthless. The predatory model appears when the desired conclusion is marketed in advance, the veteran pays thousands for one document, and the company disappears when the evidence is questioned.",
      "A document without ongoing clinical responsibility is a transaction. OCS is building a clinical relationship and a complete support system.",
    ],
  },
];
import { trackHomeEvent } from "@/lib/tracking";

const FORM = "ocs-routing-form";
const PATH = "ocs-legitimate-path";
const REGIONS = "ocs-regional-path";
const COMPANIES = "ocs-existing-companies";
const FAQ = "ocs-faq";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "operation-claims-success", ...params });

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

function Eyebrow({
  children,
  light = false,
  alert = false,
}: {
  children: ReactNode;
  light?: boolean;
  alert?: boolean;
}) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.22em] ${
        light ? "text-[#D7A92E]" : alert ? "text-[#B24A3A]" : "text-[#3B5147]"
      }`}
    >
      {children}
    </p>
  );
}

function Heading({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      className={`mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl ${
        light ? "text-white" : "text-[#111814]"
      }`}
    >
      {children}
    </h2>
  );
}

function Placeholder({
  title,
  description,
  dark = false,
  wide = false,
  portrait = false,
}: {
  title: string;
  description: string;
  dark?: boolean;
  wide?: boolean;
  portrait?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`${title}. ${description}`}
      className={`${
        portrait ? "aspect-[4/5]" : wide ? "aspect-[2/1]" : "aspect-video"
      } flex w-full items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center ${
        dark
          ? "border-white/25 bg-white/[0.06] text-white"
          : "border-[#3B5147]/25 bg-[#F4F1E8] text-[#111814]"
      }`}
    >
      <div className="max-w-md">
        <FileText
          className={`mx-auto h-7 w-7 ${dark ? "text-[#D7A92E]" : "text-[#3B5147]"}`}
          aria-hidden
        />
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] opacity-65">
          Image placeholder
        </p>
        <p className="mt-2 text-lg font-bold">{title}</p>
        <p className="mt-2 text-sm opacity-70">{description}</p>
      </div>
    </div>
  );
}

function Card({
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
        dark
          ? "border-white/10 bg-white/[0.05] text-white"
          : "border-[#3B5147]/15 bg-white text-[#111814]"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          dark
            ? "bg-[#D7A92E]/15 text-[#D7A92E]"
            : "bg-[#3B5147]/10 text-[#3B5147]"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <div
        className={`mt-3 text-sm leading-relaxed ${
          dark ? "text-white/72" : "text-[#111814]/72"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Notice({ children, warn = false }: { children: ReactNode; warn?: boolean }) {
  return (
    <div
      className={`mt-5 flex gap-3 rounded-xl border-l-4 px-5 py-4 text-sm leading-relaxed ${
        warn
          ? "border-[#B24A3A] bg-[#B24A3A]/5"
          : "border-[#3B5147] bg-[#F4F1E8]"
      }`}
    >
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#3B5147]" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

const support = [
  "Possible mental-health claims and overlooked secondary conditions",
  "Current-condition and rating review",
  "Evidence-gap identification and record review",
  "Initial evaluations and therapy",
  "DBQs and clinically appropriate Nexus opinions",
  "Follow-up and appeal-related clinical documentation",
  "Coordination with eligible outside mental-health providers",
];

const systems = [
  [
    Stethoscope,
    "Mental health care",
    "Evaluation, treatment, continuity, and a clinician who understands the veteran over time.",
  ],
  [
    Compass,
    "VA Community Care",
    "Eligibility, referral, authorization, and whether a provider is available in the veteran's state.",
  ],
  [
    ClipboardCheck,
    "Clinical documentation",
    "Evidence review, DBQs, Nexus analysis, rating criteria, and appeal-related responses.",
  ],
  [
    Scale,
    "VA adjudication",
    "C&P examinations, service connection, ratings, appeals, and the VA's final authority.",
  ],
] as const;

const pathway = [
  [
    "01",
    "Understand the claim",
    "Review current conditions and ratings, identify potentially overlooked direct or secondary conditions, explain rating criteria, and identify missing evidence.",
  ],
  [
    "02",
    "Find the available care path",
    "ValorWell checks the veteran's state and current availability, then determines whether care can be provided directly or through an eligible outside mental-health provider.",
  ],
  [
    "03",
    "Build clinical understanding",
    "Work with veterans who have no diagnosis, limited prior care, or extensive treatment history. Treatment creates context that a one-time transaction cannot replace.",
  ],
  [
    "04",
    "Examine every legitimate connection",
    "Consider direct connection, secondary connection, aggravation, delayed recognition, lay evidence, and credible explanations for missing military records.",
  ],
  [
    "05",
    "Prepare the documentation",
    "When appropriate, complete DBQs, prepare Nexus opinions, review records, and provide follow-up or appeal-related clinical responses.",
  ],
  [
    "06",
    "Help assemble the evidence package",
    "Organize the medical support for a well-supported or Fully Developed Claim. The veteran or chosen representative remains responsible for filing and managing it.",
  ],
];

const credibility = [
  [
    Stethoscope,
    "Operational now",
    "OCS currently serves VA mental-health claims and appeals. ValorWell is preparing the model for other specialties.",
  ],
  [
    FileText,
    "Care and documentation connected",
    "Treatment, evidence review, DBQs, Nexus opinions, record review, and appeal support are built to work together.",
  ],
  [
    Users,
    "Expanding state by state",
    "Veterans nationwide may sign up. Actual provider availability changes as veterans and clinicians enter the system.",
  ],
] as const;

const glossary = [
  [
    "Service connection",
    "The VA's determination that a disability is connected to military service, directly, secondarily, through aggravation, or through another recognized theory.",
  ],
  [
    "Disability rating",
    "The percentage the VA assigns using its rating criteria and the documented severity and functional impact of a service-connected condition.",
  ],
  [
    "C&P examination",
    "A Compensation and Pension examination the VA may use to gather medical evidence or an opinion when deciding a claim.",
  ],
  [
    "DBQ",
    "A Disability Benefits Questionnaire used to document diagnosis, symptoms, clinical findings, severity, and functional impact.",
  ],
  [
    "Nexus opinion",
    "A clinical opinion explaining whether and why a condition is connected to military service or another service-connected condition.",
  ],
  [
    "Secondary condition",
    "A new condition caused or aggravated by a disability the VA has already determined is service connected.",
  ],
  [
    "Fully Developed Claim",
    "A claim submitted with the available supporting evidence and certification that no more evidence is needed from the veteran. VA may still order an exam or move it to the standard process.",
  ],
  [
    "Buddy or lay statement",
    "A statement from the veteran or another person describing events, symptoms, behavioral changes, functional impact, or other facts personally observed.",
  ],
];

type Faq = {
  value: string;
  question: string;
  preview: string;
  paragraphs: string[];
  bullets?: string[];
  map?: boolean;
  strong?: string;
};

const faqs: Faq[] = [
  {
    value: "what-is-ocs",
    question: "What exactly is Operation Claims Success?",
    preview:
      "A veteran-only mental-health care and claims-support system—not a law firm, filing service, or retail document company.",
    paragraphs: [
      "Operation Claims Success is ValorWell's veteran-only program for VA mental-health claims and appeals. It combines claims education, condition and rating review, evidence-gap analysis, evaluation and treatment, DBQs, clinically appropriate Nexus opinions, record review, and appeal-related clinical support.",
      "OCS currently focuses on mental health. ValorWell is preparing this care-connected model for additional clinical specialties, but those specialties are not yet part of the active public program.",
    ],
  },
  {
    value: "eligibility",
    question: "Who can sign up?",
    preview: "Any veteran seeking assistance with a VA mental-health claim or appeal may sign up.",
    paragraphs: [
      "Veterans may contact OCS for an original claim, an increased-rating question, a possible secondary condition, a denial, or an appeal involving mental health.",
      "No existing diagnosis or minimum amount of treatment is required. OCS can work with veterans whose previous mental-health care ranges from none to extensive.",
    ],
  },
  {
    value: "what-help",
    question: "What can OCS help me do?",
    preview:
      "Understand possible claims, identify missing evidence, receive care, and obtain clinically appropriate documentation.",
    paragraphs: [
      "OCS reviews current conditions and ratings, helps identify potentially overlooked mental-health or secondary conditions, explains the rating level the documented symptoms and functional limitations may support, and identifies evidence gaps. The VA makes every final service-connection and rating decision.",
      "OCS may provide evaluations, therapy, record review, DBQs, Nexus opinions, follow-up documentation, mental-health appeal responses, and coordination with eligible outside providers.",
    ],
  },
  {
    value: "filing",
    question: "Does ValorWell file or manage my claim?",
    preview:
      "No. OCS helps build the evidence package; the veteran or chosen representative files and manages the claim.",
    paragraphs: [
      "ValorWell does not file claims, manage claim status, act as an accredited representative, or provide legal representation. OCS helps assemble the medical evidence and supporting documentation for a well-supported or Fully Developed Claim.",
      "Veterans remain free to work with any attorney, VSO, claims organization, or representative they choose. ValorWell does not coordinate with or provide services through attorneys or other agencies that charge veterans for claims assistance.",
    ],
  },
  {
    value: "after-signup",
    question: "What happens after I sign up?",
    preview: "ValorWell responds within 48 hours with the next steps for your state and situation.",
    paragraphs: [
      "ValorWell reviews the veteran's state, current care, claim or appeal needs, and the care options currently available. A member of the ValorWell team will reach out within 48 hours with the next steps.",
      "Veteran demand and clinician supply change continuously. Sign up even when you are unsure whether OCS currently has a provider available in your state.",
      "The public form is not a clinical intake. Do not place medical records, Social Security numbers, VA file numbers, diagnoses, or detailed trauma histories in it. Secure clinical information is collected only after the appropriate path is identified.",
    ],
  },
  {
    value: "operational",
    question: "Is OCS operational now?",
    preview:
      "Yes for mental-health claims and appeals, with individual state availability changing rapidly.",
    paragraphs: [
      "Veterans nationwide can sign up. Actual care availability changes by state as clinicians become available and veteran demand changes.",
      "Depending on the veteran's state and situation, ValorWell may provide care directly or connect the veteran with an eligible outside mental-health provider. The veteran does not need to determine that path before signing up.",
    ],
  },
  {
    value: "region",
    question: "How do I know what VA Community Care region I am in?",
    preview:
      "Open the map to locate your state, then sign up so ValorWell can check current state-level availability.",
    paragraphs: [
      "The region helps explain the general VA Community Care environment, but it does not confirm whether a clinician is available. ValorWell checks the veteran's state and current options after sign-up.",
    ],
    map: true,
  },
  {
    value: "already-va-care",
    question: "Can OCS help if I already receive mental-health care through the VA?",
    preview: "Yes. Existing treatment and OCS claims support can be evaluated separately.",
    paragraphs: [
      "A veteran may continue VA treatment and still contact OCS for claims education, evidence review, rating analysis, DBQ or Nexus needs, and appeal-related clinical support.",
      "The right path depends on the existing record, what the VA clinician documented, the claim stage, the medical question, and whether an additional independent assessment is appropriate. Sign up so ValorWell can review the situation.",
    ],
  },
  {
    value: "va-nexus",
    question: "Why doesn't my VA treating clinician just write the Nexus opinion?",
    preview:
      "VA treating clinicians commonly focus on treatment while service-connection analysis is treated like a separate specialty.",
    paragraphs: [
      "VA treating clinicians commonly focus on diagnosis and treatment and may be advised to leave formal service-connection opinions to the disability-examination process. In practice, service connection can be treated like a separate specialty—similar to a primary-care clinician referring a heart question to a cardiologist.",
      "That can leave a veteran with years of treatment records but no clinician who has fully analyzed and explained the relationship between the condition and military service. OCS fills that gap through real care, evidence review, and clinically responsible Nexus analysis.",
    ],
  },
  {
    value: "treatment",
    question: "Do I have to be in treatment to file a mental-health claim?",
    preview:
      "No, but treatment can create stronger clinical evidence while giving the veteran care independent of the claim.",
    paragraphs: [
      "A veteran does not have to be actively receiving treatment to file. But when little or no treatment history exists, the record may contain less clinical evidence documenting the condition, severity, history, and effect on daily functioning.",
      "Treatment is separate from the claim. Its first purpose is the veteran's health. It can also create an accurate longitudinal record that makes later rating analysis, a DBQ, a Nexus opinion, or an appeal response more complete and credible.",
    ],
  },
  {
    value: "records",
    question: "Do I need complete military records before OCS can help?",
    preview:
      "No. Records are helpful, but missing military documentation does not automatically end a claim.",
    paragraphs: [
      "Veterans do not need to personally possess complete military medical or personnel records before contacting OCS. Service records can be very helpful when establishing an in-service event or supporting a Nexus analysis.",
      "OCS clinicians understand why records may be absent, including underreporting, stigma, operational demands, command climate, incomplete documentation, lost records, and symptoms that were recognized later. Buddy statements, family observations, personnel records, deployment history, behavioral changes, and later medical evidence may help.",
      "For a condition already service connected, the rating question generally focuses on current severity and functional impairment rather than proving the original event again.",
    ],
  },
  {
    value: "nexus",
    question: "Is OCS a Nexus Letter company?",
    preview:
      "No. Nexus analysis is one care-connected service inside a larger mental-health and claims-support system.",
    paragraphs: [
      "OCS prepares Nexus opinions when needed and clinically appropriate, but veterans cannot purchase a predetermined conclusion.",
      "Our clinicians do not begin by looking for a reason to say no. They examine direct connection, secondary connection, aggravation, delayed recognition, credible lay evidence, and explanations for missing records, then advocate through clear and clinically supportable documentation.",
      "If the evidence does not yet support a Nexus opinion, the veteran may continue receiving whatever appropriate care OCS can provide. The VA makes the final decision.",
    ],
  },
  {
    value: "risk",
    question: "Will using OCS put my existing rating at risk?",
    preview:
      "OCS does not inherently place a rating at risk, but filing a claim asks the VA to review evidence in the file.",
    paragraphs: [
      "Using OCS does not inherently place an existing rating at risk. Any new claim or request for increase asks the VA to review evidence. No organization can guarantee the VA will never review an existing rating or reach an unfavorable conclusion.",
      "OCS reduces avoidable risk by helping the veteran understand what is supportable and by building a complete package based on real symptoms, real treatment, appropriate rating criteria, and comprehensive clinical documentation.",
    ],
  },
  {
    value: "appeals",
    question: "What happens when the VA disagrees with the treating record?",
    preview:
      "Continued care can produce evidence that responds to a one-time examination or incomplete interpretation.",
    paragraphs: [
      "A treating clinician does not control the VA's decision. But documented care can provide a deeper record than a brief examination. When supportable, OCS can explain the history, symptoms, treatment, severity, functional impact, and medical reasoning already present.",
    ],
    strong:
      "In completed appeals supported by this care-connected model to date, veterans have prevailed nearly every time. Past results do not guarantee any future VA outcome.",
  },
  {
    value: "cost",
    question: "What does zero cost to the veteran mean?",
    preview: "There is absolutely nothing the veteran must pay to ValorWell for OCS.",
    paragraphs: [
      "ValorWell does not charge veterans for OCS services. When ValorWell connects a veteran with an eligible outside mental-health provider, the care path is confirmed before the referral so the veteran is not charged for the referred treatment.",
    ],
    bullets: [
      "Therapy sessions",
      "Initial evaluations",
      "Nexus opinions",
      "DBQs",
      "Follow-up documentation",
      "Appeal-related clinical responses",
      "Record review",
      "Claims education",
      "Coordination with outside providers",
    ],
  },
];

const comparison = [
  ["The desired outcome starts the process", "The veteran's condition, history, and evidence start the process"],
  ["The document or rating increase is the product", "Care, education, and clinical truth are the foundation"],
  ["One-time encounter", "Evaluation, treatment, and longitudinal context"],
  ["The conclusion is marketed in advance", "The clinician examines every legitimate path and independently decides"],
  ["Revenue grows with back pay or rating", "The veteran pays ValorWell nothing"],
  ["The relationship ends after delivery", "Treatment and documentation support can continue"],
];

export default function OperationClaimsSuccessPage() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    track("ocs_page_view");
    const hero = document.getElementById("ocs-hero");
    if (!hero || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const go = (id: string, event: string) => {
    track(event);
    scrollTo(id);
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#111814]">
      <Helmet>
        <title>Operation Claims Success | Free Mental-Health Claims Support for Veterans</title>
        <meta
          name="description"
          content="Free veteran mental-health care, claims education, rating and evidence review, DBQs, clinically appropriate Nexus opinions, and appeal-related documentation support."
        />
        <link rel="canonical" href="https://valorwell.org/operation-claims-success" />
        <meta
          property="og:title"
          content="Veterans Deserve a Legitimate Path | Operation Claims Success"
        />
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
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:py-32">
            <div className="lg:col-span-7">
              <Eyebrow light>Operation Claims Success · By ValorWell</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                Veterans deserve a <span className="text-[#D7A92E]">legitimate path.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-xl font-semibold leading-relaxed md:text-2xl">
                The predatory model survives because veterans do not have a legitimate
                alternative. Operation Claims Success is being built to take that excuse away.
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
                OCS is operational for VA mental-health claims and appeals. Veterans pay
                ValorWell nothing for care, education, evidence review, DBQs, clinically
                appropriate Nexus opinions, or appeal support.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => go(PATH, "ocs_hero_solution")}
                  className="inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3.5 text-sm font-bold text-[#111814]"
                >
                  See How OCS Helps <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(FORM, "ocs_hero_signup")}
                  className="rounded-md border border-white/35 bg-white/[0.06] px-6 py-3.5 text-sm font-bold"
                >
                  Check My Availability
                </button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#D7A92E]" /> Any veteran with a
                  mental-health claim or appeal
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#D7A92E]" /> Response within 48 hours
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-[#D7A92E]" /> $0 paid to ValorWell
                </span>
              </div>
              <p className="mt-7 text-lg font-bold text-[#D7A92E]">
                Build the path. End the workaround.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                <img
                  src={ocsHeroImage.url}
                  alt="Operation Claims Success — Built for veterans seeking clarity. Strategic, compassionate guidance to help veterans navigate stronger disability claims with confidence and direction."
                  className="h-auto w-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <nav
          aria-label="On this page"
          className="sticky top-16 z-30 hidden border-y border-[#3B5147]/15 bg-[#F4F1E8]/95 backdrop-blur md:block"
        >
          <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-4 py-3 text-sm">
            {[
              ["What OCS Does", "ocs-today"],
              ["The Path", PATH],
              ["Availability", REGIONS],
              ["Existing Companies", COMPANIES],
              ["Glossary & Questions", FAQ],
              ["Sign Up", FORM],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="whitespace-nowrap font-medium text-[#111814]/65 hover:text-[#3B5147]"
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <section id="ocs-today" className="scroll-mt-28 border-b border-[#3B5147]/10 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow>What this means today</Eyebrow>
              <Heading>
                Free mental-health care and claims support—without giving ValorWell control of
                your claim.
              </Heading>
              <p className="mt-6 text-lg text-[#111814]/72">
                OCS helps veterans understand what their conditions and evidence may support,
                obtain legitimate care, and build the documentation needed for a claim or
                appeal. ValorWell does not file or manage the claim.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <Card icon={FileSearch} title="Understand the claim">
                Review current conditions and ratings, identify possible missed or secondary
                conditions, and explain evidence gaps.
              </Card>
              <Card icon={Stethoscope} title="Receive real care">
                Begin with any level of prior treatment—from no diagnosis to an extensive
                existing mental-health record.
              </Card>
              <Card icon={ClipboardCheck} title="Build the documentation">
                Receive DBQs, appropriate Nexus opinions, record review, follow-up
                documentation, and appeal support.
              </Card>
              <Card icon={Clock3} title="Get a clear next step">
                Sign up from any region. ValorWell responds within 48 hours and checks current
                state availability.
              </Card>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="rounded-2xl bg-[#3B5147] p-8 text-white lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7A92E]">
                  OCS can help with
                </p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {support.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-white/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D7A92E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#3B5147]/15 bg-white p-8 lg:col-span-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3B5147]">
                  OCS does not
                </p>
                <ul className="mt-6 space-y-4 text-sm text-[#111814]/72">
                  {[
                    "File or manage the claim",
                    "Act as an attorney or claims representative",
                    "Guarantee service connection, a rating, or an appeal result",
                    "Sell a predetermined conclusion",
                    "Require veterans to stop working with another organization",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-[#B24A3A]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => go(FORM, "ocs_today_signup")}
                className="inline-flex items-center gap-2 rounded-md bg-[#3B5147] px-7 py-3.5 text-sm font-bold text-white"
              >
                Sign Up to Check Availability <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-4xl">
              <Eyebrow>The problem beneath the problem</Eyebrow>
              <Heading>
                Veterans are forced to navigate systems that were never designed to work
                together.
              </Heading>
              <p className="mt-6 text-lg text-[#111814]/72">
                Each system has different rules, decision-makers, evidence, and failure points.
                Veterans are expected to understand how all of them interact even though no one
                owns the entire path.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {systems.map(([Icon, title, body]) => (
                <Card key={title} icon={Icon} title={title}>
                  {body}
                </Card>
              ))}
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <img
                  src={disconnectedSystemsImage.url}
                  alt="A veteran stands between a maze of disconnected systems—delays, red tape, confusing information, and empty promises—while the VA Benefits Processing Center waits in the distance."
                  className="h-auto w-full rounded-2xl"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-5">
                <p className="text-3xl font-bold text-[#3B5147]">
                  When nobody owns the journey, the veteran becomes the project manager.
                </p>
                <p className="mt-5 text-lg text-[#111814]/72">
                  That is where stalled referrals, contradictory guidance, missed evidence,
                  expensive workarounds, and one-time documentation transactions begin.
                </p>
                <Notice warn>
                  Veterans did not create this market. Confusion created the demand. Bad
                  incentives learned how to monetize it.
                </Notice>
              </div>
            </div>
          </div>
        </section>

        <section id={COMPANIES} className="scroll-mt-28 border-b border-[#3B5147]/10 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <Eyebrow alert>The question everyone should ask</Eyebrow>
              <Heading>Aren't there already companies that do this?</Heading>
              <p className="mt-6 text-lg text-[#111814]/72">
                There are companies that help pursue claims. And they usually fall into 3 categories.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {companyCategories.map((cat) => {
                const isAttorneys = cat.title === "VA Accredited Attorneys";
                return (
                  <Dialog key={cat.title}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group relative block overflow-hidden rounded-2xl border border-[#3B5147]/15 bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#3B5147]/40"
                      >
                        {isAttorneys ? (
                          <img
                            src={vaAccreditedAttorneysImage.url}
                            alt="VA Accredited Attorneys"
                            className="aspect-[4/3] w-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#F4F1E8] text-[#3B5147]/40">
                              <span className="text-xs font-extrabold uppercase tracking-[0.2em]">
                                Image placeholder
                              </span>
                            </div>
                            <div className="p-5">
                              <h3 className="text-lg font-bold text-[#111814]">{cat.title}</h3>
                            </div>
                          </>
                        )}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#111814]/0 opacity-0 transition-all duration-300 group-hover:bg-[#111814]/60 group-hover:opacity-100 group-focus:bg-[#111814]/60 group-focus:opacity-100">
                          <span className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-[#111814]">
                            Click to Read More <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#111814]">
                          {cat.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-[#111814]/75">
                        {cat.body.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
            <Accordion type="single" collapsible className="mt-10">
              <AccordionItem
                value="shame"
                className="rounded-2xl border border-[#3B5147]/15 bg-white px-5"
              >
                <AccordionTrigger className="py-6 text-left text-xl font-bold hover:no-underline">
                  Why veterans should never feel ashamed for using them
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-7 text-[#111814]/72">
                  <p>
                    When a veteran has waited, been denied, or received conflicting
                    information, the person promising a faster answer sounds reasonable.
                  </p>
                  <p>
                    Veterans did not create this market. They used the options available inside
                    a system that failed to provide a legitimate alternative.
                  </p>
                  <p className="font-semibold text-[#111814]">
                    Our criticism is aimed at the business models that monetized
                    desperation—not at veterans who did what they had to do.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-10 rounded-2xl bg-[#111814] p-8 text-white">
              <p className="text-3xl font-bold">
                We do not intend to peacefully coexist with a business model that profits from
                veteran confusion.
              </p>
              <p className="mt-4 text-3xl font-extrabold text-[#D7A92E]">
                We intend to make that model obsolete.
              </p>
              <p className="mt-5 text-lg text-white/72">
                Not by selling a better workaround—by building the legitimate path veterans
                should have had all along.
              </p>
            </div>
          </div>
        </section>

        <section id={PATH} className="scroll-mt-28 border-b border-[#3B5147]/10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow>The legitimate alternative</Eyebrow>
              <Heading>The system veterans need is not another claims company.</Heading>
              <p className="mt-6 text-lg text-[#111814]/72">
                It is one connected pathway built around the veteran rather than the
                transaction.
              </p>
            </div>
            <ol className="mt-12 space-y-4">
              {pathway.map(([number, title, body]) => (
                <li
                  key={number}
                  className="grid gap-4 rounded-2xl border border-[#3B5147]/15 bg-white p-6 md:grid-cols-[5rem_1fr]"
                >
                  <span className="text-4xl font-extrabold text-[#3B5147]/35">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="mt-2 text-[#111814]/70">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-2xl bg-[#3B5147] px-6 py-9 text-center text-white">
              <p className="text-3xl font-bold">The document is not the product.</p>
              <p className="mt-3 text-2xl font-semibold text-[#D7A92E]">
                The veteran's health and legitimate outcome are the purpose.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow light>Built before it was announced</Eyebrow>
              <Heading light>The system exists. State capacity is what changes.</Heading>
              <p className="mt-6 text-lg text-white/72">
                ValorWell already built the clinical and documentation foundation required to
                operate OCS. The remaining variable is whether an appropriate clinician is
                currently available for the veteran's state and situation.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {credibility.map(([Icon, title, body]) => (
                <Card key={title} icon={Icon} title={title} dark>
                  {body}
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id={REGIONS} className="scroll-mt-28 border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Eyebrow>Regional availability</Eyebrow>
            <Heading>Veterans nationwide can sign up. Availability changes by state.</Heading>
            <p className="mt-5 max-w-4xl text-lg text-[#111814]/72">
              The regional map helps explain the broader VA Community Care environment. It does
              not determine whether a specific clinician is available today. ValorWell checks
              the current path after the veteran signs up.
            </p>
            <Accordion type="single" collapsible className="mt-10 space-y-4">
              <AccordionItem
                value="map"
                className="rounded-2xl border border-[#3B5147]/15 bg-[#F4F1E8] px-5"
              >
                <AccordionTrigger className="py-6 text-left hover:no-underline">
                  <span>
                    <span className="flex items-center gap-2 text-xl font-bold">
                      <Map className="h-5 w-5 text-[#3B5147]" />
                      How do I know what region I am in?
                    </span>
                    <span className="mt-2 block text-sm font-normal text-[#111814]/65">
                      Open the map to locate your state.
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-7">
                  <Placeholder
                    wide
                    title="United States VA Community Care regional map"
                    description="Show state boundaries and Regions 1–5. Keep the legend simple and direct veterans to sign up for current state availability."
                  />
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-5">
                      <p className="text-xs font-bold uppercase text-[#3B5147]">
                        Regions 1–3
                      </p>
                      <h3 className="mt-2 text-xl font-bold">
                        ValorWell may provide care directly
                      </h3>
                      <p className="mt-3 text-sm text-[#111814]/70">
                        Direct availability depends on whether an appropriate clinician is
                        currently available in the veteran's state.
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-5">
                      <p className="text-xs font-bold uppercase text-[#B24A3A]">
                        Regions 4–5
                      </p>
                      <h3 className="mt-2 text-xl font-bold">
                        ValorWell may provide care or connect the veteran
                      </h3>
                      <p className="mt-3 text-sm text-[#111814]/70">
                        Depending on current capacity, ValorWell may provide care directly or
                        connect the veteran with an eligible outside mental-health provider.
                      </p>
                    </div>
                  </div>
                  <Notice>
                    You do not need to understand the provider or payment pathway before asking
                    for help. Sign up and ValorWell will check the current options.
                  </Notice>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Eyebrow>The difference</Eyebrow>
            <Heading>Transaction-first versus care-connected.</Heading>
            <div className="mt-10 overflow-hidden rounded-2xl border border-[#3B5147]/15">
              <div className="grid grid-cols-2 bg-[#111814] text-white">
                <div className="border-r border-white/10 p-5 font-bold">
                  Transaction-first model
                </div>
                <div className="p-5 font-bold text-[#D7A92E]">
                  Operation Claims Success
                </div>
              </div>
              {comparison.map(([bad, good]) => (
                <div
                  key={bad}
                  className="grid grid-cols-2 border-t border-[#3B5147]/12"
                >
                  <div className="flex gap-3 border-r border-[#3B5147]/12 bg-[#F4F1E8] p-5 text-[#111814]/72">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-[#B24A3A]" />
                    {bad}
                  </div>
                  <div className="flex gap-3 bg-[#F4F1E8] p-5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3B5147]" />
                    {good}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id={FAQ} className="scroll-mt-28 border-b border-[#3B5147]/10 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Eyebrow>Plain language first</Eyebrow>
            <Heading>You should not need to learn a second language before asking for help.</Heading>
            <dl className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {glossary.map(([term, definition]) => (
                <div
                  key={term}
                  className="rounded-xl border border-[#3B5147]/15 bg-white p-5"
                >
                  <dt className="font-bold text-[#3B5147]">{term}</dt>
                  <dd className="mt-2 text-sm text-[#111814]/72">{definition}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-20">
              <Eyebrow>Questions veterans ask</Eyebrow>
              <Heading>Start with what applies to you.</Heading>
              <Accordion
                type="single"
                collapsible
                className="mt-10 space-y-3"
                onValueChange={(value) =>
                  value && track("ocs_faq_expand", { item: value })
                }
              >
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.value}
                    value={faq.value}
                    className="rounded-2xl border border-[#3B5147]/15 bg-white px-5"
                  >
                    <AccordionTrigger className="py-5 text-left hover:no-underline">
                      <span>
                        <span className="flex items-center gap-2 text-lg font-bold">
                          <CircleHelp className="h-4 w-4 text-[#3B5147]" />
                          {faq.question}
                        </span>
                        <span className="mt-1 block pr-4 text-sm font-normal text-[#111814]/62">
                          {faq.preview}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pb-6 text-[#111814]/72">
                      {faq.map && (
                        <Placeholder
                          wide
                          title="United States VA Community Care regional map"
                          description="Use the same final map as the regional section, with state boundaries and Regions 1–5."
                        />
                      )}
                      {faq.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {faq.bullets && (
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {faq.bullets.map((item) => (
                            <li key={item} className="flex gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3B5147]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {faq.strong && (
                        <p className="font-semibold text-[#111814]">{faq.strong}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 bg-[#3B5147] py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <Eyebrow light>For mental-health professionals</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold">
                Clinicians can help expand the legitimate path.
              </h2>
              <p className="mt-4 text-white/75">
                Provider participation options, requirements, and the OCS referral model are
                explained on the clinician recruiting page.
              </p>
            </div>
            <Link
              to="/clinicians"
              onClick={() => track("ocs_clinician_page")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#D7A92E] px-6 py-3 text-sm font-bold text-[#111814]"
            >
              View Clinician Opportunities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/10 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow>More than one way to help</Eyebrow>
              <Heading>What can you unlock?</Heading>
              <p className="mt-5 text-lg text-[#111814]/72">
                Organizations create trust. Supporters fund care when the normal VA payment
                path is unavailable. Creators and connectors help veterans find the legitimate
                path first.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                [
                  Users,
                  "I represent an organization",
                  "Educate, collaborate, introduce veterans, or improve the pathway.",
                ],
                [
                  HeartHandshake,
                  "I can support care",
                  "Help fund mental-health care when the normal VA payment path is unavailable.",
                ],
                [
                  Wrench,
                  "I can expand the system",
                  "Bring technology, media, reach, expertise, or a critical introduction.",
                ],
              ].map(([Icon, title, body]) => (
                <button
                  key={String(title)}
                  type="button"
                  onClick={() =>
                    go(FORM, `ocs_lane_${String(title).replace(/\W+/g, "_")}`)
                  }
                  className="rounded-2xl border border-[#3B5147]/15 bg-white p-6 text-left"
                >
                  <Icon className="h-6 w-6 text-[#3B5147]" />
                  <h3 className="mt-4 text-xl font-bold">{String(title)}</h3>
                  <p className="mt-3 text-sm text-[#111814]/68">{String(body)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3B5147]">
                    Find My Path <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          id={FORM}
          className="scroll-mt-28 border-b border-[#3B5147]/10 bg-white py-20 md:py-28"
        >
          <div
            className="mx-auto max-w-4xl px-4"
            data-billing-hub-form-host=""
          >
            <Eyebrow>Start here</Eyebrow>
            <Heading>Sign up so ValorWell can check your current path.</Heading>
            <p className="mt-5 text-lg text-[#111814]/72">
              Veterans in every region should sign up. ValorWell will review the state and
              situation and reach out within 48 hours. Organizations, supporters, creators, and
              connectors can use the same form to identify how they can help.
            </p>
            <p className="mt-4 text-sm text-[#111814]/65">
              Are you a clinician?{" "}
              <Link to="/clinicians" className="font-bold text-[#3B5147] underline">
                Use the clinician recruiting page.
              </Link>
            </p>
            <Notice>
              This is a routing form, not a clinical intake. Do not include medical records,
              Social Security numbers, VA file numbers, diagnoses, or detailed trauma
              information.
            </Notice>
            <div className="mt-10" />
          </div>
        </section>

        <section className="bg-[#111814] py-24 text-center text-white md:py-32">
          <div className="mx-auto max-w-5xl px-4">
            <Eyebrow light>Build the path. End the workaround.</Eyebrow>
            <h2 className="mt-5 text-4xl font-extrabold md:text-6xl">
              The system does not need another shortcut.
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-2xl font-semibold text-[#D7A92E]">
              It needs the pathway the shortcuts were compensating for.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
              OCS is building that path aggressively, transparently, at no cost to the veteran,
              and without promising an outcome no one outside the VA controls.
            </p>
            <button
              type="button"
              onClick={() => go(FORM, "ocs_final_signup")}
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#D7A92E] px-7 py-3.5 text-sm font-bold text-[#111814]"
            >
              Sign Up Now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      {sticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#3B5147]/15 bg-[#F4F1E8]/95 p-3 shadow-lg backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => go(FORM, "ocs_sticky_signup")}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#3B5147] px-5 py-3 text-sm font-bold text-white"
          >
            Check My Availability <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
