import { Layout } from "@/components/layout";
import { SEO, JobPostingSchema, BreadcrumbSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { TherapistApplicationForm } from "@/components/forms/TherapistApplicationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const scrollToApplication = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("raise-your-hand");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
    {children}
  </div>
);

const Rule = () => (
  <div className="h-px w-full bg-[color:var(--cl-evergreen)]/25" />
);

const PrimaryCTA = ({
  children,
  onClick,
  href = "#raise-your-hand",
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
}) => (
  <a
    href={href}
    onClick={onClick ?? scrollToApplication}
    className="inline-flex items-center justify-center bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)] px-7 py-4 text-sm font-bold tracking-wide uppercase hover:bg-[color:var(--cl-ink)] transition-colors"
  >
    {children}
  </a>
);

const SecondaryCTA = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center border border-[color:var(--cl-evergreen)] text-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold tracking-wide uppercase hover:bg-[color:var(--cl-evergreen)] hover:text-[color:var(--cl-canvas)] transition-colors"
  >
    {children}
  </Link>
);

const faqItems: { q: string; a: string }[] = [
  {
    q: "Is this full time?",
    a: "No. This is 1099 contractor work. You set your own availability and can start with as little as a few sessions per month if that is what is sustainable for you.",
  },
  {
    q: "How much does ValorWell pay clinicians?",
    a: "$75 per completed session, paid weekly.",
  },
  {
    q: "Will ValorWell fill my caseload?",
    a: "No. We are building the clinician network before pretending demand is perfectly matched in every state. Some clinicians may begin with only a few sessions per month. If you need a guaranteed full caseload right now, this probably is not the right opportunity.",
  },
  {
    q: "Is the work remote?",
    a: "Yes. ValorWell is telehealth-first.",
  },
  {
    q: "Do I handle billing and collections?",
    a: "No. ValorWell handles billing workflows so you can focus on the clinical work.",
  },
  {
    q: "Do I control my schedule?",
    a: "Yes. You set realistic availability. We do not chase you for more hours or push you past what is sustainable.",
  },
  {
    q: "Will someone tell me exactly how to treat every client?",
    a: "No. Clinical judgment matters within ethical and professional standards. We are not building a script factory.",
  },
  {
    q: "Do I have to accept every client?",
    a: "No. Your scope, comfort, and clinical fit come first. You are not expected to practice outside your training.",
  },
  {
    q: "Are clinicians expected to write Nexus Letters on demand?",
    a: "No. Documentation is not produced on demand. Ethical documentation happens only when it is clinically appropriate, and it is the clinician's decision. ValorWell does not guarantee VA authorization, referrals, Nexus Letters, disability ratings, service connection, claim approval, or any VA outcome.",
  },
  {
    q: "Why veterans and families?",
    a: "Veterans and their families are navigating fragmented care pathways, VA-aligned systems, delays, and a documentation economy that too often puts the letter before the person. We want to build the care-first alternative — and we need clinicians who want to help build it.",
  },
  {
    q: "What license types are currently included?",
    a: "We are currently onboarding common independent clinical licenses across mental health disciplines. If you are licensed to treat in a way that insurance will accept, we can use you.",
  },
];

