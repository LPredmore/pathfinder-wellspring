import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";
import heroFamily from "@/assets/hero-family.jpg";
import womenBanner from "@/assets/valorwell_women_banner_3x1.png";
import flagSkyBackground from "@/assets/flag-sky-background.png";
import iconTherapy from "@/assets/icon-therapy.png";
import iconSupportSessions from "@/assets/icon-support-sessions.png";

import iconVeteranFocused from "@/assets/icon-veteran-focused.png";
import iconChampva from "@/assets/icon-champva.png";
import iconConvenientAccess from "@/assets/icon-convenient-access.png";

const services = [
  {
    title: "Therapy",
    description: "Professional, licensed counseling covered by CHAMPVA.",
    icon: iconTherapy,
    href: "/therapy",
  },
  {
    title: "Support Sessions",
    description: "Guidance and skills-based coaching for everyday challenges.",
    icon: iconSupportSessions,
    href: "/support-sessions",
  },
];

const whyValorwell = [
  {
    title: "Veteran-Focused",
    description: "Care designed for veterans & families.",
    icon: iconVeteranFocused,
  },
  {
    title: "CHAMPVA Accepted",
    description: "No-cost therapy for eligible members.",
    icon: iconChampva,
  },
  {
    title: "Convenient Access",
    description: "Online, secure, and confidential.",
    icon: iconConvenientAccess,
  },
];

const steps = [
  {
    number: 1,
    title: "Get Started",
    description: "Fill out our brief intake form.",
  },
  {
    number: 2,
    title: "Get Matched",
    description: "We'll pair you with the right specialist.",
  },
  {
    number: 3,
    title: "Begin Your Journey",
    description: "Start your sessions and move toward your goals.",
  },
];

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-10">
    <div className="flex items-center justify-center gap-3 mb-2">
      <span className="text-patriot-red">★</span>
      <h2 className="text-3xl md:text-4xl font-bold text-navy">{children}</h2>
      <span className="text-patriot-red">★</span>
    </div>
    {subtitle && (
      <p className="text-lg italic text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Full-Width Background */}
      <section className="relative">
        {/* Outer wrapper with blank sides */}
        <div className="flex justify-center bg-background">
          {/* Content-width container with background image */}
          <div 
            className="w-full max-w-[1280px] min-h-[70vh] bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${heroFamily})` }}
          >
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            
            {/* Hero content */}
            <div className="relative z-10 px-6 md:px-12 py-16 lg:py-24 flex items-center min-h-[70vh]">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-4">
                  Your Path to<br />
                  <span className="italic">Support & Healing</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  Dedicated to veterans, service members, and their families.
                </p>
                <Link
                  to="/get-started"
                  className="inline-flex items-center justify-center rounded-lg bg-patriot-red px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-patriot-red-dark transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of Page with Flag/Sky Background */}
      <div className="flex justify-center bg-background">
        <div 
          className="w-full max-w-[1280px] bg-cover bg-top bg-no-repeat relative"
          style={{ backgroundImage: `url(${flagSkyBackground})` }}
        >
          {/* Subdued overlay to fade the background */}
          <div className="absolute inset-0 bg-white/70" />
          {/* Services Section */}
          <section className="relative z-10 -mt-40">
            <div className="px-6 md:px-12">
              <div className="bg-white rounded-2xl shadow-xl border border-border/50 py-6 px-8">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      to={service.href}
                      className="flex flex-col items-center text-center py-4 md:py-2 px-4 group hover:opacity-80 transition-opacity"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={service.icon} 
                          alt={`${service.title} icon`}
                          className="h-10 w-auto"
                        />
                        <h3 className="text-xl font-bold text-navy">{service.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why ValorWell Section */}
          <section className="py-16 relative overflow-hidden">
            <div className="px-6 md:px-12 relative z-10">
              <SectionTitle subtitle="Experienced care from professionals who understand military life.">
                Why ValorWell?
              </SectionTitle>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {whyValorwell.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-4">
                      <img 
                        src={item.icon} 
                        alt={`${item.title} icon`}
                        className="h-40 w-auto"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="pt-8 pb-16 relative overflow-hidden">
            <div className="px-6 md:px-12">
              <SectionTitle subtitle="Simple steps to get the help you need.">
                How It Works
              </SectionTitle>
            </div>

            {/* Full-width banner with steps overlay */}
            <div className="relative mt-6">
              <img
                src={womenBanner}
                alt="Veterans in supportive environment"
                className="w-full h-auto"
              />
              
              {/* Steps overlay on the left side */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <div className="bg-white/85 backdrop-blur-sm py-8 px-6 md:px-12 space-y-6">
                  {steps.map((step) => (
                    <div key={step.number} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-patriot-red text-white flex items-center justify-center text-lg md:text-xl font-bold shadow-lg">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-navy mb-1">{step.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 bg-navy/90 relative overflow-hidden">
            <div className="px-6 md:px-12 relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-16 bg-white/30" />
                <span className="text-patriot-red text-2xl">★</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Get the Support You Deserve
                </h2>
                <span className="text-patriot-red text-2xl">★</span>
                <div className="h-px w-16 bg-white/30" />
              </div>
              
              <p className="text-lg text-white/80 mb-8 italic">
                We're here to listen and help.
              </p>
              
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center rounded-lg bg-patriot-red px-10 py-4 text-xl font-semibold text-white shadow-lg hover:bg-patriot-red-dark transition-colors border-2 border-white/20"
              >
                Get Started Today
              </Link>
            </div>
            
            {/* Star decoration bottom */}
            <div className="flex justify-center gap-2 mt-12">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold-accent text-2xl">★</span>
              ))}
            </div>
          </section>

          {/* Safety note */}
          <section className="py-8 bg-white/90">
            <div className="px-6 md:px-12">
              <p className="text-center text-sm text-muted-foreground">
                If you're in immediate danger or experiencing an emergency, call 911.{" "}
                <Link to="/urgent-help" className="underline underline-offset-2 hover:text-navy">
                  Urgent help resources
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Index;