import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Journal from "./pages/Journal";
import SymptomChecker from "./pages/SymptomChecker";
import DoctorConnect from "./pages/DoctorConnect";
import PharmacyFinder from "./pages/PharmacyFinder";
import EmergencyHelp from "./pages/EmergencyHelp";
import LearningHub from "./pages/LearningHub";
import NotFound from "./pages/NotFound";
import { LangProvider } from "@/hooks/useLang";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LangProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/symptom" element={<SymptomChecker />} />
            <Route path="/doctor" element={<DoctorConnect />} />
            <Route path="/pharmacy" element={<PharmacyFinder />} />
            <Route path="/emergency" element={<EmergencyHelp />} />
            <Route path="/learning" element={<LearningHub />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LangProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
