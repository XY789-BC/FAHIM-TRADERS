import React, { useState, useMemo } from 'react';
import { MATERIALS_CATALOG, COMPANY_INFO } from '../data/companyData';
import { MaterialItem } from '../types';
import { Search, PackageCheck, ShieldAlert, ArrowUpRight, MessageCircle } from 'lucide-react';

interface MaterialsCatalogProps {
  onSelectMaterialForQuote: (materialName: string) => void;
}

export const MaterialsCatalog: React.FC<MaterialsCatalogProps> = ({ onSelectMaterialForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Home Steel Materials' },
    { id: 'gates', label: 'Main Gates' },
    { id: 'solar', label: 'Solar Structures' },
    { id: 'structural', label: 'Heavy Structural' },
    { id: 'grills', label: 'Grills & Railings' },
    { id: 'raw_steel', label: 'Pipes & Rebar' }
  ];

  const filteredMaterials = useMemo(() => {
    return MATERIALS_CATALOG.filter((item: MaterialItem) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.specifications.some((s) => s.toLowerCase().includes(query)) ||
        item.typicalUses.some((u) => u.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="materials" className="py-20 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Complete Home Construction Inventory
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 font-display">
              All Iron & Steel Materials For Your House
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              We warehouse and fabricate all iron and steel materials needed for building residential houses: 
              main gate box pipes and sheets, elevated rooftop solar mounting frames, window security bars, and foundation steel.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pipes, gates, solar, gauges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Interactive Segmented Filter Tabs (functional buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item: MaterialItem) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed category & stock indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="capitalize text-slate-300 font-medium">
                    {item.category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>In Stock Yard</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {item.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Technical Specifications */}
                <div className="space-y-1.5 mb-5 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1.5">
                    Engineering Specs:
                  </div>
                  {item.specifications.map((spec, i) => (
                    <div key={i} className="text-xs text-slate-300 leading-snug">
                      • {spec}
                    </div>
                  ))}
                </div>

                {/* Standard Gauges */}
                <div className="mb-4">
                  <div className="text-xs text-slate-400 mb-1.5">Available Gauges / Thickness:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.standardGauges.map((g, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corrosion Protection */}
                <div className="text-xs text-slate-400 mb-4 flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-300 font-medium">Finishing:</strong> {item.corrosionProtection}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={`${COMPANY_INFO.whatsAppUrl}?text=Hello%20Fahim%20Traders,%20please%20send%20current%20rates%20for:%20${encodeURIComponent(item.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <button
                  onClick={() => onSelectMaterialForQuote(item.name)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
                >
                  <span>Request Quote</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800">
            <p className="text-slate-300 text-sm">No steel materials found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-400 underline font-medium cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
