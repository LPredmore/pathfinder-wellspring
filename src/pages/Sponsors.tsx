import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const opportunities = [
  { title: "Care Access Sponsor", body: "Help support direct session costs and access-building work." },
  { title: "Media Sponsor", body: "Support educational videos, podcasts, shorts, and mission-driven conversations." },
  { title: "BestSelfs Tools Sponsor", body: "Help expand practical emotional skills, family communication, and growth tools." },
  { title: "Community Campaign Sponsor", body: "Support specific awareness or fundraising campaigns." },
  { title: "Monthly Mission Sponsor", body: "Provide recurring support that helps make the mission sustainable." },
];

const levels = [
  { amount: "$75", body: "Helps cover the direct therapist cost of one session." },
  { amount: "$300", body: "Helps support the direct therapist cost of weekly care for one client for about one month." },
  { amount: "$750", body: "Helps support direct session costs, tools, education, and access-building work." },
  { amount: "$1,500", body: "Helps support a larger block of care access and mission operations." },
  { amount: "$5,000+", body: "Strategic sponsorship for care access, media, tools, or community campaigns." },
];

const recognition = [
  "Website recognition",
  "Campaign recognition",
  "Thank-you post",
  "Sponsor mention in selected media",
  "Quarterly impact update",
  "Co-branded campaign, if appropriate",
  "Private sponsor briefing",
];

export default function Sponsors() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Array.from(fd.entries())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const url = `mailto:info@valorwell.org?subject=${encodeURIComponent(
      "Sponsorship Inquiry"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Sponsor ValorWell | Help Fund Veteran and Family Mental Health Support"
        description="Sponsor ValorWell's mission to expand access to care, family tools, education, media, and practical support for veterans and families."
        canonical="/sponsors"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Sponsors", url: "/sponsors" }]} />

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Sponsorship</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            Sponsor a mission that helps veterans and families get support before they are left waiting too long.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
            ValorWell sponsorship helps expand access to care, education, family tools, media, and practical support systems for veterans and military-connected families.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href="#sponsor-form">Become a Sponsor</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/sponsor-care">Sponsor Care</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Why sponsorship matters</h2>
          <p className="text-foreground/80 max-w-3xl">
            Sponsorship helps ValorWell build a sustainable system around care access instead of relying only on one-time donations or emergency fundraising. Sponsors help us expand the mission, reach more families, and fund practical support.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Sponsorship opportunities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((o) => (
              <Card key={o.title} className="border-border/60">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-navy mb-1.5">{o.title}</h3>
                  <p className="text-sm text-muted-foreground">{o.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Suggested sponsorship levels</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {levels.map((l) => (
              <Card key={l.amount} className="border-border/60">
                <CardContent className="p-5">
                  <div className="text-2xl font-bold text-patriot-red mb-1.5">{l.amount}</div>
                  <p className="text-sm text-muted-foreground">{l.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-3xl">
            These examples are meant to help sponsors understand the mission. Exact allocation may vary based on current needs, operations, and program availability.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Sponsor recognition</h2>
          <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-5 text-foreground/80 max-w-3xl">
            {recognition.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4 max-w-3xl">
            Recognition options depend on sponsorship level, campaign fit, and compliance considerations.
          </p>
        </div>
      </section>

      <section id="sponsor-form" className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Start a sponsorship conversation</h2>
          {submitted ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-foreground/80">
                  Thanks. Your email client should be opening to send your sponsorship inquiry to info@valorwell.org. If it didn't, email us directly at <a className="underline" href="mailto:info@valorwell.org">info@valorwell.org</a>.
                </p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
                <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="organization">Organization</Label><Input id="organization" name="organization" /></div>
                <div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" name="website" /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="interest">Sponsorship interest</Label><Input id="interest" name="interest" placeholder="Care, media, BestSelfs, campaign, monthly..." /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="range">Estimated sponsorship range</Label><Input id="range" name="range" /></div>
                <div className="space-y-2"><Label htmlFor="cadence">One-time or recurring</Label><Input id="cadence" name="cadence" /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="notes">Notes</Label><Textarea id="notes" name="notes" rows={4} /></div>
              <label className="flex gap-2 items-start text-sm text-muted-foreground">
                <input type="checkbox" name="consent" required className="mt-1" />
                <span>I consent to be contacted by ValorWell about this inquiry.</span>
              </label>
              <Button type="submit" size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">Start a Sponsorship Conversation</Button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
