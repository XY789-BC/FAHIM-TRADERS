import { ServiceItem, MaterialItem, ProjectShowcase, ProjectInquiry } from '../types';

export const COMPANY_INFO = {
  name: 'FAHIM TRADERS',
  tagline: 'Structural Welding & All Iron and Steel Materials For Home Construction',
  phoneDisplay: '0300 0127565',
  phoneRaw: '03000127565',
  phoneInternational: '+92 300 0127565',
  whatsAppUrl: 'https://wa.me/923000127565',
  email: 'fahimkhan1234568@gmail.com',
  workingHours: 'Monday – Saturday: 8:00 AM – 8:00 PM',
  specialties: [
    'Heavy Structural Welding',
    'Modern Residential Main Gates',
    'Elevated Solar Mounting Structures',
    'Home Construction Iron & Steel Supply',
    'Industrial Sheds & Roof Trusses',
    'Security Grills & Railings'
  ],
  standardSteelRatePerKg: 285 // Average standard MS structural fabrication rate estimate PKR/kg
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'structural-welding',
    number: '01',
    title: 'Structural Steel Welding',
    description: 'High-strength arc and MIG welding for building frameworks, I-beam load-bearing columns, mezzanine floors, and heavy industrial warehouse trusses engineered for maximum load stability.',
    keyFeatures: [
      'Certified high-penetration joint welding',
      'Structural deflection and load compliance',
      'Anti-corrosive red oxide & zinc-chromate primer treatment',
      'On-site erection and alignment with laser leveling'
    ],
    recommendedMaterials: 'ASTM A36 / Grade 50 I-Beams, Girder Channels, 10mm+ Gusset Plates',
    typicalGauge: '10mm to 25mm structural flange thickness'
  },
  {
    id: 'main-gates',
    number: '02',
    title: 'Architectural Residential Main Gates',
    description: 'Custom handcrafted modern main entrance gates tailored for contemporary residences. Available in motorized sliding tracks, bi-fold systems, and heavy double swing configurations.',
    keyFeatures: [
      'Heavy 14 & 16-gauge steel sheet with solid square tube perimeter',
      'Laser-cut CNC privacy accent panels and decorative geometric steel bars',
      'Concealed ball-bearing heavy duty hinges for featherlight operation',
      'High-grade dual polyurethane anti-rust matte finish coatings'
    ],
    recommendedMaterials: 'MS Hollow Square Sections, 14-Gauge Cold Rolled Sheets, Solid Iron Bars',
    typicalGauge: '14 Gauge (2.0mm) & 16 Gauge (1.6mm)'
  },
  {
    id: 'solar-structures',
    number: '03',
    title: 'Elevated Rooftop Solar Mounting Structures',
    description: 'Engineered heavy-duty solar panel frames built to withstand high wind loads and harsh weather. High-rise elevated stands (6ft to 12ft clearance) to preserve usable roof space.',
    keyFeatures: [
      'Wind-load certified design resisting up to 130 km/h gusts',
      'Hot-dip galvanized or heavy MS channel frames with zinc anti-rust primer',
      'Adjustable seasonal tilt brackets (15° to 30° solar orientation)',
      'Secure chemical anchoring or concrete counterweight pedestal mounts'
    ],
    recommendedMaterials: 'Hot-Dip Galvanized Iron (GI) Angles, C-Channels, Stainless Fasteners',
    typicalGauge: '12 Gauge (2.6mm) to 14 Gauge (2.0mm) Heavy Angle'
  },
  {
    id: 'safety-grills',
    number: '04',
    title: 'Home Window Grills & Balcony Railings',
    description: 'Architectural window safety grills, terrace parapet railings, and spiral staircase fabrication providing uncompromising home security without sacrificing modern aesthetics.',
    keyFeatures: [
      'Solid square iron bars (12mm, 14mm, 16mm) with seamless weld points',
      'Contemporary horizontal slatted minimalist profiles',
      'Precision welded boundary wall safety spikes and razor wire brackets',
      'Smooth ground weld joints with epoxy primer coats'
    ],
    recommendedMaterials: 'Solid Square Bright Bars, 1"x1" MS Box Pipes, Cast Steel Finials',
    typicalGauge: '12mm – 16mm solid iron square bars'
  },
  {
    id: 'steel-sheds',
    number: '05',
    title: 'Industrial & Commercial Steel Sheds',
    description: 'Turnkey fabrication and erection of warehouse steel sheds, car porch frameworks, factory roofs, and commercial parking structures using structural steel trusses.',
    keyFeatures: [
      'Clear span designs eliminating obstructing internal columns',
      'Engineered purlins and girts for corrugated and sandwich panel sheets',
      'Integrated rainwater gutter and downpipe steel brackets',
      'Rapid fabrication and bolt-together field erection'
    ],
    recommendedMaterials: 'Universal Beams, RHS/SHS Sections, Z-Purlins, Color-coated Sheets',
    typicalGauge: 'Structural Channels 4"x2" to 8"x3"'
  },
  {
    id: 'materials-supply',
    number: '06',
    title: 'Complete Iron & Steel Materials Supply',
    description: 'Direct wholesale and retail supply of all iron and steel raw materials required for home construction: pipes, angles, channels, sheets, deformed bars, and welding consumables.',
    keyFeatures: [
      'Extensive stock of Grade 60 and Grade 40 deformed steel bars (Sarya)',
      'Full gauge selection from 12-gauge to 20-gauge MS and GI hollow pipes',
      'Cut-to-size cutting service and custom bending per architectural drawings',
      'Direct dispatch to residential and commercial construction sites'
    ],
    recommendedMaterials: 'Full inventory of MS Square Pipes, Angles, Channels, Rebars, Sheets',
    typicalGauge: 'All standard commercial gauges & thicknesses'
  }
];

