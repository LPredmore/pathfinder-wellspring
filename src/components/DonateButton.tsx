import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "link";
type Size = "sm" | "md" | "lg";

interface DonateButtonProps {
  /** Placement identifier — forwarded as utm_source so /donate can attribute conversions. */
  source: string;
  variant?: Variant;
  size?: Size;
  children?: React.ReactNode;
  className?: string;
  withIcon?: boolean;
  utmMedium?: string;
  utmCampaign?: string;
}

/**
 * Single source of truth for all Donate CTAs.
 * Routes to /donate, which redirects to Givebutter via the donate-go edge function
 * and forwards utm_* params for per-placement attribution.
 */
export function DonateButton({
  source,
  variant = "solid",
  size = "md",
  children = "Donate",
  className,
  withIcon = false,
  utmMedium = "site",
  utmCampaign = "ocs",
}: DonateButtonProps) {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
  });
  const href = `/donate?${params.toString()}`;

  const sizeCls =
    size === "sm"
      ? "px-3 py-1.5 text-xs"
      : size === "lg"
      ? "px-6 py-3.5 text-base"
      : "px-4 py-2 text-sm";

  const base =
    "inline-flex items-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap";

  const variantCls =
    variant === "outline"
      ? "border border-primary/40 text-primary bg-transparent hover:bg-primary hover:text-primary-foreground"
      : variant === "link"
      ? "text-primary hover:text-foreground underline-offset-4 hover:underline p-0"
      : "bg-accent text-accent-foreground shadow-sm hover:brightness-95";

  return (
    <Link
      to={href}
      data-donate-source={source}
      className={cn(base, variant !== "link" && sizeCls, variantCls, className)}
    >
      {withIcon && <Heart className="h-4 w-4" aria-hidden />}
      {children}
    </Link>
  );
}
