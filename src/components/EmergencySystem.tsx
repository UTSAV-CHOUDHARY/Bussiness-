import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EmergencyRequest } from '../types';
import { AlertTriangle, Clock, Truck, Crosshair, Phone, Compass, X, Check, Loader, User } from 'lucide-react';

interface EmergencySystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencySystem({ isOpen, onClose }: EmergencySystemProps) {
  const [activeRequest, setActiveRequest] = useState<EmergencyRequest | null>(null);
  
  // Form input builders
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [serviceType, setServiceType] = useState<'Roofing' | 'HVAC' | 'Insulation'>('Roofing');
  const [severity, setSeverity] = useState<'Immediate' | 'Within 24 Hours' | 'Non-Urgent'>('Immediate');
  const [description, setDescription] = useState('');
  const [ticketError, setTicketError] = useState('');

  // Dispatch Simulator Timer values
  const [etaMinutes, setEtaMinutes] = useState(25);
  const [dispatchStep, setDispatchStep] = useState<1 | 2 | 3 | 4>(1);

  // Interval timer count downs
  useEffect(() => {
    let timer: any;
    if (activeRequest && etaMinutes > 3) {
      timer = setInterval(() => {
        setEtaMinutes((prev) => prev - 1);
      }, 8000); // subtract a minute every 8 seconds for fast, dynamic simulator action
    }
    return () => clearInterval(timer);
  }, [activeRequest, etaMinutes]);

  // Handle stepping progression for dispatcher simulator
  useEffect(() => {
    let timer1: any;
    let timer2: any;
    let timer3: any;

    if (activeRequest) {
      setDispatchStep(1);
      setEtaMinutes(26);

      timer1 = setTimeout(() => {
        setDispatchStep(2); // "Dispatch Assigned"
      }, 3500);

      timer2 = setTimeout(() => {
        setDispatchStep(3); // "Vehicle on the Way"
        setEtaMinutes(21);
      }, 7500);

      timer3 = setTimeout(() => {
        setDispatchStep(4); // "Technician Arrived"/Close proximity
        setEtaMinutes(4);
      }, 16000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeRequest]);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !description.trim()) {
      setTicketError('Please provide all parameters to secure immediate dispatch prioritization.');
      return;
    }

    const request: EmergencyRequest = {
      id: `urg-${Date.now()}`,
      name,
      phone,
      email: 'emergency@elitesolutions.com',
      address,
      serviceType,
      severity,
      description,
      status: 'Received',
      createdAt: new Date().toLocaleTimeString()
    };

    setActiveRequest(request);
    setTicketError('');
    // Clear form
    setName('');
    setPhone('');
    setAddress('');
    setDescription('');
  };

