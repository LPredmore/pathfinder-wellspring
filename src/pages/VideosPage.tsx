import { Helmet } from "react-helmet-async";
import { ArrowUpRight, PlayCircle } from "lucide-react";

const latestVideo = {
  organization: "Veterans Breakfast Club",
  title: "Some veterans carry a story for decades. Sometimes the right room is what finally lets it out.",
  videoId: "A4CUe3c8rJE",
  videoUrl: "https://www.youtube.com/watch?v=A4CUe3c8rJE",
  featureUrl: "/veteransbreakfastclub",
  description:
    "Shaun Hall on active listening, the stories veterans sometimes never tell their own families, and how Veterans Breakfast Club creates low-pressure spaces where those stories can finally be heard.",
};

const pastVideos = [
  {
    organization: "GallantFew",
    title: "The mission ends. The need for direction doesn’t.",
    videoId: "zsaTKjNVeew",
    videoUrl: "https://www.youtube.com/watch?v=zsaTKjNVeew",
    featureUrl: "/gallantfew",
    description:
      "Karl Monger on what happens when military structure, identity, accountability, and mission disappear—and how veterans can deliberately build what comes next.",
  },
  {
    organization: "VETS2INDUSTRY",
    title: "The resources exist. The problem is knowing where to find them.",
    videoId: "iVDPZL_PEWo",
    videoUrl: "https://www.youtube.com/watch?v=iVDPZL_PEWo",
    featureUrl: "/vets2industry",
    description:
      "Matthew Philip Wee on why veterans need more than a list of resources—they need context, trusted connections, and a path toward what is actually useful.",
  },
  {
    organization: "Military Missions in Action",
    title: "Practical help should change what a veteran can do tomorrow.",
    videoId: "19JpCgF-d9Q",
    videoUrl: "https://www.youtube.com/watch?v=19JpCgF-d9Q",
    featureUrl: "/mmia",
    description:
      "Zak Keisler on direct, tangible veteran support—from accessibility projects and furnished homes to transportation and essential supplies.",
  },
  {
    organization: "Veterans Outreach of Wisconsin",
    title: "A tiny home is the beginning. The real work is what comes next.",
    videoId: "hLvZfGcycOQ",
    videoUrl: "https://www.youtube.com/watch?v=hLvZfGcycOQ",
    featureUrl: "/VOW",
    description:
      "John Shaw on housing, food access, community, peer support, and the work of helping veterans rebuild stability after the immediate crisis.",
  },
];

function VideoCard({
  organization,
  title,
  videoId,
  videoUrl,
  featureUrl,
  description,
}: (typeof pastVideos)[number]) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <a
        href={videoUrl}
        target="_blank"
        rel="noreferrer"
        className="group block overflow-hidden bg-black"
        aria-label={`Watch ${organization} on YouTube`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`${organization} Beyond The Yellow video thumbnail`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 text-[hsl(var(--navy))] shadow-xl">
              <PlayCircle className="h-7 w-7" aria-hidden="true" />
            </span>
          </div>
        </div>
      </a>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
          {organization}
        </p>
        <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--navy))]"
          >
            Watch video
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={featureUrl}
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-foreground"
          >
            Read feature
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function VideosPage() {
  return (
    <>
      <Helmet>
        <title>Beyond The Yellow Videos | ValorWell</title>
        <meta
          name="description"
          content="Watch Beyond The Yellow conversations with veteran organizations turning support into action people can actually feel."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.valorwell.org/videos" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <section className="border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[hsl(var(--gold-accent))]">
              Beyond The Yellow
            </p>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Stories from organizations turning support into action.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Long-form conversations with veteran organizations building things people can actually use, feel, and point to.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${latestVideo.videoId}?rel=0`}
                    title={`Beyond The Yellow: ${latestVideo.organization}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
                Latest feature · {latestVideo.organization}
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
                {latestVideo.title}
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {latestVideo.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href={latestVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-bold text-white"
                >
                  Watch on YouTube
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={latestVideo.featureUrl}
                  className="inline-flex items-center gap-2 px-1 py-3 text-sm font-bold text-[hsl(var(--navy))]"
                >
                  Read the feature
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--section-alt))] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
                Past features
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
                The archive keeps growing.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastVideos.map((video) => (
                <VideoCard key={video.videoId} {...video} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
