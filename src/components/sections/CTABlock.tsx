import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CTABlockProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: "default" | "muted";
  className?: string;
}

export function CTABlock({
  title,
  subtitle,
  ctaText = "Get Started",
  ctaLink = "/get-started",
  variant = "default",
  className,
}: CTABlockProps) {
  return (
    <section
      className={cn(
        "section-padding",
        variant === "muted" ? "section-alt" : "bg-primary",
        className
      )}
    >
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold",
              variant === "muted" ? "text-foreground" : "text-primary-foreground"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "mt-4 text-lg",
                variant === "muted"
                  ? "text-muted-foreground"
                  : "text-primary-foreground/90"
              )}
            >
              {subtitle}
            </p>
          )}
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              variant={variant === "muted" ? "default" : "secondary"}
            >
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
