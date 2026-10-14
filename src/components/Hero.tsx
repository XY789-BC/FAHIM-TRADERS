import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, MessageCircle, Calculator, ShieldCheck, Hammer, Layers, Flame } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenInquiryModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator, onOpenInquiryModal }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Split (items-stretch, balanced height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Value Proposition & Contact */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Clean unboxed metadata with separators (NO static pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-semibold">
              <span>Structural Welding</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Architectural Main Gates</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Solar Mounting Frameworks</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-display text-balance">
              Precision Structural Welding & Complete Home Iron & Steel Materials
            </h1>

            {/* Concrete Value Description (No generic buzzwords) */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Fahim Traders supplies and fabricates the complete range of heavy iron and steel materials 
              required for residential construction: custom architectural main gates, heavy-gauge elevated rooftop solar mounting structures, 
              protective window grills, and certified structural steel welding.
            </p>

            {/* Interactive Primary & Direct Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-lg shadow-amber-400/10 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-slate-950" />
                <span>Calculate Fabrication Cost</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {COMPANY_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`${COMPANY_INFO.whatsAppUrl}?text=Hello%20Fahim%20Traders,%20I%20need%20a%20quotation%20for%20iron%20and%20steel%20structural%20welding%20work.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/60 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Workshop</span>
              </a>
            </div>

            {/* Verified Inquiry Reference Note */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-200">Workshop Direct:</span>
                <span>{COMPANY_INFO.email}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Mon–Sat 8:00 AM – 8:00 PM</span>
              </div>
              <button
                onClick={onOpenInquiryModal}
                className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-2"
              >
                Submit Project Details
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] sm:min-h-[460px] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative shadow-2xl">
              <img
                src="/src/assets/images/hero_welding_workshop_1791991056243.jpg"
                alt="Fahim Traders structural steel welder precision welding heavy I-beam"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Bottom Card Context */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-left">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="text-amber-400 font-semibold">Active Workshop Fabrication</span>
                  <span>ASTM A36 Heavy Steel</span>
                </div>
                <p className="text-sm font-medium text-white">
                  Heavy Structural I-Beam & Solar Rafter Welding
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column Proof & Specification Strip Below Hero */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded bg-amber-400/10 text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-display">Structural Welding</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full penetration arc & MIG joints for load-bearing building frames, columns, and mezzanine floor systems.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded bg-amber-400/10 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-display">Main Entrance Gates</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              14-gauge & 16-gauge cold rolled steel sheets with ball-bearing bullet hinges for lifetime smooth operation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded bg-amber-400/10 text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-display">Solar Structures</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Elevated high-wind certified rooftop stands (6ft to 12ft clearance) with galvanized channels and anti-corrosive primer.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded bg-amber-400/10 text-amber-400">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-display">Home Steel Materials</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete inventory of square MS box pipes, solid square bars, angles, sheets, and Grade 60 deformed rebar.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
