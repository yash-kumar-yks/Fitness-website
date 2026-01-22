
import React, { useState } from 'react';
import { findHealthyMealsByBudget } from '../services/geminiService';
import { BudgetMeal } from '../types';

const PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "High Protein",
  "Low Carb",
  "Dairy-free"
];

const BudgetFinder: React.FC = () => {
  const [budget, setBudget] = useState<string>('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState<BudgetMeal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const togglePreference = (pref: string) => {
    setSelectedPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const getBenefitIndicator = (meal: BudgetMeal) => {
    const text = (meal.name + " " + meal.healthBenefits).toLowerCase();
    
    if (text.includes('protein') || text.includes('muscle') || text.includes('paneer') || text.includes('egg') || text.includes('chicken')) {
      return {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 7H7v6h6V7z" />
            <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5v10h10V5H5z" clipRule="evenodd" />
          </svg>
        ),
        label: 'High Protein',
        color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
      };
    }
    if (text.includes('fiber') || text.includes('vegan') || text.includes('veg') || text.includes('digestive') || text.includes('leaf') || text.includes('salad')) {
      return {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.152.002-.228.006A3.974 3.974 0 019 7a4 4 0 118 0c0 1.017-.384 1.945-1.016 2.645A6.001 6.001 0 0110 4zm0 12a6 6 0 01-5.917-5H7.93c.089 1.546.383 2.97.837 4.118A6.004 6.004 0 0110 16z" clipRule="evenodd" />
          </svg>
        ),
        label: 'Plant Power',
        color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
      };
    }
    if (text.includes('vitamin') || text.includes('immunity') || text.includes('zinc') || text.includes('iron') || text.includes('nutritious')) {
      return {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0l-1.18-4.455L6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
        ),
        label: 'Nutrient Rich',
        color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
      };
    }
    return {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95V4.31a8.001 8.001 0 017.753 7.753v.05c0 .12-.02.238-.056.35a1 1 0 01-1.137.669 1.002 1.002 0 01-.669-1.137 6.002 6.002 0 00-5.814-5.814 1 1 0 01-1.137-.669 1 1 0 01.669-1.137 8.001 8.001 0 013.39-1.144V2.107a1 1 0 011.897-.951l.103.493zM2.053 11.3A1 1 0 013 10h1.31a8.001 8.001 0 017.753-7.753v.05a1 1 0 11-2 0 6.002 6.002 0 00-5.814 5.814 1 1 0 11-1.137.669 1 1 0 01.669-1.137A8.001 8.001 0 013.39 12.053H2.053a1 1 0 01-.95-1.103l.95.35z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Energy Balanced',
      color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
    };
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget || isNaN(Number(budget))) return;
    
    setLoading(true);
    setError(null);
    setMeals([]); // Clear previous results
    setExpandedIndex(null);
    try {
      const results = await findHealthyMealsByBudget(Number(budget), selectedPreferences);
      setMeals(results);
    } catch (err) {
      setError("Could not find meals for this budget. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Budget Healthy Finder</h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg">Tell us your budget, and we'll find the most nutritious meals you can get.</p>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <label className="block text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 text-center">
            Dietary Preferences
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {PREFERENCES.map(pref => (
              <button
                key={pref}
                onClick={() => togglePreference(pref)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                  selectedPreferences.includes(pref)
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20'
                    : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:border-emerald-200 dark:hover:border-emerald-900/50'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-16 relative">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="text-emerald-600 dark:text-emerald-400 font-black text-xl">₹</span>
              </div>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter amount (e.g. 250)"
                className="block w-full pl-12 pr-16 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-0 transition-all text-xl font-bold placeholder:font-medium placeholder:text-gray-300 dark:placeholder:text-slate-700 shadow-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                <span className="text-gray-400 dark:text-slate-500 font-black text-xs uppercase tracking-tighter">INR</span>
              </div>
            </div>
            <button
              disabled={loading}
              className="px-8 py-4 bg-emerald-600 dark:bg-emerald-700 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-all disabled:opacity-50 flex items-center justify-center min-w-[160px]"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching...</span>
                </div>
              ) : (
                "Find Meals"
              )}
            </button>
          </div>
          {error && <p className="mt-4 text-red-500 dark:text-red-400 text-sm font-bold text-center">{error}</p>}
        </form>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 w-32 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
                  <div className="h-6 w-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-full"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-100 dark:bg-slate-800/50 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-100 dark:bg-slate-800/50 rounded"></div>
                </div>
                <div className="h-4 w-24 bg-emerald-100 dark:bg-emerald-900/20 rounded"></div>
              </div>
            ))}
            <div className="col-span-full text-center py-6">
              <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm animate-bounce">curating local options for you...</p>
            </div>
          </div>
        )}

        {/* Results Area */}
        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {meals.map((meal, idx) => {
              const indicator = getBenefitIndicator(meal);
              const isExpanded = expandedIndex === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => toggleExpand(idx)}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all duration-300 cursor-pointer group flex flex-col h-full ${
                    isExpanded 
                      ? 'ring-4 ring-emerald-500/20 border-emerald-500 dark:border-emerald-500 shadow-2xl z-10 scale-[1.02]' 
                      : 'border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-900'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl font-black capitalize leading-tight pr-2 transition-colors ${isExpanded ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`}>
                      {meal.name}
                    </h3>
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-400 font-bold text-sm whitespace-nowrap shrink-0">
                      ₹{meal.estimatedPrice}
                    </div>
                  </div>
                  
                  <p className={`text-gray-600 dark:text-slate-400 text-sm mb-6 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {meal.healthBenefits}
                  </p>
                  
                  {isExpanded && (
                    <div className="mb-6 pt-4 border-t border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                      <div>
                        <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Nutritional Breakdown</span>
                        <div className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-300">
                          {meal.macronutrients
  ? `Protein: ${meal.macronutrients.protein}g · Carbs: ${meal.macronutrients.carbohydrates}g · Fats: ${meal.macronutrients.fats}g`
  : "Detailed macros coming soon."
}

                        </div>
                      </div>
                      
                      {meal.cookingSteps && meal.cookingSteps.length > 0 && (
                        <div>
                          <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-2">How to Prepare</span>
                          <ul className="space-y-2">
                            {meal.cookingSteps.map((step:string, sIdx:number) => (
                              <li key={sIdx} className="flex items-start space-x-3 text-sm text-gray-600 dark:text-slate-400">
                                <span className="flex-none w-5 h-5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center text-[10px] font-black">
                                  {sIdx + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.15em]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {meal.calories} kcal
                    </div>
                    
                    <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-bold text-[9px] uppercase tracking-wider ${indicator.color}`}>
                      {indicator.icon}
                      <span>{indicator.label}</span>
                    </div>
                  </div>

                  {!isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800/50 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Click to see recipe & nutrients &darr;</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && meals.length === 0 && !error && (
          <div className="text-center py-20 bg-gray-50/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-800 transition-colors">
             <div className="text-5xl mb-4">💰</div>
             <p className="text-gray-400 dark:text-slate-600 font-medium max-w-xs mx-auto">Enter a budget and select preferences to see recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetFinder;
