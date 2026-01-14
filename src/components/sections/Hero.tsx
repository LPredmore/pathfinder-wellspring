import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  children?: ReactNode;
  className?: string;
  size?: "default" | "large";
}

export function Hero({
  title,
  subtitle,
  ctaText = "Get Started",
  ctaLink = "/get-started",
  children,
  className,
  size = "default",
}: HeroProps) {
  return (
    <section
      className={cn(
        "hero-gradient",
        size === "large" ? "py-20 md:py-32" : "py-16 md:py-24",
        className
      )}
    >
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1
            className={cn(
              "font-bold text-foreground",
              size === "large"
                ? "text-4xl md:text-5xl lg:text-6xl"
                : "text-3xl md:text-4xl lg:text-5xl"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {children}
          {ctaText && ctaLink && (
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
