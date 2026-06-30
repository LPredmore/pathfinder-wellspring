import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { CRISIS_NOTE } from "@/components/authority/AuthorityPage";

const routes = [
  { title: "Need Care", body: "Start here if you are a veteran, family member, or caregiver looking for support.", cta: "Get Care", to: "/get-care" },
  { title: "Support the Mission", body: "Support the mission through Beyond the Yellow donations, sponsorship, or partnership.", cta: "Go Beyond the Yellow", to: "/beyondtheyellow" },
  { title: "Partner With Us", body: "Connect with ValorWell as an organization, provider, veteran group, sponsor, or creator.", cta: "Partner With ValorWell", to: "/partners" },
  { title: "Partnerships and Media", body: "Partner on education, sponsorships, organizational support, or mission-aligned media.", cta: "Partner With Us", to: "/partners" },
  { title: "General Contact", body: "Use this for general questions or non-urgent messages.", cta: "Send a Message", to: "#general-form" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Array.from(fd.entries()).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:info@valorwell.org?subject=${encodeURIComponent("ValorWell Contact")}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Contact ValorWell | Care, Partnerships, Sponsorships and Support"
        description="Contact ValorWell for care inquiries, partnerships, sponsorships, partnerships, sponsorships, media collaboration, or general mission questions."
        canonical="/contact"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />

      <section className="py-12 md:py-16 bg-background">
        <div className="container-narrow">
          <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Contact ValorWell.</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Whether you need care, want to support the mission, want to support the mission, want to partner, or have a media idea, start here.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/40">
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((r) => (
              <Card key={r.title} className="border-border/60 flex flex-col">
                <CardContent className="p-5 flex flex-col flex-1">
                  <h2 className="font-semibold text-navy mb-2">{r.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{r.body}</p>
                  <Button asChild className="bg-patriot-red hover:bg-patriot-red-dark text-white">
                    {r.to.startsWith("#") ? <a href={r.to}>{r.cta}</a> : <Link to={r.to}>{r.cta}</Link>}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="general-form" className="py-10 md:py-14 bg-background">
        <div className="container-narrow max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">General contact form</h2>
          {submitted ? (
            <Card><CardContent className="p-6"><p className="text-foreground/80">Thanks. Your email client should be opening. If it didn't, email <a className="underline" href="mailto:info@valorwell.org">info@valorwell.org</a>.</p></CardContent></Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
                <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="reason">Reason for contact</Label><Input id="reason" name="reason" required /></div>
              <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={5} required /></div>
              <label className="flex gap-2 items-start text-sm text-muted-foreground">
                <input type="checkbox" name="consent" required className="mt-1" />
                <span>I consent to be contacted by ValorWell about this message.</span>
              </label>
              <p className="text-sm text-muted-foreground">Do not use this form for emergencies or crisis situations.</p>
              <Button type="submit" size="lg" className="bg-patriot-red hover:bg-patriot-red-dark text-white">Send Message</Button>
            </form>
          )}

          <div className="mt-8 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Email</div>
              <a className="text-muted-foreground hover:text-foreground" href="mailto:info@valorwell.org">info@valorwell.org</a>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">{CRISIS_NOTE}</p>
        </div>
      </section>
    </Layout>
  );
}
