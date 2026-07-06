import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Radio, Wrench, Users, Hammer, Compass, ShieldCheck, Sparkles, Megaphone, Handshake } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, OrganizationSchema } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import soldierPortrait from "@/assets/soldier-portrait.jpg";
import heroFamily from "@/assets/hero-family.jpg";
import flagBanner from "@/assets/flag-banner.jpg";

const initiatives = [
  {
    key: "ocs",
    title: "Operation Claims Success",
    tagline: "Honest access education and ethical documentation.",
    description:
      "Our public mission spine: connect veterans with truthful VA-aligned education, real mental health care, and ethical documentation when clinically appropriate — no shortcuts, no exploitation.",
    href: "/operation-claims-success",
    cta: "Explore OCS",
    image: soldierPortrait,
    mobileBg: "bg-primary text-primary-foreground",
    mobileBtn: "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
  },
  {
    key: "care",
    title: "Real Medical Care",
    tagline: "Clinical services that actually treat, not just certify.",
    description:
      "The operating engine underneath the mission. Licensed clinicians providing real mental health treatment for veterans and families — care-first, not letter-first.",
    href: "/therapy",
    cta: "Get Care",
    image: heroFamily,
    mobileBg: "bg-accent text-accent-foreground",
    mobileBtn: "bg-accent-foreground text-accent hover:bg-accent-foreground/90",
  },
  {
    key: "bty",
    title: "Beyond The Yellow",
    tagline: "The movement that fuels the mission.",
    description:
      "Creators, families, and everyday supporters amplifying the work, funding access to care, and turning attention into real change for veterans.",
    href: "/beyondtheyellow",
    cta: "Join The Movement",
    image: flagBanner,
    mobileBg: "bg-[hsl(45_90%_45%)] text-primary",
    mobileBtn: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
];

/* ---------------- Small building blocks ---------------- */

function Eyebrow({ children, tone = "navy" }: { children: React.ReactNode; tone?: "navy" | "red" | "yellow" }) {
  const toneCls =
    tone === "red"
      ? "text-accent"
      : tone === "yellow"
      ? "text-[hsl(45_90%_35%)]"
      : "text-primary";
  return (
    <div className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]", toneCls)}>
      <span className={cn("h-px w-8", tone === "red" ? "bg-accent" : tone === "yellow" ? "bg-[hsl(45_90%_45%)]" : "bg-primary/60")} aria-hidden />
      {children}
    </div>
  );
}

