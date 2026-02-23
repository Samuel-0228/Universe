import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Building2, BookOpen, Navigation } from 'lucide-react';
import { CAMPUSES } from '../data/mockData';
import { Campus } from '../types';
import { generateGoogleMapsLink } from '../lib/utils';

export const GlobalSearch = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (campus: Campus) => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches: any[] = [];

    CAMPUSES.forEach(campus => {
      // Match Campus Name
      if (campus.name.toLowerCase().includes(q)) {
        matches.push({ type: 'campus', data: campus, text: campus.name });
      }

      // Match Departments
      campus.colleges.forEach(college => {
        college.departments.forEach(dept => {
          if (dept.toLowerCase().includes(q)) {
            matches.push({ type: 'department', data: campus, text: dept, sub: `${college.name} @ ${campus.name}` });
          }
        });
      });

      // Match Services
      campus.services.forEach(service => {
        if (service.toLowerCase().includes(q)) {
          matches.push({ type: 'service', data: campus, text: service, sub: `Service @ ${campus.name}` });
        }
      });

      // Match Buildings
      campus.infrastructure.forEach(building => {
        if (building.toLowerCase().includes(q)) {
          matches.push({ type: 'building', data: campus, text: building, sub: `Building @ ${campus.name}` });
        }
      });
    });

    setResults(matches.slice(0, 8));
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-4 p-6 border-b border-white/5">
              <Search className="text-blue-500" size={24} />
              <input
                autoFocus
                placeholder="Search departments, buildings, services..."
                className="flex-1 bg-transparent text-xl text-white outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
              {results.length > 0 ? (
                results.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelect(res.data);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                        {res.type === 'campus' && <MapPin size={20} />}
                        {res.type === 'department' && <BookOpen size={20} />}
                        {res.type === 'service' && <Navigation size={20} />}
                        {res.type === 'building' && <Building2 size={20} />}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold">{res.text}</p>
                        {res.sub && <p className="text-xs text-gray-500 font-medium">{res.sub}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={generateGoogleMapsLink('current location', res.data.coordinates, 'transit')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-xs font-bold text-blue-400 bg-blue-400/10 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Directions
                      </a>
                    </div>
                  </button>
                ))
              ) : query ? (
                <div className="p-12 text-center text-gray-500">
                   No results found for "{query}"
                </div>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <p className="text-gray-500 font-medium">Quick Searches</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Computer Science', 'Main Library', 'AAiT Registrar', 'Medicine'].map(q => (
                      <button key={q} onClick={() => setQuery(q)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};