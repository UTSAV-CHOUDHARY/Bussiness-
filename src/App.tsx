import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Sparkles, 
  FileText, 
  Send, 
  Calculator, 
  Hammer, 
  Wind, 
  ShieldCheck, 
  ShieldAlert, 
  PhoneCall,
  Loader
} from 'lucide-react';

// Core Sub-components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import RecentWork from './components/RecentWork';
import Reviews from './components/Reviews';
import Team from './components/Team';
import Financing from './components/Financing';
import ZipChecker from './components/ZipChecker';
import Blog from './components/Blog';
import EmergencySystem from './components/EmergencySystem';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  
  // High-fidelity Multi-Step Proposal Modal state
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [estimatorStep, setEstimatorStep] = useState<1 | 2 | 3>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('roof-replacement');
  
  // Proposal parameters
  const [estimateSqFt, setEstimateSqFt] = useState<number>(2000);
  const [propertyAge, setPropertyAge] = useState<'New (<5 yrs)' | 'Standard (5-15 yrs)' | 'Aging (15+ yrs)'>('Standard (5-15 yrs)');
  const [taxRebatable, setTaxRebatable] = useState<boolean>(true);
  const [propState, setPropState] = useState<'Standard' | 'Premium-Upgraded'>('Premium-Upgraded');
  
  // Custom contact details for proposal
  const [estimateName, setEstimateName] = useState('');
  const [estimatePhone, setEstimatePhone] = useState('');
  const [estimateEmail, setEstimateEmail] = useState('');
  const [estimateDate, setEstimateDate] = useState('2026-06-15');
  const [estimateStatus, setEstimateStatus] = useState<'Inputting' | 'Generating' | 'Result'>('Inputting');
  
  // Proposal unique reference codes
  const [proposalNo, setProposalNo] = useState('');

  // Auto-scroll-spy navigator logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'gallery', 'reviews', 'financing', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Open multi-step quote proposal prefilled with an active selection
  const handleOpenEstimatorWithDetails = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    
    // Customize defaults based on key service clicked
    if (serviceId === 'ac-installation' || serviceId === 'heating-systems') {
      setEstimateSqFt(1800);
    } else {
      setEstimateSqFt(2200);
    }

    setEstimatorStep(1);
    setEstimateStatus('Inputting');
    setIsEstimatorOpen(true);
  };

  // Live Itemized cost computation for the proposal
  const compileProposalInvoice = () => {
    let rawUnitCost = 0;
    let categoryTitle = 'Roofing System';
    
    if (selectedServiceId === 'roof-replacement') {
      rawUnitCost = 550;
      categoryTitle = 'Elite Roof Restoration';
    } else if (selectedServiceId === 'roof-repairs') {
      rawUnitCost = 180;
      categoryTitle = 'Emergency Valley & Shingle Patches';
    } else if (selectedServiceId === 'ac-installation') {
      rawUnitCost = 380;
      categoryTitle = 'SEER2 Air Conditioning Install';
    } else if (selectedServiceId === 'heating-systems') {
      rawUnitCost = 280;
      categoryTitle = 'Variable-Speed Heating Furnace';
    } else if (selectedServiceId === 'hvac-maintenance') {
      rawUnitCost = 45;
      categoryTitle = 'Preventive Seasonal Maintenance Care';
    } else {
      rawUnitCost = 140;
      categoryTitle = 'Attic Insulation Retrofit';
    }

    // Material tier modifier
    let tierMultiplier = propState === 'Standard' ? 0.9 : 1.25;
    
    // Compute line items
    const rawMaterials = Math.round(estimateSqFt * rawUnitCost * 0.5 * tierMultiplier);
    const complexLabor = Math.round(estimateSqFt * rawUnitCost * 0.6 * (propertyAge === 'Aging (15+ yrs)' ? 1.15 : 1.0));
    const ecoCredits = taxRebatable ? -65000 : 0;
    const finalTotal = Math.max(15000, rawMaterials + complexLabor + ecoCredits);

    return {
      categoryTitle,
      rawMaterials,
      complexLabor,
      ecoCredits,
      finalTotal
    };
  };

  const handleGenerateProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimateName.trim() || !estimatePhone.trim() || !estimateEmail.trim()) {
      alert('Please complete all contact coordinates to authorize your quote generation.');
      return;
    }

    setEstimateStatus('Generating');
    
    setTimeout(() => {
      setProposalNo(`EPQ-${Math.round(100000 + Math.random() * 900000)}`);
      setEstimateStatus('Result');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased font-sans relative min-h-screen">
      
      {/* Top Banner indicating safety certifications */}
      <div 
        id="top-safety-banner" 
        className="w-full bg-slate-900 border-b border-purple-950/40 text-slate-350 text-[10px] py-2 px-4 flex items-center justify-between font-mono relative z-50 select-none"
      >
        <div className="flex items-center space-x-1 sm:space-x-3.5 mx-auto sm:mx-0">
          <span className="flex items-center text-emerald-450 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
            Active dispatch zones: Franklin & Brentwood fully operational
          </span>
        </div>
        <span className="hidden sm:inline-block font-semibold">
          GAF Master Elite Contractor • EPA Lead-Safe Certified
        </span>
      </div>

      {/* Navigation Header */}
      <Navbar 
        onNavigate={handleScrollToSection} 
        activeSection={activeSection}
        onOpenEstimator={() => {
          setSelectedServiceId('roof-replacement');
          setEstimatorStep(1);
          setEstimateStatus('Inputting');
          setIsEstimatorOpen(true);
        }}
      />

      {/* Hero Showcase Frame */}
      <Hero 
        onOpenEstimator={() => {
          setSelectedServiceId('roof-replacement');
          setEstimatorStep(1);
          setEstimateStatus('Inputting');
          setIsEstimatorOpen(true);
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onNavigate={handleScrollToSection}
      />

      {/* Main Content Layout Sections */}
      <main className="relative pt-16">
        
        {/* Key Services with deep Cost Calculators */}
        <Services onOpenEstimatorWithDetails={handleOpenEstimatorWithDetails} />
        
        {/* ZIP Service range diagnostic checks */}
        <ZipChecker />

        {/* Why Choose Elite brand assets */}
        <WhyChooseUs />

        {/* Swipe comparison recent works project block */}
        <RecentWork />

        {/* Reviews slider with local custom inputs */}
        <Reviews />

        {/* Meet the certified crew members */}
        <Team />

        {/* Loan Amortization Calculators and low APR loans descriptions */}
        <Financing />

        {/* Masterclass tutorials & guidelines */}
        <Blog />

      </main>

      {/* Emergency dispatch tracker right drawer */}
      <EmergencySystem isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />

      {/* Pixel-perfect customized Footer */}
      <Footer onNavigate={handleScrollToSection} />

      {/* Multi-Step Proposol & Quote Planner Modal overlay */}
      <AnimatePresence>
        {isEstimatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="proposal-wizard-modal">
            
            {/* Backdrop wrapper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEstimatorOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Core Proposal panel */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-50 overflow-hidden z-10 flex flex-col justify-between max-h-[90vh]"
            >
              
              {/* Header bar */}
              <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between select-none">
                <div className="flex items-center space-x-2.5">
                  <Calculator className="w-5.5 h-5.5 text-purple-300 animate-pulse" />
                  <h3 className="font-extrabold text-sm sm:text-base tracking-widest uppercase font-display">
                    Elite Premium Proposal Planner
                  </h3>
                </div>
                <button
                  onClick={() => setIsEstimatorOpen(false)}
                  className="p-1 px-2.5 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Steps Progress Visualizer */}
              {estimateStatus === 'Inputting' && (
                <div className="bg-purple-50/50 border-b border-purple-100 py-3 px-6 flex justify-around items-center text-[10px] sm:text-xs font-bold text-slate-400 select-none">
                  <span className={`flex items-center gap-1.5 ${estimatorStep >= 1 ? 'text-primary font-extrabold' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] ${estimatorStep >= 1 ? 'bg-primary text-white border-primary' : 'border-slate-300'}`}>1</span>
                    <span>Property Details</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                  <span className={`flex items-center gap-1.5 ${estimatorStep >= 2 ? 'text-primary font-extrabold' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] ${estimatorStep >= 2 ? 'bg-primary text-white border-primary' : 'border-slate-300'}`}>2</span>
                    <span>Materials & Tiers</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                  <span className={`flex items-center gap-1.5 ${estimatorStep >= 3 ? 'text-primary font-extrabold' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] ${estimatorStep === 3 ? 'bg-primary text-white border-primary' : 'border-slate-300'}`}>3</span>
                    <span>Owner Coordinates</span>
                  </span>
                </div>
              )}

              {/* Dynamic Step Contents switcher panel */}
              <div className="flex-1 p-6 sm:p-8 overflow-y-auto text-left">
                
                {estimateStatus === 'Inputting' && (
                  <div id="proposal-step-inputting">
                    {/* STEP 1: Property size area */}
                    {estimatorStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        <span className="block text-xs uppercase tracking-widest text-primary font-bold">Step 1 of 3: Core Size Dimensions</span>
                        
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-2">Service Selection</label>
                          <select
                            id="proposal-service-select"
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-white"
                          >
                            <option value="roof-replacement">GAF Roof Replacement / Decking</option>
                            <option value="roof-repairs">Storm Weather Repairs & Patching</option>
                            <option value="ac-installation">High-Efficiency AC & Heat Pump Upgrade</option>
                            <option value="heating-systems">Furnace System Airflow Installation</option>
                            <option value="insulation">Blow-In Attic Insulation (R-60 Barrier)</option>
                          </select>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <label className="text-xs font-semibold text-slate-700">Estimate Area Footprint (Sq Ft)</label>
                            <span className="text-xs font-bold text-primary font-mono">{estimateSqFt.toLocaleString()} sq ft</span>
                          </div>
                          <input
                            type="range"
                            min="500"
                            max="6000"
                            step="100"
                            value={estimateSqFt}
                            onChange={(e) => setEstimateSqFt(Number(e.target.value))}
                            className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                            id="proposal-range-slider"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-2">Current System / Decking Age</label>
                          <div className="grid grid-cols-3 gap-2">
                            {([
                              'New (<5 yrs)',
                              'Standard (5-15 yrs)',
                              'Aging (15+ yrs)'
                            ] as const).map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setPropertyAge(age)}
                                className={`py-2 p-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                                  propertyAge === age
                                    ? 'bg-purple-50/80 border-primary text-primary font-bold'
                                    : 'border-slate-250 text-slate-600 hover:border-slate-350'
                                }`}
                              >
                                {age === 'New (<5 yrs)' ? 'Under 5 Yr' : age === 'Standard (5-15 yrs)' ? '5-15 Yr' : '15+ Yr (Aging)'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end">
                          <button
                            onClick={() => setEstimatorStep(2)}
                            id="proposal-next-btn-1"
                            className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover flex items-center gap-1 cursor-pointer"
                          >
                            <span>Next Parameters</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Materials & Tiers */}
                    {estimatorStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        <span className="block text-xs uppercase tracking-widest text-primary font-bold">Step 2 of 3: Build Accessories Tiers</span>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-2">Build Materials Quality Spec</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setPropState('Standard')}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                propState === 'Standard'
                                  ? 'bg-purple-50/70 border-primary text-primary'
                                  : 'border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className="block text-xs font-bold">Standard Grade Builders Match</span>
                              <span className="block text-[10px] text-slate-400 mt-1 leading-normal font-sans">Compliant standard tiles or standard efficiency SEER cooling condensers.</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPropState('Premium-Upgraded')}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                propState === 'Premium-Upgraded'
                                  ? 'bg-purple-50/70 border-primary text-primary'
                                  : 'border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className="block text-xs font-bold flex items-center gap-1 text-primary">
                                <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse animate-bounce" />
                                <span>Premium Architectural Upgraded</span>
                              </span>
                              <span className="block text-[10px] text-slate-450 mt-1 leading-normal font-sans">GAF Lifetime timberline grey HDZ dimensional shingles or variable-capacity heating.</span>
                            </button>
                          </div>
                        </div>

                        {/* Eco Tax rebate toggle */}
                        <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl flex items-center justify-between">
                          <div className="pr-4 text-left">
                            <span className="block text-xs font-bold text-dark">Sustainable Eco Tax Credits</span>
                            <span className="block text-[10.5px] text-slate-500 mt-0.5 leading-normal">
                              Select if this project fits state-level green energy efficiency criteria to unlock instant -₹65,000 credit offsets.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setTaxRebatable(!taxRebatable)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                              taxRebatable 
                                ? 'bg-emerald-500 text-white shadow-xs' 
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {taxRebatable ? 'Rebate Active' : 'Apply Rebate'}
                          </button>
                        </div>

                        <div className="pt-4 border-t flex justify-between">
                          <button
                            onClick={() => setEstimatorStep(1)}
                            className="px-4 py-2.5 text-slate-500 hover:text-dark text-xs font-bold rounded-lg cursor-pointer"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setEstimatorStep(3)}
                            id="proposal-next-btn-2"
                            className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover flex items-center gap-1 cursor-pointer"
                          >
                            <span>Next: Contact Info</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Owner Coordinates */}
                    {estimatorStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-4">Step 3 of 3: Authorized Owner Contact</span>

                        <form onSubmit={handleGenerateProposalSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="owner-name" className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Full Owner Name</label>
                            <input
                              type="text"
                              id="owner-name"
                              required
                              value={estimateName}
                              onChange={(e) => setEstimateName(e.target.value)}
                              placeholder="e.g. Johnathan Smith"
                              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-primary focus:outline-hidden"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="owner-phone" className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Telephone Line</label>
                              <input
                                type="tel"
                                id="owner-phone"
                                required
                                value={estimatePhone}
                                onChange={(e) => setEstimatePhone(e.target.value)}
                                placeholder="e.g. (615) 555-0104"
                                className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-primary focus:outline-hidden"
                              />
                            </div>

                            <div>
                              <label htmlFor="owner-email" className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Email Coordinate</label>
                              <input
                                type="email"
                                id="owner-email"
                                required
                                value={estimateEmail}
                                onChange={(e) => setEstimateEmail(e.target.value)}
                                placeholder="e.g. john.smith@gmail.com"
                                className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-primary focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="owner-date" className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Preferred Site Inspection Date</label>
                            <input
                              type="date"
                              id="owner-date"
                              value={estimateDate}
                              onChange={(e) => setEstimateDate(e.target.value)}
                              className="w-full text-xs p-3 rounded-lg border border-slate-250 bg-white"
                            />
                          </div>

                          <div className="pt-6 border-t flex justify-between">
                            <button
                              type="button"
                              onClick={() => setEstimatorStep(2)}
                              className="px-4 py-2.5 text-slate-500 hover:text-dark text-xs font-bold rounded-lg cursor-pointer"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              id="proposal-submit-btn"
                              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-98"
                            >
                              <Sparkles className="w-4 h-4 text-yellow-300" />
                              <span>EXECUTE COMPREHENSIVE QUOTE</span>
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}

                  </div>
                )}

                {/* Proposal calculation spinner */}
                {estimateStatus === 'Generating' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center"
                    id="proposal-generating-loader"
                  >
                    <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <span className="text-sm font-bold text-dark block">Compiling Certified Material Calculations...</span>
                    <span className="text-xs text-slate-400 mt-1 block">Factoring labor, GAF roof deck specs, and local Franklin regional tax rebates...</span>
                  </motion.div>
                )}

                {/* THE FINAL BEAUTIFUL INVOICE PROPOSAL DOCUMENT */}
                {estimateStatus === 'Result' && (
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-6"
                    id="proposal-invoice-document"
                  >
                    {/* Invoice design layout */}
                    <div className="bg-slate-50 border-2 border-dashed border-purple-200 rounded-2xl p-5 sm:p-6 text-left">
                      <div className="flex justify-between items-start border-b pb-4 mb-4 select-none">
                        <div>
                          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Proposal Document</span>
                          <span className="block text-base font-extrabold text-slate-800 tracking-tight">ELITE PRE-RESTORE ASSESSMENT</span>
                          <span className="text-[10px] font-mono text-primary font-bold mt-0.5 inline-block bg-purple-50 px-2 py-0.5 rounded-md">
                            Ref: {proposalNo}
                          </span>
                        </div>
                        <div className="text-right text-[10px] text-slate-450 leading-normal">
                          <span>Date Logged: 2026-06-08</span> <br />
                          <span>Franklin, TN Depot #01</span>
                        </div>
                      </div>

                      {/* Specs info */}
                      <div className="grid grid-cols-2 gap-4 text-xs font-normal text-slate-650 mb-6">
                        <div>
                          <span className="block text-[8px] uppercase tracking-wider text-slate-405 font-bold leading-none mb-1">Owner Name</span>
                          <span className="text-dark font-bold">{estimateName}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase tracking-wider text-slate-405 font-bold leading-none mb-1">Inspection Goal Date</span>
                          <span className="text-dark font-bold">{estimateDate}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase tracking-wider text-slate-405 font-bold leading-none mb-1">Property Scope Dimensions</span>
                          <span className="text-dark font-semibold font-mono">{estimateSqFt.toLocaleString()} sq ft ({propState} spec)</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase tracking-wider text-slate-455 font-bold leading-none mb-1">Lineage Type</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md">GAF/NATE Verified</span>
                        </div>
                      </div>

                      {/* Calculations breakdown chart list */}
                      <span className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-3 leading-none font-display">Itemized Comfort Estimates</span>
                      <div className="space-y-2 border-b border-dashed pb-4 mb-4 text-xs">
                        {/* Row 1 */}
                        <div className="flex justify-between text-slate-650">
                          <span>{compileProposalInvoice().categoryTitle} Premium Materials Pack</span>
                          <span className="font-mono text-dark font-bold">₹{compileProposalInvoice().rawMaterials.toLocaleString()}</span>
                        </div>
                        {/* Row 2 */}
                        <div className="flex justify-between text-slate-650">
                          <span>Certified GAF/NATE Installation Labor Fee ({propertyAge})</span>
                          <span className="font-mono text-dark font-bold">₹{compileProposalInvoice().complexLabor.toLocaleString()}</span>
                        </div>
                        {/* Row 3: Rebate */}
                        {taxRebatable && (
                          <div className="flex justify-between text-emerald-700 bg-emerald-50/50 p-1 rounded-md">
                            <span>Eco State Thermal Efficiency Incentives Offset</span>
                            <span className="font-mono font-bold">-₹{Math.abs(compileProposalInvoice().ecoCredits).toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center bg-purple-50 p-3 rounded-lg mb-2">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-800">Guaranteed Budget Ceiling</span>
                        <span className="text-lg sm:text-xl font-extrabold font-mono text-primary">
                          ₹{compileProposalInvoice().finalTotal.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[8.5px] text-slate-400 leading-normal text-center">
                        *This document serves as an official guidelines budget quote estimate. Subject to physical inspection locks.
                      </p>
                    </div>

                    {/* Next actions details */}
                    <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-4 flex items-start space-x-3 text-left animate-pulse">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-emerald-950 font-normal text-xs leading-normal">
                        <span className="font-extrabold block">Estimate locked successfully!</span>
                        <span>Your coordinator has reserved site inspection for {estimateDate}. We registered your digital invoice ref: <span className="font-bold">{proposalNo}</span>. An inspection truck will call you shortly at {estimatePhone}.</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEstimatorOpen(false)}
                      id="proposal-close-btn"
                      className="w-full py-3 bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      Done - Return to Website
                    </button>
                  </motion.div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
