
import React from 'react';
import { DorkResult } from '../types';

interface ResultCardProps {
  item: DorkResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ item }) => {
  const handleRedirect = () => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(item.dork)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleRedirect}
      className="group flex flex-col items-start py-6 px-6 border-b border-red-900/30 hover:bg-red-950/20 cursor-pointer transition-all duration-300 rounded-lg border-l-0 hover:border-l-2 hover:border-l-red-600 relative overflow-hidden"
    >
      <div className="flex-1 w-full relative z-10">
        <p className="text-red-500 font-mono text-lg mb-2 break-all group-hover:text-red-400 transition-colors drop-shadow-[0_0_2px_rgba(255,0,0,0.2)]">
          {item.dork}
        </p>
        <p className="text-gray-400 text-sm font-light group-hover:text-gray-300 transition-colors">
          {item.description}
        </p>
      </div>
      
      {/* Visual indicator for redirection appearing on hover */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-[10px] text-red-600 font-cyber tracking-[0.3em] uppercase flex items-center">
        Execute Query
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      {/* Subtle background highlight for the redirect action */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default ResultCard;
