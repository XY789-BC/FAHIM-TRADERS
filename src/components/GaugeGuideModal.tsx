import React from 'react';
import { GAUGE_CHART } from '../data/companyData';
import { X, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface GaugeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GaugeGuideModal: React.FC<GaugeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-3xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Technical Guide for Home Builders
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-1">
              Steel Sheet & Hollow Section Gauge Reference
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              In sheet metal and pipe fabrication, a smaller gauge number indicates a thicker, stronger steel section.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table with Tabular Numerals */}
        <div className="overflow-x-auto mb-8 border border-slate-800 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Standard Gauge</th>
                <th className="py-3 px-4">Thickness</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Recommended Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {GAUGE_CHART.map((row) => {
                const isRecommended = row.gauge.includes('14');
                return (
                  <tr
                    key={row.gauge}
                    className={`hover:bg-slate-800/50 transition-colors ${
                      isRecommended ? 'bg-amber-400/5 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-white flex items-center gap-2">
                      <span>{row.gauge}</span>
                      {isRecommended && (
                        <span className="text-[10px] text-amber-400 uppercase font-sans font-bold">
                          [Standard Gate]
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-200">
                      {row.thicknessMm}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-400">
                      {row.weightKgSqM}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-300">
                      {row.recommendedUse}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expert Tips */}
        <div className="space-y-4 text-xs leading-relaxed">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">
                Why Fahim Traders Recommends 14-Gauge for Main Residential Gates:
              </strong>
              <p className="text-slate-300">
                Lighter 18-gauge sheets (1.2mm) are prone to denting, thermal warping in summer, and vibration rattle during windy days. 
                14-gauge (2.0mm) cold-rolled steel provides the structural rigidity required to prevent sagging, resist forced entry, and maintain razor-sharp alignment for decades.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium mb-1">
                Solar Structure Rust Protection: Hot-Dip Galvanizing vs. Ordinary Primer
              </strong>
              <p className="text-slate-300">
                Rooftops endure intense rain and thermal cycles. Fahim Traders fabricates rooftop solar frames with hot-dip galvanized iron (GI) channels offering 80+ micron zinc protection against corrosion, ensuring your solar investment lasts 25+ years without rust stains on your roof.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
