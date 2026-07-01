import { Layout } from "@/components/layout";
import { SEO, OrganizationSchema, MedicalOrganizationSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileText,
  HeartHandshake,
  Home,
  Megaphone,
  PlayCircle,
  ShieldCheck,
  Siren,
  Target,
  Users,
} from "lucide-react";
import soldierPortrait from "@/assets/soldier-portrait.jpg";
import flagBanner from "@/assets/flag-banner.jpg";
import valorwellWomen from "@/assets/valorwell_women_banner_3x1.png";

const operatingLanes = [
  {
    icon: Compass,
    label: "VA navigation",
    title: "Find the right door faster",
    body: "Care access, Community Care, CHAMPVA, referrals, delays, and the practical steps families are forced to decode alone.",
  },
  {
    icon: FileText,
    label: "Disability pathway",
    title: "Understand the claims maze",
    body: "Education around evidence, documentation, process expectations, and what veterans need to know before the system wears them down.",
  },
  {
    icon: ShieldCheck,
    label: "Documentation awareness",
    title: "Document what matters ethically",
    body: "Support rooted in accurate records, real care relationships, clinical judgment, and clear communication.",
  },
  {
    icon: HeartHandshake,
    label: "Care access",
    title: "Get connected to actual support",
    body: "Mental health care is part of the mission, but the bigger job is helping veterans and families get the right help at the right time.",
  },
  {
    icon: Home,
    label: "Family systems",
    title: "Support the people beside the veteran",
    body: "Spouses, caregivers, and families need tools, language, resources, and support while the process plays out.",
  },
  {
    icon: Megaphone,
    label: "Public education",
    title: "Make the invisible process visible",
    body: "Videos, field briefings, guides, and plain-English resources that help families understand the system before crisis hits.",
  },
];

const audienceCards = [
  {
    icon: Siren,
    title: "I am a veteran or family member",
    body: "Start here if you need clarity on care access, VA navigation, documentation, disability-process questions, or family support.",
    cta: "Start Here",
    href: "/get-care",
  },
  {
    icon: BookOpen,
    title: "I need to understand the system",
    body: "Use the resource hub to learn Community Care, CHAMPVA, documentation, mental health access, and family-system support.",
    cta: "Open Resources",
    href: "/resources",
  },
  {
    icon: BadgeDollarSign,
    title: "I want to fund the mission",
    body: "Beyond the Yellow turns support into care access, education, sponsorships, partnerships, and practical help.",
    cta: "Fund the Fight",
    href: "/beyondtheyellow",
  },
  {
    icon: Users,
    title: "I want to build with ValorWell",
    body: "For providers, funders, creators, sponsors, and organizations that want to help overhaul the veteran support experience.",
    cta: "Partner With Us",
    href: "/partners",
  },
];

const processSteps = [
  "Access the care door",
  "Understand the VA pathway",
  "Prepare documentation",
  "Navigate disability pressure",
  "Support the family system",
  "Turn lived pain into systemic change",
];

const proofCards = [
  "Veterans guided through care access",
  "Families equipped with resources",
  "Therapy and support hours funded",
  "Partners building the new pathway",
];

const resourceLinks = [
  ["VA Community Care", "/va-community-care-mental-health"],
  ["CHAMPVA Mental Health", "/champva-mental-health"],
  ["Documentation Support", "/documentation-support"],
  ["Veteran Mental Health Care", "/veteran-mental-health-care"],
  ["Military Family Therapy", "/military-family-therapy"],
  ["Family Systems", "/family-systems"],
];

