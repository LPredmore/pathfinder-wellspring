import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepsSectionProps {
  title?: string;
  subtitle?: string;
  steps: Step[];
  className?: string;
}

export function StepsSection({
  title = "How It Works",
  subtitle,
  steps,
  className,
}: StepsSectionProps) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
