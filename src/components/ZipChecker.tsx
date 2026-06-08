import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOCAL_ZIP_CODES } from '../data';
import { ShieldCheck, MapPin, Search, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function ZipChecker() {
  const [zipInput, setZipInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'Checked-In' | 'Out-Of-Bounds' | 'Idle'>('Idle');

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim() || zipInput.length < 5) return;

    setLoading(true);
    setStatus('Idle');
    
    setTimeout(() => {
      setLoading(false);
      const cleanedZip = zipInput.trim().substring(0, 5);
      if (LOCAL_ZIP_CODES.includes(cleanedZip)) {
        setStatus('Checked-In');
      } else {
        setStatus('Out-Of-Bounds');
      }
    }, 800);
  };

  return (
    <section className="py-20 bg-purple-50/25 border-b border-purple-100" id="zipchecker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="max-w-2xl mx-auto" id="zipchecker-top">
          <span className="text-xs font-bold text-primary bg-purple-100 border border-purple-200/20 px-2.5 py-1 rounded-md inline-block mb-3.5">
            Zone Diagnostic
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-dark font-display">
            Check If Your Neighborhood Is Covered
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm font-normal">
            Elite serves high-density residential properties across Brentwood, Franklin, Oak Hill, and the entire Greater Nashville region. Enter your 5-digit ZIP code to verify.
          </p>
        </div>

        {/* Form panel with instant status response cards */}
        <div className="mt-8 max-w-md mx-auto" id="zip-input-cabinet">
          <form onSubmit={handleCheckZip} className="flex gap-2 p-1.5 bg-white border border-purple-100 shadow-md rounded-full overflow-hidden focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
            <div className="flex items-center pl-3.5 text-slate-400 shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <input
              type="text"
              pattern="[0-9]*"
              maxLength={5}
              id="zip-code-entry-field"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 5-digit ZIP code (e.g. 37067)"
              className="w-full text-slate-800 text-sm font-semibold p-2 focus:outline-hidden bg-transparent"
              aria-label="Zip Code entry field"
            />
            <button
              type="submit"
              disabled={loading || zipInput.length < 5}
              id="zip-search-submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-300 text-white text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer"
            >
              Check Zone
            </button>
          </form>

          {/* Response Box */}
          <div className="mt-6 min-h-[50px] relative select-none">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-slate-500 font-medium flex items-center justify-center space-x-2 py-2"
                >
                  <Search className="w-4 h-4 text-primary animate-spin" />
                  <span>Scanning regional dispatch grids...</span>
                </motion.div>
              )}

              {!loading && status === 'Checked-In' && (
                <motion.div
                  key="covered"
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3.5 text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-emerald-900 leading-none flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse animate-bounce" />
                      <span>ZONE FULLY INSURED & COVERED</span>
                    </span>
                    <span className="block text-[11px] text-emerald-700 font-medium mt-1">
                      Good news! We have 2 local service trucks operating inside ZIP {zipInput} today. Call-outs can schedule within hours.
                    </span>
                  </div>
                </motion.div>
              )}

              {!loading && status === 'Out-Of-Bounds' && (
                <motion.div
                  key="out"
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center space-x-3.5 text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-amber-900 leading-none">EXTENDED DEVIATION ZONE</span>
                    <span className="block text-[11px] text-amber-700 mt-1 leading-normal">
                      ZIP {zipInput} is outside our immediate dispatch loop, but we can organize a custom travel support technician. Contact our coordinator!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
