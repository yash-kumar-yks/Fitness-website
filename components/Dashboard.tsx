
import React, { useState, useEffect } from 'react';
import { LogEntry } from '../types';

interface DashboardProps {
  onStartAnalysis: () => void;
  logs: LogEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ onStartAnalysis, logs }) => {
  const [dailyCalories, setDailyCalories] = useState(0);

  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const sum = logs
      .filter(log => log.timestamp >= today)
      .reduce((acc, log) => acc + log.nutrition.calories, 0);
    setDailyCalories(sum);
  }, [logs]);

  return (
    <div className="space-y-24 py-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section id="hero" className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between flex-1 text-center lg:text-left transition-colors duration-300">
          <div>
            <span className="text-emerald-500 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">Today's Progress</span>
            <div className="mt-4 flex items-baseline justify-center lg:justify-start space-x-2">
              <span className="text-7xl font-black text-gray-900 dark:text-white leading-none">{dailyCalories}</span>
              <span className="text-gray-400 dark:text-slate-500 font-bold text-lg">kcal</span>
            </div>
            <p className="text-gray-500 dark:text-slate-400 mt-6 text-sm leading-relaxed font-medium">
              Join thousands of Indians tracking their health accurately at <span className="text-emerald-600 dark:text-emerald-400 font-bold">fitbitez.in</span>. You are {Math.max(0, 2200 - dailyCalories)} kcal away from your target.
            </p>
          </div>
          <div className="mt-10">
            <div className="flex justify-between text-[10px] font-black text-gray-400 dark:text-slate-500 mb-3 uppercase tracking-widest px-2">
              <span>Limit: 2,200 kcal</span>
              <span className="text-emerald-600 dark:text-emerald-400">{Math.round((dailyCalories / 2200) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden shadow-inner transition-colors duration-300">
              <div 
                className="bg-emerald-500 dark:bg-emerald-400 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                style={{ width: `${Math.min((dailyCalories / 2200) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-emerald-600 dark:bg-emerald-700 rounded-[2.5rem] shadow-2xl p-12 text-white flex flex-col lg:flex-row items-center justify-between relative overflow-hidden flex-[1.5] transition-colors duration-300">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-black/10 rounded-full blur-[100px]"></div>
          
          <div className="mb-10 lg:mb-0 relative z-10 text-center lg:text-left">
            <h1 className="text-5xl font-black mb-6 leading-[1.1] tracking-tighter">Your AI Nutritionist <br/><span className="text-emerald-200 dark:text-emerald-300">Anytime, Anywhere.</span></h1>
            <p className="text-emerald-100 max-w-md text-lg leading-relaxed font-medium opacity-90">
              Stop guessing. Start knowing. Snapshot your meal and get instant nutrient breakdowns and budget-friendly swaps.
            </p>
          </div>
          
          <button 
            onClick={onStartAnalysis}
            className="w-full lg:w-auto px-12 py-6 bg-white dark:bg-slate-100 text-emerald-700 font-black rounded-3xl shadow-2xl hover:shadow-emerald-900/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-4 relative z-10"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 21 18.5 21 13C21 7.5 17 2 12 2C7 2 3 7.5 3 13C3 18.5 6.5 22 12 22Z" className="fill-emerald-800" />
                <path d="M12 20.5C16.5 20.5 19.5 17.5 19.5 13C19.5 8.5 16 3.5 12 3.5C8 3.5 4.5 8.5 4.5 13C4.5 17.5 7.5 20.5 12 20.5Z" className="fill-emerald-400" />
                <circle cx="12" cy="15" r="3.5" className="fill-emerald-900" />
              </svg>
            </div>
            <span className="text-2xl tracking-tight">Take a Snap</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-4">About FitBitez.in</h2>
        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-tight">Healthy eating shouldn't be expensive or complicated.</h3>
        <p className="text-gray-500 dark:text-slate-400 text-xl leading-relaxed font-medium">
          FitBitez was born from a simple mission: to make world-class nutritional advice accessible to every Indian household. By combining AI with local market data, we help you make the best choices for your health and your wallet.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          { icon: '🤳', title: 'Photo Analysis', desc: 'State-of-the-art vision AI identifies your plate in milliseconds.' },
          { icon: '💸', title: 'Local Budgeting', desc: 'The first tool designed to find healthy meals under your specific INR budget.' },
          { icon: '🥗', title: 'Indian Diet Focus', desc: 'Optimized for diverse Indian cuisines from Dosa to Dal Makhani.' }
        ].map((feat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-xl transition-all duration-500 group">
            <span className="text-5xl mb-6 group-hover:scale-110 transition-transform">{feat.icon}</span>
            <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{feat.title}</h4>
            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Recent Activity */}
      <section id="activity" className="pt-12 px-4">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Your Recent Bites</h3>
            <p className="text-gray-400 dark:text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Logged today</p>
          </div>
        </div>
        
        {logs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[3rem] p-24 text-center group cursor-pointer" onClick={onStartAnalysis}>
            <div className="w-24 h-24 bg-emerald-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl group-hover:scale-110 transition-transform shadow-inner">
              🥣
            </div>
            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Ready for a check-up?</h4>
            <p className="text-gray-400 dark:text-slate-500 max-w-xs mx-auto font-medium">Your nutrition journal is empty. Snap your breakfast, lunch, or dinner to begin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {logs.slice(0, 6).map((log) => (
              <div key={log.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all group cursor-default">
                <div className="h-64 overflow-hidden relative">
                  <img src={log.imageUrl} alt={log.nutrition.foodName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-5 py-2.5 rounded-2xl text-emerald-700 dark:text-emerald-400 font-black text-sm shadow-2xl border border-white/50 dark:border-slate-800">
                    {log.nutrition.calories} kcal
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-black text-gray-900 dark:text-white text-2xl capitalize truncate pr-4 leading-tight">{log.nutrition.foodName}</h4>
                    <span className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.2em] pt-2 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium italic opacity-80">"{log.nutrition.summary}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