function VideoPlaceholder({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/35 p-5 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(245,195,66,0.2),transparent_34%)]" />
      <div className="relative flex aspect-video flex-col items-center justify-center rounded-[1.5rem] border border-white/15 bg-navy/70 p-6 text-center text-white">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-patriot-red shadow-xl">
          <PlayCircle className="h-11 w-11" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold-accent">{eyebrow}</p>
        <h3 className="mt-3 max-w-xl text-2xl font-black tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/78">{body}</p>
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <Layout>
      <SEO
        title="ValorWell | Rebuilding How Veterans Navigate the VA"
        description="ValorWell helps veterans and families navigate VA care access, disability-process pressure, documentation, family support, education, and mental health services as part of a larger system-change mission."
        canonical="/"
      />
      <OrganizationSchema />
      <MedicalOrganizationSchema />

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${flagBanner})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(210,35,42,0.35),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(245,195,66,0.22),transparent_32%),linear-gradient(135deg,rgba(26,49,81,0.96),rgba(8,19,36,0.96))]" />
        <div className="container-wide relative grid min-h-[calc(100vh-5rem)] gap-12 py-14 md:py-20 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-gold-accent/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-gold-accent">
              Not another clinic. A VA-system overhaul mission.
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
              Veterans deserve a better way through the VA.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-white/82 md:text-2xl">
              ValorWell is rebuilding how veterans and families navigate care access, disability pressure, documentation, family support, and the VA systems that shape their lives. Mental health is part of it. The mission is much bigger.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-patriot-red text-white hover:bg-patriot-red-dark">
                <Link to="/get-care">Start Here <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/70 bg-white/10 text-white hover:bg-white hover:text-navy">
                <Link to="/beyondtheyellow">Fund the Fight</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link to="/media/youtube-podcast"><PlayCircle className="mr-2 h-5 w-5" /> Watch Briefings</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {["VA navigation", "Disability clarity", "Family support"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <CheckCircle2 className="mb-2 h-5 w-5 text-gold-accent" />
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/82">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <VideoPlaceholder
              eyebrow="Founder / mission video"
              title="Record the 60–90 second manifesto here"
              body="Placeholder for the front-page founder video: explain that ValorWell is not just therapy; it is a movement to help veterans and families work with the VA better."
            />
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-accent">The line in the sand</p>
              <p className="mt-3 text-2xl font-black leading-tight">We are not here to help people survive bureaucracy. We are here to change the veteran experience of it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="container-wide">
          <div className="grid gap-4 md:grid-cols-4">
            {audienceCards.map((card) => (
              <Card key={card.title} className="group overflow-hidden border-0 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white group-hover:bg-patriot-red">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-black leading-tight text-navy">{card.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <Button asChild variant="outline" className="mt-6 border-navy text-navy hover:bg-navy hover:text-white">
                    <Link to={card.href}>{card.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-16 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-patriot-red/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] shadow-2xl">
              <img src={soldierPortrait} alt="Veteran in a reflective moment" className="h-[560px] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent p-7 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-accent">This is the enemy</p>
                <p className="mt-2 text-2xl font-black leading-tight">Confusion, delay, paperwork pressure, and families left alone.</p>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-patriot-red">The manifesto</p>
            <h2 className="text-4xl font-black leading-[0.98] tracking-tight text-navy md:text-6xl">
              ValorWell is not built around one appointment.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                The veteran experience is not one clean problem. It is care access, disability pressure, documentation, family stress, confusing handoffs, and a system that makes people prove pain while trying to heal from it.
              </p>
              <p>
                Mental health services matter. We provide them. But the real mission is helping veterans and families interact with the VA better across the entire journey.
              </p>
              <p className="rounded-3xl border-l-4 border-patriot-red bg-white p-6 text-xl font-bold text-navy shadow-sm">
                We are building the support layer veterans should have had from the beginning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white md:py-24">
        <div className="container-wide">
          <div className="mb-12 max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-gold-accent">What we attack</p>
            <h2 className="text-4xl font-black leading-tight md:text-6xl">The whole process, not one tiny slice of it.</h2>
            <p className="mt-5 text-xl leading-relaxed text-white/75">
              If the system touches the veteran experience, ValorWell wants a clearer pathway through it.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {operatingLanes.map((lane) => (
              <Card key={lane.title} className="border-white/15 bg-white/10 text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15">
                <CardContent className="p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-accent text-navy">
                    <lane.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-accent/80">{lane.label}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight">{lane.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">{lane.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-patriot-red">The path we are building</p>
            <h2 className="text-4xl font-black leading-tight text-navy md:text-6xl">A new operating system for veteran support.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              This is the homepage story: show the veteran where to start, teach the family what is happening, help documentation make sense, connect care, and invite the public to fund action instead of applause.
            </p>
          </div>
          <div className="rounded-[2rem] border bg-white p-6 shadow-xl">
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl bg-sky-blue-light p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm font-black text-white">{index + 1}</div>
                  <div>
                    <h3 className="font-black text-navy">{step}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Plain-English education, real support pathways, and a next step that does not require families to become system experts overnight.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${valorwellWomen})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        <div className="container-wide relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-gold-accent">Field briefing video</p>
            <h2 className="text-4xl font-black leading-tight md:text-6xl">Use video to turn confusion into clarity.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              This spot can hold a rotating explainer: disability process basics, how documentation fits care, what Community Care means, or how families can prepare before they hit a wall.
            </p>
          </div>
          <VideoPlaceholder
            eyebrow="Video placeholder"
            title="Rotating education / field briefing"
            body="Use this for a tactical video series after the founder manifesto: one topic, one pain point, one next step."
          />
        </div>
      </section>

      <section className="section-alt py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-patriot-red">Mission scoreboard</p>
              <h2 className="text-4xl font-black leading-tight text-navy md:text-6xl">Proof should live where the promise lives.</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Until live metrics are connected, these placeholders show where impact numbers will prove the model: care access, families equipped, funded support, and partners mobilized.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {proofCards.map((label) => (
              <div key={label} className="rounded-[2rem] border bg-white p-7 shadow-sm">
                <p className="text-5xl font-black text-navy">—</p>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-patriot-red">Resource arsenal</p>
            <h2 className="text-4xl font-black leading-tight text-navy md:text-6xl">Learn the system before the system drains you.</h2>
            <Button asChild size="lg" className="mt-8 bg-navy text-white hover:bg-navy/90">
              <Link to="/resources">Open Resource Hub</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {resourceLinks.map(([title, href]) => (
              <Link key={title} to={href} className="group rounded-[1.5rem] border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-patriot-red/40 hover:shadow-xl">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-blue-light text-navy group-hover:bg-patriot-red group-hover:text-white">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Get plain-English direction, context, and next-step education around this part of the veteran support journey.</p>
                <p className="mt-5 inline-flex items-center text-sm font-bold text-patriot-red">Read the guide <ArrowRight className="ml-2 h-4 w-4" /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-patriot-red py-16 text-white md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-white/75">Beyond the Yellow</p>
            <h2 className="text-4xl font-black leading-tight md:text-6xl">Awareness is the starting line. Funding action is the move.</h2>
            <p className="mt-5 text-xl leading-relaxed text-white/82">
              Supporters, sponsors, creators, and funders should not just clap from the sidelines. Help build the system veterans and families should have had all along.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur">
            {["Fund care access", "Sponsor education", "Back documentation literacy", "Build partner pathways"].map((item) => (
              <div key={item} className="flex items-center gap-4 border-b border-white/15 py-4 last:border-0">
                <Target className="h-6 w-6 text-gold-accent" />
                <p className="text-xl font-black">{item}</p>
              </div>
            ))}
            <Button asChild size="lg" className="mt-6 w-full bg-white text-patriot-red hover:bg-white/90">
              <Link to="/beyondtheyellow">Fund the Fight <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white md:py-24">
        <div className="container-wide text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-gold-accent">The close</p>
          <h2 className="mx-auto max-w-5xl text-4xl font-black leading-tight md:text-7xl">
            Stop making veterans decode the system alone.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-white/78">
            If you need help, start here. If you can fund the mission, fund it. If you can build with us, build. ValorWell is here to change the veteran support experience from the inside out.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-patriot-red text-white hover:bg-patriot-red-dark">
              <Link to="/get-care">Start Here</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/70 text-white hover:bg-white hover:text-navy">
              <Link to="/partners">Partner With Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/70 text-white hover:bg-white hover:text-navy">
              <Link to="/urgent-help">Urgent Help</Link>
            </Button>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-white/55">
            If this is an emergency, call 911. For the Veterans Crisis Line, call 988 and press 1.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
