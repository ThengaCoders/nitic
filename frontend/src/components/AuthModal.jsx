import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Mail, Lock, Building2, User } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', initialSlug = '' }) {
  const [mode, setMode] = useState(initialMode);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    festName: initialSlug || '',
    role: 'Fest Lead / Convenor'
  });

  React.useEffect(() => {
    setMode(initialMode);
    if (initialSlug) {
      setFormData(prev => ({ ...prev, festName: initialSlug }));
    }
  }, [initialMode, initialSlug]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl border border-[#E5EAF1] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Submission Feedback State */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111827]">
              {mode === 'login' ? 'Welcome Back!' : 'Workspace Reserved!'}
            </h3>
            <p className="text-sm text-[#64748B] max-w-sm mx-auto">
              {mode === 'login'
                ? 'Sign in session ready. You are entering the NITIC organizer control panel.'
                : `We reserved the slug nitic.io/fest/${formData.festName || 'your-fest'} for ${formData.college || 'your institution'}.`}
            </p>
            <div className="p-3 bg-blue-50 rounded-xl text-xs font-mono text-[#2563EB] border border-blue-200">
              Ready to create tickets & manage attendees.
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all"
            >
              Continue to Dashboard Preview →
            </button>
          </div>
        ) : (
          /* Form State */
          <div>
            {/* Header Tabs */}
            <div className="flex border-b border-[#E5EAF1] mb-6">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${mode === 'login' ? 'text-[#2563EB]' : 'text-[#64748B] hover:text-[#111827]'
                  }`}
              >
                Sign In
                {mode === 'login' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${mode === 'register' ? 'text-[#2563EB]' : 'text-[#64748B] hover:text-[#111827]'
                  }`}
              >
                Get Started
                {mode === 'register' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                )}
              </button>
            </div>

            <div className="mb-5">
              <h3 className="text-xl font-bold text-[#111827]">
                {mode === 'login' ? 'Access your NITIC Workspace' : 'Set up your fest on NITIC'}
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                {mode === 'login'
                  ? 'Sign in with your organizer or volunteer credentials.'
                  : 'Start publishing tickets and tracking sales in minutes.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Arvind"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-[#E5EAF1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        College / Institution
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nit Calicut"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#E5EAF1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Fest / Event Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ragam 27"
                        value={formData.festName}
                        onChange={(e) => setFormData({ ...formData, festName: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#E5EAF1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Organizer Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="convenor@collegefest.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-[#E5EAF1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  {mode === 'login' ? 'Password' : 'Create Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-[#E5EAF1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Your Organizing Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#E5EAF1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white"
                  >
                    <option>Fest Lead / General Secretary</option>
                    <option>Ticketing & Finance Coordinator</option>
                    <option>Technical Team Lead</option>
                    <option>Gate & Security In-Charge</option>
                    <option>Club President / Representative</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.98] transition-all shadow-md shadow-blue-600/25 cursor-pointer"
              >
                <span>{mode === 'login' ? 'Sign into NITIC' : 'Create Fest Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-[#E5EAF1] flex items-center justify-center gap-2 text-xs text-[#64748B]">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Institutional 256-bit SSL encrypted</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
