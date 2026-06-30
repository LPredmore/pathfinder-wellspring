import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { CRISIS_NOTE } from "@/components/authority/AuthorityPage";

const whoCanRefer = [
  "Veteran organizations", "Clinicians", "Case managers", "Social workers",
  "Churches", "Schools", "Community organizations", "Employers",
  "Family members", "Caregivers",
];

const fit = [
  "Veterans seeking mental health support",
  "CHAMPVA-connected families",
  "Families navigating stress, trauma, conflict, or transition",
  "People struggling to find providers",
  "Veterans needing ethical clinical documentation as part of real care",
  "Families needing practical systems and tools",
];

const expectations = [
  "Referral does not guarantee availability",
  "Eligibility and coverage vary",
  "ValorWell will review fit and next steps",
  "Crisis situations should use emergency/crisis resources",
  "Documentation is not sold separately or guaranteed",
];

export default function ReferralPartners() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Array.from(fd.entries()).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:info@valorwell.org?subject=${encodeURIComponent("Referral")}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Referral Partners | Refer Veterans and Families to ValorWell"
        description="Referral partners can help veterans and military-connected families connect with mental health care, family support, and ethical documentation-aware services."
        canonical="/referral-partners"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Referral Partners", url: "/referral-partners" }]} />

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Referral Partners</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            Refer veterans and families to a mission-driven support path.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
            ValorWell supports veterans and military-connected families seeking mental health care, practical tools, and ethical documentation-aware support.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <a href="#refer-form">Refer Someone</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/contact">Contact ValorWell</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Who can refer</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {whoCanRefer.map((w) => (
              <Card key={w} className="border-border/60"><CardContent className="p-4 text-sm text-navy font-medium">{w}</CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Who may be a fit</h2>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80 max-w-3xl">{fit.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Referral expectations</h2>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80 max-w-3xl">{expectations.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
      </section>

      <section id="refer-form" className="py-10 md:py-14 bg-background">
        <div className="container-narrow max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">Referral form</h2>
          {submitted ? (
            <Card><CardContent className="p-6"><p className="text-foreground/80">Thanks. Your email client should be opening to send the referral. If it didn't, email <a className="underline" href="mailto:info@valorwell.org">info@valorwell.org</a>.</p></CardContent></Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="ref_name">Referrer name</Label><Input id="ref_name" name="referrer_name" required /></div>
                <div className="space-y-2"><Label htmlFor="ref_org">Referrer organization</Label><Input id="ref_org" name="referrer_organization" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="ref_email">Referrer email</Label><Input id="ref_email" name="referrer_email" type="email" required /></div>
                <div className="space-y-2"><Label htmlFor="ref_phone">Referrer phone (optional)</Label><Input id="ref_phone" name="referrer_phone" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="person">Person being referred (if appropriate)</Label><Input id="person" name="person_referred" /></div>
                <div className="space-y-2"><Label htmlFor="rel">Relationship to person</Label><Input id="rel" name="relationship" /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="reason">Reason for referral</Label><Textarea id="reason" name="reason" rows={3} /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="urgency">Urgency level</Label><Input id="urgency" name="urgency" placeholder="Low / Medium / High (not crisis)" /></div>
                <div className="space-y-2"><Label htmlFor="followup">Best way to follow up</Label><Input id="followup" name="followup" /></div>
              </div>
              <label className="flex gap-2 items-start text-sm text-muted-foreground">
                <input type="checkbox" name="consent" required className="mt-1" />
                <span>I confirm I have appropriate permission to share this information.</span>
              </label>
              <p className="text-sm text-muted-foreground">Do not submit confidential information unless you have appropriate permission.</p>
              <Button type="submit" size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">Submit Referral</Button>
            </form>
          )}
          <p className="text-sm text-muted-foreground mt-6">{CRISIS_NOTE}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Button asChild variant="outline"><Link to="/contact">Contact ValorWell</Link></Button>
            <Button asChild variant="outline"><Link to="/get-care">Get Care</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
