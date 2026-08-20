import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Send, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Navigation,
  Car,
  MessageSquare,
  User,
  Mail
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/businessData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    vehicleMakeModel: '',
    vehicleYear: '',
    serviceNeeded: initialService || 'European Auto Repair',
    preferredDate: '',
    preferredTime: 'Morning (8:30 AM - 12:00 PM)',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a contact phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.vehicleMakeModel.trim()) {
      newErrors.vehicleMakeModel = 'Please enter your vehicle make and model';
    }

    if (!formData.serviceNeeded) {
      newErrors.serviceNeeded = 'Please select a service category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const randomCode = 'ECS-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(randomCode);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      vehicleMakeModel: '',
      vehicleYear: '',
      serviceNeeded: 'European Auto Repair',
      preferredDate: '',
      preferredTime: 'Morning (8:30 AM - 12:00 PM)',
      message: '',
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase shadow-sm">
            <span>Contact & Appointments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Schedule Your Service Appointment
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Request an automotive repair or maintenance appointment with our Tampa service team. We will review your request and get in touch to confirm your visit.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Business Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Euro Car Services
              </h3>

              <div className="space-y-5 text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Phone</p>
                    <a
                      id="contact-phone-display-link"
                      href={`tel:${BUSINESS_INFO.phoneTel}`}
                      className="text-lg font-bold text-slate-900 hover:text-orange-600 transition-colors block mt-0.5"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Call for urgent needs or immediate questions</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service Address</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{BUSINESS_INFO.address}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Tampa, Hillsborough County, Florida</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Hours</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">Monday – Friday: 8:30 AM – 5:30 PM</p>
                    <p className="text-xs text-slate-400">Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-3">
                <a
                  id="contact-call-now-btn"
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  id="contact-get-directions-btn"
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <Navigation className="w-4 h-4 text-orange-400" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Note Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-600 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <CheckCircle className="w-4 h-4 text-orange-600" />
                <span>What Happens After You Submit?</span>
              </div>
              <p className="leading-relaxed">
                Your request details are captured for our Tampa service writers. We will contact you by phone or email during standard operating hours to confirm diagnostic availability and scheduled bay time.
              </p>
            </div>

          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              
              {isSubmitted ? (
                <div id="appointment-success-container" className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-extrabold text-slate-900">
                      Service Request Received
                    </h4>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                      Thank you, <span className="font-bold text-slate-900">{formData.fullName}</span>. Your service appointment request for your <span className="font-bold text-slate-900">{formData.vehicleYear} {formData.vehicleMakeModel}</span> has been logged.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700">
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Request Reference:</span>
                      <span className="font-mono font-bold text-orange-600">{confirmationCode}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Requested Service:</span>
                      <span className="font-bold text-slate-900">{formData.serviceNeeded}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Preferred Date/Time:</span>
                      <span className="font-semibold text-slate-900">{formData.preferredDate || 'Flexible'} ({formData.preferredTime})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone Contact:</span>
                      <span className="font-semibold text-slate-900">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      id="submitted-call-btn"
                      href={`tel:${BUSINESS_INFO.phoneTel}`}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                    </a>

                    <button
                      id="submitted-reset-btn"
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form id="service-appointment-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Appointment & Service Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Complete this form to request a scheduled diagnostic or repair at Euro Car Services.
                    </p>
                  </div>

                  {/* Customer Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. John Doe"
                          className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                            errors.fullName ? 'border-red-500' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. (813) 555-0199"
                          className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                            errors.phone ? 'border-red-500' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Vehicle Year */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@example.com"
                          className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                            errors.email ? 'border-red-500' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Vehicle Year */}
                    <div className="space-y-1.5">
                      <label htmlFor="vehicleYear" className="block text-xs font-bold text-slate-700">
                        Vehicle Year
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="vehicleYear"
                          name="vehicleYear"
                          type="text"
                          value={formData.vehicleYear}
                          onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                          placeholder="e.g. 2019"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Make & Model */}
                  <div className="space-y-1.5">
                    <label htmlFor="vehicleMakeModel" className="block text-xs font-bold text-slate-700">
                      Vehicle Make & Model *
                    </label>
                    <div className="relative">
                      <Car className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="vehicleMakeModel"
                        name="vehicleMakeModel"
                        type="text"
                        required
                        value={formData.vehicleMakeModel}
                        onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                        placeholder="e.g. BMW 330i, Mercedes-Benz C300, Audi A4, VW Golf, Porsche Macan"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                          errors.vehicleMakeModel ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.vehicleMakeModel && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.vehicleMakeModel}
                      </p>
                    )}
                  </div>

                  {/* Service Needed & Preferred Date */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Service Needed Dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="serviceNeeded" className="block text-xs font-bold text-slate-700">
                        Service Needed *
                      </label>
                      <select
                        id="serviceNeeded"
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                      >
                        {SERVICES_LIST.map((srv) => (
                          <option key={srv.id} value={srv.title} className="bg-white text-slate-900">
                            {srv.title}
                          </option>
                        ))}
                        <option value="General Inspection & Diagnostic" className="bg-white text-slate-900">
                          General Inspection & Diagnostic
                        </option>
                        <option value="Other Repair / Maintenance" className="bg-white text-slate-900">
                          Other Repair / Maintenance
                        </option>
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="preferredDate" className="block text-xs font-bold text-slate-700">
                        Preferred Date (Mon–Fri)
                      </label>
                      <input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                      />
                    </div>
                  </div>

                  {/* Preferred Time Window */}
                  <div className="space-y-1.5">
                    <label htmlFor="preferredTime" className="block text-xs font-bold text-slate-700">
                      Preferred Time of Day
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: 'Morning (8:30 AM - 12:00 PM)' })}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                          formData.preferredTime.includes('Morning')
                            ? 'bg-orange-50 border-orange-300 text-orange-700 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Morning (8:30 AM – 12:00 PM)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: 'Afternoon (12:00 PM - 5:30 PM)' })}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                          formData.preferredTime.includes('Afternoon')
                            ? 'bg-orange-50 border-orange-300 text-orange-700 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Afternoon (12:00 PM – 5:30 PM)
                      </button>
                    </div>
                  </div>

                  {/* Message / Symptoms */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700">
                      Vehicle Symptoms or Additional Notes
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe any warning lights, noises, fluid leaks, or specific service items..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Request Button */}
                  <div className="pt-2">
                    <button
                      id="form-submit-request-btn"
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Service Request</span>
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2.5">
                      Need urgent same-day assistance? Call <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="text-orange-600 font-bold hover:underline">{BUSINESS_INFO.phoneDisplay}</a> directly.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
