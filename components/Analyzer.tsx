
import React, { useState, useRef } from 'react';
import { analyzeFoodImage, getHealthInsights } from '../services/geminiService';
import { AnalysisResult } from '../types';

interface AnalyzerProps {
  onComplete: (result: AnalysisResult) => void;
  onCancel: () => void;
}

const Analyzer: React.FC<AnalyzerProps> = ({ onComplete, onCancel }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const nutrition = await analyzeFoodImage(image);
      const insights = await getHealthInsights(nutrition.foodName);
      
      onComplete({
        nutrition,
        sources: insights.sources,
        imageUrl: image,
      });
    } catch (err: any) {
      console.error(err);
      setError("Analysis failed. Please try again with a clearer image.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Food Analysis</h2>
            <button onClick={onCancel} className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-gray-100 dark:border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all group h-96"
            >
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-slate-400 font-medium text-center">Click to upload or take a photo</p>
              <p className="text-gray-400 dark:text-slate-600 text-sm mt-2 text-center">Supports JPG, PNG</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
                capture="environment"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden h-96 shadow-inner bg-gray-100 dark:bg-slate-800 transition-colors">
                <img src={image} alt="Preview" className="w-full h-full object-contain" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-full text-gray-600 dark:text-slate-400 shadow-lg hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="w-12 h-12 border-4 border-emerald-500 dark:border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold text-lg animate-pulse">Analyzing with Gemini AI...</p>
                    <p className="text-gray-400 dark:text-slate-500 text-sm mt-1">Identifying ingredients and estimating nutrients</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <button 
                    onClick={startAnalysis}
                    className="w-full py-4 bg-emerald-600 dark:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span>Analyze Meal</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
