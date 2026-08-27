import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  ExternalLink,
  HeartHandshake,
  Mountain,
  PlayCircle,
  Quote,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const videoUrl =
  "https://www.youtube.com/watch?v=zsaTKjNVeew&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=6";

const karlCounselingImage =
  "https://static.wixstatic.com/media/83a7c4_f059f8ac8c974ac18bcff1e89e4632e0~mv2.jpg/v1/fill/w_1132,h_764,al_c,q_90/GF%20Karl%20counseling.jpg";

const climbingImage =
  "https://static.wixstatic.com/media/3d4249_ea3bf3661efa44e0ac40caa8778f4701~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_90/3d4249_ea3bf3661efa44e0ac40caa8778f4701~mv2.jpg";

const impact = [
  { value: "2010", label: "GallantFew founded" },
  { value: "8,000+", label: "Military-community members assisted" },
  { value: "1,500+", label: "Veterans reached each year" },
  { value: "5", label: "Functional-fitness domains measured" },
];

const work = [
  {
    number: "01",
    icon: Users,
    title: "Connection",
    body: "GallantFew creates places where veterans can belong before they need a crisis intervention—from climbing sessions and veteran gatherings to the Ranger Outreach Center in Columbus, Georgia.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Coaching",
    body: "The Azimuth Check turns a vague question—\"How am I doing?\"—into something veterans can act on by measuring emotional, physical, spiritual, professional, and social fitness.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Counseling",
    body: "When coaching is not enough, GallantFew provides confidential, veteran-centered clinical counseling and connects veterans with professionals who understand military culture.",
  },
];

