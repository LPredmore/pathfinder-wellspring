import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Play } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClickToLoadYouTubeShort } from "@/components/ClickToLoadYouTubeShort";
import { trackHomeEvent } from "@/lib/tracking";
import missionCoverAsset from "@/assets/mission-cover.png.asset.json";

/**
 * Founder video — swap this one line to change the hero video.
 * Just the YouTube video ID (the part after /embed/ or /shorts/).
 * Leave empty to render the typographic fallback hero.
 */
const FOUNDER_VIDEO_ID = "seviqJeC6FI";

/**
 * Optional custom cover image shown before the video plays.
 * To use one: drop the image in src/assets/, import it at the top of this file,
 * and set this to the imported variable. If left null, YouTube's thumbnail is used.
 *   e.g.  import founderCover from "@/assets/founder-cover.jpg";
 *         const FOUNDER_VIDEO_COVER = founderCover;
 */
const FOUNDER_VIDEO_COVER: string | null = missionCoverAsset.url;

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name, { page: "mission", ...params });

/* ---------- Small building blocks ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--mission-gold))]">
      {children}
    </p>
  );
}

function Band({
  tone,
  children,
  className = "",
}: {
  tone: "paper" | "paper2" | "forest" | "ink";
  children: React.ReactNode;
  className?: string;
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
    <section className={`${bg} ${text} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-20 md:py-28">
        {children}
      </div>
    </section>
  );
}

/* ---------- Data ---------- */

const pillars = [
  {
    title: "Operation Claims Success",
    line: "The public mission spine. A care-first pathway for veterans and families — not a letter-first shortcut.",
    href: "/operation-claims-success",
    event: "mission_pillar_ocs",
    tag: "The Spine",
  },
  {
    title: "Beyond The Yellow",
    line: "The movement amplifier. Real people doing real work, on camera, so it can't be ignored.",
    href: "/beyondtheyellow",
    event: "mission_pillar_bty",
    tag: "The Amplifier",
  },
  {
    title: "The Clinic",
    line: "The engine underneath. Real clinical care, ethical documentation only when clinically appropriate.",
    href: "/get-care",
    event: "mission_pillar_clinic",
    tag: "The Engine",
  },
];

const lanes = [
  {
    title: "Get Care",
    line: "Veterans, families, and individuals looking for the real path.",
    href: "/get-care",
    event: "mission_lane_get_care",
  },
  {
    title: "Watch & Share",
    line: "Follow the build. Share what's useful. Help the right people find it.",
    href: "/watch",
    event: "mission_lane_watch",
  },
  {
    title: "Build With Us",
    line: "Clinicians, partners, supporters, sponsors, creators — bring what you've got.",
    href: "/partner",
    event: "mission_lane_build",
  },
];

const dispatch = [
  {
    kind: "Beyond The Yellow",
    line: "New episodes publishing on the mission channel.",
  },
  {
    kind: "Operation Claims Success",
    line: "Care-first pathway under active build. Follow-the-build updates ongoing.",
  },
  {
    kind: "Clinic",
    line: "Clinician onboarding open. Ethical care roster growing.",
  },
  {
    kind: "Community",
    line: "Supporters, connectors, and partners joining the work each week.",
  },
];

/* ---------- Page ---------- */

