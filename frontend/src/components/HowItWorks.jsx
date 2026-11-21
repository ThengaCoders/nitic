import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  ArrowRight, 
  Check, 
  Copy, 
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Building2,
  Lock
} from 'lucide-react';

export default function HowItWorks({ onOpenAuth }) {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const steps = [
    {
      step: '01',
      title: 'Create your event',
      description: 'Set up your event, add tickets, define registration details and publish in minutes.',
      details: [
        'Add multiple sub-events under your main fest brand',
        'Configure Free, Paid, VIP, or Workshop ticket categories',
        'Set strict capacity caps without collecting unnecessary attendee forms'
      ]
    },
    {
      step: '02',
      title: 'Start selling',
      description: 'Share your booking link through your fest website, social media or community.',
      details: [
        'Dedicated clean URL: nitic.io/fest/your-fest',
        'Instant mobile checkout window with quick UPI and card options',
        'Attendees receive an encrypted digital pass instantly upon payment'
      ]
    },
    {
      step: '03',
      title: 'Track revenue & payouts',
      description: 'Monitor orders, verify transactions in real time, and receive automated payouts directly to your organizing committee.',
      details: [
        'Real-time total booking counter and gross revenue ledger',
        'Bank-grade payment routing with 99.4% success rates',
        'Direct automated payout reconciliation to college fest accounts'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-[#E5EAF1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3">
            Simple 3-Step Flow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-tight">
            From idea to event day.<br className="hidden sm:inline" />
            <span className="text-[#2563EB]">All in one place.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-4 leading-relaxed">
            Eliminate endless spreadsheets and clunky forms. NITIC coordinates your entire fest lifecycle.
          </p>
        </div>

        {/* Steps Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-10">
          {steps.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                activeStep === index
                  ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs'
                  : 'bg-[#F8FAFC] border-[#E5EAF1] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  activeStep === index ? 'bg-[#2563EB] text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  Step {item.step}
                </span>
                <span className={`text-xs font-semibold ${activeStep === index ? 'text-[#2563EB]' : 'text-slate-400'}`}>
                  0{index + 1}/03
                </span>
              </div>
              <h3 className={`text-base font-bold ${activeStep === index ? 'text-[#163B78]' : 'text-[#111827]'}`}>
                {item.title}
              </h3>
              <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
                {item.description}
              </p>
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Visual Stage for the Active Step */}
        <motion.div 
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#F8FAFC] rounded-2xl border border-[#E5EAF1] p-6 sm:p-8 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Explanation & Bullet Points */}
            <div className="lg:col-span-5 text-left space-y-4">
              <div>
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  Detailed Walkthrough
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                  {steps[activeStep].title}
                </h3>
                <p className="text-[#64748B] text-sm sm:text-base mt-2">
                  {steps[activeStep].description}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {steps[activeStep].details.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#111827]">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAuth('register')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-all shadow-xs cursor-pointer"
                >
                  <span>Create your fest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#64748B]">Zero attendee data overhead</span>
              </div>
            </div>

            {/* Step Realistic Mockup Representation */}
            <div className="lg:col-span-7">
              {activeStep === 0 && (
                /* Step 1 Visual: Event Creation Interface */
                <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-xs text-left space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <span className="text-xs font-bold text-[#111827]">Fest Sub-Event Setup</span>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Draft Saved
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">Sub-Event Name</label>
                      <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1] text-xs font-medium text-[#111827]">
                        Ragam 27: Battle of the Bands
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1">Venue Location</label>
                        <div className="p-2 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1] text-xs text-[#64748B]">
                          Open Air Theatre
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] mb-1">Date & Time</label>
                        <div className="p-2 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1] text-xs text-[#64748B]">
                          Oct 15, 2026 • 05:00 PM
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">Ticket Categories & Caps</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded bg-blue-50 border border-blue-200 text-xs">
                          <div className="font-bold text-[#2563EB]">Standard</div>
                          <div className="text-[10px] text-[#64748B]">₹299 • Cap: 300</div>
                        </div>
                        <div className="p-2 rounded bg-indigo-50 border border-indigo-200 text-xs">
                          <div className="font-bold text-indigo-700">VIP Stage</div>
                          <div className="text-[10px] text-[#64748B]">₹799 • Cap: 50</div>
                        </div>
                        <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-xs">
                          <div className="font-bold text-emerald-700">Workshop</div>
                          <div className="text-[10px] text-[#64748B]">₹499 • Cap: 40</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button className="px-3.5 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-lg shadow-xs">
                        Publish to Fest Page →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                /* Step 2 Visual: Fast Booking Page Preview */
                <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-xs text-left space-y-3.5">
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Share2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span className="text-xs font-mono font-medium text-[#163B78] truncate">
                        https://nitic.io/fest/ragam-27
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 bg-white text-xs font-semibold text-[#2563EB] rounded border border-blue-200 hover:bg-blue-50 shrink-0"
                    >
                      {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedLink ? 'Copied' : 'Copy link'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#111827]">Ragam 27 • Instant Ticket Pass</div>
                        <div className="text-[10px] text-[#64748B]">Select tickets without lengthy forms</div>
                      </div>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        No Form Required
                      </span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-[#E5EAF1] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#111827]">Pro All-Access (3 Days)</div>
                        <div className="text-[10px] text-[#64748B]">Includes all stages & competitions</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-extrabold text-[#111827]">₹799</div>
                        <span className="text-[10px] text-[#2563EB] font-bold">+ 1 Selected</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                      <span className="font-semibold text-[#111827]">Total: ₹799</span>
                      <button className="px-3 py-1.5 bg-[#2563EB] text-white font-semibold rounded text-xs">
                        Instant Pay (UPI/Card) →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                /* Step 3 Visual: Revenue Reconciliation & Automated Settlement */
                <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-xs text-left space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-[#111827]">Automated Revenue Reconciliation</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Direct Bank Payout Active
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1]">
                      <div className="text-[10px] text-[#64748B]">Total Settled</div>
                      <div className="text-base font-bold text-[#111827]">₹1,24,500</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">100% Reconciled</div>
                    </div>

                    <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1]">
                      <div className="text-[10px] text-[#64748B]">Success Rate</div>
                      <div className="text-base font-bold text-emerald-600">99.4%</div>
                      <div className="text-[9px] text-[#64748B]">Zero failed checkouts</div>
                    </div>

                    <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1]">
                      <div className="text-[10px] text-[#64748B]">Destination</div>
                      <div className="text-base font-bold text-[#111827]">Fest Account</div>
                      <div className="text-[9px] text-[#64748B]">HDFC Bank •••• 4092</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </div>
                      <div>
                        <div className="font-bold text-emerald-950">Payment Settled • Order #ORD-7721</div>
                        <div className="text-[10px] text-emerald-700">₹799 transferred to organizing account</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800">Just now</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
