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
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import CollectionProducts from "./pages/CollectionProducts";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubmitDesign from "./pages/SubmitDesign";
import JoinCommunity from "./pages/JoinCommunity";

// Trending pages
import ParisianChic from "./pages/trending/ParisianChic";
import SustainableFashion from "./pages/trending/SustainableFashion";
import StreetStyle from "./pages/trending/StreetStyle";
import BohemianVibes from "./pages/trending/BohemianVibes";
import VintageRevivalT from "./pages/trending/VintageRevivalT";
import MinimalistWardrobe from "./pages/trending/MinimalistWardrobe";

// Category pages
import MinimalistStyle from "./pages/categories/MinimalistStyle";
import BohemianStyle from "./pages/categories/BohemianStyle";
import FormalStyle from "./pages/categories/FormalStyle";
import VintageStyle from "./pages/categories/VintageStyle";
import CasualStyle from "./pages/categories/CasualStyle";
import StreetwearStyle from "./pages/categories/StreetwearStyle";

// Student pages
import SarahMartinez from "./pages/students/SarahMartinez";

// Collection pages
import SummerVibes from "./pages/collections/SummerVibes";
import ElegantEveningWear from "./pages/collections/ElegantEveningWear";
import BohemianDream from "./pages/collections/BohemianDream";
import StreetStyleEssentials from "./pages/collections/StreetStyleEssentials";
import MinimalistChic from "./pages/collections/MinimalistChic";
import VintageRevival from "./pages/collections/VintageRevival";

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
            
            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Product routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/categories/:category/products" element={<CategoryProducts />} />
            <Route path="/collections/:collection/products" element={<CollectionProducts />} />
            
            {/* Individual trending pages */}
            <Route path="/trending/parisian-chic" element={<ParisianChic />} />
            <Route path="/trending/sustainable-fashion" element={<SustainableFashion />} />
            <Route path="/trending/street-style" element={<StreetStyle />} />
            <Route path="/trending/bohemian-vibes" element={<BohemianVibes />} />
            <Route path="/trending/vintage-revivalT" element={<VintageRevivalT />} />
            <Route path="/trending/minimalist-wardrobe" element={<MinimalistWardrobe />} />
            
            {/* Individual category pages */}
            <Route path="/categories/minimalist" element={<MinimalistStyle />} />
            <Route path="/categories/bohemian" element={<BohemianStyle />} />
            <Route path="/categories/formal" element={<FormalStyle />} />
            <Route path="/categories/vintage" element={<VintageStyle />} />
            <Route path="/categories/casual" element={<CasualStyle />} />
            <Route path="/categories/streetwear" element={<StreetwearStyle />} />
            
            {/* Individual student pages */}
            <Route path="/students/sarah-martinez" element={<SarahMartinez />} />
            
            {/* Individual collection pages */}
            <Route path="/collections/summer-vibes" element={<SummerVibes />} />
            <Route path="/collections/elegant-evening-wear" element={<ElegantEveningWear />} />
            <Route path="/collections/bohemian-dream" element={<BohemianDream />} />
            <Route path="/collections/street-style-essentials" element={<StreetStyleEssentials />} />
            <Route path="/collections/minimalist-chic" element={<MinimalistChic />} />
            <Route path="/collections/vintage-revival" element={<VintageRevival />} />
            
            {/* Connect pages */}
            <Route path="/submit-design" element={<SubmitDesign />} />
            <Route path="/join-community" element={<JoinCommunity />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
