import React from 'react';
import { 
  Car, 
  CheckCircle2, 
  ShieldAlert, 
  MessageSquare, 
  Users, 
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { WHY_CHOOSE_US, BUSINESS_INFO } from '../data/businessData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Car': return <Car className="w-6 h-6 text-orange-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-orange-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-orange-600" />;
      case 'MessageSquareCheck': return <MessageSquare className="w-6 h-6 text-orange-600" />;
      case 'Users': return <Users className="w-6 h-6 text-orange-600" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-orange-600" />;
      default: return <CheckCircle2 className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-white text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase">
            <span>The Euro Car Services Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Tampa Drivers Choose Euro Car Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We are committed to delivering dependable automotive repair with an unwavering focus on vehicle safety, European engineering standards, and customer satisfaction.
          </p>
        </div>

        {/* 6 Core Value Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              id={`why-card-${idx + 1}`}
              className="bg-slate-50 rounded-2xl border border-slate-200/80 p-7 hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {getIcon(item.iconName)}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2.5">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Location Spotlight Bar */}
        <div className="mt-12 bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-orange-600">Convenient North Tampa Location</p>
              <p className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">{BUSINESS_INFO.address}</p>
            </div>
          </div>

          <a
            id="why-us-directions-btn"
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center gap-2 transition-all shrink-0"
          >
            <span>Get Directions</span>
            <ArrowUpRight className="w-4 h-4 text-orange-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
