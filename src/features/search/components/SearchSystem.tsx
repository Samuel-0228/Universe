"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, BookOpen, ChevronRight } from "lucide-react";
import { Campus } from "@/types/campus";

const SearchSystem = ({ onSelect }: { onSelect: (c: Campus) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-20">
      <div className="relative group">
        <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
          <Search size={24} className="text-white/20 group-focus-within:text-aau-gold transition-colors" />
        </div>
        <input 
          type="text"
          placeholder="Search the galaxy (e.g. 'Computer Science', 'Library')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] py-7 pl-20 pr-8 focus:outline-none focus:ring-2 focus:ring-aau-gold/30 focus:bg-white/10 transition-all text-xl font-medium tracking-tight"
        />
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-full left-0 right-0 mt-4 glass-panel rounded-[32px] overflow-hidden z-40 border border-white/10 p-2"
          >
            {results.map((res, i) => (
              <button 
                key={i}
                onClick={() => {
                  onSelect({ id: res.id } as Campus);
                  setQuery("");
                }}
                className="w-full flex items-center gap-6 p-5 hover:bg-white/5 rounded-2xl transition-all text-left group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-aau-gold/20 transition-colors">
                  {res.type === 'campus' ? <MapPin size={24} /> : <BookOpen size={24} />}
                </div>
                <div>
                  <h4 className="font-black text-lg group-hover:text-aau-gold transition-colors">{res.title}</h4>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">{res.type} // {res.subtitle}</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-white/10 group-hover:text-aau-gold group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchSystem;
