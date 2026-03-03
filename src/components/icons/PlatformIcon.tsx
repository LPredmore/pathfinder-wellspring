import { Instagram, Youtube, Facebook, Linkedin, Twitch, Globe } from "lucide-react";

/* ── Custom SVG icons (single-color, currentColor) ── */

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.61a8.21 8.21 0 0 0 4.76 1.51v-3.44a4.85 4.85 0 0 1-1-.01Z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const RedditIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const SnapChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.214.094-.03.189-.06.28-.084a.977.977 0 0 1 .278-.04c.39 0 .667.27.667.555 0 .405-.51.75-1.059.96-.105.044-.209.079-.315.114a.93.93 0 0 0-.315.12.38.38 0 0 0-.134.24 4.6 4.6 0 0 0-.044.39c.09.21.3.42.555.585a4.97 4.97 0 0 0 .795.405c.3.12.615.24.87.39.795.42 1.185.96 1.185 1.53 0 .015-.015.09-.015.12-.03.45-.27.825-.72 1.11-.42.27-.945.42-1.515.495a2.27 2.27 0 0 0-.195.03c-.105.03-.21.09-.285.225-.15.25-.36.494-.585.494-.135 0-.3-.06-.51-.165a4.4 4.4 0 0 0-.69-.255c-.27-.075-.57-.12-.87-.12-.3 0-.585.06-.84.165-.3.12-.57.285-.84.42l-.045.03c-.615.345-1.245.69-2.04.69-.015 0-.045 0-.06-.003-.015.003-.045.003-.06.003-.795 0-1.44-.36-2.055-.69l-.045-.03c-.27-.135-.54-.3-.84-.42A2.72 2.72 0 0 0 8.28 16.5c-.3 0-.585.045-.855.12-.225.06-.435.15-.66.255-.21.105-.36.165-.51.165-.24 0-.42-.24-.585-.494a.61.61 0 0 0-.285-.225 2.27 2.27 0 0 0-.195-.03c-.57-.075-1.095-.225-1.515-.495-.45-.285-.69-.66-.72-1.11 0-.03-.015-.105-.015-.12 0-.57.39-1.11 1.185-1.53.255-.15.57-.27.87-.39a4.97 4.97 0 0 0 .795-.405c.255-.165.465-.375.555-.585a4.6 4.6 0 0 0-.044-.39.38.38 0 0 0-.134-.24.93.93 0 0 0-.315-.12c-.105-.035-.21-.07-.315-.114-.555-.21-1.059-.555-1.059-.96 0-.285.278-.555.667-.555a.97.97 0 0 1 .278.04c.09.024.186.054.28.084.263.094.622.214.922.214.195 0 .33-.045.4-.09a18.7 18.7 0 0 1-.032-.57c-.104-1.628-.23-3.654.3-4.847C5.68 1.069 9.036.793 10.026.793h.09z" />
  </svg>
);

const BlueSkyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.6 3.476 6.178 3.126-4.467.78-8.308 2.656-3.132 9.282C8.756 19.783 11.22 14.5 12 13.1c.78 1.4 3.244 6.683 8.33 9.555 5.176-6.626 1.335-8.501-3.132-9.282 2.578.35 5.393-.499 6.178-3.126C23.622 9.419 24 4.458 24 3.768c0-.689-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
  </svg>
);

const PatreonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z" />
  </svg>
);

/* ── Icon map ── */

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  tiktok: TikTokIcon,
  instagram: ({ className }) => <Instagram className={className} />,
  youtube: ({ className }) => <Youtube className={className} />,
  facebook: ({ className }) => <Facebook className={className} />,
  "x": XIcon,
  "x/twitter": XIcon,
  linkedin: ({ className }) => <Linkedin className={className} />,
  reddit: RedditIcon,
  snapchat: SnapChatIcon,
  bluesky: BlueSkyIcon,
  twitch: ({ className }) => <Twitch className={className} />,
  patreon: PatreonIcon,
};

/* ── Public API ── */

export function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  const key = platform.toLowerCase();
  const Icon = ICON_MAP[key];
  if (Icon) return <Icon className={className} />;
  return <Globe className={className} />;
}

export function buildSocialUrl(platform: string, handle: string): string | null {
  const clean = handle.replace(/^@/, "");
  switch (platform.toLowerCase()) {
    case "tiktok":
      return `https://www.tiktok.com/@${clean}`;
    case "instagram":
      return `https://www.instagram.com/${clean}`;
    case "youtube":
      return handle.startsWith("http") ? handle : `https://www.youtube.com/@${clean}`;
    case "facebook":
      return handle.startsWith("http") ? handle : `https://www.facebook.com/${clean}`;
    case "x":
    case "x/twitter":
      return `https://x.com/${clean}`;
    case "linkedin":
      return handle.startsWith("http") ? handle : `https://www.linkedin.com/in/${clean}`;
    case "reddit":
      return `https://www.reddit.com/user/${clean}`;
    case "snapchat":
      return `https://www.snapchat.com/add/${clean}`;
    case "bluesky":
      return handle.startsWith("http") ? handle : `https://bsky.app/profile/${clean}`;
    case "twitch":
      return `https://www.twitch.tv/${clean}`;
    case "patreon":
      return handle.startsWith("http") ? handle : `https://www.patreon.com/${clean}`;
    default:
      return handle.startsWith("http") ? handle : null;
  }
}
