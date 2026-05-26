// ==========================================
// COMPONENT: Footer.jsx
// ==========================================
// A premium dark SaaS-style footer.
// Includes a logo layout, helpful link matrices, and a neat interactive mock newsletter subscription.

import React, { useState } from 'react';
// Import beautiful vector icons from Lucide
import { Send, Sparkles, Shield, RefreshCw } from 'lucide-react';

export default function Footer({ setActivePage }) {
  // --- STATE FOR NEWSLETTER ---
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() === '') return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900 transition-all duration-300 pt-16 pb-8 text-zinc-400 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-600">
      
      {/* Decorative Glow accent at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] glow-accent-blue rounded-full filter blur-[80px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-blue">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-poppins font-bold text-lg tracking-tight text-white light:text-zinc-950">
                NEXUS
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 light:text-zinc-400">
              The smart event registration hub. Seamlessly coordinating high-tech student hackathons, professional summits, and hands-on workshops.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-purple" /> GDPR Secure</span>
              <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-brand-blue" /> Instant Sync</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-poppins font-bold text-sm text-white light:text-zinc-950 tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'Events', 'Register', 'Admin Dashboard'].map((page) => {
                const id = page === 'Admin Dashboard' ? 'admin' : page.toLowerCase();
                return (
                  <li key={page}>
                    <button
                      onClick={() => setActivePage(id)}
                      className="hover:text-white light:hover:text-zinc-950 transition-colors text-left"
                    >
                      {page}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Event Tracks */}
          <div>
            <h4 className="font-poppins font-bold text-sm text-white light:text-zinc-950 tracking-wider uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-500 light:text-zinc-400">
              <li><span className="hover:text-brand-purple cursor-pointer transition-colors">Coding Hackathons</span></li>
              <li><span className="hover:text-brand-purple cursor-pointer transition-colors">AI & Robotics Summits</span></li>
              <li><span className="hover:text-brand-purple cursor-pointer transition-colors">UI/UX Design Jams</span></li>
              <li><span className="hover:text-brand-purple cursor-pointer transition-colors">Cloud DevOps Workshops</span></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div>
            <h4 className="font-poppins font-bold text-sm text-white light:text-zinc-950 tracking-wider uppercase mb-4">
              Get Updates
            </h4>
            <p className="text-sm text-zinc-500 light:text-zinc-400 mb-4">
              Subscribe to get immediate alerts when new tech workshops or event slots open up.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="developer@nexus.io"
                disabled={subscribed}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs rounded-lg pl-3 pr-10 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-purple light:bg-white light:border-zinc-200 light:text-zinc-950 disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={subscribed}
                className="absolute right-1 p-1.5 rounded-md bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            
            {/* Subscription alert toast simulation */}
            {subscribed && (
              <p className="text-xs text-brand-purple font-medium mt-2 animate-pulse">
                🎉 Thanks for subscribing! You are on the list.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 border-t border-zinc-900 light:border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 light:text-zinc-500">
          <p>© {new Date().getFullYear()} Nexus Portal. Pair programmed with Antigravity AI.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-pointer">Security Center</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
