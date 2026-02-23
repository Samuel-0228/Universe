import { useState } from 'react';
import { CAMPUSES } from '../data/mockData';
import { Navigation, Clock, Map as MapIcon, ArrowRight, Bus, Car, Footprints } from 'lucide-react';
import { generateGoogleMapsLink } from '../lib/utils';

export const RoutingSystem = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState(CAMPUSES[0].id);
  const [mode, setMode] = useState('transit');

  const destCampus = CAMPUSES.find(c => c.id === destination);

  const stats = {
    distance: '4.2 km',
    time: {
      walking: '52 min',
      taxi: '12 min',
      transit: '18 min'
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <Navigation className="text-blue-500" />
        <h2 className="text-2xl font-bold text-white">Campus Navigator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold">Starting Point</label>
            <input
              type="text"
              placeholder="Enter origin (e.g., Current Location)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold">Destination Campus</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {CAMPUSES.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            {[
              { id: 'walking', icon: Footprints, label: 'Walk' },
              { id: 'driving', icon: Car, label: 'Taxi' },
              { id: 'transit', icon: Bus, label: 'Bus' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all ${
                  mode === m.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <m.icon size={14} />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 text-sm">Estimated Route</span>
              <span className="text-blue-400 font-bold">{stats.distance}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-tighter">Est. Time</p>
                  <p className="text-xl font-bold text-white">
                    {mode === 'walking' ? stats.time.walking : mode === 'driving' ? stats.time.taxi : stats.time.transit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a
            href={generateGoogleMapsLink(origin || 'current location', destCampus!.coordinates, mode)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center gap-3 w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all"
          >
            Open in Google Maps
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};