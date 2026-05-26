// ==========================================
// CORE APP ENTRY POINT: App.jsx
// ==========================================
// This is the core orchestrator of our React frontend.
// It acts as the "brain" of the client-side app, managing:
// 1. Theme Configuration: Toggles class lists on document.documentElement for Dark & Light modes.
// 2. State-Based Routing: Loads Home, Events, Register, or Admin pages depending on activePage state.
// 3. Central Event Database: Houses upcoming technical events, dates, seats, and Lucide icons.
// 4. Global Toast alerts: Exposes a single showToast method so child pages can trigger alerts easily.

import React, { useState, useEffect } from 'react';
// Import beautiful vector icons from Lucide for our event cards
import { Code, Cpu, Layout, Cloud, Globe } from 'lucide-react';

// Import our reusable layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Import our page views
import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Admin from './pages/Admin';

// ==========================================
// CENTRAL EVENTS DATABASE (MOCK SCHEMA)
// ==========================================
// This acts as our catalog. We supply it with rich, premium content typical of technical hackathons.
const EVENTS_DATABASE = [
  {
    id: 'ev-1',
    name: 'Cyber Hackathon 2026',
    category: 'Coding',
    date: 'June 18-19, 2026',
    venue: 'Campus Innovation Lab (Hall C)',
    description: 'A grueling 24-hour sprint to build AI-powered security protocols. Form teams, solve cryptographic riddles, and build full-stack solutions to address modern cybersecurity vulnerabilities.',
    seatsLeft: 12,
    totalSeats: 150,
    icon: Code
  },
  {
    id: 'ev-2',
    name: 'AI & Robotics Summit',
    category: 'Robotics',
    date: 'July 04, 2026',
    venue: 'Grand Auditorium, Tech Block',
    description: 'Explore the boundaries of machine intelligence. Catch industry keynotes, inspect real autonomous drone models, and attend hands-on labs training vision models on tiny microcontrollers.',
    seatsLeft: 42,
    totalSeats: 250,
    icon: Cpu
  },
  {
    id: 'ev-3',
    name: 'UI/UX Design Jam 3.0',
    category: 'Design',
    date: 'July 15, 2026',
    venue: 'Design Studio & Creative Arena',
    description: 'A high-impact creative challenge for design enthusiasts. Redesign legacy interfaces into beautiful glassmorphic dark-mode web experiences. Compete for best visual coherence and user flow designs.',
    seatsLeft: 8,
    totalSeats: 80,
    icon: Layout
  },
  {
    id: 'ev-4',
    name: 'Cloud DevOps Workshop',
    category: 'Workshop',
    date: 'August 02, 2026',
    venue: 'Seminar Complex (Lab 4)',
    description: 'Master horizontal scaling, Docker container setups, and GitHub Action workflows. Deploy mock applications onto automated cloud instances and study distributed logs monitoring tools.',
    seatsLeft: 75,
    totalSeats: 120,
    icon: Cloud
  },
  {
    id: 'ev-5',
    name: 'Web3 Innovators Arena',
    category: 'Coding',
    date: 'August 24, 2026',
    venue: 'Virtual Amphitheater',
    description: 'Pitch decentralized ideas and smart contracts. Focus on cryptographic consensus protocols, peer-to-peer databases, and build working prototypes showing transparent public transactions.',
    seatsLeft: 50,
    totalSeats: 200,
    icon: Globe
  }
];

export default function App() {
  // ==========================================
  // STATE MANAGEMENT HOOKS
  // ==========================================

  // 1. activePage state: Determines which page gets rendered. ('home', 'events', 'register', 'admin')
  const [activePage, setActivePage] = useState('home');

  // 2. selectedEvent state: Stores the event name that a student selected (pre-populates the form).
  const [selectedEvent, setSelectedEvent] = useState('');

  // 3. toast state: Controls active notification alerts. Defaults to null (invisible).
  const [toast, setToast] = useState(null);

  // 4. theme state: Manages dark or light mode colors. Defaults to 'dark'.
  const [theme, setTheme] = useState('dark');

  // ==========================================
  // GLOBAL THEME SWITCH CONTROLLER
  // ==========================================
  // Beginners Tip: We toggle the HTML theme by adding/removing the 'light' or 'dark' class 
  // on the root '<html>' element. Tailwind's 'darkMode: "class"' compiles everything automatically!
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      // Set dark-mode body bg
      document.body.style.backgroundColor = '#09090b';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      // Set light-mode body bg
      document.body.style.backgroundColor = '#fafafa';
    }
  }, [theme]); // Re-run this side-effect whenever the 'theme' state changes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // ==========================================
  // GLOBAL TOAST ALERTS TRIGGER
  // ==========================================
  // This helper enables any subpage to trigger beautiful alerts in 1 line of code.
  // Example: showToast("Registration Saved!", "success");
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  // ==========================================
  // CLIENT ROUTER (STATE-BASED)
  // ==========================================
  // We inspect 'activePage' state and return the correct React component dynamically.
  // This avoids complex router package configurations for simple web portals.
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            events={EVENTS_DATABASE}
            setActivePage={setActivePage}
            setSelectedEvent={setSelectedEvent}
          />
        );
      case 'events':
        return (
          <Events
            events={EVENTS_DATABASE}
            setActivePage={setActivePage}
            setSelectedEvent={setSelectedEvent}
          />
        );
      case 'register':
        return (
          <Register
            events={EVENTS_DATABASE}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            showToast={showToast}
            setActivePage={setActivePage}
          />
        );
      case 'admin':
        return (
          <Admin
            showToast={showToast}
          />
        );
      default:
        return (
          <Home
            events={EVENTS_DATABASE}
            setActivePage={setActivePage}
            setSelectedEvent={setSelectedEvent}
          />
        );
    }
  };

  return (
    // Outer layout wrapper. Smooth transitions handle background color fades during theme toggling.
    <div className="flex flex-col min-h-screen text-zinc-300 light:text-zinc-700 transition-colors duration-300">
      
      {/* 1. STICKY NAVBAR */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. MAIN CORE PAGE VIEW */}
      {/* Takes all vertical room, centering contents if empty */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* 3. SLEEK FOOTER */}
      <Footer setActivePage={setActivePage} />

      {/* 4. FLOATING NOTIFICATION PORTAL */}
      {/* Renders overlay alerts only if toast state has a message */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}

    </div>
  );
}
