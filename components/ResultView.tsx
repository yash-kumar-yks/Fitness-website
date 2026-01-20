
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultViewProps {
  result: AnalysisResult;
  onSave: () => void;
  onDiscard: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onSave, onDiscard }) => {
  const { nutrition, sources, imageUrl } = result;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Image and Overview */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <img src={imageUrl} alt={nutrition.foodName} className="w-full h-80 object-cover" />
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">{nutrition.foodName}</h1>
                  <p className="text-gray-500 dark:text-slate-400 mt-1">AI Detected Selection</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-2xl text-emerald-700 dark:text-emerald-400 font-bold text-xl">
                  {nutrition.calories} kcal
                </div>
              </div>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed italic">"{nutrition.summary}"</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 text-center transition-colors">
              <span className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Protein</span>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{nutrition.protein}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 text-center transition-colors">
              <span className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Carbs</span>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{nutrition.carbs}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 text-center transition-colors">
              <span className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Fats</span>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{nutrition.fats}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button 
              onClick={onDiscard}
              className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              Discard
            </button>
            <button 
              onClick={onSave}
              className="flex-[2] py-4 bg-emerald-600 dark:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-all flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save to Log</span>
            </button>
          </div>
        </div>

        {/* Right: Insights and Swaps */}
        <div className="space-y-6">
          {/* Healthier Swap Section */}
          <div className="bg-emerald-600 dark:bg-emerald-800/80 rounded-3xl shadow-xl p-6 text-white transition-colors">
            <div className="flex items-center space-x-3 mb-6 px-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Healthier Swaps (Same Calorie Range)</h3>
            </div>
            
            <div className="space-y-4">
              {nutrition.healthierAlternatives.map((alt, idx) => (
                <div key={idx} className="bg-white/10 dark:bg-black/20 rounded-2xl p-4 border border-white/20 hover:bg-white/15 dark:hover:bg-black/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">{alt.name}</h4>
                    <span className="bg-white dark:bg-slate-100 text-emerald-700 dark:text-emerald-800 px-3 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                      {alt.calories} kcal
                    </span>
                  </div>
                  <p className="text-emerald-50 dark:text-emerald-200 text-sm leading-relaxed">{alt.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search Grounding Insights */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Verified Health Facts</h3>
            </div>
            
            <div className="space-y-4">
              {sources.length > 0 ? (
                sources.map((source, idx) => (
                  <a 
                    key={idx}
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 border border-transparent hover:border-gray-200 dark:hover:border-slate-700 transition-all group"
                  >
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{source.title}</h5>
                      <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">Verify Nutrition Data &rarr;</span>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-gray-400 dark:text-slate-500 text-sm italic">Searching for additional scientific insights...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
