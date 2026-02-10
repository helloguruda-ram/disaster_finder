
export enum DisasterType {
  FIRE = 'FOREST_FIRE',
  TSUNAMI = 'TSUNAMI',
  NORMAL = 'NORMAL',
  UNKNOWN = 'UNKNOWN'
}

export interface AnalysisResult {
  category: DisasterType;
  confidence: number;
  reasoning: string;
  detectedFeatures: string[];
  recommendedAction: string;
}

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  result: AnalysisResult;
}
