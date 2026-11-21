import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  ChevronRight,
  Check,
  MapPin,
  Clock,
  Plus,
  ShieldCheck,
  CreditCard,
  Lock,
  Sparkles
} from 'lucide-react';

export default function Hero({ onOpenAuth }) {
  const scrollToSection = (sectionId) => {
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

  // Multiple events data to display on the dashboard screen
  const listedEvents = [
    {
      id: 1,
      title: 'Ragam 27 Pro-Night',
      venue: 'NITC Main Ground',
      date: 'Oct 16 • 07:00 PM',
      sold: 482,
      total: 500,
      revenue: '₹1,44,600',
      status: 'Selling Fast',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
      progress: 96
    },
    {
      id: 2,
      title: 'TatHack 2.0',
      venue: 'IT Complex',
      date: 'Oct 14-15 • 36 Hours',
      sold: 196,
      total: 200,
      revenue: '₹58,800',
      status: 'Almost Full',
      statusColor: 'text-rose-700 bg-rose-50 border-rose-200',
      progress: 98
    },
    {
      id: 3,
      title: 'Robo Wars',
      venue: 'Open Air Theatre',
      date: 'Oct 15 • 05:00 PM',
      sold: 320,
      total: 350,
      revenue: '₹32,000',
      status: 'Live',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      progress: 91
    }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-[#F8FAFC]">

      {/* ============================================================== */}
      {/* AESTHETIC BACKGROUND: Glowing Blurred Blue Orbs & Dot Matrix   */}
      {/* ============================================================== */}

      {/* Layer 1: Aesthetic Micro-Dot Matrix with Smooth Radial Falloff */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22] -z-10"
        style={{
          backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 80%)'
        }}
      />

      {/* Layer 2: Main Vibrant Blue Glowing Orb (Centered behind text & dashboard) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full pointer-events-none -z-10 animate-pulse [animation-duration:8s]"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.28) 0%, rgba(59, 130, 246, 0.22) 35%, rgba(99, 102, 241, 0.14) 55%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Layer 3: Concentrated Luminous Blue Core behind the Dashboard */}
      <div
        className="absolute top-[45%] right-[12%] w-[480px] h-[440px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(96, 165, 250, 0.18) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Layer 4: Soft Accent Glow in the Top Left */}
      <div
        className="absolute top-[18%] left-[8%] w-[380px] h-[340px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.10) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />

      {/* ============================================================== */}
      {/* HERO CONTENT CONTAINER                                         */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5EAF1] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-[#163B78] uppercase">
                EVENT MANAGEMENT, SIMPLIFIED
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              Your events deserve a{' '}
              <span className="text-[#2563EB] relative whitespace-nowrap">
                better way
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-2.5 text-blue-200 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,15 Q50,0 100,15 L100,20 Q50,5 0,20 Z" />
                </svg>
              </span>{' '}
              to run.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-xl font-normal">
              From ticket sales and secure payments to real-time booking tracking and revenue monitoring, run your entire event from one simple platform.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.99] transition-all shadow-md shadow-blue-500/25 group cursor-pointer"
              >
                <span>Get started for free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('showcase')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-[#111827] bg-white/90 backdrop-blur-sm border border-[#E5EAF1] hover:bg-white hover:border-slate-300 transition-all shadow-xs cursor-pointer"
              >
                <span>Explore the platform</span>
                <ChevronRight className="w-4 h-4 text-[#64748B]" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Screen with Multiple Events Listed (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="hidden lg:block lg:col-span-6 relative mt-4 lg:mt-0"
          >
            {/* Ambient Card Shadow Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-80 -z-10" />

            {/* Laptop / Browser Screen Frame */}
            <div className="relative bg-white rounded-2xl border border-[#E5EAF1] shadow-2xl shadow-blue-950/10 overflow-hidden transition-all duration-300 backdrop-blur-sm">

              {/* Window Header */}
              <div className="bg-[#F8FAFC] border-b border-[#E5EAF1] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-medium text-[#64748B] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    nitic.in/ragam-27
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Ragam 27
                  </span>
                </div>
              </div>

              {/* Inside Screen: Multiple Events Management Dashboard */}
              <div className="p-4 sm:p-5 space-y-4 text-left">

                {/* Screen Header & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5EAF1]">
                  <div>
                    <h2 className="text-base font-bold text-[#111827]">
                      Ragam-27
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      South India's Biggest Cultural Festival
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => onOpenAuth('register')}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#2563EB] text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Event</span>
                    </button>
                  </div>
                </div>

                {/* Aggregated Totals Row (Only Bookings & Revenue) */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                    <div className="text-[10px] font-medium text-[#64748B]">Total Revenue</div>
                    <div className="text-base sm:text-lg font-bold text-[#111827]">₹1,24,500</div>
                    <div className="text-[9px] font-semibold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>+18.4% today</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                    <div className="text-[10px] font-medium text-[#64748B]">Total Bookings</div>
                    <div className="text-base sm:text-lg font-bold text-[#111827]">1,248</div>
                    <div className="text-[9px] text-[#64748B]">of 1,500 cap (83%)</div>
                  </div>

                  <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                    <div className="text-[10px] font-medium text-[#64748B]">Active Events</div>
                    <div className="text-base sm:text-lg font-bold text-[#111827]">8 Listed</div>
                    <div className="text-[9px] text-blue-600 font-semibold">3 arenas live</div>
                  </div>
                </div>

                {/* The List of Multiple Events */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold text-[#111827] flex items-center justify-between">
                    <span>Events</span>
                    <span className="text-[11px] text-[#64748B]">Real-time booking progress</span>
                  </div>

                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-0.5">
                    {listedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 bg-white hover:bg-slate-50/80 rounded-xl border border-[#E5EAF1] transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#111827]">{event.title}</span>
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${event.statusColor}`}>
                              {event.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-[#64748B]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {event.venue}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {event.date}
                            </span>
                          </div>
                        </div>

                        {/* Event Bookings Count & Capacity Progress */}
                        <div className="sm:text-right min-w-[130px]">
                          <div className="flex sm:justify-end items-center gap-1.5 text-xs font-semibold text-[#111827]">
                            <span>{event.sold} / {event.total}</span>
                            <span className="text-[10px] text-[#64748B] font-normal">bookings</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 sm:ml-auto">
                            <div
                              className="bg-[#2563EB] h-full rounded-full"
                              style={{ width: `${event.progress}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                            {event.revenue}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Element 1: Aggregate Booking Confirmed Notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#E5EAF1] shadow-xl items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <span>Booking Confirmed</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-[#64748B]">
                  Order #7821 • 2x Passes • <span className="text-emerald-700 font-medium">₹1,598</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 2: Secure Payment Checkout Window Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#E5EAF1] shadow-xl items-center gap-3"
            >
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#111827] flex items-center gap-1">
                  <span>Secure Checkout</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">256-bit</span>
                </div>
                <div className="text-[10px] text-[#64748B]">UPI • Cards • Instant Payout</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
