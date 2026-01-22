import { NutritionInfo, GroundingSource, BudgetMeal } from "../types";

/**
 * FOOD IMAGE ANALYSIS
 * Used by: Analyzer.tsx
 */
export const analyzeFoodImage = async (
  base64Image: string
): Promise<NutritionInfo> => {
  const res = await fetch("/.netlify/functions/analyzeFood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64Image }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return JSON.parse(await res.text()) as NutritionInfo;
};

/**
 * HEALTH INSIGHTS (Google Search grounded)
 * Used by: Analyzer.tsx → ResultView.tsx
 */
export const getHealthInsights = async (
  foodName: string
): Promise<{ text: string; sources: GroundingSource[] }> => {
  const res = await fetch("/.netlify/functions/healthInsights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ foodName }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return JSON.parse(await res.text()) as {
    text: string;
    sources: GroundingSource[];
  };
};

/**
 * BUDGET MEAL FINDER
 * Used by: BudgetFinder.tsx
 */
export const findHealthyMealsByBudget = async (
  amount: number,
  preferences: string[] = []
): Promise<BudgetMeal[]> => {
  const res = await fetch("/.netlify/functions/budgetMeals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      preferences,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch budget meals");
  }

  return res.json();
};
