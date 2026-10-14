import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, MessageCircle, X, CheckCircle2 } from 'lucide-react';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquirySubmitted: (inquiryData: any) => void;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  onInquirySubmitted
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('03000127565');
  const [service, setService] = useState('STRUCTURAL WELDING');
  const [details, setDetails] = useState('Need quotation for main gate / solar structure iron and steel materials');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onInquirySubmitted({
      clientName: name.trim(),
      phone: phone.trim(),
      email: COMPANY_INFO.email,
      serviceRequired: service,
      projectDetails: details.trim(),
      preferredContact: 'Phone'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl">
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Direct Workshop Quote
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-0.5">
              Request Welding & Steel Pricing
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Connect directly with Fahim Traders workshop engineers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center bg-emerald-950/40 border border-emerald-800 rounded-xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Quote Request Dispatched</h4>
            <p className="text-xs text-slate-300">
              Your inquiry has been registered in the system. We will contact you at {phone}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Full Name / Business *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. FAHIM TRADERS"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03000127565"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Service Category
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="STRUCTURAL WELDING">Structural Welding</option>
                  <option value="RESIDENTIAL MAIN GATE">Residential Main Gate</option>
                  <option value="SOLAR MOUNTING STRUCTURE">Solar Mounting Structure</option>
                  <option value="WINDOW GRILLS & RAILINGS">Window Grills & Railings</option>
                  <option value="RAW IRON & STEEL SUPPLY">Raw Iron & Steel Supply</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Scope / Material Requirements
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe dimensions, sheet gauge, or steel material quantities required..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`${COMPANY_INFO.whatsAppUrl}?text=Hello%20Fahim%20Traders,%20I%20need%20a%20quotation%20for%20${encodeURIComponent(service)}.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Fast WhatsApp</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Quote Request
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
