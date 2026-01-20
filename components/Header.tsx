
import React from 'react';

interface HeaderProps {
  onStartAnalysis?: () => void;
  onNavigate?: (view: 'dashboard' | 'budgetFinder') => void;
  currentView?: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartAnalysis, onNavigate, currentView, isDarkMode, toggleTheme }) => {
  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center space-x-3 group cursor-pointer" 
            onClick={() => onNavigate?.('dashboard')}
          >
            <div className="relative w-11 h-11 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
              <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 21 18.5 21 13C21 7.5 17 2 12 2C7 2 3 7.5 3 13C3 18.5 6.5 22 12 22Z" className="fill-emerald-800 dark:fill-emerald-900" />
                <path d="M12 20.5C16.5 20.5 19.5 17.5 19.5 13C19.5 8.5 16 3.5 12 3.5C8 3.5 4.5 8.5 4.5 13C4.5 17.5 7.5 20.5 12 20.5Z" className="fill-emerald-400 dark:fill-emerald-500" />
                <circle cx="12" cy="15" r="3.5" className="fill-emerald-900 dark:fill-emerald-300" />
                <path d="M12 13L12.5 14.5L14 15L12.5 15.5L12 17L11.5 15.5L10 15L11.5 14.5L12 13Z" fill="white" className="animate-pulse" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">FitBitez</span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-1">Nutrition AI</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => onNavigate?.('dashboard')}
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'dashboard' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1' : 'text-gray-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => onNavigate?.('budgetFinder')}
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${currentView === 'budgetFinder' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1' : 'text-gray-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400'}`}
            >
              Budget Finder
            </button>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all border border-gray-100 dark:border-slate-700 shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button 
              onClick={onStartAnalysis}
              className="px-6 py-2.5 bg-emerald-600 text-white font-black rounded-full hover:bg-emerald-700 shadow-xl shadow-emerald-200 dark:shadow-emerald-900/40 transition-all active:scale-95 text-sm"
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
