import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenGaugeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenGaugeGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-extrabold text-white font-display">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              Structural welding & all iron and steel materials for home construction: 
              architectural main entrance gates, elevated rooftop solar mounting frameworks, 
              window security grills, and certified commercial welding.
            </p>
            <div className="pt-2 text-slate-400">
              <span className="block font-medium text-white mb-1">Workshop Operating Hours:</span>
              <span>{COMPANY_INFO.workingHours}</span>
            </div>
          </div>

          {/* Fabrication Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display">Fabrication Services</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Structural Steel Welding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Residential Main Gates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Rooftop Solar Mounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Window Grills & Railings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Commercial Steel Sheds
                </button>
              </li>
            </ul>
          </div>

          {/* Home Steel Materials */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display">Home Steel Materials</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('materials')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  MS Hollow Pipes (14g & 16g)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('materials')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Galvanized Solar Channels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('materials')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Solid Square Iron Bars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('materials')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Grade 60 Deformed Rebar
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGaugeGuide}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer text-left"
                >
                  Sheet Gauge Comparison Chart
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Workshop Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display">Direct Workshop Contact</h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-slate-200 hover:text-amber-400 font-mono transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>

              <a
                href={COMPANY_INFO.whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {COMPANY_INFO.phoneInternational}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Structural Welding & Home Steel Materials.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavClick('inquiries')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Order Tracking
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
