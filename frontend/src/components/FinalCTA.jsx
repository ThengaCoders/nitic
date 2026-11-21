import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function FinalCTA({ onOpenAuth }) {
  const [festSlug, setFestSlug] = useState('');

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    onOpenAuth('register', festSlug.trim() || 'ragam-27');
  };

  return (
    <section className="py-20 bg-[#163B78] text-white relative overflow-hidden">
      
      {/* Background subtle mesh */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2563EB]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-5"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          <span>Launch In Minutes</span>
        </motion.div>

        {/* Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-white max-w-3xl mx-auto"
        >
          Ready to make your next event easier?
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base sm:text-xl text-blue-100/90 mt-4 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Bring your events, tickets and bookings together with NITIC.
        </motion.p>

        {/* Interactive Fast URL Claim Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 max-w-xl mx-auto"
        >
          <form
            onSubmit={handleClaimSubmit}
            className="p-1.5 sm:p-2 bg-white rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 text-left"
          >
            <div className="flex items-center w-full px-3 py-2 text-sm text-[#111827]">
              <span className="text-[#64748B] font-mono select-none hidden sm:inline">nitic.io/fest/</span>
              <input
                type="text"
                placeholder="ragam-27"
                value={festSlug}
                onChange={(e) => setFestSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="w-full bg-transparent focus:outline-none font-medium text-[#111827] placeholder:text-slate-400 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.98] transition-all whitespace-nowrap shadow-md shadow-blue-600/30 cursor-pointer"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        {/* Secondary Sign In Link */}
        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-blue-200">
          <span>Already have an account?</span>
          <button
            type="button"
            onClick={() => onOpenAuth('login')}
            className="font-semibold text-white underline underline-offset-4 hover:text-blue-100 transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-7 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-blue-200/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant fest workspace setup</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Zero personal attendee data liability</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Real-time booking metrics</span>
          </div>
        </div>

      </div>
    </section>
  );
}
