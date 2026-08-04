import { useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackDonationCheckoutStartAndRedirect } from "@/lib/tracking";

type Variant = "solid" | "outline" | "link";
type Size = "sm" | "md" | "lg";

interface DonateButtonProps {
  /** Stable identifier for the CTA placement. */
  source: string;
  variant?: Variant;
  size?: Size;
  children?: React.ReactNode;
  className?: string;
  withIcon?: boolean;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

/**
 * Single source of truth for donation CTAs.
 *
 * Internal CTA metadata uses vw_* parameters so it never overwrites the ad or
 * referral UTMs captured when the visitor first arrived. Site-wide CTAs route
 * through /partner; only the final click from /partner records checkout intent.
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
  utmContent,
}: DonateButtonProps) {
  const location = useLocation();
  const [handoffId] = useState(() => crypto.randomUUID());
  const isPartnerPage = location.pathname === "/partner";
  const currentParams = new URLSearchParams(location.search);
  const params = new URLSearchParams();

  if (isPartnerPage) {
    for (const key of [
      "vw_entry_source",
      "vw_entry_medium",
      "vw_entry_campaign",
      "vw_entry_content",
    ]) {
      const value = currentParams.get(key);
      if (value) params.set(key, value);
    }
    params.set("vw_checkout_source", source);
    params.set("vw_checkout_medium", utmMedium);
    params.set("vw_checkout_campaign", utmCampaign);
    if (utmContent) params.set("vw_checkout_content", utmContent);
    params.set("vw_handoff_id", handoffId);
  } else {
    params.set("vw_entry_source", source);
    params.set("vw_entry_medium", utmMedium);
    params.set("vw_entry_campaign", utmCampaign);
    if (utmContent) params.set("vw_entry_content", utmContent);
  }

  const destination = isPartnerPage ? "/donate" : "/partner";
  const href = `${destination}?${params.toString()}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPartnerPage || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    trackDonationCheckoutStartAndRedirect(href, handoffId, {
      source,
      campaign: utmCampaign,
      content: utmContent,
    });
  };

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
      onClick={handleClick}
    >
      {withIcon && <Heart className="h-4 w-4" aria-hidden />}
      {children}
    </Link>
  );
}
