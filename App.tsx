
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Analyzer from './components/Analyzer';
import ResultView from './components/ResultView';
import BudgetFinder from './components/BudgetFinder';
import LegalModal, { LegalType } from './components/LegalModal';

import { AnalysisResult, LogEntry } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'analyzer' | 'result' | 'budgetFinder'>('dashboard');
    const [legalView, setLegalView] = useState<LegalType>(null);

  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fitbitez_theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const savedLogs = localStorage.getItem('fitbitez_logs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error("Failed to parse logs", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fitbitez_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fitbitez_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const saveLog = () => {
    if (!currentResult) return;
    const newLog: LogEntry = {
      ...currentResult,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('fitbitez_logs', JSON.stringify(updatedLogs));
    setView('dashboard');
    setCurrentResult(null);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentResult(result);
    setView('result');
  };

  const handleNavigation = (targetView: 'dashboard' | 'budgetFinder') => {
    setView(targetView);
    setCurrentResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-slate-950 transition-colors duration-300">
      <Header 
        onStartAnalysis={() => setView('analyzer')} 
        onNavigate={handleNavigation}
        currentView={view}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {view === 'dashboard' && (
            <Dashboard 
              onStartAnalysis={() => setView('analyzer')} 
              logs={logs}
            />
          )}

          {view === 'analyzer' && (
            <Analyzer 
              onComplete={handleAnalysisComplete}
              onCancel={() => setView('dashboard')}
            />
          )}

          {view === 'result' && currentResult && (
            <ResultView 
              result={currentResult} 
              onSave={saveLog}
              onDiscard={() => {
                setView('dashboard');
                setCurrentResult(null);
              }}
            />
          )}

          {view === 'budgetFinder' && (
            <BudgetFinder />
          )}
        </div>
      </main>

      <Footer onOpenLegal={(type) => setLegalView(type)} />
      
      {/* Global Legal Modal */}
      <LegalModal type={legalView} onClose={() => setLegalView(null)} />
    </div>
  );
};

export default App;
