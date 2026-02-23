import { useState, useEffect } from 'react';
import { Search, Map, Calendar, ShieldCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ onSearchClick }: { onSearchClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Explore', icon: Map, href: '#explore' },
    { label: 'Academic', icon: Calendar, href: '#student' },
    { label: 'Student Portal', icon: ShieldCheck, href: 'https://portal.aau.edu.et/', external: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled || isOpen ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10 py-3' : 'bg-transparent py-5'
    } px-6`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-contain bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/47a915ec-86af-4b0e-937c-242f75156964/aau-emblem-9abfa81a-1771847863737.webp')` }} />
          <span className="text-white font-black tracking-tighter text-2xl">Savvy-AAU</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : ""}
                className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-white transition-all uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="h-6 w-px bg-white/10" />
          <button 
            onClick={onSearchClick}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <Search size={16} />
            <span className="pr-8">Search...</span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.5 border border-white/10 rounded text-[10px] font-bold">⌘K</kbd>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button onClick={onSearchClick} className="p-2 text-gray-400 hover:text-white transition-colors">
            <Search size={22} />
          </button>
          <button 
            className="w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl border border-white/10" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : ""}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 text-lg font-black text-gray-300 hover:text-blue-400 hover:bg-white/5 rounded-2xl transition-all uppercase tracking-widest"
                >
                  <item.icon size={22} className="text-blue-500" />
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};