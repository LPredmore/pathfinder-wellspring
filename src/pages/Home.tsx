import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackHomepageEvent, type HomepageEvent } from "@/lib/homepageAnalytics";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Users,
  Stethoscope,
  Building2,
  PlayCircle,
  Ribbon,
  Handshake,
  Sparkles,
  Megaphone,
  UserPlus,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Small internal helpers                                                    */
/* -------------------------------------------------------------------------- */

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function TrackedLink({
  to,
  event,
  className,
  children,
  ...rest
}: {
  to: string;
  event: HomepageEvent;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      to={to}
      onClick={() => trackHomepageEvent(event)}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--patriot-red))]">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight">
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section data                                                              */
/* -------------------------------------------------------------------------- */

const routingCards: {
  id: HomepageEvent;
  to: string;
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "homepage_route_care",
    to: "/get-care",
    eyebrow: "Start here",
    title: "I Need Mental Health Care",
    copy: "Looking for therapy, mental health support, or a clearer place to start?",
    cta: "Find Care",
    Icon: HeartPulse,
  },
  {
    id: "homepage_route_veteran",
    to: "/veterans",
    eyebrow: "Veterans & military families",
    title: "I'm a Veteran or Military Family Member",
    copy: "Explore ValorWell's veteran mental health mission, care-first support, and the work behind Operation Claims Success.",
    cta: "Explore Veteran Support",
    Icon: ShieldCheck,
  },
  {
    id: "homepage_route_family",
    to: "/families",
    eyebrow: "Families & individuals",
    title: "I'm Looking for Family Support",
    copy: "Find mental health support and resources built with individuals and families in mind.",
    cta: "Explore Family Support",
    Icon: Users,
  },
  {
    id: "homepage_route_clinician",
    to: "/clinicians",
    eyebrow: "For clinicians",
    title: "I'm a Clinician",
    copy: "Join a mission-driven care organization building systems, standards, and better access—not just filling appointment slots.",
    cta: "Join the Clinician Mission",
    Icon: Stethoscope,
  },
  {
    id: "homepage_route_partner",
    to: "/partner",
    eyebrow: "Organizations",
    title: "I Represent an Organization",
    copy: "Veteran organizations, employers, community groups, creators, and aligned partners can build with ValorWell.",
    cta: "Partner With ValorWell",
    Icon: Building2,
  },
  {
    id: "homepage_route_watch",
    to: "/watch",
    eyebrow: "See the mission",
    title: "I Want to See the Mission",
    copy: "Watch the stories, initiatives, and people showing what real action looks like.",
    cta: "Watch ValorWell",
    Icon: PlayCircle,
  },
];

const foundationCards = [
  {
    title: "Real Care",
    copy: "Mental health support delivered through legitimate clinical relationships and mission-aligned professionals.",
  },
  {
    title: "Better Access",
    copy: "Building clearer pathways so people spend less time trying to understand where they belong.",
  },
  {
    title: "Human Standards",
    copy: "Technology and systems can support care. They do not replace clinical judgment, trust, or the person receiving support.",
  },
];

const ocsProof = [
  { title: "Real Care", copy: "Mental health care before transactional documentation." },
  {
    title: "Ethical Documentation",
    copy: "Documentation only when clinically appropriate and grounded in clinical judgment.",
  },
  {
    title: "Better Pathways",
    copy: "Building and documenting legitimate access and provider processes over time.",
  },
];

const clinicianValues = [
  { title: "Mission", copy: "Work inside an organization willing to build around difficult access problems." },
  { title: "Clinical Judgment", copy: "Care and documentation standards should respect the clinician's professional role." },
  { title: "Infrastructure", copy: "Join a team building repeatable systems instead of expecting clinicians to solve every operational problem alone." },
  { title: "Impact", copy: "Help expand real mental health support for individuals, families, veterans, and communities." },
];

