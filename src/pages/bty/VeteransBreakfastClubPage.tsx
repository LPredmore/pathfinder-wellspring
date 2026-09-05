import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ExternalLink,
  HeartHandshake,
  Home,
  MessageCircle,
  PlayCircle,
  Quote,
  Radio,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const videoId = "A4CUe3c8rJE";
const videoUrl = "https://www.youtube.com/watch?v=A4CUe3c8rJE";
const websiteUrl = "https://veteransbreakfastclub.org/";
const eventsUrl = "https://veteransbreakfastclub.org/events/";
const scuttlebuttUrl = "https://veteransbreakfastclub.org/scuttlebutt/";
const lionessUrl = "https://lionesstheoriginstory.podbean.com/";
const facebookUrl = "https://www.facebook.com/veteransbreakfastclub";
const instagramUrl = "https://www.instagram.com/veteransbreakfastclub/";
const tiktokUrl = "https://www.tiktok.com/@veteransbreakfastclub";
const xUrl = "https://x.com/vetbreakfast";

const welcomeCenterImage =
  "https://veteransbreakfastclub.org/wp-content/uploads/2026/07/vbc-welcome-center1.jpg";

const impact = [
  { value: "2008", label: "Storytelling breakfasts began" },
  { value: "15,500+", label: "Quarterly magazine reach per issue" },
  { value: "Nearly 5K", label: "Weekly VBC Bulletin subscribers" },
  { value: "2026", label: "First permanent Welcome Center opened" },
];

const programs = [
  {
    icon: Users,
    title: "In-person storytelling",
    body: "Veterans of different eras and branches gather with family members, friends, and civilians for informal breakfasts and events built around conversation rather than speeches.",
  },
  {
    icon: Radio,
    title: "Weekly live conversations",
    body: "Online programs give veterans room to talk about service, military history, difficult experiences, funny memories, and the details civilians rarely hear.",
  },
  {
    icon: BookOpen,
    title: "Stories that stay accessible",
    body: "The Veterans History Project, VBC Magazine, VBC Bulletin, The Scuttlebutt, and special projects preserve first-person stories so families and the public can keep learning from them.",
  },
  {
    icon: Home,
    title: "A permanent place to gather",
    body: "The VBC Welcome Center in Pittsburgh gives veterans, families, students, and neighbors a physical home for conversation, oral history, education, resources, and connection.",
  },
];

const socialLinks = [
  { label: "Facebook", href: facebookUrl },
  { label: "Instagram", href: instagramUrl },
  { label: "TikTok", href: tiktokUrl },
  { label: "X", href: xUrl },
];

