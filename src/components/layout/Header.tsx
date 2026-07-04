import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
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
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="container-wide flex h-16 items-center justify-between gap-4">
        <Link to="/" className="text-lg font-semibold text-foreground">
          ValorWell
        </Link>

        <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-x-4 lg:gap-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground whitespace-nowrap",
                location.pathname === item.href ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -m-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t bg-background">
          <div className="container-wide py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-2 text-sm",
                  location.pathname === item.href ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
