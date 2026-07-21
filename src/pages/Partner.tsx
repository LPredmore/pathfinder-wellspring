import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  CircleDollarSign,
  HeartHandshake,
  Megaphone,
  Route,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { DonateButton } from "@/components/DonateButton";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-ember)] md:text-xs">
      {children}
    </p>
  );
}

function ImagePlaceholder({
  title,
  guidance,
  tone = "light",
  aspect = "aspect-[4/5]",
}: {
  title: string;
  guidance: string;
  tone?: "light" | "dark";
  aspect?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      data-image-placeholder
      className={`${aspect} relative flex min-h-80 items-end overflow-hidden border ${
        dark
          ? "border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-canvas)]/5"
          : "border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-evergreen)]/5"
      }`}
      role="img"
      aria-label={`${title}. ${guidance}`}
    >
      <div
        className={`absolute inset-6 border border-dashed ${
          dark
            ? "border-[color:var(--cl-canvas)]/25"
            : "border-[color:var(--cl-evergreen)]/25"
        }`}
        aria-hidden="true"
      />
      <div
        className={`relative m-6 w-[calc(100%-3rem)] border-l-4 border-[color:var(--cl-ember)] p-5 ${
          dark
            ? "bg-[color:var(--cl-ink)]/85 text-[color:var(--cl-canvas)]"
            : "bg-[color:var(--cl-canvas)]/90 text-[color:var(--cl-ink)]"
        }`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
          Image placement reserved
        </p>
        <p className="mt-2 text-lg font-bold leading-tight">{title}</p>
        <p className="mt-2 text-sm leading-relaxed opacity-70">{guidance}</p>
      </div>
    </div>
  );
}

const agreements = [
  {
    title: "Asking for help should lead to help.",
    body: "The moment someone is ready should open a path—not another maze.",
  },
  {
    title: "Real care should be easier to reach than a paid shortcut.",
    body: "Legitimate treatment and ethical guidance should not be the hardest options to find.",
  },
  {
    title: "Concern matters most when it becomes capacity.",
    body: "Awareness is important. A reachable next step is what changes the outcome.",
  },
] as const;

const agreementQuestions = [
  "Do you believe asking for help should lead somewhere?",
  "Do you believe veterans and families deserve real care before a difficult situation becomes a crisis?",
  "Do you believe legitimate providers should be easier to reach than people selling shortcuts?",
  "Do you believe support becomes more meaningful when it creates something people can actually use?",
] as const;

const supportEngines = [
  {
    icon: Stethoscope,
    title: "Real care",
    body: "Help create and protect the capacity that connects veterans and families with legitimate mental-health treatment.",
  },
  {
    icon: Route,
    title: "Legitimate pathways",
    body: "Strengthen education, provider connections, and Operation Claims Success so people can move through the system without predatory shortcuts.",
  },
  {
    icon: Megaphone,
    title: "A larger movement",
    body: "Help meaningful work travel farther through Beyond The Yellow and connections between people taking real action.",
  },
] as const;

const trustCommitments = [
  "Donations do not control clinical judgment.",
  "Support does not purchase referrals, documentation, or clinical outcomes.",
  "Sponsorship does not guarantee a Beyond The Yellow feature.",
  "ValorWell will distinguish honestly between what exists now and what is still being built.",
] as const;

export default function Partner() {
  return (
    <Layout>
      <SEO
        title="Support the ValorWell Mission | Help Build the Next Step"
        description="Help ValorWell expand real mental-health care, legitimate veteran pathways, provider capacity, and community action. Support the mission and help keep the next step open."
        canonical="/partner"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support the Mission", url: "/partner" },
        ]}
      />

      <main className="clinicians-theme bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]">
        {/* 1. Emotional decision */}
        <section className="relative overflow-hidden border-b border-[color:var(--cl-evergreen)]/20">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-[color:var(--cl-ember)]/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Support That Leads Somewhere</Eyebrow>
              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.03] tracking-tight text-[color:var(--cl-evergreen)] md:text-6xl lg:text-7xl">
                When a veteran finally says, “I’m ready for help,” the next word
                should not be “wait.”
              </h1>
              <div className="mt-7 max-w-3xl space-y-5 text-lg leading-relaxed text-[color:var(--cl-ink)]/82 md:text-xl">
                <p>
                  ValorWell is building the care, provider capacity, education,
                  and legitimate pathways that help veterans and families move
                  from confusion to real support.
                </p>
                <p className="font-semibold text-[color:var(--cl-evergreen)]">
                  You do not have to build the entire system yourself. You can
                  help keep the next step open.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <DonateButton
                  source="partner-hero"
                  utmCampaign="bridge-the-wait"
                  size="lg"
                  className="justify-center rounded-none bg-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-canvas)] shadow-none hover:bg-[color:var(--cl-ink)]"
                >
                  Help Keep the Bridge Open
                </DonateButton>
                <a
                  href="#what-support-builds"
                  className="inline-flex items-center justify-center gap-2 border border-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-evergreen)] transition-colors hover:bg-[color:var(--cl-evergreen)] hover:text-[color:var(--cl-canvas)]"
                >
                  See What Support Builds
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ImagePlaceholder
                title="The missing part of the path"
                guidance="Cinematic editorial image of a dark, interrupted pathway moving toward a warm open doorway, with the missing section being placed into position. No generic therapy couch, handshake, staged patriotism, or trauma imagery."
                aspect="aspect-[4/5]"
              />
            </div>
          </div>
        </section>

        {/* 2. Shared moral baseline */}
        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide grid md:grid-cols-3">
            {agreements.map((agreement, index) => (
              <article
                key={agreement.title}
                className={`py-9 md:px-8 md:py-11 ${
                  index > 0
                    ? "border-t border-[color:var(--cl-canvas)]/15 md:border-l md:border-t-0"
                    : ""
                }`}
              >
                <p className="text-xl font-bold leading-tight md:text-2xl">
                  {agreement.title}
                </p>
                <p className="mt-3 leading-relaxed text-[color:var(--cl-canvas)]/70">
                  {agreement.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Self-qualification */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>A Few Things Should Not Be Controversial</Eyebrow>
            <h2 className="mt-6 max-w-5xl text-3xl font-bold leading-tight text-[color:var(--cl-evergreen)] md:text-5xl">
              Before you decide whether to support ValorWell, ask yourself what
              should happen when someone is finally ready.
            </h2>

            <div className="mt-12 grid gap-px border border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)]/20 md:grid-cols-2">
              {agreementQuestions.map((question, index) => (
                <article
                  key={question}
                  className="bg-[color:var(--cl-canvas)] p-7 md:min-h-56 md:p-10"
                >
                  <div className="text-5xl font-bold text-[color:var(--cl-ember)]/55">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-7 text-xl font-bold leading-snug md:text-2xl">
                    {question}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Human moment */}
        <section className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <ImagePlaceholder
                title="Readiness meeting a reachable next step"
                guidance="Editorial visual centered on one illuminated appointment opening or clear path, surrounded by fragmented dates, disconnected lines, and administrative forms fading into darkness. Symbolic and human without depicting a distressed veteran."
                tone="dark"
                aspect="aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <Eyebrow>The Moment That Matters</Eyebrow>
              <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                The moment someone says, “I’m ready,” matters.
              </h2>
              <div className="mt-7 max-w-3xl space-y-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/75 md:text-xl">
                <p>
                  It may have taken months—or years—for someone to finally admit
                  that they need help.
                </p>
                <p>
                  That decision should open a path. Too often, it opens another
                  project: determine eligibility, find the right provider,
                  understand the authorization, wait for capacity, and hope the
                  person still has enough energy to keep trying.
                </p>
                <p className="font-semibold text-[color:var(--cl-canvas)]">
                  You may never meet the person whose path you helped keep open.
                  The path still matters because you helped make it real.
                </p>
              </div>

              <DonateButton
                source="partner-human-moment"
                utmCampaign="bridge-the-wait"
                size="lg"
                className="mt-9 justify-center rounded-none bg-[color:var(--cl-ember)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-none hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
              >
                Fund the Next Step
              </DonateButton>
            </div>
          </div>
        </section>

        {/* 5. Campaign choices and impact */}
        <section
          id="what-support-builds"
          className="scroll-mt-24 border-b border-[color:var(--cl-evergreen)]/20"
        >
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>Choose How You Want to Move the Mission</Eyebrow>
            <h2 className="mt-6 max-w-5xl text-3xl font-bold leading-tight text-[color:var(--cl-evergreen)] md:text-5xl">
              You already know the problem matters. Now choose the kind of
              momentum you want to help create.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--cl-ink)]/72">
              One-time support can help move an immediate next step. Recurring
              support helps maintain the capacity before the next person asks for
              help. ValorWell applies contributions where they can most
              effectively expand care, access, and mission capacity.
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <article className="flex flex-col border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-evergreen)] p-8 text-[color:var(--cl-canvas)] md:p-10">
                <CircleDollarSign
                  className="h-8 w-8 text-[color:var(--cl-ember)]"
                  aria-hidden="true"
                />
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-canvas)]/60">
                  One-Time Campaign
                </p>
                <h3 className="mt-3 text-3xl font-bold">Bridge the Wait</h3>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/75">
                  Help create the next legitimate step when a veteran or family
                  member is ready for care but the surrounding system is delayed
                  or fragmented.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-px bg-[color:var(--cl-canvas)]/15">
                  {[
                    "$75 · One session equivalent",
                    "$150 · Two session equivalents",
                    "$300 · Four session equivalents",
                    "$900 · Twelve session equivalents",
                  ].map((amount) => (
                    <div
                      key={amount}
                      className="bg-[color:var(--cl-evergreen)] p-4 text-sm font-semibold leading-snug"
                    >
                      {amount}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[color:var(--cl-canvas)]/55">
                  Session equivalents use ValorWell’s current $75 completed-session
                  clinician rate as a concrete impact reference, not a restricted-use
                  promise or guarantee of placement.
                </p>

                <DonateButton
                  source="partner-bridge-the-wait"
                  utmCampaign="bridge-the-wait"
                  size="lg"
                  className="mt-8 w-full justify-center rounded-none bg-[color:var(--cl-ember)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-none hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
                >
                  Support Bridge the Wait
                </DonateButton>
              </article>

              <article className="flex flex-col border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-canvas)] p-8 md:p-10">
                <HeartHandshake
                  className="h-8 w-8 text-[color:var(--cl-ember)]"
                  aria-hidden="true"
                />
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-evergreen)]/60">
                  Recurring Campaign
                </p>
                <h3 className="mt-3 text-3xl font-bold text-[color:var(--cl-evergreen)]">
                  Keep the Bridge Open
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--cl-ink)]/72">
                  Monthly support helps ValorWell maintain the systems, provider
                  relationships, education, technology, and care capacity needed
                  before the next person asks for help.
                </p>

                <div className="mt-8 space-y-3 border-y border-[color:var(--cl-evergreen)]/20 py-6">
                  {[
                    "$25 monthly · Help maintain the path",
                    "$75 monthly · Keep one session equivalent ready",
                    "$150 monthly · Keep two session equivalents ready",
                    "$300 monthly · Help sustain larger access capacity",
                  ].map((amount) => (
                    <p key={amount} className="font-semibold leading-relaxed">
                      {amount}
                    </p>
                  ))}
                </div>

                <DonateButton
                  source="partner-monthly-support"
                  utmCampaign="keep-the-bridge-open"
                  size="lg"
                  className="mt-8 w-full justify-center rounded-none bg-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-canvas)] shadow-none hover:bg-[color:var(--cl-ink)]"
                >
                  Become a Monthly Supporter
                </DonateButton>
              </article>
            </div>

            <div className="mt-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cl-evergreen)]/65">
                What Every Contribution Helps Build
              </p>
              <div className="mt-6 grid gap-px border border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)]/20 md:grid-cols-3">
                {supportEngines.map((engine) => {
                  const Icon = engine.icon;
                  return (
                    <article
                      key={engine.title}
                      className="bg-[color:var(--cl-canvas)] p-7 md:p-9"
                    >
                      <Icon
                        className="h-7 w-7 text-[color:var(--cl-ember)]"
                        aria-hidden="true"
                      />
                      <h3 className="mt-6 text-2xl font-bold text-[color:var(--cl-evergreen)]">
                        {engine.title}
                      </h3>
                      <p className="mt-4 leading-relaxed text-[color:var(--cl-ink)]/72">
                        {engine.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Trust and final action */}
        <section className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Eyebrow>Support Without Buying Control</Eyebrow>
                <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                  Your contribution helps move the mission. It does not purchase
                  the mission.
                </h2>
                <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/72 md:text-xl">
                  <p>
                    Better systems do not appear because everyone agrees they
                    should exist.
                  </p>
                  <p className="font-semibold text-[color:var(--cl-canvas)]">
                    They appear because enough people decide that waiting for
                    someone else to build them is no longer acceptable.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="border-y border-[color:var(--cl-canvas)]/20">
                  {trustCommitments.map((commitment) => (
                    <div
                      key={commitment}
                      className="flex gap-4 border-b border-[color:var(--cl-canvas)]/15 py-5 last:border-b-0"
                    >
                      <ShieldCheck
                        className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--cl-ember)]"
                        aria-hidden="true"
                      />
                      <p className="font-semibold leading-relaxed">{commitment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-3 border-t border-[color:var(--cl-canvas)]/20 pt-10 sm:flex-row">
              <DonateButton
                source="partner-final"
                utmCampaign="valorwell-mission"
                size="lg"
                className="justify-center rounded-none bg-[color:var(--cl-ember)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-none hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
              >
                Support the ValorWell Mission
              </DonateButton>
              <DonateButton
                source="partner-final-monthly"
                utmCampaign="keep-the-bridge-open"
                variant="outline"
                size="lg"
                className="justify-center rounded-none border-[color:var(--cl-canvas)]/40 px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-canvas)] hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
              >
                Keep the Bridge Open Monthly
              </DonateButton>
            </div>
          </div>
        </section>

        {/* Small organizational handoff */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-canvas)]">
          <div className="container-wide py-12 md:py-16">
            <details className="group border border-[color:var(--cl-evergreen)]/25">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-bold text-[color:var(--cl-evergreen)] marker:hidden md:p-8 md:text-xl">
                <span>Represent an organization that wants to work with ValorWell?</span>
                <span
                  className="text-2xl text-[color:var(--cl-ember)] transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="grid gap-6 border-t border-[color:var(--cl-evergreen)]/20 p-6 md:grid-cols-3 md:p-8">
                <div>
                  <h3 className="font-bold text-[color:var(--cl-evergreen)]">
                    Share meaningful work
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--cl-ink)]/68">
                    Bring a community mission or real-action story to Beyond The
                    Yellow.
                  </p>
                  <Link
                    to="/beyondtheyellow"
                    className="mt-4 inline-flex text-sm font-bold uppercase tracking-wide text-[color:var(--cl-ember)] hover:text-[color:var(--cl-ink)]"
                  >
                    Explore Beyond The Yellow →
                  </Link>
                </div>
                <div>
                  <h3 className="font-bold text-[color:var(--cl-evergreen)]">
                    Build a veteran pathway
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--cl-ink)]/68">
                    Learn how Operation Claims Success is building legitimate
                    care and provider connections.
                  </p>
                  <Link
                    to="/operation-claims-success"
                    className="mt-4 inline-flex text-sm font-bold uppercase tracking-wide text-[color:var(--cl-ember)] hover:text-[color:var(--cl-ink)]"
                  >
                    Explore OCS →
                  </Link>
                </div>
                <div>
                  <h3 className="font-bold text-[color:var(--cl-evergreen)]">
                    Discuss strategic support
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--cl-ink)]/68">
                    Talk with ValorWell about major funding, sponsorship, or a
                    focused strategic relationship.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex text-sm font-bold uppercase tracking-wide text-[color:var(--cl-ember)] hover:text-[color:var(--cl-ink)]"
                  >
                    Contact ValorWell →
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </section>
      </main>
    </Layout>
  );
}