export const MATERIALS_CATALOG: MaterialItem[] = [
  {
    id: 'mat-main-gates',
    name: 'Residential Main Gate Steel Profiles',
    category: 'gates',
    description: 'Heavy gauge rectangular and square hollow steel sections paired with cold-rolled sheets for modern luxury house main gates.',
    specifications: [
      'Frame: 2" x 4" and 2" x 2" MS Box Pipe (14-gauge / 2.0mm)',
      'Infill: 14-gauge or 16-gauge cold rolled steel plate with laser cuts',
      'Hinges: Heavy duty greaseable bullet barrel bearings (capacity up to 800kg)',
      'Lock Box: Pre-fabricated heavy steel security lock housing'
    ],
    standardGauges: ['14 Gauge (2.0mm)', '16 Gauge (1.6mm)', '12 Gauge (2.6mm)'],
    typicalUses: ['Main house entrance sliding gates', 'Double leaf swing gates', 'Side boundary pedestrian gates'],
    corrosionProtection: 'Dual-coat epoxy primer followed by matte polyurethane enamel',
    inStock: true
  },
  {
    id: 'mat-solar-structures',
    name: 'Heavy-Duty Solar Mounting Channels & Angles',
    category: 'solar',
    description: 'High tensile galvanized iron (GI) and MS angle steel tailored for elevated rooftop solar panel installations.',
    specifications: [
      'Primary Columns: 3" x 3" or 2.5" x 2.5" Heavy Angle / Box Sections',
      'Rafters & Purlins: C-Channel 40x80mm or 50x100mm slotted for clamps',
      'Elevation Heights: 6ft to 12ft clearance options for walkable rooftops',
      'Hardware: Grade 8.8 structural bolts with stainless steel solar mid/end clamps'
    ],
    standardGauges: ['12 Gauge (2.6mm)', '14 Gauge (2.0mm)'],
    typicalUses: ['Elevated rooftop solar frames', 'Ground-mount solar arrays', 'Carport solar pergolas'],
    corrosionProtection: 'Hot-dip galvanized (80+ microns) or industrial zinc-phosphate coated',
    inStock: true
  },
  {
    id: 'mat-ms-pipes',
    name: 'Mild Steel (MS) Hollow Pipes & Square Tubes',
    category: 'raw_steel',
    description: 'Prime quality electric resistance welded (ERW) mild steel pipes in square, rectangular, and round profiles.',
    specifications: [
      'Sizes: 0.5" x 0.5" up to 6" x 6" square hollow sections',
      'Rectangular: 1" x 2", 1.5" x 3", 2" x 4", 2" x 6"',
      'Length: Standard 20-foot commercial lengths (custom cuts available)',
      'Tolerance: Precise wall thickness according to industrial standards'
    ],
    standardGauges: ['14 Gauge (2.0mm)', '16 Gauge (1.6mm)', '18 Gauge (1.2mm)', '20 Gauge (0.9mm)'],
    typicalUses: ['Gate frames', 'Shed purlins', 'Railing stanchions', 'Furniture frames'],
    corrosionProtection: 'Mill oil finish, ready for anti-corrosion primer application',
    inStock: true
  },
  {
    id: 'mat-angle-channels',
    name: 'Structural Angle Iron & C-Channels',
    category: 'structural',
    description: 'Hot rolled mild steel angles and channels engineered for load bearing applications in buildings and sheds.',
    specifications: [
      'Angles: 1" x 1" x 1/8" up to 4" x 4" x 3/8"',
      'Channels: 3" x 1.5", 4" x 2", 5" x 2.5", 6" x 3" and 8" x 3"',
      'Yield Strength: Minimum 250 MPa (ASTM A36 comparable)',
      'Weldability: Excellent suitability for arc, MIG, and stick welding'
    ],
    standardGauges: ['3mm to 12mm thickness', 'Standard and heavy weight sections'],
    typicalUses: ['Warehouse trusses', 'Solar structure columns', 'Tank stands', 'Lintels'],
    corrosionProtection: 'Red oxide industrial primer or hot-dip galvanizing',
    inStock: true
  },
  {
    id: 'mat-window-grills',
    name: 'Solid Square Bars & Security Grill Stock',
    category: 'grills',
    description: 'Solid mild steel square bars, round rods, and flat bars for home window security and perimeter protection.',
    specifications: [
      'Solid Square: 10mm, 12mm, 14mm, 16mm, and 20mm solid bars',
      'Flat Iron: 0.75" x 3/16", 1" x 1/4", 1.5" x 1/4" boundary flats',
      'Decorative: Cast iron spears, rings, rosettes, and forged scrolls',
      'Finish: Sanded smooth weld joints ready for electrostatic paint'
    ],
    standardGauges: ['12mm solid', '14mm solid', '16mm solid heavy duty'],
    typicalUses: ['Residential window grills', 'Balcony safety railings', 'Boundary wall security spikes'],
    corrosionProtection: 'Rust-inhibitive synthetic primer with UV-resistant topcoat',
    inStock: true
  },
  {
    id: 'mat-rebar-steel',
    name: 'Grade 60 Deformed Steel Bars (Sarya)',
    category: 'raw_steel',
    description: 'High-strength thermo-mechanically treated (TMT) deformed steel rebars for concrete foundations and columns in residential construction.',
    specifications: [
      'Diameters: #3 (3/8" - 10mm), #4 (1/2" - 12mm), #6 (3/4" - 19mm), #8 (1" - 25mm)',
      'Standard: ASTM A615 Grade 60 (60,000 psi yield strength)',
      'Rib Pattern: Deep transverse ribs for superior concrete adhesion',
      'Bending: Superior ductility permitting 180-degree bend tests without cracking'
    ],
    standardGauges: ['3 Soot (10mm)', '4 Soot (12mm)', '6 Soot (19mm)', '8 Soot (25mm)'],
    typicalUses: ['House foundations', 'Roof slabs', 'Reinforced concrete columns and beams', 'Retaining walls'],
    corrosionProtection: 'Mill scale protective oxide, stored under covered yard',
    inStock: true
  }
];

