import React from 'react';
import { Phone, Calendar, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface FloatingCTAProps {
  onOpenBooking: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenBooking }) => {
  return (
    <div
      id="mobile-floating-cta-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-2.5 px-4 flex items-center justify-between gap-2 shadow-lg"
    >
      {/* Call Button */}
      <a
        id="floating-call-btn"
        href={`tel:${BUSINESS_INFO.phoneTel}`}
        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4 text-orange-600" />
        <span>Call Shop</span>
      </a>

      {/* Get Directions Button */}
      <a
        id="floating-directions-btn"
        href={BUSINESS_INFO.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 active:scale-95 transition-transform"
      >
        <Navigation className="w-4 h-4 text-slate-700" />
        <span>Directions</span>
      </a>

      {/* Book Button */}
      <button
        id="floating-book-btn"
        type="button"
        onClick={onOpenBooking}
        className="flex-1 py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
      >
        <Calendar className="w-4 h-4" />
        <span>Book</span>
      </button>
    </div>
  );
};
