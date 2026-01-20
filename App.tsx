
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Analyzer from './components/Analyzer';
import ResultView from './components/ResultView';
import BudgetFinder from './components/BudgetFinder';
import { AnalysisResult, LogEntry } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'analyzer' | 'result' | 'budgetFinder'>('dashboard');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

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
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header 
        onStartAnalysis={() => setView('analyzer')} 
        onNavigate={handleNavigation}
        currentView={view}
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

      <Footer />
    </div>
  );
};

export default App;
