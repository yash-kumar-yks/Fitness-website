
import React, { useState } from 'react';
import { findHealthyMealsByBudget } from '../services/geminiService';
import { BudgetMeal } from '../types';

const BudgetFinder: React.FC = () => {
  const [budget, setBudget] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState<BudgetMeal[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget || isNaN(Number(budget))) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await findHealthyMealsByBudget(Number(budget));
      setMeals(results);
    } catch (err) {
      setError("Could not find meals for this budget. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Budget Healthy Finder</h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg">Tell us your budget, and we'll find the most nutritious meals you can get.</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-16 relative">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="text-gray-400 dark:text-slate-500 font-bold text-lg">₹</span>
              </div>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter amount (e.g. 250)"
                className="block w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-0 transition-all text-xl font-bold placeholder:font-medium placeholder:text-gray-300 dark:placeholder:text-slate-700 shadow-sm"
              />
            </div>
            <button
              disabled={loading}
              className="px-8 py-4 bg-emerald-600 dark:bg-emerald-700 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-all disabled:opacity-50 flex items-center justify-center min-w-[160px]"
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Find Meals"
              )}
            </button>
          </div>
          {error && <p className="mt-4 text-red-500 dark:text-red-400 text-sm font-bold text-center">{error}</p>}
        </form>

        {meals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meals.map((meal, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white capitalize leading-tight pr-2">{meal.name}</h3>
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-400 font-bold text-sm whitespace-nowrap">
                    {meal.estimatedPrice}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{meal.healthBenefits}</p>
                <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {meal.calories}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && meals.length === 0 && !error && (
          <div className="text-center py-20 bg-gray-50/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-800 transition-colors">
             <div className="text-5xl mb-4">💰</div>
             <p className="text-gray-400 dark:text-slate-600 font-medium max-w-xs mx-auto">Enter a budget above to see healthy meal recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetFinder;
