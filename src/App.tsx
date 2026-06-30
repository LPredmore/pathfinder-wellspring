import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Therapy from "./pages/Therapy";
import GetCare from "./pages/GetCare";
import BestSelfs from "./pages/BestSelfs";
import OurModel from "./pages/OurModel";
import Videos from "./pages/Videos";
import MediaOverview from "./pages/media/MediaOverview";
import YouTubePodcast from "./pages/media/YouTubePodcast";


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
import Pendulo from "./pages/Pendulo";
import VeteranMentalHealthCare from "./pages/authority/VeteranMentalHealthCare";
import ChampvaMentalHealth from "./pages/authority/ChampvaMentalHealth";
import VACommunityCareMentalHealth from "./pages/authority/VACommunityCareMentalHealth";
import DocumentationSupport from "./pages/authority/DocumentationSupport";
import MilitaryFamilyTherapy from "./pages/authority/MilitaryFamilyTherapy";
import FamilySystems from "./pages/authority/FamilySystems";
import Resources from "./pages/authority/Resources";
import ResourcesChampva from "./pages/authority/ResourcesChampva";
import ResourcesVACommunityCare from "./pages/authority/ResourcesVACommunityCare";
import ResourcesDocumentation from "./pages/authority/ResourcesDocumentation";
import ResourcesVeteranMentalHealth from "./pages/authority/ResourcesVeteranMentalHealth";
import ResourcesFamilySystems from "./pages/authority/ResourcesFamilySystems";
import Partners from "./pages/Partners";
import MissionOnePager from "./pages/MissionOnePager";
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
              <Route path="/get-care" element={<GetCare />} />
              <Route path="/fund-access-to-care" element={<Navigate to="/beyondtheyellow" replace />} />
              <Route path="/bestselfs" element={<BestSelfs />} />
              <Route path="/impact" element={<Navigate to="/our-model" replace />} />
              <Route path="/our-model" element={<OurModel />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/media" element={<MediaOverview />} />
              <Route path="/media/youtube-podcast" element={<YouTubePodcast />} />
              <Route path="/media/cognitive-consistency" element={<Navigate to="/media/youtube-podcast" replace />} />
              <Route path="/media/collaborate" element={<Navigate to="/partners" replace />} />
              <Route path="/media/community" element={<Navigate to="/media/youtube-podcast" replace />} />
              <Route path="/therapy" element={<Therapy />} />
              <Route path="/support" element={<Navigate to="/beyondtheyellow" replace />} />
              
              
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
              <Route path="/pendulo" element={<Pendulo />} />

              {/* Phase 3: SEO Authority */}
              <Route path="/veteran-mental-health-care" element={<VeteranMentalHealthCare />} />
              <Route path="/champva-mental-health" element={<ChampvaMentalHealth />} />
              <Route path="/va-community-care-mental-health" element={<VACommunityCareMentalHealth />} />
              <Route path="/documentation-support" element={<DocumentationSupport />} />
              <Route path="/military-family-therapy" element={<MilitaryFamilyTherapy />} />
              <Route path="/family-systems" element={<FamilySystems />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/champva" element={<ResourcesChampva />} />
              <Route path="/resources/va-community-care" element={<ResourcesVACommunityCare />} />
              <Route path="/resources/documentation" element={<ResourcesDocumentation />} />
              <Route path="/resources/veteran-mental-health" element={<ResourcesVeteranMentalHealth />} />
              <Route path="/resources/family-systems" element={<ResourcesFamilySystems />} />
              <Route path="/resources/cognitive-consistency" element={<Navigate to="/resources" replace />} />

              {/* Phase 4: Partner / Funder Infrastructure */}
              <Route path="/partners" element={<Partners />} />
              <Route path="/sponsors" element={<Navigate to="/beyondtheyellow" replace />} />
              <Route path="/monthly-supporters" element={<Navigate to="/beyondtheyellow" replace />} />
              <Route path="/sponsor-care" element={<Navigate to="/beyondtheyellow" replace />} />
              <Route path="/funders" element={<Navigate to="/beyondtheyellow" replace />} />
              <Route path="/referral-partners" element={<Navigate to="/contact" replace />} />
              <Route path="/mission-one-pager" element={<MissionOnePager />} />

              <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
  </HelmetProvider>
);

export default App;
