import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Music2,
  Cpu,
  Trophy,
  Sparkles,
  Users2
} from 'lucide-react';

const categories = [
  {
    name: 'Technical Fests',
    desc: 'Hackathons, coding sprints & robotics',
    icon: Terminal,
    tag: 'Multi-track passes'
  },
  {
    name: 'Cultural Festivals',
    desc: 'Pro-nights, dance battles & concerts',
    icon: Music2,
    tag: 'Tiered seating'
  },
  {
    name: 'Workshops',
    desc: 'Hands-on bootcamps & masterclasses',
    icon: Cpu,
    tag: 'Seat caps'
  },
  {
    name: 'Competitions',
    desc: 'Case studies, esports & quizzes',
    icon: Trophy,
    tag: 'Team registration'
  },
  {
    name: 'Concerts & Pro-Nights',
    desc: 'Headline artists & outdoor stages',
    icon: Sparkles,
    tag: 'Fast QR check-in'
  },
  {
    name: 'College Communities',
    desc: 'Clubs, student chapters & summits',
    icon: Users2,
    tag: 'Member passes'
  }
];

export default function TrustStrip() {
  return (
    <section className="py-12 sm:py-14 bg-white border-y border-[#E5EAF1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <p className="text-xs font-bold tracking-widest text-[#2563EB] uppercase mb-1.5">
            VERSATILE EVENT ARCHITECTURE
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Made for the people behind the events.
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
            Engineered to handle every scale—from intimate 50-person tech workshops to 15,000+ attendee multi-day campus festivals.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group relative bg-[#F8FAFC] hover:bg-white p-3.5 rounded-xl border border-[#E5EAF1] hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200 flex items-center justify-center mb-2.5">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 leading-snug">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-500 bg-white group-hover:bg-blue-50 px-1.5 py-0.5 rounded border border-slate-200/60">
                    {cat.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
