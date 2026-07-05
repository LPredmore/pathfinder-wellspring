import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { PageShell } from "@/components/layout";

// Preserved functional (non-shell) routes
import Donate from "./pages/Donate";
import CreatorApply from "./pages/CreatorApply";
import InfluencerPortal from "./pages/InfluencerPortal";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import MissionPage from "./pages/MissionPage";
import OperationClaimsSuccessPage from "./pages/OperationClaimsSuccessPage";

const queryClient = new QueryClient();

// Approved sitemap — every public page is a labeled shell.
const publicPages: { path: string; name: string }[] = [
  { path: "/get-care", name: "Find Care" },
  { path: "/veterans", name: "Veterans" },
  { path: "/families", name: "Families" },
  { path: "/individuals", name: "Individuals" },
  { path: "/clinicians", name: "Clinicians / Join the Mission" },
  { path: "/beyondtheyellow", name: "Beyond The Yellow" },
  
  
  { path: "/partner", name: "Partner / Support" },
  { path: "/about", name: "About ValorWell" },
  { path: "/contact", name: "Contact" },
  { path: "/privacy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms of Service" },
];

// Legacy path aliases → new approved paths.
const legacyRedirects: { from: string; to: string }[] = [
  { from: "/therapy", to: "/get-care" },
  { from: "/get-started", to: "/get-care" },
  { from: "/how-it-works", to: "/get-care" },
  { from: "/therapists", to: "/clinicians" },
  { from: "/media", to: "/watch" },
  { from: "/media/youtube-podcast", to: "/watch" },
  { from: "/videos", to: "/watch" },
  { from: "/support", to: "/partner" },
  { from: "/partners", to: "/partner" },
  { from: "/fund-access-to-care", to: "/partner" },
  { from: "/sponsors", to: "/partner" },
  { from: "/sponsor-care", to: "/partner" },
  { from: "/monthly-supporters", to: "/partner" },
  { from: "/funders", to: "/partner" },
  { from: "/referral-partners", to: "/partner" },
  { from: "/mission-one-pager", to: "/partner" },
  { from: "/our-model", to: "/about" },
  { from: "/foundation", to: "/about" },
  { from: "/impact", to: "/about" },
  { from: "/advocates", to: "/partner" },
  { from: "/faq", to: "/contact" },
  { from: "/urgent-help", to: "/get-care" },
  // Media / authority / product routes that will be rebuilt intentionally later
  { from: "/resources", to: "/" },
  { from: "/veteran-mental-health-care", to: "/veterans" },
  { from: "/champva-mental-health", to: "/veterans" },
  { from: "/va-community-care-mental-health", to: "/veterans" },
  { from: "/documentation-support", to: "/veterans" },
  { from: "/military-family-therapy", to: "/families" },
  { from: "/family-systems", to: "/families" },
  { from: "/bestselfs", to: "/" },
  { from: "/corefeel", to: "/" },
  { from: "/vibetales", to: "/" },
  { from: "/ninjado", to: "/" },
  { from: "/skillsquest", to: "/" },
  { from: "/brightdeed", to: "/" },
  { from: "/pendulo", to: "/" },
  { from: "/challenge", to: "/beyondtheyellow" },
  { from: "/competitions", to: "/beyondtheyellow" },
];

const App = () => (
  <HelmetProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch" element={<WatchPage />} />
              <Route path="/mission" element={<MissionPage />} />
              {publicPages.map((p) => (
                <Route key={p.path} path={p.path} element={<PageShell name={p.name} path={p.path} />} />
              ))}

              {legacyRedirects.map((r) => (
                <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
              ))}

              {/* Preserved functional routes (not in public nav) */}
              <Route path="/donate" element={<Donate />} />
              <Route path="/beyondtheyellow/apply" element={<CreatorApply />} />
              <Route path="/influencer" element={<InfluencerPortal />} />
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </HelmetProvider>
);

export default App;
