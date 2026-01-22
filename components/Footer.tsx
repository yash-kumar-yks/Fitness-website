
import React from 'react';

interface FooterProps {
  onOpenLegal?: (type: 'privacy' | 'terms' | 'cookies' | 'about') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center transition-all">
                <svg viewBox="0 0 24 24" fill="none" className="h-11 w-11" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5 22 21 18.5 21 13C21 7.5 17 2 12 2C7 2 3 7.5 3 13C3 18.5 6.5 22 12 22Z" className="fill-emerald-800 dark:fill-emerald-900" />
                  <path d="M12 20.5C16.5 20.5 19.5 17.5 19.5 13C19.5 8.5 16 3.5 12 3.5C8 3.5 4.5 8.5 4.5 13C4.5 17.5 7.5 20.5 12 20.5Z" className="fill-emerald-400 dark:fill-emerald-500" />
                  <circle cx="12" cy="15" r="3.5" className="fill-emerald-900 dark:fill-emerald-300" />
                </svg>
              </div>
              <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">FitBitez<span className="text-emerald-500 dark:text-emerald-400 italic">.in</span></span>
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed font-medium mb-8 max-w-md">
              The smartest AI-driven nutritional companion for the modern Indian diet. High accuracy, low effort, and completely budget-conscious.
            </p>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Direct Contact</span>
              <a href="mailto:yashsngh57@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-black text-lg hover:underline transition-all">Mail Me</a>
            </div>
          </div>

          {/* Interactive Info Column */}
          <div className="md:col-span-4">
            <button 
              onClick={() => onOpenLegal?.('about')}
              className="group flex flex-col items-start text-left mb-8"
            >
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.3em] mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">About</h4>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-xs group-hover:opacity-80 transition-opacity">
                Learn about the creator and the mission behind FitBitez.
              </p>
              <span className="mt-3 text-[10px] font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-500/30">Read Bio &rarr;</span>
            </button>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.3em] mb-8">Platform</h4>
            <ul className="space-y-4 mb-10">
              <li><button onClick={() => onOpenLegal?.('privacy')} className="text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-colors text-sm text-left">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal?.('terms')} className="text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-colors text-sm text-left">Terms of Use</button></li>
              <li><button onClick={() => onOpenLegal?.('cookies')} className="text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-colors text-sm text-left">Cookie Data</button></li>
            </ul>

            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.3em] mb-6">Connect</h4>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/yash_singh05/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gray-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 dark:text-slate-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group shadow-sm border border-transparent dark:border-slate-800"
                aria-label="Instagram"
              >
                <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-slate-800 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
              <p className="text-gray-400 dark:text-slate-500 text-xs font-bold leading-relaxed">
                <span className="text-gray-900 dark:text-slate-300 block mb-2 uppercase tracking-widest">Medical Disclaimer</span>
                FitBitez.in is intended for informational and educational purposes only. The nutritional estimates and budget suggestions provided by our AI are approximations. Please consult with a healthcare professional before significant diet changes.
              </p>
            </div>
            <div className="flex flex-col text-right">
              <p className="text-gray-900 dark:text-white font-black text-sm mb-1 uppercase tracking-tighter">© 2025 FitBitez.in</p>
              <p className="text-gray-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">Built with precision in India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
