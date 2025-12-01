import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto group">
      {/* Decorative corners */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500 transition-all group-hover:w-6 group-hover:h-6" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-500 transition-all group-hover:w-6 group-hover:h-6" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500 transition-all group-hover:w-6 group-hover:h-6" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500 transition-all group-hover:w-6 group-hover:h-6" />

      {/* Main Container */}
      <form onSubmit={handleSubmit} className="relative flex items-center bg-black/80 backdrop-blur-md border border-cyan-500/30 p-1 transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)]">
        <div className="pl-4 pr-2">
           <Search className="w-5 h-5 text-cyan-500" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER SEARCH QUERY..."
          className="w-full bg-transparent border-none outline-none text-cyan-50 px-2 py-4 placeholder-cyan-900/50 font-mono text-lg uppercase tracking-wider"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`
            flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300
            border-l border-cyan-500/30
            ${isLoading 
              ? 'bg-cyan-950/30 text-cyan-900 cursor-wait' 
              : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#00f3ff]'
            }
          `}
        >
          {isLoading ? (
            <span className="animate-pulse">PROCESSING</span>
          ) : (
            <>
              <span className="hidden sm:inline">INITIATE</span>
              <Zap className="w-4 h-4 fill-current" />
            </>
          )}
        </button>
      </form>

      {/* Underline trace effect */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-700 ease-in-out shadow-[0_0_5px_#00f3ff]" />
    </div>
  );
};

export default SearchInput;