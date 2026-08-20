import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Navigation, 
  CheckCircle2, 
  Calendar,
  Compass
} from 'lucide-react';
import { BUSINESS_INFO, BUSINESS_HOURS, getTampaBusinessStatus } from '../data/businessData';

interface LocationHoursProps {
  onOpenBooking: () => void;
}

export const LocationHours: React.FC<LocationHoursProps> = ({ onOpenBooking }) => {
  const [businessStatus, setBusinessStatus] = useState(getTampaBusinessStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setBusinessStatus(getTampaBusinessStatus());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="location" className="py-20 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase">
            <span>Location & Service Hours</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Visit Euro Car Services in Tampa
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Conveniently located on North Florida Avenue with dedicated diagnostic bays and customer parking.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Details & Hours Card */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Hours Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Operating Hours</h3>
                    <p className="text-xs text-slate-500">Tampa Local Time (EST/EDT)</p>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  businessStatus.isOpen 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-slate-200 text-slate-700 border border-slate-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${businessStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span>{businessStatus.statusText}</span>
                </div>
              </div>

              {/* Hours List */}
              <div className="space-y-2 text-sm">
                {BUSINESS_HOURS.map((item) => {
                  const isToday = businessStatus.currentDayName.toLowerCase() === item.day.toLowerCase();
                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                        isToday
                          ? 'bg-orange-50/80 border border-orange-200 font-semibold text-slate-900'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                        <span>{item.day}</span>
                        {isToday && <span className="text-[10px] uppercase tracking-wider text-orange-600 font-bold ml-1">(Today)</span>}
                      </span>
                      <span className={item.isOpenDay ? (isToday ? 'text-orange-700 font-bold' : 'text-slate-900 font-semibold') : 'text-slate-400'}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Appointments and scheduled drop-offs during open shop hours.</span>
              </div>

            </div>

            {/* Address & Quick Contact Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 shrink-0 mt-0.5">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">Euro Car Services</h4>
                  <p className="text-sm text-slate-700 font-medium">{BUSINESS_INFO.street}</p>
                  <p className="text-xs text-slate-500">{BUSINESS_INFO.cityStateZip}, {BUSINESS_INFO.country}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  id="location-get-directions-btn"
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  id="location-call-btn"
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>Call Shop</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed & Directions Container */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex-1 flex flex-col">
              
              {/* Map Header Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-orange-600" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    Tampa Service Location Map
                  </span>
                </div>

                <a
                  id="map-header-direct-link"
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
                >
                  <span>Open Full Google Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Canvas / Embed */}
              <div className="relative w-full flex-1 min-h-[380px] bg-slate-100">
                <iframe
                  title="Euro Car Services Location Map"
                  src="https://maps.google.com/maps?q=14228+N+Florida+Ave+%23103,+Tampa,+FL+33613&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[380px] border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Overlay Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
                    <h5 className="font-bold text-slate-900 text-xs">Euro Car Services</h5>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    14228 N Florida Ave #103, Tampa, FL 33613
                  </p>
                  <a
                    id="map-overlay-directions-btn"
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 pt-1"
                  >
                    <span>Launch Google Navigation →</span>
                  </a>
                </div>
              </div>

              {/* Footer Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>North Florida Ave corridor near Fletcher / Bearss Ave in Tampa</span>
                </div>

                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-slate-900 hover:text-orange-600 font-bold flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  <span>Book Service Appointment</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
