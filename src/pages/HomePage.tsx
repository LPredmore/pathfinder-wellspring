import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Users, Compass, ShieldCheck, Sparkles, Megaphone, Handshake } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO, OrganizationSchema } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ClickToLoadYouTubeShort } from "@/components/ClickToLoadYouTubeShort";
import soldierPortrait from "@/assets/soldier-portrait.jpg";
import heroFamily from "@/assets/hero-family.jpg";
import flagBanner from "@/assets/flag-banner.jpg";

// Drop a YouTube Short video ID here (the part after /shorts/ or ?v=) to swap the hero placeholder.
const HERO_SHORT_VIDEO_ID = "";

const initiatives = [
  {
    key: "ocs",
    title: "Operation Claims Success",
    tagline: "Care First, stopping predatory systems",
    description:
      "Veterans should not have to choose between a confusing system and an expensive shortcut. Operation Claims Success is the better care-first path we're building.",
    href: "/operation-claims-success",
    cta: "Explore OCS",
    image: soldierPortrait,
    mobileBg: "bg-primary text-primary-foreground",
    mobileBtn: "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
  },
  {
    key: "bty",
    title: "Beyond The Yellow",
    tagline: "Real support should be felt.",
    description:
      "Beyond The Yellow spotlights people and organizations doing more than talking about a cause. We show the action, share the story, and make doing something contagious.",
    href: "/beyondtheyellow",
    cta: "Go Beyond The Yellow\n",
    image: flagBanner,
    mobileBg: "bg-[hsl(42_71%_51%)] text-primary",
    mobileBtn: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    key: "care",
    title: "Real Mental Health Care",
    tagline: "Care first only works if real care exists.",
    description:
      "Licensed clinicians. Real clinical relationships. Mental health care grounded in the person—not a transaction around paperwork. This is the operating engine underneath the mission.",
    href: "/therapy",
    cta: "Find Care\u00a0",
    image: heroFamily,
    mobileBg: "bg-accent text-accent-foreground",
    mobileBtn: "bg-accent-foreground text-accent hover:bg-accent-foreground/90",
  },
];


/* ---------------- Small building blocks ---------------- */

