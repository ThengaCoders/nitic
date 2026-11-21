import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenAuth }) {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
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
    <footer className="bg-white border-t border-[#E5EAF1] text-[#111827] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5EAF1]">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 focus:outline-none inline-flex"
            >
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 8.5C5.38071 8.5 6.5 7.38071 6.5 6V4H17.5V6C17.5 7.38071 18.6193 8.5 20 8.5V15.5C18.6193 15.5 17.5 16.6193 17.5 18V20H6.5V18C6.5 16.6193 5.38071 15.5 4 15.5V8.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M10 9L14 15M14 9L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#111827]">
                NITIC
              </span>
            </a>

            <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">
              The modern event ticketing and management platform built specifically for college fests, technical summits, and campus organizing committees.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-[#64748B]">All systems operational</span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs font-mono text-[#64748B]">v2.4 Production</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-[#2563EB] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-[#2563EB] transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#showcase" onClick={(e) => scrollToSection(e, 'showcase')} className="hover:text-[#2563EB] transition-colors">
                  Organizer Dashboard
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-[#2563EB] transition-colors">
                  Secure Checkout Window
                </a>
              </li>
              <li>
                <button type="button" onClick={() => onOpenAuth('register')} className="hover:text-[#2563EB] transition-colors cursor-pointer">
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Event Types */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              For Organizers
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="hover:text-[#2563EB] transition-colors">
                  Technical Fests
                </a>
              </li>
              <li>
                <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="hover:text-[#2563EB] transition-colors">
                  Cultural Festivals
                </a>
              </li>
              <li>
                <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="hover:text-[#2563EB] transition-colors">
                  Hackathons & Sprints
                </a>
              </li>
              <li>
                <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="hover:text-[#2563EB] transition-colors">
                  College Clubs & Societies
                </a>
              </li>
              <li>
                <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="hover:text-[#2563EB] transition-colors">
                  Concert & Stage Nights
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <button type="button" onClick={() => onOpenAuth('login')} className="hover:text-[#2563EB] transition-colors cursor-pointer">
                  Sign in
                </button>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); onOpenAuth('contact'); }} className="hover:text-[#2563EB] transition-colors">
                  Contact Team
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenAuth('privacy'); }} className="hover:text-[#2563EB] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); onOpenAuth('terms'); }} className="hover:text-[#2563EB] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" onClick={(e) => { e.preventDefault(); onOpenAuth('security'); }} className="hover:text-[#2563EB] transition-colors">
                  256-Bit SSL Security
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© 2026 NITIC Platforms. Built for student organizers everywhere.</p>
          <div className="flex items-center gap-6">
            <span>White & Blue SaaS Architecture</span>
            <span>Zero Attendee Data Collection</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
