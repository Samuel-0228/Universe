
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icons';
import { smartSearch } from '../services/geminiService';
import { SearchResult } from '../types';

interface SearchBarProps {
  onSelectResult: (id: string, type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsSearching(true);
        const res = await smartSearch(query);
        setResults(res);
        setIsSearching(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl pointer-events-auto">
      <div className="glass flex items-center px-6 py-4 rounded-[2.5rem] shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-white/20">
        <Icon name="Search" className="text-white/40 mr-4" />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search campuses, departments, or services..."
          className="bg-transparent border-none w-full text-lg focus:outline-none placeholder:text-white/20 font-medium"
        />
        {isSearching && <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin ml-4" />}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-4 glass rounded-[2rem] overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
            {results.map((result, idx) => (
              <button
                key={result.id || idx}
                onClick={() => {
                  onSelectResult(result.campusId || result.id, result.type);
                  setIsOpen(false);
                  setQuery('');
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors text-left group"
              >
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Icon name={result.type === 'campus' ? 'MapPin' : result.type === 'department' ? 'Book' : 'Zap'} size={18} className="text-white/40" />
                </div>
                <div>
                  <h4 className="font-semibold text-white/90">{result.title}</h4>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{result.subtitle}</p>
                </div>
                <Icon name="ArrowRight" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white/20" size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
