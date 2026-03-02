import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import BusinessConsulting from "./pages/BusinessConsulting";
import CareerGuidance from "./pages/CareerGuidance";
import TravelAdvisory from "./pages/TravelAdvisory";
import StudentLevelPage from "./pages/StudentLevelPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Webinars from "./pages/Webinars";
import BookConsultation from "./pages/BookConsultation";
import Apply from "./pages/Apply";
import ApplicationStatus from "./pages/ApplicationStatus";
import FAQ from "./pages/FAQ";
import { Privacy, Terms, Refund, Cookies } from "./pages/LegalPages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/business-consulting" element={<BusinessConsulting />} />
            <Route path="/career-guidance" element={<CareerGuidance />} />
            <Route path="/travel-advisory" element={<TravelAdvisory />} />
            <Route path="/travel-advisory/:level" element={<StudentLevelPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookConsultation />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
