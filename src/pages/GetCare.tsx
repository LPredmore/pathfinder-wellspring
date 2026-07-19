import { useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  HeartHandshake,
  HelpCircle,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

const PORTAL_URL = "https://client.valorwell.org";
const TRICARE_INTEREST_URL =
  "mailto:info@valorwell.org?subject=TRICARE%20mental%20health%20care%20interest";
const UNSURE_URL =
  "mailto:info@valorwell.org?subject=Help%20identifying%20my%20ValorWell%20care%20path";

type Audience = "veteran" | "family";
type Coverage = "champva" | "tricare" | "vaccn" | "unsure";
type PathTone = "active" | "limited" | "pending" | "help";

interface CoverageOption {
  value: Coverage;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

interface PathDetail {
  eyebrow: string;
  title: string;
  body: string;
  note: string;
  cta: string;
  href: string;
  external?: boolean;
  tone: PathTone;
}

const familyCoverage: CoverageOption[] = [
  {
    value: "champva",
    label: "CHAMPVA",
    description: "ValorWell's active general care pathway.",
    icon: CheckCircle2,
  },
  {
    value: "tricare",
    label: "TRICARE",
    description: "Tell us where the need exists while contracting continues.",
    icon: CircleAlert,
  },
];

const veteranCoverage: CoverageOption[] = [
  {
    value: "vaccn",
    label: "VA Community Care",
    description: "Requires VA authorization and an eligible clinician pathway.",
    icon: ShieldCheck,
  },
  {
    value: "tricare",
    label: "TRICARE",
    description: "Tell us where the need exists while contracting continues.",
    icon: CircleAlert,
  },
  {
    value: "unsure",
    label: "I'm Not Sure",
    description: "Start here and we will help identify the likely next step.",
    icon: HelpCircle,
  },
];

const pathDetails: Record<Coverage, PathDetail> = {
  champva: {
    eyebrow: "Active care pathway",
    title: "You can begin the CHAMPVA intake process now.",
    body: "ValorWell provides telehealth mental health care through CHAMPVA where state licensure, clinician availability, capacity, pathway verification, and clinical fit align.",
    note: "ValorWell bills CHAMPVA directly. CHAMPVA cost share or other patient responsibility may still apply.",
    cta: "Start CHAMPVA Intake",
    href: PORTAL_URL,
    external: true,
    tone: "active",
  },
  tricare: {
    eyebrow: "Pathway not active yet",
    title: "ValorWell is still completing the TRICARE contracting pathway.",
    body: "We will not describe TRICARE care as available before the required contracting and activation work is complete. You can tell us you need this pathway so we can understand where demand is strongest.",
    note: "Submitting interest is not an appointment request and does not guarantee future network participation or availability.",
    cta: "Tell Us You Need TRICARE",
    href: TRICARE_INTEREST_URL,
    external: true,
    tone: "pending",
  },
  vaccn: {
    eyebrow: "Limited and region-specific",
    title: "VA Community Care begins with a legitimate authorization and provider path.",
    body: "Availability depends on your VA referral or authorization, state, region, an eligible registered clinician, capacity, and clinical fit. Operation Claims Success explains the current pathway and provides the appropriate place to raise your hand.",
    note: "ValorWell does not guarantee VA authorization, referral, placement, disability outcomes, claim approval, or any VA outcome.",
    cta: "Check the VA Community Care Path",
    href: "/operation-claims-success#ocs-routing-form",
    tone: "limited",
  },
  unsure: {
    eyebrow: "You do not need to know the answer yet",
    title: "We can help you identify which care path may apply.",
    body: "Tell us what you know about your veteran status, current coverage, and whether the VA has discussed Community Care with you. We will point you toward the most appropriate current next step.",
    note: "ValorWell's current care pathways are limited to veterans and veteran family members and remain subject to coverage, authorization, licensure, availability, capacity, and clinical fit.",
    cta: "Ask for Pathway Help",
    href: UNSURE_URL,
    external: true,
    tone: "help",
  },
};

const serviceGroups = [
  {
    title: "Anxiety, depression, grief, and stress",
    body: "Care for the mental health concerns that can make work, relationships, sleep, and ordinary life feel heavier than they should.",
  },
  {
    title: "Trauma and PTSD-related concerns",
    body: "Therapy that respects the pace, context, and complexity of experiences that do not simply disappear when service ends.",
  },
  {
    title: "Military-family and caregiver strain",
    body: "Support for spouses, caregivers, parents, and families carrying responsibilities that are often invisible to everyone else.",
  },
  {
    title: "Children and teens",
    body: "Care for young people navigating anxiety, mood, school, family change, deployment-related stress, or military-connected life.",
  },
  {
    title: "Identity, transition, and daily overwhelm",
    body: "A place to work through burnout, life transitions, relationship strain, purpose, and the emotional weight of holding everything together.",
  },
];

const faqs = [
  {
    q: "Who does ValorWell currently serve?",
    a: "ValorWell's current care pathways are designed for veterans and veteran family members. Care remains subject to coverage or authorization, state licensure, clinician availability, capacity, clinical fit, and the services ValorWell provides.",
  },
  {
    q: "Does selecting a coverage option guarantee care?",
    a: "No. The selector identifies the appropriate next pathway. Actual care depends on coverage or authorization, state, clinician licensure, availability, capacity, and clinical fit.",
  },
  {
    q: "How does CHAMPVA payment work?",
    a: "ValorWell bills CHAMPVA directly for eligible telehealth mental health services. CHAMPVA cost share or other patient responsibility may apply depending on the person's coverage and situation.",
  },
  {
    q: "Can veterans use ValorWell through VA Community Care?",
    a: "VA Community Care is limited and region-specific. It requires an actual VA referral or authorization and an eligible clinician pathway. Availability is not guaranteed and varies by state, region, clinician registration, capacity, and fit.",
  },
  {
    q: "Can I use TRICARE at ValorWell?",
    a: "Not currently. ValorWell is still working through the required TRICARE contracting pathway and will not describe it as active before activation is complete.",
  },
  {
    q: "Is care provided through telehealth?",
    a: "Yes. ValorWell is telehealth-first. Care is provided by licensed clinicians and remains subject to the clinician being licensed in the state where the client is physically located.",
  },
  {
    q: "What services are not provided?",
    a: "ValorWell does not currently provide psychiatry, medication management, psychological testing, inpatient care, or crisis services.",
  },
  {
    q: "What if I am in crisis?",
    a: "ValorWell is not a crisis service. Call or text 988 for immediate support. Veterans and their loved ones can call 988 and press 1, or text 838255.",
  },
];

const toneClasses: Record<PathTone, string> = {
  active:
    "border-[color:var(--cl-evergreen)]/35 bg-[color:var(--cl-evergreen)]/8",
  limited: "border-[color:var(--cl-ember)]/35 bg-[color:var(--cl-ember)]/7",
  pending: "border-[color:var(--cl-ink)]/20 bg-[color:var(--cl-ink)]/5",
  help: "border-[color:var(--cl-evergreen)]/25 bg-white/60",
};

function PathAction({ detail }: { detail: PathDetail }) {
  const className =
    "group inline-flex min-h-12 items-center justify-center gap-2 bg-[color:var(--cl-ember)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-canvas)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cl-ember)] focus-visible:ring-offset-2";

  if (detail.external) {
    return (
      <a href={detail.href} className={className}>
        {detail.cta}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <Link to={detail.href} className={className}>
      {detail.cta}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function GetCare() {
  const [audience, setAudience] = useState<Audience | null>(null);
  const [coverage, setCoverage] = useState<Coverage | null>(null);

  const coverageOptions = audience === "family" ? familyCoverage : veteranCoverage;
  const selectedDetail = coverage ? pathDetails[coverage] : null;

  const chooseAudience = (value: Audience) => {
    setAudience(value);
    setCoverage(null);
  };

  return (
    <Layout>
      <SEO
        title="Mental Health Care for Veterans and Veteran Families"
        description="Find the appropriate ValorWell mental health care pathway for veterans and veteran family members using CHAMPVA, TRICARE, or VA Community Care."
        canonical="/get-care"
      />
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Get Care", url: "/get-care" }]}
      />

      <div className="clinicians-theme bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]">
        <div className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide flex flex-col gap-3 py-3 text-sm md:flex-row md:items-center md:justify-between">
            <p className="leading-snug">
              <span className="font-semibold">Need immediate support right now?</span>{" "}
              ValorWell is not a crisis service. Call or text 988. Veterans and
              their loved ones can call 988 and press 1 or text 838255.
            </p>
            <a
              href="tel:988"
              className="inline-flex shrink-0 items-center gap-2 border border-[color:var(--cl-canvas)]/40 px-3 py-1.5 hover:bg-[color:var(--cl-canvas)]/10"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call or Text 988
            </a>
          </div>
        </div>

        <section className="relative overflow-hidden border-b border-[color:var(--cl-ink)]/10">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[color:var(--cl-evergreen)]/10 blur-3xl" />
            <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-[color:var(--cl-ember)]/8 blur-3xl" />
          </div>

          <div className="container-wide relative py-14 md:py-20">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--cl-ember)]">
                Mental health care for veterans and veteran families
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-[1.04] md:text-6xl">
                Start with who needs care. We will help with the rest.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/78 md:text-xl">
                You should not need to decode every program before you can take a
                first step. Answer two questions and we will show you the most
                appropriate current ValorWell pathway.
              </p>
            </div>

            <div
              id="find-your-path"
              className="mt-10 border border-[color:var(--cl-ink)]/15 bg-white/70 p-5 shadow-xl backdrop-blur-sm md:p-8"
            >
              <div className="flex flex-col gap-2 border-b border-[color:var(--cl-ink)]/10 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
                    Find your care path
                  </p>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    Who needs care?
                  </h2>
                </div>
                <p className="text-sm text-[color:var(--cl-ink)]/60">
                  ValorWell currently serves veterans and veteran family members.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  {
                    value: "veteran" as const,
                    label: "I am a veteran",
                    description:
                      "Continue to VA Community Care, TRICARE, or help identifying the right path.",
                    icon: UserRound,
                  },
                  {
                    value: "family" as const,
                    label: "I am a veteran's family member",
                    description: "Continue to CHAMPVA or TRICARE.",
                    icon: Users,
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => chooseAudience(option.value)}
                    aria-pressed={audience === option.value}
                    className={`flex min-h-36 items-start gap-4 border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cl-evergreen)] focus-visible:ring-offset-2 md:p-6 ${
                      audience === option.value
                        ? "border-[color:var(--cl-evergreen)] bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)] shadow-md"
                        : "border-[color:var(--cl-ink)]/15 bg-[color:var(--cl-canvas)] hover:-translate-y-0.5 hover:border-[color:var(--cl-evergreen)]/50 hover:shadow-md"
                    }`}
                  >
                    <option.icon
                      className={`mt-1 h-6 w-6 shrink-0 ${
                        audience === option.value
                          ? "text-[color:var(--cl-ember)]"
                          : "text-[color:var(--cl-evergreen)]"
                      }`}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-lg font-bold md:text-xl">
                        {option.label}
                      </span>
                      <span
                        className={`mt-2 block text-sm leading-relaxed ${
                          audience === option.value
                            ? "text-[color:var(--cl-canvas)]/75"
                            : "text-[color:var(--cl-ink)]/65"
                        }`}
                      >
                        {option.description}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {audience ? (
                <div className="mt-8 border-t border-[color:var(--cl-ink)]/10 pt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
                    Step 2
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">
                    Which coverage or pathway are you using?
                  </h3>
                  <div
                    className={`mt-5 grid gap-4 ${
                      coverageOptions.length === 2
                        ? "md:grid-cols-2"
                        : "md:grid-cols-3"
                    }`}
                  >
                    {coverageOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setCoverage(option.value)}
                        aria-pressed={coverage === option.value}
                        className={`flex min-h-32 flex-col justify-between border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cl-ember)] focus-visible:ring-offset-2 ${
                          coverage === option.value
                            ? "border-[color:var(--cl-ember)] bg-[color:var(--cl-ember)] text-[color:var(--cl-canvas)] shadow-md"
                            : "border-[color:var(--cl-ink)]/15 bg-white hover:-translate-y-0.5 hover:border-[color:var(--cl-ember)]/45 hover:shadow-md"
                        }`}
                      >
                        <option.icon
                          className={`h-5 w-5 ${
                            coverage === option.value
                              ? "text-[color:var(--cl-canvas)]"
                              : "text-[color:var(--cl-evergreen)]"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="mt-5">
                          <span className="block text-lg font-bold">
                            {option.label}
                          </span>
                          <span
                            className={`mt-1 block text-sm leading-relaxed ${
                              coverage === option.value
                                ? "text-[color:var(--cl-canvas)]/78"
                                : "text-[color:var(--cl-ink)]/62"
                            }`}
                          >
                            {option.description}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {selectedDetail ? (
                <div
                  aria-live="polite"
                  className={`mt-8 border p-6 md:p-8 ${toneClasses[selectedDetail.tone]}`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
                    {selectedDetail.eyebrow}
                  </p>
                  <h3 className="mt-3 max-w-3xl text-2xl font-bold leading-tight md:text-3xl">
                    {selectedDetail.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-[color:var(--cl-ink)]/78 md:text-lg">
                    {selectedDetail.body}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[color:var(--cl-ink)]/62">
                    {selectedDetail.note}
                  </p>
                  <div className="mt-7">
                    <PathAction detail={selectedDetail} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--cl-ember)]">
                The part nobody should have to carry alone
              </p>
              <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                Getting mental health care should not become another system you
                have to fight.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-canvas)]/78">
                Veterans and military families already navigate enough acronyms,
                authorizations, directories, transitions, and unanswered calls.
                The path to care should reduce that weight—not add another project
                to the pile.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="border border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-canvas)]/5 p-7">
                <HeartHandshake
                  className="h-8 w-8 text-[color:var(--cl-ember)]"
                  aria-hidden="true"
                />
                <p className="mt-5 text-xl font-bold leading-snug">
                  Real support means helping someone reach the next real step.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[color:var(--cl-ink)]/10">
          <div className="container-wide py-20 md:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--cl-ember)]">
              Real therapy for real life
            </p>
            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Care for the person—not just the coverage pathway.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/75">
              ValorWell provides telehealth therapy for children, teens, adults,
              couples, and families across a broad range of mental health needs,
              subject to clinician scope, licensure, availability, capacity,
              coverage or authorization, and clinical fit.
            </p>

            <div className="mt-14 grid gap-px bg-[color:var(--cl-ink)]/15 md:grid-cols-2 lg:grid-cols-3">
              {serviceGroups.map((group) => (
                <article
                  key={group.title}
                  className="bg-[color:var(--cl-canvas)] p-7 md:p-8"
                >
                  <h3 className="text-xl font-bold leading-tight md:text-2xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[color:var(--cl-ink)]/72">
                    {group.body}
                  </p>
                </article>
              ))}
              <div className="bg-[color:var(--cl-canvas)] p-7 text-sm leading-relaxed text-[color:var(--cl-ink)]/58 md:p-8">
                ValorWell does not currently provide psychiatry, medication
                management, psychological testing, inpatient care, or crisis
                services.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--cl-ember)]">
              One clear place to start
            </p>
            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Identify the path. Verify what is real. Move toward care.
            </h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Tell us who needs care",
                  body: "Veteran or veteran family member. That determines which coverage choices are relevant.",
                },
                {
                  title: "Choose the current pathway",
                  body: "CHAMPVA, TRICARE, VA Community Care, or help identifying which one may apply.",
                },
                {
                  title: "Take the honest next step",
                  body: "Begin intake where care is active or enter the appropriate interest, authorization, or pathway process where it is not.",
                },
              ].map((step, index) => (
                <li
                  key={step.title}
                  className="border-t border-[color:var(--cl-canvas)]/22 pt-5"
                >
                  <p className="font-mono text-sm text-[color:var(--cl-ember)]">
                    STEP {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[color:var(--cl-canvas)]/72">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[color:var(--cl-canvas)]">
          <div className="container-narrow py-20 md:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--cl-ember)]">
              Questions
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
              Clear answers before the next step.
            </h2>
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${index}`}
                  className="border-b border-[color:var(--cl-ink)]/18"
                >
                  <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:no-underline md:text-xl">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-[color:var(--cl-ink)]/76">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 text-center md:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--cl-ember)]">
              Start where you are
            </p>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              You do not need every answer before taking the first step.
            </h2>
            <div className="mt-9">
              <a
                href="#find-your-path"
                className="inline-flex min-h-12 items-center gap-2 bg-[color:var(--cl-ember)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-canvas)] hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
              >
                Find Your Care Path <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
