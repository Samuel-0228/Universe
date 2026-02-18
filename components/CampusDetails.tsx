
import React from 'react';
import { Campus } from '../types';
import { Icon } from './Icons';

interface CampusDetailsProps {
  campus: Campus;
  onClose: () => void;
}

const CampusDetails: React.FC<CampusDetailsProps> = ({ campus, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-8 pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl h-full bg-[#030014] border-l border-white/10 shadow-2xl overflow-y-auto scrollbar-hide pointer-events-auto animate-in slide-in-from-right duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-white/10 transition-colors z-10"
        >
          <Icon name="X" />
        </button>

        <div className="p-8 space-y-8">
          {/* Header */}
          <header className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: campus.planetColor }}
              />
              <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Campus Profile</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{campus.name}</h1>
            <p className="text-white/60 text-lg leading-relaxed">{campus.description}</p>
          </header>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-2xl flex items-start gap-4">
              <Icon name="MapPin" className="text-white/40 mt-1" />
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Address</p>
                <p className="text-sm font-medium">{campus.address}</p>
              </div>
            </div>
            <div className="glass p-4 rounded-2xl flex items-start gap-4">
              <Icon name="Phone" className="text-white/40 mt-1" />
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Contact</p>
                <p className="text-sm font-medium">{campus.contact.phone}</p>
              </div>
            </div>
          </div>

          {/* Map Preview */}
          <div className="glass rounded-3xl overflow-hidden aspect-video relative group">
            <iframe
              title="Campus Map"
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=PLACEHOLDER&q=${campus.coordinates.lat},${campus.coordinates.lng}&zoom=16`}
              style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.9)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${campus.coordinates.lat},${campus.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 glass px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors pointer-events-auto"
            >
              <Icon name="Navigation" size={16} />
              <span className="text-sm font-bold uppercase tracking-wider">Navigate</span>
            </a>
          </div>

          {/* Academics Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Academics</h2>
              <div className="h-px flex-1 mx-4 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {campus.colleges.map((college, idx) => (
                <div key={idx} className="glass p-6 rounded-3xl space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Icon name="Book" className="text-white/40" />
                    {college.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.departments.map((dept, dIdx) => (
                      <span key={dIdx} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-white/60">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">On-Campus Services</h2>
              <div className="h-px flex-1 mx-4 bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {campus.services.map((service) => (
                <div key={service.id} className="glass p-4 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="mb-3 flex justify-between items-start">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Icon name={service.icon} size={20} className="text-white/60" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      service.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{service.name}</h4>
                  <p className="text-[10px] text-white/40 leading-tight uppercase tracking-wider">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Landmarks */}
          <section className="pb-12 space-y-4">
             <div className="flex items-center gap-2 text-white/40">
               <Icon name="Info" size={16} />
               <h3 className="text-xs font-bold uppercase tracking-widest">Notable Landmarks</h3>
             </div>
             <div className="flex flex-wrap gap-3">
               {campus.landmarks.map((l, i) => (
                 <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    {l}
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CampusDetails;
