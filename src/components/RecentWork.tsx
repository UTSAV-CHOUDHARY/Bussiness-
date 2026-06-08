import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { ProjectItem } from '../types';
import { MapPin, Calendar, HelpCircle, RefreshCcw, Maximize, ArrowLeftRight } from 'lucide-react';

export default function RecentWork() {
  const [filter, setFilter] = useState<'All' | 'Roofing' | 'HVAC' | 'Insulation'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(PROJECTS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const [isComparing, setIsComparing] = useState<boolean>(true);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'All' || p.category === filter
  );

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-primary bg-purple-50 px-2.5 py-1 rounded-md">
              Our Track Record
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight font-display mt-3"
              id="recent-work-heading"
            >
              OUR RECENT WORK
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base font-normal">
              Drag the interactive slider on any project showcase below to compare our certified premium finished work with the initial damaged setups.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0" id="gallery-filters">
            {(['All', 'Roofing', 'HVAC', 'Insulation'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  // Auto-select first matching project if category changes
                  const matching = PROJECTS.filter((p) => cat === 'All' || p.category === cat);
                  if (matching.length > 0) {
                    setSelectedProject(matching[0]);
                    setSliderPosition(50);
                  }
                }}
                id={`gallery-filter-btn-${cat}`}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Before/After Comparative Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16" id="interactive-comparison-block">
          
          {/* Column A: Interactive Comparison Slider Box */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-150 group">
              
              {/* IMAGE A: Before (Base layer) */}
              <img
                src={selectedProject.imageBefore}
                alt={`${selectedProject.title} Before Install`}
                className="absolute inset-0 w-full h-full object-cover selection:bg-transparent"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 left-4 z-20 text-[10px] uppercase font-bold tracking-widest text-white tracking-wid bg-slate-950/70 border border-white/10 px-3 py-1 rounded-full backdrop-blur-xs select-none">
                Before Repair
              </span>

              {/* IMAGE B: After (Clipping overlay layer) */}
              <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
              >
                <img
                  src={selectedProject.imageAfter}
                  alt={`${selectedProject.title} After Finish`}
                  className="absolute inset-0 w-full h-full object-cover selection:bg-transparent"
                  style={{ width: '100%', height: '100%' }} // maintain viewport size
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-4 right-4 z-20 text-[10px] uppercase font-bold tracking-widest text-white tracking-wid bg-primary/80 border border-purple-200/20 px-3 py-1 rounded-full backdrop-blur-xs select-none">
                After Elite Restoration
              </span>

              {/* SLIDER CONTROLLER DRAWER BAR */}
              <div
                className="absolute top-0 bottom-0 z-30 w-1 bg-white cursor-ew-resize select-none pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Horizontal slider double arrows thumb */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-primary border border-purple-100 shadow-xl flex items-center justify-center pointer-events-none transform group-hover:scale-105 transition-transform">
                  <ArrowLeftRight className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>

              {/* Transparent invisible numeric controller input overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full z-40 opacity-0 cursor-ew-resize"
                aria-label="Drag to compare before and after photos"
                id="gallery-slider-input"
              />

              {/* Live interactive helpful hint */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-slate-950/70 backdrop-blur-xs border border-white/10 text-[9px] text-slate-100 font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md pointer-events-none select-none flex items-center space-x-1.5 animate-bounce">
                <span>◀ Drag Slider To Reveal ▶</span>
              </div>
            </div>
          </div>

          {/* Column B: Project Stats & Core Deliverable Info */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 border border-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div id="project-stats-block">
              <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary border border-primary/15 text-[10px] font-extrabold uppercase tracking-widest rounded-md mb-4">
                {selectedProject.category} Case Project
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-dark line-clamp-2">
                {selectedProject.title}
              </h3>
              
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center text-xs text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-primary mr-1.5 shrink-0" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center text-xs text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-primary mr-1.5 shrink-0" />
                  <span>Completed: {selectedProject.completionDate}</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mt-6 border-t border-slate-200/60 pt-6">
                {selectedProject.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-3">Other Projects in Category</h4>
              <div className="grid grid-cols-3 gap-2" id="gallery-scroller">
                {filteredProjects.map((proj) => {
                  const isCurrent = proj.id === selectedProject.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setSelectedProject(proj);
                        setSliderPosition(50);
                      }}
                      id={`gallery-thumb-${proj.id}`}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        isCurrent 
                          ? 'border-primary scale-95 shadow-sm' 
                          : 'border-transparent hover:scale-102 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={proj.imageAfter}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/20" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