function Eyebrow({ children, tone = "navy" }: { children: React.ReactNode; tone?: "navy" | "red" | "yellow" }) {
  const toneCls =
    tone === "red"
      ? "text-accent"
      : tone === "yellow"
      ? "text-[hsl(42_71%_35%)]"
      : "text-primary";
  return (
    <div className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]", toneCls)}>
      <span className={cn("h-px w-8", tone === "red" ? "bg-accent" : tone === "yellow" ? "bg-[hsl(42_71%_51%)]" : "bg-primary/60")} aria-hidden />
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

      <div className="home-theme">
      <style>{`
        .home-theme {
          /* Field Dispatch — same palette as /mission, scoped to Home only */
          --background: 43 40% 93%;        /* #F4F1E8 paper */
          --foreground: 145 9% 15%;        /* #1F2A24 ink */
          --card: 43 40% 93%;
          --card-foreground: 145 9% 15%;
          --popover: 43 40% 93%;
          --popover-foreground: 145 9% 15%;
          --primary: 145 15% 27%;          /* #3B5147 forest */
          --primary-foreground: 43 40% 93%;
          --secondary: 44 33% 88%;         /* #EAE5D6 paper-2 */
          --secondary-foreground: 145 9% 15%;
          --muted: 44 33% 88%;
          --muted-foreground: 145 9% 35%;
          --accent: 9 51% 46%;             /* #B24A3A rust */
          --accent-foreground: 43 40% 93%;
          --border: 145 9% 80%;
          --input: 145 9% 80%;
          --ring: 145 15% 27%;
          --section-alt: 44 33% 88%;
          --hero-gradient-start: 43 40% 93%;
          --hero-gradient-end: 44 33% 88%;

          font-family: "Trebuchet MS", "Lucida Sans", "Lucida Grande", sans-serif;
        }
        .home-theme h1, .home-theme h2, .home-theme h3,
        .home-theme h4, .home-theme h5, .home-theme h6 {
          font-family: "Trebuchet MS", "Lucida Sans", "Lucida Grande", sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>



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
            <Eyebrow tone="red">A MISSION, NOT JUST A CLINIC</Eyebrow>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Broken systems don't need more awareness.{" "}
              <span className="text-primary">They need people willing to build better ones.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Veterans and families are being forced to navigate confusing care systems, unclear pathways, and expensive shortcuts. ValorWell is building the care-first alternative—and we're showing the work as we build it.
            </p>
            <p className="mt-4 max-w-2xl text-base font-medium text-foreground/80">
              Real care underneath the mission. Real action around it. Better systems as the goal.
            </p>

          </div>

          <aside className="lg:col-span-4">
            {HERO_SHORT_VIDEO_ID ? (
              <ClickToLoadYouTubeShort
                videoId={HERO_SHORT_VIDEO_ID}
                title="ValorWell founder short"
              />
            ) : (
              <div
                className="relative mx-auto flex max-w-sm items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card shadow-sm"
                style={{ aspectRatio: "9 / 16" }}
                aria-label="Founder short video placeholder"
              >
                <div className="flex flex-col items-center gap-3 px-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Play className="h-6 w-6" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Founder short coming soon</p>
                  <p className="text-xs text-muted-foreground">A vertical YouTube Short will live here.</p>
                </div>
              </div>
            )}
          </aside>

        </div>
      </section>

      {/* 2.5 Current Initiatives */}
      <section className="border-b border-border/60 bg-background">
        <div className="container-wide py-16 md:py-24">
          <div className="max-w-3xl">
            <Eyebrow tone="red">WHAT WE'RE BUILDING RIGHT NOW</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Three fronts. One mission.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Operation Claims Success is the path we're building for veterans and families. Beyond The Yellow makes real action visible and contagious. Real clinical care is the engine underneath the work.
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
              <p className="mt-6 text-lg text-muted-foreground whitespace-pre-line">
                When real care is hard to reach and the system is hard to understand, desperation grows. And when people get desperate, expensive shortcuts start looking like the only option.

                Veterans and families deserve better than that.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Operation Claims Success is ValorWell's work to build the better path: clearer access education, real mental health care, better provider infrastructure, and ethical documentation when clinically appropriate.
              </p>
              <blockquote className="mt-8 border-l-4 border-accent pl-5 text-xl font-semibold leading-snug text-foreground md:text-2xl">
                We are not selling the shortcut. We are building the better path.
              </blockquote>

              <div className="mt-10 flex flex-wrap gap-4">
                <BtnPrimary to="/operation-claims-success" onClick={() => trackHomeEvent("homepage_ocs_explore")}>
                  Explore Operation Claims Success
                </BtnPrimary>
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
                    title: "A Clearer Way Through",
                    body: "We're documenting legitimate provider and VA Community Care pathways so veterans, families, and clinicians can better understand where the real path starts.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "The Person Before the Paperwork",
                    body: "Real clinical relationships come first. Documentation should never become more important than the person it is supposed to support.",
                  },
                  {
                    icon: Sparkles,
                    title: "Ethical Documentation",
                    body: "When documentation is clinically appropriate, it should be grounded in real care and clinician judgment—not sold with a false promise.",
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
              "radial-gradient(ellipse at 85% 20%, hsl(42 71% 51% / 0.18), transparent 55%), radial-gradient(ellipse at 10% 90%, hsl(42 71% 51% / 0.10), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="container-wide py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow tone="yellow">The Movement</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Support is not a symbol. <span className="text-[hsl(42_71%_40%)]">Support is behavior.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Beyond The Yellow is a ValorWell-powered movement spotlighting people and organizations taking real action for their communities instead of stopping at symbolic support.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                The test is simple: if we stopped showing our support tomorrow, would anyone be worse off? Would they even know?
              </p>
              <p className="mt-8 border-l-4 border-[hsl(42_71%_51%)] pl-5 text-xl font-semibold leading-snug text-foreground md:text-2xl">
                People are out there actually doing something. Are you?
              </p>
              <p className="mt-8 text-base text-muted-foreground">
                Beyond The Yellow puts the spotlight on people who are actually doing the work. We show the action. We share the story. We help more people see what real support looks like.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <BtnPrimary to="/watch" onClick={() => trackHomeEvent("homepage_bty_watch")}>
                  Watch Beyond The Yellow
                </BtnPrimary>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-foreground/90 via-foreground/70 to-primary/60">
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-background">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[hsl(42_71%_51%)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground">
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

      {/* 7. Choose Your Lane */}
      <section className="border-b border-border/60 bg-background">
        <div className="container-wide py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Choose Your Lane</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Where do you fit into what ValorWell is building?
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              You don't need to understand the whole organization. Pick the role that sounds most like you—and take the next step.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "I'm a Veteran or Family Member",
                body: "You're trying to make sense of care, access, or a system that should not be this hard to navigate. Start with the better path we're building.",
                cta: "Explore Veteran & Family Support",
                to: "/veterans",
                event: "homepage_lane_veteran_family",
              },
              {
                title: "I Need Mental Health Care",
                body: "You're looking for real mental health care and a clear place to start. We'll take you to the care path.",
                cta: "Find Care",
                to: "/get-care",
                event: "homepage_lane_care",
              },
              {
                title: "I'm a Clinician",
                body: "You want your clinical work to be part of something bigger than a calendar of sessions. Help build ethical, care-first systems for veterans and families.",
                cta: "Join the Clinician Mission",
                to: "/clinicians",
                event: "homepage_lane_clinician",
              },
              {
                title: "I Want to Join the Mission",
                body: "You have something that could move this farther—reach, relationships, resources, expertise, or the right introduction. Bring it.",
                cta: "Join the Mission",
                to: "/partner",
                event: "homepage_lane_join",
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
              <Eyebrow>REAL CARE UNDERNEATH THE MISSION</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Care first only means something if real care exists.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                ValorWell operates a real mental health clinic with licensed clinicians and real clinical relationships. The clinic is not the whole mission. It is the engine that keeps the mission grounded in the people and problems we're trying to serve.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                When someone needs care, the clinic matters immediately. When we challenge a broken system, the clinic proves we're building from real clinical work—not theory.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <BtnPrimary to="/get-care" onClick={() => trackHomeEvent("homepage_care_click")}>
                  Find Mental Health Care
                </BtnPrimary>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4">
                {[
                  { title: "Real Care", body: "Legitimate mental health care through clinical relationships and mission-aligned professionals." },
                  { title: "Clinical Judgment", body: "Technology can support care. Systems can support care. Neither replaces the clinician or the person receiving it." },
                  { title: "Infrastructure That Makes the Mission Real", body: "Clinicians, care delivery, and operating systems give ValorWell the capacity to keep building beyond the clinic." },
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
              We're looking for clinicians who believe real care, ethical documentation, and better access pathways belong together—and who want to help build the systems that make that possible for veterans and families.
            </p>
            <p className="mt-4 text-lg font-medium text-foreground/80 whitespace-pre-line">
              Your sessions matter. So does the system around them.{"\n\n\n"}If you want your clinical work to matter beyond the session, we should talk
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Mission", body: "Do clinical work connected to a public mission veterans and families can actually feel." },
              { title: "Clinical Judgment", body: "Your judgement stays clinical and in your hands. National Boards have said you are qualified to make decisions. Why would we question that?" },
              { title: "Infrastructure", body: "Join an organization building repeatable systems instead of expecting clinicians to solve every operational problem alone." },
              { title: "Veteran and Family Impact", body: "Help build a better care-first path through systems too many veterans and families are forced to figure out alone." },
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
              Maybe you don't provide clinical care. That's fine. This mission also needs reach, relationships, resources, expertise, distribution, and the right introductions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Veteran and Community Organizations",
                body: "You already serve people we're trying to reach. Let's share what we know, build better connections, surface real stories, and make useful work travel farther.",
                cta: "Partner With ValorWell",
                event: "homepage_partner_click",
              },
              {
                icon: Megaphone,
                title: "Creators and Media",
                body: "You know how to earn attention. Help important work reach people who can actually do something with it.",
                cta: "Collaborate With ValorWell",
                event: "homepage_creator_click",
              },
              {
                icon: Sparkles,
                title: "Supporters and Sponsors",
                body: "Help expand the education, content, reach, and infrastructure required to build better systems.",
                cta: "Explore Support Opportunities",
                event: "homepage_support_click",
              },
              {
                icon: Handshake,
                title: "Connectors",
                body: "You may not be the person we need. You may know them. Make the introduction.",
                cta: "Make the Introduction",
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
              <div className="mt-8 space-y-5 text-lg text-muted-foreground whitespace-pre-line">
                <p>
                  Too many people need real support. Too many systems make reaching that support harder than it should be.

                  We cannot fix every broken system at once. But we can pick a real problem, tell the truth about it, build a better path, and show the work while we do it.

                  Right now, that work starts with veterans and families. We are building the infrastructure, recruiting the people, and putting real action behind the things we say matter.

                  That's the standard behind ValorWell.
                </p>
                <p>
                  {"\n"}
                </p>
                <p className="font-medium text-foreground">{"\n"}</p>
              </div>
              <div className="mt-10">
                <BtnPrimary to="/about" onClick={() => trackHomeEvent("homepage_about_click", { source: "founder" })}>
                  Read the Mission
                </BtnPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    </Layout>
  );
}

