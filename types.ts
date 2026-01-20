
export interface HealthyAlternative {
  name: string;
  calories: number;
  benefits: string;
}

export interface BudgetMeal {
  name: string;
  estimatedPrice: string;
  healthBenefits: string;
  calories: string;
}

export interface NutritionInfo {
  foodName: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  healthierAlternatives: HealthyAlternative[];
  summary: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  nutrition: NutritionInfo;
  sources: GroundingSource[];
  imageUrl: string;
}

export interface LogEntry extends AnalysisResult {
  id: string;
  timestamp: number;
}
