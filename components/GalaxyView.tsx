
import React, { useMemo } from 'react';
import { AAU_CAMPUSES } from '../constants';
import { Campus } from '../types';

interface GalaxyViewProps {
  onSelectCampus: (campus: Campus) => void;
}

const GalaxyView: React.FC<GalaxyViewProps> = ({ onSelectCampus }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--duration': star.duration
            } as any}
          />
        ))}
      </div>

      {/* Central Sun: AAU Central */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-[0_0_60px_20px_rgba(255,255,255,0.2)] flex items-center justify-center p-2 group transition-all duration-500">
           <img src="https://picsum.photos/id/192/200" className="rounded-full w-full h-full object-cover grayscale brightness-110" alt="AAU Logo" />
        </div>
        <div className="mt-4 text-center pointer-events-auto">
          <h1 className="text-xl font-bold tracking-widest text-white/90">AAU CENTRAL</h1>
          <p className="text-xs text-white/40 uppercase tracking-widest">Unified Digital Galaxy</p>
        </div>
      </div>

      {/* Orbiting Campuses */}
      {AAU_CAMPUSES.map((campus, index) => (
        <div
          key={campus.id}
          className="orbit-path"
          style={{
            width: `${campus.orbitRadius * 2}px`,
            height: `${campus.orbitRadius * 2}px`,
          }}
        >
          <div
            className="planet-orbit"
            style={{ animationDuration: campus.orbitDuration }}
          >
            <div
              onClick={() => onSelectCampus(campus)}
              className="planet-marker pointer-events-auto cursor-pointer group"
            >
              <div 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 shadow-lg relative transition-all duration-300 group-hover:scale-150 group-hover:border-white"
                style={{ backgroundColor: campus.planetColor }}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="glass px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl">
                  <span className="text-xs font-bold text-white tracking-wider uppercase">{campus.shortName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalaxyView;
