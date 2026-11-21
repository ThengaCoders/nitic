import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ticket, 
  BarChart2, 
  Layers, 
  Check, 
  Plus, 
  ShieldCheck, 
  Clock,
  Download,
  Search,
  Lock,
  CreditCard,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Features({ onOpenAuth }) {
  const [selectedTicketTab, setSelectedTicketTab] = useState('regular');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  const ticketTiers = {
    regular: {
      name: 'General Fest Pass',
      price: '₹299',
      sold: '840 / 1,000',
      soldPercent: 84,
      status: 'Selling Fast',
      perks: ['Entry to all 3 days', 'Access to Main Arena', 'Fest Kit & Lanyard']
    },
    vip: {
      name: 'Pro VIP All-Access',
      price: '₹799',
      sold: '298 / 300',
      soldPercent: 99,
      status: 'Almost Sold Out',
      perks: ['Front-row concert zone', 'Exclusive backstage lounge', 'Priority Entry']
    },
    workshop: {
      name: 'Hands-on Workshop Bundle',
      price: '₹499',
      sold: '185 / 200',
      soldPercent: 92,
      status: '15 seats left',
      perks: ['Certified mentor session', 'Cloud credits included', 'Hands-on hardware kit']
    }
  };

  // Orders ledger tracking bookings & payments with zero personal attendee data
  const ordersLedger = [
    { orderId: '#ORD-9842', time: '10:14 AM', tier: 'Pro VIP Pass (x2)', amount: '₹1,598', paymentMethod: 'UPI (GPay)', status: 'Paid & Settled' },
    { orderId: '#ORD-9841', time: '10:11 AM', tier: 'General Fest (x2)', amount: '₹598', paymentMethod: 'Card (Visa)', status: 'Paid & Settled' },
    { orderId: '#ORD-9840', time: '10:05 AM', tier: 'Workshop Bundle', amount: '₹499', paymentMethod: 'UPI (PhonePe)', status: 'Paid & Settled' },
    { orderId: '#ORD-9839', time: '09:58 AM', tier: 'General Fest (x1)', amount: '₹299', paymentMethod: 'NetBanking', status: 'Paid & Settled' }
  ];

  return (
    <section id="features" className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3">
            Core Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-tight">
            Everything your event needs.<br className="hidden sm:inline" />
            <span className="text-[#2563EB]">Nothing you don't.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-4 leading-relaxed">
            Spend less time managing registrations and more time creating events people remember.
          </p>
        </div>

        {/* Bento Grid layout for 4 features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* FEATURE 1: Ticketing that just works (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-[#E5EAF1] p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                  <Ticket className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[#64748B]">
                  Tiered Pricing & Caps
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                Ticketing that just works
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] mt-2 mb-6">
                Create ticket categories, set pricing and control availability without the spreadsheet chaos.
              </p>
            </div>

            {/* Ticket Configuration UI Mockup */}
            <div className="bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] p-4 sm:p-5 text-left">
              <div className="flex items-center justify-between mb-3 border-b border-[#E5EAF1] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Configure Tiers for Ragam 27
                </span>
                <span className="text-xs font-semibold text-[#2563EB] flex items-center gap-1 cursor-pointer hover:underline">
                  <Plus className="w-3.5 h-3.5" /> Add Category
                </span>
              </div>

              {/* Tier Selector Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.keys(ticketTiers).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTicketTab(key)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      selectedTicketTab === key
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-white border border-[#E5EAF1] text-[#111827] hover:bg-slate-50'
                    }`}
                  >
                    {key === 'regular' ? 'General' : key === 'vip' ? 'Pro VIP' : 'Workshop'}
                  </button>
                ))}
              </div>

              {/* Selected Tier Details Preview */}
              <div className="bg-white rounded-lg border border-[#E5EAF1] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">
                      {ticketTiers[selectedTicketTab].name}
                    </h4>
                    <span className="text-xs text-[#64748B]">
                      Capacity limit: {ticketTiers[selectedTicketTab].sold}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-[#111827]">
                      {ticketTiers[selectedTicketTab].price}
                    </span>
                    <div className="text-[10px] font-semibold text-emerald-600">
                      {ticketTiers[selectedTicketTab].status}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#2563EB] h-full rounded-full transition-all duration-300"
                      style={{ width: `${ticketTiers[selectedTicketTab].soldPercent}%` }}
                    />
                  </div>
                </div>

                {/* Perks list */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {ticketTiers[selectedTicketTab].perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#111827]">
                      <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* FEATURE 2: Know what's happening (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 bg-white rounded-2xl border border-[#E5EAF1] p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Sync
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                Know what's happening
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] mt-2 mb-6">
                Track ticket sales, registrations and revenue in real time.
              </p>
            </div>

            {/* Mini Analytics Dashboard Visual */}
            <div className="bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] p-4 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#64748B]">Real-Time Velocity</div>
                  <div className="text-xl font-bold text-[#111827]">₹38,200 <span className="text-xs font-normal text-[#64748B]">today</span></div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    +42% spike
                  </span>
                </div>
              </div>

              {/* Hourly Activity Bar Representation */}
              <div className="bg-white p-3 rounded-lg border border-[#E5EAF1]">
                <div className="text-[11px] font-semibold text-[#111827] mb-2 flex justify-between">
                  <span>Booking Velocity by Hour</span>
                  <span className="text-[#2563EB] font-bold">1,248 Bookings Total</span>
                </div>
                <div className="flex items-end justify-between gap-1.5 h-16 pt-2">
                  {[25, 45, 30, 70, 95, 60, 85, 100, 75, 90].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-t transition-all ${
                          i === 7 ? 'bg-[#2563EB]' : 'bg-blue-100 hover:bg-blue-200'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[8px] text-slate-400">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion stat pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white rounded border border-[#E5EAF1]">
                  <div className="text-[#64748B] text-[10px]">Payment success rate</div>
                  <div className="font-bold text-emerald-600">99.4%</div>
                </div>
                <div className="p-2 bg-white rounded border border-[#E5EAF1]">
                  <div className="text-[#64748B] text-[10px]">Avg checkout time</div>
                  <div className="font-bold text-[#111827]">14 seconds</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FEATURE 3: Every order & ticket, accounted for (Span 6) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 bg-white rounded-2xl border border-[#E5EAF1] p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Zero Attendee Data Stored
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                Every order & ticket, accounted for
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] mt-2 mb-6">
                Manage ticket categories and track orders in real time without the liability of personal data collection.
              </p>
            </div>

            {/* Orders Ledger Mockup (Only Order IDs, Tiers, Amounts, & Payment Status) */}
            <div className="bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] overflow-hidden text-left">
              <div className="p-3 bg-white border-b border-[#E5EAF1] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E5EAF1] text-xs text-[#64748B]">
                  <Search className="w-3.5 h-3.5" />
                  <span className="font-medium">Filter by Order ID or Tier...</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[11px] font-medium text-[#64748B] hover:text-[#111827] flex items-center gap-1 px-2.5 py-1 rounded border border-[#E5EAF1] bg-white">
                    <Download className="w-3 h-3" /> Export Ledger
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E5EAF1]">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Order Ref</th>
                      <th className="py-2.5 px-3 font-semibold">Tier</th>
                      <th className="py-2.5 px-3 font-semibold">Amount</th>
                      <th className="py-2.5 px-3 font-semibold">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAF1] bg-white">
                    {ordersLedger.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3">
                          <div className="font-mono font-bold text-[#111827]">{row.orderId}</div>
                          <div className="text-[10px] text-[#64748B]">{row.time}</div>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-[#111827]">
                          {row.tier}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-[#111827]">
                          {row.amount}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Check className="w-2.5 h-2.5" />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* FEATURE 4: SECURE PAYMENT CHECKOUT WINDOW (Span 6) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6 bg-white rounded-2xl border border-[#E5EAF1] p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Bank Encryption
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                Secure payment checkout window
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] mt-2 mb-6">
                Instant UPI, Card and Netbanking payments with zero failed transactions and immediate ticket pass issuance.
              </p>
            </div>

            {/* Secure Payment Checkout Window Mockup */}
            <div className="bg-[#F8FAFC] rounded-xl border border-[#E5EAF1] p-4 text-left">
              <div className="bg-white rounded-xl border border-[#E5EAF1] p-4 shadow-sm space-y-3.5">
                
                {/* Checkout Window Top Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E5EAF1]">
                  <div>
                    <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">NITIC SECURE CHECKOUT</span>
                    <h4 className="text-xs font-bold text-[#111827]">Ragam 27 Pro-Night • 2x Passes</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#111827]">₹598</span>
                    <div className="text-[9px] text-emerald-600 font-medium">Zero Fee</div>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('upi')}
                    className={`py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1 text-[11px] transition-all ${
                      selectedPaymentMethod === 'upi'
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-[#64748B]'
                    }`}
                  >
                    <Zap className="w-3 h-3" />
                    <span>UPI Fast</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('cards')}
                    className={`py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1 text-[11px] transition-all ${
                      selectedPaymentMethod === 'cards'
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-[#64748B]'
                    }`}
                  >
                    <CreditCard className="w-3 h-3" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('netbanking')}
                    className={`py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1 text-[11px] transition-all ${
                      selectedPaymentMethod === 'netbanking'
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-[#64748B]'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* Selected Method Details */}
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E5EAF1] text-xs space-y-2">
                  {selectedPaymentMethod === 'upi' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                          ⚡
                        </span>
                        <div>
                          <div className="font-bold text-[#111827]">Google Pay / PhonePe / Paytm</div>
                          <div className="text-[10px] text-[#64748B]">Auto-redirect to your UPI app</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        1-Click Pay
                      </span>
                    </div>
                  )}

                  {selectedPaymentMethod === 'cards' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-[10px]">
                          💳
                        </span>
                        <div>
                          <div className="font-bold text-[#111827]">Visa, Mastercard, RuPay</div>
                          <div className="text-[10px] text-[#64748B]">Debit and credit cards supported</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        3D Secure
                      </span>
                    </div>
                  )}

                  {selectedPaymentMethod === 'netbanking' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                          🏦
                        </span>
                        <div>
                          <div className="font-bold text-[#111827]">All Major Indian Banks</div>
                          <div className="text-[10px] text-[#64748B]">HDFC, SBI, ICICI, Axis & 50+ banks</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                        Direct Netbanking
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button & Trust Seal */}
                <div className="pt-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>RBI compliant multi-rail gateway</span>
                  </div>
                  <button className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1">
                    <span>Pay ₹598</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
