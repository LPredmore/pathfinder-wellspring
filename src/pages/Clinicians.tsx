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

const PrimaryCTA = ({ children, onClick, href = "#raise-your-hand" }: { children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; href?: string }) => (
  <a
    href={href}
    onClick={onClick ?? scrollToApplication}
    className="inline-flex items-center justify-center bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)] px-7 py-4 text-sm font-bold tracking-wide uppercase hover:bg-[color:var(--cl-ink)] transition-colors"
  >
    {children}
  </a>
);

const SecondaryCTA = ({ children, to }: { children: React.ReactNode; to: string }) => (
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
          title="Clinicians — For clinicians who still give a damn | ValorWell"
          description="A telehealth-first clinician opportunity for licensed mental health professionals who are burned out on the system around the work — not the work itself. $75/session, 1099, paid weekly."
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
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
            <Eyebrow>For Clinicians Who Still Give a Damn</Eyebrow>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.05] font-bold text-[color:var(--cl-ink)] max-w-5xl">
              You didn't lose the calling. They buried it under paperwork, quotas, and people who never met your client.
            </h1>
            <div className="mt-10 grid md:grid-cols-12 gap-8">
              <p className="md:col-span-8 text-lg md:text-xl leading-relaxed text-[color:var(--cl-ink)]/85">
                If you're still reading, you already know the feeling. You're not burned out on the work — you're burned out on everything wrapped around it. ValorWell is being built for the clinician version of you that still exists underneath all of that.
                <br /><br />
                We're pulling together a founding group of clinicians who want their judgment back, their evenings back, and a mission worth attaching their license to. That group is being assembled right now.
              </p>
              <div className="md:col-span-4 flex flex-col gap-3 md:pt-2">
                <PrimaryCTA>Raise Your Hand</PrimaryCTA>
                <SecondaryCTA to="/mission">See the Mission for Veterans &amp; Families</SecondaryCTA>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--cl-ember)] mt-2">
                  Founding clinician cohort · onboarding now
                </p>
              </div>
            </div>
            <div className="mt-14">
              <Rule />
              <p className="mt-5 text-sm md:text-base tracking-wide text-[color:var(--cl-evergreen)] font-semibold">
                $75/session &nbsp;·&nbsp; 1099 &nbsp;·&nbsp; Paid weekly &nbsp;·&nbsp; Telehealth-first &nbsp;·&nbsp; Set your availability
              </p>
            </div>
          </div>
        </section>

        {/* MOVEMENT / FOMO */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
              Something Is Being Built. You Can Be Early.
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              ValorWell is building the greatest space available for clinicians to have the autonomy they've always wanted — with the administrative support they've never had.
            </h2>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-[color:var(--cl-canvas)]/85 max-w-3xl">
              We're changing how mental healthcare gets delivered. Starting with the veteran community. Then everywhere else. The clinicians who show up early are the ones who get to shape what this becomes.
            </p>

            <div className="mt-14 grid md:grid-cols-3 gap-0 border border-[color:var(--cl-canvas)]/20">
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-ember)] text-[color:var(--cl-ink)]">
                <div className="text-xs font-bold tracking-[0.22em] uppercase">Now</div>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold leading-tight">You help shape it.</h3>
                <p className="mt-3 text-base md:text-lg leading-relaxed">
                  Shape the EHR. Shape the culture. Shape who gets hired next. Your voice is in the room while the room is still being built.
                </p>
              </div>
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--cl-canvas)]/20">
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-canvas)]/70">Soon</div>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold leading-tight text-[color:var(--cl-canvas)]">You join what someone else shaped.</h3>
                <p className="mt-3 text-base md:text-lg leading-relaxed text-[color:var(--cl-canvas)]/80">
                  Still meaningful. Still better than what you're leaving. But the walls are already up and the rules are already written.
                </p>
              </div>
              <div className="p-8 md:p-10">
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-canvas)]/60">Later</div>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold leading-tight text-[color:var(--cl-canvas)]/85">You watch from the outside.</h3>
                <p className="mt-3 text-base md:text-lg leading-relaxed text-[color:var(--cl-canvas)]/70">
                  And you wonder what would've happened if you'd raised your hand back in 2026, when the door was still this wide open.
                </p>
              </div>
            </div>

            <p className="mt-10 text-xl md:text-2xl font-semibold text-[color:var(--cl-canvas)] max-w-3xl">
              This is not a job listing. It's an invitation to help build the thing you keep telling your colleagues should exist.
            </p>
          </div>
        </section>

        {/* PAIN */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>Maybe the Work Isn't the Problem</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              You may not be tired of helping people. You may be tired of everything standing between you and the person in front of you.
            </h2>
            <div className="mt-10 grid md:grid-cols-12 gap-10">
              <div className="md:col-span-7 space-y-5 text-lg leading-relaxed text-[color:var(--cl-ink)]/85">
                <p>
                  There is a version of burnout nobody talks about enough: still caring deeply about the client and slowly losing patience with the machine around the care.
                </p>
                <p>
                  The meeting about your productivity. The treatment workflow built for every person except the one sitting in front of you. The note you finish after dinner. The person with no clinical relationship to your client telling you what the work should look like.
                </p>
                <p>
                  That does not automatically mean you chose the wrong profession.
                </p>
                <p className="font-semibold text-[color:var(--cl-ink)]">
                  It may mean you are done pretending a bad system is the same thing as clinical work.
                </p>
              </div>
              <ol className="md:col-span-5 md:pl-8 md:border-l md:border-[color:var(--cl-evergreen)]/25 space-y-0">
                {[
                  "The quota becoming the goal.",
                  "One-size-fits-everyone treatment.",
                  "Administrative second-guessing.",
                  "Documentation owning your evenings.",
                  "Being told to just follow the workflow.",
                ].map((line, i) => (
                  <li key={i} className="py-4 border-b border-[color:var(--cl-evergreen)]/20 last:border-b-0 flex gap-4 items-baseline">
                    <span className="text-xs font-bold text-[color:var(--cl-ember)] tabular-nums w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg md:text-xl font-semibold leading-snug">{line}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
              <p className="text-2xl md:text-4xl font-bold leading-snug max-w-4xl">
                Good clinicians do not become machines just because the system rewards machine-like behavior.
              </p>
            </div>
          </div>
        </section>

        {/* SYSTEM TENSION */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>What We Refuse to Copy</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              A clinic can talk about care all day and still build a system that grinds the care out of clinicians.
            </h2>
            <div className="mt-8 space-y-5 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/85">
              <p>ValorWell is not interested in recreating the same hamster wheel with a different logo.</p>
              <p>
                We do not believe clinician burnout is solved with a wellness email, a pizza lunch, or another resilience training while the operating model stays exactly the same.
              </p>
            </div>
            <div className="mt-14 grid md:grid-cols-2 gap-0 border border-[color:var(--cl-evergreen)]/30">
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--cl-evergreen)]/30 bg-[color:var(--cl-canvas)]">
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ink)]/60">
                  The Hamster Wheel
                </div>
                <ul className="mt-6 space-y-4 text-lg">
                  {[
                    "Fill the slots.",
                    "Hit the number.",
                    "Follow the template.",
                    "Catch up on notes tonight.",
                    "Ask permission to use your judgment.",
                    "Burn out. Replace. Repeat.",
                  ].map((line, i) => (
                    <li key={i} className="text-[color:var(--cl-ink)]/70 line-through decoration-[color:var(--cl-ember)]/70 decoration-2">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 md:p-10 bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-canvas)]/80">
                  What We Are Trying to Build
                </div>
                <ul className="mt-6 space-y-4 text-lg font-medium">
                  {[
                    "You set your availability. No questions",
                    "Care for the person in front of you.",
                    "Use clinical judgment without being second guessed",
                    "Let systems remove friction.",
                    "Start small if small is sustainable.",
                    "Build capacity without burning through clinicians.",
                  ].map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>The Mission Right Now</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              Veterans deserve a better path. We need clinicians who want to help build it.
            </h2>
            <div className="mt-8 space-y-5 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/85">
              <p>
                Veterans and families are forced to navigate confusing mental health care pathways, VA-aligned systems, delays, and an expensive documentation ecosystem that can put the letter before the person.
              </p>
              <p className="font-semibold text-[color:var(--cl-ink)]">
                ValorWell is building a care-first alternative.
              </p>
              <p>
                Operation Claims Success connects honest access education, real mental health care, stronger provider pathways, and ethical documentation when clinically appropriate.
              </p>
              <p className="font-semibold text-[color:var(--cl-ink)]">
                Care first. Not letter first. Clinician judgment still matters.
              </p>
            </div>

            <div className="mt-14 space-y-0">
              {[
                { n: "01", t: "Real care has to exist." },
                { n: "02", t: "Provider capacity has to grow." },
                { n: "03", t: "Ethical documentation needs clinicians, not a letter factory." },
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
                ValorWell does not guarantee VA authorization, referrals, Nexus Letters, disability ratings, service connection, claim approval, or any VA outcome.
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
              <p>ValorWell is building the clinician network before pretending demand is perfectly matched in every state.</p>
              <p>Some clinicians may begin with only a few sessions per month.</p>
              <p>If you need someone to promise a full caseload next month, this is probably not the right opportunity. We are looking for people invested in the long-term mission.</p>
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
                    <li key={i} className="pb-4 border-b border-[color:var(--cl-canvas)]/15 line-through decoration-[color:var(--cl-ember)]/70 decoration-2">
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
                    <li key={i} className="pb-4 border-b border-[color:var(--cl-canvas)]/20">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-14 text-2xl md:text-3xl font-bold leading-snug max-w-4xl">
              We would rather lose the wrong applicant on this page than disappoint the right clinician after onboarding.
            </p>
          </div>
        </section>

        {/* AUTONOMY */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>Autonomy Needs Infrastructure</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              We are not asking you to build a private practice from scratch just to get your clinical judgment back.
            </h2>

            <div className="mt-14 grid md:grid-cols-2 gap-0 border-t border-[color:var(--cl-evergreen)]/25">
              {[
                { n: "", t: "Your availability is yours", d: "You decide how many patients you see and when. Set the ages, presentations, and hours you'll accept. Nobody guilt-trips you into more." },
                { n: "", t: "Your license still means something", d: "State and national boards already decided you're qualified. We trust their judgment more than a manager's. Your calls stay your calls." },
                { n: "", t: "Billing is not your second job", d: "ValorWell handles the billing workflow. You see the patient, document in the EHR we built for you, and move on with your day." },
                { n: "", t: "Systems should give time back", d: "You provide the care. We handle everything sitting between you and the person in front of you." },
              ].map((m, i) => (
                <div
                  key={m.n}
                  className={`p-8 md:p-10 border-b border-[color:var(--cl-evergreen)]/25 ${i % 2 === 0 ? "md:border-r" : ""}`}
                >
                  <div className="text-2xl font-bold text-[color:var(--cl-ember)] tabular-nums">{m.n}</div>
                  <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">{m.t}</h3>
                  <p className="mt-3 text-lg text-[color:var(--cl-ink)]/80 leading-relaxed">{m.d}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-xl md:text-2xl font-semibold text-[color:var(--cl-evergreen)] max-w-3xl">
              Clear boundaries. You are not expected to practice outside your scope or accept every type of client.
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
              We didn't buy an EHR. We built the one clinicians kept describing in exit interviews.
            </h2>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-[color:var(--cl-canvas)]/85 max-w-3xl">
              Every feature in here exists because a clinician said "why does this take forty minutes?" — and we agreed with them. This is not a rebranded template. It's custom infrastructure that keeps getting better because the clinicians using it are in the room while we build it.
            </p>

            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[color:var(--cl-canvas)]/20">
              {[
                {
                  t: "AI notes that speak human first",
                  d: "Type in plain language after session — \"client came in dysregulated, we worked on grounding, homework was...\" — and the system converts it into a fully compliant, clinically appropriate note. You edit. You don't author from scratch.",
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
                  d: "Video, waiting room, session, and chart on one screen. No third-party link. No \"can you see my screen?\" No context switching mid-session.",
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

            <div className="mt-14 grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5">
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
                  Shipping Next
                </div>
                <p className="mt-3 text-sm text-[color:var(--cl-canvas)]/60">
                  Founding clinicians see the roadmap first — and get a real say in what jumps the line.
                </p>
              </div>
              <ul className="md:col-span-7 space-y-3 text-lg font-semibold text-[color:var(--cl-canvas)]/90">
                {/* TODO: replace with a real roadmap teaser you're comfortable committing to */}
                <li className="pb-3 border-b border-[color:var(--cl-canvas)]/15">Roadmap teaser 1 — editable</li>
                {/* TODO: replace with a real roadmap teaser you're comfortable committing to */}
                <li className="pb-3 border-b border-[color:var(--cl-canvas)]/15">Roadmap teaser 2 — editable</li>
              </ul>
            </div>

            <p className="mt-14 text-2xl md:text-3xl font-bold leading-snug max-w-4xl text-[color:var(--cl-canvas)]">
              This is what "dedicated to our clinicians" looks like when it's not just a slide in a pitch deck.
            </p>
          </div>
        </section>

        {/* FIT */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              We care about your license. We care even more about what kind of clinician you are trying not to become.
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
                    <li key={i} className="pb-4 border-b border-[color:var(--cl-evergreen)]/25">{l}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
                  This will not be the right fit for every clinician. Good.
                </div>
                <p className="mt-6 text-lg text-[color:var(--cl-ink)]/80">Not a fit if you:</p>
                <ul className="mt-4 space-y-4 text-lg">
                  {[
                    "Need guaranteed full-time volume.",
                    "Want a rigid script for every client.",
                    "Want documentation produced on demand.",
                    "Think autonomy means no accountability.",
                    "See veterans only as a lead source.",
                  ].map((l, i) => (
                    <li key={i} className="pb-4 border-b border-[color:var(--cl-evergreen)]/25 text-[color:var(--cl-ink)]/75">{l}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-14 text-2xl md:text-3xl font-bold leading-snug max-w-3xl">
              But if you read that list and thought,{" "}
              <span className="italic text-[color:var(--cl-ember)]">Exactly</span>—we should probably talk.
            </p>
          </div>
        </section>

        {/* YOUR ROLE IN THE BUILD */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              You are not joining ValorWell to fill slots. You are strengthening the clinical engine underneath the mission.
            </h2>

            <div className="mt-14 space-y-4 text-xl md:text-2xl font-semibold text-center">
              {[
                "Clinicians join with realistic availability",
                "Capacity grows state by state",
                "More veterans and families can access real care",
                "Real care creates clinical context",
                "Lessons improve systems and provider pathways",
                "Stronger infrastructure attracts more mission-aligned capacity",
              ].map((line, i, arr) => (
                <div key={i}>
                  <p>{line}</p>
                  {i < arr.length - 1 && (
                    <div className="text-2xl text-[color:var(--cl-canvas)]/50 mt-4" aria-hidden>↓</div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-14 text-xl md:text-2xl font-semibold text-[color:var(--cl-canvas)]/90 max-w-3xl">
              The mission is bigger than your calendar. Your calendar still makes the mission possible.
            </p>
          </div>
        </section>

        {/* PRACTICAL TERMS */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <Eyebrow>Practical Terms</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              Mission does not pay your bills. The structure still has to make sense.
            </h2>

            <dl className="mt-12 border-t border-[color:var(--cl-evergreen)]/25">
              {[
                ["Pay per session", "$75 per completed session"],
                ["Pay cadence", "Paid weekly"],
                ["Classification", "1099 contractor"],
                ["Format", "Telehealth-first"],
                ["Schedule", "You set realistic availability"],
                ["Caseload", "No guaranteed caseload"],
                ["Billing", "Billing workflows handled by ValorWell"],
                ["Scope", "Your scope and comfort matter"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-12 gap-6 py-5 border-b border-[color:var(--cl-evergreen)]/25">
                  <dt className="col-span-5 md:col-span-4 text-sm md:text-base uppercase tracking-wider font-bold text-[color:var(--cl-evergreen)]">
                    {k}
                  </dt>
                  <dd className="col-span-7 md:col-span-8 text-lg md:text-xl font-semibold">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 text-lg md:text-xl text-[color:var(--cl-ink)]/80 max-w-3xl">
              Do not join because you were promised volume. Join because the current structure works for you and the mission is worth helping build.
            </p>
          </div>
        </section>

        {/* APPLICATION HANDOFF */}
        <section id="raise-your-hand" className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)] scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[color:var(--cl-ember)]">
              Raise Your Hand
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              Maybe you are not done with clinical work. Maybe you are done doing it their way.
            </h2>
            <div className="mt-8 space-y-5 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-canvas)]/85">
              <p>Tell us who you are, where you are licensed, and what made you stop on this page.</p>
              <p>You do not need a perfect résumé speech. We want the honest version.</p>
            </div>

            {/* CLINICIAN_APPLICATION_SLOT: insert application component here */}
            <div
              id="clinician-application-slot"
              aria-label="Clinician application"
              className="mt-14 bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)] p-6 md:p-10 rounded-sm"
            >
              <TherapistApplicationForm />
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
                  <p className="mt-3 text-xl font-semibold leading-snug">{step}</p>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-xl md:text-2xl font-semibold text-[color:var(--cl-evergreen)] max-w-3xl">
              We would rather set expectations clearly before onboarding than sell you a fantasy and ask you to forgive us later.
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
              Maybe you're not done with this work. Maybe you're done doing it their way.
            </h2>
            <div className="mt-10 space-y-5 max-w-3xl text-lg md:text-xl leading-relaxed text-[color:var(--cl-ink)]/85">
              <p>You do not have to open a private practice tomorrow. You do not have to promise ValorWell your whole week. You do not have to pretend burnout means you stopped caring.</p>
              <p>Start with an honest conversation about the clinician you want to be and the mission you want your work attached to.</p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PrimaryCTA>See If You Fit ValorWell</PrimaryCTA>
              <SecondaryCTA to="/operation-claims-success">Explore Operation Claims Success</SecondaryCTA>
            </div>
            <p className="mt-16 text-xl md:text-2xl font-bold text-[color:var(--cl-evergreen)] max-w-3xl">
              Real care needs clinicians who still give a damn. The system around them should help—not hollow them out.
            </p>
          </div>
        </section>
      </Layout>
    </div>
  );
}