function BtnPrimary({ to, onClick, children }: { to: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

function BtnSecondary({ to, onClick, children }: { to: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-transparent px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
}

function BtnGhost({ to, onClick, children }: { to: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      {children}
    </Link>
  );
}

/* ---------------- Page ---------------- */

export default function HomePage() {
  const scrollToMission = useCallback(() => {
    trackHomeEvent("homepage_hero_see_build");
    const el = document.getElementById("mission");
    if (!el) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduce ? "auto" : "smooth", block: "start" });
  }, []);

  useEffect(() => {
    trackHomeEvent("homepage_view");
  }, []);

  return (
    <Layout>
      <SEO
        title="Building Better Systems for Veterans, Families, and Human Well-Being"
        description="ValorWell is building better systems around veteran and family support, mental well-being, ethical care, and real community action through Operation Claims Success, Beyond The Yellow, and a real clinical operating engine."
        canonical="/"
      />
      <OrganizationSchema />

      {/* 2. Mission-first hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-background">
        {/* subtle editorial background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow tone="red">A mission, not a clinic</Eyebrow>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Broken systems don't need more awareness.{" "}
              <span className="text-primary">They need people willing to build better ones.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              ValorWell is building better pathways around mental well-being, veteran care, ethical clinical support, and real community action. Our biggest mission right now is transforming the way veterans and families navigate care, VA-aligned access, and predatory documentation systems.
            </p>
            <p className="mt-4 max-w-2xl text-base font-medium text-foreground/80">
              A mission with real care, real infrastructure, and a public movement underneath it.
            </p>

          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <Eyebrow tone="navy">Currently building</Eyebrow>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-semibold text-foreground">Operation Claims Success</p>
                    <p className="text-muted-foreground">Care-first alternative to the predatory documentation market.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(45_90%_40%)]" aria-hidden />
                  <div>
                    <p className="font-semibold text-foreground">Beyond The Yellow</p>
                    <p className="text-muted-foreground">A movement spotlighting people taking real action.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="font-semibold text-foreground">A real operating engine</p>
                    <p className="text-muted-foreground">Actual clinical infrastructure underneath the mission.</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* 2.5 Current Initiatives */}
      <section className="border-b border-border/60 bg-background">
        <div className="container-wide py-16 md:py-24">
          <div className="max-w-3xl">
            <Eyebrow tone="red">Our Current Initiatives</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Three fronts. One mission.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore how ValorWell is building the better path — from public advocacy to real clinical care to a movement of supporters.
            </p>
          </div>

          {/* Desktop: 3 hover-reveal squares */}
          <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
            {initiatives.map((it) => (
              <Link
                key={it.key}
                to={it.href}
                onClick={() => trackHomeEvent(`homepage_initiative_${it.key}` as never)}
                className="group relative block aspect-square overflow-hidden rounded-lg border border-border/60 bg-foreground/5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <img
                  src={it.image}
                  alt={it.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* base title overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="text-2xl font-bold text-white drop-shadow">{it.title}</h3>
                </div>
                {/* hover reveal */}
                <div className="absolute inset-0 flex flex-col justify-end bg-primary/95 p-6 text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100">
                  <h3 className="text-2xl font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm font-medium text-primary-foreground/90">{it.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">{it.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    {it.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile/Tablet: single-open colored accordion */}
          <div className="mt-10 md:hidden">
            <Accordion type="single" collapsible className="space-y-3">
              {initiatives.map((it) => (
                <AccordionItem
                  key={it.key}
                  value={it.key}
                  className={cn("overflow-hidden rounded-lg border-0", it.mobileBg)}
                >
                  <AccordionTrigger className="px-5 py-4 text-left text-lg font-bold hover:no-underline">
                    {it.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <p className="text-sm font-semibold opacity-90">{it.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed opacity-90">{it.description}</p>
                    <Link
                      to={it.href}
                      onClick={() => trackHomeEvent(`homepage_initiative_${it.key}_mobile` as never)}
                      className={cn(
                        "mt-5 inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors",
                        it.mobileBtn
                      )}
                    >
                      {it.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 3. Current mission / Operation Claims Success */}
      <section id="mission" className="border-b border-border/60 bg-background">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow tone="red">The Mission Right Now</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Care first. Not letter first.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Too many veterans and families are forced to navigate confusing care pathways, unclear VA systems, long delays, and an expensive documentation market built around desperation. ValorWell is building a care-first alternative.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Operation Claims Success is our work to connect honest VA-aligned access education, real mental health care, provider pathway infrastructure, and ethical documentation when clinically appropriate.
              </p>
              <blockquote className="mt-8 border-l-4 border-accent pl-5 text-xl font-semibold leading-snug text-foreground md:text-2xl">
                We are not selling the shortcut. We are building the better path.
              </blockquote>

              <div className="mt-10 flex flex-wrap gap-4">
                <BtnPrimary to="/operation-claims-success" onClick={() => trackHomeEvent("homepage_ocs_explore")}>
                  Explore Operation Claims Success
                </BtnPrimary>
                <BtnSecondary to="/watch" onClick={() => trackHomeEvent("homepage_ocs_follow_build")}>
                  Follow the Build
                </BtnSecondary>
              </div>
              <div className="mt-4">
                <BtnGhost to="/partner" onClick={() => trackHomeEvent("homepage_ocs_org")}>
                  Represent a veteran organization? Talk with ValorWell →
                </BtnGhost>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-1">
                {[
                  {
                    icon: Compass,
                    title: "Access Pathways",
                    body: "Building and documenting legitimate provider and VA Community Care pathways so access can become more repeatable over time.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Real Care",
                    body: "Operating actual mental health care infrastructure instead of separating documentation from the person.",
                  },
                  {
                    icon: Sparkles,
                    title: "Ethical Documentation",
                    body: "Supporting documentation only when clinically appropriate, grounded in clinical judgment, with no promised VA outcomes.",
                  },
                ].map((p) => (
                  <div key={p.title} className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-primary/10 p-2.5 text-primary">
                        <p.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                        <p className="mt-1.5 text-muted-foreground">{p.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-md border border-border/60 bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                ValorWell does not guarantee VA Community Care authorization, referrals, Nexus Letters, disability ratings, service connection, claim approval, or any VA outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Build in Public — REMOVED */}

      {/* 5. Beyond The Yellow */}
      <section className="relative border-b border-border/60 bg-background">
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 85% 20%, hsl(45 90% 55% / 0.18), transparent 55%), radial-gradient(ellipse at 10% 90%, hsl(45 90% 55% / 0.10), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow tone="yellow">The Movement</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Support is not a symbol. <span className="text-[hsl(45_90%_40%)]">Support is behavior.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Beyond The Yellow is a ValorWell-powered movement spotlighting people and organizations taking real action for their communities instead of stopping at symbolic support.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                The test is simple: if the support stopped tomorrow, would anyone be worse off? Would they even know?
              </p>
              <p className="mt-8 border-l-4 border-[hsl(45_90%_45%)] pl-5 text-xl font-semibold leading-snug text-foreground md:text-2xl">
                People are out there actually doing something. Are you?
              </p>
              <p className="mt-8 text-base text-muted-foreground">
                Beyond The Yellow is how ValorWell puts an action-first worldview into public motion. We spotlight the people doing the work, give their stories a platform, borrow audience through real relationships, and bring more people into a culture where support has to be felt—not merely displayed.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <BtnPrimary to="/watch" onClick={() => trackHomeEvent("homepage_bty_watch")}>
                  Watch Beyond The Yellow
                </BtnPrimary>
                <BtnSecondary to="/beyondtheyellow" onClick={() => trackHomeEvent("homepage_bty_story")}>
                  Share Your Story
                </BtnSecondary>
              </div>
              <div className="mt-4">
                <BtnGhost to="/beyondtheyellow" onClick={() => trackHomeEvent("homepage_bty_go")}>
                  Go Beyond The Yellow →
                </BtnGhost>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-foreground/90 via-foreground/70 to-primary/60">
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-background">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[hsl(45_90%_55%)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground">
                      Beyond The Yellow
                    </span>
                    <span className="text-xs uppercase tracking-wider opacity-80">A ValorWell movement</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold leading-tight md:text-4xl">
                      "The ribbon is a start. The behavior is the standard."
                    </p>
                    <p className="mt-6 text-sm uppercase tracking-widest opacity-80">
                      Hosted by Luke · Founder, ValorWell
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Watch / content growth engine */}
      <section className="border-b border-border/60 bg-foreground text-background">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow tone="yellow">Watch ValorWell</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                The mission is being built in public. Watch it happen.
              </h2>
              <p className="mt-6 max-w-3xl text-lg text-background/70">
                Beyond The Yellow interviews borrow audience. Founder and mission videos build trust and positioning. Practical veteran and family content earns attention by helping people now. Short-form content carries the work farther.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/watch"
                onClick={() => trackHomeEvent("homepage_watch_featured")}
                className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-background/90"
              >
                <Play className="h-4 w-4" aria-hidden /> Watch ValorWell
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                key: "bty",
                label: "Beyond The Yellow",
                body: "Guest conversations spotlighting people and organizations taking real action.",
                event: "homepage_watch_lane_bty",
              },
              {
                key: "ocs",
                label: "Operation Claims Success",
                body: "Care-first, anti-predatory, veteran-system, and build-in-public content.",
                event: "homepage_watch_lane_ocs",
              },
              {
                key: "help",
                label: "Practical Help",
                body: "Useful veteran, family, emotional well-being, communication, and support tools.",
                event: "homepage_watch_lane_help",
              },
              {
                key: "build",
                label: "Building ValorWell",
                body: "Luke explains what is being built, what changed, what is blocked, and why the work matters.",
                event: "homepage_watch_lane_build",
              },
            ].map((c) => (
              <Link
                key={c.key}
                to="/watch"
                onClick={() => trackHomeEvent(c.event)}
                className="group rounded-xl border border-background/15 bg-background/5 p-5 transition-colors hover:border-background/40 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60"
              >
                <div className="aspect-video w-full overflow-hidden rounded-md bg-background/10 ring-1 ring-inset ring-background/10">
                  <div className="flex h-full items-center justify-center">
                    <Play className="h-8 w-8 text-background/60 transition-colors group-hover:text-background" aria-hidden />
                  </div>
                </div>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-background">{c.label}</h3>
                <p className="mt-2 text-sm text-background/70">{c.body}</p>
              </Link>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm text-background/60">
            The ValorWell content engine is being built now. Follow the mission, watch the work, and see what comes next.
          </p>
        </div>
      </section>

      {/* 7. Choose Your Lane */}
      <section className="border-b border-border/60 bg-background">
        <div className="container-wide py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Choose Your Lane</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Where do you fit into what ValorWell is building?
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              You do not need to understand the whole system. Start with why you are here.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "I'm a Veteran or Family Member",
                body: "Understand the mission, explore the care-first path, follow the build, and find the right next place to start.",
                cta: "Explore Veteran Support",
                to: "/veterans",
                event: "homepage_route_veteran",
              },
              {
                title: "I Want to Watch or Follow the Mission",
                body: "See Beyond The Yellow, Operation Claims Success, practical tools, and founder build updates.",
                cta: "Watch ValorWell",
                to: "/watch",
                event: "homepage_route_watch",
              },
              {
                title: "I Need Mental Health Care",
                body: "Looking for actual mental health support or a clearer care starting point?",
                cta: "Find Care",
                to: "/get-care",
                event: "homepage_route_care",
              },
              {
                title: "I'm a Clinician",
                body: "Join a mission that is building systems, standards, and better access—not just filling appointment slots.",
                cta: "Join the Clinician Mission",
                to: "/clinicians",
                event: "homepage_route_clinician",
              },
              {
                title: "I Represent an Organization",
                body: "Veteran organizations, community groups, employers, creators, and aligned organizations can build with ValorWell.",
                cta: "Partner With ValorWell",
                to: "/partner",
                event: "homepage_route_partner",
              },
              {
                title: "I Can Bring Leverage",
                body: "Support, sponsor, distribute, create, introduce, or connect ValorWell to people who can move the mission farther.",
                cta: "Get Involved",
                to: "/partner",
                event: "homepage_route_leverage",
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to}
                onClick={() => trackHomeEvent(c.event)}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.body}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Operating engine (real clinical infrastructure) */}
      <section className="border-b border-border/60 bg-[hsl(var(--section-alt))]">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>The Operating Engine</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                The mission has real clinical infrastructure underneath it.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                ValorWell operates real mental health care because care-first cannot be a slogan. The clinical side of ValorWell creates the care relationships, clinician infrastructure, and operational capacity required to do the broader work responsibly.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                When someone needs mental health care, the clinic matters immediately. When ValorWell challenges a broken system, the clinic proves there is a real care engine behind the mission.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <BtnPrimary to="/get-care" onClick={() => trackHomeEvent("homepage_care_click")}>
                  Find Mental Health Care
                </BtnPrimary>
                <BtnSecondary to="/about" onClick={() => trackHomeEvent("homepage_about_click")}>
                  Learn About ValorWell
                </BtnSecondary>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4">
                {[
                  { title: "Real Care", body: "Legitimate mental health care through clinical relationships and mission-aligned professionals." },
                  { title: "Clinical Judgment", body: "Systems and technology can support care. They do not replace the clinician or the person receiving care." },
                  { title: "Operating Capacity", body: "Care delivery, clinician infrastructure, and revenue create the ability to keep building the wider mission." },
                ].map((p, i) => (
                  <div key={p.title} className="flex gap-5 rounded-xl border border-border bg-card p-6">
                    <div className="text-2xl font-bold text-primary/60 tabular-nums">0{i + 1}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-1.5 text-muted-foreground">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Clinician mission */}
      <section className="border-b border-border/60 bg-background">
        <div className="container-wide py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow tone="red">For Clinicians</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              This is bigger than filling appointment slots.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              ValorWell needs clinicians who want to help build ethical, care-first support for veterans and families while strengthening the clinical systems underneath the broader mission.
            </p>
            <p className="mt-4 text-lg font-medium text-foreground/80">
              We want clinicians who care about the work—not just the calendar.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Mission", body: "Help build better care-first systems around problems too many people are forced to navigate alone." },
              { title: "Clinical Judgment", body: "Clinical standards, care, and documentation must respect the clinician's professional role." },
              { title: "Infrastructure", body: "Join an organization building repeatable systems instead of expecting clinicians to solve every operational problem alone." },
              { title: "Veteran and Family Impact", body: "Help strengthen real mental health support and better pathways for veterans and the people who support them." },
            ].map((v) => (
              <div key={v.title} className="border-t-2 border-primary/60 pt-5">
                <h3 className="text-base font-semibold uppercase tracking-wider text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <BtnPrimary to="/clinicians" onClick={() => trackHomeEvent("homepage_clinician_click")}>
              Join the Clinician Mission
            </BtnPrimary>
            <button
              type="button"
              onClick={scrollToMission}
              className="inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-transparent px-5 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5"
            >
              See What We're Building
            </button>
          </div>
        </div>
      </section>

      {/* 10. Leverage */}
      <section className="border-b border-border/60 bg-[hsl(var(--section-alt))]">
        <div className="container-wide py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Bring Leverage</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              We do not need more logos around the mission. We need more people who can move the work.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              ValorWell is interested in veteran organizations, community groups, creators, media, clinicians, employers, supporters, sponsors, funders, and connectors who can help real action travel farther or help the infrastructure become stronger.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Veteran and Community Organizations",
                body: "Education, collaboration, shared resources, introductions, Beyond The Yellow stories, and mission-aligned relationships.",
                cta: "Partner With ValorWell",
                event: "homepage_partner_click",
              },
              {
                icon: Megaphone,
                title: "Creators and Media",
                body: "Interviews, guest introductions, distribution, education, and stories worth amplifying.",
                cta: "Collaborate With ValorWell",
                event: "homepage_creator_click",
              },
              {
                icon: Sparkles,
                title: "Supporters and Sponsors",
                body: "Help expand content, education, infrastructure, reach, and the work required to build better systems.",
                cta: "Explore Support Opportunities",
                event: "homepage_support_click",
              },
              {
                icon: Handshake,
                title: "Connectors",
                body: "Introduce ValorWell to clinicians, veteran organizations, funders, creators, sponsors, and people who should know each other.",
                cta: "Make an Introduction",
                event: "homepage_intro_click",
              },
            ].map((l) => (
              <div key={l.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-primary/10 p-2.5 text-primary">
                    <l.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{l.title}</h3>
                    <p className="mt-1.5 text-muted-foreground">{l.body}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <Link
                    to={`/partner?lane=${l.event}`}
                    onClick={() => trackHomeEvent(l.event, { lane: l.title })}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {l.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Founder credibility (text-led — no approved photo asset) */}
      <section className="border-b border-border/60 bg-background">
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Founder</p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">Luke</p>
                <p className="mt-1 text-sm text-muted-foreground">Founder, ValorWell</p>
                <p className="text-sm text-muted-foreground">Host, Beyond The Yellow</p>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    Publicly building a care-first alternative to broken systems veterans and families are forced to navigate alone.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Eyebrow tone="red">Why ValorWell exists</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                We're not interested in talking around broken systems. We're building through them.
              </h2>
              <div className="mt-8 space-y-5 text-lg text-muted-foreground">
                <p>
                  ValorWell started with a simple frustration: too many people need real support, and too many systems make reaching that support harder than it should be.
                </p>
                <p>
                  We cannot fix every system overnight. We can build better pathways, recruit the right clinicians, explain what we learn, challenge predatory models, spotlight people taking real action, and put real work behind the causes we say matter.
                </p>
                <p className="font-medium text-foreground">That's the standard behind ValorWell.</p>
              </div>
              <div className="mt-10">
                <BtnPrimary to="/about" onClick={() => trackHomeEvent("homepage_about_click", { source: "founder" })}>
                  Why ValorWell Exists
                </BtnPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Final mission CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
          aria-hidden
        />
        <div className="container-wide relative py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Watch the work. Join the mission. Find your place in it.
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/80">
              ValorWell is building the better path in public. Start with the part that matters to you.
            </p>
          </div>

          {(() => {
            const finals: { label: string; to: string; event: string }[] = [
              { label: "Explore Operation Claims Success", to: "/operation-claims-success", event: "homepage_final_ocs" },
              { label: "Watch ValorWell", to: "/watch", event: "homepage_final_watch" },
              { label: "Share a Beyond The Yellow Story", to: "/beyondtheyellow", event: "homepage_final_bty" },
              { label: "Veteran & Family Support", to: "/veterans", event: "homepage_final_veteran" },
              { label: "Find Care", to: "/get-care", event: "homepage_final_care" },
              { label: "Join the Clinician Mission", to: "/clinicians", event: "homepage_final_clinician" },
              { label: "Partner With ValorWell", to: "/partner", event: "homepage_final_partner" },
              { label: "Bring an Introduction", to: "/partner", event: "homepage_final_intro" },
            ];
            return (
              <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {finals.map((f) => (
                  <Link
                    key={f.label}
                    to={f.to}
                    onClick={() => trackHomeEvent(f.event)}
                    className="group flex items-center justify-between rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/50 hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60"
                  >
                    <span>{f.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                ))}
              </div>
            );
          })()}

          <p className="mt-12 max-w-3xl border-t border-primary-foreground/20 pt-6 text-base text-primary-foreground/85">
            Real care is the operating engine. Better systems are the mission. Real action is the standard.
          </p>
        </div>
      </section>
    </Layout>
  );
}
