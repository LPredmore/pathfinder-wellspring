import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RouteScrollManager } from "@/components/routing/RouteScrollManager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";

// Preserved functional (non-shell) routes
import Donate from "./pages/Donate";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import MissionPage from "./pages/MissionPage";
import OcsBillingHubPage from "./pages/OcsBillingHubPage";
import BtyBillingHubPage from "./pages/BtyBillingHubPage";
import Clinicians from "./pages/Clinicians";
import GetCare from "./pages/GetCare";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import AuthorityResources from "./pages/authority/Resources";
import AuthorityFamilySystems from "./pages/authority/FamilySystems";
import AuthorityMilitaryFamilyTherapy from "./pages/authority/MilitaryFamilyTherapy";
import AuthorityVeteranMentalHealthCare from "./pages/authority/VeteranMentalHealthCare";
import AuthorityVACommunityCareMentalHealth from "./pages/authority/VACommunityCareMentalHealth";
import AuthorityResourcesChampva from "./pages/authority/ResourcesChampva";
import AuthorityResourcesDocumentation from "./pages/authority/ResourcesDocumentation";
import AuthorityResourcesFamilySystems from "./pages/authority/ResourcesFamilySystems";
import AuthorityResourcesVACommunityCare from "./pages/authority/ResourcesVACommunityCare";
import AuthorityResourcesVeteranMentalHealth from "./pages/authority/ResourcesVeteranMentalHealth";

const queryClient = new QueryClient();

// Legacy path aliases → new approved paths.
const legacyRedirects: { from: string; to: string }[] = [
  { from: "/therapy", to: "/get-care" },
  { from: "/get-started", to: "/get-care" },
  { from: "/how-it-works", to: "/get-care" },
  { from: "/support", to: "/partner" },
  { from: "/partners", to: "/partner" },
  { from: "/fund-access-to-care", to: "/partner" },
  { from: "/sponsors", to: "/partner" },
  { from: "/sponsor-care", to: "/partner" },
  { from: "/monthly-supporters", to: "/partner" },
  { from: "/funders", to: "/partner" },
  { from: "/referral-partners", to: "/partner" },
  { from: "/mission-one-pager", to: "/partner" },
  { from: "/faq", to: "/contact" },
  { from: "/urgent-help", to: "/get-care" },
  { from: "/resources", to: "/authority/resources" },
  { from: "/influencer", to: "/beyondtheyellow" },
  {
    from: "/veteran-mental-health-care",
    to: "/authority/veteran-mental-health-care",
  },
  {
    from: "/va-community-care-mental-health",
    to: "/authority/va-community-care-mental-health",
  },
  {
    from: "/military-family-therapy",
    to: "/authority/military-family-therapy",
  },
  { from: "/family-systems", to: "/authority/family-systems" },
];

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteScrollManager />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watch" element={<WatchPage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route
              path="/operation-claims-success"
              element={<OcsBillingHubPage />}
            />
            <Route path="/beyondtheyellow" element={<BtyBillingHubPage />} />
            <Route path="/clinicians" element={<Clinicians />} />
            <Route
              path="/therapists"
              element={<Navigate to="/clinicians" replace />}
            />
            <Route path="/get-care" element={<GetCare />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />

            <Route path="/authority/resources" element={<AuthorityResources />} />
            <Route
              path="/authority/family-systems"
              element={<AuthorityFamilySystems />}
            />
            <Route
              path="/authority/military-family-therapy"
              element={<AuthorityMilitaryFamilyTherapy />}
            />
            <Route
              path="/authority/veteran-mental-health-care"
              element={<AuthorityVeteranMentalHealthCare />}
            />
            <Route
              path="/authority/va-community-care-mental-health"
              element={<AuthorityVACommunityCareMentalHealth />}
            />
            <Route
              path="/authority/resources/champva"
              element={<AuthorityResourcesChampva />}
            />
            <Route
              path="/authority/resources/documentation"
              element={<AuthorityResourcesDocumentation />}
            />
            <Route
              path="/authority/resources/family-systems"
              element={<AuthorityResourcesFamilySystems />}
            />
            <Route
              path="/authority/resources/va-community-care"
              element={<AuthorityResourcesVACommunityCare />}
            />
            <Route
              path="/authority/resources/veteran-mental-health"
              element={<AuthorityResourcesVeteranMentalHealth />}
            />

            {legacyRedirects.map((redirect) => (
              <Route
                key={redirect.from}
                path={redirect.from}
                element={<Navigate to={redirect.to} replace />}
              />
            ))}

            {/* Preserved functional routes (not in public nav) */}
            <Route path="/donate" element={<Donate />} />
            <Route
              path="/admin"
              element={
                <AuthProvider>
                  <AdminDashboard />
                </AuthProvider>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
