import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Briefcase, Heart } from "lucide-react";

const footerLinks = {
  resources: [
    { name: "Veterans Crisis Line", href: "/urgent-help" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "FAQ", href: "/faq" },
  ],
  about: [
    { name: "Our Mission", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  getInvolved: [
    { name: "Join Our Team", href: "/therapists", external: false },
    { name: "Support a Veteran", href: "/donate", external: false },
  ],
};

const contactInfo = [
  { icon: Phone, label: "Call", href: "tel:+18005551234" },
  { icon: Mail, label: "Email", href: "mailto:contact@valorwell.com" },
  { icon: MapPin, label: "Location", href: "/contact" },
];

const getInvolvedIcons: Record<string, typeof Briefcase> = {
  "Join Our Team": Briefcase,
  "Support a Veteran": Heart,
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
          {/* Resources Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Resources</h3>
            <nav className="space-y-3">
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <span className="text-gold-accent mr-2">★</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">About Us</h3>
            <nav className="space-y-3">
              {footerLinks.about.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <span className="text-gold-accent mr-2">★</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get Involved Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Get Involved</h3>
            <nav className="space-y-3">
              {footerLinks.getInvolved.map((link) => {
                const Icon = getInvolvedIcons[link.name];
                if (link.external) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4 mr-2 text-gold-accent" />
                      {link.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4 mr-2 text-gold-accent" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <div className="flex flex-wrap gap-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} ValorWell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
