import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, ShieldCheck, ChevronRight, Wrench, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, getTampaBusinessStatus } from '../data/businessData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [status, setStatus] = useState(getTampaBusinessStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getTampaBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-slate-50 pt-10 pb-16 lg:py-20 border-b border-slate-100">
      {/* Background Subtle Minimalist Pattern */}
      <div className="absolute inset-0 bg-grid-slate-pattern pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Core Message & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Open Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                {status.statusText}: {status.subText}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              European Auto Repair <br className="hidden sm:inline" />
              <span className="text-orange-600">You Can Trust.</span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Professional automotive repair and expert maintenance services for European vehicle owners in Tampa, Florida. Dedicated to precision diagnostics, genuine parts, and honest customer service.
            </p>

            {/* Action Buttons & Direct Line */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-book-btn"
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transition-colors shadow-sm flex items-center justify-center gap-2.5 group"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book a Service</span>
                <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-directions-cta-btn"
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2.5 shadow-sm"
              >
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Get Directions</span>
              </a>

              <div className="hidden xl:flex flex-col text-left pl-2 border-l border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Line</span>
                <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="text-base font-extrabold text-slate-900 hover:text-orange-600 transition-colors whitespace-nowrap">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 text-left">
              <div>
                <p className="font-bold text-sm text-slate-900">Expert Techs</p>
                <p className="text-xs text-slate-500 mt-0.5">Specialized European diagnostic skills</p>
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">Genuine Parts</p>
                <p className="text-xs text-slate-500 mt-0.5">OEM grade replacement components</p>
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">Local Tampa</p>
                <p className="text-xs text-slate-500 mt-0.5">North Florida Ave workshop</p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Minimalist Business Location Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 leading-tight">Euro Car Services</h2>
                    <p className="text-xs text-slate-500">Tampa Service Center</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Tampa, FL
                </span>
              </div>

              <div className="space-y-4 text-sm">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Workshop Location</p>
                    <p className="text-slate-600 text-xs mt-0.5">{BUSINESS_INFO.address}</p>
                    <a
                      id="hero-quick-directions-link"
                      href={BUSINESS_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1 mt-1.5"
                    >
                      <span>View on Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Service Hours</p>
                    <p className="text-slate-600 text-xs mt-0.5">Monday – Friday: 8:30 AM – 5:30 PM</p>
                    <p className="text-slate-400 text-xs">Saturday – Sunday: Closed</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <Phone className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Direct Phone</p>
                    <a
                      id="hero-quick-phone-link"
                      href={`tel:${BUSINESS_INFO.phoneTel}`}
                      className="text-slate-800 text-sm font-bold hover:text-orange-600 transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  id="hero-card-directions-btn"
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Open Google Maps Directions</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
