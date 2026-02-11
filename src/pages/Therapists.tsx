import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { CTABlock, StepsSection, FAQSection } from "@/components/sections";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ClickToLoadYouTubeShort } from "@/components/ClickToLoadYouTubeShort";
import {
  DollarSign,
  FileX,
  CalendarClock,
  ShieldCheck,
  ClipboardCheck,
  LifeBuoy,
  Lock,
  Rocket,
  CheckCircle,
} from "lucide-react";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";
import { TherapistApplicationForm } from "@/components/forms/TherapistApplicationForm";
import { SEO, JobPostingSchema, BreadcrumbSchema } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

function extractYouTubeId(url: string): string | null {
  // /shorts/ID
  let match = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // watch?v=ID
  match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // youtu.be/ID
  match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  return null;
}

const clinicianBenefits = [
  {
    title: "Paid Weekly",
    description: "Paid weekly—predictable payout timing. No waiting on claims cycles.",
    icon: DollarSign,
  },
  {
    title: "No Billing Hassle",
    description: "No billing, no collections, and no insurance phone tag. You focus on care—we handle claims, documentation routing, and payment workflows.",
    icon: FileX,
  },
  {
    title: "Schedule Autonomy",
    description: "Set your availability. Telehealth-first. Build a caseload that fits your life.",
    icon: CalendarClock,
  },
  {
    title: "Clinical Autonomy & Respect",
    description: "Your license matters. We support high-quality care and ethical standards—without second-guessing your clinical judgment.",
    icon: ShieldCheck,
  },
  {
    title: "Documentation That Respects Your Time",
    description: "Streamlined notes, templates designed with clinicians, and tools that speed up routine admin—so documentation doesn't ruin your evenings.",
    icon: ClipboardCheck,
  },
  {
    title: "Support for Complex Cases",
    description: "Fast consult pathways, escalation support, and clear crisis protocols—so you're not alone when cases get complex.",
    icon: LifeBuoy,
  },
  {
    title: "Clear Boundaries",
    description: "We don't push you to practice outside your scope or comfort. You choose what types of clients you want, without question.",
    icon: Lock,
  },
  {
    title: "Fast, Clear Onboarding",
    description: "Simple onboarding, clear steps, and a real point of contact.",
    icon: Rocket,
  },
];

const howItWorksSteps = [
  { number: 1, title: "Apply (2–4 minutes)", description: "Complete a short application so we can learn about your background and interests." },
  { number: 2, title: "Quick review and follow-up", description: "Our team reviews your application and reaches out with next steps." },
  { number: 3, title: "Onboarding + system access", description: "Get set up with our platform, documentation tools, and support resources." },
  { number: 4, title: "Start seeing clients as availability matches", description: "Begin working with veterans and military families on your schedule." },
];

const faqItems = [
  { question: "Is this fully remote?", answer: "Yes—telehealth-first." },
  { question: "Do I have to handle insurance billing?", answer: "No. We handle billing workflows so you can focus on care." },
  { question: "How do I get started?", answer: "Click Apply and complete the application. We'll follow up with next steps." },
];

const whoThisIsFor = [
  "Telehealth clinicians who want meaningful work with veterans and military families",
  "Clinicians who value autonomy, professionalism, and clear boundaries",
  "Clinicians who want predictable pay and less admin friction",
  "Clinicians who want strong systems for documentation and escalation support",
];

const Therapists = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const { data: videoUrl, isLoading: isVideoLoading } = useQuery({
    queryKey: ["site_config", "therapists_video_url"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_config" as any)
        .select("value")
        .eq("key", "therapists_video_url")
        .single();
      if (error) throw error;
      return (data as any)?.value as string;
    },
  });

  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;

  return (
    <Layout>
      <SEO
        title="Join Our Team - Therapist Careers"
        description="Telehealth therapist jobs serving veterans. LCSW, LPC, LMFT, Psychologist positions. CHAMPVA billing handled, flexible contractor role. Apply now."
        canonical="/therapists"
      />
      <JobPostingSchema />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Join Our Team", url: "/therapists" }
      ]} />

      {/* Full-page flag background */}
      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        <div className="absolute inset-0 bg-white/70" />

        {/* Hero Section */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Work With Veterans. Do the Clinical Work You Trained For.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Paid weekly. No billing hassle. Telehealth-first. Real clinical autonomy.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setIsApplyModalOpen(true)}>
                  Apply to Work With ValorWell
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("video-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Watch: Working as a Clinician at ValorWell
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section — KEPT EXACTLY */}
        <section className="relative z-10 pt-4 pb-8 md:pt-6 md:pb-10">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Your Clinical Skills Deserve a Bigger Mission
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                You became a clinician to make a difference. But finding meaningful work with veterans and military families—work that's supported by real infrastructure—isn't easy.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 pt-4 pb-8 md:pt-6 md:pb-10">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Veterans Deserve Clinicians Who Get It
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Too many veterans fall through the cracks—not because clinicians don't care, but because the systems meant to serve them are fragmented, underfunded, or simply don't exist. You've felt the pull to help this population. We've built the bridge.
              </p>
            </div>
          </div>
        </section>

        {/* Clinician Benefits Grid */}
        <section className="relative z-10 pt-4 pb-12 md:pt-6 md:pb-16">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What Clinicians Get at ValorWell
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {clinicianBenefits.map((item) => (
                <Card key={item.title} className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Video Section */}
      <section id="video-section" className="section-padding bg-muted">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              A Quick Message From Luke
            </h2>
          </div>
          {isVideoLoading ? (
            <div className="max-w-sm mx-auto min-h-[200px] rounded-lg" style={{ aspectRatio: "9 / 16" }}>
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          ) : videoId ? (
            <ClickToLoadYouTubeShort
              videoId={videoId}
              title="A Quick Message From Luke"
            />
          ) : null}
          <p className="mt-6 text-center text-muted-foreground max-w-2xl mx-auto italic">
            "If you've wanted to serve veterans without sacrificing your time, sanity, or clinical judgment—this is what we built ValorWell for."
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Who This Is For
            </h2>
            <ul className="space-y-4">
              {whoThisIsFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <StepsSection
        title="How It Works"
        steps={howItWorksSteps}
        className="bg-muted"
      />
      <div className="bg-muted pb-12 text-center">
        <Button size="lg" onClick={() => setIsApplyModalOpen(true)}>
          Apply to Work With ValorWell
        </Button>
      </div>

      {/* FAQ */}
      <FAQSection title="FAQ" items={faqItems} />

      {/* Footer CTA */}
      <CTABlock
        title="Looking for Care Instead?"
        subtitle="If you're a veteran or military family member seeking support, we're here for you."
        variant="muted"
      />

      {/* Application Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply to Work With ValorWell</DialogTitle>
            <DialogDescription>
              Complete the application below and we'll follow up with next steps.
            </DialogDescription>
          </DialogHeader>
          <TherapistApplicationForm />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Therapists;
