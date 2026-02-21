import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Info, 
  BookOpen, 
  Building2, 
  Phone, 
  ArrowRight, 
  X, 
  Globe,
  Compass,
  Layers,
  Activity,
  Users,
  MessageSquare,
  Calendar,
  Share2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CAMPUSES, Campus } from './data/campuses';

// --- Components ---

const LandingPage = ({ onEnter }: { onEnter: () => void }) => (
  <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://www.aau.edu.et/_next/image?url=%2Fimages%2Fforumbuilding.jpg&w=3840&q=75" 
        alt="AAU Forum Building" 
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-aau-navy/80 via-aau-navy/40 to-aau-navy" />
    </div>

    {/* Solar Logo Animation */}
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative z-10 mb-12"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Orbits */}
        <div className="absolute inset-0 border border-aau-gold/20 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-4 border border-aau-gold/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        
        {/* Central Sun */}
        <div className="w-20 h-20 bg-aau-gold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.5)]">
          <span className="text-aau-navy font-black text-3xl">AAU</span>
        </div>

        {/* Orbiting Planets */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-aau-accent rounded-full shadow-[0_0_10px_rgba(242,125,38,0.5)]" />
      </div>
    </motion.div>

    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative z-10 text-center px-6"
    >
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 glow-text">
        SAVVY-AAU
      </h1>
      <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto mb-12 tracking-tight">
        The official digital infrastructure connecting the 15 star nodes of Addis Ababa University.
      </p>
      
      <button 
        onClick={onEnter}
        className="group relative px-12 py-5 bg-aau-gold text-aau-navy font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
      >
        <span className="relative z-10 flex items-center gap-3">
          ENTER THE SYSTEM
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    </motion.div>

    {/* Bottom Stats */}
    <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center gap-12 text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">
      <span>15 Campuses</span>
      <span>•</span>
      <span>50K+ Students</span>
      <span>•</span>
      <span>Digital Sovereignty</span>
    </div>
  </div>
);

const SolarSystemMap = ({ onSelect, selectedId }: { onSelect: (c: Campus) => void, selectedId?: string }) => {
  return (
    <div className="relative w-full h-[700px] bg-black/40 rounded-[40px] overflow-hidden border border-white/5 star-field flex items-center justify-center">
      {/* Central Sun (Main Campus) */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="relative z-20 w-24 h-24 bg-aau-gold rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.4)] cursor-pointer"
        onClick={() => onSelect(CAMPUSES[0])}
      >
        <span className="text-aau-navy font-black text-xs text-center leading-none">MAIN<br/>CAMPUS</span>
      </motion.div>

      {/* Orbits & Planets */}
      {CAMPUSES.slice(1).map((campus, i) => {
        const radius = 100 + i * 35;
        const duration = 20 + i * 5;
        const isActive = selectedId === campus.id;

        return (
          <div 
            key={campus.id}
            className="absolute border border-white/5 rounded-full pointer-events-none"
            style={{ width: radius * 2, height: radius * 2 }}
          >
            <motion.div 
              className="absolute top-1/2 left-1/2 w-full h-full pointer-events-auto"
              style={{ 
                '--radius': `${radius}px`, 
                '--duration': `${duration}s` 
              } as any}
            >
              <div className="orbit-animation absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => onSelect(campus)}
                  className="group relative"
                >
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 ${isActive ? 'bg-aau-gold scale-150 shadow-[0_0_20px_rgba(212,175,55,0.8)]' : 'bg-white/40 group-hover:bg-aau-gold'}`} />
                  
                  {/* Label */}
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

      {/* Map Overlay Info */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-3 p-4 glass-panel rounded-2xl">
          <div className="w-2 h-2 bg-aau-gold rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Node Synchronization</span>
        </div>
      </div>
    </div>
  );
};

const StudentHub = () => (
  <section className="mt-24">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Student Collaboration Hub</h2>
        <p className="text-white/40 text-sm">Connect with peers across all 15 campuses in real-time.</p>
      </div>
      <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-xs font-bold transition-all">
        View All Channels
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Study Groups', icon: <BookOpen />, count: '1.2K Online', color: 'bg-blue-500/20 text-blue-400' },
        { title: 'Campus Events', icon: <Calendar />, count: '24 Today', color: 'bg-aau-gold/20 text-aau-gold' },
        { title: 'Peer Mentorship', icon: <Users />, count: '450 Mentors', color: 'bg-emerald-500/20 text-emerald-400' },
      ].map((item, i) => (
        <div key={i} className="p-6 glass-card rounded-3xl group cursor-pointer">
          <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            {item.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-xs text-white/40 mb-4">{item.count}</p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-aau-gold">
            Join Discussion <ChevronRight size={12} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-b-0 rounded-b-3xl mx-4 mt-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-aau-gold rounded-xl flex items-center justify-center shadow-lg shadow-aau-gold/20">
        <span className="text-aau-navy font-black text-xl">S</span>
      </div>
      <div>
        <h1 className="text-lg font-black tracking-tighter leading-none">SAVVY-AAU</h1>
        <p className="text-[10px] text-aau-gold font-bold uppercase tracking-[0.2em]">Institutional Intelligence</p>
      </div>
    </div>
    <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/50">
      <a href="#" className="hover:text-aau-gold transition-colors">Network</a>
      <a href="#" className="hover:text-aau-gold transition-colors">Collaboration</a>
      <a href="#" className="hover:text-aau-gold transition-colors">Infrastructure</a>
      <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all">
        Student Portal
      </button>
    </div>
  </nav>
);

const CampusProfile = ({ campus, onClose }: { campus: Campus, onClose: () => void }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
    className="fixed top-0 right-0 h-full w-full md:w-[550px] glass-panel z-[60] overflow-y-auto p-10 border-l border-white/10 shadow-[-40px_0_80px_rgba(0,0,0,0.8)]"
  >
    <button 
      onClick={onClose}
      className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-colors z-10"
    >
      <X size={24} />
    </button>

    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: campus.color }} />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Node Profile // {campus.id}</span>
      </div>
      <h2 className="text-5xl font-black mb-6 leading-[0.9] tracking-tighter">{campus.name}</h2>
      <p className="text-white/50 text-base leading-relaxed mb-10 font-medium">
        {campus.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="p-5 glass-card rounded-[24px]">
          <div className="flex items-center gap-2 mb-3 text-aau-gold">
            <MapPin size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Coordinates</span>
          </div>
          <p className="text-xs text-white/80 font-mono">{campus.location.lat.toFixed(4)}° N, {campus.location.lng.toFixed(4)}° E</p>
          <p className="text-[10px] text-white/30 mt-1">{campus.location.address}</p>
        </div>
        <div className="p-5 glass-card rounded-[24px]">
          <div className="flex items-center gap-2 mb-3 text-aau-gold">
            <Activity size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Network Load</span>
          </div>
          <p className="text-xs text-white/80 font-mono">Optimal (14ms)</p>
          <p className="text-[10px] text-white/30 mt-1">Last Sync: Just now</p>
        </div>
      </div>

      <div className="space-y-10">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Navigation size={20} className="text-aau-gold" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Smart Route Engine</h3>
            </div>
            <button 
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${campus.location.lat},${campus.location.lng}`, '_blank')}
              className="text-[10px] font-bold uppercase text-aau-gold flex items-center gap-1 hover:underline"
            >
              Open Google Maps <ExternalLink size={12} />
            </button>
          </div>
          <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] text-white/40 uppercase font-bold">Origin: Piazza (City Center)</p>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[8px] font-bold uppercase">Fastest Route</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Drive', time: '12m', icon: '🚗', dist: '4.2km' },
                { label: 'Taxi', time: '15m', icon: '🚕', dist: '4.2km' },
                { label: 'Walk', time: '45m', icon: '🚶', dist: '3.8km' },
              ].map(mode => (
                <div key={mode.label} className="text-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{mode.icon}</div>
                  <div className="text-sm font-black mb-0.5">{mode.time}</div>
                  <div className="text-[8px] text-white/30 uppercase font-bold">{mode.label} • {mode.dist}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={20} className="text-aau-gold" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Academic Infrastructure</h3>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-white/30 uppercase font-bold mb-3 tracking-widest">Colleges & Institutes</p>
              <div className="flex flex-wrap gap-2">
                {campus.colleges.map(c => (
                  <span key={c} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-medium border border-white/5 hover:bg-white/10 transition-colors">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Building2 size={20} className="text-aau-gold" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Building Directory</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {campus.infrastructure.buildings.map(b => (
              <div key={b} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl text-xs font-medium hover:bg-white/10 transition-all group">
                <span className="group-hover:text-aau-gold transition-colors">{b}</span>
                <ChevronRight size={14} className="text-white/10 group-hover:text-aau-gold" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 flex gap-4">
        <button 
          className="flex-1 py-5 bg-aau-gold text-aau-navy font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
        >
          <Share2 size={18} />
          Share Node Data
        </button>
      </div>
    </div>
  </motion.div>
);

const SearchSystem = ({ onSelect }: { onSelect: (c: Campus) => void }) => {
  const [query, setQuery] = useState('');
  
  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return CAMPUSES.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.colleges.some(col => col.toLowerCase().includes(q)) ||
      c.schools.some(s => s.toLowerCase().includes(q)) ||
      c.services.some(s => s.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [query]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
          <Search size={24} className="text-white/20 group-focus-within:text-aau-gold transition-colors" />
        </div>
        <input 
          type="text"
          placeholder="Search the infrastructure..."
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
            {results.map((campus) => (
              <button 
                key={campus.id}
                onClick={() => {
                  onSelect(campus);
                  setQuery('');
                }}
                className="w-full flex items-center gap-6 p-5 hover:bg-white/5 rounded-2xl transition-all text-left group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-aau-gold/20 transition-colors">
                  <MapPin size={24} className="text-white/20 group-hover:text-aau-gold" />
                </div>
                <div>
                  <h4 className="font-black text-lg group-hover:text-aau-gold transition-colors">{campus.name}</h4>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">{campus.shortName} Campus Node</p>
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

// --- Main App ---

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  return (
    <div className="min-h-screen bg-aau-navy relative">
      <AnimatePresence mode="wait">
        {!isEntered ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onEnter={() => setIsEntered(true)} />
          </motion.div>
        ) : (
          <motion.div 
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-aau-gold/5 blur-[150px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[180px] rounded-full" />
              <div className="absolute inset-0 star-field opacity-30" />
            </div>

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-32 relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div className="max-w-2xl">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-2 h-2 bg-aau-gold rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aau-gold">System Explorer // v2.0.4</span>
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl font-black tracking-tighter leading-[0.9] mb-6"
                  >
                    Explore the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-aau-gold to-aau-accent">AAU Universe</span>
                  </motion.h2>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="px-6 py-4 glass-panel rounded-3xl text-center min-w-[140px]">
                    <p className="text-[8px] font-bold uppercase text-white/30 mb-1">Active Nodes</p>
                    <p className="text-2xl font-black">15/15</p>
                  </div>
                  <div className="px-6 py-4 glass-panel rounded-3xl text-center min-w-[140px]">
                    <p className="text-[8px] font-bold uppercase text-white/30 mb-1">Network Health</p>
                    <p className="text-2xl font-black text-emerald-400">99.9%</p>
                  </div>
                </motion.div>
              </div>

              {/* Search */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-24"
              >
                <SearchSystem onSelect={setSelectedCampus} />
              </motion.div>

              {/* Solar System Map */}
              <section className="mb-32">
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
                <SolarSystemMap onSelect={setSelectedCampus} selectedId={selectedCampus?.id} />
              </section>

              {/* Student Hub */}
              <StudentHub />

              {/* Footer */}
              <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-aau-gold rounded-2xl flex items-center justify-center shadow-xl shadow-aau-gold/20">
                    <span className="text-aau-navy font-black text-2xl">S</span>
                  </div>
                  <div>
                    <p className="text-sm font-black tracking-tight">SAVVY-AAU INFRASTRUCTURE</p>
                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Digital Sovereignty for Ethiopian Excellence</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                  <a href="#" className="hover:text-aau-gold transition-colors">Network Protocol</a>
                  <a href="#" className="hover:text-aau-gold transition-colors">Academic Registry</a>
                  <a href="#" className="hover:text-aau-gold transition-colors">Student Rights</a>
                  <a href="#" className="hover:text-aau-gold transition-colors">System Status</a>
                </div>
              </footer>
            </main>

            {/* Side Profile Panel */}
            <AnimatePresence>
              {selectedCampus && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedCampus(null)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                  />
                  <CampusProfile campus={selectedCampus} onClose={() => setSelectedCampus(null)} />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
