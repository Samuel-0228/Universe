import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { SolarExplorer } from './components/SolarExplorer';
import { CampusDetail } from './components/CampusDetail';
import { RoutingSystem } from './components/RoutingSystem';
import { StudentTools } from './components/StudentTools';
import { GlobalSearch } from './components/GlobalSearch';
import { Campus } from './types';
import { CAMPUSES } from './data/mockData';
import { Calendar, BookOpen, MapPin, Bell, Briefcase, PlusCircle, LayoutDashboard, Settings } from 'lucide-react';
import { Toaster } from 'sonner';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [activeTab, setActiveTab] = useState('explore');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return <IntroScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Toaster position="top-center" theme="dark" />
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={setSelectedCampus}
      />
      
      {/* Background Image with Effects */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30 mix-blend-overlay scale-105"
          style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/47a915ec-86af-4b0e-937c-242f75156964/aau-forum-building-3159158d-1771847863199.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <section className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-block px-5 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(30,58,138,0.2)]"
          >
            Official Institutional Platform
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[7rem] font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500 leading-[0.9]"
          >
            Savvy-AAU
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed tracking-tight"
          >
            The centralized digital core for Addis Ababa University. 
            Empowering students and administration across all 15 campuses with intelligent logistics and academic tools.
          </motion.p>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center sticky top-28 z-40">
          <div className="inline-flex bg-black/40 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {[
              { id: 'explore', label: 'Explore', icon: LayoutDashboard },
              { id: 'navigator', label: 'Navigator', icon: MapPin },
              { id: 'student', label: 'Student Hub', icon: BookOpen },
              { id: 'admin', label: 'Management', icon: Settings },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-sm font-black transition-all ${
                  activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sections */}
        <AnimatePresence mode="wait">
          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-16"
            >
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-4xl font-black tracking-tight mb-4">The AAU Solar Map</h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Orbiting the Intellectual Center of East Africa</p>
              </div>
              <SolarExplorer onCampusSelect={setSelectedCampus} />
            </motion.div>
          )}

          {activeTab === 'navigator' && (
            <motion.div
              key="navigator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <RoutingSystem />
            </motion.div>
          )}

          {activeTab === 'student' && (
            <motion.div
              key="student"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2 space-y-12">
                <StudentTools />

                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 text-blue-500/20"><Calendar size={120} /></div>
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 relative">
                    Institutional Schedule
                  </h3>
                  <div className="space-y-6 relative">
                    {[
                      { event: 'Registration Window', date: 'Oct 12 - Oct 20', status: 'Completed', detail: 'Regular and Extension students.' },
                      { event: 'Midterm Assessments', date: 'Dec 05 - Dec 15', status: 'Ongoing', detail: 'Internal faculty schedule.' },
                      { event: 'Final Examinations', date: 'Jan 20 - Feb 05', status: 'Upcoming', detail: 'Senate approved dates.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between py-6 border-b border-white/5 last:border-0 group">
                        <div>
                          <p className="text-xl font-black group-hover:text-blue-400 transition-colors mb-1">{item.event}</p>
                          <p className="text-sm text-gray-400 font-medium mb-2">{item.date}</p>
                          <p className="text-xs text-gray-500">{item.detail}</p>
                        </div>
                        <span className={`text-[10px] px-4 py-1.5 rounded-full font-black tracking-[0.2em] uppercase ${
                          item.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          item.status === 'Ongoing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <div className="bg-gradient-to-br from-blue-700 via-blue-900 to-black rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] group">
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 border border-white/20"><Bell size={24} /></div>
                    <h4 className="font-black text-3xl mb-6 leading-[1.1]">Placement Intelligence</h4>
                    <p className="text-base opacity-80 mb-10 font-medium leading-relaxed">Access prioritized internship listings from institutional partners like CBE, EIC, and more.</p>
                    <button className="w-full bg-white text-blue-900 font-black py-5 rounded-2xl text-sm uppercase tracking-widest shadow-2xl hover:bg-gray-100 transition-all hover:translate-y-[-2px]">Launch Careers</button>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10">
                  <h4 className="font-black text-xl mb-8 flex items-center gap-3">
                    <Briefcase size={20} className="text-blue-400" /> Connect
                  </h4>
                  <div className="space-y-8">
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">Engage with faculty boards, student unions, and peer study groups via our secure internal network.</p>
                    <button className="w-full text-blue-400 text-xs font-black hover:text-blue-300 transition-colors flex items-center justify-center gap-3 py-4 rounded-2xl border border-blue-400/20 uppercase tracking-widest">
                      Institutional Forum →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
                  <div>
                    <h3 className="text-4xl font-black tracking-tight">Governance</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Central Infrastructure Node</p>
                  </div>
                  <button className="bg-blue-600 px-10 py-5 rounded-2xl flex items-center justify-center gap-4 text-sm font-black hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 hover:scale-105 active:scale-95">
                    <PlusCircle size={22} /> Deploy Hub
                  </button>
                </div>

                <div className="space-y-6">
                  {CAMPUSES.map(campus => (
                    <div key={campus.id} className="group flex items-center justify-between p-8 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.05]">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-400 font-black text-2xl border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {campus.shortName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-xl group-hover:text-blue-400 transition-colors">{campus.name}</p>
                          <p className="text-xs text-gray-500 font-black uppercase tracking-widest mt-1">{campus.colleges.length} Colleges • {campus.services.length} Endpoints</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button className="px-6 py-3 text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all uppercase tracking-[0.2em] border border-transparent hover:border-white/10">Configure</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="pt-32 pb-12 border-t border-white/5 flex flex-col items-center gap-10">
          <div className="flex items-center gap-12">
             <div className="w-14 h-14 bg-contain bg-center bg-no-repeat opacity-40 grayscale hover:grayscale-0 transition-all cursor-pointer" style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/47a915ec-86af-4b0e-937c-242f75156964/aau-emblem-9abfa81a-1771847863737.webp')` }} />
             <div className="h-8 w-px bg-white/10" />
             <div className="flex flex-col gap-1">
               <span className="text-xs font-black tracking-[0.4em] uppercase text-gray-600">Institutional Governance</span>
               <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Office of the President / ICT Directorate</span>
             </div>
          </div>
          <div className="text-center text-gray-600 text-xs font-bold space-y-4 tracking-tight">
            <p>© 2024 Addis Ababa University. The Digital Infrastructure Platform. All rights reserved.</p>
            <div className="flex items-center justify-center gap-6 uppercase tracking-widest text-[10px]">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Security</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Legal</a>
              <span className="text-gray-800">|</span>
              <span className="text-gray-500">Institutional V4.1.0</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Selected Campus Modal */}
      <AnimatePresence>
        {selectedCampus && (
          <CampusDetail 
            campus={selectedCampus} 
            onClose={() => setSelectedCampus(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}