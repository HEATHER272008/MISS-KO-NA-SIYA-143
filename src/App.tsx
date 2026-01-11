import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Scholarships from "./pages/Scholarships";
import Personnel from "./pages/Personnel";
import Organizations from "./pages/Organizations";
import OrganizationDetail from "./pages/OrganizationDetail";
import Enrollment from "./pages/Enrollment";
import Announcements from "./pages/Announcements";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Show preloader only on first visit
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowPreloader(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/personnel" element={<Personnel />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/organizations/:id" element={<OrganizationDetail />} />
                <Route path="/enrollment" element={<Enrollment />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
