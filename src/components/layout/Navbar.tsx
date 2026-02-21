import React from "react";

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

export default Navbar;
