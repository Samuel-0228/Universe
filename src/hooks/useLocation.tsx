"use client";
import React, { useState } from "react";
import { Compass } from "lucide-react";
import { Campus } from "@/types/campus";

const UserLocationMode = ({ campuses, onSelect }: { campuses: Campus[], onSelect: (c: Campus) => void }) => {
  const [loading, setLoading] = useState(false);

  const detect = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      let nearest = campuses[0];
      let minDist = Infinity;

      campuses.forEach(c => {
        const d = Math.sqrt(Math.pow(c.lat - latitude, 2) + Math.pow(c.lng - longitude, 2));
        if (d < minDist) {
          minDist = d;
          nearest = c;
        }
      });

      onSelect(nearest);
      setLoading(false);
    }, () => setLoading(false));
  };

  return (
    <button 
      onClick={detect}
      disabled={loading}
      className="fixed bottom-10 left-10 z-50 p-4 glass-panel rounded-full hover:scale-110 transition-all text-aau-gold flex items-center gap-2"
    >
      <Compass className={loading ? "animate-spin" : ""} />
      <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Nearest Node</span>
    </button>
  );
};

export default UserLocationMode;