export const PROJECT_SHOWCASE: ProjectShowcase[] = [
  {
    id: 'proj-01',
    title: 'Modern Architectural Residence Main Gate',
    category: 'Residential Gate',
    description: 'Contemporary double-leaf entrance gate with recessed matte black 14-gauge steel plates, slotted ventilation louvers, and heavy ball-bearing hinges.',
    image: '/src/assets/images/gate_iron_fabrication_1791991056664.jpg',
    materialsUsed: '14-Gauge MS Cold Rolled Sheet, 2"x3" Rectangular Tube Frame, Stainless Accent Trim',
    dimensionsOrScope: '14 ft width x 8 ft height (Dual Swing)',
    completionTime: '7 Working Days',
    gaugeSpec: '14 Gauge (2.0mm Heavy)'
  },
  {
    id: 'proj-02',
    title: '15kW Elevated Rooftop Solar Mounting Structure',
    category: 'Solar Structure',
    description: 'Heavy duty elevated solar frame installed on residential rooftop, providing 8.5 feet of clear headroom beneath the 28 solar modules to preserve roof recreation area.',
    image: '/src/assets/images/solar_structure_rooftop_1791991056923.jpg',
    materialsUsed: 'Hot-Dip Galvanized C-Channels & 2.5"x2.5" Structural Angles, Grade 8.8 Fasteners',
    dimensionsOrScope: '28 Panels (550W Tier-1 Panels Capacity)',
    completionTime: '5 Working Days',
    gaugeSpec: '12 Gauge Structural GI Channels'
  },
  {
    id: 'proj-03',
    title: 'Structural Steel Roof Truss & Warehouse Framework',
    category: 'Structural Welding',
    description: 'Engineered welded steel trusses with clear 45-foot span for commercial workshop facility. Complete with cross-bracing and crane gantry brackets.',
    image: '/src/assets/images/structural_steel_truss_1791991057761.jpg',
    materialsUsed: 'Heavy I-Beams, 3"x3" Equal Angles, High-Penetration Welded Gusset Connections',
    dimensionsOrScope: '45 ft clear span x 90 ft building length',
    completionTime: '18 Working Days',
    gaugeSpec: 'ASTM A36 Heavy Structural Flanges'
  },
  {
    id: 'proj-04',
    title: 'Fahim Traders Precision Welding Workshop',
    category: 'Fabrication Facility',
    description: 'Our in-house fabrication floor equipped with heavy duty arc welders, MIG rigs, hydraulic cutting shears, and precision angle notchers ensuring exact tolerances.',
    image: '/src/assets/images/hero_welding_workshop_1791991056243.jpg',
    materialsUsed: 'Complete stock of ERW square pipes, angle iron, C-channels, and sheet stock',
    dimensionsOrScope: 'Full-service metal fabrication capacity',
    completionTime: 'Continuous Operation',
    gaugeSpec: 'All gauges up to 25mm structural steel'
  }
];

