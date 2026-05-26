// ==========================================
// COMPONENT: Navbar.jsx
// ==========================================
// The primary navigation bar. It is sticky (stays fixed at the top during scrolling)
// and handles:
// 1. Desktop and Mobile responsive navigation layouts.
// 2. Active page state styling.
// 3. Dark and Light theme toggle mechanics.

import React, { useState } from 'react';
// Import sleek Lucide icons for high-quality SaaS style vector iconography
import { Menu, X, Sun, Moon, Calendar, UserCheck } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, theme, toggleTheme }) {
  // --- STATE DECLARATIONS ---
  // useState hook is used here to manage whether the mobile drawer is open or closed.
  // It returns a pair: the current state value (isMenuOpen) and a function to update it (setIsMenuOpen).
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reusable array of nav links to keep code DRY (Don't Repeat Yourself)
  // Each link corresponds to one of the main sections of our Event Portal.
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Events', id: 'events' },
    { name: 'Register', id: 'register' },
    { name: 'Admin Dashboard', id: 'admin' },
  ];

  // Helper function to handle menu click in mobile views.
  // It switches pages and automatically closes the mobile dropdown menu.
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMenuOpen(false); // Close mobile drawer
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md bg-zinc-950/70 border-b border-zinc-800/80 light:bg-white/70 light:border-zinc-200/80 text-zinc-100 dark:text-zinc-100 light:text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. BRAND LOGO SECTION */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-blue shadow-md shadow-brand-purple/20">
              {/* Decorative Calendar Icon in Logo */}
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 light:from-zinc-950 light:to-zinc-600">
              NEXUS
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
              SaaS
            </span>
          </div>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          {/* Visible on medium (md) screens and wider, hidden on mobile */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  // Dynamic class lists based on active state:
                  // - If active: glow text and show background capsule
                  // - If inactive: dim hover transitions
                  className={`px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-800/60 text-white border border-zinc-700/50 light:bg-zinc-100 light:text-zinc-950 light:border-zinc-300/40 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-zinc-950 hover:bg-zinc-900/40 light:hover:bg-zinc-100/50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* 3. CONTROL ACTIONS SECTION (Theme Toggle & CTA) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:text-white hover:bg-zinc-900/80 light:border-zinc-200 light:bg-zinc-100/30 light:text-zinc-600 light:hover:text-zinc-950 light:hover:bg-zinc-100/80 transition-all duration-200"
            >
              {/* Show Sun icon for light mode, Moon icon for dark mode */}
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Registration Button */}
            <button
              onClick={() => setActivePage('register')}
              className="btn-gradient text-sm flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Join Event</span>
            </button>
          </div>

          {/* 4. RESPONSIVE MOBILE MENU HAMBURGER BUTTON */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle inside Mobile Bar */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg border border-zinc-800 text-zinc-400 light:border-zinc-200 light:text-zinc-600"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white light:border-zinc-200 light:text-zinc-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. RESPONSIVE MOBILE DRAWER MENU */}
      {/* Conditionally renders only when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="md:hidden transition-all duration-300 bg-zinc-950 border-b border-zinc-900 px-4 py-4 space-y-2 light:bg-white light:border-zinc-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-purple/20 to-brand-blue/10 text-brand-purple border-l-4 border-brand-purple font-semibold light:bg-zinc-100'
                      : 'text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-zinc-950 hover:bg-zinc-900/50 light:hover:bg-zinc-100/50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Quick CTA inside Mobile menu */}
          <div className="pt-4 border-t border-zinc-900 light:border-zinc-100">
            <button
              onClick={() => handleNavClick('register')}
              className="w-full btn-gradient flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Join Now</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
