import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { 
  Home as HomeIcon, 
  Wind, 
  Flame, 
  Wrench, 
  ShieldAlert, 
  Thermometer, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  X, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface ServicesProps {
  onOpenEstimatorWithDetails: (serviceId: string) => void;
}

export default function Services({ onOpenEstimatorWithDetails }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  // Custom calculator states
  const [areaInput, setAreaInput] = useState<number>(2000); // sq ft or tonnage
  const [tierSelection, setTierSelection] = useState<'Standard' | 'Premium' | 'Ultra-Lifetime'>('Premium');
  const [extraDucts, setExtraDucts] = useState<boolean>(false);
  const [roofPitch, setRoofPitch] = useState<'Flat-Low' | 'Medium' | 'Steep-Complex'>('Medium');

  const getIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'Home': return <HomeIcon className={className} />;
      case 'Wind': return <Wind className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Thermometer': return <Thermometer className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  // Live dynamic cost estimator inside component
  const calculateLiveEstimate = (serviceId: string) => {
    let basePricePerUnit = 0;
    let multiplier = 1;

    if (tierSelection === 'Standard') multiplier = 0.85;
    if (tierSelection === 'Ultra-Lifetime') multiplier = 1.35;

    switch (serviceId) {
      case 'roof-replacement':
        basePricePerUnit = 550; // ₹550 per sq ft
        let pitchMod = 1.0;
        if (roofPitch === 'Flat-Low') pitchMod = 0.9;
        if (roofPitch === 'Steep-Complex') pitchMod = 1.3;
        return Math.round(areaInput * basePricePerUnit * multiplier * pitchMod);

      case 'ac-installation':
        // here areaInput represents ton size (1.5 to 5 tons)
        // Let's normalize tonnage
        const tonnage = Math.max(1.5, Math.min(5.0, Number((areaInput / 500).toFixed(1))));
        basePricePerUnit = 125000; // ₹1,25,000 per ton
        const ductworkFee = extraDucts ? 90000 : 0;
        return Math.round(tonnage * basePricePerUnit * multiplier) + ductworkFee;

      case 'heating-systems':
        const furnaceSizeFactor = Math.max(40, Math.min(120, Math.round(areaInput / 25))); // heating BTUs
        basePricePerUnit = 4200; 
        return Math.round(furnaceSizeFactor * basePricePerUnit * multiplier) + (extraDucts ? 75000 : 0);

      case 'roof-repairs':
        basePricePerUnit = 18000;
        const severityMultiplier = roofPitch === 'Steep-Complex' ? 1.5 : 1.0;
        return Math.round(basePricePerUnit * multiplier * severityMultiplier * (areaInput < 1500 ? 1 : 2.2));

      case 'hvac-maintenance':
        return tierSelection === 'Standard' ? 10500 : tierSelection === 'Premium' ? 18500 : 25000;

      case 'insulation':
        basePricePerUnit = 140; // ₹140 per sq ft
        return Math.round(areaInput * basePricePerUnit * multiplier);

      default:
        return 1200;
    }
  };

  const getAreaLabel = (id: string) => {
    if (id === 'ac-installation' || id === 'heating-systems') {
      return "Property Size (Sq Ft)";
    }
    if (id === 'roof-replacement' || id === 'insulation') {
      return "Roof / Attic Footprint Area (Sq Ft)";
    }
    return "Damaged Area Scale";
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-slate-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#5c3eb8_0.05rem,transparent_0.05rem)] [background-size:1.5rem_1.5rem] opacity-3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 bg-purple-50 text-primary px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-purple-100"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Premium Property Protection</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight font-display"
            id="services-heading"
          >
            OUR KEY SERVICES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 mt-4 text-base sm:text-lg"
          >
            From emergency weather patching to whisper-quiet climate engineering, we deliver flawless results backed by the industry's highest safety warranties.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="services-grid">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                setSelectedService(service);
                // Reset custom inputs to defaults on select
                if (service.id === 'ac-installation' || service.id === 'heating-systems') {
                  setAreaInput(1800);
                } else if (service.id === 'roof-replacement') {
                  setAreaInput(2200);
                } else {
                  setAreaInput(1200);
                }
              }}
              className="bg-white rounded-2xl border border-purple-100 hover:border-primary/40 shadow-xs hover:shadow-lg transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full group cursor-pointer"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors duration-200">
                  {service.title}
                </h3>
                
                {/* Category tag */}
                <span className="inline-block mt-2.5 px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-purple-100/60 text-primary border border-purple-100/50">
                  {service.category}
                </span>

                <p className="text-slate-600 font-normal text-sm mt-4 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                
                <ul className="mt-5 space-y-2 border-t border-slate-50 pt-4">
                  {service.features.slice(0, 2).map((feat, i) => (
                    <li key={i} className="flex items-start text-xs text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-hover shrink-0 mr-1.5 mt-0.5" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Typical Budget Range</span>
                  <span className="text-slate-700 mt-0.5">{service.basePriceRange}</span>
                </div>
                <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform font-bold">
                  <span>Interactive Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Details & Live Cost Estimator Modal overlay */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="service-calculator-modal">
              {/* Back Drop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-50 overflow-hidden z-10 flex flex-col lg:flex-row max-h-[90vh]"
              >
                {/* Service deep details column */}
                <div className="lg:w-1/2 p-6 sm:p-8 bg-purple-50/40 border-b lg:border-b-0 lg:border-r border-purple-100 overflow-y-auto">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 left-4 lg:left-auto lg:right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-dark rounded-full transition-colors z-20 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="mt-8 lg:mt-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                      {getIcon(selectedService.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-dark">{selectedService.title}</h3>
                      <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {selectedService.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mt-6">
                    {selectedService.longDescription}
                  </p>

                  <h4 className="font-bold text-xs text-dark uppercase tracking-wider mt-8 mb-3">Service Standard Features:</h4>
                  <ul className="space-y-2.5">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-purple-100/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 bg-white/85 rounded-xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold block">Approx Base Budget</span>
                      <span className="text-lg font-extrabold text-primary">{selectedService.basePriceRange}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold block">Licensing status</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">Compliant & Insured</span>
                    </div>
                  </div>
                </div>

                {/* Interactive pricing calculator column */}
                <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
                  <div>
                    <div className="flex items-center space-x-2 text-primary border-b border-purple-50 pb-4 mb-6">
                      <Calculator className="w-5 h-5" />
                      <h4 className="font-bold text-sm tracking-tight text-dark uppercase">Instant Comfort Cost Calc</h4>
                    </div>

                    {/* Step 1: Property size area input slider */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-slate-700 flex items-center">
                          <span>{getAreaLabel(selectedService.id)}</span>
                          <HelpCircle className="w-3.5 h-3.5 text-slate-400 ml-1 cursor-pointer hover:text-primary" title="Slide to adjust your home size" />
                        </label>
                        <span className="text-sm font-bold text-primary font-mono">{areaInput.toLocaleString()} sq ft</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="6000"
                        step="100"
                        value={areaInput}
                        onChange={(e) => setAreaInput(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                        id="calculator-area-slider"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                        <span>500 sq ft</span>
                        <span>3,250 sq ft</span>
                        <span>6,000 sq ft</span>
                      </div>
                    </div>

                    {/* Optional step: Pitch modifier for Roofing */}
                    {selectedService.category === 'Roofing' && (
                      <div className="mb-6">
                        <label className="text-xs font-semibold text-slate-700 mb-2 block">Roof Pitch & Access Difficulty</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['Flat-Low', 'Medium', 'Steep-Complex'] as const).map((pitch) => (
                            <button
                              key={pitch}
                              type="button"
                              onClick={() => setRoofPitch(pitch)}
                              className={`py-2 px-1 text-center rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                                roofPitch === pitch
                                  ? 'bg-purple-50/80 border-primary text-primary font-bold'
                                  : 'border-slate-200 hover:border-purple-200 text-slate-600'
                              }`}
                            >
                              {pitch === 'Flat-Low' ? 'Flat/Easy' : pitch === 'Medium' ? 'Standard' : 'Steep/Custom'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Optional step: Extra ducts checklist item for HVAC */}
                    {selectedService.category === 'HVAC' && selectedService.id !== 'hvac-maintenance' && (
                      <div className="mb-6">
                        <label className="text-xs font-semibold text-slate-700 mb-2.5 block">Additional Add-ons</label>
                        <button
                          type="button"
                          onClick={() => setExtraDucts(!extraDucts)}
                          className={`w-full text-left p-3 rounded-lg border text-xs flex justify-between items-center transition-all cursor-pointer ${
                            extraDucts 
                              ? 'bg-purple-50/80 border-primary text-primary font-semibold' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span>Premium HVAC Air Duct System Upgrade</span>
                          <span className="font-mono text-xs font-bold">+₹75,000 - ₹90,000</span>
                        </button>
                      </div>
                    )}

                    {/* Tier Level Selection */}
                    <div className="mb-6">
                      <label className="text-xs font-semibold text-slate-700 mb-2 block font-sans">Material & Warranty Tier</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Standard', 'Premium', 'Ultra-Lifetime'] as const).map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setTierSelection(tier)}
                            className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                              tierSelection === tier
                                ? 'bg-purple-50/90 border-primary text-primary font-bold'
                                : 'border-slate-200 hover:border-purple-200 text-slate-600'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calculated summary and submit call */}
                  <div className="border-t border-purple-50 pt-6 mt-6">
                    <div className="bg-purple-100/40 p-4 rounded-xl flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">Live Price Estimate</span>
                        <span className="text-2xl font-extrabold font-mono text-dark select-none leading-none mt-1">
                          ₹{calculateLiveEstimate(selectedService.id).toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-primary bg-white border border-purple-100/50 px-2.5 py-1.5 rounded-lg text-right max-w-[50%] leading-tight">
                        Includes Parts, Labor & Cleanup
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onOpenEstimatorWithDetails(selectedService.id);
                        setSelectedService(null);
                      }}
                      id="pricing-apply-btn"
                      className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer hover:shadow-md active:scale-98"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Lock In Estimate & Call Back</span>
                    </button>
                    <p className="text-[9px] text-slate-400 text-center mt-2 font-normal leading-normal">
                      *Estimates are calculated client-side for guideline budgets. Subject to physical property verification.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
