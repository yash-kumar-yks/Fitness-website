
import React from 'react';

interface HeaderProps {
  onStartAnalysis?: () => void;
  onNavigate?: (view: 'dashboard' | 'budgetFinder') => void;
  currentView?: string;
}

const Header: React.FC<HeaderProps> = ({ onStartAnalysis, onNavigate, currentView }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center space-x-3 group cursor-pointer" 
            onClick={() => onNavigate?.('dashboard')}
          >
            <div className="relative w-11 h-11 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
              <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
                {/* Avocado Body - Outer Shell */}
                <path d="M12 22C17.5 22 21 18.5 21 13C21 7.5 17 2 12 2C7 2 3 7.5 3 13C3 18.5 6.5 22 12 22Z" className="fill-emerald-800" />
                {/* Avocado Body - Flesh */}
                <path d="M12 20.5C16.5 20.5 19.5 17.5 19.5 13C19.5 8.5 16 3.5 12 3.5C8 3.5 4.5 8.5 4.5 13C4.5 17.5 7.5 20.5 12 20.5Z" className="fill-emerald-400" />
                {/* The Pit */}
                <circle cx="12" cy="15" r="3.5" className="fill-emerald-900" />
                {/* AI Sparkle on the pit */}
                <path d="M12 13L12.5 14.5L14 15L12.5 15.5L12 17L11.5 15.5L10 15L11.5 14.5L12 13Z" fill="white" className="animate-pulse" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 tracking-tighter leading-none">FitBitez</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Nutrition AI</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => onNavigate?.('dashboard')}
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'dashboard' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-gray-400 hover:text-emerald-600'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => onNavigate?.('budgetFinder')}
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'budgetFinder' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-gray-400 hover:text-emerald-600'}`}
            >
              Budget Finder
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onStartAnalysis}
              className="px-6 py-2.5 bg-emerald-600 text-white font-black rounded-full hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95 text-sm"
            >
              Start Analysis
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
