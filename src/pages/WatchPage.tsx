import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Compass,
  Megaphone,
  Wrench,
  Hammer,
  Radio,
  Users,
  Handshake,
  HeartPulse,
  Share2,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";

/**
 * Watch page — owned-home growth engine for the ValorWell mission.
 * Intentional empty-state architecture: no fake episodes, guests, thumbnails,
 * runtimes, view counts, testimonials, or social handles are invented.
 * Real content will populate the typed lane arrays below when connected.
 */

// -----------------------------------------------------------------------------
// Content data model (kept typed + empty until a real source is connected).
// -----------------------------------------------------------------------------

type ContentLane = "ocs" | "bty" | "practical-help" | "building-valorwell";
type ContentType = "long-form" | "episode" | "short" | "written-spotlight";

interface ContentItem {
  id: string;
  title: string;
  lane: ContentLane;
  contentType: ContentType;
  slug?: string;
  summary?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  duration?: string;
  publishedAt?: string;
  guest?: string;
  organization?: string;
  causeArea?: string;
  featured?: boolean;
  relatedLongFormId?: string;
}

// Intentionally empty until real content is wired in. Do not seed fake data.
const contentLibrary: ContentItem[] = [];

const laneItems = (lane: ContentLane) =>
  contentLibrary.filter((c) => c.lane === lane);
const shorts = contentLibrary.filter((c) => c.contentType === "short");
const featured = contentLibrary.find((c) => c.featured);

// Real, configured ValorWell social channels only.
// Add a channel here only when its URL has been verified.
const socialChannels: {
  key: "youtube" | "tiktok" | "instagram" | "facebook" | "reddit";
  label: string;
  url: string;
}[] = [
  { key: "youtube", label: "YouTube", url: "https://www.youtube.com/@ValorWell" },
];

// -----------------------------------------------------------------------------

const scrollToId = (id: string) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

// -----------------------------------------------------------------------------

function WatchHero() {
  const handleFeatured = useCallback(() => {
    trackHomeEvent("watch_hero_featured");
    scrollToId(featured ? "start-here" : "lane-navigator");
  }, []);
  const handleFollow = useCallback(() => {
    trackHomeEvent("watch_hero_follow");
    scrollToId("follow");
  }, []);
  const handleBty = useCallback(() => {
    trackHomeEvent("watch_hero_bty_story");
  }, []);

  const hasSocial = socialChannels.length > 0;

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[hsl(var(--navy))] text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--patriot-red)) 0, transparent 45%), radial-gradient(circle at 80% 60%, hsl(var(--gold-accent)) 0, transparent 40%)",
        }}
      />
      <div className="container-wide relative py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Watch ValorWell
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              The mission is being built in public.{" "}
              <span className="text-[hsl(var(--gold-accent))]">Watch it happen.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              ValorWell is building a better care-first path for veterans and families,
              spotlighting people taking real action, sharing practical tools, and showing
              the work behind the mission as it happens.
            </p>
            <p className="mt-4 max-w-2xl text-base text-white/70">
              Beyond The Yellow interviews borrow audience. Operation Claims Success content
              defines the mission. Practical help earns trust. Founder updates show the build.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleFeatured}
                className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--patriot-red))] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--patriot-red-dark))]"
              >
                Watch What We're Building
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>

              {hasSocial && (
                <button
                  type="button"
                  onClick={handleFollow}
                  className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Follow ValorWell
                </button>
              )}

              <Link
                to="/beyondtheyellow"
                onClick={handleBty}
                className="text-sm font-medium text-[hsl(var(--gold-accent))] underline-offset-4 hover:underline"
              >
                Share Your Beyond The Yellow Story →
              </Link>
            </div>
          </div>

          {/* Editorial media-grid stand-in — intentional, does not fake published content */}
          <div aria-hidden className="relative hidden lg:block">
            <div className="grid grid-cols-6 grid-rows-6 gap-3">
              <div className="col-span-4 row-span-4 rounded-lg bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/10" />
              <div className="col-span-2 row-span-2 rounded-lg bg-[hsl(var(--gold-accent))]/25 ring-1 ring-white/10" />
              <div className="col-span-2 row-span-2 rounded-lg bg-[hsl(var(--patriot-red))]/40 ring-1 ring-white/10" />
              <div className="col-span-3 row-span-2 rounded-lg bg-white/10 ring-1 ring-white/10" />
              <div className="col-span-3 row-span-2 rounded-lg bg-white/5 ring-1 ring-white/10" />
            </div>
            <p className="mt-4 text-right text-xs uppercase tracking-widest text-white/50">
              Four content lanes. One mission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------

