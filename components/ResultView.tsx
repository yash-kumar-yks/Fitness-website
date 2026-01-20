
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
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img src={imageUrl} alt={nutrition.foodName} className="w-full h-80 object-cover" />
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">{nutrition.foodName}</h1>
                  <p className="text-gray-500 mt-1">AI Detected Selection</p>
                </div>
                <div className="bg-emerald-50 px-4 py-2 rounded-2xl text-emerald-700 font-bold text-xl">
                  {nutrition.calories} kcal
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{nutrition.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Protein</span>
              <p className="text-lg font-bold text-gray-900 mt-1">{nutrition.protein}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Carbs</span>
              <p className="text-lg font-bold text-gray-900 mt-1">{nutrition.carbs}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Fats</span>
              <p className="text-lg font-bold text-gray-900 mt-1">{nutrition.fats}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button 
              onClick={onDiscard}
              className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
            >
              Discard
            </button>
            <button 
              onClick={onSave}
              className="flex-[2] py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2"
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
          <div className="bg-emerald-600 rounded-3xl shadow-xl p-6 text-white">
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
                <div key={idx} className="bg-white/10 rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">{alt.name}</h4>
                    <span className="bg-white text-emerald-700 px-3 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                      {alt.calories} kcal
                    </span>
                  </div>
                  <p className="text-emerald-50 text-sm leading-relaxed">{alt.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search Grounding Insights */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Verified Health Facts</h3>
            </div>
            
            <div className="space-y-4">
              {sources.length > 0 ? (
                sources.map((source, idx) => (
                  <a 
                    key={idx}
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">{source.title}</h5>
                      <span className="text-xs text-emerald-500 font-medium">Verify Nutrition Data &rarr;</span>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">Searching for additional scientific insights...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
