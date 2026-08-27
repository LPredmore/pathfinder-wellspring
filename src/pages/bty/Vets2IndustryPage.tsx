import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  GraduationCap,
  HeartHandshake,
  MessageSquare,
  PlayCircle,
  Quote,
  Search,
  Target,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import vets2IndustryLogoAsset from "@/assets/vets2industry-logo.png.asset.json";

const videoUrl =
  "https://www.youtube.com/watch?v=iVDPZL_PEWo&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=4";

const logoImage = vets2IndustryLogoAsset.url;

const interviewQuote: { text: string; timestamp: string } | null = {
  text: "It’s more than just giving a list.",
  timestamp: "18:42",
};

const impact = [
  { value: "FREE", label: "Resource library and core career support" },
  { value: "81st", label: "Virtual Networking Circuit scheduled in 2026" },
  { value: "109K+", label: "People in the LinkedIn community" },
  { value: "100%", label: "Volunteer-powered mission" },
];

const resourceCategories = [
  "Career & Jobs",
  "Education",
  "Mentorship",
  "Scholarships",
  "Mental Health",
  "Financial",
  "SkillBridge",
  "Networking",
];

const work = [
  {
    number: "01",
    icon: Search,
    title: "Make the help findable",
    body: "VETS2INDUSTRY organizes free military-community resources into a living library so service members, veterans, spouses, caregivers, and families do not have to already know which organization or benefit name to search for.",
  },
  {
    number: "02",
    icon: BriefcaseBusiness,
    title: "Turn transition into a career process",
    body: "Career resources extend beyond job listings into mentorship, webinars, resume support, interview preparation, job discovery, and tools designed to help military experience translate into civilian opportunity.",
  },
  {
    number: "03",
    icon: Users,
    title: "Put people in the same room",
    body: "Virtual networking events connect transitioning service members, veterans, military spouses, recruiters, employers, mentors, VSOs, and professionals so information can become an introduction—and an introduction can become an opportunity.",
  },
];

const careerTools = [
  { icon: Bot, title: "AI Assistant", body: "Guidance toward relevant resources and next steps." },
  { icon: Search, title: "Job Finder", body: "A faster path from career interest to open opportunities." },
  { icon: FileText, title: "Resume Tool", body: "Feedback designed to strengthen how experience is presented." },
  { icon: MessageSquare, title: "Mock Interview", body: "Practice before the conversation that actually matters." },
];

