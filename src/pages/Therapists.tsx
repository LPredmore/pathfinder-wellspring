import { Layout } from "@/components/layout";
import { CTABlock } from "@/components/sections";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Video, Users } from "lucide-react";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

const differentiators = [
  {
    title: "Military-Centered Culture",
    description: "We don't just accept veterans—we're built around them. Our entire organization understands the weight of service.",
    icon: Shield,
  },
  {
    title: "CHAMPVA Infrastructure",
    description: "We've already done the hard work. Our billing, credentialing, and systems are built for military family coverage.",
    icon: Heart,
  },
  {
    title: "Telehealth-First",
    description: "Serve clients from anywhere. Our platform is designed for flexibility—yours and theirs.",
    icon: Video,
  },
  {
    title: "Community of Clinicians",
    description: "Join a team of like-minded professionals who share your commitment to this population.",
    icon: Users,
  },
];

const Therapists = () => {
  return (
    <Layout>
      {/* Full-page flag background */}
      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        {/* Subdued overlay */}
        <div className="absolute inset-0 bg-white/70" />

        {/* Hero Section */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Your Clinical Skills Deserve a Bigger Mission
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                You became a clinician to make a difference. But finding meaningful work with veterans and military families—work that's supported by real infrastructure—isn't easy.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
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

        {/* What Makes ValorWell Different */}
        <section className="relative z-10 pt-4 pb-8 md:pt-6 md:pb-10">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                What Makes ValorWell Different
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We're not a staffing agency. We're a mission-driven organization built from the ground up to serve those who served.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {differentiators.map((item) => (
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

        {/* Who We're Looking For */}
        <section className="relative z-10 pt-4 pb-8 md:pt-6 md:pb-10">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Who We're Looking For
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We're seeking licensed mental health clinicians—LCSWs, LPCs, LMFTs, and Psychologists—who share our commitment to veterans and military families. Experience with trauma-informed care is valued, but what matters most is your heart for this work.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section - Navy background */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Ready to Be Part of Something Bigger?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              If you're ready to bring your clinical expertise to a mission that matters, we'd love to hear from you.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                variant="secondary"
              >
                <a
                  href="https://forms.gle/FKYyVu4uPfQtL3to7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Our Team
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA for non-clinicians */}
      <CTABlock
        title="Looking for Care Instead?"
        subtitle="If you're a veteran or military family member seeking support, we're here for you."
        variant="muted"
      />
    </Layout>
  );
};

export default Therapists;
