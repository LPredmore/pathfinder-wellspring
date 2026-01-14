import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt";
}

export function ContentSection({
  title,
  children,
  className,
  variant = "default",
}: ContentSectionProps) {
  return (
    <section
      className={cn(
        "section-padding",
        variant === "alt" && "section-alt",
        className
      )}
    >
      <div className="container-wide">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          {title}
        </h2>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          {children}
        </div>
      </div>
    </section>
  );
}