export default function Vets2IndustryPage() {
  return (
    <>
      <Helmet>
        <title>VETS2INDUSTRY | Beyond The Yellow | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow features VETS2INDUSTRY and Matthew Philip Wee: a free resource, career, and networking ecosystem helping military-connected people find the information and relationships that civilian transition often leaves scattered."
        />
        <meta
          property="og:title"
          content="The military gives you a system. Civilian life gives you search results. | VETS2INDUSTRY"
        />
        <meta
          property="og:description"
          content="See how VETS2INDUSTRY turns scattered military-transition resources into a living library, career tools, and real professional connections."
        />
        <meta property="og:image" content={logoImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/vets2industry" />
      </Helmet>

      <Header />
      <main id="main" className="overflow-hidden bg-background">
        <section className="relative border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-36 top-20 h-96 w-96 rounded-full bg-[hsl(var(--gold-accent))]/10 blur-3xl" />
            <div className="absolute -right-24 -top-28 h-[32rem] w-[32rem] rounded-full bg-white/[0.04] blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold-accent))]/60 to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--gold-accent))]">
                <span className="h-px w-10 bg-[hsl(var(--gold-accent))]" />
                Beyond The Yellow · Feature Story
              </div>

              <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
                The military gives you a system.
                <span className="mt-2 block text-[hsl(var(--gold-accent))]">
                  Civilian life gives you search results.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                VETS2INDUSTRY exists in the gap between resources existing and military-connected people actually knowing where to find them, who to ask, and how to turn information into a real next step.
              </p>

              <div className="mt-8 border-l-2 border-[hsl(var(--gold-accent))] pl-5">
                <p className="text-sm font-bold text-white">Matthew Philip Wee</p>
                <p className="mt-1 text-sm text-white/60">
                  President &amp; Board Member · VETS2INDUSTRY
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] border border-[hsl(var(--gold-accent))]/20" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/40">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/iVDPZL_PEWo?rel=0"
                      title="Beyond The Yellow conversation with Matthew Philip Wee of VETS2INDUSTRY"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
                >
                  <PlayCircle className="h-4 w-4 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                  Watch the full conversation on YouTube
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
                Why we featured them
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="max-w-4xl text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                The problem is not always that help does not exist. Sometimes the help is scattered across hundreds of websites, organizations, programs, benefits, and people.
              </p>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                That creates a strange transition problem: the person who needs a resource may have to know the right program name, the right acronym, the right organization, or the right person before they can even begin searching. VETS2INDUSTRY attacks that friction from both sides—organizing information and building the human connections that search engines cannot provide.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                From noise to a map
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                You should not need insider knowledge to find free help that was built for you.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                V2I’s original idea is deceptively simple: create one living library where military-connected people can discover free resources across the parts of life that transition actually touches—not just employment.
              </p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Career support matters. So do education, scholarships, finances, mental health, mentorship, family needs, SkillBridge opportunities, and the organizations that already know how to help.
              </p>
              <a
                href="https://vets2industry.org/resource-library/"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-bold text-[hsl(var(--navy))] underline decoration-[hsl(var(--gold-accent))] decoration-2 underline-offset-4 transition hover:opacity-70"
              >
                Browse the V2I Resource Library
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[2rem] bg-[hsl(var(--navy))] p-7 shadow-xl md:p-10">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className="absolute left-1/2 top-1/2 h-[80%] w-px -translate-x-1/2 -translate-y-1/2 rotate-[28deg] bg-white/10" />
                  <div className="absolute left-1/2 top-1/2 h-[80%] w-px -translate-x-1/2 -translate-y-1/2 -rotate-[28deg] bg-white/10" />
                  <div className="absolute left-1/2 top-1/2 h-px w-[85%] -translate-x-1/2 -translate-y-1/2 bg-white/10" />
                  <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--gold-accent))]/20" />
                </div>

                <div className="relative grid min-h-[31rem] grid-cols-2 content-between gap-4 sm:grid-cols-3">
                  {resourceCategories.slice(0, 3).map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                      {item}
                    </div>
                  ))}

                  <div className="col-span-2 flex items-center justify-center py-7 sm:col-span-3">
                    <img
                      src={logoImage}
                      alt="VETS2INDUSTRY"
                      className="h-40 w-40 object-contain"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {resourceCategories.slice(3).map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="relative mt-6 border-t border-white/10 pt-5 text-center text-xs text-white/45">
                  Editorial visualization of the categories V2I connects through its current resource ecosystem.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[hsl(var(--navy))] py-16 text-white md:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[hsl(var(--gold-accent))] to-transparent" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {impact.map((item) => (
                <div key={item.label} className="border-l border-white/15 pl-5">
                  <p className="text-4xl font-black tracking-tight text-[hsl(var(--gold-accent))] md:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[14rem] text-sm leading-6 text-white/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs text-white/45">
              Current public VETS2INDUSTRY website and LinkedIn figures checked in August 2026.
            </p>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              {interviewQuote ? (
                <>
                  <Quote className="mx-auto h-9 w-9 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                  <blockquote className="mt-7 text-4xl font-black leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
                    “{interviewQuote.text}”
                  </blockquote>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Matthew Philip Wee · Beyond The Yellow · {interviewQuote.timestamp}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                    The transition problem in one sentence
                  </p>
                  <h2 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
                    Information is not access until someone can actually find it, understand it, and act on it.
                  </h2>
                  <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                    That is the difference between a directory and a bridge. V2I’s model becomes more useful when the library, the career tools, and the people all point toward the same next step.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                  The work in action
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                  Search is useful. A map is better. A connection can change the outcome.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-8 text-muted-foreground">
                  The V2I ecosystem works in layers: discover what exists, prepare for the opportunity, then meet the people who can help turn preparation into movement.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {work.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="group rounded-[1.6rem] border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-[0.16em] text-[hsl(var(--gold-accent))]">
                        {item.number}
                      </span>
                      <Icon className="h-6 w-6 text-muted-foreground transition group-hover:text-[hsl(var(--navy))]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-10 text-2xl font-black tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {item.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Career tools are changing too
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                The new toolbox is built for the questions people ask between the workshops.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                VETS2INDUSTRY’s 2026 website refresh added AI-assisted career tools alongside its existing resource and networking model—giving users ways to search jobs, review resumes, practice interviews, and ask for guidance when a live person is not sitting next to them.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {careerTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div key={tool.title} className="rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--navy))] text-[hsl(var(--gold-accent))]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-lg font-black text-foreground">{tool.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[hsl(var(--navy))] py-16 text-white md:py-24">
          <div className="pointer-events-none absolute -right-28 -top-36 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--gold-accent))]/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Keep following the work
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
                The next resource matters most when the right person can find it before they give up looking.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                Explore VETS2INDUSTRY’s free resource library, career tools, networking events, and military-connected professional community.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href="https://vets2industry.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-black text-[hsl(var(--navy))] transition hover:brightness-95"
              >
                Visit VETS2INDUSTRY
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-12">
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-7">
                {[
                  { label: "Website", url: "https://vets2industry.org/" },
                  { label: "Resource Library", url: "https://vets2industry.org/resource-library/" },
                  { label: "Events", url: "https://vets2industry.org/events-page-2/" },
                  { label: "Facebook", url: "https://www.facebook.com/vets2industryfoundation" },
                  { label: "LinkedIn", url: "https://www.linkedin.com/company/vets2industry/" },
                  { label: "YouTube", url: "https://www.youtube.com/channel/UCXW-UubhcMZUMmiQK6BfuBw" },
                  { label: "Instagram", url: "https://www.instagram.com/vets2industry" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-white"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
