import React from 'react';
import { DreamResultData, SearchSource } from '../types';
import { ExternalLink, Terminal, Cpu } from 'lucide-react';

interface DreamResultProps {
  data: DreamResultData;
  onReset: () => void;
}

const SourceCard: React.FC<{ source: SearchSource; index: number }> = ({ source, index }) => (
  <a
    href={source.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col p-4 bg-black/60 border border-cyan-900/40 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Hover scan effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
    
    <div className="flex items-start justify-between mb-3 relative z-10">
      <span className="text-[10px] font-mono text-cyan-700 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
        [{new URL(source.url).hostname}]
      </span>
      <ExternalLink className="w-3 h-3 text-cyan-800 group-hover:text-cyan-400" />
    </div>
    <h4 className="text-sm font-medium text-cyan-100 group-hover:text-white line-clamp-2 leading-relaxed font-['Rajdhani'] relative z-10 group-hover:neon-text">
      {source.title}
    </h4>
  </a>
);

const DreamResult: React.FC<DreamResultProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8 animate-fade-in-up">
      
      {/* The Narrative (Drift) */}
      <div className="relative mb-16 group">
        <div className="absolute inset-0 bg-cyan-500/5 blur-md -z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Tech Header for Narrative */}
        <div className="flex items-center gap-2 mb-2 px-2">
            <Terminal className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-mono text-cyan-800 uppercase tracking-widest">Output Stream</span>
        </div>

        <div className="p-8 border-l-2 border-cyan-500 bg-gradient-to-r from-cyan-950/20 to-transparent backdrop-blur-sm relative overflow-hidden">
            {/* Background noise texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
            
            <p className="text-lg md:text-xl leading-relaxed font-light text-cyan-50 font-['Rajdhani']">
            {data.narrative}
            </p>

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30" />
        </div>
      </div>

      {/* The Fragments (Sources) */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-cyan-900/50" />
          <div className="flex items-center gap-2 text-cyan-600/60">
             <Cpu className="w-4 h-4" />
             <h3 className="retro-font text-xs tracking-[0.3em] uppercase">Data Nodes</h3>
          </div>
          <div className="h-[1px] flex-1 bg-cyan-900/50" />
        </div>

        {data.sources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.sources.map((source, index) => (
              <SourceCard key={`${source.url}-${index}`} source={source} index={index} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-cyan-900 p-8 text-center">
            <p className="text-cyan-800 font-mono text-sm">NO DATA FRAGMENTS RECOVERED</p>
          </div>
        )}
      </div>

      <div className="mt-20 text-center">
        <button
          onClick={onReset}
          className="group relative px-8 py-3 bg-transparent overflow-hidden"
        >
          <span className="relative z-10 text-cyan-500 font-mono text-xs uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-300">
            Terminte Session
          </span>
          <div className="absolute inset-0 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <div className="absolute inset-0 border border-cyan-500/30" />
        </button>
      </div>
    </div>
  );
};

export default DreamResult;