export default function VeteransBreakfastClubPage() {
  return (
    <>
      <Helmet>
        <title>Veterans Breakfast Club | A Beyond The Yellow Feature Story | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow features Veterans Breakfast Club and Director of Programming Shaun Hall: how active listening, storytelling, and informal community create space for veterans to share stories they may have carried for decades."
        />
        <meta
          property="og:title"
          content="Sometimes the right room is what finally lets the story out. | Veterans Breakfast Club"
        />
        <meta
          property="og:description"
          content="Watch Shaun Hall explain how Veterans Breakfast Club creates communities where veterans can be heard, families can learn stories they have never heard, and military history stays alive through the people who lived it."
        />
        <meta
          property="og:image"
          content={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/veteransbreakfastclub" />
      </Helmet>

      <Header />
      <main id="main" className="overflow-hidden bg-background">
        <section className="relative border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-[hsl(var(--gold-accent))]/12 blur-3xl" />
            <div className="absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-white/[0.04] blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--gold-accent))]">
                <span className="h-px w-10 bg-[hsl(var(--gold-accent))]" />
                Beyond The Yellow · Feature Story
              </div>

              <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Some veterans carry a story for decades.
                <span className="mt-2 block text-[hsl(var(--gold-accent))]">
                  Sometimes the right room is what finally lets it out.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Veterans Breakfast Club builds communities around one deceptively simple act: listening. Shaun Hall explains why veterans will sometimes share memories with a room of strangers that they have never told their own families—and what can happen when they finally feel safe enough to talk.
              </p>

              <div className="mt-8 border-l-2 border-[hsl(var(--gold-accent))] pl-5">
                <p className="text-sm font-bold text-white">Shaun Hall</p>
                <p className="mt-1 text-sm text-white/60">
                  Director of Programming · Veterans Breakfast Club
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
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                      title="Beyond The Yellow conversation with Shaun Hall of Veterans Breakfast Club"
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
                Sometimes action is not building a house or driving someone to an appointment. Sometimes it is creating the conditions for a person to finally be heard.
              </p>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                VBC treats listening as active work. Their programs make room for the ordinary, funny, painful, complicated, and historically important parts of military service without requiring a veteran to turn the experience into a speech, a heroic story, or a polished lesson for civilians.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                The story behind the work
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                No podium. No pressure. Just a microphone moving around the room.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Veterans Breakfast Club began informally in 2008, when conversations with World War II veterans kept turning into more conversations. The gatherings grew into breakfasts where veterans from different eras and branches could tell stories while civilians listened, learned, and asked better questions.
              </p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Shaun describes a format designed to lower the stakes. One memory triggers another. Someone hears a familiar phrase, raises a hand, and suddenly the room is full of people who understand the language without needing every detail translated.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
                <img
                  src={welcomeCenterImage}
                  alt="Veterans and community members gathered at the Veterans Breakfast Club Welcome Center in Pittsburgh"
                  className="aspect-[4/3] h-full w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--navy))] py-16 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {impact.map((item) => (
                <div key={item.label} className="border-l border-white/15 pl-5">
                  <p className="text-4xl font-black tracking-tight text-[hsl(var(--gold-accent))] md:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[13rem] text-sm leading-6 text-white/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs text-white/45">
              Current program and reach figures are reported by Veterans Breakfast Club in its public materials.
            </p>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <Quote className="mx-auto h-9 w-9 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
            <blockquote className="mx-auto mt-7 max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
              “Just be an active listener. That’s the Beyond The Yellow to me.”
            </blockquote>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Shaun Hall · Beyond The Yellow · 52:54
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Supporting veterans does not always begin with having the answer. Sometimes it begins with staying in the conversation long enough to hear what the person actually wants to say.
            </p>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                The work in action
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                A story can connect a veteran, teach a civilian, open a family conversation, and preserve history at the same time.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {programs.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                    <Icon className="h-6 w-6 text-[hsl(var(--navy))]" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-black text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                  The effect beyond the room
                </p>
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                The person who finally talks may not be the only person changed by the story.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Shaun describes veterans saying they had never talked about certain experiences before—even with family. A VBC conversation can become the first opening: a chance to get something off their chest, reconnect with someone from the past, or go home ready to continue a conversation that had been avoided for years.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[2rem] bg-[hsl(var(--navy))] p-8 text-white shadow-xl">
                <MessageCircle className="h-8 w-8 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
                <p className="mt-6 text-2xl font-black leading-tight">
                  “Everybody that served has a story.”
                </p>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  VBC does not limit the microphone to combat stories, decorated veterans, or famous moments. The cook, the mechanic, the person who never deployed, the veteran who served one year, and the veteran who served thirty all belong in the historical record.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 rounded-[2rem] border border-border bg-card p-7 shadow-sm md:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                  Listen. Attend. Learn more.
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                  The best way to understand the work is to hear the stories.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                  Veterans Breakfast Club welcomes veterans and non-veterans. Explore their events, listen to The Scuttlebutt, hear the real stories behind the Lioness teams, or simply start with the next conversation.
                </p>
              </div>
              <div className="space-y-3 lg:col-span-5">
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl bg-[hsl(var(--navy))] px-5 py-4 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Veterans Breakfast Club
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={eventsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-border px-5 py-4 text-sm font-bold text-foreground"
                >
                  Find an event
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={scuttlebuttUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-border px-5 py-4 text-sm font-bold text-foreground"
                >
                  Listen to The Scuttlebutt
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={lionessUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-border px-5 py-4 text-sm font-bold text-foreground"
                >
                  Lioness: The Origin Story
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold transition hover:text-[hsl(var(--navy))]"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--navy))] py-16 text-white md:py-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Beyond The Yellow
              </p>
              <p className="mt-3 max-w-2xl text-2xl font-black leading-tight tracking-tight md:text-3xl">
                Others are going Beyond The Yellow. How about you?
              </p>
            </div>
            <a
              href="/beyond-the-yellow"
              className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--gold-accent))] transition hover:text-white"
            >
              See what Beyond The Yellow is about
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}