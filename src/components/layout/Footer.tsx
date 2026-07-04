import { Link } from "react-router-dom";

const links = [
  { name: "Home", href: "/" },
  { name: "Find Care", href: "/get-care" },
  { name: "Veterans", href: "/veterans" },
  { name: "Families", href: "/families" },
  { name: "Individuals", href: "/individuals" },
  { name: "Clinicians", href: "/clinicians" },
  { name: "Beyond The Yellow", href: "/beyondtheyellow" },
  { name: "Operation Claims Success", href: "/operation-claims-success" },
  { name: "Watch", href: "/watch" },
  { name: "Partner", href: "/partner" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container-wide py-8">
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <Link key={l.href} to={l.href} className="text-sm text-muted-foreground hover:text-foreground">
              {l.name}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} ValorWell.
        </p>
      </div>
    </footer>
  );
}
