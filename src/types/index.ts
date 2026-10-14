export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  keyFeatures: string[];
  recommendedMaterials: string;
  typicalGauge: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'gates' | 'solar' | 'structural' | 'grills' | 'raw_steel';
  description: string;
  specifications: string[];
  standardGauges: string[];
  typicalUses: string[];
  corrosionProtection: string;
  inStock: boolean;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  materialsUsed: string;
  dimensionsOrScope: string;
  completionTime: string;
  gaugeSpec: string;
}

export interface ProjectInquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  estimatedScope: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  projectDetails: string;
  timestamp: string;
  status: 'Pending' | 'In Review' | 'Quoted' | 'In Progress' | 'Completed';
  priority: 'Standard' | 'High' | 'Urgent';
  estimatedBudget?: string;
  notes?: string;
}

export type EstimatorType = 'gate' | 'solar' | 'shed' | 'grills' | 'custom';

export interface EstimationResult {
  productType: string;
  estimatedWeightKg: number;
  estimatedMaterialCost: number;
  estimatedFabricationCost: number;
  estimatedTotalCost: number;
  completionDays: number;
  recommendedSpecs: string;
  breakdown: {
    label: string;
    value: string;
  }[];
}
