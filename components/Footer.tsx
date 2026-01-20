
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center transition-all">
                <svg viewBox="0 0 24 24" fill="none" className="h-11 w-11" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5 22 21 18.5 21 13C21 7.5 17 2 12 2C7 2 3 7.5 3 13C3 18.5 6.5 22 12 22Z" className="fill-emerald-800" />
                  <path d="M12 20.5C16.5 20.5 19.5 17.5 19.5 13C19.5 8.5 16 3.5 12 3.5C8 3.5 4.5 8.5 4.5 13C4.5 17.5 7.5 20.5 12 20.5Z" className="fill-emerald-400" />
                  <circle cx="12" cy="15" r="3.5" className="fill-emerald-900" />
                </svg>
              </div>
              <span className="text-3xl font-black text-gray-900 tracking-tighter">FitBitez<span className="text-emerald-500 italic">.in</span></span>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed font-medium mb-8 max-w-sm">
              The smartest AI-driven nutritional companion for the modern Indian diet. High accuracy, low effort, and completely budget-conscious.
            </p>
            <div className="flex items-center space-x-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Questions?</span>
                  <a href="mailto:hello@fitbitez.in" className="text-emerald-600 font-black text-lg hover:underline transition-all">hello@fitbitez.in</a>
               </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#hero" className="text-gray-500 hover:text-emerald-600 font-bold transition-colors">Overview</a></li>
              <li><a href="#about" className="text-gray-500 hover:text-emerald-600 font-bold transition-colors">About</a></li>
              <li><a href="#features" className="text-gray-500 hover:text-emerald-600 font-bold transition-colors">Features</a></li>
              <li><a href="#activity" className="text-gray-500 hover:text-emerald-600 font-bold transition-colors">My Logs</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] mb-8">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 font-bold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 font-bold transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-600 font-bold transition-colors">Cookie Data</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="md:col-span-3">
             <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] mb-8">Connect</h4>
             <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all group shadow-sm">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all group shadow-sm">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
             </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
              <p className="text-gray-400 text-xs font-bold leading-relaxed">
                <span className="text-gray-900 block mb-2 uppercase tracking-widest">Medical Disclaimer</span>
                FitBitez.in is intended for informational and educational purposes only. The nutritional estimates and budget suggestions provided by our AI are approximations. We are not a medical service; please consult with a qualified healthcare professional or certified dietitian before making significant changes to your diet or fitness routine.
              </p>
            </div>
            <div className="flex flex-col text-right">
              <p className="text-gray-900 font-black text-sm mb-1 uppercase tracking-tighter">© 2024 FitBitez.in</p>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Built with precision in India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
