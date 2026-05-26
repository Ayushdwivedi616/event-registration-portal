// ==========================================
// PAGE: Events.jsx
// ==========================================
// This page lists all available events in a responsive grid.
// It integrates:
// 1. A search bar to filter events by name or description.
// 2. Category badge buttons to filter events by track (e.g. Coding, Design, etc.).
// 3. Reusable 'EventCard' rendering.
// 4. Dynamic counts showing how many events match the user's filters.

import React, { useState } from 'react';
// Import beautiful vector icons from Lucide
import { Search, SlidersHorizontal, Info } from 'lucide-react';
import EventCard from '../components/EventCard'; // Import our reusable card component

export default function Events({ events, setActivePage, setSelectedEvent }) {
  // --- STATE FOR FILTERING ---
  // 'searchQuery' stores the text typed by the user in the search input box
  const [searchQuery, setSearchQuery] = useState('');
  
  // 'activeCategory' stores the selected filter category. 'All' is selected by default.
  const [activeCategory, setActiveCategory] = useState('All');

  // Hardcoded category list for filter buttons
  const categories = ['All', 'Coding', 'Design', 'Robotics', 'Workshop'];

  // --- LOGIC: FILTER THE EVENTS ---
  // We filter the events array in real-time as the user types or clicks badges.
  // We check two conditions:
  // 1. Does the event category match activeCategory (or is 'All' selected)?
  // 2. Does the event title or description contain the searchQuery string?
  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      event.name.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  // Helper function to handle the card register click
  const handleRegisterClick = (eventName) => {
    setSelectedEvent(eventName); // Save selected event name to parent state
    setActivePage('register');   // Route user to the registration form page
  };

  return (
    <div className="relative min-h-screen text-zinc-300 light:text-zinc-700">
      
      {/* Dynamic Backgound Glows */}
      <div className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full glow-accent-blue filter blur-[100px] pointer-events-none opacity-45" />
      <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full glow-accent-purple filter blur-[120px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple px-2.5 py-1 rounded bg-brand-purple/10 border border-brand-purple/20">
            Nexus Arena
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-white light:text-zinc-950">
            Explore Innovation Tracks
          </h1>
          <p className="text-zinc-400 light:text-zinc-500 text-sm sm:text-base leading-relaxed">
            Search and filter through coding competitions, robotics summits, and technical workshops. Secure your slot before seats fill up.
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-10 space-y-4 sm:space-y-6">
          
          {/* Top Row: Search and Mobile Filter icon indicator */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            
            {/* Search Input Box */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 light:text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                // Update our searchQuery state whenever the user types a character
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, keyword, or technology..."
                className="glass-input pl-12 pr-4"
              />
            </div>

            {/* Filter Icon Decorative Badge */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 text-sm font-medium light:border-zinc-200 light:bg-zinc-100/40 light:text-zinc-600">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </div>

          </div>

          {/* Bottom Row: Category Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900 light:border-zinc-100">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  // Dynamic styling: Highlight the button if it is currently selected
                  className={`px-4.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md shadow-brand-purple/20 border border-transparent'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-600 light:hover:text-zinc-950'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* SEARCH RESULT STATS */}
        <div className="flex items-center justify-between text-xs text-zinc-500 light:text-zinc-400 font-medium mb-6 px-1">
          <p>
            Showing {filteredEvents.length} of {events.length} events
          </p>
          {searchQuery && (
            <p>
              Filtered by: "<span className="text-brand-purple">{searchQuery}</span>"
            </p>
          )}
        </div>

        {/* EVENTS RENDER GRID */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={handleRegisterClick}
              />
            ))}
          </div>
        ) : (
          // Empty State: Rendered when no events match the search or category filters
          <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto border border-zinc-900">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-900 border border-zinc-800 text-brand-purple mx-auto mb-4 light:bg-zinc-100 light:border-zinc-200">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="font-poppins font-bold text-lg text-white light:text-zinc-950 mb-2">No Matching Events</h3>
            <p className="text-xs text-zinc-500 light:text-zinc-400 leading-relaxed">
              We couldn't find any tracks matching your current filters. Try resetting the category to "All" or checking your search spelling.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-5 btn-gradient text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
