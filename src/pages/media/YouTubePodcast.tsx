import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Play, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema, VideoObjectSchema } from "@/components/SEO";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const YOUTUBE_URL = "https://www.youtube.com/@valorwell";

interface PostedVideo {
  id: string;
  youtube_video_id: string;
  youtube_title: string | null;
  youtube_desc: string | null;
  scheduled_at: string | null;
  image: string | null;
  thumbnailUrl?: string;
}

const categories = [
  {
    name: "Veteran Mental Health Access",
    topics: ["VA access barriers", "CHAMPVA", "Provider shortages", "Care delays", "Telehealth", "Documentation gaps"],
  },
  {
    name: "Family Systems",
    topics: ["Communication", "Parenting", "Conflict", "Emotional regulation", "Systems over reactions"],
  },
  {
    name: "Disability-System Support",
    topics: ["Ethical clinical documentation", "Treatment records", "Why predatory systems fill the gap", "How veterans can avoid exploitative options"],
  },
  {
    name: "Provider and Advocate Conversations",
    topics: ["Clinicians", "Veteran organizations", "Nonprofit leaders", "Community partners", "Advocates"],
  },
  {
    name: "Beyond the Yellow",
    topics: ["Funded therapy hours", "Creator campaigns", "Sponsors", "Mission partners", "Turning awareness into action"],
  },
];

const guestTypes = [
  "Veterans",
  "Spouses and family members",
  "Clinicians",
  "Veteran advocates",
  "Nonprofit leaders",
  "Community organizers",
  "Creators with aligned audiences",
  "People with personal stories about care barriers",
];

const getVideoThumbnail = (video: PostedVideo) =>
  video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtube_video_id}/hqdefault.jpg`;

const YouTubePodcast = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["public-youtube-podcast-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posted_content")
        .select("id, youtube_video_id, youtube_title, youtube_desc, scheduled_at, image")
        .eq("post_length", "Long")
        .eq("status", "posted")
        .not("youtube_video_id", "is", null)
        .order("scheduled_at", { ascending: false });

      if (error) throw error;

      const rows = data as PostedVideo[];
      const pathsToSign = rows.map((v) => v.image).filter((p): p is string => !!p);

      if (pathsToSign.length > 0) {
        try {
          const { data: signData, error: signError } = await supabase.functions.invoke("r2-sign-urls", {
            body: { paths: pathsToSign },
          });

          if (!signError && signData?.signed) {
            const urlMap = signData.signed as Record<string, string>;
            rows.forEach((v) => {
              if (v.image && urlMap[v.image]) {
                v.thumbnailUrl = urlMap[v.image];
              }
            });
          }
        } catch (e) {
          console.warn("Failed to sign R2 URLs, falling back to YouTube thumbnails", e);
        }
      }

      return rows;
    },
  });

  const featuredVideo = videos?.[0];
  const remainingVideos = videos?.slice(1) || [];

  return (
    <Layout>
      <SEO
        title="ValorWell YouTube and Podcast — VA Access, Family Support and Mission Conversations"
        description="Watch long-form ValorWell conversations about VA access, family support, documentation, Beyond the Yellow, and the mission to build better systems."
        canonical="/media/youtube-podcast"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Media", url: "/media" },
          { name: "YouTube & Podcast", url: "/media/youtube-podcast" },
        ]}
      />

      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">YouTube & Podcast</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Long-form conversations about the systems that shape veterans, families, and mental health.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            ValorWell's YouTube and podcast-style conversations go deeper than short clips. Watch the latest long-form videos from our YouTube channel and subscribe for future conversations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href="#featured-video">Watch Featured Video</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy hover:bg-navy/5">
              <Link to="/partners">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured-video" className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Featured Video</h2>
          <p className="text-muted-foreground mb-6">
            The featured video is currently the newest published long-form YouTube video. The rest of the library appears below in newest-first order.
          </p>

          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="w-full aspect-video rounded-lg" />
              <Skeleton className="h-6 w-2/3" />
            </div>
          )}

          {!isLoading && !featuredVideo && (
            <div className="aspect-video w-full border-2 border-dashed border-navy/30 rounded-lg bg-background flex items-center justify-center mb-6">
              <div className="text-center p-6">
                <p className="text-navy font-semibold mb-2">Featured Video Coming Soon</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Published long-form YouTube videos will appear here automatically once they are available.
                </p>
              </div>
            </div>
          )}

          {!isLoading && featuredVideo && (
            <article className="space-y-4">
              <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${featuredVideo.youtube_video_id}`}
                  title={featuredVideo.youtube_title || "ValorWell featured video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </AspectRatio>
              {featuredVideo.youtube_title && (
                <h3 className="text-2xl font-bold text-navy leading-snug">{featuredVideo.youtube_title}</h3>
              )}
              {featuredVideo.youtube_desc && <p className="text-muted-foreground line-clamp-3">{featuredVideo.youtube_desc}</p>}
              <VideoObjectSchema
                name={featuredVideo.youtube_title || "ValorWell Featured Video"}
                description={featuredVideo.youtube_desc || "Long-form ValorWell conversation for veterans and military families."}
                embedUrl={`https://www.youtube.com/embed/${featuredVideo.youtube_video_id}`}
                thumbnailUrl={getVideoThumbnail(featuredVideo)}
              />
            </article>
          )}
        </div>
      </section>

      {!isLoading && remainingVideos.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container-wide">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy">More Videos</h2>
                <p className="text-muted-foreground mt-2">Additional long-form videos, sorted by newest published first.</p>
              </div>
              <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white md:self-center">
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-4 w-4" /> View Channel
                </a>
              </Button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {remainingVideos.map((video) => {
                const thumb = getVideoThumbnail(video);

                return (
                  <article key={video.id} className="space-y-3">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden bg-muted">
                      {activeVideo === video.id ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtube_video_id}?autoplay=1`}
                          title={video.youtube_title || "ValorWell video"}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <button
                          type="button"
                          aria-label={`Play ${video.youtube_title || "video"}`}
                          onClick={() => setActiveVideo(video.id)}
                          className="relative w-full h-full cursor-pointer border-0 p-0 bg-transparent"
                        >
                          <img src={thumb} alt={video.youtube_title || "Video thumbnail"} className="w-full h-full object-cover" loading="lazy" />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium shadow-lg">
                              <Play className="h-5 w-5" />
                              Watch
                            </span>
                          </span>
                        </button>
                      )}
                    </AspectRatio>
                    {video.youtube_title && <h3 className="text-base font-semibold text-foreground leading-snug">{video.youtube_title}</h3>}
                    {video.youtube_desc && <span className="sr-only">{video.youtube_desc}</span>}
                    <VideoObjectSchema
                      name={video.youtube_title || "ValorWell Video"}
                      description={video.youtube_desc || "Long-form ValorWell conversation for veterans and military families."}
                      embedUrl={`https://www.youtube.com/embed/${video.youtube_video_id}`}
                      thumbnailUrl={thumb}
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Conversation Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
              <Card key={c.name} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-4">{c.name}</h3>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    {c.topics.map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Real conversations with people close to the problem.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We want to talk with veterans, family members, providers, advocates, creators, and organizations who care about building better support systems.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 mb-8 text-muted-foreground">
            {guestTypes.map((g) => (
              <li key={g}>• {g}</li>
            ))}
          </ul>
          <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
            <Link to="/partners">Apply to Partner With Us</Link>
          </Button>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe for deeper conversations.</h2>
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            If the short videos introduce the framework, the long-form conversations explain the mission.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link to="/beyondtheyellow">Support the Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default YouTubePodcast;
