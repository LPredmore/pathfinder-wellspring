import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Therapy from "./pages/Therapy";


import HowItWorks from "./pages/HowItWorks";
import Therapists from "./pages/Therapists";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import UrgentHelp from "./pages/UrgentHelp";
import Foundation from "./pages/Foundation";
import Donate from "./pages/Donate";
import Support from "./pages/Support";
import Competitions from "./pages/Competitions";
import Challenge from "./pages/Challenge";
import OperationClaimsSuccess from "./pages/OperationClaimsSuccess";
import Advocates from "./pages/Advocates";

import InfluencerPortal from "./pages/InfluencerPortal";
import AdminDashboard from "./pages/AdminDashboard";
import CreatorApply from "./pages/CreatorApply";
import VibeTales from "./pages/VibeTales";
import NinjaDo from "./pages/NinjaDo";
import SkillsQuest from "./pages/SkillsQuest";
import CoreFeel from "./pages/CoreFeel";
import BrightDeed from "./pages/BrightDeed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/therapy" element={<Therapy />} />
              
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/therapists" element={<Therapists />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/urgent-help" element={<UrgentHelp />} />
              <Route path="/foundation" element={<Foundation />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/support" element={<Support />} />
              <Route path="/beyondtheyellow" element={<Competitions />} />
              <Route path="/challenge" element={<Challenge />} />
              <Route path="/operation-claims-success" element={<OperationClaimsSuccess />} />
              <Route path="/advocates" element={<Advocates />} />
              
              <Route path="/beyondtheyellow/apply" element={<CreatorApply />} />
              <Route path="/influencer" element={<InfluencerPortal />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/vibetales" element={<VibeTales />} />
              <Route path="/ninjado" element={<NinjaDo />} />
              <Route path="/skillsquest" element={<SkillsQuest />} />
              <Route path="/SkillsQuest" element={<Navigate to="/skillsquest" replace />} />
              <Route path="/corefeel" element={<CoreFeel />} />
              <Route path="/brightdeed" element={<BrightDeed />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
  </HelmetProvider>
);

export default App;
