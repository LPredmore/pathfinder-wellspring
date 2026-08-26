import { Helmet } from "react-helmet-async";
import { ArrowUpRight, ExternalLink, PlayCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type OrganizationLink = {
  label: string;
  url: string;
};

type Highlight = {
  title: string;
  body: string;
};

type BtyOrganizationHighlightProps = {
  name: string;
  routePath: string;
  summary: string;
  description: string;
  highlights: Highlight[];
  videoUrl: string;
  videoEmbedUrl: string;
  links: OrganizationLink[];
};

export function BtyOrganizationHighlight({
  name,
  routePath,
  summary,
  description,
  highlights,
  videoUrl,
  videoEmbedUrl,
  links,
}: BtyOrganizationHighlightProps) {
  const canonicalUrl = `https://www.valorwell.org${routePath}`;
  const seoDescription = `${name} is featured on Beyond The Yellow by ValorWell. Learn what the organization does, watch the conversation, and find its official channels.`;

  return (
    <>
      <Helmet>
        <title>{name} | Beyond The Yellow | ValorWell</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={`${name} | Beyond The Yellow`} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Header />
      <main id="main" className="bg-background">
        <section className="relative overflow-hidden border-b border-white/10 bg-[hsl(var(--navy))] text-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[hsl(var(--gold-accent))]/20 blur-3xl" />
            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
              Beyond The Yellow · Organization Highlight
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-[1.03] tracking-tight md:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              {summary}
            </p>
            <div className="mt-9">
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--gold-accent))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--navy))] shadow-lg transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Watch the BTY Conversation
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                What they do
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Work that creates something people can actually feel.
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground md:text-lg">
                {description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-2xl border border-border bg-[hsl(var(--section-alt))] p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-foreground">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {highlight.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-[hsl(var(--section-alt))] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Beyond The Yellow
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Watch the conversation
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
                Hear directly from {name} about the need they saw, the work they are doing, and what meaningful support looks like in practice.
              </p>
            </div>

            <div className="mt-9 overflow-hidden rounded-3xl border border-border bg-black shadow-xl">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={videoEmbedUrl}
                  title={`Beyond The Yellow conversation with ${name}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-6">
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--navy))] underline decoration-[hsl(var(--gold-accent))] decoration-2 underline-offset-4 transition hover:opacity-75"
              >
                Open this episode on YouTube
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-accent))]">
                Connect with {name}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Follow the work beyond the episode.
              </h2>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((link) => (
                <a
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-[hsl(var(--gold-accent))] hover:shadow-md"
                >
                  <span>{link.label}</span>
                  <ExternalLink
                    className="h-4 w-4 text-muted-foreground transition group-hover:text-[hsl(var(--navy))]"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
