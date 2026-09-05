import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  HeartHandshake,
  Network,
  Play,
  PlayCircle,
  Radio,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { trackHomeEvent } from "@/lib/tracking";

type VideoCard = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  label: string;
};

const latestVideos: VideoCard[] = [
  {
    id: "U0DqQiQOKwE",
    title: "The VA Disability Panic Is Completely Out of Control",
    published: "September 4, 2026",
    thumbnail: "https://i.ytimg.com/vi/U0DqQiQOKwE/maxresdefault.jpg",
    label: "Veteran systems",
  },
  {
    id: "2c-NQ74cn9E",
    title: "CHAMPVA Copays and Coinsurance: What You Should Actually Pay",
    published: "September 2, 2026",
    thumbnail: "https://i.ytimg.com/vi/2c-NQ74cn9E/maxresdefault.jpg",
    label: "Practical help",
  },
  {
    id: "9pYfQit4yYQ",
    title: "VA Disability Fraud: When a Broken System Makes Cheating Look Easier",
    published: "September 1, 2026",
    thumbnail: "https://i.ytimg.com/vi/9pYfQit4yYQ/maxresdefault.jpg",
    label: "Veteran systems",
  },
  {
    id: "6b63BAqehBg",
    title: "We Demand Mental Health Care After Tragedy—Why Not Before?",
    published: "September 1, 2026",
    thumbnail: "https://i.ytimg.com/vi/6b63BAqehBg/maxresdefault.jpg",
    label: "Mental well-being",
  },
  {
    id: "0C1bMw_Nd7U",
    title: "CHAMPVA Claims Can Be Filed Online Now—Stop Using the Mail!",
    published: "August 28, 2026",
    thumbnail: "https://i.ytimg.com/vi/0C1bMw_Nd7U/maxresdefault.jpg",
    label: "Practical help",
  },
  {
    id: "dqD-nwvPRF4",
    title: "VA Community Care Denied? The Rule Veterans Need to Know",
    published: "August 27, 2026",
    thumbnail: "https://i.ytimg.com/vi/dqD-nwvPRF4/maxresdefault.jpg",
    label: "Practical help",
  },
];

const btyVideos: VideoCard[] = [
  {
    id: "A4CUe3c8rJE",
    title: "Why ‘Thank You for Your Service’ Doesn't Heal Veteran Isolation",
    published: "August 31, 2026",
    thumbnail: "https://i.ytimg.com/vi/A4CUe3c8rJE/maxresdefault.jpg",
    label: "Beyond The Yellow",
  },
  {
    id: "iVDPZL_PEWo",
    title: "Skills For Service. No Map For Life",
    published: "August 17, 2026",
    thumbnail: "https://i.ytimg.com/vi/iVDPZL_PEWo/maxresdefault.jpg",
    label: "Beyond The Yellow",
  },
  {
    id: "19JpCgF-d9Q",
    title: "Everyone Says They Support Veterans—Who Actually Does the Work?",
    published: "August 9, 2026",
    thumbnail: "https://i.ytimg.com/vi/19JpCgF-d9Q/maxresdefault.jpg",
    label: "Beyond The Yellow",
  },
  {
    id: "hLvZfGcycOQ",
    title: "The Military Trains You to Follow Orders—Then Leaves You to Figure Life Out",
    published: "August 4, 2026",
    thumbnail: "https://i.ytimg.com/vi/hLvZfGcycOQ/maxresdefault.jpg",
    label: "Beyond The Yellow",
  },
];

const contentPaths: {
  title: string;
  copy: string;
  Icon: LucideIcon;
  destination: string;
  external?: boolean;
  event: string;
}[] = [
  {
    title: "Veteran systems & practical help",
    copy: "Clear explanations, direct opinions, and useful information about care access, CHAMPVA, VA Community Care, disability-system issues, and veteran-family realities.",
    Icon: ShieldCheck,
    destination: "https://www.youtube.com/@ValorWell",
    external: true,
    event: "watch_path_practical",
  },
  {
    title: "Beyond The Yellow",
    copy: "Long-form conversations with people and organizations doing real work instead of stopping at symbolic support.",
    Icon: HeartHandshake,
    destination: "/beyond-the-yellow",
    event: "watch_path_bty",
  },
  {
    title: "Building ValorWell",
    copy: "Founder-led explanations of what ValorWell is building, what is changing, where the friction is, and what the mission looks like in practice.",
    Icon: Wrench,
    destination: "https://www.youtube.com/@ValorWell",
    external: true,
    event: "watch_path_build",
  },
];

