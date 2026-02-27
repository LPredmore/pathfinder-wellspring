import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Therapy from "./pages/Therapy";
import SupportSessions from "./pages/SupportSessions";

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
import OperationClaimsSuccess from "./pages/OperationClaimsSuccess";
import Advocates from "./pages/Advocates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/therapy" element={<Therapy />} />
            <Route path="/support-sessions" element={<SupportSessions />} />
            
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
            <Route path="/operation-claims-success" element={<OperationClaimsSuccess />} />
            <Route path="/advocates" element={<Advocates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
