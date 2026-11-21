import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.04)] py-3.5'
        : 'bg-transparent py-5'
        }`}
      style={{ borderBottom: 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="NITIC Home"
          >
            {/* Geometric Ticket Mark */}
            <div className="relative w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 8.5C5.38071 8.5 6.5 7.38071 6.5 6V4H17.5V6C17.5 7.38071 18.6193 8.5 20 8.5V15.5C18.6193 15.5 17.5 16.6193 17.5 18V20H6.5V18C6.5 16.6193 5.38071 15.5 4 15.5V8.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 9L14 15M14 9L10 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight  text-[#111827]">
                  NITIC
                </span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              How it works
            </a>
            <a
              href="#showcase"
              onClick={(e) => scrollToSection(e, 'showcase')}
              className="text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#benefits"
              onClick={(e) => scrollToSection(e, 'benefits')}
              className="text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              For Organizers
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-sm font-medium text-[#111827] hover:text-[#2563EB] transition-colors rounded-lg hover:bg-slate-100/70"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.98] transition-all shadow-sm shadow-blue-600/25 cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#111827] hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="px-3 py-2 text-base font-medium text-[#111827] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="px-3 py-2 text-base font-medium text-[#111827] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg transition-colors"
            >
              How it works
            </a>
            <a
              href="#showcase"
              onClick={(e) => scrollToSection(e, 'showcase')}
              className="px-3 py-2 text-base font-medium text-[#111827] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg transition-colors"
            >
              Product Dashboard
            </a>
            <a
              href="#benefits"
              onClick={(e) => scrollToSection(e, 'benefits')}
              className="px-3 py-2 text-base font-medium text-[#111827] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-lg transition-colors"
            >
              For Organizers
            </a>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full text-center py-2.5 text-sm font-semibold text-[#111827] border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-lg shadow-sm transition-all"
              >
                <span>Get started for free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
