import { Layout } from "@/components/layout";
import { SEO, OrganizationSchema, MedicalOrganizationSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  HeartHandshake,
  HelpCircle,
  Home,
  LifeBuoy,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";
import soldierPortrait from "@/assets/soldier-portrait.jpg";
import flagBanner from "@/assets/flag-banner.jpg";

const pathCards = [
  {
    icon: LifeBuoy,
    title: "I need support",
    body: "For veterans, family members, and caregivers trying to understand care options, documentation, or next steps.",
    cta: "Get Support",
    href: "/get-care",
    primary: true,
  },
  {
    icon: HeartHandshake,
    title: "I want to fund care",
    body: "Turn awareness into practical help, therapy access, sponsorships, and family support.",
    cta: "Fund Care",
    href: "/beyondtheyellow",
  },
  {
    icon: HelpCircle,
    title: "I need answers",
    body: "Learn about VA access, CHAMPVA, Community Care, documentation, and family systems.",
    cta: "Explore Resources",
    href: "/resources",
  },
  {
    icon: Users,
    title: "I want to partner",
    body: "Work with ValorWell as a provider, sponsor, creator, funder, or community partner.",
    cta: "Partner With Us",
    href: "/partners",
  },
];

const helpCards = [
  {
    icon: Compass,
    title: "Understand your options",
    body: "Clearer next steps for families navigating care access, Community Care, CHAMPVA, and system delays.",
  },
  {
    icon: ShieldCheck,
    title: "Do not wait alone",
    body: "Support pathways for veterans and families who should not be isolated while larger systems catch up.",
  },
  {
    icon: ClipboardCheck,
    title: "Know what documentation can and cannot do",
    body: "Education and support rooted in accurate records, ethical care relationships, and professional judgment.",
  },
  {
    icon: Home,
    title: "Build skills at home",
    body: "Practical tools that help families strengthen communication, emotional skills, and daily-life routines.",
  },
  {
    icon: BookOpen,
    title: "Learn the system faster",
    body: "Resources, videos, and conversations that explain the systems families are forced to navigate.",
  },
  {
    icon: HeartHandshake,
    title: "Turn support into action",
    body: "Beyond the Yellow helps turn awareness into funded care, sponsorships, partnerships, and practical help.",
  },
];

const resourceCards = [
  { title: "VA Community Care", href: "/va-community-care-mental-health" },
  { title: "CHAMPVA", href: "/champva-mental-health" },
  { title: "Documentation Support", href: "/documentation-support" },
  { title: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
  { title: "Family Systems", href: "/family-systems" },
  { title: "Urgent Help", href: "/urgent-help" },
];

const ecosystemItems = [
  "Care navigation",
  "Documentation awareness",
  "Public education",
  "Family tools",
  "Mission-backed funding",
  "Partners and sponsors",
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Veteran and Family Support Starts Here"
        description="ValorWell helps veterans and families navigate care options, VA-related systems, documentation questions, family support needs, and funded pathways to practical help."
        canonical="/"
      />
      <OrganizationSchema />
      <MedicalOrganizationSchema />

      <section className="relative overflow-hidden bg-gradient-to-br from-background via-sky-blue-light to-background">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-patriot-red via-gold-accent to-navy" />
        <div className="container-wide grid gap-10 py-12 md:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-patriot-red/20 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-patriot-red shadow-sm">
              <Sparkles className="h-4 w-4" /> For veterans, families, and caregivers
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] text-navy md:text-6xl lg:text-7xl">
              You should not have to fight alone to find support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              ValorWell helps veterans and families navigate care options, VA-related systems, documentation questions, family support needs, and the gaps that leave people stuck.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-patriot-red text-white hover:bg-patriot-red-dark">
                <Link to="/get-care">Get Support <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                <Link to="/beyondtheyellow">Help Fund Care</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm font-medium text-navy/80">
              Not sure where to start? That is exactly why we exist.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 hidden h-32 w-32 rounded-full bg-gold-accent/20 blur-2xl md:block" />
            <Card className="relative overflow-hidden border-0 bg-navy text-white shadow-2xl">
              <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${heroFamily})` }}>
                <div className="flex h-full items-center justify-center bg-navy/45 p-6">
                  <div className="max-w-sm text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-patriot-red shadow-xl">
                      <PlayCircle className="h-11 w-11" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-gold-accent">Founder / Mission Video</p>
                    <h2 className="mt-2 text-2xl font-bold">Placeholder for the mission in plain English</h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">
                      Add a 60–90 second founder video here to build trust, explain why ValorWell exists, and tell families what to do next.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border bg-white p-4 shadow-xl md:left-10 md:right-10">
              <p className="text-sm font-semibold text-navy">Start here if the system feels confusing.</p>
              <p className="mt-1 text-sm text-muted-foreground">Support, education, tools, and funded action in one mission.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-patriot-red">Choose your next step</p>
            <h2 className="text-3xl font-bold text-navy md:text-5xl">What brought you here today?</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Choose the path that fits where you are right now.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pathCards.map((card) => (
              <Card key={card.title} className={card.primary ? "border-patriot-red/30 shadow-lg" : "border-border/70 shadow-sm"}>
                <CardContent className="flex h-full flex-col p-6">
                  <div className={card.primary ? "mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-patriot-red text-white" : "mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <Button asChild className={card.primary ? "mt-6 bg-patriot-red text-white hover:bg-patriot-red-dark" : "mt-6"} variant={card.primary ? "default" : "outline"}>
                    <Link to={card.href}>{card.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img src={soldierPortrait} alt="Veteran in a reflective moment" className="h-full max-h-[520px] w-full object-cover" />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-patriot-red">The real problem</p>
            <h2 className="text-3xl font-bold leading-tight text-navy md:text-5xl">
              The problem is not that families do not care. It is that the path is too hard to find.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["You call one office and get sent to another.", "You repeat the same story again and again.", "You wait while the situation at home gets heavier.", "You wonder if paying out of pocket is the only option."].map((line) => (
                <div key={line} className="rounded-2xl border bg-white/80 p-5 text-navy shadow-sm">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-patriot-red" />
                  <p className="font-medium leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xl font-semibold leading-relaxed text-navy">
              ValorWell exists to make the next right step easier to find.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-patriot-red">How ValorWell helps</p>
            <h2 className="text-3xl font-bold text-navy md:text-5xl">Families need outcomes, not another maze.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              ValorWell connects support pathways, education, documentation awareness, family tools, and mission-backed funding so people can move forward with more clarity.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {helpCards.map((card) => (
              <Card key={card.title} className="border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-accent">Founder / mission video</p>
            <h2 className="text-3xl font-bold md:text-5xl">Start here: the mission in plain English.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              Use this homepage video to make the mission human: why families get stuck, how ValorWell helps, and how supporters can turn attention into actual care access.
            </p>
            <ul className="mt-7 space-y-3 text-white/85">
              {["Explain the gap without jargon.", "Tell veterans and families what to do next.", "Invite supporters to fund real support, not just awareness."].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl">
            <div className="aspect-video rounded-2xl border border-white/20 bg-black/30 p-6">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-patriot-red">
                  <PlayCircle className="h-11 w-11" />
                </div>
                <h3 className="text-2xl font-bold">Video placeholder</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                  Drop the founder/mission embed here when ready. Recommended runtime: 60–90 seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-patriot-red">Mission in motion</p>
              <h2 className="text-3xl font-bold text-navy md:text-5xl">Proof belongs on the homepage.</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                As the model grows, this section can become the live proof board for therapy hours funded, families reached, resources published, partners involved, and dollars directed toward care access.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Therapy hours funded", "Families supported", "Resource guides created", "Partners involved"].map((metric) => (
                <div key={metric} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <p className="text-4xl font-bold text-navy">—</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${flagBanner})` }} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="container-wide relative">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-accent">Beyond the Yellow</p>
            <h2 className="text-3xl font-bold md:text-5xl">Awareness is not the finish line.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/82">
              Beyond the Yellow turns support into funded therapy hours, sponsorships, partnerships, and practical help for veterans and families.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Give", "Help fund care access and practical support.", "Fund Care", "/beyondtheyellow"],
              ["Share", "Help families find resources before they reach a breaking point.", "Watch & Share", "/media/youtube-podcast"],
              ["Partner", "Bring the mission into your organization, practice, brand, or community.", "Partner With Us", "/partners"],
            ].map(([title, body, cta, href]) => (
              <Card key={title} className="border-white/20 bg-white/10 text-white backdrop-blur">
                <CardContent className="p-7">
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-3 min-h-[52px] text-white/80">{body}</p>
                  <Button asChild className="mt-6 bg-gold-accent text-navy hover:bg-gold-accent/90">
                    <Link to={href}>{cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-patriot-red">The ValorWell ecosystem</p>
            <h2 className="text-3xl font-bold text-navy md:text-5xl">One mission. Multiple ways to close the gap.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              ValorWell combines support pathways, education, family tools, partnerships, and mission-backed funding so veterans and families have more than slogans when they need help.
            </p>
            <Button asChild size="lg" className="mt-8 bg-navy text-white hover:bg-navy/90">
              <Link to="/our-model">See How the Model Works</Link>
            </Button>
          </div>
          <div className="rounded-3xl border bg-white p-6 shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {ecosystemItems.map((item) => (
                <div key={item} className="rounded-2xl bg-sky-blue-light p-5">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-patriot-red" />
                  <p className="font-semibold text-navy">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-patriot-red">Resources</p>
            <h2 className="text-3xl font-bold text-navy md:text-5xl">Learn the system before the system wears you down.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Start with the resource that fits your situation.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourceCards.map((resource) => (
              <Link key={resource.title} to={resource.href} className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-navy/30 hover:shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-navy">{resource.title}</h3>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-patriot-red" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white">
        <div className="container-wide grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-accent">Built for support. Not shortcuts.</p>
            <h2 className="text-3xl font-bold md:text-4xl">No veteran or family should have to navigate this alone.</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
              ValorWell respects ethical care relationships, accurate documentation, professional judgment, and the reality that families need clear next steps. If this is an emergency, call 911. For the Veterans Crisis Line, call 988 and press 1.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Button asChild size="lg" className="bg-patriot-red text-white hover:bg-patriot-red-dark">
              <Link to="/get-care">Get Support</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link to="/beyondtheyellow">Fund Care</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link to="/partners">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
