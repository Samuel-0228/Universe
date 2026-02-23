import { motion } from 'framer-motion';
import { CAMPUSES } from '../data/mockData';
import { Campus } from '../types';
import { useState } from 'react';
import { Info, MapPin, Navigation } from 'lucide-react';

export const SolarExplorer = ({ onCampusSelect }: { onCampusSelect: (campus: Campus) => void }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-sm rounded-3xl border border-white/5">
      {/* Background Star Field Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Main Campus (The Sun) */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => onCampusSelect(CAMPUSES[0])}
        className="relative z-20 w-32 h-32 rounded-full cursor-pointer group"
      >
        <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
        <div className="relative w-full h-full rounded-full border-4 border-white/20 overflow-hidden bg-blue-900 flex items-center justify-center text-center p-2">
          <span className="text-white font-bold text-xs leading-tight">SIDIST KILO (MAIN)</span>
        </div>
      </motion.div>

      {/* Orbiting Campuses */}
      {CAMPUSES.slice(1).map((campus, idx) => {
        const angle = (idx / (CAMPUSES.length - 1)) * Math.PI * 2;
        const radius = campus.orbitRadius;
        
        return (
          <div key={campus.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Orbit Path */}
            <div
              className="absolute border border-white/5 rounded-full"
              style={{ width: radius * 2, height: radius * 2 }}
            />
            
            {/* Planet */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: campus.orbitSpeed, repeat: Infinity, ease: "linear" }}
              className="absolute flex items-center justify-center"
              style={{ width: radius * 2, height: radius * 2 }}
            >
              <motion.div
                onMouseEnter={() => setHovered(campus.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onCampusSelect(campus)}
                className="absolute pointer-events-auto cursor-pointer"
                style={{ left: `calc(50% + ${radius}px - 16px)`, top: 'calc(50% - 16px)' }}
              >
                <div className="relative group">
                  <div className="w-8 h-8 rounded-full bg-blue-500/40 border border-white/20 backdrop-blur-md group-hover:bg-blue-400 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  
                  {/* Tooltip */}
                  {(hovered === campus.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black/90 border border-white/10 rounded-lg p-3 backdrop-blur-xl z-50 pointer-events-none"
                    >
                      <p className="text-white font-bold text-xs mb-1">{campus.name}</p>
                      <p className="text-gray-400 text-[10px] line-clamp-2">{campus.description}</p>
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-blue-400">
                        <MapPin size={10} />
                        <span>{campus.address}</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Small Label */}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] text-gray-500 uppercase tracking-widest whitespace-nowrap">
                    {campus.shortName}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};