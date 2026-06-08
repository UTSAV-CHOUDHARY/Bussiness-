import React from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Phone, 
  Mail, 
  Hammer, 
  Wind, 
  CheckCircle, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin,
  MapIcon
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-350 border-t border-purple-950/40 relative overflow-hidden" id="contact">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--color-primary-hover),transparent_60%)] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8" id="footer-columns-cabinet">
          
          {/* Column 1: Site Map (Navigation Links) */}
          <div className="text-left" id="footer-sitemap-column">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-100 mb-6 font-display">
              Site Map
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
              {[
                { label: 'Home Entrance', targetId: 'home' },
                { label: 'Our Key Services', targetId: 'services' },
                { label: 'Why Choose Elite?', targetId: 'about' },
                { label: 'Flexible Financing', targetId: 'financing' },
                { label: 'Homeowner Blogs & Tips', targetId: 'blog' },
                { label: 'Client Testimonials', targetId: 'reviews' }
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(link.targetId)}
                    className="hover:text-primary transition-colors text-left font-semibold cursor-pointer flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mr-2 group-hover:bg-primary transition-colors shrink-0" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact Information */}
          <div className="text-left font-sans" id="footer-contact-column">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-100 mb-6 font-display">
              Contact Us
            </h3>
            <ul className="space-y-4 text-xs font-semibold">
              <li className="flex items-start">
                <MapPin className="w-4.5 h-4.5 text-primary shrink-0 mr-3 mt-0.5" />
                <div className="flex flex-col text-slate-400 font-normal leading-relaxed">
                  <span className="font-semibold text-slate-350">Headquarters Address</span>
                  <span>3825 Theerhnten Drive</span>
                  <span>Franklin, TN 37069</span>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="w-4.5 h-4.5 text-primary shrink-0 mr-3" />
                <div className="flex flex-col text-slate-400 font-normal">
                  <span className="font-semibold text-slate-350">Primary Phone Support</span>
                  <a href="tel:18008004822" className="hover:text-primary transition-all font-mono font-bold text-sm">
                    1-800-800-4822
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-4.5 h-4.5 text-primary shrink-0 mr-3" />
                <div className="flex flex-col text-slate-400 font-normal">
                  <span className="font-semibold text-slate-350">Electronic Dispatch Support</span>
                  <a href="mailto:support@elitesolutions.com" className="hover:text-primary transition-all">
                    info@elitesolutions.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Area Map (Interactive SVG) */}
          <div className="text-left" id="footer-map-column">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-100 mb-4 font-display flex items-center">
              <span>Service Area Map</span>
            </h3>
            
            <p className="text-[11px] text-slate-400 mb-3 font-normal leading-normal">
              Continuous live tracking indicates 100% dispatcher responsiveness within shaded Franklin/Brentwood grids.
            </p>

            {/* Glowing Map Representation */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden aspect-[16/10] p-1.5 flex items-center justify-center">
              <svg className="w-full h-full max-h-[140px] opacity-40 text-purple-500 fill-current" viewBox="0 0 100 60">
                {/* Simulated Region Paths */}
                <path d="M10,15 Q30,5 50,15 T90,20 Q80,45 60,50 T15,35 Z" stroke="rgba(124,77,255,0.4)" strokeWidth="0.5" />
                <path d="M30,20 Q45,15 60,25 T80,45 Q50,55 35,45 Z" stroke="rgba(124,77,255,0.6)" strokeWidth="0.4" />
                {/* Central Franklin HQ Beacon Ring */}
                <circle cx="50" cy="30" r="1.5" className="fill-purple-400" />
                {/* Pulse Ring */}
                <circle cx="50" cy="30" r="4" className="stroke-purple-400 stroke-1 fill-none animate-ping origin-center" />
              </svg>

              {/* Glowing Dots annotations */}
              <div className="absolute top-[35%] left-[30%] flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-450 animate-pulse inline-block" />
                <span className="text-[7.5px] font-mono text-slate-400 uppercase select-none font-bold">Brentwood</span>
              </div>

              <div className="absolute top-[50%] left-[45%] flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-purple-450 animate-pulse inline-block shadow-sm shadow-purple-400" />
                <span className="text-[8px] font-mono text-white uppercase select-none font-extrabold tracking-wide">Franklin HQ</span>
              </div>

              <div className="absolute bottom-[30%] right-[25%] flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse inline-block" />
                <span className="text-[7px] font-mono text-slate-400 uppercase select-none font-bold">Oak Hill</span>
              </div>
            </div>
          </div>

          {/* Column 4: Certifications / Corporate Shields */}
          <div className="text-left" id="footer-certifications-column">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-100 mb-6 font-display">
              Certifications
            </h3>
            
            {/* Visual credential chips */}
            <div className="space-y-3.5" id="footer-credentials-grid">
              
              {/* GAF Master Elite */}
              <div className="flex items-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-red-650 flex items-center justify-center font-extrabold text-[10px] text-white select-none shrink-0 font-sans tracking-tight leading-none text-center">
                  GAF
                </div>
                <div className="text-left text-[10px] leading-tight">
                  <span className="block font-bold text-slate-200">GAF Master-Eligible</span>
                  <span className="block text-slate-450 mt-0.5">Highest industry weather security</span>
                </div>
              </div>

              {/* NATE HVAC certification */}
              <div className="flex items-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-650 flex items-center justify-center font-extrabold text-[10px] text-white select-none shrink-0 font-sans tracking-tight leading-none text-center">
                  NAT
                </div>
                <div className="text-left text-[10px] leading-tight">
                  <span className="block font-bold text-slate-200">NATE Certified techs</span>
                  <span className="block text-slate-450 mt-0.5">Professional HVAC certifications</span>
                </div>
              </div>

              {/* BBB rating */}
              <div className="flex items-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center font-extrabold text-[11px] text-white select-none shrink-0 border border-slate-650 leading-none">
                  A+
                </div>
                <div className="text-left text-[10px] leading-tight">
                  <span className="block font-bold text-slate-200">BBB Accredited</span>
                  <span className="block text-slate-450 mt-0.5">Zero complaint satisfaction tracking</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Corporate baseline / disclosures */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium" id="footer-baseline">
          <div className="text-center sm:text-left select-none leading-relaxed">
            <span className="block">Copyright © {currentYear} Elite Roof & Air Solutions. All rights reserved.</span>
            <span className="text-[10px] text-slate-600 block sm:mt-1">
              Fully licensed, bonded, and certified under General Contractors Licensing Regulations. Franklin HQ, TN.
            </span>
          </div>

          {/* Social Icons links matching layout */}
          <div className="flex space-x-3 sm:space-x-4 mt-6 sm:mt-0" id="footer-social-links">
            {[
              { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com' },
              { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com' },
              { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com' },
              { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com' }
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-850 text-slate-400 hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center cursor-pointer"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
