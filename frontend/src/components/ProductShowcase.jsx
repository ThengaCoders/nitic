import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Ticket, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Building, 
  Layers, 
  Lock,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function ProductShowcase({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section id="showcase" className="py-20 bg-gradient-to-b from-[#F8FAFC] via-[#EFF6FF]/40 to-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5EAF1] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            The Organizer Command Center
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-tight">
            Your entire event.<br className="hidden sm:inline" />
            <span className="text-[#2563EB]">One clear picture.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-4 leading-relaxed">
            Monitor real-time bookings, total revenue and secure payment settlements with complete clarity and zero personal data clutter.
          </p>
        </div>

        {/* Big Product Mockup Container */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-2xl border border-[#E5EAF1] shadow-xl shadow-blue-900/10 overflow-hidden"
        >
          {/* Top Mockup Header Bar */}
          <div className="bg-[#F8FAFC] border-b border-[#E5EAF1] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left Brand & Event Switcher */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#111827]">Ragam 27</span>
                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Live Sales Active
                </span>
              </div>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white text-[#2563EB] shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                Event Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'orders'
                    ? 'bg-white text-[#2563EB] shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                Orders Stream
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('checkout')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'checkout'
                    ? 'bg-white text-[#2563EB] shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                Checkout & Payouts
              </button>
            </div>

            {/* Privacy Badge on Top Bar */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Attendee Data Collection</span>
            </div>

          </div>

          {/* Main Dashboard Workspace Body */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 text-left">
            
            {/* Top Stat Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                  <span>Gross Ticket Revenue</span>
                  <CreditCard className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="text-2xl font-extrabold text-[#111827] tracking-tight">₹1,24,500</div>
                <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last fest</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                  <span>Total Bookings</span>
                  <Ticket className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="text-2xl font-extrabold text-[#111827] tracking-tight">1,248</div>
                <div className="text-xs text-[#64748B] mt-1">
                  Across 8 sub-events
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                  <span>Events Published</span>
                  <Building className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="text-2xl font-extrabold text-[#111827] tracking-tight">8 Events</div>
                <div className="text-xs text-[#2563EB] font-medium mt-1">
                  3 sold out
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1]">
                <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
                  <span>Payment Success</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">99.4%</div>
                <div className="text-xs text-[#64748B] mt-1">
                  Direct Bank Settlement
                </div>
              </div>

            </div>

            {/* Interactive View Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Sales Graph & Velocity */}
                <div className="lg:col-span-8 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">Revenue & Bookings Trajectory</h4>
                      <p className="text-xs text-[#64748B]">Cumulative ticket velocity over last 7 days</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Peak Spike: Day 5
                      </span>
                    </div>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="h-44 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="showcaseGradient3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="40" x2="500" y2="40" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" />

                      <path
                        d="M0,140 Q80,130 150,110 T280,70 T380,45 T500,20 L500,160 L0,160 Z"
                        fill="url(#showcaseGradient3)"
                      />

                      <path
                        d="M0,140 Q80,130 150,110 T280,70 T380,45 T500,20"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      <circle cx="150" cy="110" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                      <circle cx="280" cy="70" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                      <circle cx="380" cy="45" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                      <circle cx="500" cy="20" r="4.5" fill="#2563EB" />
                    </svg>
                  </div>

                  <div className="flex justify-between text-xs text-[#64748B] pt-2.5 border-t border-slate-200 mt-2">
                    <span>Oct 08</span>
                    <span>Oct 10</span>
                    <span>Oct 12</span>
                    <span>Oct 14</span>
                    <span className="font-semibold text-[#111827]">Today (1,248 Bookings)</span>
                  </div>
                </div>

                {/* Sub-Events List on Showcase */}
                <div className="lg:col-span-4 bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5EAF1]">
                    <span className="text-xs font-bold text-[#111827]">Sub-Events Performance</span>
                    <span className="text-[10px] text-[#64748B]">8 Total</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5EAF1]">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#111827]">
                        <span>Ragam Pro-Night</span>
                        <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[10px]">96% Full</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">482 / 500 bookings • ₹1,44,600</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-[#E5EAF1]">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#111827]">
                        <span>Battle of the Bands</span>
                        <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[10px]">Sold Out</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">320 / 350 bookings • ₹32,000</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-[#E5EAF1]">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#111827]">
                        <span>36-Hour Hackathon</span>
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">98% Full</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">196 / 200 bookings • ₹58,800</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-[#E5EAF1]">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#111827]">
                        <span>RoboSoccer Finals</span>
                        <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">Active</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">250 / 450 bookings • Free RSVP</div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Orders Stream */}
            {activeTab === 'orders' && (
              <div className="bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Live Orders Stream</h4>
                    <p className="text-xs text-[#64748B]">Real-time ticket purchases with zero personal data overhead</p>
                  </div>
                  <span className="text-xs font-semibold text-[#2563EB]">Export Orders (.csv)</span>
                </div>

                <div className="divide-y divide-[#E5EAF1] bg-white rounded-lg border border-[#E5EAF1]">
                  {[
                    { id: 'ORD-9942', tier: 'Pro All-Access Pass (x2)', amount: '₹1,598', time: '1 min ago', payment: 'UPI Verified', status: 'Settled' },
                    { id: 'ORD-9941', tier: 'General Fest Pass (x2)', amount: '₹598', time: '4 min ago', payment: 'Card Verified', status: 'Settled' },
                    { id: 'ORD-9940', tier: 'Workshop Pass (x1)', amount: '₹499', time: '8 min ago', payment: 'UPI Verified', status: 'Settled' },
                    { id: 'ORD-9939', tier: 'Pro All-Access Pass (x1)', amount: '₹799', time: '14 min ago', payment: 'NetBanking', status: 'Settled' }
                  ].map((order, i) => (
                    <div key={i} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-[10px]">
                          #ORD
                        </div>
                        <div>
                          <div className="font-mono font-bold text-[#111827]">{order.id}</div>
                          <div className="text-[11px] text-[#64748B]">{order.tier} • {order.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#111827]">{order.amount}</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">{order.payment}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checkout & Payouts Tab */}
            {activeTab === 'checkout' && (
              <div className="bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Secure Checkout Gateway & Payouts</h4>
                    <p className="text-xs text-[#64748B]">Multi-rail routing through UPI, Cards, and Netbanking with zero checkout drop-offs</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-white rounded-lg border border-[#E5EAF1]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-[#111827]">UPI Rail (GPay/PhonePe)</span>
                      <span className="text-emerald-600 font-semibold">84% share</span>
                    </div>
                    <div className="text-lg font-bold text-[#111827]">0.3s avg latency</div>
                    <div className="text-[10px] text-[#64748B]">Instant 1-click mobile redirect</div>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-[#E5EAF1]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-[#111827]">Debit & Credit Cards</span>
                      <span className="text-emerald-600 font-semibold">12% share</span>
                    </div>
                    <div className="text-lg font-bold text-[#111827]">3D Secure v2</div>
                    <div className="text-[10px] text-[#64748B]">Visa, Mastercard, RuPay</div>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-[#E5EAF1]">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-[#111827]">Direct Fest Payout</span>
                      <span className="text-emerald-600 font-semibold">Automated</span>
                    </div>
                    <div className="text-lg font-bold text-emerald-600">₹1,24,500 Reconciled</div>
                    <div className="text-[10px] text-[#64748B]">Transferred to College Account</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Platform Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5EAF1]">
              <div className="text-xs text-[#64748B]">
                Configure all event categories and start collecting secure payments in minutes.
              </div>
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] shadow-xs cursor-pointer"
              >
                <span>Launch your fest dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
