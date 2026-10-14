import React from 'react';
import { SERVICES_DATA, COMPANY_INFO } from '../data/companyData';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForEstimation: (serviceTitle: string) => void;
  onOpenGaugeGuide: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEstimation,
  onOpenGaugeGuide
}) => {
  return (
    <section id="services" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Natural Editorial Styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Fabrication Expertise & Workshop Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 font-display text-balance">
              Engineered Iron & Steel Fabrication for Modern Construction
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              From heavy-gauge residential main entrance gates to elevated rooftop solar arrays and industrial beam structures, 
              Fahim Traders delivers high-penetration structural welding and certified steel fabrication.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenGaugeGuide}
              className="text-xs font-medium text-slate-300 hover:text-white px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
            >
              View Sheet Gauge Standards
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Numbered Service List with Clean Bento-Card Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group p-6 sm:p-7 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Clean Editorial Numbering (Natural human style, NO mechanical comment slashes) */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-mono text-amber-400/80 font-bold tracking-wider">{service.number}</span>
                  <span className="text-slate-400 font-medium">{service.typicalGauge}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-display mb-2.5">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Technical highlights */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                  {service.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[170px]" title={service.recommendedMaterials}>
                  {service.recommendedMaterials}
                </span>

                <button
                  onClick={() => onSelectServiceForEstimation(service.title)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  <span>Estimate Cost</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