  const cancelSimulatedDispatch = () => {
    setActiveRequest(null);
    setDispatchStep(1);
    setEtaMinutes(25);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="emergency-system-drawer">
          {/* Blur slide underlayment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-cross"
          />

          {/* Core right drawer console */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="relative bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-6 sm:p-8 border-l border-red-100"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-105">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
                <h3 className="text-lg font-extrabold text-dark tracking-tight uppercase font-display">
                  Urgent Emergency Dispatch
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2.5 hover:bg-slate-100 text-slate-400 hover:text-dark rounded-full transition-all cursor-pointer font-bold border border-slate-100 shadow-3xs"
              >
                Close
              </button>
            </div>

            {/* Dynamic View switching: either log form or real-time simulation tracker */}
            <div className="flex-1 py-6 overflow-y-auto">
              {!activeRequest ? (
                <div id="emergency-log-form">
                  <div className="bg-red-50/75 rounded-2xl p-4 border border-red-100 mb-6 text-left">
                    <span className="block text-xs font-bold text-red-900">HIGH-VOLTAGE SERVICE DIRECTIVE:</span>
                    <p className="block text-[11px] text-red-600 font-medium leading-relaxed mt-1">
                      Please use this portal strictly for severe hazards (leak collapses, total furnace heating failure below 40 degrees, or short circuit AC failures). We prioritize immediate dispatches.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitTicket} className="space-y-4 text-left">
                    {/* Inputs */}
                    <div>
                      <label htmlFor="urg-name" className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 pl-1">Your Full Name</label>
                      <input
                        type="text"
                        id="urg-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Henderson"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label htmlFor="urg-phone" className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 pl-1">Direct Emergency Phone</label>
                      <input
                        type="tel"
                        id="urg-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (615) 555-0129"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 pl-1">Service Type</label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value as any)}
                          id="urg-service-type"
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-white focus:border-red-500 focus:outline-hidden"
                        >
                          <option value="Roofing">Roof leak / structure</option>
                          <option value="HVAC">AC / Heating system</option>
                          <option value="Insulation">Heat gap / Draft leak</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 pl-1 font-sans">Severity Tier</label>
                        <select
                          value={severity}
                          onChange={(e) => setSeverity(e.target.value as any)}
                          id="urg-severity"
                          className="w-full text-xs p-3 rounded-lg border border-slate-250 bg-white focus:border-red-500 focus:outline-hidden"
                        >
                          <option value="Immediate">Immediate Active Danger</option>
                          <option value="Within 24 Hours">Urgent support</option>
                          <option value="Non-Urgent">Symptomatic leak</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="urg-address" className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 pl-1">Physical Site Address</label>
                      <input
                        type="text"
                        id="urg-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 402 Aspen Wood Dr, Brentwood, TN"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label htmlFor="urg-description" className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 pl-1">Brief Description of Emergency</label>
                      <textarea
                        id="urg-description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Kitchen ceiling is dripping rapidly following heavy rain. Shingles visible in downspouts or heating is down..."
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-100 focus:outline-hidden resize-none"
                      />
                    </div>

                    {ticketError && (
                      <span className="text-[11px] font-semibold text-red-600 block pl-1">{ticketError}</span>
                    )}

                    <button
                      type="submit"
                      id="urg-form-submit"
                      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl select-none shadow-lg hover:shadow-red-200 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                    >
                      <AlertTriangle className="w-5 h-5" />
                      <span>INITIAL DISPATCH DIALER CONNECTION</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* LIVE DISPATCH SIMULATOR TRACKER CONSOLE */
                <div id="live-dispatch-sim-tracker">
                  {/* Status Banner */}
                  <div className="bg-slate-900 text-white text-center rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-red-400 font-mono">Live Dispatch Intercept</span>
                    
                    <span className="block text-4xl font-extrabold font-mono text-white mt-4 select-none leading-none">
                      {etaMinutes} min <br />
                    </span>
                    <span className="block text-xs text-slate-400 mt-2 font-medium">Simulated ETA to {activeRequest.address.split(',')[0]}</span>
                    
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 mt-4 pt-4 border-t border-white/10 font-medium">
                      <Truck className="w-4 h-4 text-primary" />
                      <span>Assigned Unit: Elite Heavy Truck #304</span>
                    </div>
                  </div>

                  {/* Progressive visual steps checker */}
                  <div className="mt-8 space-y-6 pl-4 text-left relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-0.5 before:bg-slate-100">
                    
                    {/* Step 1: Logged */}
                    <div className="relative flex items-start space-x-4">
                      <div className="absolute left-[11px] -translate-x-[11px] w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center z-10 border-2 border-white shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="pl-6 select-none">
                        <span className="block text-xs font-extrabold text-slate-800">Incident Ticket Logged</span>
                        <span className="block text-[11px] text-slate-400 mt-1 font-medium">Registered in dispatch cycle at {activeRequest.createdAt}</span>
                      </div>
                    </div>

                    {/* Step 2: Assigned */}
                    <div className="relative flex items-start space-x-4">
                      <div className={`absolute left-[11px] -translate-x-[11px] w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 border-white shadow-xs ${
                        dispatchStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {dispatchStep >= 2 ? <Check className="w-3.5 h-3.5" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />}
                      </div>
                      <div className="pl-6 select-none">
                        <span className={`block text-xs font-bold ${dispatchStep >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>Dispatch Agent Assigned</span>
                        <span className="block text-[10px] text-slate-400 mt-1 leading-normal">
                          {dispatchStep >= 2 ? 'Master Specialist Kevin (License #4902) confirmed direct assignment.' : 'Scanning available operators in Franklin zone...'}
                        </span>
                      </div>
                    </div>

                    {/* Step 3: Truck dispatched / on route */}
                    <div className="relative flex items-start space-x-4">
                      <div className={`absolute left-[11px] -translate-x-[11px] w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 border-white shadow-xs ${
                        dispatchStep >= 3 ? 'bg-emerald-500 text-white' : dispatchStep === 2 ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {dispatchStep >= 3 ? <Check className="w-3.5 h-3.5" /> : dispatchStep === 2 ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />}
                      </div>
                      <div className="pl-6 select-none">
                        <span className={`block text-xs font-bold ${dispatchStep >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>Vehicle Transiting Route</span>
                        <span className="block text-[10px] text-slate-400 mt-1 leading-normal">
                          {dispatchStep >= 3 ? 'Elite Heavy Utility Truck #304 departed our central regional depot with high-load tarps and insulation blowers.' : 'Awaiting engine ignition confirmation.'}
                        </span>
                      </div>
                    </div>

                    {/* Step 4: Proximity */}
                    <div className="relative flex items-start space-x-4">
                      <div className={`absolute left-[11px] -translate-x-[11px] w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 border-white shadow-xs ${
                        dispatchStep >= 4 ? 'bg-emerald-500 text-white animate-bounce' : dispatchStep === 3 ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {dispatchStep >= 4 ? <Check className="w-3.5 h-3.5" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />}
                      </div>
                      <div className="pl-6 select-none">
                        <span className={`block text-xs font-bold ${dispatchStep >= 4 ? 'text-slate-800' : 'text-slate-400'}`}>Technician Arriving at Location</span>
                        <span className="block text-[10px] text-slate-400 mt-1 leading-normal">
                          {dispatchStep >= 4 ? 'Kevin is arriving in close proximity! Heavy tools secured, ready to start safety tape setup.' : 'Nearing destination junction coordinates...'}
                        </span>
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-left text-slate-700">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase leading-none">Diagnostic Case details</span>
                    <p className="font-medium mt-1">Severity: <span className="text-red-700 bg-red-50 px-1.5 py-0.5 rounded-md font-bold">{activeRequest.severity}</span></p>
                    <p className="font-normal text-slate-500 leading-normal italic">"{activeRequest.description}"</p>
                  </div>

                  <button
                    onClick={cancelSimulatedDispatch}
                    id="sim-cancel-btn"
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-red-600 text-xs font-bold rounded-lg transition-all mt-6 cursor-pointer"
                  >
                    Cancel Dispatch Ticket
                  </button>
                </div>
              )}
            </div>

            {/* Footer Support dials info inside drawer */}
            <div className="border-t pt-4 border-slate-105 flex items-center justify-between text-xs font-bold text-slate-500 bg-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-450">Elite Dispatch hotline</span>
              <a href="tel:1-800-800-4822" className="flex items-center space-x-1.5 text-primary hover:underline">
                <Phone className="w-3.5 h-3.5" />
                <span>1-800-800-4822</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
