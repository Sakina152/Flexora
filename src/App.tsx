
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import Home from "./pages/Home";
import TrendingLooks from "./pages/TrendingLooks";
import StyleCategories from "./pages/StyleCategories";
import StudentSpotlights from "./pages/StudentSpotlights";
import Collections from "./pages/Collections";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import "./styles/main.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingAnimation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending-looks" element={<TrendingLooks />} />
            <Route path="/style-categories" element={<StyleCategories />} />
            <Route path="/student-spotlights" element={<StudentSpotlights />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
