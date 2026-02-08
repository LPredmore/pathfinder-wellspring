import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const services = [
  { name: "Therapy", href: "/therapy" },
  { name: "Support Sessions", href: "/support-sessions" },
];

const navigation = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isServicesActive = services.some((s) => location.pathname === s.href);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-wide flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/brand/valorwell-logo.png"
            alt="ValorWell"
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold text-primary">ValorWell</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  isServicesActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                Services
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {services.map((service) => (
                <DropdownMenuItem key={service.name} asChild>
                  <Link
                    to={service.href}
                    className={cn(
                      "w-full cursor-pointer",
                      isActive(service.href) && "bg-accent"
                    )}
                  >
                    {service.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Other Nav Links */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* CTA Buttons */}
          <Button asChild>
            <Link to="/get-started">Get Started</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Login</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a
                  href="https://client.valorwell.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Login as Client
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://emr.valorwell.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Login as Clinician
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 -m-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container-wide py-4 space-y-4">
            {/* Services Accordion */}
            <div>
              <button
                className="flex w-full items-center justify-between py-2 text-sm font-medium"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>
              {servicesOpen && (
                <div className="ml-4 space-y-2 pt-2">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className={cn(
                        "block py-2 text-sm transition-colors hover:text-primary",
                        isActive(service.href)
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Nav Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA Buttons */}
            <Button asChild className="w-full">
              <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[calc(100vw-2rem)]">
                <DropdownMenuItem asChild>
                  <a
                    href="https://client.valorwell.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    Login as Client
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://emr.valorwell.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    Login as Clinician
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </header>
  );
}
