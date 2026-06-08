import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Clock, CreditCard, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: 'High Quality',
      description: 'Using only standard premium architectural materials engineered to survive direct severe storm impacts.'
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />, // Double-check icon, or we can use another badge style
      title: 'Certified Experts',
      description: 'NATE-certified elite temperature HVAC technicians and GAF certified roofing installers.'
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: '24/7 Service',
      description: 'On-call local technicians ready to dispatch fully loaded utility service tracks at any hour of the night.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: 'Financing',
      description: 'Zero interest, zero money down options with instant digital approvals for any family household budget.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: 'Warranties',
      description: 'Backing your capital investments with absolute lifetime labor and manufacturers warranties.'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="about">
      {/* Visual embellishments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white"
            id="why-choose-us-heading"
          >
            WHY CHOOSE ELITE?
          </motion.h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            We operate with absolute transparency, lifetime accountability, and quick response guarantees. Over 4,500 active property owners trust us.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4" id="pillars-container">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="bg-white/5 border border-white/10 hover:border-violet-500/30 p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10 group"
              id={`why-pillar-${index}`}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-slate-350 font-normal text-xs leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extra Brand Trust / Stats Banner */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200 font-mono">
              4,500+
            </span>
            <span className="block text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Homes Saved</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200 font-mono">
              24 Min
            </span>
            <span className="block text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Emergency Dispatch</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200 font-mono">
              100%
            </span>
            <span className="block text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">GAF & NATE Certified</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200 font-mono">
              ₹0 Down
            </span>
            <span className="block text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Financing Available</span>
          </div>
        </div>

      </div>
    </section>
  );
}
