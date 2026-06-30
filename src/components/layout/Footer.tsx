import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const primaryLinks = [
  { name: "Get Care", href: "/get-care" },
  { name: "Fund Access to Care", href: "/fund-access-to-care" },
  { name: "BestSelfs", href: "/bestselfs" },
  { name: "Media", href: "/media" },
  { name: "Impact", href: "/impact" },
  { name: "About", href: "/about" },
];

const programLinks = [
  { name: "Beyond the Yellow", href: "/beyondtheyellow" },
  { name: "Heroes for Heroes", href: "/advocates" },
  { name: "Foundation", href: "/foundation" },
  { name: "Join Our Team", href: "/therapists" },
];

const mediaLinks = [
  { name: "Media Overview", href: "/media" },
  { name: "YouTube & Podcast", href: "/media/youtube-podcast" },
  { name: "Cognitive Consistency", href: "/media/cognitive-consistency" },
  { name: "Collaborate", href: "/media/collaborate" },
  { name: "Community", href: "/media/community" },
];

const learnLinks = [
  { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
  { name: "CHAMPVA Mental Health", href: "/champva-mental-health" },
  { name: "VA Community Care Mental Health", href: "/va-community-care-mental-health" },
  { name: "Documentation Support", href: "/documentation-support" },
  { name: "Military Family Therapy", href: "/military-family-therapy" },
  { name: "Family Systems", href: "/family-systems" },
  { name: "Resource Hub", href: "/resources" },
];

const aboutLinks = [
  { name: "Contact", href: "/contact" },
  { name: "Urgent Help", href: "/urgent-help" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const MISSION = "ValorWell is building a better support system so veterans and their families can get mental health care, accurate clinical documentation, and practical tools without waiting months, going untreated, or relying on predatory systems.";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <img src="/brand/valorwell-logo.png" alt="ValorWell" className="h-8 w-8" />
              <span className="text-xl font-semibold">ValorWell</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed text-sm mb-5 max-w-md">
              {MISSION}
            </p>
            <a
              href="mailto:info@valorwell.org"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm"
            >
              <Mail className="h-4 w-4" /> info@valorwell.org
            </a>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            <div>
              <h3 className="font-heading font-semibold text-base mb-4">Mission</h3>
              <nav className="space-y-2.5">
                {primaryLinks.map((l) => (
                  <Link key={l.name} to={l.href} className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {l.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base mb-4">Media</h3>
              <nav className="space-y-2.5">
                {mediaLinks.map((l) => (
                  <Link key={l.name} to={l.href} className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {l.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base mb-4">Programs</h3>
              <nav className="space-y-2.5">
                {programLinks.map((l) => (
                  <Link key={l.name} to={l.href} className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {l.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base mb-4">Site</h3>
              <nav className="space-y-2.5">
                {aboutLinks.map((l) => (
                  <Link key={l.name} to={l.href} className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {l.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} ValorWell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