function StartHere() {
  const hasSocial = socialChannels.length > 0;

  return (
    <section id="start-here" className="border-b border-border/60 bg-background">
      <div className="container-wide py-16 md:py-20">
        <Eyebrow>Start Here</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          One story. One idea. One place to start.
        </h2>

        {featured ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-border">
              {featured.thumbnailUrl ? (
                <img
                  src={featured.thumbnailUrl}
                  alt={featured.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <Play className="h-10 w-10" aria-hidden />
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {laneLabel(featured.lane)}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                {featured.title}
              </h3>
              {featured.summary && (
                <p className="mt-3 text-muted-foreground">{featured.summary}</p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {featured.videoUrl && (
                  <a
                    href={featured.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackHomeEvent("watch_start_here_play")}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <Play className="h-4 w-4" aria-hidden /> Watch Now
                  </a>
                )}
                <FeaturedContextCta lane={featured.lane} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-8 md:p-12">
            <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
              The ValorWell content engine is being built now.
            </h3>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              We are building Beyond The Yellow, documenting Operation Claims Success,
              publishing practical tools for veterans and families, and showing the work
              behind ValorWell in public. The first content belongs here as it is published.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  trackHomeEvent("watch_start_here_share");
                  scrollToId("lane-navigator");
                }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Explore the Content Lanes <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              {hasSocial && (
                <button
                  type="button"
                  onClick={() => {
                    trackHomeEvent("watch_hero_follow");
                    scrollToId("follow");
                  }}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Follow ValorWell
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedContextCta({ lane }: { lane: ContentLane }) {
  if (lane === "ocs")
    return (
      <Link
        to="/operation-claims-success"
        className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
      >
        Explore Operation Claims Success
      </Link>
    );
  if (lane === "bty")
    return (
      <Link
        to="/beyondtheyellow"
        className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
      >
        Share Your Beyond The Yellow Story
      </Link>
    );
  if (lane === "practical-help")
    return (
      <Link
        to="/veterans"
        className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
      >
        Explore Veteran &amp; Family Support
      </Link>
    );
  return (
    <Link
      to="/partner"
      className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
    >
      Get Involved
    </Link>
  );
}

const laneLabel = (l: ContentLane) =>
  l === "ocs"
    ? "Operation Claims Success"
    : l === "bty"
    ? "Beyond The Yellow"
    : l === "practical-help"
    ? "Practical Help"
    : "Building ValorWell";

// -----------------------------------------------------------------------------

interface LaneCard {
  id: ContentLane;
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  targetId: string;
  event: string;
  Icon: typeof Compass;
  accent: string;
}

const laneCards: LaneCard[] = [
  {
    id: "ocs",
    eyebrow: "The Mission",
    title: "Operation Claims Success",
    copy:
      "Care-first veteran support, anti-predatory positioning, VA-aligned pathway education, ethical documentation, and the work behind the better path ValorWell is building.",
    cta: "Watch Care First",
    targetId: "lane-ocs",
    event: "watch_lane_ocs",
    Icon: Compass,
    accent: "bg-[hsl(var(--patriot-red))]",
  },
  {
    id: "bty",
    eyebrow: "The Movement",
    title: "Beyond The Yellow",
    copy:
      "Guest conversations spotlighting people and organizations taking real action instead of stopping at symbolic support.",
    cta: "Watch Beyond The Yellow",
    targetId: "lane-bty",
    event: "watch_lane_bty",
    Icon: Megaphone,
    accent: "bg-[hsl(var(--gold-accent))]",
  },
  {
    id: "practical-help",
    eyebrow: "Useful Now",
    title: "Practical Help",
    copy:
      "Practical veteran, family, communication, boundary, emotional well-being, and support tools people can use before they ever need ValorWell clinically.",
    cta: "Watch Practical Help",
    targetId: "lane-practical",
    event: "watch_lane_practical",
    Icon: Wrench,
    accent: "bg-[hsl(var(--sky-blue))]",
  },
  {
    id: "building-valorwell",
    eyebrow: "The Build",
    title: "Building ValorWell",
    copy:
      "Luke explains what ValorWell is building, what changed, what is blocked, what was learned, and why the work matters.",
    cta: "Watch the Build",
    targetId: "lane-build",
    event: "watch_lane_build",
    Icon: Hammer,
    accent: "bg-[hsl(var(--navy))]",
  },
];

function LaneNavigator() {
  return (
    <section id="lane-navigator" className="border-b border-border/60 bg-[hsl(var(--section-alt))]">
      <div className="container-wide py-16 md:py-20">
        <div className="max-w-2xl">
          <Eyebrow>The Content System</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            What do you want to watch?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start with the lane that matters to you. Every lane serves a different job in
            the ValorWell mission.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {laneCards.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                trackHomeEvent(l.event);
                scrollToId(l.targetId);
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-8"
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${l.accent}`} aria-hidden />
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white ${l.accent}`}
                  aria-hidden
                >
                  <l.Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {l.eyebrow}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-foreground md:text-2xl">
                    {l.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">{l.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2">
                    {l.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------

interface LaneSectionProps {
  id: string;
  eyebrow: string;
  headline: string;
  intro: string;
  items: ContentItem[];
  emptyHeadline: string;
  emptyCopy: string;
  primaryCta: { label: string; to?: string; onClick?: () => void; event: string };
  secondaryCta?: { label: string; to?: string; onClick?: () => void; event: string };
  tertiaryCta?: { label: string; to?: string; onClick?: () => void; event: string };
  variant?: "default" | "alt" | "gold" | "navy";
  extra?: React.ReactNode;
  playEvent: string;
}

function LaneSection(props: LaneSectionProps) {
  const bg =
    props.variant === "navy"
      ? "bg-[hsl(var(--navy))] text-white"
      : props.variant === "gold"
      ? "bg-[hsl(var(--sky-blue-light))]"
      : props.variant === "alt"
      ? "bg-[hsl(var(--section-alt))]"
      : "bg-background";

  const muted = props.variant === "navy" ? "text-white/75" : "text-muted-foreground";
  const eyebrowColor =
    props.variant === "navy" ? "text-[hsl(var(--gold-accent))]" : "text-accent";

  return (
    <section id={props.id} className={`border-b border-border/60 ${bg}`}>
      <div className="container-wide py-16 md:py-24">
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>
          {props.eyebrow}
        </p>
        <h2
          className={`mt-3 max-w-3xl text-3xl font-bold md:text-4xl ${
            props.variant === "navy" ? "text-white" : "text-foreground"
          }`}
        >
          {props.headline}
        </h2>
        <p className={`mt-4 max-w-3xl ${muted}`}>{props.intro}</p>

        {props.extra && <div className="mt-6">{props.extra}</div>}

        {props.items.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {props.items.map((it) => (
              <ContentCard key={it.id} item={it} onPlay={() => trackHomeEvent(props.playEvent)} />
            ))}
          </div>
        ) : (
          <div
            className={`mt-10 rounded-2xl p-8 md:p-10 ${
              props.variant === "navy"
                ? "border border-white/15 bg-white/5"
                : "border border-border bg-background"
            }`}
          >
            <h3
              className={`text-xl font-semibold md:text-2xl ${
                props.variant === "navy" ? "text-white" : "text-foreground"
              }`}
            >
              {props.emptyHeadline}
            </h3>
            <p className={`mt-3 max-w-2xl ${muted}`}>{props.emptyCopy}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <LaneCta cta={props.primaryCta} primary variant={props.variant} />
          {props.secondaryCta && (
            <LaneCta cta={props.secondaryCta} variant={props.variant} />
          )}
          {props.tertiaryCta && (
            <LaneCta cta={props.tertiaryCta} link variant={props.variant} />
          )}
        </div>
      </div>
    </section>
  );
}

function LaneCta({
  cta,
  primary,
  link,
  variant,
}: {
  cta: { label: string; to?: string; onClick?: () => void; event: string };
  primary?: boolean;
  link?: boolean;
  variant?: LaneSectionProps["variant"];
}) {
  const isNavy = variant === "navy";
  const cls = link
    ? isNavy
      ? "text-sm font-semibold text-[hsl(var(--gold-accent))] underline-offset-4 hover:underline"
      : "text-sm font-semibold text-primary underline-offset-4 hover:underline"
    : primary
    ? isNavy
      ? "inline-flex items-center gap-2 rounded-md bg-[hsl(var(--patriot-red))] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[hsl(var(--patriot-red-dark))]"
      : "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
    : isNavy
    ? "inline-flex items-center gap-2 rounded-md border border-white/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
    : "inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted";

  const onClick = () => {
    trackHomeEvent(cta.event);
    cta.onClick?.();
  };

  if (cta.to)
    return (
      <Link to={cta.to} className={cls} onClick={onClick}>
        {cta.label}
      </Link>
    );
  return (
    <button type="button" className={cls} onClick={onClick}>
      {cta.label}
    </button>
  );
}

function ContentCard({ item, onPlay }: { item: ContentItem; onPlay: () => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-md">
      <div className="relative aspect-video bg-muted">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Play className="h-8 w-8" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">
          {laneLabel(item.lane)}
        </p>
        <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
          {item.title}
        </h3>
        {item.summary && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
        )}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          {item.duration && <span>{item.duration}</span>}
          {item.videoUrl && (
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onPlay}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              Watch <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------

function ShortsLayer() {
  return (
    <section id="shorts" className="border-b border-border/60 bg-background">
      <div className="container-wide py-16 md:py-20">
        <Eyebrow>Quick Watch</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Start with a minute. Stay for the mission.
        </h2>

        {shorts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {shorts.map((s) => (
              <a
                key={s.id}
                href={s.videoUrl || "#"}
                target={s.videoUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={() => trackHomeEvent("watch_short_play")}
                className="group block overflow-hidden rounded-xl bg-muted ring-1 ring-border"
                style={{ aspectRatio: "9 / 16" }}
              >
                {s.thumbnailUrl ? (
                  <img
                    src={s.thumbnailUrl}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Play className="h-8 w-8" aria-hidden />
                  </div>
                )}
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-start gap-5 rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <p className="max-w-2xl text-muted-foreground">
              Short-form clips will bring the strongest moments from ValorWell's long-form
              content back into the mission hub.
            </p>
            <button
              type="button"
              onClick={() => {
                trackHomeEvent("watch_short_to_longform");
                scrollToId("lane-navigator");
              }}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Watch the Content Lanes <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------

function FollowStrip() {
  const hasSocial = socialChannels.length > 0;

  return (
    <section id="follow" className="border-b border-border/60 bg-[hsl(var(--section-alt))]">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Stay Connected</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
              Do not just visit once. Follow the build.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              ValorWell is building the mission in public. Follow the channels you actually
              use and come back as the work, stories, tools, and systems grow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {hasSocial ? (
              socialChannels.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackHomeEvent(`watch_follow_${s.key}`)}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  <Radio className="h-4 w-4" aria-hidden /> {s.label}
                </a>
              ))
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    trackHomeEvent("watch_hero_featured");
                    scrollToId("start-here");
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Watch ValorWell
                </button>
                <Link
                  to="/operation-claims-success"
                  onClick={() => trackHomeEvent("watch_action_ocs")}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Explore the Mission
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------

const nextActions: {
  Icon: typeof Compass;
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  to: string;
  event: string;
  accent: string;
}[] = [
  {
    Icon: Compass,
    eyebrow: "The Mission",
    title: "Explore the Veteran Mission",
    copy: "See the care-first path ValorWell is building for veterans and families.",
    cta: "Explore Operation Claims Success",
    to: "/operation-claims-success",
    event: "watch_action_ocs",
    accent: "bg-[hsl(var(--patriot-red))]",
  },
  {
    Icon: Megaphone,
    eyebrow: "The Movement",
    title: "Share a Real-Action Story",
    copy:
      "Know a person or organization whose support would actually be missed if it stopped?",
    cta: "Share a Beyond The Yellow Story",
    to: "/beyondtheyellow",
    event: "watch_action_bty",
    accent: "bg-[hsl(var(--gold-accent))]",
  },
  {
    Icon: Users,
    eyebrow: "Clinicians",
    title: "Join as a Clinician",
    copy:
      "Help build ethical, care-first support and stronger systems for veterans and families.",
    cta: "Join the Clinician Mission",
    to: "/clinicians",
    event: "watch_action_clinician",
    accent: "bg-[hsl(var(--navy))]",
  },
  {
    Icon: Handshake,
    eyebrow: "Leverage",
    title: "Partner or Bring Leverage",
    copy:
      "Connect ValorWell to organizations, creators, supporters, sponsors, funders, or people who can move the work.",
    cta: "Get Involved",
    to: "/partner",
    event: "watch_action_partner",
    accent: "bg-[hsl(var(--navy-light))]",
  },
  {
    Icon: HeartPulse,
    eyebrow: "Care",
    title: "Find Mental Health Care",
    copy:
      "Content is not a substitute for care. When care is what you need, use the care path.",
    cta: "Find Care",
    to: "/get-care",
    event: "watch_action_care",
    accent: "bg-[hsl(var(--sky-blue))]",
  },
];

function NextActions() {
  return (
    <section id="next" className="border-b border-border/60 bg-background">
      <div className="container-wide py-16 md:py-20">
        <div className="max-w-2xl">
          <Eyebrow>Where do you fit?</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            You watched the work. Where do you fit into it?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start with the part of the mission that matters to you.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {nextActions.map((a) => (
            <Link
              key={a.title}
              to={a.to}
              onClick={() => trackHomeEvent(a.event)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${a.accent}`} aria-hidden />
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-white ${a.accent}`}
                aria-hidden
              >
                <a.Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {a.eyebrow}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.copy}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2">
                {a.cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------

function FinalCta() {
  return (
    <section className="bg-[hsl(var(--navy))] text-white">
      <div className="container-wide py-20 md:py-24 text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          Watch the work. Follow the mission. Help move it farther.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          ValorWell is building the better path in public—and Beyond The Yellow is
          spotlighting the people already proving what real action looks like.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              trackHomeEvent("watch_final_watch");
              scrollToId("start-here");
            }}
            className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--patriot-red))] px-5 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--patriot-red-dark))]"
          >
            Watch What We're Building
          </button>
          <Link
            to="/operation-claims-success"
            onClick={() => trackHomeEvent("watch_final_ocs")}
            className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Explore Operation Claims Success
          </Link>
          <Link
            to="/beyondtheyellow"
            onClick={() => trackHomeEvent("watch_final_bty_story")}
            className="text-sm font-semibold text-[hsl(var(--gold-accent))] underline-offset-4 hover:underline"
          >
            Share Your Beyond The Yellow Story →
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-sm text-white/70">
          Real care is the operating engine. Better systems are the mission. Real action is
          the standard.
        </p>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------

function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 mx-4 lg:hidden">
      <button
        type="button"
        onClick={() => scrollToId("lane-navigator")}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--navy))] px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        <Share2 className="h-4 w-4" aria-hidden /> Browse Content
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------

export default function WatchPage() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackHomeEvent("watch_page_view");
  }, []);

  const ocs = useMemo(() => laneItems("ocs"), []);
  const bty = useMemo(() => laneItems("bty"), []);
  const practical = useMemo(() => laneItems("practical-help"), []);
  const build = useMemo(() => laneItems("building-valorwell"), []);

  return (
    <Layout>
      <SEO
        title="Watch ValorWell — Beyond The Yellow, Operation Claims Success & The Mission in Public"
        description="Watch ValorWell build a better care-first path for veterans and families, spotlight real action through Beyond The Yellow, share practical tools, and document the mission in public."
        canonical="/watch"
      />

      <WatchHero />
      <StartHere />
      <LaneNavigator />

      <LaneSection
        id="lane-ocs"
        eyebrow="Operation Claims Success"
        headline="Care first. Not letter first."
        intro="Watch ValorWell explain the broken pathways veterans and families are forced to navigate, the predatory shortcuts that grow out of confusion and desperation, and the care-first alternative being built through Operation Claims Success."
        items={ocs}
        emptyHeadline="The care-first mission is being documented now."
        emptyCopy="Operation Claims Success content will show what ValorWell is building, what the system gets wrong, what we are learning, and why we refuse to promise outcomes we do not control."
        primaryCta={{
          label: "Explore Operation Claims Success",
          to: "/operation-claims-success",
          event: "watch_ocs_explore",
        }}
        secondaryCta={{
          label: "Follow the Build",
          onClick: () => scrollToId("lane-build"),
          event: "watch_ocs_follow_build",
        }}
        tertiaryCta={{
          label: "Join the Clinician Mission",
          to: "/clinicians",
          event: "watch_ocs_clinician",
        }}
        variant="alt"
        playEvent="watch_ocs_play"
      />

      <LaneSection
        id="lane-bty"
        eyebrow="Beyond The Yellow"
        headline="People are out there actually doing something. Watch them."
        intro="Beyond The Yellow is a ValorWell-powered series spotlighting people and organizations taking real action for their communities. The question is simple: if the support stopped tomorrow, would anyone be worse off? Would they even know?"
        items={bty}
        emptyHeadline="The first Beyond The Yellow spotlights belong here."
        emptyCopy="ValorWell is building the guest pipeline now. The series will feature people and organizations whose support would actually be missed if it stopped."
        primaryCta={{
          label: "Share Your Beyond The Yellow Story",
          to: "/beyondtheyellow",
          event: "watch_bty_story",
        }}
        secondaryCta={{
          label: "Go Beyond The Yellow",
          to: "/beyondtheyellow",
          event: "watch_bty_story",
        }}
        tertiaryCta={{
          label: "Know someone doing real work? Nominate them.",
          to: "/beyondtheyellow",
          event: "watch_bty_nominate",
        }}
        variant="gold"
        playEvent="watch_bty_play"
        extra={
          <p className="inline-block rounded-full bg-[hsl(var(--gold-accent))]/25 px-4 py-1.5 text-sm font-semibold text-foreground">
            Support is not a symbol. Support is behavior.
          </p>
        }
      />

      <LaneSection
        id="lane-practical"
        eyebrow="Practical Help"
        headline="Useful before you ever need ValorWell."
        intro="Practical tools for veterans, families, and the people who support them—communication, boundaries, emotional stress, hard conversations, and the things people should not have to figure out alone."
        items={practical}
        emptyHeadline="Practical tools are being built into the content system."
        emptyCopy="ValorWell's practical content is designed to help veterans, families, and supporters with real conversations and real stress before the answer becomes another generic awareness post."
        primaryCta={{
          label: "Explore Veteran & Family Support",
          to: "/veterans",
          event: "watch_practical_veteran_family",
        }}
        secondaryCta={{
          label: "Find Care",
          to: "/get-care",
          event: "watch_practical_care",
        }}
        variant="default"
        playEvent="watch_practical_play"
      />

      <LaneSection
        id="lane-build"
        eyebrow="Building ValorWell"
        headline="See what we're building, what changed, and what still has to be solved."
        intro="Luke shares the mission, the work behind Operation Claims Success, what ValorWell is learning, what is blocked, what changed this week, and what the organization refuses to rush or pretend is finished."
        items={build}
        emptyHeadline="The work should not live behind closed doors."
        emptyCopy="Build updates will show what ValorWell is learning, building, fixing, and refusing to overpromise as the mission moves forward."
        primaryCta={{
          label: "Explore Operation Claims Success",
          to: "/operation-claims-success",
          event: "watch_build_ocs",
        }}
        secondaryCta={{
          label: "Get Involved",
          to: "/partner",
          event: "watch_build_get_involved",
        }}
        variant="navy"
        playEvent="watch_build_play"
      />

      <ShortsLayer />
      <FollowStrip />
      <NextActions />
      <FinalCta />
      <StickyMobileBar />
    </Layout>
  );
}
