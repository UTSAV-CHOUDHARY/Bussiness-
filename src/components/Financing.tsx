import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, HelpCircle, CalendarRange, CheckCircle2, DollarSign, Wallet } from 'lucide-react';

export default function Financing() {
  const [loanAmount, setLoanAmount] = useState<number>(350000);
  const [loanTerm, setLoanTerm] = useState<number>(60); // 12, 36, 60, 120 months
  const [promoApr, setPromoApr] = useState<number>(4.9); // 0%, 4.9%, 6.9%
  const [applied, setApplied] = useState<boolean>(false);

  // Instant continuous monthly payment auto-calculator
  const calculateMonthlyPayment = () => {
    if (loanAmount <= 0) return 0;
    const r = (promoApr / 100) / 12; // monthly rate
    const n = loanTerm; // total payments
    if (r === 0) {
      return Math.round(loanAmount / n);
    }
    const payment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(payment);
  };

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="financing">
      {/* Decorative radial gradients */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main section wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column A: Information copy columns */}
          <div className="lg:col-span-5 text-left" id="financing-text-panel">
            <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-md inline-block mb-4">
              Flexible Payments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white leading-tight">
              FINANCING OPTIONS AVAILABLE
            </h2>
            <p className="text-slate-400 font-normal text-xs sm:text-sm leading-relaxed mt-4">
              Major home projects shouldn't drain your personal emergency funds. We maintain multiple direct partnerships with leading home improvement lenders to provide low-interest options that match any financial plan.
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                '0% APR Promotional Financing options (up to 18 Months)',
                'Zero penalty for pre-paying or shortening loan periods',
                'No home-equity required for approval limits',
                'Paperless, rapid pre-approval feedback in less than 90 seconds'
              ].map((point, index) => (
                <li key={index} className="flex items-start text-xs sm:text-sm text-slate-350">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mr-2.5 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10" id="apply-trigger-box">
              {applied ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-100 text-xs text-center"
                >
                  <span className="font-bold block">Application Portal Active!</span>
                  <span>We opened a private pre-assessment terminal. Complete details with your home evaluator.</span>
                </motion.div>
              ) : (
                <button
                  onClick={() => setApplied(true)}
                  id="apply-financing-btn"
                  className="px-8 py-4 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-950/50 cursor-pointer active:scale-95"
                >
                  APPLY NOW
                </button>
              )}
            </div>
          </div>

          {/* Column B: Monthly payment interactive calculator instrument card */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8" id="comfort-loan-calculator">
            <div className="flex items-center space-x-2.5 pb-4 border-b border-white/15 mb-6">
              <Wallet className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-sm tracking-widest text-white uppercase font-display">
                Monthly Comfort Calculator
              </h3>
            </div>

            {/* Slider 1: Loan Amount */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">Total Comfort Budget Required</label>
                <span className="text-base sm:text-lg font-bold text-purple-300 font-mono">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="1000000"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-purple-400 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
                id="loan-amount-slider"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>₹1,00,000</span>
                <span>₹5,50,000</span>
                <span>₹10,00,000</span>
              </div>
            </div>

            {/* Selector 2: Loan Term Months */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-300 mb-2.5 block flex items-center">
                <span>Amortization Period (Months)</span>
                <CalendarRange className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              </label>
              <div className="grid grid-cols-4 gap-2">
                {([12, 36, 60, 120] as const).map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTerm(term)}
                    className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      loanTerm === term
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold'
                        : 'border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    {term} mo <br />
                    <span className="text-[8px] font-normal font-mono opacity-80">({(term / 12).toFixed(0)} yrs)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector 3: APR Rate tiers */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-300 mb-2.5 block leading-none">Interest Rate Promotional Tiers</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { apr: 0, label: '0% Promo APR' },
                  { apr: 4.9, label: '4.9% Fast Approval' },
                  { apr: 6.9, label: '6.9% Standard Lite' }
                ].map((tier) => (
                  <button
                    key={tier.apr}
                    type="button"
                    onClick={() => setPromoApr(tier.apr)}
                    className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      promoApr === tier.apr
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold'
                        : 'border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Results Box */}
            <div className="border-t border-white/15 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between w-full">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block leading-none">Comfort Monthly Amount</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono inline-block mt-2 select-none">
                    ₹{calculateMonthlyPayment().toLocaleString()}
                    <span className="text-xs font-normal text-slate-400 ml-1">/mo</span>
                  </span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="block text-[8px] text-slate-500 uppercase tracking-wide font-semibold leading-none">Amortized APR</span>
                  <span className="text-xs font-mono font-bold text-emerald-450 inline-block mt-1 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                    {promoApr}% APR
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-[9px] text-slate-500 text-center mt-3 leading-normal">
              *Calculations are exact. Final finance disclosures require soft credit inquiries for applicant approvals.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
