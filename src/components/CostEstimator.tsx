import React, { useState, useMemo } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { EstimatorType, EstimationResult } from '../types';
import { Calculator, Send, MessageCircle, Info, RefreshCw, Check } from 'lucide-react';

interface CostEstimatorProps {
  onTransferToInquiry: (summary: string, serviceType: string, estimatedCost: string) => void;
  preselectedService?: string;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  onTransferToInquiry,
  preselectedService
}) => {
  // Determine initial type from preselectedService
  const initialType: EstimatorType = useMemo(() => {
    if (!preselectedService) return 'gate';
    const s = preselectedService.toLowerCase();
    if (s.includes('solar')) return 'solar';
    if (s.includes('shed') || s.includes('structural')) return 'shed';
    if (s.includes('grill') || s.includes('railing')) return 'grills';
    return 'gate';
  }, [preselectedService]);

  const [estimatorType, setEstimatorType] = useState<EstimatorType>(initialType);

  // Gate Parameters
  const [gateWidth, setGateWidth] = useState<number>(14);
  const [gateHeight, setGateHeight] = useState<number>(7);
  const [gateGauge, setGateGauge] = useState<'14' | '16' | '18'>('14');
  const [gateType, setGateType] = useState<'sliding' | 'swing' | 'motorized'>('swing');

  // Solar Parameters
  const [solarPanelCount, setSolarPanelCount] = useState<number>(16);
  const [solarElevation, setSolarElevation] = useState<'standard' | 'elevated'>('elevated');
  const [solarMaterial, setSolarMaterial] = useState<'gi_galvanized' | 'ms_painted'>('gi_galvanized');

  // Shed Parameters
  const [shedLength, setShedLength] = useState<number>(30);
  const [shedWidth, setShedWidth] = useState<number>(20);
  const [shedHeight, setShedHeight] = useState<number>(12);

  // Grills Parameters
  const [grillAreaSqFt, setGrillAreaSqFt] = useState<number>(120);
  const [grillBarSize, setGrillBarSize] = useState<'12mm' | '14mm' | '16mm'>('14mm');

  // Calculation logic
  const estimation: EstimationResult = useMemo(() => {
    const steelBaseRate = COMPANY_INFO.standardSteelRatePerKg; // PKR / kg

    if (estimatorType === 'gate') {
      const area = gateWidth * gateHeight; // sq ft
      // 14 gauge gate: ~3.8 kg/sq.ft, 16 gauge: ~2.9 kg/sq.ft, 18 gauge: ~2.2 kg/sq.ft (including frame & hinges)
      const weightPerSqFt = gateGauge === '14' ? 3.8 : gateGauge === '16' ? 2.9 : 2.2;
      const baseWeight = Math.round(area * weightPerSqFt);
      const hardwareWeight = gateType === 'sliding' ? 35 : gateType === 'motorized' ? 50 : 25; // tracks, rollers, heavy hinges
      const totalWeightKg = baseWeight + hardwareWeight;

      const materialCost = totalWeightKg * steelBaseRate;
      const fabricationLabor = Math.round(totalWeightKg * 75); // PKR 75/kg welding, cutting, grinding & primer
      const finishAndHinges = gateType === 'motorized' ? 45000 : gateType === 'sliding' ? 18000 : 12000;
      const totalCost = materialCost + fabricationLabor + finishAndHinges;
      const days = area > 120 ? 8 : 6;

      return {
        productType: 'Residential Main Gate',
        estimatedWeightKg: totalWeightKg,
        estimatedMaterialCost: materialCost,
        estimatedFabricationCost: fabricationLabor + finishAndHinges,
        estimatedTotalCost: totalCost,
        completionDays: days,
        recommendedSpecs: `${gateGauge}-Gauge Steel Plate with 2"x3" Outer Tubular Frame & Heavy Ball-Bearing Hinges`,
        breakdown: [
          { label: 'Gate Dimensions', value: `${gateWidth} ft wide × ${gateHeight} ft high (${area} sq.ft)` },
          { label: 'Sheet Thickness', value: `${gateGauge} Gauge (${gateGauge === '14' ? '2.0mm Heavy Duty' : gateGauge === '16' ? '1.6mm Standard' : '1.2mm Economy'})` },
          { label: 'Mechanism Style', value: gateType === 'swing' ? 'Double Leaf Swing Gate' : gateType === 'sliding' ? 'Smooth Sliding Ground Track' : 'Motorized Automated Sliding' },
          { label: 'Total Steel Weight', value: `~${totalWeightKg.toLocaleString()} kg` },
          { label: 'Rust Protection', value: 'Double Zinc Chromate Primer + Polyurethane Paint' }
        ]
      };
    } else if (estimatorType === 'solar') {
      // Solar Structure
      // Avg 550W panel = ~2.6 sq.m. Structure requires ~22-26kg of steel per panel for elevated (walkable) or ~15-18kg for standard
      const weightPerPanel = solarElevation === 'elevated' ? 25 : 17;
      const totalWeightKg = solarPanelCount * weightPerPanel;
      const materialRate = solarMaterial === 'gi_galvanized' ? steelBaseRate * 1.35 : steelBaseRate; // GI is ~35% more expensive than raw MS
      const materialCost = Math.round(totalWeightKg * materialRate);
      const fabricationLabor = Math.round(totalWeightKg * 85); // Specialized angle cutting, hole punching, welding & anchoring
      const totalCost = materialCost + fabricationLabor;
      const days = solarPanelCount > 20 ? 7 : 4;

      return {
        productType: 'Rooftop Solar Mounting Structure',
        estimatedWeightKg: totalWeightKg,
        estimatedMaterialCost: materialCost,
        estimatedFabricationCost: fabricationLabor,
        estimatedTotalCost: totalCost,
        completionDays: days,
        recommendedSpecs: `${solarMaterial === 'gi_galvanized' ? 'Hot-Dip Galvanized GI' : 'Industrial Painted MS'} ${solarElevation === 'elevated' ? 'Walkable Rooftop Structure (8ft-10ft Clearance)' : 'Standard Low-Tilt Frame'}`,
        breakdown: [
          { label: 'Capacity', value: `${solarPanelCount} Panels (~${(solarPanelCount * 0.58).toFixed(1)} kW System)` },
          { label: 'Clearance Elevation', value: solarElevation === 'elevated' ? 'High Elevated (8ft-10ft Walkable Roof Space)' : 'Standard Roof Mount (4ft-5ft)' },
          { label: 'Material Grade', value: solarMaterial === 'gi_galvanized' ? 'Hot-Dip Galvanized Iron (GI) Channels' : 'Heavy-Duty Painted Mild Steel' },
          { label: 'Total Structure Weight', value: `~${totalWeightKg.toLocaleString()} kg` },
          { label: 'Wind Stability', value: 'Engineered for up to 130 km/h gusts' }
        ]
      };
    } else if (estimatorType === 'shed') {
      // Shed or Truss
      const area = shedLength * shedWidth;
      // Trusses, purlins, columns: ~14 kg per sq ft of floor area
      const totalWeightKg = Math.round(area * 11.5);
      const materialCost = totalWeightKg * steelBaseRate;
      const fabricationLabor = Math.round(totalWeightKg * 70);
      const totalCost = materialCost + fabricationLabor;
      const days = area > 1000 ? 21 : 12;

      return {
        productType: 'Structural Steel Shed / Truss',
        estimatedWeightKg: totalWeightKg,
        estimatedMaterialCost: materialCost,
        estimatedFabricationCost: fabricationLabor,
        estimatedTotalCost: totalCost,
        completionDays: days,
        recommendedSpecs: 'Welded Universal Column Beams, RHS Roof Trusses & Galvanized Z-Purlins',
        breakdown: [
          { label: 'Floor Dimensions', value: `${shedLength} ft × ${shedWidth} ft (${area} sq.ft)` },
          { label: 'Eave Height', value: `${shedHeight} ft Clear Working Height` },
          { label: 'Estimated Structural Steel', value: `~${(totalWeightKg / 1000).toFixed(2)} Metric Tons (${totalWeightKg.toLocaleString()} kg)` },
          { label: 'Connection Method', value: 'High-Strength Welded Gussets & Grade 8.8 Bolts' }
        ]
      };
    } else {
      // Window Grills & Railings
      const barWeightMult = grillBarSize === '16mm' ? 4.2 : grillBarSize === '14mm' ? 3.3 : 2.6; // kg per sq.ft
      const totalWeightKg = Math.round(grillAreaSqFt * barWeightMult);
      const materialCost = totalWeightKg * steelBaseRate;
      const fabricationLabor = Math.round(totalWeightKg * 90);
      const totalCost = materialCost + fabricationLabor;

      return {
        productType: 'Window Safety Grills & Railings',
        estimatedWeightKg: totalWeightKg,
        estimatedMaterialCost: materialCost,
        estimatedFabricationCost: fabricationLabor,
        estimatedTotalCost: totalCost,
        completionDays: 5,
        recommendedSpecs: `Solid ${grillBarSize} Square Iron Bars in 1"x1" Perimeter Steel Box Pipe`,
        breakdown: [
          { label: 'Coverage Area', value: `${grillAreaSqFt} sq.ft total grill area` },
          { label: 'Bar Specification', value: `Solid ${grillBarSize} Square Mild Steel` },
          { label: 'Total Steel Weight', value: `~${totalWeightKg.toLocaleString()} kg` },
          { label: 'Surface Preparation', value: 'Seamless weld grinding with anti-rust red oxide' }
        ]
      };
    }
  }, [
    estimatorType,
    gateWidth,
    gateHeight,
    gateGauge,
    gateType,
    solarPanelCount,
    solarElevation,
    solarMaterial,
    shedLength,
    shedWidth,
    shedHeight,
    grillAreaSqFt,
    grillBarSize
  ]);

  const generateWhatsAppEstimateMessage = () => {
    let msg = `*FAHIM TRADERS - ESTIMATE INQUIRY*\n`;
    msg += `Service: ${estimation.productType}\n`;
    msg += `Estimated Steel Weight: ${estimation.estimatedWeightKg} kg\n`;
    msg += `Estimated Total: PKR ${estimation.estimatedTotalCost.toLocaleString()}\n`;
    msg += `Specs: ${estimation.recommendedSpecs}\n`;
    estimation.breakdown.forEach((b) => {
      msg += `• ${b.label}: ${b.value}\n`;
    });
    msg += `\nPlease confirm formal quotation and fabrication availability.`;
    return encodeURIComponent(msg);
  };

  const handleTransfer = () => {
    const summary = `${estimation.productType} (${estimation.breakdown[0].value}, ${estimation.breakdown[1]?.value || ''}) - Est. Weight: ${estimation.estimatedWeightKg}kg`;
    const cost = `PKR ${estimation.estimatedTotalCost.toLocaleString()}`;
    onTransferToInquiry(summary, estimation.productType, cost);
  };

  return (
    <section id="estimator" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
            Interactive Engineering Calculator
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 font-display">
            Steel Weight & Fabrication Cost Estimator
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Select your structure type, enter your home dimensions or panel count, and calculate realistic 
            steel weight, current market material costs, and welding labor.
          </p>
        </div>

        {/* Structure Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setEstimatorType('gate')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              estimatorType === 'gate'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            01. Main Entrance Gate
          </button>
          <button
            onClick={() => setEstimatorType('solar')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              estimatorType === 'solar'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            02. Elevated Solar Structure
          </button>
          <button
            onClick={() => setEstimatorType('shed')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              estimatorType === 'shed'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            03. Steel Shed / Roof Truss
          </button>
          <button
            onClick={() => setEstimatorType('grills')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              estimatorType === 'grills'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            04. Window Grills & Railings
          </button>
        </div>

        {/* Estimator Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Form: Parameter Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-sm font-bold text-white font-display">
                <span>Configure {estimation.productType} Parameters</span>
                <span className="text-xs text-amber-400 font-mono">Real-time Model</span>
              </div>

              {/* Form Controls for Main Gate */}
              {estimatorType === 'gate' && (
                <div className="space-y-5 pt-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Gate Width (Feet): <span className="text-amber-400 font-mono font-bold">{gateWidth} ft</span>
                      </label>
                      <input
                        type="range"
                        min={8}
                        max={24}
                        step={1}
                        value={gateWidth}
                        onChange={(e) => setGateWidth(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>8 ft</span>
                        <span>14 ft (Standard)</span>
                        <span>24 ft</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Gate Height (Feet): <span className="text-amber-400 font-mono font-bold">{gateHeight} ft</span>
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={10}
                        step={0.5}
                        value={gateHeight}
                        onChange={(e) => setGateHeight(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>5 ft</span>
                        <span>7 ft (Standard)</span>
                        <span>10 ft</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Sheet Gauge Specification (Thickness):
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setGateGauge('14')}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                          gateGauge === '14'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white font-mono">14 Gauge</div>
                        <div className="text-[11px] text-slate-400">2.0mm Heavy Duty (Best)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGateGauge('16')}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                          gateGauge === '16'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white font-mono">16 Gauge</div>
                        <div className="text-[11px] text-slate-400">1.6mm Standard</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGateGauge('18')}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                          gateGauge === '18'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white font-mono">18 Gauge</div>
                        <div className="text-[11px] text-slate-400">1.2mm Economy</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Gate Opening Mechanism:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'swing', label: 'Double Swing', desc: 'Heavy bullet hinges' },
                        { id: 'sliding', label: 'Sliding Track', desc: 'Ball-bearing rollers' },
                        { id: 'motorized', label: 'Motorized Sliding', desc: 'Motor rack mounting' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setGateType(t.id as any)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                            gateType === t.id
                              ? 'bg-amber-400/10 border-amber-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{t.label}</div>
                          <div className="text-[11px] text-slate-400">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Controls for Solar Structure */}
              {estimatorType === 'solar' && (
                <div className="space-y-5 pt-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Number of Solar Panels: <span className="text-amber-400 font-mono font-bold">{solarPanelCount} Panels (~{(solarPanelCount * 0.58).toFixed(1)} kW)</span>
                    </label>
                    <input
                      type="range"
                      min={4}
                      max={48}
                      step={2}
                      value={solarPanelCount}
                      onChange={(e) => setSolarPanelCount(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>4 Panels (2 kW)</span>
                      <span>16 Panels (10 kW)</span>
                      <span>48 Panels (28 kW)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Structure Height & Rooftop Clearance:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSolarElevation('elevated')}
                        className={`p-3.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          solarElevation === 'elevated'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">Elevated Walkable (8–10 ft)</div>
                        <div className="text-[11px] text-slate-400 mt-1">Leaves roof 100% usable for sitting/drying</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSolarElevation('standard')}
                        className={`p-3.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          solarElevation === 'standard'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">Standard Tilt (4–5 ft)</div>
                        <div className="text-[11px] text-slate-400 mt-1">Lower profile, compact rooftop footprint</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Steel Material Treatment:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSolarMaterial('gi_galvanized')}
                        className={`p-3.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          solarMaterial === 'gi_galvanized'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">Hot-Dip Galvanized GI</div>
                        <div className="text-[11px] text-slate-400 mt-1">25+ Years rust resistance (Recommended)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSolarMaterial('ms_painted')}
                        className={`p-3.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          solarMaterial === 'ms_painted'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">Heavy MS Angle Painted</div>
                        <div className="text-[11px] text-slate-400 mt-1">Cost-effective with epoxy zinc primer</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Controls for Shed / Trusses */}
              {estimatorType === 'shed' && (
                <div className="space-y-5 pt-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Length: <span className="text-amber-400 font-mono font-bold">{shedLength} ft</span>
                      </label>
                      <input
                        type="range"
                        min={15}
                        max={80}
                        step={5}
                        value={shedLength}
                        onChange={(e) => setShedLength(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Width: <span className="text-amber-400 font-mono font-bold">{shedWidth} ft</span>
                      </label>
                      <input
                        type="range"
                        min={12}
                        max={50}
                        step={2}
                        value={shedWidth}
                        onChange={(e) => setShedWidth(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Clear Height: <span className="text-amber-400 font-mono font-bold">{shedHeight} ft</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={20}
                      step={1}
                      value={shedHeight}
                      onChange={(e) => setShedHeight(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Form Controls for Grills */}
              {estimatorType === 'grills' && (
                <div className="space-y-5 pt-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Total Grill Area: <span className="text-amber-400 font-mono font-bold">{grillAreaSqFt} sq.ft</span>
                    </label>
                    <input
                      type="range"
                      min={30}
                      max={400}
                      step={10}
                      value={grillAreaSqFt}
                      onChange={(e) => setGrillAreaSqFt(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Solid Square Bar Size:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['12mm', '14mm', '16mm'] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setGrillBarSize(size)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                            grillBarSize === size
                              ? 'bg-amber-400/10 border-amber-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{size} Bar</div>
                          <div className="text-[11px] text-slate-400">
                            {size === '12mm' ? 'Standard' : size === '14mm' ? 'Heavy Duty' : 'High Security'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Note on Fahim Traders Steel Inventory */}
            <div className="pt-4 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Fahim Traders warehouses all required raw iron & steel stock directly. Final quotations are weighed on certified digital platform scales.
              </span>
            </div>
          </div>

          {/* Right Card: Computed Estimate Breakdown */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-700 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Estimated Investment</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display tabular-nums mt-0.5">
                    PKR {estimation.estimatedTotalCost.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Estimated Weight</span>
                  <div className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums mt-0.5">
                    {estimation.estimatedWeightKg.toLocaleString()} kg
                  </div>
                </div>
              </div>

              {/* Technical Breakdown List */}
              <div className="py-5 space-y-2.5 text-xs sm:text-sm">
                {estimation.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-medium text-white text-right">{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Fabrication & Delivery Timeline</span>
                  <span className="font-semibold text-amber-400">{estimation.completionDays} Working Days</span>
                </div>
                <div className="flex items-center justify-between py-1 text-slate-300">
                  <span className="text-slate-400">Material Cost Approx.</span>
                  <span className="font-mono tabular-nums">PKR {estimation.estimatedMaterialCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1 text-slate-300">
                  <span className="text-slate-400">Welding, Primer & Labor</span>
                  <span className="font-mono tabular-nums">PKR {estimation.estimatedFabricationCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Recommended Spec Banner */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-6">
                <span className="text-amber-400 font-bold block mb-1">Standard Fahim Traders Spec:</span>
                {estimation.recommendedSpecs}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <a
                href={`${COMPANY_INFO.whatsAppUrl}?text=${generateWhatsAppEstimateMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Estimate Directly via WhatsApp</span>
              </a>

              <button
                onClick={handleTransfer}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit as Formal Project Inquiry</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
