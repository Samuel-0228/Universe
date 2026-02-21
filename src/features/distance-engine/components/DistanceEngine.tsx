"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation, ExternalLink } from "lucide-react";
import { Campus } from "@/types/campus";

const DistanceEngine = ({ campuses }: { campuses: Campus[] }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const c1 = campuses.find(c => c.id === from);
    const c2 = campuses.find(c => c.id === to);
    if (!c1 || !c2) return;

    const R = 6371; // km
    const dLat = (c2.lat - c1.lat) * Math.PI / 180;
    const dLon = (c2.lng - c1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;

    setResult({
      distance: d.toFixed(2),
      drive: Math.round(d * 3),
      walk: Math.round(d * 12),
      taxi: Math.round(d * 4),
      url: `https://www.google.com/maps/dir/?api=1&origin=${c1.lat},${c1.lng}&destination=${c2.lat},${c2.lng}`
    });
  };

  return (
    <div className="p-8 glass-panel rounded-[32px] mb-20">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
        <Navigation size={24} className="text-aau-gold" />
        Distance & Route Engine
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="text-[10px] font-bold uppercase text-white/40 mb-2 block">Origin Node</label>
          <select 
            value={from} 
            onChange={e => setFrom(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-aau-gold"
          >
            <option value="">Select Campus</option>
            {campuses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase text-white/40 mb-2 block">Destination Node</label>
          <select 
            value={to} 
            onChange={e => setTo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-aau-gold"
          >
            <option value="">Select Campus</option>
            {campuses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <button 
          onClick={calculate}
          className="py-3 bg-aau-gold text-aau-navy font-black rounded-xl hover:scale-105 transition-all"
        >
          Calculate Trajectory
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="p-4 bg-white/5 rounded-2xl text-center">
              <p className="text-[8px] font-bold uppercase text-white/30 mb-1">Distance</p>
              <p className="text-xl font-black">{result.distance} km</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl text-center">
              <p className="text-[8px] font-bold uppercase text-white/30 mb-1">Drive Time</p>
              <p className="text-xl font-black">{result.drive} min</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl text-center">
              <p className="text-[8px] font-bold uppercase text-white/30 mb-1">Walk Time</p>
              <p className="text-xl font-black">{result.walk} min</p>
            </div>
            <a 
              href={result.url} 
              target="_blank" 
              className="p-4 bg-aau-gold/20 border border-aau-gold/30 rounded-2xl text-center flex items-center justify-center gap-2 hover:bg-aau-gold/30 transition-all"
            >
              <ExternalLink size={18} className="text-aau-gold" />
              <span className="text-sm font-bold text-aau-gold">Google Maps</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DistanceEngine;
