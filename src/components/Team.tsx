import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEAM } from '../data';
import { ParticipantItem } from '../types';
import { ShieldCheck, Mail, ArrowRight, X, Contact } from 'lucide-react';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<ParticipantItem | null>(null);

  return (
    <section className="py-24 bg-white" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-primary bg-purple-50 px-2.5 py-1 rounded-md">
            Our Certified Crew
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight font-display mt-3"
            id="team-heading"
          >
            MEET THE TEAM
          </h2>
          <p className="text-slate-650 mt-4 text-sm sm:text-base font-normal">
            Every onsite operator holds full GAF or NATE master-level diagnostic accreditations. True craftspeople dedicated to your comfort.
          </p>
        </div>

        {/* Team Circle Headshots Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" id="team-circles-grid">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => setSelectedMember(member)}
              className="flex flex-col items-center text-center cursor-pointer group"
              id={`team-member-card-${member.id}`}
            >
              {/* Avatar circle wrapper with animated glowing border */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-3 border-transparent group-hover:border-primary/80 transition-all duration-300 shadow-md group-hover:shadow-xl">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay hover screen */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-[10px] uppercase font-bold tracking-widest bg-dark/75 py-1.5 px-3 rounded-full select-none">
                    View Bio
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-4">
                <span className="block text-sm sm:text-base font-extrabold text-slate-800 group-hover:text-primary transition-colors">
                  {member.name}
                </span>
                <span className="block text-[11px] font-semibold text-primary uppercase tracking-wider mt-0.5">
                  {member.role}
                </span>
                {/* Exp rating block */}
                <span className="inline-flex items-center space-x-1 text-[9px] text-slate-400 font-mono mt-1 px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{member.experience}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Team Member Bio Modal Overlay */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="team-bio-modal">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMember(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              {/* Bio Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-purple-50 z-10 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center sm:items-start sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mt-4">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm border border-slate-150"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-extrabold text-dark">{selectedMember.name}</h3>
                    <span className="block text-xs font-semibold text-primary uppercase tracking-wider mt-1">{selectedMember.role}</span>
                    <span className="inline-flex items-center space-x-1 text-[10px] text-slate-500 font-mono mt-1.5 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedMember.experience} ACCREDITATION</span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 leading-none">Professional Bio</h4>
                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-normal">
                    {selectedMember.bio}
                  </p>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400">Security Clearance Status</span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    Background Checked
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