export const INITIAL_INQUIRY: ProjectInquiry = {
  id: 'inq-fahim-001',
  clientName: 'FAHIM TRADERS',
  email: 'fahimkhan1234568@gmail.com',
  phone: '03000127565',
  serviceRequired: 'STRUCTURAL WELDING',
  estimatedScope: 'Main Gate & Solar Structure Fabrication / Iron Materials Supply',
  preferredContact: 'Phone',
  projectDetails: 'we have all iron and steel materials which are use to make home like main gate, solar structure etc',
  timestamp: '2026-10-14 08:17',
  status: 'In Review',
  priority: 'High',
  estimatedBudget: 'Under Assessment',
  notes: 'Client requests priority contact by phone. Has complete iron & steel inventory for residential construction including main gate and solar mounting structures.'
};

export const GAUGE_CHART = [
  { gauge: '10 Gauge', thicknessMm: '3.40 mm', weightKgSqM: '26.7 kg/m²', recommendedUse: 'Heavy truck gates, industrial structural gussets, severe load brackets' },
  { gauge: '12 Gauge', thicknessMm: '2.67 mm', weightKgSqM: '21.0 kg/m²', recommendedUse: 'Heavy solar structure columns, elevated water tank frames, warehouse trusses' },
  { gauge: '14 Gauge', thicknessMm: '1.98 mm', weightKgSqM: '15.5 kg/m²', recommendedUse: 'Premium residential main gates, solar purlins, security sliding doors (RECOMMENDED)' },
  { gauge: '16 Gauge', thicknessMm: '1.57 mm', weightKgSqM: '12.3 kg/m²', recommendedUse: 'Standard residential gates, window grill frames, boundary wall railing panels' },
  { gauge: '18 Gauge', thicknessMm: '1.21 mm', weightKgSqM: '9.5 kg/m²', recommendedUse: 'Internal doors, lightweight louvers, light sheet covers (not recommended for main security)' },
  { gauge: '20 Gauge', thicknessMm: '0.91 mm', weightKgSqM: '7.1 kg/m²', recommendedUse: 'Ductwork, ceiling panels, non-structural coverings' }
];
