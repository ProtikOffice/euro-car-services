import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Disc, 
  Cpu, 
  Droplets, 
  Sliders, 
  Zap, 
  ThermometerSnowflake, 
  Wrench, 
  CalendarCheck, 
  FileSearch,
  ArrowRight,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/businessData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Specialty', 'Diagnostic', 'Mechanical', 'Safety', 'Maintenance'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Disc': return <Disc className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Droplets': return <Droplets className="w-6 h-6" />;
      case 'Sliders': return <Sliders className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'ThermometerSnowflake': return <ThermometerSnowflake className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'CalendarCheck': return <CalendarCheck className="w-6 h-6" />;
      case 'FileSearch': return <FileSearch className="w-6 h-6" />;
      default: return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase shadow-sm">
            <span>Automotive Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Automotive Repair & Maintenance
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Specialized automotive solutions for European and domestic vehicles in Tampa, Florida. We combine advanced diagnostics with quality workmanship.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`services-filter-${cat.toLowerCase()}`}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top accent */}
              {service.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-orange-600 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-bl-lg">
                    Featured
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Highlights List */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  id={`request-service-btn-${service.id}`}
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors group/btn"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Quick Consultation Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Need a Custom Diagnostic or Repair Evaluation?
            </h3>
            <p className="text-sm text-slate-600">
              Speak directly with our service team in Tampa to discuss symptoms, estimate repair steps, and schedule your appointment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              id="services-call-banner-btn"
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold border border-slate-200 flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-orange-600" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            
            <button
              id="services-book-banner-btn"
              type="button"
              onClick={() => onSelectService('General Inspection & Diagnostics')}
              className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <span>Book an Evaluation</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
