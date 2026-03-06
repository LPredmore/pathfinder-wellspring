import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout";
import { SEO, VideoObjectSchema } from "@/components/SEO";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

interface PostedVideo {
  id: string;
  youtube_video_id: string;
  youtube_title: string | null;
  youtube_desc: string | null;
  scheduled_at: string | null;
  image_url: string | null;
}

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["public-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posted_content")
        .select("id, youtube_video_id, youtube_title, youtube_desc, scheduled_at, image_url")
        .eq("post_length", "Long")
        .eq("status", "posted")
        .not("youtube_video_id", "is", null)
        .order("scheduled_at", { ascending: false });
      if (error) throw error;
      return data as PostedVideo[];
    },
  });


  return (
    <Layout>
      <SEO
        title="Videos"
        description="Watch mental health education videos from ValorWell — insights, guidance, and support for veterans and military families."
        canonical="/videos"
      />

      <section className="container-wide py-16">
        <h1 className="text-4xl font-bold text-foreground mb-2">Videos</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Educational content on mental health topics relevant to veterans and military families.
        </p>

        {isLoading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full aspect-video rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && videos && videos.length === 0 && (
          <p className="text-muted-foreground text-center py-20">
            No videos available yet. Check back soon!
          </p>
        )}

        {!isLoading && videos && videos.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
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
                      <img
                        src={`https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`}
                        alt={video.youtube_title || "Video thumbnail"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => handleThumbnailError(e, video)}
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium shadow-lg">
                          <Play className="h-5 w-5" />
                          Watch
                        </span>
                      </span>
                    </button>
                  )}
                </AspectRatio>

                {video.youtube_title && (
                  <h2 className="text-base font-semibold text-foreground leading-snug">
                    {video.youtube_title}
                  </h2>
                )}

                {video.youtube_desc && (
                  <span className="sr-only">{video.youtube_desc}</span>
                )}

                <VideoObjectSchema
                  name={video.youtube_title || "ValorWell Video"}
                  description={video.youtube_desc || "Mental health education for veterans and military families."}
                  embedUrl={`https://www.youtube.com/embed/${video.youtube_video_id}`}
                  thumbnailUrl={video.image_url || `https://img.youtube.com/vi/${video.youtube_video_id}/hqdefault.jpg`}
                />
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
