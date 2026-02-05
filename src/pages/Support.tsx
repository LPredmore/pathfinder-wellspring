import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO, DonateActionSchema, VideoObjectSchema, BreadcrumbSchema } from "@/components/SEO";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEO
        title="Support Veterans Mental Health"
        description="Help bring back free mental health care for veterans. Over 120 veterans served through our bridge program. Your donation makes a direct impact."
        canonical="/support"
      />
      <DonateActionSchema />
      <VideoObjectSchema
        name="ValorWell Story"
        description="Learn how ValorWell provided free mental health care to over 120 veterans and why we need your support to continue."
        embedUrl="https://www.youtube.com/embed/yY_Ybhg3URg"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Support", url: "/support" }
      ]} />
      <section className="hero-gradient section-padding text-center">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            We Did Something. Now We Need You.
          </h1>
          
          {/* YouTube Shorts Embed - 9:16 aspect ratio */}
          <div className="mx-auto max-w-xs w-full mt-8">
            <iframe
              className="w-full aspect-[9/16] rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/yY_Ybhg3URg"
              title="ValorWell Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* The Story - Emotional Narrative */}
      <section className="section-alt section-padding">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="text-lg leading-relaxed">
              For years, veterans have been told to wait. Months-long backlogs at the VA. 
              Community care referrals that go nowhere. We built a bridge program to help 
              them start healing <em>now</em>—not in six months, not after another crisis.
            </p>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg my-8">
              <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Over 120 veterans
              </p>
              <p className="text-muted-foreground">
                received months of treatment through this program—completely free. 
                We funded it ourselves, out of our own pockets, because we believed 
                someone had to do something.
              </p>
            </div>
            
            <p className="text-lg leading-relaxed">
              We had to stop. Not because it didn't work. Not because veterans stopped 
              needing help. We stopped because we ran out of runway. We couldn't keep 
              funding it alone.
            </p>
            
            <p className="text-lg leading-relaxed text-muted-foreground italic">
              For years, we've heard people say they wish someone would do something. 
              That there should be a solution. We did. We built it. And then the real 
              problem showed up: <strong className="text-foreground not-italic">it's not that solutions don't exist—it's 
              that they don't get supported.</strong>
            </p>
            
            <p className="text-lg leading-relaxed">
              We still believe in this. We believe the right people are out there—people 
              who don't just wish things were different, but who act. If that's you, 
              we need your help to bring this program back.
            </p>
          </div>
        </div>
      </section>

      {/* Clarification Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="bg-cream-50 border border-border/50 rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-navy mb-4">
              ValorWell Is Still Here
            </h3>
            <p className="text-lg leading-relaxed text-foreground mb-4">
              Our mission continues. ValorWell still provides high-quality mental health care 
              to military families covered through CHAMPVA and other VA family programs. That 
              work hasn't stopped.
            </p>
            <p className="text-muted-foreground">
              What we can't continue—without support—is our bridge program: the initiative 
              that helped veterans who fell through the cracks, who couldn't get into the VA 
              system, who had no other options. <strong className="text-foreground">That's what 
              your donation brings back.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Donation CTA Block */}
      <section className="bg-navy section-padding text-center">
        <div className="container-narrow">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Be the Difference
          </h2>
          
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Every dollar goes directly toward providing free mental health care 
            to veterans who can't wait.
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-patriot-red hover:bg-patriot-red/90 text-white text-lg px-8 py-6"
          >
            <a 
              href="/donate"
              className="inline-flex items-center gap-2"
            >
              Donate Now
            </a>
          </Button>
        </div>
      </section>

      {/* Closing Note */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <p className="text-muted-foreground italic">
            Thank you for reading this far. It means more than you know.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
