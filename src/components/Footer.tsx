import React from 'react';
import { Phone, MapPin, Clock, Navigation, Wrench, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, BUSINESS_HOURS } from '../data/businessData';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location & Hours', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="main-footer" className="bg-white text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Business Identity & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-sm">
                <Wrench className="w-5 h-5 text-white transform -rotate-12" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                EURO <span className="text-orange-600">CAR</span> SERVICES
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Professional automotive repair and European vehicle service in Tampa, Florida. Dedicated to honest pricing, reliable diagnostics, and quality workmanship.
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="hover:text-orange-600 font-bold">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                id="footer-get-directions-btn"
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-orange-600" />
                <span>Get Directions on Google Maps</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-slate-900 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    id={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-600 hover:text-orange-600 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Business Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <h4 className="font-bold text-slate-900 text-base">
                Business Hours
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {BUSINESS_HOURS.map((h) => (
                <div key={h.day} className="flex justify-between py-1.5 border-b border-slate-200/60 last:border-0">
                  <span className="text-slate-700 font-medium">{h.day}</span>
                  <span className={h.isOpenDay ? 'text-slate-900 font-bold' : 'text-slate-400 font-normal'}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Located at 14228 N Florida Ave #103 in Tampa, FL 33613. For towing, inquiries, or scheduled drop-offs, call during open hours.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Euro Car Services. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 font-medium transition-colors"
            >
              Google Maps Listing
            </a>
            <span>•</span>
            <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="hover:text-slate-900 font-medium transition-colors">
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
