import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
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

const navigation: { name: string; href: string; eyebrow?: string }[] = [
  { name: "Start Here", href: "/get-care", eyebrow: "Veterans & families" },
  { name: "VA Navigation", href: "/resources/va-community-care", eyebrow: "Care access" },
  { name: "Disability & Docs", href: "/documentation-support", eyebrow: "Claims support" },
  { name: "Resources", href: "/resources", eyebrow: "Self-education" },
  { name: "Videos", href: "/media/youtube-podcast", eyebrow: "Field briefings" },
  { name: "Partners", href: "/partners", eyebrow: "Build with us" },
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
    (href === "/resources/va-community-care" && location.pathname.includes("va-community-care")) ||
    (href === "/documentation-support" && location.pathname.includes("documentation")) ||
    (href === "/media/youtube-podcast" && (location.pathname === "/videos" || location.pathname.startsWith("/media"))) ||
    (href === "/partners" && location.pathname.startsWith("/partners"));

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy text-white shadow-lg">
        <div className="hidden border-b border-white/10 bg-white/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/80 md:block">
          ValorWell is bigger than therapy: VA navigation, disability clarity, documentation awareness, family support, and care access.
        </div>
        <nav className="container-wide flex min-h-20 items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
              <img src="/brand/valorwell-logo.png" alt="ValorWell" className="h-8 w-8" />
            </span>
            <span>
              <span className="block text-xl font-bold leading-none">ValorWell</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-accent">VA system support</span>
            </span>
          </Link>

          <div className="hidden xl:flex xl:items-center xl:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group rounded-2xl px-3 py-2 transition-colors hover:bg-white/10",
                  isActive(item.href) ? "bg-white/15 text-white" : "text-white/78"
                )}
              >
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-accent/80">{item.eyebrow}</span>
                <span className="block whitespace-nowrap text-sm font-semibold">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <Button asChild className="bg-patriot-red text-white hover:bg-patriot-red-dark">
              <Link to="/get-care">Start Here</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/60 bg-transparent text-white hover:bg-white hover:text-navy">
              <Link to="/beyondtheyellow">Fund the Fight</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/10 hover:text-white">
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
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                    Portals <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
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
            className="lg:hidden rounded-xl border border-white/20 p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-navy">
            <div className="container-wide py-4">
              <div className="grid gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 transition-colors hover:bg-white/10",
                      isActive(item.href) ? "bg-white/15 text-white" : "text-white/80"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-accent/80">{item.eyebrow}</span>
                    <span className="block text-base font-semibold">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 grid gap-2">
                <Button asChild className="w-full bg-patriot-red text-white hover:bg-patriot-red-dark">
                  <Link to="/get-care" onClick={() => setMobileMenuOpen(false)}>Start Here</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-white/60 bg-transparent text-white hover:bg-white hover:text-navy">
                  <Link to="/beyondtheyellow" onClick={() => setMobileMenuOpen(false)}>Fund the Fight</Link>
                </Button>
              </div>

              {user ? (
                <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
                  <Button variant="outline" className="w-full border-white/60 bg-transparent text-white" asChild>
                    <Link to={isAdmin ? "/admin" : "/influencer"} onClick={() => setMobileMenuOpen(false)}>
                      {isAdmin ? "Admin Dashboard" : "View Profile"}
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full gap-2 text-white hover:bg-white/10 hover:text-white" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="mt-3 w-full text-white hover:bg-white/10 hover:text-white">Portal Login</Button>
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
