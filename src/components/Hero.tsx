import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ShieldAlert, ArrowRight, Home, Wind, Shield } from 'lucide-react';
// @ts-ignore
import heroBg from '../assets/images/elite_hero_banner_1780935752338.png';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenEmergency: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onOpenEstimator, onOpenEmergency, onNavigate }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <section id="home" className="relative bg-slate-950 overflow-hidden min-h-[85vh] flex items-center pt-10 sm:pt-16 pb-20 sm:pb-32">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Trusted Residential Home with Elite Roof and Air Conditioning Unit"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-45 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to blend sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-purple-950/20 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col items-start gap-6 text-left"
          id="hero-content-block"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs"
          >
            <Shield className="w-4 h-4 text-purple-300" />
            <span className="text-xs font-semibold tracking-wide text-white uppercase">
              Free Inspection & Insurance Assistance
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            id="hero-main-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display"
          >
            Trusted Residential <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-indigo-200">
              Roofing & HVAC Experts
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-200/95 leading-relaxed max-w-2xl font-normal"
          >
            Comprehensive services designed for your home's lifetime comfort and protection. Our teams handle complete major tear-downs, energy insulation optimizations, and next-generation heating and cooling setups correctly.
          </motion.p>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 w-full sm:w-auto mt-2">
            <button
              onClick={onOpenEstimator}
              id="hero-cta-inspection"
              className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover shadow-lg hover:shadow-purple-950/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span>SCHEDULE A FREE INSPECTION</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Overlapping Floating Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-purple-100 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-4 items-center pointer-events-auto"
          id="floating-hero-dashboard"
        >
          {/* Column 1: Emergency Trigger - Heavy prominence */}
          <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-4">
            <button
              onClick={onOpenEmergency}
              id="emergency-quick-trigger"
              className="w-full bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-700 hover:text-red-800 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group active:scale-98"
            >
              <ShieldAlert className="w-5 h-5 text-red-600 animate-pulse group-hover:scale-110 transition-transform" />
              <div className="text-left flex flex-col leading-tight">
                <span className="text-xs uppercase tracking-wider text-red-500 font-medium">Emergency Center</span>
                <span className="text-sm font-bold">REQUEST EMERGENCY REPAIR</span>
              </div>
            </button>
          </div>

          {/* Columns 2-4: Quick Links in Category Form */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-2 sm:gap-4">
            {/* Roofing */}
            <div 
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl hover:bg-purple-50/50 border border-transparent hover:border-purple-100 transition-all duration-300 cursor-pointer group"
              id="quick-link-roofing"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 mt-2 truncate group-hover:text-primary">Roofing</span>
              <span className="hidden sm:inline text-[10px] text-slate-400 mt-0.5">Shingles & Leaks</span>
            </div>

            {/* HVAC */}
            <div 
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl hover:bg-purple-50/50 border border-transparent hover:border-purple-100 transition-all duration-300 cursor-pointer group"
              id="quick-link-hvac"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 mt-2 truncate group-hover:text-primary">HVAC</span>
              <span className="hidden sm:inline text-[10px] text-slate-400 mt-0.5">AC & Furnaces</span>
            </div>

            {/* Insulation */}
            <div 
              onClick={() => onNavigate('services')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl hover:bg-purple-50/50 border border-transparent hover:border-purple-100 transition-all duration-300 cursor-pointer group"
              id="quick-link-insulation"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 mt-2 truncate group-hover:text-primary">Insulation</span>
              <span className="hidden sm:inline text-[10px] text-slate-400 mt-0.5">Attic Thermal R-60</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
