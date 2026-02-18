
import React, { useState, useEffect } from 'react';
import { AAU_CAMPUSES, TRANSPORT_MODES } from '../constants';
import { Icon } from './Icons';

const TransportEngine: React.FC = () => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!from || !to) {
      setDistance(null);
      return;
    }

    const startCoords = from === 'user' ? userLocation : AAU_CAMPUSES.find(c => c.id === from)?.coordinates;
    const endCoords = AAU_CAMPUSES.find(c => c.id === to)?.coordinates;

    if (startCoords && endCoords) {
      setDistance(calculateDistance(startCoords.lat, startCoords.lng, endCoords.lat, endCoords.lng));
    }
  }, [from, to, userLocation]);

  const handleUseLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setFrom('user');
    });
  };

  return (
    <div className="glass p-6 rounded-[2.5rem] w-full max-w-md pointer-events-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-white/5">
          <Icon name="Navigation" className="text-white/60" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight">Transport Engine</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Real-time distance calculator</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest absolute -top-2 left-4 bg-[#0d0d1b] px-2 z-10">Origin</label>
          <select 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm appearance-none focus:outline-none focus:border-white/20"
          >
            <option value="" disabled className="bg-slate-900">Select Origin</option>
            <option value="user" className="bg-slate-900">My Location (GPS)</option>
            {AAU_CAMPUSES.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
            ))}
          </select>
          <button 
            onClick={handleUseLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            <Icon name="Compass" size={16} />
          </button>
        </div>

        <div className="relative">
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest absolute -top-2 left-4 bg-[#0d0d1b] px-2 z-10">Destination</label>
          <select 
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm appearance-none focus:outline-none focus:border-white/20"
          >
            <option value="" disabled className="bg-slate-900">Select Destination</option>
            {AAU_CAMPUSES.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
            ))}
          </select>
        </div>

        {distance !== null && (
          <div className="pt-4 space-y-4 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-sm text-white/40">Total Distance</span>
              <span className="text-2xl font-bold font-space">{distance.toFixed(2)} <span className="text-sm font-normal text-white/40">km</span></span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {TRANSPORT_MODES.map(mode => {
                const time = (distance / mode.speed) * 60;
                return (
                  <div key={mode.id} className="glass p-3 rounded-2xl flex flex-col items-center text-center">
                    <span className="text-lg mb-1">{mode.icon}</span>
                    <span className="text-[10px] text-white/40 uppercase font-bold mb-1">{mode.name}</span>
                    <span className="text-sm font-bold text-white/90">
                      {time > 60 ? `${Math.floor(time / 60)}h ${Math.round(time % 60)}m` : `${Math.round(time)}m`}
                    </span>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => {
                const dest = AAU_CAMPUSES.find(c => c.id === to);
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest?.coordinates.lat},${dest?.coordinates.lng}`, '_blank');
              }}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95"
            >
              Get Directions
              <Icon name="ExternalLink" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransportEngine;