export default function MissionPage() {
  useEffect(() => {
    track("mission_page_view");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mission-theme min-h-screen">
      <style>{`
        .mission-theme {
          /* Field Dispatch — scoped to /mission only */
          --mission-ink: 145 9% 15%;        /* #1F2A24 */
          --mission-paper: 43 40% 93%;      /* #F4F1E8 */
          --mission-paper-2: 44 33% 88%;    /* #EAE5D6 */
          --mission-forest: 145 15% 27%;    /* #3B5147 */
          --mission-gold: 42 71% 51%;       /* #D7A92E */
          --mission-rust: 9 51% 46%;        /* #B24A3A */

          background-color: hsl(var(--mission-paper));
          color: hsl(var(--mission-ink));
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        }
        .mission-theme h1, .mission-theme h2, .mission-theme h3 {
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          letter-spacing: -0.02em;
        }
        .mission-theme .display {
          font-weight: 800;
          line-height: 1.03;
          font-size: clamp(2.5rem, 6.5vw, 5.25rem);
        }
        .mission-theme .section-heading {
          font-weight: 800;
          line-height: 1.05;
          font-size: clamp(1.9rem, 4vw, 3rem);
        }
        .mission-theme .body-lg {
          font-size: clamp(1.05rem, 1.25vw, 1.25rem);
          line-height: 1.6;
        }
        .mission-theme .gold-underline {
          background-image: linear-gradient(hsl(var(--mission-gold)), hsl(var(--mission-gold)));
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 100% 0.22em;
          padding-bottom: 0.05em;
        }
        .mission-theme .paper-grain {
          background-image:
            radial-gradient(hsl(var(--mission-ink) / 0.035) 1px, transparent 1px);
          background-size: 4px 4px;
        }
        .mission-theme .pillar-link {
          position: relative;
        }
        .mission-theme .pillar-link::after {
          content: "";
          position: absolute;
          left: 0; right: 100%;
          bottom: -6px;
          height: 3px;
          background: hsl(var(--mission-gold));
          transition: right 300ms ease;
        }
        .mission-theme .pillar-link:hover::after,
        .mission-theme .pillar-link:focus-visible::after {
          right: 0;
        }
        .mission-theme .lane-card {
          transition: transform 200ms ease, border-color 200ms ease, background-color 200ms ease;
        }
        .mission-theme .lane-card:hover {
          transform: translateY(-3px);
          border-color: hsl(var(--mission-forest));
          background-color: hsl(var(--mission-paper));
        }
        .mission-theme .rise-in {
          animation: rise-in 600ms ease both;
        }
        @keyframes rise-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mission-theme .rise-in { animation: none; }
          .mission-theme .pillar-link::after { transition: none; }
        }
      `}</style>

      <Helmet>
        <title>ValorWell Mission — Care first. Not letter first. Watch us build it.</title>
        <meta
          name="description"
          content="Veterans and families are being sold shortcuts. ValorWell is building the real path — in public. Watch the mission being built."
        />
        <link rel="canonical" href="https://valorwell.org/mission" />
        <meta property="og:title" content="ValorWell Mission — Care first. Not letter first." />
        <meta
          property="og:description"
          content="We're not selling the shortcut. We're building the better path. Follow the build."
        />
        <meta property="og:url" content="https://valorwell.org/mission" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main>
        {/* 1. HERO — video-anchor */}
        <section className="relative bg-[hsl(var(--mission-paper))] paper-grain">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pt-16 pb-20 md:pt-24 md:pb-28">
            <div className="rise-in">
              <Eyebrow>The ValorWell Mission</Eyebrow>
              <h1 className="mt-5 display">
                Veterans and families are being sold shortcuts.{" "}
                <span className="gold-underline">We're building the real path.</span>
              </h1>
              <p className="mt-6 body-lg max-w-2xl text-[hsl(var(--mission-ink))]/80">
                {"\n"}
              </p>
            </div>

            {/* Video / fallback */}
            <div className="mt-10 rise-in">
              {FOUNDER_VIDEO_ID ? (
                <div className="rounded-lg border border-[hsl(var(--mission-gold))]/70 shadow-lg overflow-hidden">
                  <ClickToLoadYouTubeShort
                    videoId={FOUNDER_VIDEO_ID}
                    title="ValorWell — Why this exists. From the founder."
                    aspect="16 / 9"
                    maxWidthClassName="max-w-none"
                    coverImage={FOUNDER_VIDEO_COVER ?? undefined}
                  />
                </div>
              ) : (
                <div
                  className="relative w-full overflow-hidden rounded-lg border border-[hsl(var(--mission-gold))]/70 bg-[hsl(var(--mission-forest))] text-[hsl(var(--mission-paper))]"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--mission-gold))] text-[hsl(var(--mission-ink))]">
                      <Play className="h-7 w-7" fill="currentColor" />
                    </div>
                    <p className="text-lg font-bold uppercase tracking-[0.2em] text-[hsl(var(--mission-gold))]">
                      From the founder
                    </p>
                    <p className="mt-3 max-w-xl text-xl md:text-2xl font-semibold leading-snug">
                      "We are not selling the shortcut. We are building the better path."
                    </p>
                    <p className="mt-4 text-sm text-[hsl(var(--mission-paper))]/70">
                      Luke — Founder, ValorWell &middot; Host, Beyond The Yellow
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-start gap-3">
              <Link
                to="/watch"
                onClick={() => track("mission_hero_follow_build")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--mission-forest))] px-7 py-4 text-base font-bold text-[hsl(var(--mission-paper))] transition-colors hover:bg-[hsl(var(--mission-ink))]"
              >
                Follow the Build <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/get-care"
                onClick={() => track("mission_hero_get_care")}
                className="text-sm font-semibold text-[hsl(var(--mission-ink))]/70 underline underline-offset-4 hover:text-[hsl(var(--mission-rust))]"
              >
                Need care now →
              </Link>
            </div>
          </div>
        </section>

        {/* 2. WHAT WE BELIEVE — compressed */}
        <Band tone="paper2">
          <div className="max-w-4xl">
            <Eyebrow>What We Believe</Eyebrow>
            <h2 className="mt-5 section-heading">
              Support should be felt by the people it's supposed to help.
            </h2>
            <p className="mt-6 body-lg text-[hsl(var(--mission-ink))]/80">
              Awareness is not the finish line. The work has to reach someone.
            </p>
            <p className="mt-8 text-xl md:text-2xl italic font-semibold text-[hsl(var(--mission-forest))]">
              The question is not whether we care. The question is what changes because we cared.
            </p>
          </div>
        </Band>

        {/* 3. THE ENEMY, NAMED */}
        <Band tone="forest">
          <Eyebrow>What's Actually Broken</Eyebrow>
          <h2 className="mt-5 section-heading max-w-3xl">
            Three problems nobody's fixing at the scale veterans and families need.
          </h2>

          <ol className="mt-12 space-y-10">
            {[
              {
                n: "01",
                h: "Care is delayed.",
                p: "Veterans wait months for mental health care. Families absorb the stress while the calendar keeps moving.",
              },
              {
                n: "02",
                h: "Documentation got sold as a shortcut.",
                p: "Letter-first models profit from that desperation. They put paperwork ahead of the person.",
              },
              {
                n: "03",
                h: "Nobody's building the real alternative at scale.",
                p: "So we are — with honest education, real care, provider infrastructure, and ethical documentation when it's actually clinical.",
              },
            ].map((item) => (
              <li key={item.n} className="grid gap-4 border-t border-[hsl(var(--mission-paper))]/20 pt-8 md:grid-cols-[6rem_1fr]">
                <span className="text-4xl font-black text-[hsl(var(--mission-gold))]">{item.n}</span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">{item.h}</h3>
                  <p className="mt-3 body-lg text-[hsl(var(--mission-paper))]/85 max-w-2xl">{item.p}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-16 text-2xl md:text-3xl font-bold text-[hsl(var(--mission-gold))]">
            We are not selling the shortcut. We are building the better path.
          </p>
        </Band>

        {/* 4. THE THREE PILLARS */}
        <Band tone="paper">
          <Eyebrow>What We're Actually Doing</Eyebrow>
          <h2 className="mt-5 section-heading max-w-3xl">
            One mission. Three connected pieces of infrastructure.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {pillars.map((p) => (
              <Link
                key={p.title}
                to={p.href}
                onClick={() => track(p.event)}
                className="group block border-t-2 border-[hsl(var(--mission-ink))] pt-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--mission-rust))]">
                  {p.tag}
                </p>
                <h3 className="mt-3 text-2xl md:text-[1.75rem] font-bold leading-tight">
                  <span className="pillar-link">{p.title}</span>
                </h3>
                <p className="mt-4 body-lg text-[hsl(var(--mission-ink))]/80">{p.line}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--mission-forest))]">
                  Explore <ArrowRight className="h-4 w-4" />
                </p>
              </Link>
            ))}
          </div>
        </Band>

        {/* 5. MOMENTUM — static dispatch */}
        <Band tone="ink">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>The Build Log</Eyebrow>
              <h2 className="mt-5 section-heading">The work, in the open.</h2>
            </div>
            <p className="text-sm text-[hsl(var(--mission-paper))]/60">
              Updated manually. Live counters coming.
            </p>
          </div>

          <ul className="mt-12 divide-y divide-[hsl(var(--mission-paper))]/15 border-y border-[hsl(var(--mission-paper))]/15">
            {dispatch.map((d) => (
              <li key={d.kind} className="grid gap-3 py-6 md:grid-cols-[14rem_1fr] md:items-baseline">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--mission-gold))]">
                  {d.kind}
                </span>
                <span className="text-lg md:text-xl text-[hsl(var(--mission-paper))]/90">{d.line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              to="/watch"
              onClick={() => track("mission_dispatch_watch")}
              className="inline-flex items-center gap-2 rounded-md border-2 border-[hsl(var(--mission-gold))] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[hsl(var(--mission-gold))] hover:bg-[hsl(var(--mission-gold))] hover:text-[hsl(var(--mission-ink))]"
            >
              Watch the Build <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Band>

        {/* 6. PICK YOUR LANE */}
        <Band tone="paper2">
          <Eyebrow>Where You Fit</Eyebrow>
          <h2 className="mt-5 section-heading max-w-3xl">Pick your lane.</h2>
          <p className="mt-5 body-lg max-w-2xl text-[hsl(var(--mission-ink))]/80">
            Three honest ways in. Start with one.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {lanes.map((l) => (
              <Link
                key={l.title}
                to={l.href}
                onClick={() => track(l.event)}
                className="lane-card block rounded-lg border-2 border-[hsl(var(--mission-ink))]/15 bg-[hsl(var(--mission-paper))]/60 p-8"
              >
                <h3 className="text-2xl font-bold text-[hsl(var(--mission-ink))]">{l.title}</h3>
                <p className="mt-4 text-[hsl(var(--mission-ink))]/75">{l.line}</p>
                <p className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--mission-forest))]">
                  Go <ArrowRight className="h-4 w-4" />
                </p>
              </Link>
            ))}
          </div>
        </Band>

        {/* 7. CLOSING DRUMBEAT */}
        <section className="bg-[hsl(var(--mission-forest))] text-[hsl(var(--mission-paper))]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 py-24 md:py-32 text-center">
            <p className="display">
              Care first. <br className="hidden sm:block" />
              <span className="gold-underline">Not letter first.</span>
            </p>
            <div className="mt-10">
              <Link
                to="/watch"
                onClick={() => track("mission_close_follow_build")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--mission-gold))] px-8 py-4 text-base font-bold text-[hsl(var(--mission-ink))] transition-colors hover:bg-[hsl(var(--mission-paper))]"
              >
                Follow the Build <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-[hsl(var(--mission-paper))]/60">
              ValorWell does not guarantee VA Community Care authorization, referrals, Nexus Letters,
              disability ratings, service connection, claim approval, or any VA outcome.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
