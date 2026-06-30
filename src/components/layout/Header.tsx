import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { InfluencerLoginDialog } from "@/components/InfluencerLoginDialog";

const navigation: { name: string; href: string }[] = [
  { name: "Get Support", href: "/get-care" },
  { name: "Beyond the Yellow", href: "/beyondtheyellow" },
  { name: "Resources", href: "/resources" },
  { name: "Videos", href: "/media/youtube-podcast" },
  { name: "Our Model", href: "/our-model" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();

  const isActive = (href: string) =>
    location.pathname === href ||
    (href === "/resources" && location.pathname.startsWith("/resources")) ||
    (href === "/media/youtube-podcast" && (location.pathname === "/videos" || location.pathname.startsWith("/media"))) ||
    (href === "/beyondtheyellow" && ["/fund-access-to-care", "/monthly-supporters", "/sponsor-care", "/sponsors", "/funders"].includes(location.pathname));

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container-wide flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/brand/valorwell-logo.png" alt="ValorWell" className="h-8 w-8" />
            <span className="text-xl font-semibold text-primary">ValorWell</span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-5 xl:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}

            <Button asChild className="bg-patriot-red hover:bg-patriot-red-dark text-white">
              <Link to="/get-care">Get Support</Link>
            </Button>
            <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Link to="/beyondtheyellow">Go Beyond the Yellow</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={isAdmin ? "/admin" : "/influencer"} className="w-full cursor-pointer">
                      {isAdmin ? "Admin Dashboard" : "View Profile"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">Portal Login</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a href="https://client.valorwell.org" target="_blank" rel="noopener noreferrer">Client Portal</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="https://emr.valorwell.org" target="_blank" rel="noopener noreferrer">Clinician Portal</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLoginDialogOpen(true)} className="cursor-pointer">
                    Mission Partner Portal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden p-2 -m-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="container-wide py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
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

              <div className="flex flex-col gap-2 pt-2">
                <Button asChild className="w-full bg-patriot-red hover:bg-patriot-red-dark text-white">
                  <Link to="/get-care" onClick={() => setMobileMenuOpen(false)}>Get Support</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-navy text-navy">
                  <Link to="/beyondtheyellow" onClick={() => setMobileMenuOpen(false)}>Go Beyond the Yellow</Link>
                </Button>
              </div>

              {user ? (
                <div className="space-y-2 pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={isAdmin ? "/admin" : "/influencer"} onClick={() => setMobileMenuOpen(false)}>
                      {isAdmin ? "Admin Dashboard" : "View Profile"}
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full gap-2" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full">Portal Login</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-[calc(100vw-2rem)]">
                    <DropdownMenuItem asChild>
                      <a href="https://client.valorwell.org" target="_blank" rel="noopener noreferrer">Client Portal</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="https://emr.valorwell.org" target="_blank" rel="noopener noreferrer">Clinician Portal</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLoginDialogOpen(true)} className="cursor-pointer">
                      Mission Partner Portal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        )}
      </header>
      <InfluencerLoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  );
}
