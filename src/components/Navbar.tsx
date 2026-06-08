import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, Hammer, Wind, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenEstimator: () => void;
}

export default function Navbar({ onNavigate, activeSection, onOpenEstimator }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About Us', id: 'about' },
    { label: 'Financing', id: 'financing' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleLinkClick('home')}
            id="logo-container"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white shadow-md shadow-purple-200 transition-all duration-300 group-hover:scale-105">
              <Hammer className="absolute top-2 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <Wind className="absolute bottom-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-dark flex items-center">
                ELITE
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary leading-none">
                Roof & Air Solutions
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`relative text-sm font-medium transition-colors duration-200 py-2 cursor-pointer ${
                    isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', sharpness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <a 
              href="tel:18008004822" 
              id="phone-cta"
              className="flex items-center space-x-2 text-slate-700 hover:text-primary transition-colors font-semibold text-sm"
            >
              <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-normal text-slate-400 uppercase leading-none">Call Support</span>
                <span className="text-sm font-bold tracking-tight text-dark">1-800-800-4822</span>
              </div>
            </a>
            
            <button
              onClick={onOpenEstimator}
              id="quote-btn-desktop"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-hover shadow-sm hover:shadow-md hover:shadow-purple-100 transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              Get A Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <a 
              href="tel:1-800-800-4822"
              className="mr-4 p-2 bg-purple-50 text-primary rounded-full hover:bg-purple-100 transition-colors"
              id="mobile-phone-link"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="p-2.5 rounded-xl text-slate-600 hover:text-primary hover:bg-purple-50/50 transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-purple-50 bg-white"
            id="mobile-nav-panel"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    id={`mobile-nav-${item.id}`}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive 
                        ? 'bg-purple-50 text-primary' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-4">
                <div className="flex items-center space-x-3 text-slate-700 py-1">
                  <Phone className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase leading-none">Emergency Line</span>
                    <span className="font-bold text-dark text-base">1-800-800-4822</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenEstimator();
                  }}
                  id="mobile-quote-cta"
                  className="w-full text-center py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Free Quote Estimate</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
