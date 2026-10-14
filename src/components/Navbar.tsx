import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenQuickQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Services' },
    { id: 'materials', label: 'Materials Catalog' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'projects', label: 'Projects' },
    { id: 'inquiries', label: 'Inquiries Portal' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('services')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 font-display">
              {COMPANY_INFO.name}
            </span>
          </button>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                    isActive
                      ? 'text-amber-400 border-amber-400 font-semibold'
                      : 'border-transparent hover:text-white hover:border-slate-500'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              title={`Call ${COMPANY_INFO.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={onOpenQuickQuote}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Instant Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="p-2 rounded-lg bg-amber-400 text-slate-950 sm:hidden"
              aria-label="Call Fahim Traders"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-amber-400/10 text-amber-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Call {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickQuote();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <span>Request Custom Fabrication Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
