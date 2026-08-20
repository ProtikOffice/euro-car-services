import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, MapPin, Clock, Wrench } from 'lucide-react';
import { BUSINESS_INFO, getTampaBusinessStatus } from '../data/businessData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(getTampaBusinessStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Update business status periodically
    const interval = setInterval(() => {
      setStatus(getTampaBusinessStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location & Hours', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top Notification / Trust Bar */}
      <div id="top-bar" className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href={BUSINESS_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{BUSINESS_INFO.address}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400 border-l border-slate-800 pl-4">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Mon – Fri: 8:30 AM – 5:30 PM (Sat–Sun Closed)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
              status.isOpen 
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' 
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
              {status.statusText} • {status.subText}
            </span>

            <a
              id="top-call-link"
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="font-semibold text-white hover:text-orange-400 flex items-center gap-1.5 pl-2 transition-colors"
            >
              <Phone className="w-3 h-3 text-orange-500" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              id="header-logo-link"
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
                <Wrench className="w-5 h-5 text-white transform -rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-1.5">
                  EURO <span className="text-orange-600">CAR</span> SERVICES
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-500 font-bold">
                  European Auto Repair • Tampa, FL
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Header Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                id="header-phone-btn"
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-all flex items-center gap-2 border border-slate-200/60"
              >
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <button
                id="header-book-btn"
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK SERVICE</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                id="header-mobile-call-icon"
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                aria-label="Call Euro Car Services"
                className="p-2.5 rounded-lg bg-slate-100 text-orange-600 border border-slate-200 hover:bg-slate-200"
              >
                <Phone className="w-5 h-5" />
              </a>

              <button
                id="header-mobile-menu-toggle"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className="p-2.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 grid gap-2">
              <a
                id="mobile-nav-call-btn"
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-900 font-bold flex items-center justify-center gap-2 border border-slate-200"
              >
                <Phone className="w-4 h-4 text-orange-600" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <button
                id="mobile-nav-book-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK SERVICE</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
