import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const missionLinks = [
  { name: "Get Support", href: "/get-care" },
  { name: "Beyond the Yellow", href: "/beyondtheyellow" },
  { name: "Our Model", href: "/our-model" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const resourcesLinks = [
  { name: "Resource Hub", href: "/resources" },
  { name: "Veteran Mental Health Care", href: "/veteran-mental-health-care" },
  { name: "CHAMPVA Mental Health", href: "/champva-mental-health" },
  { name: "VA Community Care", href: "/va-community-care-mental-health" },
  { name: "Documentation Support", href: "/documentation-support" },
  { name: "Family Systems", href: "/family-systems" },
];

const campaignLinks = [
  { name: "The $75 Mission", href: "/beyondtheyellow" },
  { name: "Donate", href: "/donate" },
  { name: "Mission One-Pager", href: "/mission-one-pager" },
  { name: "Partner With Us", href: "/partners" },
];

const mediaLinks = [
  { name: "Videos & Podcast", href: "/media/youtube-podcast" },
  { name: "Video Library", href: "/videos" },
  { name: "YouTube", href: "https://www.youtube.com/@valorwell", external: true },
  { name: "Reddit", href: "https://www.reddit.com/r/valorwell", external: true },
];

const toolsLinks = [
  { name: "BestSelfs", href: "/bestselfs" },
  { name: "CoreFeel", href: "/corefeel" },
  { name: "VibeTales", href: "/vibetales" },
  { name: "NinjaDo", href: "/ninjado" },
  { name: "BrightDeed", href: "/brightdeed" },
];

const siteLinks = [
  { name: "Urgent Help", href: "/urgent-help" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const MISSION = "ValorWell is building a better pathway for veterans and families navigating VA systems, care access, documentation challenges, and support gaps.";

function FooterLink({ link }: { link: { name: string; href: string; external?: boolean } }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
        {link.name}
      </a>
    );
  }

  return (
    <Link to={link.href} className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
      {link.name}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
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

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              ["Mission", missionLinks],
              ["Resources", resourcesLinks],
              ["Beyond Yellow", campaignLinks],
              ["Videos", mediaLinks],
              ["Tools", toolsLinks],
              ["Site", siteLinks],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h3 className="font-heading font-semibold text-base mb-4">{title as string}</h3>
                <nav className="space-y-2.5">
                  {(links as typeof missionLinks).map((l) => <FooterLink key={l.name} link={l} />)}
                </nav>
              </div>
            ))}
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
