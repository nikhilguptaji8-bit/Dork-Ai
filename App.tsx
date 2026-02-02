
import React, { useState, useRef } from 'react';
import Logo from './components/Logo';
import ResultCard from './components/ResultCard';
import { getAIResponse } from './services/geminiService';
import { DorkResult, AppStatus, AIResponse } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const searchIdRef = useRef<number>(0);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || status === AppStatus.SEARCHING) return;

    const currentSearchId = ++searchIdRef.current;
    setStatus(AppStatus.SEARCHING);
    setError(null);
    setAiResponse(null);

    try {
      await new Promise(r => setTimeout(r, 600));
      if (searchIdRef.current !== currentSearchId) return;

      const data = await getAIResponse(query);
      if (searchIdRef.current !== currentSearchId) return;

      setAiResponse(data);
      setStatus(AppStatus.COMPLETED);
    } catch (err) {
      if (searchIdRef.current !== currentSearchId) return;
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Error: ${errorMessage}`);
      setStatus(AppStatus.ERROR);
    }
  };

  const handleClear = () => {
    searchIdRef.current++;
    setQuery('');
    setAiResponse(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  const handleStop = () => {
    if (status === AppStatus.SEARCHING) {
      searchIdRef.current++;
      setAiResponse(null);
      setStatus(AppStatus.IDLE);
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === AppStatus.SEARCHING) {
      handleStop();
    } else if (status === AppStatus.COMPLETED || status === AppStatus.ERROR) {
      handleClear();
    } else if (query.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#0f0000] selection:bg-red-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="fixed top-0 left-0 p-6 z-50">
        <div className="flex items-center space-x-2">
          <div className="font-cyber font-bold text-xl tracking-tighter uppercase">
            <span className="text-white">Dork</span>
            <span className="text-red-600 ml-1 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">AI</span>
          </div>
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
        </div>
      </header>

      <main className={`flex-1 flex flex-col items-center justify-center px-4 transition-all duration-700 pt-20 pb-32 ${aiResponse || status === AppStatus.SEARCHING ? 'justify-start' : 'justify-center'}`}>

        <div className={`w-full max-w-4xl flex flex-col items-center transition-all duration-1000 ${aiResponse || status === AppStatus.SEARCHING ? 'mt-8' : 'mt-0'}`}>
          <Logo />

          <div className="w-full max-w-2xl relative group mb-12">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/50 to-red-600/50 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

            <div className="relative flex items-center bg-[#150202] rounded-full border border-red-900/40 focus-within:border-red-600/60 transition-all duration-300 overflow-hidden px-6">
              <form onSubmit={handleSearch} className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Type topic to generate dorks..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={status === AppStatus.SEARCHING}
                  className="flex-1 bg-transparent border-none outline-none text-white pt-5 pb-3 text-lg placeholder-red-900/40 disabled:opacity-50"
                />

                <button
                  type={status === AppStatus.IDLE ? "submit" : "button"}
                  onClick={handleActionClick}
                  className="ml-2 p-2 text-red-600 hover:text-red-500 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] transform active:scale-90 translate-y-1"
                  aria-label="Search Action"
                >
                  {status === AppStatus.IDLE && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  {status === AppStatus.SEARCHING && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                  )}
                  {(status === AppStatus.COMPLETED || status === AppStatus.ERROR) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl space-y-4 px-4 pb-20">
          {status === AppStatus.SEARCHING && (
            <div className="flex flex-col items-center space-y-4 py-12 animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          )}

          {aiResponse && status !== AppStatus.IDLE && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex flex-col mb-8 border-l-2 border-red-600 pl-4 space-y-2">
                <h2 className="font-cyber text-xl text-white uppercase tracking-wider">
                  Intel Report: <span className="text-red-600">"{query}"</span>
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {aiResponse.message}
                </div>
              </div>

              {aiResponse.type === 'dorks' && aiResponse.dorks && (
                <div className="space-y-2 mb-8">
                  {aiResponse.dorks.map((item, idx) => (
                    <ResultCard key={idx} item={item} />
                  ))}
                </div>
              )}

              {/* Display Sources from Search Grounding */}
              {aiResponse.sources && aiResponse.sources.length > 0 && (
                <div className="mt-8 pt-6 border-t border-red-900/30">
                  <h3 className="text-red-600 font-cyber text-xs uppercase tracking-[0.2em] mb-4">Verification Sources</h3>
                  <div className="flex flex-wrap gap-3">
                    {aiResponse.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] bg-red-950/40 border border-red-900/40 px-3 py-1.5 rounded-full text-gray-400 hover:text-red-400 hover:border-red-600/50 transition-all"
                      >
                        {source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-red-900/20 text-center">
                <p className="text-red-900/40 text-xs uppercase font-cyber tracking-[0.5em]">Intelligence Feed Terminated</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
