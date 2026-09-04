import type { MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseMedical,
  CalendarClock,
  FileHeart,
  HeartHandshake,
  Scale,
  Settings2,
  ShieldCheck,
  Stethoscope,
  Workflow,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO, JobPostingSchema, BreadcrumbSchema } from "@/components/SEO";
import { ClinicianInterestForm } from "@/components/forms/ClinicianInterestForm";
import { OverflowReferralSourceForm } from "@/components/forms/OverflowReferralSourceForm";

const scrollToInterest = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  document
    .getElementById("raise-your-hand")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)] md:text-xs">
    {children}
  </div>
);

const principles = [
  {
    title: "Your schedule remains yours",
    body: "Set sustainable availability without pressure to continually expand it.",
    icon: CalendarClock,
  },
  {
    title: "Your license still means something",
    body: "Clinical decisions remain with the independently licensed clinician.",
    icon: Scale,
  },
  {
    title: "The infrastructure works around care",
    body: "Billing, scheduling, documentation, and telehealth are built to reduce friction.",
    icon: Workflow,
  },
] as const;

const practiceQuestions = [
  {
    question: "Do you want autonomy without building an entire private practice?",
    icon: BriefcaseMedical,
  },
  {
    question:
      "Do you want to choose the populations, concerns, and hours you accept?",
    icon: Settings2,
  },
  {
    question:
      "Do you want your clinical judgment treated as professional judgment?",
    icon: Stethoscope,
  },
  {
    question:
      "Do you want technology to reduce documentation work instead of creating more?",
    icon: FileHeart,
  },
  {
    question:
      "Do you want sustainable boundaries treated as responsible practice?",
    icon: ShieldCheck,
  },
  {
    question: "Do you want broken workflows improved instead of normalized?",
    icon: Workflow,
  },
] as const;

const clinicianIdentity = [
  "They value autonomy and accountability.",
  "They protect their capacity so they can remain effective.",
  "They want systems that support care rather than obstruct it.",
  "They believe documentation should serve clinical work.",
  "They want to serve veterans and families without exploiting their claims.",
  "They would rather improve a system than continually complain about it.",
] as const;

