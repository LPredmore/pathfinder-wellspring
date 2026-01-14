import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

interface TrustSectionProps {
  title?: string;
  testimonials: Testimonial[];
  className?: string;
}

export function TrustSection({
  title = "What Our Clients Say",
  testimonials,
  className,
}: TrustSectionProps) {
  return (
    <section className={cn("section-padding trust-bg", className)}>
      <div className="container-wide">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <blockquote className="text-foreground mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-sm">
                <p className="font-medium text-foreground">{testimonial.author}</p>
                {testimonial.role && (
                  <p className="text-muted-foreground">{testimonial.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
