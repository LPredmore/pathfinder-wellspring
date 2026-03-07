import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User, Ribbon } from "lucide-react";
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


const navigation = [
  { name: "Videos", href: "/videos" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
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
            {/* Nav Links */}
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

            {/* BTY Link */}
            <Link
              to="/beyondtheyellow"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5",
                isActive("/beyondtheyellow") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Ribbon className="h-4 w-4 text-yellow-500" />
              BTY
            </Link>

            {/* CTA Buttons */}
            <Button asChild>
              <Link to="/therapy">Get Care</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    My Portal
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={isAdmin ? "/admin" : "/influencer"} className="w-full cursor-pointer">
                      {isAdmin ? "Admin Dashboard" : "View Profile"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
                  <DropdownMenuItem
                    onClick={() => setLoginDialogOpen(true)}
                    className="cursor-pointer"
                  >
                    Login as Mission Partner
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
              {/* Nav Links */}
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
                <Link to="/therapy" onClick={() => setMobileMenuOpen(false)}>
                  Get Care
                </Link>
              </Button>

              {user ? (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={isAdmin ? "/admin" : "/influencer"} onClick={() => setMobileMenuOpen(false)}>
                      {isAdmin ? "Admin Dashboard" : "View Profile"}
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
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
                    <DropdownMenuItem
                      onClick={() => {
                        setLoginDialogOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full cursor-pointer"
                    >
                      Login as Mission Partner
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
