import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CircleDollarSign,
  Clock3,
  HeartHandshake,
  Megaphone,
  Network,
  ReceiptText,
  Route,
  Stethoscope,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { trackHomeEvent } from "@/lib/tracking";
import missionCoverAsset from "@/assets/mission-cover-new.png.asset.json";

const FOUNDER_COVER: string | null = missionCoverAsset.url;

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "mission", ...params });

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--mission-gold))] md:text-xs">
      {children}
    </p>
  );
}

function Band({
  tone,
  children,
  className = "",
  id,
}: {
  tone: "paper" | "paper2" | "forest" | "ink";
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const bg =
    tone === "paper"
      ? "bg-[hsl(var(--mission-paper))]"
      : tone === "paper2"
        ? "bg-[hsl(var(--mission-paper-2))]"
        : tone === "forest"
          ? "bg-[hsl(var(--mission-forest))]"
          : "bg-[hsl(var(--mission-ink))]";
  const text =
    tone === "forest" || tone === "ink"
      ? "text-[hsl(var(--mission-paper))]"
      : "text-[hsl(var(--mission-ink))]";

  return (
    <section id={id} className={`${bg} ${text} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        {children}
      </div>
    </section>
  );
}

const pillars = [
  {
    tag: "Access",
    title: "Operation Claims Success",
    headline: "Build the legitimate path.",
    line: "Help veterans understand the system, strengthen real evidence, reach care, and avoid predatory shortcuts.",
    href: "/operation-claims-success",
    event: "mission_pillar_ocs",
    icon: Route,
  },
  {
    tag: "Care",
    title: "The Clinic",
    headline: "Deliver the care underneath it.",
    line: "Provide real mental-health treatment, clinician-led decisions, and ethical documentation only when clinically appropriate.",
    href: "/get-care",
    event: "mission_pillar_clinic",
    icon: Stethoscope,
  },
  {
    tag: "Movement",
    title: "Beyond The Yellow",
    headline: "Make meaningful action visible.",
    line: "Show people doing work that matters, connect them to one another, and turn isolated effort into a larger community mission.",
    href: "/beyondtheyellow",
    event: "mission_pillar_bty",
    icon: Megaphone,
  },
] as const;

const lanes = [
  {
    title: "Get Care",
    line: "Find the mental-health care or veteran pathway that fits your situation.",
    href: "/get-care",
    event: "mission_lane_get_care",
  },
] as const;

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

function ProblemVisual({ type }: { type: "delay" | "fragmented" | "transaction" }) {
  if (type === "delay") {
    return (
      <div className="relative h-44 overflow-hidden rounded-md border border-[hsl(var(--mission-paper))]/15 bg-[hsl(var(--mission-ink))]/25 p-5">
        <div className="absolute left-7 right-7 top-[5.3rem] h-px bg-[hsl(var(--mission-paper))]/25" />
        <div className="relative flex h-full items-center justify-between">
          {[
            ["Referral", "Day 1"],
            ["Authorization", "Day 30"],
            ["Appointment", "Day 90+"],
          ].map(([label, day], index) => (
            <div key={label} className="relative z-10 flex w-[30%] flex-col items-center text-center">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                  index === 2
                    ? "border-[hsl(var(--mission-rust))] bg-[hsl(var(--mission-rust))]/20"
                    : "border-[hsl(var(--mission-gold))] bg-[hsl(var(--mission-ink))]"
                }`}
              >
                <Clock3 className="h-5 w-5" />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider">{label}</p>
              <p className="mt-1 text-xs text-[hsl(var(--mission-paper))]/55">{day}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "fragmented") {
    return (
      <div className="relative h-44 overflow-hidden rounded-md border border-[hsl(var(--mission-paper))]/15 bg-[hsl(var(--mission-ink))]/25 p-4">
        <div className="grid h-full grid-cols-3 grid-rows-3 place-items-center text-center text-[10px] font-bold uppercase tracking-wider">
          <div />
          <div className="rounded-full border border-dashed border-[hsl(var(--mission-paper))]/35 px-4 py-2">VA</div>
          <div />
          <div className="rounded-full border border-dashed border-[hsl(var(--mission-paper))]/35 px-3 py-2">Provider</div>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--mission-gold))] text-[hsl(var(--mission-ink))] shadow-lg">
            Veteran
          </div>
          <div className="rounded-full border border-dashed border-[hsl(var(--mission-paper))]/35 px-3 py-2">Family</div>
          <div />
          <div className="rounded-full border border-dashed border-[hsl(var(--mission-paper))]/35 px-4 py-2">Payer</div>
          <div />
        </div>
        <Network className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 text-[hsl(var(--mission-paper))]/10" />
      </div>
    );
  }

  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-md border border-[hsl(var(--mission-paper))]/15 bg-[hsl(var(--mission-ink))]/25 p-5">
      <div className="absolute left-8 top-5 rotate-[-7deg] border border-[hsl(var(--mission-paper))]/25 bg-[hsl(var(--mission-paper))]/10 p-4 opacity-60">
        <ReceiptText className="h-7 w-7" />
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider">Need help</p>
      </div>
      <div className="relative z-10 ml-16 rotate-[4deg] border-2 border-[hsl(var(--mission-rust))] bg-[hsl(var(--mission-paper))] p-5 text-[hsl(var(--mission-ink))] shadow-xl">
        <div className="flex items-center gap-3">
          <CircleDollarSign className="h-8 w-8 text-[hsl(var(--mission-rust))]" />
          <div>
            <p className="text-xs font-black uppercase tracking-wider">Shortcut</p>
            <p className="mt-1 text-[10px] font-semibold text-[hsl(var(--mission-ink))]/60">Sold as the only path</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildWithUsMenu() {
  return (
    <div className="group relative z-20 h-full">
      <button
        type="button"
        aria-haspopup="menu"
        aria-label="Choose how you want to build with ValorWell"
        className="lane-card block h-full w-full rounded-lg border-2 border-[hsl(var(--mission-paper))]/20 bg-[hsl(var(--mission-paper))]/8 p-8 text-left"
      >
        <HeartHandshake className="h-8 w-8 text-[hsl(var(--mission-gold))]" />
        <h3 className="mt-6 text-2xl font-bold">Build With Us</h3>
        <p className="mt-4 text-[hsl(var(--mission-paper))]/72">
          Clinicians, partners, supporters, and mission-builders—choose where you fit.
        </p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--mission-gold))]">
          Choose a Path <ArrowRight className="h-4 w-4" />
        </span>
      </button>

      <div
        role="menu"
        aria-label="Build with ValorWell pathways"
        className="invisible pointer-events-none absolute left-0 right-0 top-full z-30 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      >
        <div className="overflow-hidden rounded-lg border-2 border-[hsl(var(--mission-gold))] bg-[hsl(var(--mission-paper))] shadow-2xl">
          {buildWithUsOptions.map((option) => (
            <Link
              key={option.href}
              to={option.href}
              role="menuitem"
              onClick={() => track(option.event)}
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

export default function MissionPage() {
  useEffect(() => {
    track("mission_page_view");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mission-theme min-h-screen">
      <style>{`
        .mission-theme {
          --mission-ink: 145 9% 15%;
          --mission-paper: 43 40% 93%;
          --mission-paper-2: 44 33% 88%;
          --mission-forest: 145 15% 27%;
          --mission-gold: 42 71% 51%;
          --mission-rust: 9 51% 46%;

          background-color: hsl(var(--mission-paper));
          color: hsl(var(--mission-ink));
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        }
        .mission-theme h1, .mission-theme h2, .mission-theme h3 {
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          letter-spacing: -0.025em;
        }
        .mission-theme .display {
          font-weight: 800;
          line-height: 0.98;
          font-size: clamp(2.75rem, 6.6vw, 5.7rem);
        }
        .mission-theme .section-heading {
          font-weight: 800;
          line-height: 1.03;
          font-size: clamp(2rem, 4.4vw, 3.5rem);
        }
        .mission-theme .body-lg {
          font-size: clamp(1.05rem, 1.3vw, 1.25rem);
          line-height: 1.65;
        }
        .mission-theme .gold-underline {
          background-image: linear-gradient(hsl(var(--mission-gold)), hsl(var(--mission-gold)));
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 100% 0.2em;
          padding-bottom: 0.04em;
        }
        .mission-theme .paper-grain {
          background-image:
            radial-gradient(hsl(var(--mission-ink) / 0.035) 1px, transparent 1px);
          background-size: 4px 4px;
        }
        .mission-theme .mission-card,
        .mission-theme .lane-card {
          transition: transform 200ms ease, border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
        }
        .mission-theme .mission-card:hover,
        .mission-theme .mission-card:focus-visible,
        .mission-theme .lane-card:hover,
        .mission-theme .lane-card:focus-visible,
        .mission-theme .group:focus-within .lane-card {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px hsl(var(--mission-ink) / 0.12);
        }
        .mission-theme .rise-in {
          animation: rise-in 650ms ease both;
        }
        @keyframes rise-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mission-theme .rise-in { animation: none; }
          .mission-theme .mission-card,
          .mission-theme .lane-card { transition: none; }
        }
      `}</style>

      <Helmet>
        <title>ValorWell Mission — Build the path people should have had</title>
        <meta
          name="description"
          content="ValorWell builds better paths through fragmented systems, starting with veterans and families through real mental-health care, Operation Claims Success, and Beyond The Yellow."
        />
        <link rel="canonical" href="https://valorwell.org/mission" />
        <meta property="og:title" content="ValorWell Mission — Build the path people should have had" />
        <meta
          property="og:description"
          content="People should not have to become experts in broken systems just to get help. ValorWell is building the better path."
        />
        <meta property="og:url" content="https://valorwell.org/mission" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main>
        <section className="paper-grain relative overflow-hidden bg-[hsl(var(--mission-paper))]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[hsl(var(--mission-gold))]/12 blur-3xl" />
            <div className="absolute -bottom-48 -left-40 h-[34rem] w-[34rem] rounded-full bg-[hsl(var(--mission-forest))]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24 lg:px-12">
            <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
              <div className="rise-in">
                <Eyebrow>The Heart of ValorWell</Eyebrow>
                <h1 className="display mt-6 max-w-4xl">
                  People should not have to become experts in broken systems just to get help.
                </h1>
                <p className="body-lg mt-7 max-w-2xl text-[hsl(var(--mission-ink))]/78">
                  ValorWell exists to build the paths people were promised—and were left to navigate alone. We are starting with veterans and their families, where delayed care, fragmented systems, and profit-driven shortcuts carry a human cost.
                </p>

                <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#opportunities"
                    onClick={() => track("mission_hero_find_place")}
                    className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--mission-forest))] px-7 py-4 text-base font-bold text-[hsl(var(--mission-paper))] transition-colors hover:bg-[hsl(var(--mission-ink))]"
                  >
                    Find Your Place <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/get-care"
                    onClick={() => track("mission_hero_get_care")}
                    className="px-2 py-3 text-sm font-bold text-[hsl(var(--mission-ink))]/70 underline underline-offset-4 hover:text-[hsl(var(--mission-rust))]"
                  >
                    Need care now →
                  </Link>
                </div>

                <div className="mt-12 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--mission-forest))]">
                  {['Care', 'Access', 'Community'].map((label) => (
                    <span key={label} className="border border-[hsl(var(--mission-forest))]/25 px-3 py-2">
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rise-in">
                <div className="relative mx-auto max-w-sm">
                  <div className="absolute -inset-4 rotate-2 border border-[hsl(var(--mission-gold))]/45" aria-hidden="true" />
                  {FOUNDER_COVER ? (
                    <img
                      src={FOUNDER_COVER}
                      alt="ValorWell founder with the mission: rebuilding veteran mental health care together."
                      className="relative h-auto w-full rounded-sm border-2 border-[hsl(var(--mission-ink))] shadow-2xl"
                    />
                  ) : (
                    <div
                      className="relative h-[55vh] w-auto overflow-hidden border-2 border-[hsl(var(--mission-ink))] bg-[hsl(var(--mission-forest))] text-[hsl(var(--mission-paper))] shadow-2xl md:h-[65vh]"
                      style={{ aspectRatio: "9 / 16" }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                        <p className="text-lg font-bold uppercase tracking-[0.2em] text-[hsl(var(--mission-gold))]">
                          Why ValorWell Exists
                        </p>
                        <p className="mt-4 text-xl font-semibold leading-snug md:text-2xl">
                          “We are not selling the shortcut. We are building the better path.”
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="relative -mt-1 bg-[hsl(var(--mission-ink))] px-5 py-4 text-[hsl(var(--mission-paper))]">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--mission-gold))]">
                      From the Founder
                    </p>
                    <p className="mt-2 text-sm text-[hsl(var(--mission-paper))]/70">
                      Why the mission exists—and why a better path has to be built.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Band tone="ink">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow>What We Believe</Eyebrow>
              <h2 className="section-heading mt-6 max-w-4xl">
                Help should be reachable. Care should be real. Support should lead somewhere.
              </h2>
            </div>
            <p className="body-lg md:col-span-4 text-[hsl(var(--mission-paper))]/72">
              We are not here to help people tolerate a broken path. We are here to build a better one.
            </p>
          </div>
        </Band>

        <Band tone="forest">
          <Eyebrow>Why This Has To Exist</Eyebrow>
          <h2 className="section-heading mt-6 max-w-4xl">
            Three failures. One broken path.
          </h2>
          <p className="body-lg mt-6 max-w-3xl text-[hsl(var(--mission-paper))]/75">
            The problem is not that help does not exist. The problem is that too many people cannot reach it without becoming their own case manager, navigator, advocate, and expert.
          </p>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <article className="border border-[hsl(var(--mission-paper))]/18 bg-[hsl(var(--mission-ink))]/18 p-6 md:p-8">
              <ProblemVisual type="delay" />
              <div className="mt-7 flex items-center gap-3">
                <span className="text-sm font-black text-[hsl(var(--mission-gold))]">01</span>
                <h3 className="text-2xl font-bold">Care is delayed.</h3>
              </div>
              <p className="mt-4 leading-relaxed text-[hsl(var(--mission-paper))]/75">
                People deteriorate while referrals, authorizations, and appointments move at institutional speed.
              </p>
            </article>

            <article className="border border-[hsl(var(--mission-paper))]/18 bg-[hsl(var(--mission-ink))]/18 p-6 md:p-8">
              <ProblemVisual type="fragmented" />
              <div className="mt-7 flex items-center gap-3">
                <span className="text-sm font-black text-[hsl(var(--mission-gold))]">02</span>
                <h3 className="text-2xl font-bold">The path is fragmented.</h3>
              </div>
              <p className="mt-4 leading-relaxed text-[hsl(var(--mission-paper))]/75">
                The veteran, family, provider, payer, and agency are expected to coordinate a system no one truly owns.
              </p>
            </article>

            <article className="border border-[hsl(var(--mission-paper))]/18 bg-[hsl(var(--mission-ink))]/18 p-6 md:p-8">
              <ProblemVisual type="transaction" />
              <div className="mt-7 flex items-center gap-3">
                <span className="text-sm font-black text-[hsl(var(--mission-gold))]">03</span>
                <h3 className="text-2xl font-bold">Confusion gets monetized.</h3>
              </div>
              <p className="mt-4 leading-relaxed text-[hsl(var(--mission-paper))]/75">
                When legitimate help becomes difficult to reach, expensive workarounds begin to look like the only option.
              </p>
            </article>
          </div>

          <p className="mt-14 max-w-4xl text-2xl font-bold leading-snug text-[hsl(var(--mission-gold))] md:text-3xl">
            These are not three separate problems. They are one broken path.
          </p>
        </Band>

        <Band tone="paper">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow>How ValorWell Builds the Alternative</Eyebrow>
              <h2 className="section-heading mt-6 max-w-4xl">
                One mission. Three connected engines.
              </h2>
            </div>
            <p className="body-lg md:col-span-4 text-[hsl(var(--mission-ink))]/70">
              Each part solves a different piece. Together, they create a path that can actually carry someone forward.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.title}
                  to={pillar.href}
                  onClick={() => track(pillar.event)}
                  className="mission-card group flex min-h-[25rem] flex-col border-2 border-[hsl(var(--mission-ink))]/12 bg-[hsl(var(--mission-paper-2))]/55 p-8 focus:outline-none focus-visible:border-[hsl(var(--mission-rust))]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--mission-forest))] text-[hsl(var(--mission-paper))]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-5xl font-black text-[hsl(var(--mission-ink))]/10">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--mission-rust))]">
                    {pillar.tag}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{pillar.title}</h3>
                  <p className="mt-5 text-xl font-bold leading-tight text-[hsl(var(--mission-forest))]">
                    {pillar.headline}
                  </p>
                  <p className="mt-4 leading-relaxed text-[hsl(var(--mission-ink))]/72">
                    {pillar.line}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-9 text-sm font-bold text-[hsl(var(--mission-forest))]">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Band>

        <Band tone="forest" id="opportunities" className="scroll-mt-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow>Where You Fit</Eyebrow>
              <h2 className="section-heading mt-6 max-w-4xl">
                Big missions become real when people step into them.
              </h2>
            </div>
            <p className="body-lg md:col-span-4 text-[hsl(var(--mission-paper))]/72">
              You do not have to do everything. You just have to choose the part that is yours.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {lanes.map((lane) => (
              <Link
                key={lane.title}
                to={lane.href}
                onClick={() => track(lane.event)}
                className="lane-card block rounded-lg border-2 border-[hsl(var(--mission-paper))]/20 bg-[hsl(var(--mission-paper))]/8 p-8 focus:outline-none focus-visible:border-[hsl(var(--mission-gold))]"
              >
                <HeartHandshake className="h-8 w-8 text-[hsl(var(--mission-gold))]" />
                <h3 className="mt-6 text-2xl font-bold">{lane.title}</h3>
                <p className="mt-4 text-[hsl(var(--mission-paper))]/72">{lane.line}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--mission-gold))]">
                  Go <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}

            <BuildWithUsMenu />
          </div>
        </Band>

        <section className="bg-[hsl(var(--mission-paper-2))] text-[hsl(var(--mission-ink))]">
          <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 md:py-32 lg:px-12">
            <Eyebrow>This Is Bigger Than a Clinic</Eyebrow>
            <p className="display mt-7">
              Build the path. <br className="hidden sm:block" />
              <span className="gold-underline">Change what happens next.</span>
            </p>
            <p className="body-lg mx-auto mt-8 max-w-3xl text-[hsl(var(--mission-ink))]/72">
              ValorWell is a care system, an access system, and a community mission built around one belief: people deserve a legitimate path to the help they need.
            </p>
            <a
              href="#opportunities"
              onClick={() => track("mission_close_choose_path")}
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--mission-forest))] px-8 py-4 text-base font-bold text-[hsl(var(--mission-paper))] transition-colors hover:bg-[hsl(var(--mission-ink))]"
            >
              Choose Your Path <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
