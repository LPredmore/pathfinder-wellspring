import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, PlayCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const organizations = [
  {
    organization: "Veterans Breakfast Club",
    title: "Some veterans carry a story for decades. Sometimes the right room is what finally lets it out.",
    videoId: "A4CUe3c8rJE",
    videoUrl: "https://www.youtube.com/watch?v=A4CUe3c8rJE",
    featureUrl: "/veteransbreakfastclub",
    description:
      "Shaun Hall on active listening, the stories veterans sometimes never tell their own families, and how Veterans Breakfast Club creates low-pressure spaces where those stories can finally be heard.",
  },
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

function OrganizationCard({
  organization,
  title,
  videoId,
  videoUrl,
  featureUrl,
  description,
}: (typeof organizations)[number]) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <Link
        to={featureUrl}
        className="group block overflow-hidden bg-black"
        aria-label={`Explore ${organization}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`${organization} Beyond The Yellow feature`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
          <Building2 className="h-4 w-4" aria-hidden="true" />
          Beyond The Yellow Organization
        </div>
        <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-foreground">
          {organization}
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-foreground/80">
          {title}
        </p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to={featureUrl}
            className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--navy))]"
          >
            View feature
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-foreground"
          >
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            Watch conversation
          </a>
        </div>
      </div>
    </article>
  );
}

export default function NetworkPage() {
  return (
    <>
      <Helmet>
        <title>Beyond The Yellow Network | ValorWell</title>
        <meta
          name="description"
          content="Discover organizations featured by Beyond The Yellow and explore the real work they are doing for veterans and their communities."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.valorwell.org/network" />
      </Helmet>

      <Header />
      <main className="min-h-screen bg-background">
        <section className="border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[hsl(var(--gold-accent))]">
              Beyond The Yellow Network
            </p>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Find the organizations doing the work.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
              Beyond The Yellow features organizations whose support goes beyond symbolism. Explore their work, read their features, and hear the conversations behind it.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
                Featured organizations
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
                Start with the people already taking action.
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                This is an editorial directory of organizations already featured by Beyond The Yellow. It is not yet a comprehensive veteran-service directory; search and location tools will be added only as the network grows enough to make them genuinely useful.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {organizations.map((organization) => (
                <OrganizationCard key={organization.organization} {...organization} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--section-alt))] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-accent))]">
              Know someone doing real work?
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Help us find the next organization worth knowing.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Beyond The Yellow exists to make real action visible. Share your story or nominate an organization whose work would actually be missed if it stopped.
            </p>
            <Link
              to="/beyond-the-yellow"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--navy))] px-5 py-3 text-sm font-bold text-white"
            >
              Explore Beyond The Yellow
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
