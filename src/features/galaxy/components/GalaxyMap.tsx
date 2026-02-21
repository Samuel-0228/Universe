"use client";
import React from "react";
import { motion } from "motion/react";
import { Campus } from "@/types/campus";

const GalaxyMap = ({ campuses, onSelect, selectedId }: { campuses: Campus[], onSelect: (c: Campus) => void, selectedId?: string }) => {
  return (
    <div className="relative w-full h-[700px] bg-black/40 rounded-[40px] overflow-hidden border border-white/5 star-field flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="relative z-20 w-24 h-24 bg-aau-gold rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.4)] cursor-pointer"
        onClick={() => onSelect(campuses[0])}
      >
        <span className="text-aau-navy font-black text-xs text-center leading-none">MAIN<br/>NODE</span>
      </motion.div>

      {campuses.slice(1).map((campus, i) => {
        const radius = 120 + i * 30;
        const duration = 25 + i * 5;
        const isActive = selectedId === campus.id;

        return (
          <div 
            key={campus.id}
            className="absolute border border-white/5 rounded-full pointer-events-none"
            style={{ width: radius * 2, height: radius * 2 }}
          >
            <motion.div 
              className="absolute top-1/2 left-1/2 w-full h-full pointer-events-auto"
              style={{ '--radius': `${radius}px`, '--duration': `${duration}s` } as any}
            >
              <div className="orbit-animation absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => onSelect(campus)}
                  className="group relative"
                >
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 planet-glow ${isActive ? 'bg-aau-gold scale-150' : 'bg-white/40 group-hover:bg-aau-gold'}`} style={{ '--glow-color': campus.color } as any} />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {campus.name}
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default GalaxyMap;
