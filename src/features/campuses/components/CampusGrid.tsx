"use client";
import React from "react";
import { motion } from "motion/react";
import { Globe, ChevronRight } from "lucide-react";
import { Campus } from "@/types/campus";

const CampusGrid = ({ campuses, onSelect }: { campuses: Campus[], onSelect: (c: Campus) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
    {campuses.map((campus) => (
      <motion.button
        key={campus.id}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(campus)}
        className="group relative p-6 glass-card rounded-[32px] text-left overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center planet-glow shadow-lg"
              style={{ backgroundColor: campus.color, '--glow-color': campus.color } as any}
            >
              <Globe size={20} className="text-aau-navy" />
            </div>
            <div>
              <h4 className="font-black text-lg leading-tight group-hover:text-aau-gold transition-colors">{campus.name}</h4>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{campus.shortName} Node</p>
            </div>
          </div>
          
          <p className="text-xs text-white/50 line-clamp-2 mb-6 leading-relaxed">
            {campus.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-aau-gold">
              Explore Node <ChevronRight size={12} />
            </div>
            <div className="text-[8px] font-mono text-white/20">
              {campus.lat.toFixed(2)}, {campus.lng.toFixed(2)}
            </div>
          </div>
        </div>
      </motion.button>
    ))}
  </div>
);

export default CampusGrid;
