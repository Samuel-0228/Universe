import { motion } from 'framer-motion';
import { Campus } from '../types';
import { X, MapPin, Building2, Library, GraduationCap, Navigation, ExternalLink, Activity } from 'lucide-react';
import { generateGoogleMapsLink } from '../lib/utils';

export const CampusDetail = ({ campus, onClose }: { campus: Campus; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-black/95 backdrop-blur-2xl border-l border-white/10 z-[60] overflow-y-auto"
    >
      <div className="p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
        >
          <X size={20} />
        </button>

        <header className="mb-8 mt-4">
          <h2 className="text-3xl font-bold text-white mb-2">{campus.name}</h2>
          <div className="flex items-center gap-2 text-blue-400 text-sm">
            <MapPin size={14} />
            <span>{campus.address}</span>
          </div>
        </header>

        <p className="text-gray-400 leading-relaxed mb-8">{campus.description}</p>

        <section className="space-y-8">
          <div>
            <h3 className="flex items-center gap-2 text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              <GraduationCap size={16} className="text-blue-500" />
              Academic Structure
            </h3>
            <div className="space-y-4">
              {campus.colleges.map((college) => (
                <div key={college.name} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <h4 className="text-white text-sm font-medium mb-2">{college.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.departments.map((dept) => (
                      <span key={dept} className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              <Activity size={16} className="text-blue-500" />
              Services & Amenities
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {campus.services.map((service) => (
                <div key={service} className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              <Building2 size={16} className="text-blue-500" />
              Major Infrastructure
            </h3>
            <div className="space-y-2">
              {campus.infrastructure.map((building) => (
                <div key={building} className="text-sm text-gray-300 flex items-center justify-between group">
                  <span>{building}</span>
                  <Navigation size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10">
          <a
            href={generateGoogleMapsLink('current location', campus.coordinates, 'transit')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40"
          >
            <ExternalLink size={18} />
            Navigate to Campus
          </a>
        </div>
      </div>
    </motion.div>
  );
};