import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema, FAQSchema } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface AuthoritySection {
  heading: string;
  body?: ReactNode;
  cards?: { title: string; body?: string }[];
  bullets?: string[];
  columns?: { title: string; bullets: string[] }[];
}

export interface AuthorityCTA {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
}

export interface AuthorityPageProps {
  title: string;
  description: string;
  canonical: string;
  breadcrumbs: { name: string; url: string }[];
  eyebrow?: string;
  h1: string;
  subhead: string;
  heroCTAs?: AuthorityCTA[];
  sections: AuthoritySection[];
  faqs?: { question: string; answer: string }[];
  related?: { name: string; href: string; body?: string }[];
  finalCTAs?: AuthorityCTA[];
  finalNote?: ReactNode;
}

function CTAButton({ cta }: { cta: AuthorityCTA }) {
  const primary = cta.variant !== "secondary";
  return (
    <Button
      asChild
      size="lg"
      className={
        primary
          ? "bg-patriot-red hover:bg-patriot-red-dark text-white"
          : "bg-transparent border border-navy text-navy hover:bg-navy hover:text-white"
      }
      variant={primary ? "default" : "outline"}
    >
      <Link to={cta.to}>{cta.label}</Link>
    </Button>
  );
}

export function AuthorityPage(p: AuthorityPageProps) {
  return (
    <Layout>
      <SEO title={p.title} description={p.description} canonical={p.canonical} />
      <BreadcrumbSchema items={p.breadcrumbs} />
      {p.faqs && p.faqs.length > 0 && <FAQSchema faqs={p.faqs} />}

      {/* Hero */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          {p.eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">
              {p.eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">{p.h1}</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            {p.subhead}
          </p>
          {p.heroCTAs && p.heroCTAs.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {p.heroCTAs.map((c) => (
                <CTAButton key={c.label} cta={c} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sections */}
      {p.sections.map((s, i) => (
        <section
          key={i}
          className={`py-10 md:py-14 ${i % 2 === 0 ? "bg-muted/40" : "bg-background"}`}
        >
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">{s.heading}</h2>
            {s.body && (
              <div className="text-base md:text-lg text-foreground/80 leading-relaxed space-y-4 max-w-3xl">
                {typeof s.body === "string" ? <p>{s.body}</p> : s.body}
              </div>
            )}
            {s.bullets && (
              <ul className="list-disc pl-5 space-y-2 text-foreground/80 max-w-3xl mt-4">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {s.cards && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {s.cards.map((c) => (
                  <Card key={c.title} className="border-border/60">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-navy mb-1.5">{c.title}</h3>
                      {c.body && <p className="text-sm text-muted-foreground">{c.body}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {s.columns && (
              <div className="grid md:grid-cols-2 gap-5 mt-6">
                {s.columns.map((col) => (
                  <Card key={col.title} className="border-border/60">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-navy mb-3">{col.title}</h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground/80">
                        {col.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* FAQs */}
      {p.faqs && p.faqs.length > 0 && (
        <section className="py-10 md:py-14 bg-background">
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Frequently asked questions</h2>
            <div className="space-y-5 max-w-3xl">
              {p.faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="font-semibold text-navy mb-1.5">{f.question}</h3>
                  <p className="text-foreground/80 whitespace-pre-line">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {p.related && p.related.length > 0 && (
        <section className="py-10 md:py-14 bg-muted/40">
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Related</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {p.related.map((r) => (
                <Link
                  key={r.href}
                  to={r.href}
                  className="block rounded-lg border border-border/60 bg-background p-5 hover:border-navy transition-colors"
                >
                  <div className="font-semibold text-navy mb-1">{r.name}</div>
                  {r.body && <p className="text-sm text-muted-foreground">{r.body}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      {(p.finalCTAs || p.finalNote) && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container-narrow">
            {p.finalCTAs && (
              <div className="flex flex-wrap gap-3 mb-4">
                {p.finalCTAs.map((c) => (
                  <CTAButton key={c.label} cta={c} />
                ))}
              </div>
            )}
            {p.finalNote && (
              <div className="text-sm text-muted-foreground max-w-3xl">{p.finalNote}</div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}

export const CRISIS_NOTE =
  "If you are in immediate danger or crisis, call 911, go to the nearest emergency room, or contact the Veterans Crisis Line by dialing 988 then pressing 1.";
