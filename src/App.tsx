import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MaterialsCatalog } from './components/MaterialsCatalog';
import { CostEstimator } from './components/CostEstimator';
import { ProjectGallery } from './components/ProjectGallery';
import { InquiryManager } from './components/InquiryManager';
import { Footer } from './components/Footer';
import { GaugeGuideModal } from './components/GaugeGuideModal';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { COMPANY_INFO } from './data/companyData';
import { Phone, MessageCircle, FileText, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('services');
  const [isGaugeModalOpen, setIsGaugeModalOpen] = useState<boolean>(false);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState<boolean>(false);

  // States for transferring from Estimator or Services to Inquiry Manager
  const [estimatorPreselectedService, setEstimatorPreselectedService] = useState<string>('');
  const [inquiryPrefilledScope, setInquiryPrefilledScope] = useState<string>('');
  const [inquiryPrefilledService, setInquiryPrefilledService] = useState<string>('');
  const [inquiryPrefilledBudget, setInquiryPrefilledBudget] = useState<string>('');

  const handleSelectServiceForEstimation = (serviceTitle: string) => {
    setEstimatorPreselectedService(serviceTitle);
    setActiveTab('estimator');
    const el = document.getElementById('estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectMaterialForQuote = (materialName: string) => {
    setInquiryPrefilledService('RAW IRON & STEEL MATERIALS SUPPLY');
    setInquiryPrefilledScope(`Material Order Request: ${materialName}`);
    setActiveTab('inquiries');
    const el = document.getElementById('inquiries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTransferToInquiry = (summary: string, serviceType: string, estimatedCost: string) => {
    setInquiryPrefilledScope(summary);
    setInquiryPrefilledService(serviceType);
    setInquiryPrefilledBudget(estimatedCost);
    setActiveTab('inquiries');
    const el = document.getElementById('inquiries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickQuoteSubmit = (data: any) => {
    setInquiryPrefilledService(data.serviceRequired);
    setInquiryPrefilledScope(data.projectDetails);
    setActiveTab('inquiries');
    const el = document.getElementById('inquiries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Bar with Strict 3-Zone Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickQuote={() => setIsQuickQuoteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenEstimator={() => {
            setActiveTab('estimator');
            const el = document.getElementById('estimator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenInquiryModal={() => {
            setActiveTab('inquiries');
            const el = document.getElementById('inquiries');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Quick Contact & Action Strip */}
        <section className="bg-slate-900 border-b border-slate-800 py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white">Direct Workshop Line:</span>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="font-mono text-amber-400 font-bold hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <span className="text-slate-400 hidden sm:inline">{COMPANY_INFO.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGaugeModalOpen(true)}
                className="text-slate-300 hover:text-white flex items-center gap-1 underline underline-offset-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Gauge Thickness Table</span>
              </button>
              <a
                href={COMPANY_INFO.whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Services & Capabilities */}
        <ServicesSection
          onSelectServiceForEstimation={handleSelectServiceForEstimation}
          onOpenGaugeGuide={() => setIsGaugeModalOpen(true)}
        />

        {/* Materials Catalog: All Iron and Steel Materials for Building Homes */}
        <MaterialsCatalog
          onSelectMaterialForQuote={handleSelectMaterialForQuote}
        />

        {/* Interactive Steel Weight & Cost Estimator */}
        <CostEstimator
          preselectedService={estimatorPreselectedService}
          onTransferToInquiry={handleTransferToInquiry}
        />

        {/* Projects Gallery */}
        <ProjectGallery
          onSelectProjectForEstimate={(cat) => handleSelectServiceForEstimation(cat)}
        />

        {/* Project Inquiries & Orders Management Portal */}
        <InquiryManager
          prefilledScope={inquiryPrefilledScope}
          prefilledService={inquiryPrefilledService}
          prefilledBudget={inquiryPrefilledBudget}
          onClearPrefilled={() => {
            setInquiryPrefilledScope('');
            setInquiryPrefilledService('');
            setInquiryPrefilledBudget('');
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenGaugeGuide={() => setIsGaugeModalOpen(true)}
      />

      {/* Modals */}
      <GaugeGuideModal
        isOpen={isGaugeModalOpen}
        onClose={() => setIsGaugeModalOpen(false)}
      />

      <QuickQuoteModal
        isOpen={isQuickQuoteOpen}
        onClose={() => setIsQuickQuoteOpen(false)}
        onInquirySubmitted={handleQuickQuoteSubmit}
      />
    </div>
  );
}
