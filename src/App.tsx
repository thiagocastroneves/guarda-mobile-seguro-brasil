import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Emergency from "./pages/Emergency";
import RiskZones from "./pages/RiskZones";
import EducationalCenter from "./pages/EducationalCenter";
import NotFound from "./pages/NotFound";
import OnboardingTour from "./components/OnboardingTour";
import MapTest from "./pages/MapTest";
import "./styles/map.css";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="guarda-mobile-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/risk-zones" element={<RiskZones />} />
                <Route path="/educational-center" element={<EducationalCenter />} />
                <Route path="/map-test" element={<MapTest />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <OnboardingTour />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
