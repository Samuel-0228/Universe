import { getCampusById } from "@/lib/api-client";
import Navbar from "@/components/layout/Navbar";
import { MapPin, Phone, Building2, BookOpen, Navigation as NavIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CampusPage({ params }: { params: { slug: string } }) {
  const campus = await getCampusById(params.slug);

  if (!campus) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-aau-navy relative">
      <div className="fixed inset-0 star-field opacity-30 pointer-events-none" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <Link href="/" className="text-aau-gold hover:underline text-xs font-bold uppercase tracking-widest mb-8 block">
          ← Back to Galaxy
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 glow-text uppercase">
              {campus.name}
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              {campus.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-8 glass-panel rounded-[32px]">
                <h3 className="text-xs font-bold uppercase text-aau-gold mb-4 tracking-widest flex items-center gap-2">
                  <Building2 size={16} /> Academic Units
                </h3>
                <ul className="space-y-3">
                  {campus.departments?.map((dept: any) => (
                    <li key={dept.id} className="text-sm flex items-center justify-between">
                      <span>{dept.name}</span>
                      <span className="text-[10px] text-white/20 uppercase font-bold">{dept.type}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 glass-panel rounded-[32px]">
                <h3 className="text-xs font-bold uppercase text-aau-gold mb-4 tracking-widest flex items-center gap-2">
                  <BookOpen size={16} /> Campus Services
                </h3>
                <ul className="space-y-3">
                  {campus.services?.map((service: any) => (
                    <li key={service.id} className="text-sm">
                      <p className="font-bold">{service.name}</p>
                      <p className="text-[10px] text-white/40">{service.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 glass-panel rounded-[32px] border-aau-gold/20">
              <h3 className="text-xs font-bold uppercase text-aau-gold mb-6 tracking-widest">Node Logistics</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-aau-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/30">Address</p>
                    <p className="text-sm">{campus.address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-aau-gold">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/30">Contact Protocol</p>
                    <p className="text-sm">{campus.contact}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-aau-gold">
                    <NavIcon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/30">Coordinates</p>
                    <p className="text-sm font-mono">{campus.lat}, {campus.lng}</p>
                  </div>
                </div>
              </div>

              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${campus.lat},${campus.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-10 py-5 bg-aau-gold text-aau-navy font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                <NavIcon size={20} /> Initiate Navigation
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