export default function Clinicians() {
  return (
    <div className="clinicians-theme bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]">
      <Layout>
        <SEO
          title="Mental Health Clinician Opportunities — $75 per session"
          description="Join ValorWell as a telehealth mental-health clinician. $75 per completed session, paid weekly, flexible availability, billing support, clinical autonomy, and an opportunity to help shape a veteran-focused care mission."
          canonical="/clinicians"
        />
        <JobPostingSchema />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Clinicians", url: "/clinicians" },
          ]}
        />

        {/* HERO */}
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
              <Eyebrow>
                Now Recruiting Licensed Mental-Health Clinicians
              </Eyebrow>
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
                <PrimaryCTA>Apply to Join ValorWell</PrimaryCTA>
                <SecondaryCTA to="/operation-claims-success">
                  See the Veteran Mission
                </SecondaryCTA>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--cl-ink)]/65">
                Independently licensed clinicians only. Current direct-clinician
                structure is telehealth-first 1099 contract work. Caseload
                volume is not guaranteed.
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
                  You focus on care and timely documentation. ValorWell builds
                  the operational support around the work.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* RECRUITING FOCUS */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>What Matters Before the Mission Pitch</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Meaningful work is not enough if the structure makes the work
              unsustainable.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/80 md:text-xl">
              Clinicians compare compensation, control, administrative burden,
              caseload reality, professional support, and whether the
              organization respects the license. So those answers should not be
              hidden behind a recruiter call.
            </p>

            <div className="mt-14 grid gap-px border border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)]/20 md:grid-cols-2 lg:grid-cols-3">
              {[
                [
                  "Pay you can see",
                  "$75 per completed session, paid weekly. The current rate is public before you apply.",
                ],
                [
                  "A schedule you control",
                  "Start with a few sessions or create more capacity as the work grows. You set realistic availability.",
                ],
                [
                  "Less administrative drag",
                  "ValorWell handles the billing workflow and builds scheduling, documentation, and telehealth tools around care.",
                ],
                [
                  "Honest caseload expectations",
                  "Demand varies by state and pathway. We will not promise a full caseload before the referrals exist.",
                ],
                [
                  "Clinical support",
                  "Get support from people who understand clinical care, veteran-specific issues, and ethical documentation.",
                ],
                [
                  "A mission with substance",
                  "Help veterans reach legitimate care without turning treatment or disability documentation into a transaction.",
                ],
              ].map(([title, body], index) => (
                <article
                  key={title}
                  className="bg-[color:var(--cl-canvas)] p-7 md:p-9"
                >
                  <p className="text-xs font-bold text-[color:var(--cl-ember)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-xl font-bold leading-tight md:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[color:var(--cl-ink)]/75">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EARLY COHORT */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)] md:text-xs">
                  The Early-Clinician Advantage
                </div>
                <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                  Join after the system is finished and you inherit it. Join
                  during the build and you can influence it.
                </h2>
              </div>
              <p className="lg:col-span-4 text-lg leading-relaxed text-[color:var(--cl-canvas)]/78">
                The clinicians joining now have the strongest opportunity to
                shape the culture, workflows, documentation standards, and
                technology later clinicians will experience as established
                practice.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                [
                  "Shape the tools",
                  "Identify friction in the EHR, notes, calendar, telehealth, and scheduling while changes are still easier to make.",
                ],
                [
                  "Shape the culture",
                  "Help establish what clinician autonomy, accountability, support, and ethical documentation mean in practice.",
                ],
                [
                  "Shape the mission",
                  "Help build a legitimate care pathway for veterans before the network and standards become settled infrastructure.",
                ],
              ].map(([title, body]) => (
                <article
                  key={title}
                  className="border border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-canvas)]/5 p-7 md:p-9"
                >
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-4 leading-relaxed text-[color:var(--cl-canvas)]/75">
                    {body}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-12 max-w-4xl text-2xl font-bold leading-snug md:text-3xl">
              This is not artificial scarcity. It is the practical difference
              between helping write the standards and joining after they are
              written.
            </p>
          </div>
        </section>

        {/* MISSION */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>The Mission Right Now</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              Veterans deserve a better path. We need clinicians who want to
              help build it.
            </h2>
            <div className="mt-8 space-y-5 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/85">
              <p>
                Veterans and families are forced to navigate confusing mental
                health care pathways, VA-aligned systems, delays, and an
                expensive documentation ecosystem that can put the letter before
                the person.
              </p>
              <p className="font-semibold text-[color:var(--cl-ink)]">
                ValorWell is building a care-first alternative.
              </p>
              <p>
                Operation Claims Success connects honest access education, real
                mental health care, stronger provider pathways, and ethical
                documentation when clinically appropriate.
              </p>
              <p className="font-semibold text-[color:var(--cl-ink)]">
                Care first. Clinician judgment still matters.
              </p>
            </div>

            <div className="mt-14 space-y-0">
              {[
                { n: "01", t: "Real care has to exist." },
                { n: "02", t: "Provider capacity has to grow." },
                {
                  n: "03",
                  t: "Ethical documentation needs clinicians, not a letter factory.",
                },
              ].map((b) => (
                <div
                  key={b.n}
                  className="grid grid-cols-12 gap-6 items-baseline py-7 border-t border-[color:var(--cl-evergreen)]/25 last:border-b last:border-b-[color:var(--cl-evergreen)]/25"
                >
                  <div className="col-span-3 md:col-span-2 text-3xl md:text-5xl font-bold text-[color:var(--cl-ember)] tabular-nums">
                    {b.n}
                  </div>
                  <div className="col-span-9 md:col-span-10 text-2xl md:text-3xl font-bold leading-snug">
                    {b.t}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
              <SecondaryCTA to="/operation-claims-success">
                Explore Operation Claims Success
              </SecondaryCTA>
              <p className="text-xs md:text-sm text-[color:var(--cl-ink)]/60 max-w-xl">
                ValorWell does not guarantee VA authorization, referrals, Nexus
                Letters, disability ratings, service connection, claim approval,
                or any VA outcome.
              </p>
            </div>
          </div>
        </section>

        {/* RADICAL HONESTY */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
              No Bait-and-Switch
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              Here is the actual deal.
            </h2>
            <div className="mt-8 space-y-5 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-canvas)]/85">
              <p>
                ValorWell is building the clinician network before pretending
                demand is perfectly matched in every state.
              </p>
              <p>
                Some clinicians may begin with only a few sessions per month.
              </p>
              <p>
                If you need someone to promise a full caseload next month, this
                is probably not the right opportunity. We are looking for people
                invested in the long-term mission.
              </p>
            </div>

            <div className="mt-14 grid md:grid-cols-2 gap-10">
              <div>
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
                  We Are Not Promising
                </div>
                <ul className="mt-6 space-y-4 text-lg text-[color:var(--cl-canvas)]/80">
                  {[
                    "Instant full caseload.",
                    "Guaranteed referral volume.",
                    "A perfectly finished company.",
                    "Documentation on demand.",
                    "Guaranteed VA outcomes.",
                  ].map((l, i) => (
                    <li
                      key={i}
                      className="pb-4 border-b border-[color:var(--cl-canvas)]/15 line-through decoration-[color:var(--cl-ember)]/70 decoration-2"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-canvas)]">
                  We Are Offering
                </div>
                <ul className="mt-6 space-y-4 text-lg font-medium text-[color:var(--cl-canvas)]">
                  {[
                    "Telehealth-first 1099 work.",
                    "$75 per completed session.",
                    "Weekly pay.",
                    "Availability you set.",
                    "Billing workflows handled by ValorWell.",
                    "You decide which patients you see. No push-back",
                    "Complete support by a team of clinicians, not admins",
                    "Clinical judgment respected within ethical standards.",
                  ].map((l, i) => (
                    <li
                      key={i}
                      className="pb-4 border-b border-[color:var(--cl-canvas)]/20"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-14 text-2xl md:text-3xl font-bold leading-snug max-w-4xl">
              We would rather lose the wrong applicant on this page than
              disappoint the right clinician after onboarding.
            </p>
          </div>
        </section>

        {/* AUTONOMY */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>Autonomy Needs Infrastructure</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              We are not asking you to build a private practice from scratch
              just to get your clinical judgment back.
            </h2>

            <div className="mt-14 grid md:grid-cols-2 gap-0 border-t border-[color:var(--cl-evergreen)]/25">
              {[
                {
                  n: "",
                  t: "Your availability is yours",
                  d: "You decide how many patients you see and when. Set the ages, presentations, and hours you'll accept. Nobody guilt-trips you into more.",
                },
                {
                  n: "",
                  t: "Your license still means something",
                  d: "State and national boards already decided you're qualified. We trust their judgment more than a manager's. Your calls stay your calls.",
                },
                {
                  n: "",
                  t: "Billing is not your second job",
                  d: "ValorWell handles the billing workflow. You see the patient, document in the EHR we built for you, and move on with your day.",
                },
                {
                  n: "",
                  t: "Systems should give time back",
                  d: "You provide the care. We handle everything sitting between you and the person in front of you.",
                },
              ].map((m, i) => (
                <div
                  key={m.n}
                  className={`p-8 md:p-10 border-b border-[color:var(--cl-evergreen)]/25 ${i % 2 === 0 ? "md:border-r" : ""}`}
                >
                  <div className="text-2xl font-bold text-[color:var(--cl-ember)] tabular-nums">
                    {m.n}
                  </div>
                  <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
                    {m.t}
                  </h3>
                  <p className="mt-3 text-lg text-[color:var(--cl-ink)]/80 leading-relaxed">
                    {m.d}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-xl md:text-2xl font-semibold text-[color:var(--cl-evergreen)] max-w-3xl">
              Clear boundaries. You are not expected to practice outside your
              scope or accept every type of client.
            </p>
          </div>
        </section>

        {/* EHR SHOWCASE */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
              The EHR We Actually Built For Ourselves
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              We didn't buy an EHR. We built the one clinicians kept describing
              in interviews.
            </h2>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-[color:var(--cl-canvas)]/85 max-w-3xl">
              Every feature in here exists because a clinician said "why does
              this take forty minutes?" — and we agreed with them. This is not a
              rebranded template. It's custom infrastructure that keeps getting
              better because the clinicians using it are in the room while we
              build it.
            </p>

            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[color:var(--cl-canvas)]/20">
              {[
                {
                  t: "AI notes that speak human first",
                  d: 'Type in plain language after session — "client came in dysregulated, we worked on grounding, homework was..." — and the system converts it into a fully compliant, clinically appropriate note. You edit. You don\'t author from scratch.',
                },
                {
                  t: "Notes that already know the plan",
                  d: "Every daily note surfaces the treatment goals and interventions inline. No second tab. No hunting through the chart mid-session to remember what you're working on.",
                },
                {
                  t: "Two-way secure calendar sync",
                  d: "Your real calendar and ValorWell stay in lockstep — both directions, always current, PHI protected. Block personal time once and your availability updates without you touching it.",
                },
                {
                  t: "Auto-scheduling inside your guardrails",
                  d: "Set the rules once — ages, presenting concerns, hours, weekly cap. Patients self-book within them. You stop being your own receptionist.",
                },
                {
                  t: "Telehealth built in, not bolted on",
                  d: 'Video, waiting room, session, and chart on one screen. No third-party link. No "can you see my screen?" No context switching mid-session.',
                },
                {
                  t: "Availability you actually control",
                  d: "Turn the tap up or down any week. No begging. No guilt calls from a scheduler asking if you can squeeze in three more.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-8 md:p-10 border-b border-r border-[color:var(--cl-canvas)]/20"
                >
                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-[color:var(--cl-canvas)]">
                    {f.t}
                  </h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed text-[color:var(--cl-canvas)]/80">
                    {f.d}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-14 text-2xl md:text-3xl font-bold leading-snug max-w-4xl text-[color:var(--cl-canvas)]">
              This is what "dedicated to our clinicians" looks like when it's
              not just a slide in a pitch deck.
            </p>
          </div>
        </section>

        {/* FIT */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              We care about your license. We care even more about what kind of
              clinician you are trying not to become.
            </h2>

            <div className="mt-14 grid md:grid-cols-2 gap-12">
              <div>
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-evergreen)]">
                  You may be our person if
                </div>
                <ul className="mt-6 space-y-4 text-lg">
                  {[
                    "You still care about the person.",
                    "You want your judgment treated as judgment.",
                    "You want to serve veterans and families.",
                    "You can commit something consistently.",
                    "You are comfortable building as we grow.",
                    "You'd rather fix a system than complain.",
                  ].map((l, i) => (
                    <li
                      key={i}
                      className="pb-4 border-b border-[color:var(--cl-evergreen)]/25"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
                  This will not be the right fit for every clinician. Good.
                </div>
                <p className="mt-6 text-lg text-[color:var(--cl-ink)]/80">
                  Not a fit if you:
                </p>
                <ul className="mt-4 space-y-4 text-lg">
                  {[
                    "Need guaranteed full-time volume.",
                    "Want a rigid script for every client.",
                    "Want documentation produced on demand.",
                    "Think autonomy means no accountability.",
                    "See veterans only as a lead source.",
                  ].map((l, i) => (
                    <li
                      key={i}
                      className="pb-4 border-b border-[color:var(--cl-evergreen)]/25 text-[color:var(--cl-ink)]/75"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-14 text-2xl md:text-3xl font-bold leading-snug max-w-3xl">
              But if you read that list and thought,{" "}
              <span className="italic text-[color:var(--cl-ember)]">
                Exactly
              </span>
              —we should probably talk.
            </p>
          </div>
        </section>

        {/* PRACTICAL TERMS */}
        <section
          id="practical-terms"
          className="border-b border-[color:var(--cl-evergreen)]/20 scroll-mt-24"
        >
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>Pay Without the Recruiting Fog</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Mission does not pay your bills. The structure still has to make
              sense.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/80">
              The examples below use the current $75 completed-session rate.
              They are gross contractor earnings before taxes and are not
              promises of referral volume.
            </p>

            <div className="mt-12 grid gap-10 lg:grid-cols-12">
              <dl className="border-t border-[color:var(--cl-evergreen)]/25 lg:col-span-7">
                {[
                  ["Pay per session", "$75 per completed session"],
                  ["Pay cadence", "Paid weekly"],
                  ["Schedule", "You set your availability"],
                  [
                    "Caseload",
                    "No guaranteed volume; grow as demand and fit align",
                  ],
                  ["Format", "Telehealth-first"],
                  ["Classification", "1099 contractor"],
                  ["Billing", "Billing workflow handled by ValorWell"],
                  [
                    "Clinical scope",
                    "You control the populations and concerns you accept",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-12 gap-5 border-b border-[color:var(--cl-evergreen)]/25 py-5"
                  >
                    <dt className="col-span-5 text-sm font-bold uppercase tracking-wider text-[color:var(--cl-evergreen)] md:col-span-4">
                      {label}
                    </dt>
                    <dd className="col-span-7 text-lg font-semibold md:col-span-8 md:text-xl">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <aside className="bg-[color:var(--cl-ink)] p-7 text-[color:var(--cl-canvas)] lg:col-span-5 md:p-9">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)]">
                  Current Rate Examples
                </div>
                <dl className="mt-6 divide-y divide-[color:var(--cl-canvas)]/15 border-y border-[color:var(--cl-canvas)]/15">
                  {[
                    ["5 sessions/week", "$375 gross/week"],
                    ["10 sessions/week", "$750 gross/week"],
                    ["15 sessions/week", "$1,125 gross/week"],
                    ["20 sessions/week", "$1,500 gross/week"],
                  ].map(([sessions, earnings]) => (
                    <div
                      key={sessions}
                      className="grid grid-cols-[1fr_auto] gap-4 py-5"
                    >
                      <dt className="text-[color:var(--cl-canvas)]/70">
                        {sessions}
                      </dt>
                      <dd className="font-bold">{earnings}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-[color:var(--cl-canvas)]/65">
                  The current contract rate applies to completed sessions. No
                  specific weekly caseload is promised.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* APPLICATION HANDOFF */}
        <section
          id="raise-your-hand"
          className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)] scroll-mt-24"
        >
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)] md:text-xs">
                  Raise Your Hand
                </div>
                <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                  The early clinician network is being assembled now.
                </h2>
                <div className="mt-7 space-y-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/80">
                  <p>
                    Tell us where you are licensed, how much capacity you want
                    to create, and what made this opportunity worth exploring.
                  </p>
                  <p>
                    You may apply to join ValorWell directly or to accept
                    appropriate OCS referrals through your own independently
                    VACCN-connected practice.
                  </p>
                </div>
                <p className="mt-8 text-sm leading-relaxed text-[color:var(--cl-canvas)]/65">
                  Applications are reviewed for licensure, operational need,
                  clinical scope, current state pathways, and mission fit.
                  Submission is not automatic acceptance.
                </p>
              </div>

              <div
                id="clinician-application-slot"
                aria-label="Clinician application"
                className="lg:col-span-7"
              >
                <TherapistApplicationForm />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>What Happens Next</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              Four steps. No mystery recruiting maze.
            </h2>

            <ol className="mt-14 grid md:grid-cols-4 gap-0 border-t border-[color:var(--cl-evergreen)]/25">
              {[
                "Raise your hand.",
                "We review actual fit.",
                "Have a clear conversation.",
                "Start as availability and pathways align.",
              ].map((step, i, arr) => (
                <li
                  key={i}
                  className={`p-8 border-b border-[color:var(--cl-evergreen)]/25 ${
                    i < arr.length - 1 ? "md:border-r" : ""
                  }`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[color:var(--cl-ember)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="mt-3 text-xl font-semibold leading-snug">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-xl md:text-2xl font-semibold text-[color:var(--cl-evergreen)] max-w-3xl">
              We would rather set expectations clearly before onboarding than
              sell you a fantasy and ask you to forgive us later.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">
              Straight answers.
            </h2>
            <Accordion type="single" collapsible className="mt-10">
              {faqItems.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-[color:var(--cl-evergreen)]/25"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-semibold py-5 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg leading-relaxed text-[color:var(--cl-ink)]/85 pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section>
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.05] max-w-4xl">
              Stop reading. Start something.
            </h2>
            <div className="mt-10 space-y-5 max-w-3xl text-lg md:text-xl leading-relaxed text-[color:var(--cl-ink)]/85">
              <p>
                You don't have to open a private practice tomorrow. You don't
                have to promise ValorWell your whole week. You don't have to
                pretend burnout means you stopped caring.
              </p>
              <p>
                You just have to raise your hand while the door is still this
                wide open.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PrimaryCTA>Raise Your Hand</PrimaryCTA>
              <SecondaryCTA to="/operation-claims-success">
                Explore Operation Claims Success
              </SecondaryCTA>
            </div>
            <p className="mt-16 text-xl md:text-2xl font-bold text-[color:var(--cl-evergreen)] max-w-3xl">
              Real care needs clinicians who still give a damn. The system
              around them should help—not hollow them out.
            </p>
          </div>
        </section>
      </Layout>
    </div>
  );
}
