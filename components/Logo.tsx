
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-20 animate-in fade-in zoom-in duration-1000">
      {/* Precision Neon Detective Logo */}
      <div className="relative mb-8">
        {/* Deep ambient glow behind the icon */}
        <div className="absolute inset-0 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* 
          High-fidelity SVG reconstruction of the neon detective outline.
          Multiple drop-shadows create the "inner glow" and "outer glow" of a neon tube.
        */}
        <div className="relative z-10 transition-all duration-700 hover:scale-110 cursor-pointer">
          <svg
            width="160"
            height="160"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `
                drop-shadow(0 0 1px rgba(255, 255, 255, 0.8))
                drop-shadow(0 0 5px rgba(255, 0, 0, 0.9))
                drop-shadow(0 0 15px rgba(255, 0, 0, 0.6))
                drop-shadow(0 0 30px rgba(255, 0, 0, 0.3))
              `
            }}
          >
            {/* The Fedora Hat */}
            <path
              d="M50 15C42 15 30 18 25 24C20 30 15 38 15 42H85C85 38 80 30 75 24C70 18 58 15 50 15Z"
              stroke="#ff0000"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Hat Band/Rim line */}
            <path
              d="M23 42C23 48 35 50 50 50C65 50 77 48 77 42"
              stroke="#ff0000"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            
            {/* Face / Jawline */}
            <path
              d="M38 58C38 58 40 70 50 70C60 70 62 58 62 58"
              stroke="#ff0000"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            
            {/* Neon Glasses / Shades */}
            <path
              d="M36 56C36 53 40 51 44 51C48 51 49 53 49 56"
              stroke="#ff0000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M51 56C51 53 52 51 56 51C60 51 64 53 64 56"
              stroke="#ff0000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M49 56H51"
              stroke="#ff0000"
              strokeWidth="1.5"
            />
            
            {/* High Trench Coat Collar (The wings) */}
            <path
              d="M50 73L30 78L18 88"
              stroke="#ff0000"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 73L70 78L82 88"
              stroke="#ff0000"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* The Triangle Tie / Knot detail */}
            <path
              d="M50 73L46 88H54L50 73Z"
              stroke="#ff0000"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Main Brand Text with Matching Neon Glow */}
      <div className="text-center group">
        <h1 className="font-cyber text-6xl tracking-[0.25em] font-bold select-none leading-none">
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] uppercase transition-all duration-300 group-hover:text-red-50">Dork</span>
          <span className="text-red-600 ml-4 drop-shadow-[0_0_20px_rgba(255,0,0,0.9)] uppercase transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(255,0,0,1)]">AI</span>
        </h1>
        
        {/* Cyber-Deco Detail Lines */}
        <div className="mt-6 flex items-center justify-center space-x-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-red-600/60 to-red-600/20"></div>
          <span className="text-red-900/60 text-[11px] uppercase tracking-[0.6em] font-cyber whitespace-nowrap">Neural Intelligence</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-red-600/60 to-red-600/20"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
