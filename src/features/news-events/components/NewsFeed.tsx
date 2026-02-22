"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Tag, ChevronRight, Newspaper, Bell, Music, GraduationCap } from "lucide-react";
import { NewsEvent } from "../types";
import { Campus } from "@/types/campus";

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'News': return <Newspaper size={16} />;
    case 'Seminar': return <GraduationCap size={16} />;
    case 'Cultural': return <Music size={16} />;
    case 'Announcement': return <Bell size={16} />;
    default: return <Tag size={16} />;
  }
};

const NewsFeed = ({ campuses }: { campuses: Campus[] }) => {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCampus, setFilterCampus] = useState("");
  const [filterType, setFilterType] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterCampus) params.append("campusId", filterCampus);
    if (filterType) params.append("type", filterType);
    
    const res = await fetch(`/api/news-events?${params.toString()}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [filterCampus, filterType]);

  return (
    <section className="mb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-black flex items-center gap-3">
            <Newspaper size={24} className="text-aau-gold" />
            Galaxy News & Events
          </h3>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Aggregate Intelligence from 15 Star Nodes</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select 
            value={filterCampus} 
            onChange={(e) => setFilterCampus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-aau-gold transition-all"
          >
            <option value="">All Campuses</option>
            {campuses.map(c => <option key={c.id} value={c.id}>{c.shortName}</option>)}
          </select>

          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-aau-gold transition-all"
          >
            <option value="">All Types</option>
            <option value="News">News</option>
            <option value="Seminar">Seminars</option>
            <option value="Cultural">Cultural</option>
            <option value="Announcement">Announcements</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 glass-card rounded-[32px] animate-pulse bg-white/5" />
            ))
          ) : items.length > 0 ? (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group glass-card rounded-[32px] overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <TypeIcon type={item.type} />
                    {item.type}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-white/30 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {item.campus_name}
                    </div>
                  </div>

                  <h4 className="text-lg font-black mb-2 group-hover:text-aau-gold transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/50 line-clamp-3 mb-6 leading-relaxed">
                    {item.content}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <button className="text-[10px] font-bold uppercase text-aau-gold flex items-center gap-1 hover:gap-2 transition-all">
                      Read Intelligence <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass-panel rounded-[32px]">
              <p className="text-white/20 font-bold uppercase tracking-widest">No intelligence found for this sector</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NewsFeed;
