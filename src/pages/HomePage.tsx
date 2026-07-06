import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, OrganizationSchema } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";

/**
 * Founder video — swap this one line to change the hero video.
 * Accepts a YouTube embed URL (https://www.youtube.com/embed/VIDEO_ID)
 * or leave empty to render the forest typographic hero fallback.
 */
const FOUNDER_VIDEO_URL = "";

const track = (name: string, params: Record<string, unknown> = {}) =>
  trackHomeEvent(name as never, { page: "home", ...(params as object) });

/* ---------- Building blocks ---------- */

function Eyebrow({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "rust" | "paper";
}) {
  const cls =
    tone === "rust"
      ? "text-[hsl(var(--home-rust))]"
      : tone === "paper"
      ? "text-[hsl(var(--home-paper))]/70"
      : "text-[hsl(var(--home-gold))]";
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${cls}`}>
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
      ? "bg-[hsl(var(--home-paper))]"
      : tone === "paper2"
      ? "bg-[hsl(var(--home-paper-2))]"
      : tone === "forest"
      ? "bg-[hsl(var(--home-forest))]"
      : "bg-[hsl(var(--home-ink))]";
  const text =
    tone === "forest" || tone === "ink"
      ? "text-[hsl(var(--home-paper))]"
      : "text-[hsl(var(--home-ink))]";
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
    tag: "The Spine",
    title: "Operation Claims Success",
    line: "The public mission spine. A care-first path for veterans and families — not a letter-first shortcut.",
    href: "/operation-claims-success",
    event: "home_pillar_ocs",
  },
  {
    tag: "The Amplifier",
    title: "Beyond The Yellow",
    line: "The movement. Real people, on camera, doing real work — so this cannot be ignored.",
    href: "/beyondtheyellow",
    event: "home_pillar_bty",
  },
  {
    tag: "The Engine",
    title: "The Clinic",
    line: "Real clinical care underneath the mission. Licensed clinicians. Care-first, always.",
    href: "/therapy",
    event: "home_pillar_clinic",
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
    line: "Clinician onboarding open. Ethical care roster growing each week.",
  },
];

/* ---------- Page ---------- */

export default function HomePage() {
  useEffect(() => {
    track("home_page_view");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEO
        title="ValorWell — Care first. Not letter first. Follow the build."
        description="ValorWell is building the real path for veterans and families — in public. Watch the mission. Get care when you need it."
        canonical="https://valorwell.org/"
      />
      <OrganizationSchema />

      <div className="home-theme">
        <style>{`
          .home-theme {
            /* Field Dispatch — scoped to Home */
            --home-ink: 145 9% 15%;        /* #1F2A24 */
            --home-paper: 43 40% 93%;      /* #F4F1E8 */
            --home-paper-2: 44 33% 88%;    /* #EAE5D6 */
            --home-forest: 145 15% 27%;    /* #3B5147 */
            --home-gold: 42 71% 51%;       /* #D7A92E */
            --home-rust: 9 51% 46%;        /* #B24A3A */

            background-color: hsl(var(--home-paper));
            color: hsl(var(--home-ink));
            font-family: "Trebuchet MS", "Lucida Sans", "Lucida Grande", sans-serif;
          }
          .home-theme h1, .home-theme h2, .home-theme h3 {
            font-family: "Trebuchet MS", "Lucida Sans", "Lucida Grande", sans-serif;
            letter-spacing: -0.02em;
          }
          .home-theme .display {
            font-weight: 800;
            line-height: 1.02;
            font-size: clamp(2.75rem, 7vw, 5.75rem);
          }
          .home-theme .section-heading {
            font-weight: 800;
            line-height: 1.05;
            font-size: clamp(1.9rem, 4vw, 3rem);
          }
          .home-theme .body-lg {
            font-size: clamp(1.05rem, 1.25vw, 1.25rem);
            line-height: 1.6;
          }
          .home-theme .gold-underline {
            background-image: linear-gradient(hsl(var(--home-gold)), hsl(var(--home-gold)));
            background-repeat: no-repeat;
            background-position: 0 100%;
            background-size: 100% 0.22em;
            padding-bottom: 0.05em;
          }
          .home-theme .paper-grain {
            background-image:
              radial-gradient(hsl(var(--home-paper) / 0.06) 1px, transparent 1px);
            background-size: 4px 4px;
          }
          .home-theme .door-card {
            transition: transform 200ms ease, border-color 200ms ease, background-color 200ms ease;
          }
          .home-theme .door-card:hover {
            transform: translateY(-3px);
            border-color: hsl(var(--home-gold));
          }
          .home-theme .pillar-link { position: relative; }
          .home-theme .pillar-link::after {
            content: "";
            position: absolute;
            left: 0; right: 100%;
            bottom: -6px;
            height: 3px;
            background: hsl(var(--home-gold));
            transition: right 300ms ease;
          }
          .home-theme .pillar-link:hover::after,
          .home-theme .pillar-link:focus-visible::after {
            right: 0;
          }
          .home-theme .rise-in {
            animation: home-rise-in 600ms ease both;
          }
          @keyframes home-rise-in {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .home-theme .rise-in { animation: none; }
            .home-theme .pillar-link::after { transition: none; }
          }
        `}</style>

        {/* ------------- HERO — forest, video-anchored ------------- */}
        <section className="relative bg-[hsl(var(--home-forest))] text-[hsl(var(--home-paper))] paper-grain">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-20 md:py-28">
            <div className="rise-in">
              <Eyebrow tone="gold">A Mission Being Built In Public</Eyebrow>
              <h1 className="mt-6 display">
                Care first.{" "}
                <span className="gold-underline">Not letter first.</span>
              </h1>
              <p className="mt-6 body-lg max-w-2xl text-[hsl(var(--home-paper))]/85">
                Veterans and families are being sold shortcuts. We're building
                the real path — clinical care, honest access, and the movement
                that fuels it. On camera. In the open.
              </p>
            </div>

            {/* Founder video / typographic fallback */}
            <div className="mt-12 rise-in">
              {FOUNDER_VIDEO_URL ? (
                <div className="relative w-full overflow-hidden rounded-lg border border-[hsl(var(--home-gold))]/70 shadow-lg">
                  <div className="aspect-video">
                    <iframe
                      src={FOUNDER_VIDEO_URL}
                      title="ValorWell — Founder message"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-full overflow-hidden rounded-lg border border-[hsl(var(--home-gold))]/70 bg-[hsl(var(--home-ink))]">
                  <div className="aspect-video flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--home-gold))] text-[hsl(var(--home-ink))]">
                      <Play className="h-6 w-6 ml-1" strokeWidth={2.5} />
                    </div>
                    <p className="text-lg font-bold uppercase tracking-[0.2em] text-[hsl(var(--home-gold))]">
                      Founder message
                    </p>
                    <p className="mt-3 max-w-md text-[hsl(var(--home-paper))]/80">
                      Two minutes on what we're building and why it matters.
                    </p>
                    <p className="mt-4 text-sm text-[hsl(var(--home-paper))]/60">
                      Video coming soon.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Drumbeat CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                to="/watch"
                onClick={() => track("home_hero_follow_build")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--home-gold))] px-7 py-4 text-base font-bold text-[hsl(var(--home-ink))] transition-colors hover:bg-[hsl(var(--home-paper))]"
              >
                Follow the Build <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/therapy"
                onClick={() => track("home_hero_get_care")}
                className="text-sm font-semibold text-[hsl(var(--home-paper))]/80 underline underline-offset-4 hover:text-[hsl(var(--home-gold))]"
              >
                Need care now →
              </Link>
            </div>
          </div>
        </section>

        {/* ------------- TWO DOORS — quick rescue for the other brain ------------- */}
        <Band tone="paper" className="border-t border-[hsl(var(--home-ink))]/10">
          <Eyebrow>Pick your door</Eyebrow>
          <h2 className="mt-4 section-heading max-w-3xl">
            Two reasons you're here. Both get a straight answer.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              to="/therapy"
              onClick={() => track("home_door_care")}
              className="door-card group block rounded-lg border-2 border-[hsl(var(--home-ink))]/15 bg-[hsl(var(--home-paper-2))] p-8"
            >
              <Eyebrow tone="rust">I need care</Eyebrow>
              <h3 className="mt-4 text-3xl font-extrabold">
                Get real clinical care.
              </h3>
              <p className="mt-3 body-lg text-[hsl(var(--home-ink))]/80">
                Licensed clinicians. Virtual sessions. Care-first, not
                letter-first — for veterans, families, and everyone we serve.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-[hsl(var(--home-forest))] pillar-link">
                Start with care <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              to="/watch"
              onClick={() => track("home_door_build")}
              className="door-card group block rounded-lg border-2 border-[hsl(var(--home-ink))]/15 bg-[hsl(var(--home-paper-2))] p-8"
            >
              <Eyebrow tone="rust">I'm here to help build</Eyebrow>
              <h3 className="mt-4 text-3xl font-extrabold">
                Watch the mission being built.
              </h3>
              <p className="mt-3 body-lg text-[hsl(var(--home-ink))]/80">
                Clinicians, creators, partners, and supporters — everyone with
                something to bring finds their lane by watching the work first.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-[hsl(var(--home-forest))] pillar-link">
                Follow the Build <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Band>

        {/* ------------- WHAT WE'RE BUILDING — 3 pillars ------------- */}
        <Band tone="ink">
          <Eyebrow tone="gold">What we're actually building</Eyebrow>
          <h2 className="mt-4 section-heading max-w-3xl text-[hsl(var(--home-paper))]">
            Three parts. One mission.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {pillars.map((p) => (
              <Link
                key={p.title}
                to={p.href}
                onClick={() => track(p.event)}
                className="group block border-t-2 border-[hsl(var(--home-paper))]/30 pt-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--home-rust))]">
                  {p.tag}
                </p>
                <h3 className="mt-3 text-2xl font-extrabold text-[hsl(var(--home-paper))] pillar-link inline-block">
                  {p.title}
                </h3>
                <p className="mt-4 body-lg text-[hsl(var(--home-paper))]/80">
                  {p.line}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--home-gold))]">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Band>

        {/* ------------- MOMENTUM — build log ------------- */}
        <Band tone="paper2">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <Eyebrow>The build log</Eyebrow>
              <h2 className="mt-4 section-heading max-w-3xl">
                Momentum — this week.
              </h2>
            </div>
            <Link
              to="/watch"
              onClick={() => track("home_momentum_watch")}
              className="text-sm font-bold text-[hsl(var(--home-forest))] underline underline-offset-4 hover:text-[hsl(var(--home-rust))]"
            >
              See everything →
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {dispatch.map((d) => (
              <div
                key={d.kind}
                className="border-t-2 border-[hsl(var(--home-ink))] pt-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--home-rust))]">
                  {d.kind}
                </p>
                <p className="mt-3 body-lg text-[hsl(var(--home-ink))]/85">
                  {d.line}
                </p>
              </div>
            ))}
          </div>
        </Band>

        {/* ------------- CLOSING DRUMBEAT ------------- */}
        <section className="bg-[hsl(var(--home-forest))] text-[hsl(var(--home-paper))]">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 py-24 md:py-32 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--home-gold))]">
              Care first. Not letter first.
            </p>
            <h2 className="mt-6 display">
              <span className="gold-underline">Follow the Build.</span>
            </h2>
            <p className="mt-8 body-lg max-w-2xl mx-auto text-[hsl(var(--home-paper))]/85">
              The mission is public. The work is on camera. The path is the
              path. Come watch it get built — and bring what you've got.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/watch"
                onClick={() => track("home_closing_follow_build")}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--home-gold))] px-7 py-4 text-base font-bold text-[hsl(var(--home-ink))] transition-colors hover:bg-[hsl(var(--home-paper))]"
              >
                Follow the Build <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/mission"
                onClick={() => track("home_closing_mission")}
                className="text-sm font-semibold text-[hsl(var(--home-paper))]/80 underline underline-offset-4 hover:text-[hsl(var(--home-gold))]"
              >
                Read the mission →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
