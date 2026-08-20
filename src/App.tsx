import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { LocationHours } from './components/LocationHours';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { AppointmentModal } from './components/AppointmentModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceForModal, setActiveServiceForModal] = useState<string>('European Auto Repair');

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setActiveServiceForModal(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleSelectServiceFromCard = (serviceName: string) => {
    setActiveServiceForModal(serviceName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-orange-600 selection:text-white font-sans">
      {/* Navigation Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. About Us Section */}
        <About onOpenBooking={() => handleOpenBooking()} />

        {/* 3. Services Section */}
        <Services onSelectService={handleSelectServiceFromCard} />

        {/* 4. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 5. Gallery Section (10 Verified Business Links) */}
        <Gallery />

        {/* 6. Location & Hours Section */}
        <LocationHours onOpenBooking={() => handleOpenBooking()} />

        {/* 7. Contact & Appointment Request Section */}
        <ContactSection initialService={activeServiceForModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Action Bar */}
      <FloatingCTA onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={activeServiceForModal}
      />
    </div>
  );
}
