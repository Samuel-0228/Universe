import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, MapPin, Navigation, Info, BookOpen, Building2, Phone, 
  ArrowRight, X, Globe, Compass, Layers, Activity, Users, 
  Calendar, Share2, ExternalLink, ChevronRight, Settings, Plus, Save, Trash2
} from "lucide-react";

// --- Types ---
interface Campus {
  id: string;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  color: string;
  contact: string;
  departments?: any[];
  services?: any[];
  buildings?: any[];
}

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-b-0 rounded-b-3xl mx-4 mt-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-aau-gold rounded-xl flex items-center justify-center shadow-lg shadow-aau-gold/20">
        <span className="text-aau-navy font-black text-xl">S</span>
      </div>
      <div>
        <h1 className="text-lg font-black tracking-tighter leading-none">SAVVY-AAU-108</h1>
        <p className="text-[10px] text-aau-gold font-bold uppercase tracking-[0.2em]">Galaxy Infrastructure</p>
      </div>
    </div>
    <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/50">
      <a href="#" className="hover:text-aau-gold transition-colors">Network</a>
      <a href="#" className="hover:text-aau-gold transition-colors">Collaboration</a>
      <a 
        href="https://portal.aau.edu.et/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all"
      >
        Student Portal
      </a>
    </div>
  </nav>
);

const LandingPage = ({ onEnter }: { onEnter: () => void }) => (
  <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://www.aau.edu.et/_next/image?url=%2Fimages%2Fforumbuilding.jpg&w=3840&q=75" 
        alt="AAU Forum Building" 
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-aau-navy/80 via-aau-navy/40 to-aau-navy" />
    </div>

    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative z-10 mb-12"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute inset-0 border border-aau-gold/20 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-4 border border-aau-gold/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="w-20 h-20 bg-aau-gold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.5)]">
          <span className="text-aau-navy font-black text-3xl">AAU</span>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />
      </div>
    </motion.div>

    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative z-10 text-center px-6"
    >
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 glow-text uppercase">
        Savvy-AAU-108
      </h1>
      <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto mb-12 tracking-tight">
        The official digital infrastructure connecting the 15 star nodes of Addis Ababa University.
      </p>
      
      <button 
        onClick={onEnter}
        className="group relative px-12 py-5 bg-aau-gold text-aau-navy font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
      >
        <span className="relative z-10 flex items-center gap-3">
          ENTER THE GALAXY
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </span>
      </button>
    </motion.div>
  </div>
);

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

