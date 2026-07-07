import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DonateButton } from "@/components/DonateButton";

const primary = [
  { name: "Mission", href: "/mission" },
  { name: "Operation Claims Success", href: "/operation-claims-success" },
  { name: "Beyond The Yellow", href: "/beyondtheyellow" },
  { name: "Watch", href: "/watch" },
];

const getInvolved = [
  { name: "Clinicians", href: "/clinicians" },
  { name: "Partner / Support", href: "/partner" },
  { name: "Share a Beyond The Yellow Story", href: "/beyondtheyellow" },
  { name: "Contact", href: "/contact" },
];

const loginLinks = [
  { name: "Client", href: "https://client.valorwell.org" },
  { name: "Clinician", href: "https://emr.valorwell.org" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGI, setMobileGI] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileLogin, setMobileLogin] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
    setLoginOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setLoginOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLoginOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container-wide flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground" aria-label="ValorWell home">
          <img src="/brand/valorwell-logo.png" alt="ValorWell" className="h-8 w-auto" />
          <span>VALORWELL</span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {primary.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground whitespace-nowrap",
                location.pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Get Involved <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-64 rounded-md border border-border bg-popover p-1 shadow-lg"
              >
                {getInvolved.map((i) => (
                  <Link
                    key={i.name}
                    to={i.href}
                    role="menuitem"
                    className="block rounded px-3 py-2 text-sm text-foreground hover:bg-muted focus:bg-muted focus:outline-none"
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/get-care"
            className="ml-2 inline-flex items-center rounded-md border border-primary/30 bg-transparent px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Find Care
          </Link>

          <DonateButton source="header" size="md" />


          <div className="relative" ref={loginRef}>
            <button
              type="button"
              onClick={() => setLoginOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={loginOpen}
              className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-transparent px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Login <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            {loginOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-lg"
              >
                {loginLinks.map((i) => (
                  <a
                    key={i.name}
                    href={i.href}
                    role="menuitem"
                    className="block rounded px-3 py-2 text-sm text-foreground hover:bg-muted focus:bg-muted focus:outline-none"
                  >
                    {i.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="lg:hidden -m-2 rounded-md p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-border bg-background">
          <div className="container-wide py-4 space-y-1">
            {primary.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {item.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setMobileGI((v) => !v)}
              aria-expanded={mobileGI}
              className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
            >
              Get Involved <ChevronDown className={cn("h-4 w-4 transition-transform", mobileGI && "rotate-180")} aria-hidden />
            </button>
            {mobileGI && (
              <div className="pl-3">
                {getInvolved.map((i) => (
                  <Link
                    key={i.name}
                    to={i.href}
                    className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            )}
            <Link
              to="/get-care"
              className="mt-3 block rounded-md border border-primary/30 px-3 py-3 text-center text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Find Care
            </Link>
            <DonateButton
              source="header-mobile"
              size="lg"
              className="mt-2 w-full justify-center"
            />
            <button
              type="button"
              onClick={() => setMobileLogin((v) => !v)}
              aria-expanded={mobileLogin}
              className="mt-1 flex w-full items-center justify-between rounded-md border border-primary/30 px-3 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Login <ChevronDown className={cn("h-4 w-4 transition-transform", mobileLogin && "rotate-180")} aria-hidden />
            </button>
            {mobileLogin && (
              <div className="pl-3">
                {loginLinks.map((i) => (
                  <a
                    key={i.name}
                    href={i.href}
                    className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {i.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
