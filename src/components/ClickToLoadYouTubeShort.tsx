import { useState } from "react";
import { Play } from "lucide-react";

interface ClickToLoadYouTubeShortProps {
  videoId: string;
  title?: string;
  className?: string;
  /**
   * Optional custom cover image URL shown before the video loads.
   * Import an image asset and pass it here, e.g.:
   *   import cover from "@/assets/my-cover.jpg";
   *   <ClickToLoadYouTubeShort videoId="..." coverImage={cover} />
   * If omitted, falls back to the YouTube-generated thumbnail.
   */
  coverImage?: string;
  /** Aspect ratio of the player. Defaults to "9 / 16" (vertical Short). Use "16 / 9" for landscape. */
  aspect?: string;
  /** Max width class override. Defaults to "max-w-sm" (good for Shorts). */
  maxWidthClassName?: string;
}

const ClickToLoadYouTubeShort = ({
  videoId,
  title = "YouTube Short",
  className,
  coverImage,
  aspect = "9 / 16",
  maxWidthClassName = "max-w-sm",
}: ClickToLoadYouTubeShortProps) => {
  const [loaded, setLoaded] = useState(false);

  const thumbnailUrl =
    coverImage ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={className}>
      <div
        className={`relative mx-auto w-full ${maxWidthClassName} min-h-[200px] rounded-lg overflow-hidden`}
        style={{ aspectRatio: aspect }}
      >
        {loaded ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            aria-label={`Play ${title}`}
            onClick={() => setLoaded(true)}
            className="group w-full h-full bg-cover bg-center flex items-center justify-center cursor-pointer border-0 p-0"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-7 w-7" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export { ClickToLoadYouTubeShort };
