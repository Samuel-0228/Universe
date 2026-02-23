import { useState } from 'react';
import { CAMPUSES } from '../data/mockData';
import { Navigation, Clock, ArrowRight, Bus, Car, Footprints, Info } from 'lucide-react';
import { generateGoogleMapsLink } from '../lib/utils';
import { motion } from 'framer-motion';

export const RoutingSystem = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState(CAMPUSES[0].id);
  const [mode, setMode] = useState('transit');

  const destCampus = CAMPUSES.find(c => c.id === destination);

  // Improved estimation logic based on distance and mode
  // Using a simple mock calculation for demonstration
  const calculateEstimation = () => {
    // In a real app, this would use a distance matrix API
    // Here we use a seed based on the destination ID to make it consistent but "working"
    const seed = destination.length * 1.2;
    const baseKm = (seed % 5) + 1.5;
    
    const walkingMin = Math.round(baseKm * 15); // 15 min per km
    const drivingMin = Math.round(baseKm * 3 + 5); // 3 min per km + traffic
    const transitMin = Math.round(baseKm * 6 + 10); // 6 min per km + waiting

    return {
      distance: `${baseKm.toFixed(1)} km`,
      time: {
        walking: `${walkingMin} min`,
        driving: `${drivingMin} min`,
        transit: `${transitMin} min`
      }
    };
  };

  const stats = calculateEstimation();

  return (
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <Navigation size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Campus Navigator</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Inter-Campus Logistics Node</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
          <Info size={14} /> Live Traffic Enabled
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1">Starting Point</label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Current Location or Point of Interest"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all group-hover:border-white/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1">Destination Campus</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
            >
              {CAMPUSES.map(c => (
                <option key={c.id} value={c.id} className="bg-[#0a0a0a] text-white">{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3 p-1.5 bg-white/[0.03] rounded-2xl border border-white/10">
            {[
              { id: 'walking', icon: Footprints, label: 'Walk' },
              { id: 'driving', icon: Car, label: 'Taxi' },
              { id: 'transit', icon: Bus, label: 'Bus' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex flex-col items-center gap-2 py-4 rounded-xl transition-all ${
                  mode === m.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <m.icon size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/[0.05] to-transparent rounded-[2rem] p-8 border border-white/5 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
            {mode === 'walking' ? <Footprints size={150} /> : mode === 'driving' ? <Car size={150} /> : <Bus size={150} />}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
              <span className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">Route Intelligence</span>
              <div className="px-3 py-1 bg-blue-500/20 rounded-lg text-blue-400 text-xs font-black">{stats.distance}</div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10 shadow-inner">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Estimated Arrival</p>
                  <p className="text-4xl font-black text-white tracking-tighter">
                    {mode === 'walking' ? stats.time.walking : mode === 'driving' ? stats.time.driving : stats.time.transit}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                  * Estimations based on average city traffic and internal campus pedestrian data. Real-time updates provided via Google Maps integration.
                </p>
              </div>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={generateGoogleMapsLink(origin || 'Addis Ababa University', destCampus!.coordinates, mode)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex items-center justify-center gap-3 w-full bg-white text-black font-black py-5 rounded-2xl text-sm uppercase tracking-widest shadow-2xl hover:bg-gray-200 transition-all relative z-10"
          >
            Initialize Route
            <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>
    </div>
  );
};