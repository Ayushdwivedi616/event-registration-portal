// ==========================================
// PAGE: Home.jsx
// ==========================================
// The primary landing page.
// Key elements:
// - Modern Hero section with glassmorphic cards and floating badges.
// - High-contrast CTA buttons linking pages.
// - Statistics row displaying portal parameters.
// - Featured Events section showing a handpicked list of top upcoming events.
// - About / Core Value Grid emphasizing tech details (Supabase, Express).

import React from 'react';
// Import beautiful vector icons from Lucide
import { ArrowRight, Code, Database, Sparkles, Trophy, Zap, Terminal } from 'lucide-react';
import EventCard from '../components/EventCard'; // Import our reusable EventCard component

export default function Home({ events, setActivePage, setSelectedEvent }) {
  
  // Pick the first 3 events as "Featured Events" for the home page showcase
  const featuredEvents = events.slice(0, 3);

  // Helper function to handle event card registration clicks:
  // Pre-populates the registration form with this specific event and moves the user there!
  const handleFeaturedRegister = (eventName) => {
    setSelectedEvent(eventName); // Pre-select the event name
    setActivePage('register');   // Shift page state to 'register'
  };

  return (
    <div className="relative min-h-screen text-zinc-300 light:text-zinc-700">
      
      {/* 1. COSMIC GLOW BACKGROUNDS */}
      {/* These ambient gradients simulate a modern dark startup homepage (Next.js-style) */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full glow-accent-purple filter blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute top-[25%] right-[10%] w-[500px] h-[500px] rounded-full glow-accent-blue filter blur-[150px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        
        {/* ==========================================
           HERO SECTION: Smart Event Registration Portal
           ========================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-24">
          
          {/* Floating Startup Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-700 shadow-md">
            <Sparkles className="w-4.5 h-4.5 text-brand-purple animate-pulse" />
            <span>Powering Student Innovation for 2026</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="font-poppins font-extrabold text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight text-white light:text-zinc-950">
            Smart Event <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue">
              Registration Portal
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-400 light:text-zinc-500 leading-relaxed max-w-2xl mx-auto font-sans">
            Coordinate and join high-octane coding hackathons, technical design jams, AI showcases, and hands-on developer workshops under a premium SaaS canvas.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* CTA 1: Register */}
            <button
              onClick={() => setActivePage('register')}
              className="w-full sm:w-auto btn-gradient text-base flex items-center justify-center gap-2 group py-3 px-8"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* CTA 2: Explore Events */}
            <button
              onClick={() => setActivePage('events')}
              className="w-full sm:w-auto btn-secondary text-base flex items-center justify-center gap-2 py-3 px-8"
            >
              <span>Explore Events</span>
            </button>
          </div>

          {/* Dynamic Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { val: '15+', label: 'Tech Tracks' },
              { val: '2,500+', label: 'Registrations' },
              { val: '100%', label: 'Free & Open Source' },
              { val: '0ms', label: 'DB Sync latency' }
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center border border-zinc-900 hover:border-zinc-800 transition-colors">
                <p className="font-poppins font-bold text-2xl sm:text-3xl text-white light:text-zinc-950 bg-clip-text">
                  {stat.val}
                </p>
                <p className="text-xs text-zinc-500 light:text-zinc-400 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ==========================================
           FEATURED EVENTS PREVIEW SECTION
           ========================================== */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white light:text-zinc-950">
                Featured Innovation Tracks
              </h2>
              <p className="text-zinc-500 light:text-zinc-400 text-sm mt-1">
                Handpicked, high-octane engineering events accepting registrations right now.
              </p>
            </div>
            
            <button
              onClick={() => setActivePage('events')}
              className="text-sm font-semibold text-brand-purple hover:text-brand-purple/80 light:text-brand-blue light:hover:text-brand-blue/80 flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={handleFeaturedRegister}
              />
            ))}
          </div>
        </div>

        {/* ==========================================
           ABOUT SECTION (VALUE PROPOSITIONS)
           ========================================== */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-zinc-900">
          {/* Subtle inside grid lines */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Column A: Sticky details */}
            <div className="space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-purple px-2.5 py-1 rounded bg-brand-purple/10 border border-brand-purple/20">
                Built For Students
              </span>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white light:text-zinc-950">
                A Premium Educational Canvas with Modern Tech
              </h2>
              <p className="text-zinc-400 light:text-zinc-500 leading-relaxed text-sm">
                Nexus is not just a portal—it's an open-source template crafted to show how React, Tailwind CSS, Express, and Supabase connect harmoniously. Perfect for developers looking to understand robust, state-based full-stack architecture.
              </p>
              
              <div className="flex flex-col gap-4 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-800 text-brand-purple light:bg-zinc-200 light:border-zinc-300">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span>Secure PostgreSQL connection with zero data leakage.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-800 text-brand-blue light:bg-zinc-200 light:border-zinc-300">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <span>Structured, dry Express route handling.</span>
                </div>
              </div>
            </div>

            {/* Column B: Showcase items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Feature 1 */}
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 light:bg-zinc-100/50 light:border-zinc-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-purple/10 text-brand-purple">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-base text-white light:text-zinc-950">React 19 Hooks</h4>
                <p className="text-xs text-zinc-500 light:text-zinc-500 leading-relaxed">
                  Leveraging pure React `useState`, `useEffect`, and state-driven components for lightning-fast visual updates.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 light:bg-zinc-100/50 light:border-zinc-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-blue/10 text-brand-blue">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-base text-white light:text-zinc-950">Tailwind CSS</h4>
                <p className="text-xs text-zinc-500 light:text-zinc-500 leading-relaxed">
                  Highly customizable utility style architecture with automatic theme switches, scrollbars, and premium colors.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 light:bg-zinc-100/50 light:border-zinc-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-base text-white light:text-zinc-950">Supabase DB</h4>
                <p className="text-xs text-zinc-500 light:text-zinc-500 leading-relaxed">
                  Full persistence through a cloud PostgreSQL database, keeping your registrants organized and safe.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 light:bg-zinc-100/50 light:border-zinc-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-pink/10 text-brand-pink">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-base text-white light:text-zinc-950">REST APIs</h4>
                <p className="text-xs text-zinc-500 light:text-zinc-500 leading-relaxed">
                  Powered by clean Express route mapping with robust payload checks, response formats, and CORS configurations.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
