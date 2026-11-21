import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  CreditCard,
  Lock, 
  Zap, 
  Layers 
} from 'lucide-react';

export default function Benefits({ onOpenAuth }) {
  const benefitsList = [
    {
      id: 'control',
      title: 'Stay in control',
      subtitle: 'Complete Event Governance',
      description: 'Everything your team needs to run multiple fest events, organized in one clean workspace.',
      details: [
        'Manage multiple sub-events, auditoriums, and ticket categories in one place',
        'Role-based permissions for faculty convenors and student core leads',
        'Zero accidental double-bookings or spreadsheet version conflicts'
      ],
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      badge: 'Team Coordination'
    },
    {
      id: 'decisions',
      title: 'Make better decisions',
      subtitle: 'Real-Time Revenue & Booking Telemetry',
      description: "Understand what's selling, what's working and where your event stands.",
      details: [
        'Real-time booking numbers and revenue totals updated instantly',
        'Spot peak registration surges before inventory caps are reached',
        'Transparent ledger for college budget and festival sponsor reporting'
      ],
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      badge: 'Data & Growth'
    },
    {
      id: 'experience',
      title: 'Frictionless, secure checkout',
      subtitle: 'Instant Payments • Zero Form Burden',
      description: 'Simple booking, instant payments and immediate ticket access without personal data hassles.',
      details: [
        'No painful questionnaires or personal data forms for attendees to fill',
        'Instant mobile checkout with fast UPI, Cards, and Netbanking',
        'Immediate digital ticket pass delivery with 99.4% payment success'
      ],
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      badge: 'Instant Checkout'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white border-t border-[#E5EAF1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3">
            Why Organizing Teams Choose NITIC
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-tight">
            Less chaos behind the scenes.<br className="hidden sm:inline" />
            <span className="text-[#2563EB]">More unforgettable moments.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-4 leading-relaxed">
            Running a major college festival has enough moving parts. Your ticketing software shouldn't be one of the headaches.
          </p>
        </div>

        {/* Editorial Layout with Cards & Authentic Event Imagery */}
        <div className="space-y-10">
          {benefitsList.map((benefit, index) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="bg-[#F8FAFC] rounded-2xl border border-[#E5EAF1] p-6 sm:p-8 transition-all duration-300 hover:shadow-md"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Text Column */}
                  <div className={`lg:col-span-7 text-left space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-semibold border border-blue-200">
                      {benefit.badge}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                      {benefit.title}
                    </h3>

                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                      {benefit.description}
                    </p>

                    <div className="space-y-2.5 pt-1">
                      {benefit.details.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-[#111827]">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => onOpenAuth('register')}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] group cursor-pointer"
                      >
                        <span>Learn how organizers run with NITIC</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Curated Authentic Photography Column */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-xl overflow-hidden border border-[#E5EAF1] shadow-sm group">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                        <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/30">
                          {benefit.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
