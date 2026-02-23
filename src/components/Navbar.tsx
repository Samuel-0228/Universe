import { useState } from 'react';
import { Search, Map, Calendar, ShieldCheck, Menu, X, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = ({ onSearchClick }: { onSearchClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Explore', icon: Map, href: '#' },
    { label: 'Academic', icon: Calendar, href: '#' },
    { label: 'Portal', icon: ShieldCheck, href: '#' },
    { label: 'Admin', icon: User, href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-contain bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/47a915ec-86af-4b0e-937c-242f75156964/aau-emblem-9abfa81a-1771847863737.webp')` }} />
          <span className="text-white font-black tracking-tight text-2xl hidden sm:block">Savvy-AAU</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="h-6 w-px bg-white/10" />
          <button 
            onClick={onSearchClick}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl py-2.5 px-5 text-sm text-gray-500 hover:bg-white/10 hover:text-white transition-all"
          >
            <Search size={18} />
            <span className="pr-12">Search campus...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 border border-white/10 rounded text-[10px] font-bold">⌘K</kbd>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button onClick={onSearchClick} className="p-2 text-gray-400"><Search size={24} /></button>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
          >
            <div className="p-8 space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 text-xl font-bold text-gray-300 hover:text-blue-400 transition-colors uppercase tracking-widest"
                >
                  <item.icon size={24} />
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