const partnerRoutes: {
  title: string;
  copy: string;
  cta: string;
  Icon: React.ComponentType<{ className?: string }>;
  event: HomepageEvent;
}[] = [
  {
    title: "Veteran and Community Organizations",
    copy: "Build education, awareness, referral, resource, or community relationships.",
    cta: "Partner With ValorWell",
    Icon: Handshake,
    event: "homepage_partner_click",
  },
  {
    title: "Creators and Media",
    copy: "Help useful stories, honest education, and real action reach more people.",
    cta: "Collaborate With ValorWell",
    Icon: Megaphone,
    event: "homepage_partner_click",
  },
  {
    title: "Supporters and Sponsors",
    copy: "Help ValorWell expand content, infrastructure, public education, and mission reach.",
    cta: "Explore Support Opportunities",
    Icon: Sparkles,
    event: "homepage_support_click",
  },
  {
    title: "Connectors",
    copy: "Know a clinician, veteran organization, funder, creator, or partner ValorWell should meet?",
    cta: "Make an Introduction",
    Icon: UserPlus,
    event: "homepage_intro_click",
  },
];

const finalCTAs: { label: string; to: string; event: HomepageEvent }[] = [
  { label: "Find Care", to: "/get-care", event: "homepage_final_care" },
  { label: "Veteran Support", to: "/veterans", event: "homepage_final_veteran" },
  { label: "Join as a Clinician", to: "/clinicians", event: "homepage_final_clinician" },
  { label: "Watch ValorWell", to: "/watch", event: "homepage_final_watch" },
  { label: "Share a Beyond The Yellow Story", to: "/beyondtheyellow", event: "homepage_final_bty" },
  { label: "Partner With ValorWell", to: "/partner", event: "homepage_final_partner" },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Mental Health Care, Veteran Support, and Real Community Action"
        description="ValorWell provides mental health care while building better support pathways for individuals, families, veterans, clinicians, and communities through real care and real action."
        canonical="/"
      />

      {/* ================================================================== */}
      {/*  1. HERO                                                           */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-gradient">
          <div className="container-wide py-16 md:py-24 lg:py-28">
            <div className="max-w-4xl">
              <SectionLabel>ValorWell</SectionLabel>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-[1.05] tracking-tight">
                Mental health care should do more than exist. It should actually reach people.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                ValorWell provides real mental health care while building better pathways for veterans,
                families, clinicians, and communities. Care first. Real action. Systems built around
                people—not paperwork, slogans, or empty support.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => {
                    trackHomepageEvent("homepage_hero_find_path");
                    scrollToId("route");
                  }}
                  className="bg-navy hover:bg-navy-light text-white"
                >
                  Find Your Path
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    trackHomepageEvent("homepage_hero_see_build");
                    scrollToId("mission");
                  }}
                >
                  See What ValorWell Is Building
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Looking for mental health care now?{" "}
                <TrackedLink
                  to="/get-care"
                  event="homepage_route_care"
                  className="underline underline-offset-4 text-navy hover:text-[hsl(var(--patriot-red))]"
                >
                  Get started.
                </TrackedLink>
              </p>

              <p className="mt-10 text-sm md:text-base font-medium text-navy/80">
                Mental health care is the foundation. The mission goes further.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  2. ROLE-BASED ROUTING                                             */}
      {/* ================================================================== */}
      <section id="route" className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionLabel>Find your path</SectionLabel>
            <SectionHeading>What brought you to ValorWell?</SectionHeading>
            <p className="mt-4 text-lg text-muted-foreground">
              Start with the path that sounds most like you. We will help you find the right next step.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {routingCards.map(({ id, to, eyebrow, title, copy, cta, Icon }) => (
              <Link
                key={id}
                to={to}
                onClick={() => trackHomepageEvent(id)}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-6 md:p-7 shadow-sm hover:shadow-md hover:border-navy transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-lg bg-[hsl(var(--sky-blue-light))] p-2.5 text-navy">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy leading-snug">{title}</h3>
                <p className="mt-2 text-muted-foreground flex-1">{copy}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-navy group-hover:text-[hsl(var(--patriot-red))]">
                  {cta}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  3. CARE FOUNDATION                                                */}
      {/* ================================================================== */}
      <section id="mission" className="py-16 md:py-24 section-alt">
        <div className="container-wide grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionLabel>The Foundation</SectionLabel>
            <SectionHeading>Real mental health care comes first.</SectionHeading>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              ValorWell is built around actual mental health care for people and families. The larger
              mission—veteran access, ethical documentation, clinician infrastructure, community
              partnerships, and public education—starts with the same standard: people come before
              systems.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We are not building attention around mental health. We are building care, access, and the
              infrastructure that helps support reach people.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <TrackedLink
                to="/get-care"
                event="homepage_route_care"
                className="inline-flex items-center justify-center rounded-md bg-navy px-5 py-3 text-white font-medium hover:bg-navy-light transition-colors"
              >
                Find Mental Health Care
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                to="/about"
                event="homepage_about_click"
                className="inline-flex items-center justify-center px-3 py-3 text-navy font-medium underline underline-offset-4 hover:text-[hsl(var(--patriot-red))]"
              >
                Learn About ValorWell
              </TrackedLink>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-3">
            {foundationCards.map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-navy">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  4. OPERATION CLAIMS SUCCESS                                       */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
              For Veterans and Families
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Care first. Not letter first.
            </h2>
            <p className="mt-6 text-lg text-white/85 leading-relaxed">
              Operation Claims Success is ValorWell's work to build a care-first alternative to
              predatory veteran documentation models. The mission connects honest access education,
              real mental health care, provider pathway work, and ethical documentation when clinically
              appropriate.
            </p>
            <p className="mt-4 text-lg font-medium text-white">
              No shortcuts. No VA outcome guarantees. No letter-first model.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {ocsProof.map((p) => (
              <div key={p.title} className="rounded-xl border border-white/15 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">{p.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <TrackedLink
              to="/operation-claims-success"
              event="homepage_ocs_click"
              className="inline-flex items-center justify-center rounded-md bg-white text-navy px-5 py-3 font-medium hover:bg-white/90 transition-colors"
            >
              Explore Operation Claims Success
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              to="/operation-claims-success"
              event="homepage_ocs_click"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              Follow the Build
            </TrackedLink>
          </div>

          <p className="mt-8 text-xs md:text-sm text-white/60 max-w-3xl leading-relaxed">
            ValorWell does not guarantee VA Community Care authorization, Nexus Letters, disability
            ratings, service connection, claim approval, or any VA outcome.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  5. BEYOND THE YELLOW                                              */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold-accent))]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(45_90%_30%)]">
              <Ribbon className="h-3.5 w-3.5" />
              The Movement
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight">
              Support is not a symbol. Support is behavior.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Beyond The Yellow is a ValorWell-powered movement spotlighting people and organizations
              taking real action for their communities instead of stopping at symbolic support.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              The question is simple: if the support stopped tomorrow, would anyone be worse off?
              Would they even know?
            </p>
            <p className="mt-6 text-base font-medium text-navy">
              It does not have to be huge. It does have to be real.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <TrackedLink
                to="/watch"
                event="homepage_bty_watch"
                className="inline-flex items-center justify-center rounded-md bg-navy text-white px-5 py-3 font-medium hover:bg-navy-light transition-colors"
              >
                Watch Beyond The Yellow
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                to="/beyondtheyellow"
                event="homepage_bty_story"
                className="inline-flex items-center justify-center rounded-md border border-navy/30 px-5 py-3 font-medium text-navy hover:bg-navy/5 transition-colors"
              >
                Share Your Beyond The Yellow Story
              </TrackedLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border-l-4 border-[hsl(var(--gold-accent))] bg-[hsl(var(--sky-blue-light))] p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-navy">Ask better questions</p>
              <p className="mt-4 text-2xl md:text-3xl font-semibold text-navy leading-snug">
                "If the yellow ribbon came down tomorrow, what would still be here?"
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                Beyond The Yellow episodes, spotlights, and stories will publish here as they are
                released.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  6. WATCH                                                          */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 section-alt">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionLabel>Watch</SectionLabel>
            <SectionHeading>See the mission in motion.</SectionHeading>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch ValorWell conversations, Beyond The Yellow spotlights, founder updates, and the
              work behind the initiatives we are building.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded-xl border border-border bg-card overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white/80">
                <PlayCircle className="h-14 w-14" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Featured</p>
                <h3 className="mt-2 text-xl font-semibold text-navy">
                  New ValorWell stories and build updates are coming here.
                </h3>
                <TrackedLink
                  to="/watch"
                  event="homepage_watch_hub"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-navy hover:text-[hsl(var(--patriot-red))]"
                >
                  Visit the Watch Hub
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </TrackedLink>
              </div>
            </div>

            <div className="lg:col-span-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl border border-dashed border-border bg-card p-5 flex items-center gap-4">
                  <div className="h-16 w-24 flex-shrink-0 rounded-md bg-[hsl(var(--sky-blue-light))] flex items-center justify-center text-navy/60">
                    <PlayCircle className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Coming soon</p>
                    <p className="mt-1 text-sm font-medium text-navy line-clamp-2">
                      New episodes and mission updates will appear here.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <TrackedLink
              to="/watch"
              event="homepage_watch_hub"
              className="inline-flex items-center justify-center rounded-md bg-navy text-white px-5 py-3 font-medium hover:bg-navy-light transition-colors"
            >
              Watch ValorWell
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  7. CLINICIAN MISSION                                              */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionLabel>For Clinicians</SectionLabel>
            <SectionHeading>This is bigger than filling appointment slots.</SectionHeading>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              ValorWell is building a mission-driven clinician network around real care, better access,
              ethical standards, and support for people and communities that are too often forced to
              navigate broken systems alone.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We want clinicians who care about the work—not just the calendar.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clinicianValues.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <TrackedLink
              to="/clinicians"
              event="homepage_clinician_click"
              className="inline-flex items-center justify-center rounded-md bg-navy text-white px-5 py-3 font-medium hover:bg-navy-light transition-colors"
            >
              Join the Clinician Mission
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              to="/about"
              event="homepage_about_click"
              className="inline-flex items-center justify-center rounded-md border border-navy/30 px-5 py-3 font-medium text-navy hover:bg-navy/5 transition-colors"
            >
              Learn About ValorWell
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  8. PARTNER / SUPPORTER ROUTING                                    */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 section-alt">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionLabel>Build With ValorWell</SectionLabel>
            <SectionHeading>
              Some problems are too big for one organization. Good. Let's find the right people.
            </SectionHeading>
            <p className="mt-4 text-lg text-muted-foreground">
              ValorWell is interested in relationships with veteran organizations, community groups,
              clinicians, creators, employers, supporters, sponsors, and people who can make the right
              introduction.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {partnerRoutes.map(({ title, copy, cta, Icon, event }) => (
              <Link
                key={title}
                to="/partner"
                onClick={() => trackHomepageEvent(event)}
                className="group rounded-xl border border-border bg-card p-6 md:p-7 shadow-sm hover:shadow-md hover:border-navy transition-all"
              >
                <div className="rounded-lg bg-[hsl(var(--sky-blue-light))] p-2.5 text-navy w-fit">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-muted-foreground">{copy}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-navy group-hover:text-[hsl(var(--patriot-red))]">
                  {cta}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  9. FOUNDER / MISSION CREDIBILITY                                  */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-navy to-navy-light border border-border flex items-center justify-center overflow-hidden">
              <div className="text-white/60 text-sm text-center px-6">
                Founder photo / video placeholder
                <br />
                (Luke, ValorWell)
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionLabel>From the founder</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-navy leading-tight">
              We're not interested in talking around broken systems. We're building through them.
            </h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                ValorWell started with a simple frustration: too many people need real mental health
                support, and too many systems make reaching that support harder than it should be.
              </p>
              <p>
                We cannot fix every system overnight. We can build better pathways, recruit the right
                clinicians, explain what we learn, challenge predatory models, and put real work
                behind the causes we say matter.
              </p>
              <p className="text-navy font-medium">That's the standard behind ValorWell.</p>
            </div>
            <div className="mt-6">
              <p className="font-semibold text-navy">Luke</p>
              <p className="text-sm text-muted-foreground">Founder, ValorWell</p>
            </div>
            <div className="mt-8">
              <TrackedLink
                to="/about"
                event="homepage_about_click"
                className="inline-flex items-center rounded-md border border-navy/30 px-5 py-3 font-medium text-navy hover:bg-navy/5 transition-colors"
              >
                Why ValorWell Exists
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  10. FINAL CHOOSE-YOUR-PATH                                        */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              You do not need to understand all of ValorWell to take the next step.
            </h2>
            <p className="mt-4 text-lg text-white/80">Start with why you are here.</p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {finalCTAs.map((c) => (
              <TrackedLink
                key={c.label}
                to={c.to}
                event={c.event}
                className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.04] px-5 py-4 font-medium hover:bg-white/10 hover:border-white/40 transition-colors"
              >
                <span>{c.label}</span>
                <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </TrackedLink>
            ))}
          </div>

          <p className="mt-10 text-base md:text-lg text-white/75 max-w-3xl">
            Real care is the foundation. Better systems are the mission. Real action is the standard.
          </p>
        </div>
      </section>
    </Layout>
  );
}
