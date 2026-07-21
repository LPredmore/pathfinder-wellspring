import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  CalendarHeart,
  Check,
  CircleDollarSign,
  HeartHandshake,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { DonateButton } from "@/components/DonateButton";
import partnerBridgeAsset from "@/assets/partner-bridge.png.asset.json";
import partnerReadinessAsset from "@/assets/partner-readiness.png.asset.json";

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.22em] md:text-xs ${
        light
          ? "text-[color:var(--cl-ember)]"
          : "text-[color:var(--cl-ember)]"
      }`}
    >
      {children}
    </p>
  );
}

function ImagePlaceholder({
  title,
  direction,
  dark = false,
}: {
  title: string;
  direction: string;
  dark?: boolean;
}) {
  return (
    <figure
      className={`relative flex min-h-[22rem] items-end overflow-hidden border p-7 md:min-h-[29rem] md:p-9 ${
        dark
          ? "border-[color:var(--cl-canvas)]/20 bg-[color:var(--cl-canvas)]/5"
          : "border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-evergreen)]/5"
      }`}
      aria-label={`${title}. Planned image: ${direction}`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className={`absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${
            dark
              ? "bg-[color:var(--cl-ember)]/20"
              : "bg-[color:var(--cl-ember)]/12"
          }`}
        />
        <div
          className={`absolute -bottom-20 -left-20 h-72 w-72 rounded-full blur-3xl ${
            dark
              ? "bg-[color:var(--cl-canvas)]/10"
              : "bg-[color:var(--cl-evergreen)]/12"
          }`}
        />
        <div
          className={`absolute inset-x-8 top-10 h-px ${
            dark
              ? "bg-[color:var(--cl-canvas)]/20"
              : "bg-[color:var(--cl-evergreen)]/20"
          }`}
        />
        <div
          className={`absolute bottom-28 left-8 top-10 w-px ${
            dark
              ? "bg-[color:var(--cl-canvas)]/20"
              : "bg-[color:var(--cl-evergreen)]/20"
          }`}
        />
      </div>

      <figcaption
        className={`relative max-w-xl border-l-4 border-[color:var(--cl-ember)] pl-5 ${
          dark
            ? "text-[color:var(--cl-canvas)]"
            : "text-[color:var(--cl-ink)]"
        }`}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
          Planned visual space
        </p>
        <p className="mt-3 text-xl font-bold md:text-2xl">{title}</p>
        <p className="mt-3 text-sm leading-relaxed opacity-70">{direction}</p>
      </figcaption>
    </figure>
  );
}

const agreements = [
  "Asking for help should lead to help.",
  "Real care should be easier to reach than a paid shortcut.",
  "Concern matters most when it becomes capacity.",
] as const;

const questions = [
  "Do you believe asking for help should lead somewhere?",
  "Do you believe veterans and families deserve real care before a difficult situation becomes a crisis?",
  "Do you believe legitimate providers and ethical pathways should be easier to reach than people selling shortcuts?",
  "Do you believe support becomes more meaningful when it creates something people can actually use?",
] as const;

const supportBuilds = [
  {
    title: "Real Care",
    body: "Expand the capacity to connect veterans and families with legitimate mental-health treatment.",
    icon: Stethoscope,
  },
  {
    title: "Legitimate Pathways",
    body: "Strengthen education, provider connections, and Operation Claims Success so people can navigate the system without relying on predatory shortcuts.",
    icon: Route,
  },
  {
    title: "A Larger Movement",
    body: "Help meaningful work travel farther through Beyond The Yellow, community storytelling, and connections between people taking real action.",
    icon: Network,
  },
] as const;

const trustCommitments = [
  "Donations do not control clinical judgment.",
  "Support does not purchase referrals or clinical outcomes.",
  "Sponsorship does not guarantee a Beyond The Yellow feature.",
  "ValorWell will distinguish honestly between what exists now and what is still being built.",
] as const;

export default function Partner() {
  return (
    <div className="clinicians-theme bg-[color:var(--cl-canvas)] text-[color:var(--cl-ink)]">
      <Layout>
        <SEO
          title="Support the ValorWell Mission | Help Keep the Path Open"
          description="Help ValorWell build real mental-health care, legitimate veteran pathways, provider capacity, and community infrastructure that leads people toward meaningful support."
          canonical="/partner"
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Support the Mission", url: "/partner" },
          ]}
        />

        {/* 1. HERO */}
        <section className="relative overflow-hidden border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
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
                  size="lg"
                  utmCampaign="bridge-the-wait"
                  utmContent="hero"
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
              <img
                src={partnerBridgeAsset.url}
                alt="A crane lowers the final section of a bridge into place, connecting a dark interrupted pathway to a warm, lit doorway on the other side."
                className="h-auto w-full rounded-lg border border-[color:var(--cl-evergreen)]/20 object-contain"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* 2. THREE AGREEMENTS */}
        <section className="bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]">
          <div className="container-wide grid md:grid-cols-3">
            {agreements.map((agreement, index) => (
              <div
                key={agreement}
                className={`py-9 md:px-8 md:py-11 ${
                  index > 0
                    ? "border-t border-[color:var(--cl-canvas)]/15 md:border-l md:border-t-0"
                    : ""
                }`}
              >
                <Check
                  className="h-6 w-6 text-[color:var(--cl-ember)]"
                  aria-hidden="true"
                />
                <p className="mt-5 text-xl font-bold leading-tight md:text-2xl">
                  {agreement}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. MICRO-AGREEMENTS */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>A Few Things Should Not Be Controversial</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-[color:var(--cl-evergreen)] md:text-5xl">
              Before you decide whether to support ValorWell, ask yourself what
              should happen when someone is finally ready.
            </h2>

            <div className="mt-12 grid gap-px border border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)]/20 md:grid-cols-2">
              {questions.map((question, index) => (
                <article
                  key={question}
                  className="bg-[color:var(--cl-canvas)] p-7 md:min-h-64 md:p-10"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--cl-ember)]">
                    Agreement {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-8 text-2xl font-bold leading-snug text-[color:var(--cl-evergreen)] md:text-3xl">
                    {question}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HUMAN MOMENT */}
        <section className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <img
                src={partnerReadinessAsset.url}
                alt="A person stands before a wall of fragmented panels, forms, and disconnected lines, facing a warmly lit open doorway that represents a reachable next step."
                className="h-auto w-full rounded-lg border border-[color:var(--cl-canvas)]/20 object-contain"
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-6">
              <Eyebrow light>The Human Moment</Eyebrow>
              <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                The moment someone says, “I’m ready,” matters.
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/76 md:text-xl">
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
                  ValorWell exists to make that next step more reachable.
                </p>
              </div>

              <p className="mt-8 border-l-4 border-[color:var(--cl-ember)] pl-6 text-xl font-bold leading-snug md:text-2xl">
                You may never meet the person whose path you helped keep open.
                But the path still matters because you helped make it real.
              </p>

              <DonateButton
                source="partner-human-moment"
                size="lg"
                utmCampaign="bridge-the-wait"
                utmContent="human-moment"
                className="mt-9 justify-center rounded-none bg-[color:var(--cl-ember)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-none hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
              >
                Fund the Next Step
              </DonateButton>
            </div>
          </div>
        </section>

        {/* 5. CAMPAIGNS */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20">
          <div className="container-wide py-20 md:py-28">
            <Eyebrow>Choose What You Want to Move Forward</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-[color:var(--cl-evergreen)] md:text-5xl">
              Your contribution becomes more powerful when you can see what it is
              helping build.
            </h2>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <article className="flex flex-col border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-evergreen)] p-7 text-[color:var(--cl-canvas)] md:p-10">
                <CircleDollarSign
                  className="h-8 w-8 text-[color:var(--cl-ember)]"
                  aria-hidden="true"
                />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--cl-ember)]">
                  Primary Campaign
                </p>
                <h3 className="mt-3 text-3xl font-bold md:text-4xl">
                  Bridge the Wait
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/78">
                  When a veteran says, “I’m ready for help,” do not make the next
                  word “wait.” Bridge the Wait helps create access to real
                  mental-health treatment while veterans and families navigate
                  delayed or fragmented systems.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    ["$75", "Fund one session"],
                    ["$150", "Fund two sessions"],
                    ["$300", "Fund four sessions"],
                    ["$900", "Fund twelve sessions"],
                  ].map(([amount, impact]) => (
                    <div
                      key={amount}
                      className="border border-[color:var(--cl-canvas)]/20 p-4"
                    >
                      <p className="text-2xl font-bold">{amount}</p>
                      <p className="mt-1 text-sm text-[color:var(--cl-canvas)]/68">
                        {impact}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-7 text-lg font-bold">
                  $7,500 helps fund 100 real therapy sessions.
                </p>

                <DonateButton
                  source="partner-campaign-bridge"
                  size="lg"
                  utmCampaign="bridge-the-wait"
                  utmContent="campaign-card"
                  className="mt-8 justify-center rounded-none bg-[color:var(--cl-ember)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-none hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
                >
                  Fund a Session
                </DonateButton>
              </article>

              <article className="flex flex-col border border-[color:var(--cl-evergreen)]/25 bg-[color:var(--cl-canvas)] p-7 md:p-10">
                <CalendarHeart
                  className="h-8 w-8 text-[color:var(--cl-ember)]"
                  aria-hidden="true"
                />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--cl-ember)]">
                  Recurring Support
                </p>
                <h3 className="mt-3 text-3xl font-bold text-[color:var(--cl-evergreen)] md:text-4xl">
                  Keep the Bridge Open
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--cl-ink)]/75">
                  Recurring support helps ValorWell maintain the capacity,
                  systems, and pathways required to respond when someone is
                  ready—not only when a campaign is receiving attention.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    ["$25 monthly", "Help keep the bridge open"],
                    ["$75 monthly", "Keep one session ready"],
                    ["$150 monthly", "Keep two sessions ready"],
                    ["$300 monthly", "Keep four sessions ready"],
                  ].map(([amount, impact]) => (
                    <div
                      key={amount}
                      className="flex items-center justify-between gap-5 border-b border-[color:var(--cl-evergreen)]/15 pb-3"
                    >
                      <p className="font-bold text-[color:var(--cl-evergreen)]">
                        {amount}
                      </p>
                      <p className="text-right text-sm text-[color:var(--cl-ink)]/65">
                        {impact}
                      </p>
                    </div>
                  ))}
                </div>

                <DonateButton
                  source="partner-campaign-monthly"
                  variant="outline"
                  size="lg"
                  utmCampaign="monthly-support"
                  utmContent="campaign-card"
                  className="mt-8 justify-center rounded-none border-[color:var(--cl-evergreen)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-evergreen)] hover:bg-[color:var(--cl-evergreen)] hover:text-[color:var(--cl-canvas)]"
                >
                  Become a Monthly Supporter
                </DonateButton>
              </article>
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[color:var(--cl-ink)]/62">
              Contribution examples describe intended mission impact and do not
              reserve a specific clinician, appointment, patient, or clinical
              outcome. ValorWell allocates support where it can responsibly move
              the stated campaign purpose forward.
            </p>
          </div>
        </section>

        {/* 6. WHAT SUPPORT BUILDS */}
        <section
          id="what-support-builds"
          className="scroll-mt-24 bg-[color:var(--cl-evergreen)] text-[color:var(--cl-canvas)]"
        >
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <Eyebrow light>What Support Builds</Eyebrow>
                <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                  A donation does more than pay for a moment. It helps build the
                  path around that moment.
                </h2>
                <p className="mt-7 text-lg leading-relaxed text-[color:var(--cl-canvas)]/76">
                  The clinic delivers care. The pathways help people reach it. The
                  movement helps more people know that legitimate support exists.
                </p>
              </div>

              <div className="grid gap-px bg-[color:var(--cl-canvas)]/15 lg:col-span-7">
                {supportBuilds.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className="bg-[color:var(--cl-evergreen)] p-7 md:p-9"
                    >
                      <Icon
                        className="h-7 w-7 text-[color:var(--cl-ember)]"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
                      <p className="mt-3 leading-relaxed text-[color:var(--cl-canvas)]/72">
                        {item.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-14">
              <ImagePlaceholder
                dark
                title="Care, access, and community connected around one person"
                direction="A clean editorial system diagram showing three connected paths—Care, Access, and Community—converging around a single person rather than operating as disconnected programs."
              />
            </div>
          </div>
        </section>

        {/* 7. TRUST + FINAL CTA */}
        <section className="bg-[color:var(--cl-ink)] text-[color:var(--cl-canvas)]">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Eyebrow light>Support Without Buying Control</Eyebrow>
                <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                  Your contribution helps move the mission. It does not purchase
                  the mission.
                </h2>

                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  {trustCommitments.map((commitment) => (
                    <div
                      key={commitment}
                      className="flex gap-3 border border-[color:var(--cl-canvas)]/15 p-5"
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

              <div className="border-l-4 border-[color:var(--cl-ember)] pl-6 lg:col-span-5 lg:mt-16">
                <Sparkles
                  className="h-7 w-7 text-[color:var(--cl-ember)]"
                  aria-hidden="true"
                />
                <p className="mt-6 text-2xl font-bold leading-snug md:text-3xl">
                  Better systems do not appear because everyone agrees they
                  should exist.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--cl-canvas)]/72">
                  They appear because enough people decide that waiting for
                  someone else to build them is no longer acceptable.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <DonateButton
                    source="partner-final"
                    size="lg"
                    utmCampaign="valorwell-mission"
                    utmContent="final-cta"
                    className="justify-center rounded-none bg-[color:var(--cl-ember)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-none hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
                  >
                    Support the ValorWell Mission
                  </DonateButton>
                  <DonateButton
                    source="partner-final-monthly"
                    variant="outline"
                    size="lg"
                    utmCampaign="monthly-support"
                    utmContent="final-cta"
                    className="justify-center rounded-none border-[color:var(--cl-canvas)]/40 px-7 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-canvas)] hover:bg-[color:var(--cl-canvas)] hover:text-[color:var(--cl-ink)]"
                  >
                    Keep the Bridge Open Monthly
                  </DonateButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SMALL ORGANIZATIONAL HANDOFF */}
        <section className="border-b border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-canvas)]">
          <div className="container-wide py-12 md:py-16">
            <details className="group border border-[color:var(--cl-evergreen)]/25">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-6 marker:hidden md:px-8">
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--cl-ember)]">
                    Organizational Pathway
                  </span>
                  <span className="mt-2 block text-xl font-bold text-[color:var(--cl-evergreen)] md:text-2xl">
                    Represent an organization that wants to work with ValorWell?
                  </span>
                </span>
                <span
                  className="text-2xl font-bold text-[color:var(--cl-evergreen)] transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <div className="grid gap-px border-t border-[color:var(--cl-evergreen)]/20 bg-[color:var(--cl-evergreen)]/15 md:grid-cols-3">
                {[
                  {
                    title: "Share meaningful work",
                    body: "Bring a community mission or action story to Beyond The Yellow.",
                    to: "/beyondtheyellow",
                    cta: "Explore BTY",
                  },
                  {
                    title: "Build a veteran pathway",
                    body: "Discuss useful alignment with Operation Claims Success.",
                    to: "/operation-claims-success",
                    cta: "Explore OCS",
                  },
                  {
                    title: "Discuss strategic support",
                    body: "Start a conversation about funding, sponsorship, or another concrete relationship.",
                    to: "/contact",
                    cta: "Contact ValorWell",
                  },
                ].map((path) => (
                  <article
                    key={path.title}
                    className="bg-[color:var(--cl-canvas)] p-6 md:p-8"
                  >
                    <HeartHandshake
                      className="h-6 w-6 text-[color:var(--cl-ember)]"
                      aria-hidden="true"
                    />
                    <h3 className="mt-5 text-xl font-bold text-[color:var(--cl-evergreen)]">
                      {path.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--cl-ink)]/70">
                      {path.body}
                    </p>
                    <Link
                      to={path.to}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[color:var(--cl-ember)] hover:text-[color:var(--cl-ink)]"
                    >
                      {path.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </details>
          </div>
        </section>
      </Layout>
    </div>
  );
}
