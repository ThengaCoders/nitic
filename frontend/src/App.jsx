import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ProductShowcase from './components/ProductShowcase';
import Benefits from './components/Benefits';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function HomePageContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authSlug, setAuthSlug] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL route changes for /login and /register or /get-started
  useEffect(() => {
    if (location.pathname === '/login') {
      setAuthMode('login');
      setAuthModalOpen(true);
    } else if (location.pathname === '/get-started' || location.pathname === '/signup') {
      setAuthMode('register');
      setAuthModalOpen(true);
    }
  }, [location.pathname]);

  const handleOpenAuth = (mode = 'login', slug = '') => {
    setAuthMode(mode);
    setAuthSlug(slug);
    setAuthModalOpen(true);
    if (mode === 'login') {
      navigate('/login', { replace: true });
    } else {
      navigate('/get-started', { replace: true });
    }
  };

  const handleCloseAuth = () => {
    setAuthModalOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Responsive Navigation Bar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenAuth={handleOpenAuth} />

        {/* 2. Social Proof / Category Strip */}
        <TrustStrip />

        {/* 3. Core Features (Bento Grid) */}
        <Features onOpenAuth={handleOpenAuth} />

        {/* 4. How It Works (3 Steps) */}
        <HowItWorks onOpenAuth={handleOpenAuth} />

        {/* 5. Deep-dive Product Showcase */}
        <ProductShowcase onOpenAuth={handleOpenAuth} />

        {/* 6. Benefits for Organizing Teams */}
        <Benefits onOpenAuth={handleOpenAuth} />

        {/* 7. Final High-Impact CTA */}
        <FinalCTA onOpenAuth={handleOpenAuth} />
      </main>

      {/* 8. Detailed Footer */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Interactive Auth / Onboarding Modal (Handles /login & /get-started placeholders) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={handleCloseAuth}
        initialMode={authMode}
        initialSlug={authSlug}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageContent />} />
        <Route path="/login" element={<HomePageContent />} />
        <Route path="/get-started" element={<HomePageContent />} />
        <Route path="/signup" element={<HomePageContent />} />
        <Route path="*" element={<HomePageContent />} />
      </Routes>
    </BrowserRouter>
  );
}
