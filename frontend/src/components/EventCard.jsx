// ==========================================
// COMPONENT: EventCard.jsx
// ==========================================
// A reusable component representing a single event card.
// Uses glassmorphism styling, clean modern badges, and dynamic properties.
// Beginner Tip: Making elements highly interactive (scaling, glowing) 
// drastically improves the "feel" and perceived quality of a web application.

import React from 'react';
// Import beautiful vector icons from Lucide for tech parameters
import { Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';

export default function EventCard({ event, onRegisterClick }) {
  // Destructure properties from our event object
  const { id, name, date, venue, description, category, seatsLeft, totalSeats, icon: Icon } = event;

  // Calculate seat percentage to show warning colors when seats are almost full!
  const isAlmostFull = seatsLeft <= 15;

  return (
    <div className="group relative glass-card rounded-2xl p-6 overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 hover:border-brand-purple/40 hover:shadow-2xl hover:shadow-brand-purple/5 transition-all duration-300">
      
      {/* Decorative Glow Elements
         These absolutely positioned divs represent glowing blobs behind our card. 
         They highlight gracefully when the user hovers ('group-hover' class). */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full glow-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full glow-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* CARD CONTENT */}
      <div>
        {/* Header: Icon & Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-brand-purple group-hover:text-brand-pink group-hover:border-brand-purple/30 light:bg-zinc-100 light:border-zinc-200 transition-all duration-300">
            {/* Render the dynamic Lucide Icon passed into this card */}
            {Icon ? <Icon className="w-6 h-6" /> : <Calendar className="w-6 h-6" />}
          </div>
          
          {/* Dynamic category badge */}
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-600 transition-all">
            {category}
          </span>
        </div>

        {/* Event Title */}
        <h3 className="font-poppins font-bold text-lg mb-2 text-white light:text-zinc-950 group-hover:text-brand-purple light:group-hover:text-brand-blue transition-colors">
          {name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-zinc-400 light:text-zinc-500 mb-5 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Parameter Details: Date, Venue, Seats */}
        <div className="space-y-3 mb-6 border-t border-zinc-900 pt-4 light:border-zinc-100 transition-colors">
          {/* Date Row */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 light:text-zinc-600">
            <Calendar className="w-4 h-4 text-brand-blue" />
            <span>{date}</span>
          </div>

          {/* Venue Row */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 light:text-zinc-600">
            <MapPin className="w-4 h-4 text-brand-blue" />
            <span className="truncate">{venue}</span>
          </div>

          {/* Capacity/Seats Row */}
          <div className="flex items-center justify-between text-xs text-zinc-400 light:text-zinc-600">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-brand-blue" />
              <span>
                {seatsLeft} / {totalSeats} Seats Left
              </span>
            </div>
            
            {/* Conditional styling based on vacancy warning */}
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              isAlmostFull 
                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
            }`}>
              {isAlmostFull ? 'Filling Fast!' : 'Available'}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic CTA Register Button */}
      <button
        onClick={() => onRegisterClick(name)}
        className="w-full relative flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm font-semibold text-white hover:text-white hover:bg-gradient-to-r hover:from-brand-purple hover:to-brand-blue hover:border-transparent group-hover:shadow-lg group-hover:shadow-brand-purple/10 active:scale-[0.98] transition-all duration-300 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-800"
      >
        <span>Register Now</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

    </div>
  );
}