export default function GallantFewPage() {
  return (
    <>
      <Helmet>
        <title>GallantFew | A Beyond The Yellow Feature Story | ValorWell</title>
        <meta
          name="description"
          content="Beyond The Yellow features GallantFew and founder Karl Monger: the story behind an Army Ranger-led model helping veterans find connection, direction, and purpose after military service."
        />
        <meta
          property="og:title"
          content="The mission ends. The need for direction doesn’t. | GallantFew"
        />
        <meta
          property="og:description"
          content="Watch the Beyond The Yellow conversation with Karl Monger and see how GallantFew turns military-transition experience into connection, coaching, and counseling for veterans."
        />
        <meta
          property="og:image"
          content="https://i.ytimg.com/vi/zsaTKjNVeew/maxresdefault.jpg"
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.valorwell.org/gallantfew" />
      </Helmet>

      <Header />
      <main id="main" className="overflow-hidden bg-background">
        <section className="relative border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-36 top-24 h-96 w-96 rounded-full bg-[hsl(var(--gold-accent))]/10 blur-3xl" />
            <div className="absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-white/[0.04] blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold-accent))]/60 to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--gold-accent))]">
                <span className="h-px w-10 bg-[hsl(var(--gold-accent))]" />
                Beyond The Yellow · Feature Story
              </div>

              <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
                The mission ends.
                <span className="mt-2 block text-[hsl(var(--gold-accent))]">
                  The need for direction doesn’t.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Karl Monger knows what it feels like to leave one of the most defined teams in the world and discover that civilian life does not hand you the next objective. GallantFew grew from that gap.
              </p>

              <div className="mt-8 border-l-2 border-[hsl(var(--gold-accent))] pl-5">
                <p className="text-sm font-bold text-white">Karl Monger</p>
                <p className="mt-1 text-sm text-white/60">
                  Founder &amp; Clinical Director · GallantFew
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
                      src="https://www.youtube-nocookie.com/embed/zsaTKjNVeew?rel=0"
                      title="Beyond The Yellow conversation with Karl Monger of GallantFew"
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
                Beyond The Yellow is about the gap between recognizing a problem and building something people can actually use.
              </p>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                GallantFew turns military transition into a navigation problem: establish where you are, decide where you want to go, and build the relationships, habits, and support that keep you moving toward the objective. It is practical, measurable, and rooted in experience rather than slogans.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[hsl(var(--section-alt))] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[2rem] bg-muted shadow-xl">
                <img
                  src={karlCounselingImage}
                  alt="Karl Monger working with a veteran through GallantFew"
                  className="aspect-[4/3] h-full w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Karl Monger, GallantFew founder and clinical director. Image: GallantFew.
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                The story behind the work
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                He left the team—then spent years keeping the team at a distance.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                After ten years on active duty and a devastating 1992 helicopter crash that killed Rangers and Air Force special operators he knew, Monger chose to leave the Army. In the BTY conversation, he describes pulling away from the Ranger identity because talking about it meant reopening what had happened.
              </p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                The unintended cost was isolation from the very people most able to understand him. Nearly a decade later, reconnecting with the Ranger community gave him a sense of belonging again—and showed him how many other veterans were navigating the same terrain without a guide.
              </p>
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
                  <p className="mt-2 max-w-[12rem] text-sm leading-6 text-white/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs text-white/45">
              Impact figures and program details reported by GallantFew in its current public materials.
            </p>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Quote className="mx-auto h-9 w-9 text-[hsl(var(--gold-accent))]" aria-hidden="true" />
              <blockquote className="mt-7 text-4xl font-black leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl">
                “Too many veterans live by accident.”
              </blockquote>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Karl Monger · Beyond The Yellow · 1:12:09
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                The point is not blame. It is what happens when structure, accountability, identity, and mission disappear at the same time. GallantFew’s answer is deliberate navigation: know your position, choose the objective, then keep checking your azimuth.
              </p>
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
                  Not one program. A way to get back on azimuth.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-8 text-muted-foreground">
                  GallantFew’s “3Cs” give veterans multiple doors into the same goal: a life that feels connected, intentional, and worth moving toward.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="relative overflow-hidden rounded-[2rem] bg-[hsl(var(--navy))] lg:col-span-7">
                <img
                  src={climbingImage}
                  alt="Veterans participating in GallantFew's climbing program"
                  className="h-full min-h-[26rem] w-full object-cover opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-accent))]">
                    <Mountain className="h-4 w-4" aria-hidden="true" />
                    Connection in motion
                  </div>
                  <h3 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                    Sometimes belonging starts on a climbing wall.
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                    GallantFew’s no-cost veteran climbing sessions use movement, problem-solving, trust, and shared experience to create a low-pressure path back into community.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-0 border-t border-border">
                  {work.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-7">
                        <div>
                          <span className="text-xs font-black tracking-[0.16em] text-[hsl(var(--gold-accent))]">
                            {item.number}
                          </span>
                          <Icon className="mt-4 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-foreground">{item.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 rounded-[2rem] border border-border bg-card p-7 shadow-sm md:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
              <div className="lg:col-span-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                  Ranger for Life
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  Transition support before the veteran has to find the hard way alone.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                  GallantFew’s Ranger for Life symposiums bring transitioning Rangers, alumni, mentors, and subject-matter experts together for candid conversations about identity, career development, mental health, resources, and what comes after the Regiment.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="https://www.gallantfew.org/rangerforlife"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-[hsl(var(--navy))] underline decoration-[hsl(var(--gold-accent))] decoration-2 underline-offset-4 transition hover:opacity-70"
                >
                  Explore Ranger for Life
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
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
                The episode ends. GallantFew’s work doesn’t.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                Learn more about GallantFew’s programs, follow what they are building, or share their work with a veteran who may need a place to start.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href="https://www.gallantfew.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-black text-[hsl(var(--navy))] transition hover:brightness-95"
              >
                Visit GallantFew
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-12">
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-7">
                {[
                  { label: "Website", url: "https://www.gallantfew.org/" },
                  { label: "YouTube", url: "https://www.youtube.com/user/GallantFewInc" },
                  { label: "Facebook", url: "https://www.facebook.com/gallantfew/" },
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
