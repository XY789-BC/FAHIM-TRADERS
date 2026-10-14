import React, { useState, useEffect } from 'react';
import { ProjectInquiry } from '../types';
import { INITIAL_INQUIRY, COMPANY_INFO, SERVICES_DATA } from '../data/companyData';
import {
  Phone,
  Mail,
  MessageCircle,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  AlertCircle
} from 'lucide-react';

interface InquiryManagerProps {
  prefilledScope?: string;
  prefilledService?: string;
  prefilledBudget?: string;
  onClearPrefilled?: () => void;
}

export const InquiryManager: React.FC<InquiryManagerProps> = ({
  prefilledScope,
  prefilledService,
  prefilledBudget,
  onClearPrefilled
}) => {
  const STORAGE_KEY = 'fahim_traders_inquiries_v1';

  const [inquiries, setInquiries] = useState<ProjectInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return [INITIAL_INQUIRY];
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedInquiryForPrint, setSelectedInquiryForPrint] = useState<ProjectInquiry | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    clientName: 'FAHIM TRADERS Customer',
    email: 'fahimkhan1234568@gmail.com',
    phone: '03000127565',
    serviceRequired: 'STRUCTURAL WELDING',
    estimatedScope: '',
    preferredContact: 'Phone' as 'Phone' | 'WhatsApp' | 'Email',
    projectDetails: 'we have all iron and steel materials which are use to make home like main gate, solar structure etc',
    priority: 'High' as 'Standard' | 'High' | 'Urgent',
    estimatedBudget: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Populate prefilled data if transferred from calculator
  useEffect(() => {
    if (prefilledScope || prefilledService || prefilledBudget) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: prefilledService || prev.serviceRequired,
        estimatedScope: prefilledScope || prev.estimatedScope,
        estimatedBudget: prefilledBudget || prev.estimatedBudget,
        projectDetails: prefilledScope
          ? `Estimated via Calculator: ${prefilledScope}. Requires fabrication quote for iron & steel materials.`
          : prev.projectDetails
      }));
      setShowNewForm(true);
    }
  }, [prefilledScope, prefilledService, prefilledBudget]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [inquiries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.phone.trim()) {
      return;
    }

    const newInq: ProjectInquiry = {
      id: `inq-${Date.now()}`,
      clientName: formData.clientName.trim(),
      email: formData.email.trim() || COMPANY_INFO.email,
      phone: formData.phone.trim(),
      serviceRequired: formData.serviceRequired,
      estimatedScope: formData.estimatedScope || 'Custom Fabrication Scope',
      preferredContact: formData.preferredContact,
      projectDetails: formData.projectDetails.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      priority: formData.priority,
      estimatedBudget: formData.estimatedBudget || 'Quote Pending'
    };

    setInquiries([newInq, ...inquiries]);
    setFormSubmitted(true);
    if (onClearPrefilled) onClearPrefilled();

    setTimeout(() => {
      setFormSubmitted(false);
      setShowNewForm(false);
    }, 2000);
  };

  const handleUpdateStatus = (id: string, newStatus: ProjectInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      searchFilter === '' ||
      inq.clientName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inq.serviceRequired.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inq.phone.includes(searchFilter) ||
      inq.projectDetails.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section id="inquiries" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Project Management & Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 font-display">
              Fabrication Inquiries & Workshop Orders
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Log, track, and manage structural welding inquiries and steel fabrication orders. 
              Direct hotline connection to Fahim Traders at <strong className="text-white">0300 0127565</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showNewForm ? 'View Inquiries' : 'Submit New Inquiry'}</span>
            </button>
          </div>
        </div>

        {/* New Inquiry Form Modal / Drawer */}
        {showNewForm && (
          <div className="mb-12 p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Submit Structural Welding & Steel Order
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete the inquiry form for custom gate fabrication, rooftop solar frames, or raw steel supply.
                </p>
              </div>
              <button
                onClick={() => setShowNewForm(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {formSubmitted ? (
              <div className="p-8 text-center bg-emerald-950/40 border border-emerald-800 rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Inquiry Registered Successfully</h4>
                <p className="text-xs text-slate-300">
                  Your inquiry has been stored in the workshop portal. Fahim Traders will review your specifications.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Client / Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. FAHIM TRADERS"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 03000127565"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. fahimkhan1234568@gmail.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="STRUCTURAL WELDING">STRUCTURAL WELDING</option>
                      <option value="RESIDENTIAL MAIN GATE">RESIDENTIAL MAIN GATE</option>
                      <option value="SOLAR MOUNTING STRUCTURE">SOLAR MOUNTING STRUCTURE</option>
                      <option value="WINDOW GRILLS & RAILINGS">WINDOW GRILLS & RAILINGS</option>
                      <option value="STEEL SHED / TRUSS">STEEL SHED / TRUSS</option>
                      <option value="RAW IRON & STEEL MATERIALS SUPPLY">RAW IRON & STEEL MATERIALS SUPPLY</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-2">
                      {(['Phone', 'WhatsApp', 'Email'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContact: method })}
                          className={`flex-1 py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                            formData.preferredContact === method
                              ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Priority Level
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Standard">Standard Schedule</option>
                      <option value="High">High Priority</option>
                      <option value="Urgent">Urgent / Immediate Construction</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Estimated Scope / Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedScope}
                      onChange={(e) => setFormData({ ...formData, estimatedScope: e.target.value })}
                      placeholder="e.g. 14x7 ft Main Gate or 16 Solar Panels Rooftop"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Estimated Budget / Target (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      placeholder="e.g. PKR 180,000"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Details & Material Requirements *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Describe specific steel gauges, site location, design drawings, or materials required..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowNewForm(false)}
                    className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Save & Submit Project Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {['all', 'Pending', 'In Review', 'Quoted', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st === 'all' ? 'All Inquiries' : st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client or service..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Inquiries Cards Grid */}
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-5 sm:p-6 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  {/* Clean unboxed metadata with separators (NO pills) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1.5">
                    <span className="font-bold text-amber-400">{inq.serviceRequired}</span>
                    <span aria-hidden="true">·</span>
                    <span>Preferred: {inq.preferredContact}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">{inq.timestamp}</span>
                    {inq.priority === 'High' && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-400 font-semibold">High Priority</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">
                    {inq.clientName}
                  </h3>
                </div>

                {/* Status Switcher (interactive control) */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400">Status:</span>
                  <select
                    value={inq.status}
                    onChange={(e) => handleUpdateStatus(inq.id, e.target.value as any)}
                    className="text-xs bg-slate-950 text-slate-200 border border-slate-700 rounded-md px-2.5 py-1 focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Quoted">Quoted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Scope & Details */}
              <div className="py-4 space-y-2 text-xs sm:text-sm">
                <div className="text-slate-300">
                  <strong className="text-white font-medium">Estimated Scope:</strong> {inq.estimatedScope}
                </div>
                <div className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 font-mono text-xs">
                  "{inq.projectDetails}"
                </div>
                {inq.notes && (
                  <div className="text-slate-400 text-xs italic">
                    Note: {inq.notes}
                  </div>
                )}
              </div>

              {/* Contact Affordances & Quick Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-slate-400">
                  <a
                    href={`tel:${inq.phone}`}
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors font-mono font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{inq.phone}</span>
                  </a>

                  <a
                    href={`mailto:${inq.email}`}
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inq.email}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`${COMPANY_INFO.whatsAppUrl}?text=Hello%20Fahim%20Traders,%20regarding%20project%20inquiry%20for%20${encodeURIComponent(inq.clientName)}%20(${encodeURIComponent(inq.serviceRequired)}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/60 font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSelectedInquiryForPrint(inq)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Formal Slip</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredInquiries.length === 0 && (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800">
              <p className="text-slate-300 text-sm">No inquiries matching filter.</p>
            </div>
          )}
        </div>

      </div>

      {/* Formal Quote Slip Modal */}
      {selectedInquiryForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-xl w-full p-6 sm:p-8 text-white relative shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Official Fabrication Order Slip
                </span>
                <h3 className="text-xl font-extrabold font-display text-white mt-1">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Tel: {COMPANY_INFO.phoneDisplay} · Email: {COMPANY_INFO.email}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiryForPrint(null)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[11px]">Client Name</span>
                  <span className="font-bold text-white">{selectedInquiryForPrint.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                  <span className="font-mono font-bold text-amber-400">{selectedInquiryForPrint.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Service Requested</span>
                  <span className="text-white font-medium">{selectedInquiryForPrint.serviceRequired}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Preferred Contact</span>
                  <span className="text-white font-medium">{selectedInquiryForPrint.preferredContact}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Project Requirements</span>
                <p className="p-3 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 text-xs font-mono leading-relaxed">
                  {selectedInquiryForPrint.projectDetails}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>Inquiry Reference: {selectedInquiryForPrint.id}</span>
                <span>Date: {selectedInquiryForPrint.timestamp}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Order Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
