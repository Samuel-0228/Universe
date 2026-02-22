import React from "react";
import { getCampusById } from "@/lib/api-client";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Globe, MapPin, Phone, Building2, Briefcase, Info } from "lucide-react";

export default async function CampusPage({ params }: { params: { slug: string } }) {
  const campus = await getCampusById(params.slug);

  if (!campus) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-aau-navy text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{ backgroundColor: campus.color }}
                >
                  <Globe size={32} className="text-aau-navy" />
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter">{campus.name}</h1>
                  <p className="text-aau-gold font-bold uppercase tracking-[0.3em] text-xs">{campus.shortName} Node</p>
                </div>
              </div>
              <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
                {campus.description}
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 glass-panel rounded-[32px]">
                <MapPin className="text-aau-gold mb-4" />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Location</h3>
                <p className="text-white/80">{campus.address}</p>
                <p className="text-[10px] font-mono text-white/30 mt-2">{campus.lat}, {campus.lng}</p>
              </div>
              <div className="p-8 glass-panel rounded-[32px]">
                <Phone className="text-aau-gold mb-4" />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Contact</h3>
                <p className="text-white/80">{campus.contact}</p>
              </div>
            </section>

            {campus.departments && campus.departments.length > 0 && (
              <section>
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Briefcase className="text-aau-gold" />
                  Academic Departments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campus.departments.map((dept: any) => (
                    <div key={dept.id} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <h4 className="font-bold text-lg">{dept.name}</h4>
                      <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{dept.type}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="p-10 glass-panel rounded-[40px] border-aau-gold/20">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Info size={20} className="text-aau-gold" />
                Node Status
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40 uppercase tracking-widest">Connectivity</span>
                  <span className="text-xs font-bold text-emerald-400">OPTIMAL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40 uppercase tracking-widest">Sync Rate</span>
                  <span className="text-xs font-bold">99.9%</span>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all">
                    Download Node Map
                  </button>
                </div>
              </div>
            </div>

            <div className="p-10 glass-panel rounded-[40px]">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-aau-gold" />
                Facilities
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 bg-aau-gold rounded-full" />
                  Digital Library Access
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 bg-aau-gold rounded-full" />
                  High-Speed Campus WiFi
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 bg-aau-gold rounded-full" />
                  Student Lounge
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
