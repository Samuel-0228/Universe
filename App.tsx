
import React, { useState } from 'react';
import GalaxyView from './components/GalaxyView';
import CampusDetails from './components/CampusDetails';
import SearchBar from './components/SearchBar';
import TransportEngine from './components/TransportEngine';
import { Campus } from './types';
import { AAU_CAMPUSES } from './constants';
import { Icon } from './components/Icons';

const App: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [showTransport, setShowTransport] = useState(false);

  const handleSearchResult = (id: string, type: string) => {
    const campus = AAU_CAMPUSES.find(c => c.id === id);
    if (campus) setSelectedCampus(campus);
  };

  return (
    <div className="relative w-full h-screen bg-[#030014] text-white overflow-hidden flex flex-col">
      <div className="galaxy-bg" />
      
      {/* HUD Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none flex justify-between items-start">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-white/20">S-</span>AAU-108 <span className="px-2 py-0.5 bg-white text-black text-[10px] font-black rounded uppercase tracking-widest">GALAXY</span>
          </h1>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-1">Digital Campus Infrastructure</p>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button type="button" title="User Profile" className="glass p-3 rounded-full hover:bg-white/10 transition-colors">
            <Icon name="User" size={20} className="text-white/60" />
          </button>
          <button type="button" title="Settings" className="glass p-3 rounded-full hover:bg-white/10 transition-colors">
            <Icon name="Settings" size={20} className="text-white/60" />
          </button>
        </div>
      </nav>

      {/* Main Galaxy Interface */}
      <main className="flex-1 relative">
        <GalaxyView onSelectCampus={setSelectedCampus} />
        
        {/* Floating Search Bar */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full px-6 flex justify-center z-40">
           <SearchBar onSelectResult={handleSearchResult} />
        </div>

        {/* Transport Toggle Button */}
        <div className="absolute bottom-10 left-10 z-40">
          <button 
            onClick={() => setShowTransport(!showTransport)}
            className={`glass p-5 rounded-[2rem] flex items-center gap-3 transition-all duration-500 pointer-events-auto shadow-2xl ${
              showTransport ? 'bg-white text-black' : 'hover:bg-white/10'
            }`}
          >
            <Icon name="Navigation" size={24} className={showTransport ? 'text-black' : 'text-white'} />
            <span className="font-bold uppercase tracking-widest text-sm">Transport Hub</span>
          </button>
          
          {showTransport && (
            <div className="absolute bottom-24 left-0 animate-in slide-in-from-bottom-4 fade-in duration-500">
               <TransportEngine />
            </div>
          )}
        </div>

        {/* HUD Info */}
        <div className="absolute bottom-10 right-10 z-30 pointer-events-none text-right hidden md:block">
           <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Lat: 9.0192° N / Lon: 38.7469° E</p>
           <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1">AAU Integrated Galaxy v1.0.8</p>
        </div>
      </main>

      {/* Campus Details Overlay */}
      {selectedCampus && (
        <CampusDetails 
          campus={selectedCampus} 
          onClose={() => setSelectedCampus(null)} 
        />
      )}

      {/* Footer Branding */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="glass px-6 py-2 rounded-full border border-white/5">
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Propelling Ethiopian Academia into the Future</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