function Eyebrow({ children, yellow = false }: { children: ReactNode; yellow?: boolean }) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] ${
        yellow ? "text-[#D7A92E]" : "text-[#3B5147]"
      }`}
    >
      {children}
    </p>
  );
}

function youtubeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function VideoTile({ video, event }: { video: VideoCard; event: string }) {
  return (
    <a
      href={youtubeUrl(video.id)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackHomeEvent(event, { video_id: video.id, page: "watch" })}
      className="group overflow-hidden rounded-2xl border border-[#3B5147]/15 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#3B5147]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="relative aspect-video overflow-hidden bg-[#111814]">
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111814] shadow-lg">
          <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#3B5147]/70">
          {video.label}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-snug text-[#111814]">{video.title}</h3>
        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[#111814]/50">
          <span>{video.published}</span>
          <span className="inline-flex items-center gap-1 font-bold text-[#3B5147]">
            YouTube <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function WatchPage() {
  useEffect(() => {
    trackHomeEvent("watch_page_view", { page: "watch" });
  }, []);

  const featured = latestVideos[0];

  return (
    <Layout>
      <SEO
        title="Watch ValorWell | Stories, Practical Help & Real Action"
        description="Watch ValorWell videos about veteran and family systems, mental well-being, practical help, Beyond The Yellow conversations, and the work behind the mission."
        canonical="/watch"
      />

      <div className="watch-theme bg-[#F4F1E8] text-[#111814]">
        <style>{`
          .watch-theme {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          }
          .watch-theme h1,
          .watch-theme h2,
          .watch-theme h3,
          .watch-theme h4 {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            letter-spacing: -0.025em;
          }
        `}</style>

        <section className="relative overflow-hidden border-b border-white/10 bg-[#111814] text-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-36 -top-44 h-[30rem] w-[30rem] rounded-full bg-[#D7A92E]/10 blur-3xl" />
            <div className="absolute -bottom-52 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#3B5147]/30 blur-3xl" />
          </div>

          <div className="container-wide relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
            <div className="lg:col-span-6">
              <Eyebrow yellow>Watch ValorWell</Eyebrow>
              <h1 className="mt-6 text-4xl font-bold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                Watch the ideas, stories, and work behind ValorWell.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
                Practical veteran and family information. Direct conversations about broken systems. Beyond The Yellow interviews. Founder-led work shown in public.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/@ValorWell"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackHomeEvent("watch_hero_youtube", { page: "watch" })}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#111814] transition hover:bg-[#F4F1E8]"
                >
                  <PlayCircle className="h-5 w-5" aria-hidden="true" />
                  Open ValorWell on YouTube
                </a>
                <Link
                  to="/beyond-the-yellow"
                  onClick={() => trackHomeEvent("watch_hero_bty", { page: "watch" })}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Beyond The Yellow
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <a
                href={youtubeUrl(featured.id)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackHomeEvent("watch_featured_play", { video_id: featured.id, page: "watch" })}
                className="group block overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7A92E]"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={featured.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#111814] shadow-lg">
                      <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#D7A92E]">Latest video</p>
                    <h2 className="mt-2 text-2xl font-bold leading-snug text-white md:text-3xl">{featured.title}</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow>Latest From ValorWell</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  Useful now, not buried in an archive.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#111814]/65">
                  Current videos are surfaced here so Watch functions as a real media destination. The full and continuously updated catalog lives on ValorWell&apos;s YouTube channel.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a
                  href="https://www.youtube.com/@ValorWell/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackHomeEvent("watch_latest_all", { page: "watch" })}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#3B5147]"
                >
                  See all videos <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {latestVideos.map((video) => (
                <VideoTile key={video.id} video={video} event="watch_latest_video" />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-[#F4F1E8]">
          <div className="container-wide py-20 md:py-28">
            <div className="max-w-3xl">
              <Eyebrow>Choose What You Need</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Three media jobs. No artificial program lanes.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#111814]/65">
                Watch is organized around what the content does for the viewer: explain, spotlight, or show the build.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {contentPaths.map(({ title, copy, Icon, destination, external, event }) => {
                const className =
                  "group rounded-3xl border border-[#3B5147]/15 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-[#3B5147]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5147] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none";
                const body = (
                  <>
                    <Icon className="h-8 w-8 text-[#3B5147]" aria-hidden="true" />
                    <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                    <p className="mt-4 leading-7 text-[#111814]/62">{copy}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#3B5147]">
                      Explore
                      {external ? (
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                      )}
                    </span>
                  </>
                );

                return external ? (
                  <a
                    key={title}
                    href={destination}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackHomeEvent(event, { page: "watch" })}
                    className={className}
                  >
                    {body}
                  </a>
                ) : (
                  <Link
                    key={title}
                    to={destination}
                    onClick={() => trackHomeEvent(event, { page: "watch" })}
                    className={className}
                  >
                    {body}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111814] text-white">
          <div className="container-wide py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow yellow>Beyond The Yellow Conversations</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  Long conversations with people doing the work.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                  Beyond The Yellow gives people and organizations taking real action room to explain the problem they saw, what they actually do, and how others can help.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  to="/network"
                  onClick={() => trackHomeEvent("watch_bty_network", { page: "watch" })}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#D7A92E]"
                >
                  Find featured organizations <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {btyVideos.map((video) => (
                <a
                  key={video.id}
                  href={youtubeUrl(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackHomeEvent("watch_bty_video", { video_id: video.id, page: "watch" })}
                  className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] transition hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7A92E]"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={video.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
                    <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#111814]">
                      <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D7A92E]">Beyond The Yellow</p>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-white">{video.title}</h3>
                    <p className="mt-4 text-xs text-white/45">{video.published}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/beyond-the-yellow"
                onClick={() => trackHomeEvent("watch_bty_explore", { page: "watch" })}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#D7A92E] px-5 py-3 text-sm font-bold text-[#111814]"
              >
                Explore Beyond The Yellow
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/network"
                onClick={() => trackHomeEvent("watch_network", { page: "watch" })}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                <Network className="h-4 w-4" aria-hidden="true" />
                Explore the Network
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-[#3B5147]/15 bg-white">
          <div className="container-wide grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow>What Watch Is For</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Media should move people somewhere useful.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="divide-y divide-[#3B5147]/12 border-y border-[#3B5147]/12">
                {[
                  [Radio, "Understand the issue", "Use video to make complicated systems, mental-health realities, and practical choices easier to understand."],
                  [Users, "Meet people doing the work", "Use long-form conversations to introduce viewers to credible organizations and people taking real action."],
                  [Wrench, "See how ValorWell thinks", "Founder-led content makes the organization less opaque by showing decisions, friction, disagreement, and progress in public."],
                ].map(([Icon, title, copy]) => {
                  const RowIcon = Icon as LucideIcon;
                  return (
                    <div key={title as string} className="grid gap-4 py-7 sm:grid-cols-[48px_1fr]">
                      <RowIcon className="mt-1 h-6 w-6 text-[#3B5147]" aria-hidden="true" />
                      <div>
                        <h3 className="text-xl font-bold">{title as string}</h3>
                        <p className="mt-2 leading-7 text-[#111814]/62">{copy as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#3B5147] text-white">
          <div className="container-wide py-20 text-center md:py-24">
            <PlayCircle className="mx-auto h-10 w-10 text-[#D7A92E]" aria-hidden="true" />
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Watch the work. Then choose what you want to do with it.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Follow ValorWell for the current media stream, or move from watching into care, organizations, impact, or participation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://www.youtube.com/@ValorWell"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackHomeEvent("watch_final_youtube", { page: "watch" })}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#3B5147]"
              >
                Follow on YouTube
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/impact"
                onClick={() => trackHomeEvent("watch_final_impact", { page: "watch" })}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                See Impact
              </Link>
              <Link
                to="/get-care"
                onClick={() => trackHomeEvent("watch_final_care", { page: "watch" })}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Find Care
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
