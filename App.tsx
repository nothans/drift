import React, { useState } from 'react';
import FluidBackground from './components/FluidBackground';
import SearchInput from './components/SearchInput';
import DreamResult from './components/DreamResult';
import { dreamSearch } from './services/geminiService';
import { DreamResultData, SearchState } from './types';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>(SearchState.IDLE);
  const [dreamData, setDreamData] = useState<DreamResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setSearchState(SearchState.DREAMING);
    setErrorMsg(null);
    setDreamData(null);

    try {
      const result = await dreamSearch(query);
      setDreamData(result);
      setSearchState(SearchState.AWAKE);
    } catch (err) {
      console.error(err);
      setSearchState(SearchState.NIGHTMARE);
      setErrorMsg("SYSTEM FAILURE: CONNECTION LOST");
    }
  };

  const handleReset = () => {
    setSearchState(SearchState.IDLE);
    setDreamData(null);
    setErrorMsg(null);
  };

  return (
    <div className="relative min-h-screen text-cyan-50 selection:bg-cyan-500 selection:text-black">
      <FluidBackground />

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className={`flex flex-col items-center justify-center transition-all duration-700 ${searchState === SearchState.IDLE ? 'pt-[20vh] mb-16' : 'pt-8 mb-8'}`}>
          <div className="text-center group">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 animate-shift drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
              DRIFT
            </h1>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="mt-2 text-cyan-400/70 tracking-[0.5em] text-xs md:text-sm uppercase font-bold">
              // Neural Search Engine
            </p>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center w-full">
          {searchState === SearchState.IDLE && (
            <div className="w-full animate-fade-in flex flex-col items-center">
              <SearchInput onSearch={handleSearch} isLoading={false} />
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-cyan-400/40 text-xs font-mono w-full max-w-2xl text-center md:text-left">
                <div className="border border-cyan-900/30 p-2 bg-black/40 backdrop-blur-sm">
                  <span className="block text-white mb-1">> SYSTEM</span>
                  <span className="text-cyan-600">Gemini 2.5 Flash</span>
                </div>
                <div className="border border-cyan-900/30 p-2 bg-black/40 backdrop-blur-sm">
                   <span className="block text-white mb-1">> INTERFACE</span>
                   <span className="text-cyan-600">Visual Cortex v3</span>
                </div>
                <div className="border border-cyan-900/30 p-2 bg-black/40 backdrop-blur-sm">
                   <span className="block text-white mb-1">> STATUS</span>
                   <span className="text-cyan-600 animate-pulse">ONLINE</span>
                </div>
              </div>
            </div>
          )}

          {searchState === SearchState.DREAMING && (
            <div className="flex flex-col items-center justify-center mt-20 space-y-6">
              <div className="relative w-32 h-32">
                 {/* Tech Spinner */}
                 <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                 <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin"></div>
                 <div className="absolute inset-4 border-4 border-white/10 rounded-full"></div>
                 <div className="absolute inset-4 border-b-4 border-white/50 rounded-full animate-spin reverse" style={{ animationDuration: '2s' }}></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_20px_#00f3ff] animate-pulse"></div>
              </div>
              <p className="text-xl font-mono text-cyan-400 tracking-widest uppercase animate-pulse">
                INITIALIZING DRIFT SEQUENCE...
              </p>
            </div>
          )}

          {searchState === SearchState.AWAKE && dreamData && (
            <DreamResult data={dreamData} onReset={handleReset} />
          )}

          {searchState === SearchState.NIGHTMARE && (
            <div className="mt-20 p-8 bg-red-950/40 border border-red-500 rounded-none flex flex-col items-center gap-4 text-center max-w-md shadow-[0_0_30px_rgba(255,0,0,0.2)]">
              <AlertTriangle className="w-16 h-16 text-red-500 animate-bounce" />
              <h2 className="text-2xl font-bold text-red-500 tracking-widest">ERROR</h2>
              <p className="text-red-300 font-mono text-sm">{errorMsg}</p>
              <button 
                onClick={handleReset}
                className="mt-4 px-8 py-3 bg-red-500/10 hover:bg-red-500 hover:text-black text-red-500 border border-red-500 transition-all duration-300 uppercase tracking-widest font-bold text-xs"
              >
                Reboot System
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-cyan-900 text-[10px] uppercase tracking-[0.3em]">
           <p>Drift Engine // v4.0.1 // {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
};

export default App;