"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Globe, Compass, Activity, Users, Calendar, Share2, X, Navigation } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GalaxyMap from "@/features/galaxy/components/GalaxyMap";
import CampusGrid from "@/features/campuses/components/CampusGrid";
import DistanceEngine from "@/features/distance-engine/components/DistanceEngine";
import SearchSystem from "@/features/search/components/SearchSystem";
import UserLocationMode from "@/hooks/useLocation";
import { Campus } from "@/types/campus";

const LandingPage = ({ onEnter }: { onEnter: () => void }) => (
  <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/aau/1920/1080" 
        alt="AAU Background" 
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
        The official digital infrastructure connecting the star nodes of Addis Ababa University.
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

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCampuses = async () => {
    try {
      const res = await fetch("/api/campuses");
      const data = await res.json();
      setCampuses(data);
    } catch (err) {
      console.error("Failed to fetch campuses:", err);
    } finally {
      setLoading(false);
    }
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

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-aau-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : campuses.length === 0 ? (
          <div className="p-20 text-center glass-panel rounded-[40px]">
            <p className="text-white/40 font-bold uppercase tracking-widest">No nodes detected in this sector.</p>
          </div>
        ) : (
          <>
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <Globe size={24} className="text-aau-gold" />
                  Orbital Node Visualization
                </h3>
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
          </>
        )}
        
        <UserLocationMode campuses={campuses} onSelect={setSelectedCampus} />

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
