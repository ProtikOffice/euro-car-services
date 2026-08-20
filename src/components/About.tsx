import React from 'react';
import { ShieldCheck, Users, PenTool as Tool, CheckCircle, Car, MapPin, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface AboutProps {
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80"
                alt="Euro Car Services Professional European Auto Repair"
                className="w-full h-96 sm:h-[450px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Euro Car Services</h4>
                    <p className="text-xs text-slate-600">14228 N Florida Ave #103, Tampa, FL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 text-orange-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Commitment</p>
                <p className="text-sm font-bold text-slate-900">Quality Workmanship</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase">
                <span>About Euro Car Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Dedicated European Automotive Care in Tampa
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Euro Car Services is a dedicated automotive repair and European vehicle service business located on North Florida Avenue in Tampa, Florida. We provide reliable mechanical care, precision diagnostics, and routine maintenance for drivers who demand quality and dependability.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              Modern European vehicles require specialized diagnostic procedures, proper tooling, and an in-depth understanding of complex electrical and mechanical engineering. Our goal is to provide honest communication, thorough vehicle evaluations, and dependable repairs so you can drive with confidence.
            </p>

            {/* Core Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Tool className="w-4 h-4 text-orange-600" />
                  <span>European Vehicle Expertise</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized service procedures adapted to European manufacturing standards and intricate system requirements.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span>Professional Technicians</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Experienced automotive professionals committed to meticulous repairs, safety, and proper maintenance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Quality Parts & Workmanship</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Utilizing OEM and high-standard replacement components designed for longevity and optimal vehicle performance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  <span>Honest & Transparent Service</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear explanations of diagnostic findings with straightforward recommendations and honest pricing.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="about-schedule-btn"
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-colors"
              >
                <span>Schedule a Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="about-directions-link"
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>Visit Our Tampa Shop</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
