import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface ClickToLoadYouTubeShortProps {
  videoId: string;
  title?: string;
  className?: string;
}

const ClickToLoadYouTubeShort = ({
  videoId,
  title = "YouTube Short",
  className,
}: ClickToLoadYouTubeShortProps) => {
  const [loaded, setLoaded] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={className}>
      <div
        className="relative mx-auto max-w-sm min-w-[200px] min-h-[200px] rounded-lg overflow-hidden"
        style={{ aspectRatio: "9 / 16" }}
      >
        {loaded ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            aria-label="Watch Short"
            onClick={() => setLoaded(true)}
            className="w-full h-full bg-cover bg-center flex items-center justify-center cursor-pointer border-0"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          >
            <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium shadow-lg">
              <Play className="h-5 w-5" />
              Watch Short
            </span>
          </button>
        )}
      </div>
      {!loaded && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          After it loads, press play in the player to start.
        </p>
      )}
    </div>
  );
};

export { ClickToLoadYouTubeShort };