const DistanceEngine = ({ campuses }: { campuses: Campus[] }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const c1 = campuses.find(c => c.id === from);
    const c2 = campuses.find(c => c.id === to);
    if (!c1 || !c2) return;

    // Haversine formula for distance
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
      drive: Math.round(d * 3), // rough estimate
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

const SearchSystem = ({ onSelect }: { onSelect: (c: Campus) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-20">
      <div className="relative group">
        <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
          <Search size={24} className="text-white/20 group-focus-within:text-aau-gold transition-colors" />
        </div>
        <input 
          type="text"
          placeholder="Search the galaxy (e.g. 'Computer Science', 'Library')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] py-7 pl-20 pr-8 focus:outline-none focus:ring-2 focus:ring-aau-gold/30 focus:bg-white/10 transition-all text-xl font-medium tracking-tight"
        />
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-full left-0 right-0 mt-4 glass-panel rounded-[32px] overflow-hidden z-40 border border-white/10 p-2"
          >
            {results.map((res, i) => (
              <button 
                key={i}
                onClick={() => {
                  onSelect({ id: res.id } as Campus); // Simplified select
                  setQuery("");
                }}
                className="w-full flex items-center gap-6 p-5 hover:bg-white/5 rounded-2xl transition-all text-left group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-aau-gold/20 transition-colors">
                  {res.type === 'campus' ? <MapPin size={24} /> : <BookOpen size={24} />}
                </div>
                <div>
                  <h4 className="font-black text-lg group-hover:text-aau-gold transition-colors">{res.title}</h4>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">{res.type} // {res.subtitle}</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-white/10 group-hover:text-aau-gold group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  const fetchCampuses = async () => {
    const res = await fetch("/api/campuses");
    const data = await res.json();
    setCampuses(data);
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  if (!isEntered) return <LandingPage onEnter={() => setIsEntered(true)} />;

  return (
    <div className="min-h-screen bg-aau-navy relative">
      <div className="fixed inset-0 star-field opacity-30 pointer-events-none" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <div className="mb-20">
          <h2 className="text-6xl font-black tracking-tighter leading-[0.9] mb-6">
            Explore the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aau-gold to-aau-accent">AAU Universe</span>
          </h2>
        </div>

        <SearchSystem onSelect={(c) => setSelectedCampus(campuses.find(cp => cp.id === c.id) || null)} />

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Globe size={24} className="text-aau-gold" />
              Orbital Node Visualization
            </h3>
            <div className="flex gap-2">
              <button className="p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors">
                <Compass size={18} />
              </button>
              <button className="p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors">
                <Layers size={18} />
              </button>
            </div>
          </div>
          <GalaxyMap campuses={campuses} onSelect={setSelectedCampus} selectedId={selectedCampus?.id} />
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Activity size={24} className="text-aau-gold" />
              Campus Node Directory
            </h3>
          </div>
          <CampusGrid campuses={campuses} onSelect={setSelectedCampus} />
        </section>

        <DistanceEngine campuses={campuses} />
        
        <UserLocationMode campuses={campuses} onSelect={setSelectedCampus} />

        {/* Student Hub Placeholder */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 glass-card rounded-[32px]">
            <Users className="text-aau-gold mb-4" />
            <h4 className="text-xl font-bold mb-2">Student Network</h4>
            <p className="text-xs text-white/40">Connect with 50K+ peers across all nodes.</p>
          </div>
          <div className="p-8 glass-card rounded-[32px]">
            <Calendar className="text-aau-gold mb-4" />
            <h4 className="text-xl font-bold mb-2">Galaxy Events</h4>
            <p className="text-xs text-white/40">Real-time updates on campus activities.</p>
          </div>
          <div className="p-8 glass-card rounded-[32px]">
            <Share2 className="text-aau-gold mb-4" />
            <h4 className="text-xl font-bold mb-2">Resource Sharing</h4>
            <p className="text-xs text-white/40">Digital library and research collaboration.</p>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedCampus && (
          <div className="fixed inset-0 z-[80] flex items-center justify-end p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCampus(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="relative w-full md:w-[600px] h-full glass-panel rounded-[40px] p-10 overflow-y-auto"
            >
              <button onClick={() => setSelectedCampus(null)} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full"><X /></button>
              <h2 className="text-5xl font-black mb-6 tracking-tighter">{selectedCampus.name}</h2>
              <p className="text-white/60 mb-10 leading-relaxed">{selectedCampus.description}</p>
              
              <div className="space-y-8">
                <div className="p-6 bg-white/5 rounded-3xl">
                  <h4 className="text-xs font-bold uppercase text-aau-gold mb-4 tracking-widest">Node Location</h4>
                  <p className="text-sm mb-2">{selectedCampus.address}</p>
                  <p className="text-[10px] font-mono text-white/30">{selectedCampus.lat}, {selectedCampus.lng}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl">
                  <h4 className="text-xs font-bold uppercase text-aau-gold mb-4 tracking-widest">Contact Protocol</h4>
                  <p className="text-sm">{selectedCampus.contact}</p>
                </div>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedCampus.lat},${selectedCampus.lng}`, "_blank")}
                  className="w-full py-5 bg-aau-gold text-aau-navy font-black rounded-2xl flex items-center justify-center gap-2"
                >
                  <Navigation size={20} /> Initiate Navigation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
