import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Send, 
  CheckCircle, 
  Car, 
  User, 
  Mail, 
  MessageSquare 
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/businessData';
import { ContactFormData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedService = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    vehicleMakeModel: '',
    vehicleYear: '',
    serviceNeeded: selectedService || 'European Auto Repair',
    preferredDate: '',
    preferredTime: 'Morning (8:30 AM - 12:00 PM)',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.vehicleMakeModel.trim()) {
      newErrors.vehicleMakeModel = 'Please enter vehicle make and model';
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

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="service-appointment-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative z-10 max-w-xl w-full bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Euro Car Services • Tampa, FL</span>
            <h3 className="text-lg font-bold text-slate-900">Book a Service Appointment</h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">Request Received!</h4>
                <p className="text-xs text-slate-600">
                  We have logged your request for your <span className="text-slate-900 font-bold">{formData.vehicleMakeModel}</span>.
                </p>
                <p className="text-xs text-slate-500">
                  Confirmation Code: <span className="font-mono text-orange-600 font-bold">{confirmationCode}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left space-y-1">
                <p><span className="text-slate-500">Service:</span> <span className="font-semibold text-slate-900">{formData.serviceNeeded}</span></p>
                <p><span className="text-slate-500">Date:</span> <span className="font-semibold text-slate-900">{formData.preferredDate || 'Flexible'} ({formData.preferredTime})</span></p>
                <p><span className="text-slate-500">Contact:</span> <span className="font-semibold text-slate-900">{formData.phone}</span></p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs sm:text-sm">
              <div className="grid sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="modal-name"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Michael Smith"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                        errors.fullName ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(813) 555-0123"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                        errors.phone ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="modal-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@domain.com"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                        errors.email ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                </div>

                {/* Vehicle Make & Model */}
                <div className="space-y-1">
                  <label htmlFor="modal-vehicle" className="block text-xs font-bold text-slate-700">
                    Vehicle Make / Model *
                  </label>
                  <div className="relative">
                    <Car className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="modal-vehicle"
                      type="text"
                      required
                      value={formData.vehicleMakeModel}
                      onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                      placeholder="e.g. BMW 330i or Audi Q5"
                      className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
                        errors.vehicleMakeModel ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.vehicleMakeModel && <p className="text-[10px] text-red-500">{errors.vehicleMakeModel}</p>}
                </div>
              </div>

              {/* Service Needed */}
              <div className="space-y-1">
                <label htmlFor="modal-service" className="block text-xs font-bold text-slate-700">
                  Service Requested
                </label>
                <select
                  id="modal-service"
                  value={formData.serviceNeeded}
                  onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                >
                  {SERVICES_LIST.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="General Diagnostics">General Diagnostics</option>
                  <option value="General Repair">Other Repair</option>
                </select>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label htmlFor="modal-date" className="block text-xs font-bold text-slate-700">
                    Preferred Date
                  </label>
                  <input
                    id="modal-date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="modal-time" className="block text-xs font-bold text-slate-700">
                    Time Window
                  </label>
                  <select
                    id="modal-time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                  >
                    <option value="Morning (8:30 AM - 12:00 PM)">Morning (8:30 AM – 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 5:30 PM)">Afternoon (12:00 PM – 5:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label htmlFor="modal-notes" className="block text-xs font-bold text-slate-700">
                  Notes / Symptoms (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    id="modal-notes"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe issue, warning lights, or mileage..."
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Appointment Request</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
