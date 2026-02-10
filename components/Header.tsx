
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
              <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight">
              OrbitalEye
            </h1>
            <p className="text-[10px] text-blue-400 font-medium tracking-widest uppercase">
              Global Watch System
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Monitoring</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Data Feed</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Documentation</a>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-md transition-all">
            System Status: Active
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
