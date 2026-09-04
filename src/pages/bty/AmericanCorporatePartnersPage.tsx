import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Compass,
  ExternalLink,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Network,
  PlayCircle,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const videoUrl = "https://www.youtube.com/watch?v=JHuLEqw2yG8";
const videoEmbedUrl = "https://www.youtube-nocookie.com/embed/JHuLEqw2yG8?rel=0";

const acpLinks = {
  programs: "https://www.acp-usa.org/programs/",
  mentor: "https://www.acp-usa.org/become-a-mentor/",
  overview: "https://www.acp-usa.org/",
  impact: "https://www.acp-usa.org/our-impact/",
  partners: "https://www.acp-usa.org/partners/",
  medalOfHonorVideo: "https://youtu.be/lzHK-SynYAo",
};

const proof = [
  { value: "43,000+", label: "Veterans and Active-Duty Spouses have become ACP alumni since 2010" },
  { value: "98%", label: "Protégé satisfaction reported in ACP's 2026 materials" },
  { value: "115+", label: "Formal Corporate Partners providing Mentors" },
  { value: "90%+", label: "Mentorships conducted virtually" },
];

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Start with the person's goal",
    body: "ACP begins with where the Protégé is trying to go—not with a one-size-fits-all career track. Career change, advancement, entrepreneurship, networking, and transition can all require different kinds of guidance.",
  },
  {
    number: "02",
    icon: Handshake,
    title: "Build a human match",
    body: "ACP's matching process looks at goals, experience, and needs to connect each Veteran or Active-Duty Military Spouse with a Mentor who can be useful for that specific journey.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Work together for a full year",
    body: "The mentorship runs for 12 months and is designed around roughly one hour each month—enough structure to build momentum without making the relationship unrealistic for working professionals.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "ACP stays in the loop",
    body: "Mentor and Protégé are not left on their own. ACP supports the relationship through regular check-ins, a resource library, and personalized support throughout the mentorship.",
  },
];

const protegeFocus = [
  { value: 66, label: "Improving résumé and interview skills" },
  { value: 58, label: "Translating military experience into civilian terms" },
  { value: 57, label: "Refining civilian career goals and professional ambitions" },
  { value: 53, label: "Building a network of professionals" },
  { value: 47, label: "Learning about career opportunities" },
];

const outcomes2025 = [
  { value: "2,335", label: "Protégés obtained meaningful employment during their mentorship" },
  { value: "$105,000+", label: "Average starting salary for Protégés who obtained a job during mentorship" },
  { value: "4,864", label: "Veterans and Active-Duty Spouses became ACP alumni in 2025" },
];

const programs = [
  {
    icon: BriefcaseBusiness,
    title: "Veteran Mentoring Program",
    body: "One-on-one career mentorship for transitioning Service Members and Veterans navigating the civilian workforce.",
  },
  {
    icon: Users,
    title: "Active-Duty Military Spouse Program",
    body: "Career support built for Military Spouses whose professional path may be disrupted by moves, deployments, and changing local opportunities.",
  },
  {
    icon: Sparkles,
    title: "Ventures Entrepreneurship Program",
    body: "A pathway for Protégés whose next chapter is building, growing, or navigating a business rather than following a traditional employment track.",
  },
  {
    icon: Building2,
    title: "Citizens Program",
    body: "Expands the Mentor pool with professionals from industries not represented by ACP's formal Corporate Partners.",
  },
];

const snapshotGroups = [
  {
    title: "Education",
    values: ["29% graduate degree or above", "34% bachelor's degree", "37% less than a four-year degree"],
  },
  {
    title: "Age",
    values: ["Average age: 38", "25% age 30 or younger", "44% age 40 or older"],
  },
  {
    title: "Military rank",
    values: ["79% enlisted", "21% officer"],
  },
  {
    title: "Branch",
    values: [
      "44% U.S. Army",
      "22% U.S. Navy",
      "19% U.S. Air Force",
      "13% U.S. Marine Corps",
      "2% U.S. Coast Guard",
      "<1% U.S. Space Force",
    ],
  },
  {
    title: "Gender",
    values: ["68% men", "32% women"],
  },
  {
    title: "Ethnicity",
    values: [
      "25% Black/African American",
      "15% Hispanic",
      "46% White",
      "15% Other / Did Not Disclose",
    ],
  },
];

