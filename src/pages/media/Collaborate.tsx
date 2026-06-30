import { useState, FormEvent } from "react";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const audiences = [
  { name: "Veterans", body: "Share your experience with care access, family strain, transition, disability-system challenges, or what support should look like." },
  { name: "Family Members", body: "Talk about the impact of military life, trauma, parenting, marriage, caregiving, or navigating systems with someone you love." },
  { name: "Providers", body: "Discuss mental health care, documentation, ethics, access barriers, telehealth, family systems, or what clinicians see behind the scenes." },
  { name: "Advocates and Organizations", body: "Help explain what is broken, what is working, and what needs to be built." },
  { name: "Creators", body: "Collaborate on content that reaches people who may never search for veteran mental health care but still need to understand the mission." },
  { name: "Sponsors and Community Partners", body: "Help fund care, tools, education, or public awareness around veteran and family support." },
];

const formats = [
  "Podcast guest",
  "YouTube conversation",
  "Short-form collaboration",
  "Expert interview",
  "Story submission",
  "Provider discussion",
  "Sponsor conversation",
  "Nonprofit/community partnership",
  "Reddit/community AMA",
  "Educational series contributor",
];

const topics = [
  "Veteran mental health",
  "CHAMPVA",
  "VA Community Care",
  "PTSD and family systems",
  "Disability-system documentation",
  "Predatory veteran support companies",
  "Family communication",
  "Parenting systems",
  "Emotional regulation",
  "Cognitive Consistency",
  "Military spouse and family support",
  "Therapy access barriers",
];

const Collaborate = () => {
  const [submitted, setSubmitted] = useState(false);

  // NOTE: Phase 2 ships this as a mailto handoff. Future work: persist to Supabase + edge function notification.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Role / background: ${data.get("role") || ""}`,
      `Organization: ${data.get("organization") || ""}`,
      `Website / social: ${data.get("link") || ""}`,
      `Preferred collaboration type: ${data.get("format") || ""}`,
      `Topic: ${data.get("topic") || ""}`,
      `Summary: ${data.get("summary") || ""}`,
      `Comfortable on video: ${data.get("video") ? "Yes" : "No"}`,
      `Open to future opportunities: ${data.get("future") ? "Yes" : "No"}`,
      `Consent to contact: ${data.get("consent") ? "Yes" : "No"}`,
    ].join("\n");
    window.location.href = `mailto:info@valorwell.org?subject=${encodeURIComponent(
      "Collaborate with ValorWell — Application"
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Collaborate with ValorWell — Guests, Creators, Providers and Advocates"
        description="Apply to collaborate with ValorWell as a guest, creator, provider, advocate, sponsor, or community partner."
        canonical="/media/collaborate"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Media", url: "/media" },
          { name: "Collaborate", url: "/media/collaborate" },
        ]}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Collaborate</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-5">
            Help us tell the stories, ask the questions, and build the conversations that move this mission forward.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            ValorWell is looking for guests, collaborators, advocates, creators, providers, and organizations who care about veterans, families, mental health access, and better support systems.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href="#apply">Apply to Collaborate</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <a href="#apply">Share Your Story</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Want to Hear From */}
      <section className="py-12 md:py-16 section-alt">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Who we want to hear from</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {audiences.map((a) => (
              <Card key={a.name} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-3">{a.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{a.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Types + Topics */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-5">Collaboration types</h2>
              <ul className="space-y-2 text-muted-foreground">
                {formats.map((f) => <li key={f}>• {f}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy mb-5">Good-fit topics</h2>
              <ul className="space-y-2 text-muted-foreground">
                {topics.map((t) => <li key={t}>• {t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="py-12 md:py-16 section-alt">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Apply to collaborate</h2>
          <p className="text-muted-foreground mb-8">
            Tell us about you and what you'd like to talk about. We'll follow up by email.
          </p>

          {submitted ? (
            <Card className="border-border/60">
              <CardContent className="p-7">
                <h3 className="text-xl font-bold text-navy mb-2">Thanks — your email client should be open.</h3>
                <p className="text-muted-foreground">
                  If nothing opened, email us directly at{" "}
                  <a href="mailto:info@valorwell.org" className="text-navy underline">info@valorwell.org</a>.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/60">
              <CardContent className="p-7">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role / background</Label>
                      <Input id="role" name="role" placeholder="Veteran, spouse, clinician, creator…" />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization (optional)</Label>
                      <Input id="organization" name="organization" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="link">Website or social link</Label>
                    <Input id="link" name="link" placeholder="https://" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="format">Preferred collaboration type</Label>
                      <Input id="format" name="format" placeholder="Podcast guest, story submission, partnership…" />
                    </div>
                    <div>
                      <Label htmlFor="topic">Topic you want to discuss</Label>
                      <Input id="topic" name="topic" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="summary">Short summary of your story or idea</Label>
                    <Textarea id="summary" name="summary" rows={5} required />
                  </div>
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox name="video" value="yes" />
                      <span className="text-sm text-foreground">I'm comfortable appearing on video.</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox name="future" value="yes" />
                      <span className="text-sm text-foreground">Open to being contacted for future opportunities.</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox name="consent" value="yes" required />
                      <span className="text-sm text-foreground">I consent to ValorWell contacting me about this submission.</span>
                    </label>
                  </div>
                  <Button type="submit" size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                    Submit Application
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Submitting opens an email draft to <a href="mailto:info@valorwell.org" className="underline">info@valorwell.org</a> with your responses.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 md:py-20 bg-navy text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the mission through conversation.</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href="#apply">Apply to Collaborate</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <a href="#apply">Share Your Story</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
              <Link to="/fund-access-to-care">Support the Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Collaborate;