export default function Clinicians() {
  return (
    <div className="clinicians-theme bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]">
      <Layout>
        <SEO
          title="Mental Health Clinician Opportunities — $75 per session"
          description="Explore ValorWell's telehealth clinician environment: $75 per completed session, weekly pay, flexible availability, billing support, clinical autonomy, and a veteran-focused mission."
          canonical="/clinicians"
        />
        <JobPostingSchema />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Clinicians", url: "/clinicians" },
          ]}
        />

        <section className="relative overflow-hidden border-b border-[color:var(--cl-evergreen)]/20">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[color:var(--cl-ember)]/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--cl-evergreen)]/10 blur-3xl" />
          </div>

          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Now Recruiting Licensed Mental-Health Clinicians</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.03] tracking-tight md:text-6xl lg:text-7xl">
                Help build the clinic clinicians keep saying should exist.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/85 md:text-xl">
                Clear pay. Flexible availability. Billing support. Clinical
                judgment that still belongs to the clinician. And a
                veteran-focused mission you can help shape while the operating
                model is still being built.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#raise-your-hand"
                  onClick={scrollToInterest}
                  className="inline-flex items-center justify-center gap-2 bg-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-canvas)] transition-colors hover:bg-[color:var(--cl-ink)]"
                >
                  Start My Onboarding
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  to="/mission"
                  className="inline-flex items-center justify-center border border-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-evergreen)] transition-colors hover:bg-[color:var(--cl-evergreen)] hover:text-[color:var(--cl-canvas)]"
                >
                  See the ValorWell Mission
                </Link>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--cl-ink)]/65">
                Independently licensed clinicians only. Current direct-clinician
                structure is telehealth-first 1099 contract work. Caseload volume
                is not guaranteed.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-ink)] p-7 text-[color:var(--cl-canvas)] shadow-xl md:p-9">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
                  The Actual Deal
                </div>
                <dl className="mt-6 divide-y divide-[color:var(--cl-canvas)]/15 border-y border-[color:var(--cl-canvas)]/15">
                  {[
                    ["Current pay", "$75 per completed session"],
                    ["Pay cadence", "Weekly"],
                    ["Schedule", "You set availability"],
                    ["Structure", "1099 · Telehealth-first"],
                    ["Billing", "Handled by ValorWell"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[1fr_auto] gap-5 py-5"
                    >
                      <dt className="text-sm font-semibold text-[color:var(--cl-canvas)]/65">
                        {label}
                      </dt>
                      <dd className="text-right text-base font-bold text-[color:var(--cl-canvas)] md:text-lg">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-[color:var(--cl-canvas)]/72">
                  You focus on care and timely documentation. ValorWell builds the
                  operational support around the work.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide grid md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <article
                  key={principle.title}
                  className={`py-9 md:px-8 md:py-11 ${
                    index > 0
                      ? "border-t border-[color:var(--cl-canvas)]/15 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <Icon
                    className="h-6 w-6 text-[color:var(--cl-ember)]"
                    aria-hidden="true"
                  />
                  <h2 className="mt-5 text-xl font-bold leading-tight md:text-2xl">
                    {principle.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-[color:var(--cl-canvas)]/72">
                    {principle.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>A Simple Gut Check</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Is this how you want to practice?
            </h2>
            <p className="mt-5 text-lg font-semibold text-[color:var(--cl-evergreen)]">
              Ask yourself:
            </p>

            <div className="mt-12 grid gap-px border border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)]/20 md:grid-cols-2 lg:grid-cols-3">
              {practiceQuestions.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.question}
                    className="bg-[color:var(--cl-canvas)] p-7 md:min-h-64 md:p-9"
                  >
                    <Icon
                      className="h-7 w-7 text-[color:var(--cl-ember)]"
                      aria-hidden="true"
                    />
                    <h3 className="mt-8 text-xl font-bold leading-snug md:text-2xl">
                      {item.question}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Eyebrow>The Clinicians Finding Their Way Here</Eyebrow>
                <h2 className="mt-6 max-w-5xl text-3xl font-bold leading-tight md:text-5xl">
                  The clinicians drawn to ValorWell are not looking for less
                  meaningful work. They are looking for a better environment in
                  which to do it.
                </h2>
                <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-canvas)]/75 md:text-xl">
                  They still care deeply about the person in front of them. They
                  also understand that good clinical work becomes difficult to
                  sustain when administrative burden, rigid systems, and pressure
                  to overextend are treated as normal.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="border-y border-[color:var(--cl-canvas)]/20">
                  {clinicianIdentity.map((statement) => (
                    <div
                      key={statement}
                      className="flex gap-4 border-b border-[color:var(--cl-canvas)]/15 py-5 last:border-b-0"
                    >
                      <HeartHandshake
                        className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--cl-ember)]"
                        aria-hidden="true"
                      />
                      <p className="text-base font-semibold leading-relaxed md:text-lg">
                        {statement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-14 max-w-4xl border-l-4 border-[color:var(--cl-ember)] pl-6 text-2xl font-bold leading-snug md:text-3xl">
              Clinicians who have been looking for this kind of environment tend
              to recognize it quickly.
            </p>
          </div>
        </section>

        <section
          id="raise-your-hand"
          className="scroll-mt-24 bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]"
        >
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)] md:text-xs">
                  Start With Interest
                </div>
                <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                  Interested in joining the clinicians building this with us?
                </h2>
                <p className="mt-7 text-lg leading-relaxed text-[color:var(--cl-canvas)]/78">
                  Share your contact information and we will create your onboarding
                  access. You can learn more about the clinical environment,
                  technology, mission, expectations, and application process before
                  deciding whether to continue.
                </p>
                <div className="mt-9 flex items-start gap-4 border-t border-[color:var(--cl-canvas)]/20 pt-7">
                  <ShieldCheck
                    className="h-6 w-6 shrink-0 text-[color:var(--cl-ember)]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-[color:var(--cl-canvas)]/68">
                    This is an initial expression of interest, not the full clinical
                    application or a promise of acceptance. The deeper qualification
                    process comes next.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ClinicianInterestForm />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-canvas)]">
          <div className="container-wide py-16 md:py-20">
            <OverflowReferralSourceForm />
          </div>
        </section>
      </Layout>
    </div>
  );
}
