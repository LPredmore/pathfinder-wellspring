import { Link } from "react-router-dom";

const groups: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: "Mission",
    links: [
      { name: "Mission", href: "/mission" },
      { name: "Operation Claims Success", href: "/operation-claims-success" },
      { name: "Beyond The Yellow", href: "/beyondtheyellow" },
      { name: "Watch ValorWell", href: "/watch" },
    ],
  },
  {
    title: "Find Your Path",
    links: [
      { name: "Find Care", href: "/get-care" },
      { name: "Clinicians", href: "/clinicians" },
      { name: "Partner / Support", href: "/partner" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { name: "Donate", href: "/donate?utm_source=footer&utm_medium=site&utm_campaign=ocs" },
      { name: "Partner / Support", href: "/partner" },
      { name: "Share a Beyond The Yellow Story", href: "/beyondtheyellow" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[hsl(var(--section-alt))]">
      <div className="container-wide py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground" aria-label="ValorWell home">
              <img src="/brand/valorwell-logo.png" alt="ValorWell" className="h-9 w-auto" />
              <span className="sr-only">ValorWell</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Building better systems around veteran and family support, mental well-being, ethical care, and real community action.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">{g.title}</h3>
              <ul className="mt-4 space-y-2">
                {g.links.map((l) => (
                  <li key={l.name}>
                    <Link to={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ValorWell. All rights reserved.</p>
          <p className="max-w-3xl">
            ValorWell does not guarantee VA Community Care authorization, referrals, Nexus Letters, disability ratings, service connection, claim approval, or any VA outcome.
          </p>
        </div>
      </div>
    </footer>
  );
}