function ExternalCta({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3 text-sm font-black text-[hsl(var(--navy))] shadow-lg transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--navy))]"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-bold text-foreground transition hover:border-[hsl(var(--navy))]/45 hover:bg-[hsl(var(--section-alt))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--navy))] focus-visible:ring-offset-2"
      }
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function AmericanCorporatePartnersPage() {
  return (
    <>
      <Helmet>
        <title>American Corporate Partners | Beyond The Yellow | ValorWell</title>
        <meta
          name="description"
          content="See how American Corporate Partners provides free, yearlong one-on-one career mentorship for Veterans, post-9/11 Service Members, and Active-Duty Military Spouses—and how professionals can become Mentors."
        />
        <meta
          property="og:title"
          content="A year of career mentorship. Built around the person, not a template. | American Corporate Partners"
        />
        <meta
          property="og:description"
          content="Beyond The Yellow features American Corporate Partners: free, customized career mentorship connecting military-connected Protégés with experienced professionals for a full year."
        />
        <meta
          property="og:image"
          content="https://i.ytimg.com/vi/JHuLEqw2yG8/maxresdefault.jpg"
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/americancorporatepartners" />
      </Helmet>

      <Header />
      <main id="main" className="overflow-hidden bg-background">
        <section className="relative border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-[hsl(var(--gold-accent))]/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-white/[0.05] blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold-accent))]/70 to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--gold-accent))]">
                <span className="h-px w-10 bg-[hsl(var(--gold-accent))]" />
                Beyond The Yellow · Feature Story
              </div>

              <div className="mt-7 inline-flex items-center gap-3 rounded-md border border-white/15 bg-white/[0.06] px-4 py-2.5">
                <span className="text-xl font-black tracking-[-0.03em] text-[hsl(var(--gold-accent))]">ACP</span>
                <span className="h-5 w-px bg-white/20" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                  American Corporate Partners
                </span>
              </div>

              <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
                A year of career mentorship.
                <span className="mt-2 block text-[hsl(var(--gold-accent))]">
                  Built around the person, not a template.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                American Corporate Partners provides free, customized one-on-one mentorship for post-9/11 Service Members, Veterans, and Active-Duty Military Spouses—matching each person with an experienced professional and supporting the relationship from the first conversation through month twelve.
              </p>

              <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                {[
                  "Free to participants",
                  "12 months",
                  "≈ 1 hour / month",
                  "90%+ virtual",
                ].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-2">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#take-action"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3 text-sm font-black text-[hsl(var(--navy))] shadow-lg transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Find Your ACP Path
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#watch"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Watch the Conversation
                </a>
              </div>
            </div>

            <div id="watch" className="scroll-mt-24 lg:col-span-7">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] border border-[hsl(var(--gold-accent))]/20" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/35">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src={videoEmbedUrl}
                      title="Beyond The Yellow conversation with American Corporate Partners"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <PlayCircle className="h-4 w-4 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                  Open the full conversation on YouTube
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Why we featured ACP
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="max-w-4xl text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Career support becomes real when someone stays long enough to help turn experience into direction, confidence, relationships, and opportunity.
              </p>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Beyond The Yellow is about support people can actually feel. ACP's model is not a one-time résumé review or a list of resources. It creates a sustained relationship, supports both people inside that relationship, and gives Veterans and Military Spouses access to civilian professionals who can help make the next step less opaque.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-[hsl(var(--navy))] py-14 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {proof.map((item) => (
                <div key={item.value} className="border-l border-white/15 pl-5">
                  <p className="text-4xl font-black tracking-tight text-[hsl(var(--gold-accent))] md:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[15rem] text-sm leading-6 text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-9 text-xs leading-5 text-white/45">
              Figures reported by American Corporate Partners in materials supplied to ValorWell for this feature.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--navy))]">
                  The model
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                  The match matters. The support around the match matters too.
                </h2>
              </div>
              <p className="text-base leading-8 text-muted-foreground lg:col-span-5 md:text-lg">
                ACP combines a human-driven match with a long enough runway for the relationship to become useful—and keeps supporting both sides throughout the year.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="bg-background p-7 md:p-9">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-black tracking-[0.18em] text-[hsl(var(--gold-accent))]">{step.number}</span>
                      <Icon className="h-5 w-5 text-[hsl(var(--navy))]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-7 text-2xl font-black tracking-tight text-foreground">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{step.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Two ways into the mission
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                You can come to ACP looking for guidance—or ready to give it.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-[2rem] border border-border bg-[hsl(var(--section-alt))] p-7 md:p-10">
                <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-full bg-[hsl(var(--gold-accent))]/10" aria-hidden="true" />
                <GraduationCap className="h-8 w-8 text-[hsl(var(--navy))]" aria-hidden="true" />
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">For Veterans &amp; Military Spouses</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-foreground">Turn experience into a civilian career strategy.</h3>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  Military leadership, adaptability, and problem-solving can be enormously valuable without translating cleanly to civilian job titles, résumés, interviews, networks, or career ladders. ACP gives Protégés an experienced person to work through that translation with over time.
                </p>
                <ul className="mt-7 space-y-3 text-sm leading-6 text-foreground/85">
                  {["Career direction and professional goals", "Résumé and interview development", "Civilian networking and opportunity discovery", "Entrepreneurship and business-building goals"].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--navy))]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ExternalCta href={acpLinks.programs}>Explore ACP Mentoring Programs</ExternalCta>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[hsl(var(--navy))] p-7 text-white md:p-10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[hsl(var(--gold-accent))]/10 blur-2xl" aria-hidden="true" />
                <Network className="relative h-8 w-8 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.18em] text-white/55">For prospective Mentors</p>
                <h3 className="relative mt-3 text-3xl font-black tracking-tight text-white">You do not need a military background to be useful.</h3>
                <p className="relative mt-5 text-base leading-8 text-white/70">
                  Civilian professionals are exactly the people who can help make the civilian workforce easier to navigate. ACP designed the commitment to fit real schedules: the relationship is largely virtual, runs for one year, and is built around roughly one hour each month.
                </p>
                <ul className="relative mt-7 space-y-3 text-sm leading-6 text-white/80">
                  {["ACP supports you throughout the mentorship", "Bring industry knowledge, perspective, and a civilian network", "Strengthen your own leadership through mentoring", "Make a direct contribution without changing careers or relocating"].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="relative mt-8">
                  <ExternalCta href={acpLinks.mentor} primary>Become an ACP Mentor</ExternalCta>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--navy))]">What Protégés work on</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                Career transition is rarely one problem.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
                ACP's 2025 program data shows how often the work spans communication, identity, direction, networking, and opportunity discovery at the same time.
              </p>
            </div>

            <div className="space-y-6 lg:col-span-7">
              {protegeFocus.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-end justify-between gap-4">
                    <span className="text-sm font-bold leading-6 text-foreground">{item.label}</span>
                    <span className="text-2xl font-black tracking-tight text-[hsl(var(--navy))]">{item.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-background" role="img" aria-label={`${item.value}%: ${item.label}`}>
                    <div
                      className="h-full rounded-full bg-[hsl(var(--navy))]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="pt-2 text-xs text-muted-foreground">Percentages reported by ACP for its 2025 Mentoring Program.</p>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">2025 outcomes</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                A mentorship should move beyond conversation.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                ACP tracks employment and alumni outcomes alongside satisfaction—not just participation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {outcomes2025.map((item) => (
                <article key={item.value} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                  <p className="text-4xl font-black tracking-tight text-[hsl(var(--navy))] md:text-5xl">{item.value}</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--navy))]">More than one career path</p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                  The model flexes because the next chapter is different for everyone.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-8 text-muted-foreground">
                  ACP reports serving Protégés from more than 15,000 ZIP codes across the United States and uses multiple programs to match different career realities.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <article key={program.title} className="rounded-2xl border border-border bg-background p-6">
                    <Icon className="h-6 w-6 text-[hsl(var(--navy))]" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-black tracking-tight text-foreground">{program.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{program.body}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-background p-6 md:p-8">
              <div className="grid gap-7 md:grid-cols-3 md:items-center">
                <div>
                  <p className="text-4xl font-black tracking-tight text-[hsl(var(--navy))]">26,000+</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">C-suite executives and employees have volunteered as Mentors, according to ACP's follow-up materials.</p>
                </div>
                <div>
                  <p className="text-4xl font-black tracking-tight text-[hsl(var(--navy))]">2,250+</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Top companies and organizations represented across ACP's broader Mentor network in 2026 materials.</p>
                </div>
                <div className="md:text-right">
                  <ExternalCta href={acpLinks.partners}>Explore ACP's Partners</ExternalCta>
                </div>
              </div>
              <p className="mt-6 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
                ACP separately reports 115+ formal Corporate Partners. The broader company count describes the organizations represented in the Mentor network, not the number of formal Corporate Partners.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">2026 at a glance</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                The detail is here when you want it—not before you need it.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                ACP also provided a demographic and service snapshot of its Protégé community. We have kept it available below without making the primary story compete with six more sets of statistics.
              </p>
            </div>

            <details className="group mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-[hsl(var(--section-alt))] open:shadow-sm">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-6 py-4 text-left font-black text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[hsl(var(--navy))] md:px-8">
                <span>View the additional ACP 2026 program snapshot</span>
                <span className="text-2xl leading-none text-[hsl(var(--navy))] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div className="border-t border-border px-6 py-7 md:px-8 md:py-9">
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {snapshotGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[hsl(var(--navy))]">{group.title}</h3>
                      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                        {group.values.map((value) => <li key={value}>{value}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-8 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
                  Snapshot percentages are reproduced from ACP's supplied 2026 “At A Glance” material and may reflect rounding.
                </p>
              </div>
            </details>
          </div>
        </section>

        <section id="take-action" className="scroll-mt-24 border-y border-white/10 bg-[hsl(var(--navy))] py-20 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">Choose your next step</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">Find the ACP path that fits why you are here.</h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
                ValorWell is highlighting the work. ACP owns the mentorship relationship and application process, so the buttons below take you directly to the appropriate ACP program.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <a
                href={acpLinks.programs}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/15 bg-white/[0.06] p-7 transition hover:-translate-y-0.5 hover:border-[hsl(var(--gold-accent))]/60 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold-accent))] md:p-9"
              >
                <GraduationCap className="h-7 w-7 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/50">I want career mentorship</p>
                <h3 className="mt-3 text-2xl font-black md:text-3xl">Explore ACP Programs</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">For transitioning Service Members, Veterans, and Active-Duty Military Spouses looking for one-on-one career support.</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[hsl(var(--gold-accent))]">
                  Go to ACP's program application path <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>

              <a
                href={acpLinks.mentor}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[hsl(var(--gold-accent))]/35 bg-[hsl(var(--gold-accent))] p-7 text-[hsl(var(--navy))] transition hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:p-9"
              >
                <HeartHandshake className="h-7 w-7" aria-hidden="true" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] opacity-65">I want to give an hour a month</p>
                <h3 className="mt-3 text-2xl font-black md:text-3xl">Become an ACP Mentor</h3>
                <p className="mt-4 text-sm leading-7 opacity-75">For civilian professionals and leaders who can help someone navigate the workforce, translate strengths, expand a network, or make the next career decision.</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-black">
                  Go to ACP's Mentor application <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--navy))]">Continue with ACP</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">Go deeper into the program, impact, and partner network.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
              {[
                ["ACP Program Overview", acpLinks.overview],
                ["ACP Impact & Success Metrics", acpLinks.impact],
                ["ACP Corporate Partners", acpLinks.partners],
                ["Congressional Medal of Honor Society Video", acpLinks.medalOfHonorVideo],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground transition hover:border-[hsl(var(--navy))]/45 hover:bg-[hsl(var(--section-alt))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--navy))]"
                >
                  <span>{label}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-[hsl(var(--navy))]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--section-alt))] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 rounded-[2rem] border border-border bg-background p-7 md:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
              <div className="lg:col-span-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">Beyond The Yellow</p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">Support is not a symbol. Support is behavior.</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                  American Corporate Partners is one example of what happens when support becomes a repeatable system: people volunteer time, relationships last long enough to matter, and the person receiving help has somewhere concrete to go next.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="/beyondtheyellow"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[hsl(var(--navy))] px-6 py-3 text-sm font-black text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--navy))] focus-visible:ring-offset-2"
                >
                  Go Beyond The Yellow
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
