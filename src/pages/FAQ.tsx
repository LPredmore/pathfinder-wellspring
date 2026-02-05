import { Layout } from "@/components/layout";
import { SEO, FAQSchema } from "@/components/SEO";
import { FAQSection, CTABlock } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

const faqItems = [
  // Getting started + fit
  {
    question: "Who is ValorWell for?",
    answer:
      "ValorWell serves veterans, service members, and military families (including spouses/partners). Our programs are built around military life—transitions, deployments, family stressors, and the pressure that comes with service—so the care feels relevant, respectful, and practical.",
  },
  {
    question: "How do I get started?",
    answer:
      "Click \"Get Started\" and complete a short intake. We'll use your responses to route you into the right service path (Therapy or Support Sessions) and outline clear next steps.",
  },
  {
    question: "What happens after I complete intake?",
    answer:
      "After intake, we confirm your requested service and basic eligibility details (including location/state when applicable), then provide the next step: scheduling or matching. You'll always have a clear path forward—even if your first choice isn't immediately available.",
  },
  {
    question: "Do I have to know which service I need before signing up?",
    answer:
      "No. Many people don't. The intake is designed to help clarify what support fits best right now. You can also switch paths later as your needs and goals change.",
  },

  // Therapy
  {
    question: "What therapy options do you offer?",
    answer:
      "Therapy at ValorWell is delivered by licensed clinicians via secure telehealth. Your therapist will work with you to set goals, develop a plan, and build skills that support progress over time.",
  },
  {
    question: "How does therapist matching work?",
    answer:
      "Matching is based on your goals, preferences, location/state requirements, and clinician availability. If your first match isn't the right fit, we'll help you explore alternatives.",
  },
  {
    question: "Is therapy available in every state?",
    answer:
      "Availability depends on licensed clinician coverage and capacity by state. You can complete intake anytime; we confirm state-specific availability after intake and then proceed with matching or next-step options.",
  },

  // Support Sessions
  {
    question: "What are Support Sessions?",
    answer:
      "Support Sessions are structured, one-on-one sessions with a trained Wellness Guide. They're designed to be skills-forward and goal-based—focused on routines, communication, resilience skills, and next-step planning with clear takeaways.",
  },
  {
    question: "What's the difference between Therapy and Support Sessions?",
    answer:
      "Therapy is provided by licensed clinicians and is appropriate when you want a clinical therapeutic process. Support Sessions are structured, skills-forward sessions focused on goals, routines, and practical next steps. Your intake helps route you to the best fit for your needs right now.",
  },

  // Insurance + billing
  {
    question: "Do you accept insurance?",
    answer:
      "Yes—currently, ValorWell accepts CHAMPVA. During intake, you'll see the options available for the service you select and any next steps needed to use CHAMPVA coverage.",
  },
  {
    question: "I have TRICARE or VA Community Care—can I still use ValorWell?",
    answer:
      "At this time, CHAMPVA is the only insurance we accept. If you still want support, you can complete Get Started and we'll share the available paths and payment options for the services you're interested in.",
  },

  // Logistics + privacy
  {
    question: "Are sessions available via telehealth?",
    answer:
      "Yes. Services are delivered through a secure online experience designed to be private, straightforward, and accessible from wherever you are.",
  },
  {
    question: "Is my information confidential?",
    answer:
      "Yes. We take privacy seriously and use secure systems designed to protect your information. If you have questions about privacy or data handling, please review our Privacy Policy or contact us.",
  },
  {
    question: "What technology do I need?",
    answer:
      "A reliable internet connection and a phone, tablet, or computer. For the best experience, use an up-to-date browser and a private space where you can speak comfortably.",
  },
  {
    question: "What if I need to reschedule?",
    answer:
      "Rescheduling policies can vary by service and provider. You'll receive clear instructions after you're scheduled, including how to reschedule and what notice is required.",
  },

  // Safety + crisis
  {
    question: "What if I'm in crisis or need immediate help?",
    answer:
      "If you're in immediate danger, call 911. For urgent mental health support, you can contact the Veterans Crisis Line: dial 988 then Press 1, text 838255, or use online chat. You can also visit our Urgent Help page for additional resources.",
  },

  // For therapists (optional but trust-building)
  {
    question: "I'm a licensed clinician—can I join ValorWell?",
    answer:
      "We work with licensed mental health professionals and are always building capacity to serve more veterans and families. If you're interested in joining, visit Careers or contact us to learn more.",
  },
];

const FAQ = () => {
  // Extract FAQ data for structured data
  const faqData = faqItems.map(item => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <Layout>
      <SEO 
        title="FAQ - Frequently Asked Questions"
        description="Get answers about ValorWell's therapy and support services for veterans. Learn about CHAMPVA coverage, telehealth sessions, and how to get started."
        canonical="/faq"
      />
      <FAQSchema faqs={faqData} />
      {/* Full-page flag background */}
      <div 
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        {/* Subdued overlay */}
        <div className="absolute inset-0 bg-white/70" />

        {/* Hero content - inline */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Clear answers, simple next steps. If you don't see your question here, reach out—we're happy to help.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/get-started">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="relative z-10">
          <FAQSection title="" items={faqItems} />
        </div>
      </div>

      {/* CTA - outside the flag background */}
      <CTABlock
        title="Still have questions?"
        subtitle="We'll point you to the right option and help you take the next step."
        ctaText="Contact Us"
        ctaLink="/contact"
        variant="muted"
      />
    </Layout>
  );
};

export default FAQ;
