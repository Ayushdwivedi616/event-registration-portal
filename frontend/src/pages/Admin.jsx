// ==========================================
// PAGE: Admin.jsx
// ==========================================
// An interactive Admin Dashboard to manage event entries.
// Core Features:
// 1. Fetch registrations list on page mount using useEffect hook.
// 2. Real-time stats calculation (Total count, Unique events, Unique colleges).
// 3. Search and filter rows based on Name, College, or Event.
// 4. Delete API call (DELETE /api/registration/:id) with confirmation prompts.
// 5. Clean, fully-responsive dashboard structure.

import React, { useState, useEffect } from 'react';
// Import beautiful vector icons from Lucide
import { Search, Trash2, Users, School, Sparkles, RefreshCw, Loader2, Calendar } from 'lucide-react';

export default function Admin({ showToast }) {
  // --- STATE DECLARATIONS ---
  const [registrations, setRegistrations] = useState([]); // Stores the list of registrations from backend
  const [isLoading, setIsLoading] = useState(true);        // Spinner state for data loading
  const [searchQuery, setSearchQuery] = useState('');      // Search box filter text
  const [networkError, setNetworkError] = useState(false);  // Handles server disconnect visualization

  // --- API DATA FETCH FUNCTION ---
  // Fetches registration rows from our Express backend.
  const fetchRegistrations = async () => {
    setIsLoading(true);
    setNetworkError(false);
    try {
      // Connect to the GET /api/registrations endpoint we defined in registerRoutes.js
      const response = await fetch('http://localhost:5000/api/registrations');
      const data = await response.json();

      if (response.ok && data.success) {
        setRegistrations(data.data); // Save the row array into state
      } else {
        showToast(data.error || 'Failed to fetch registration records.', 'error');
      }
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setNetworkError(true);
      showToast('❌ Network error: Could not reach backend server.', 'error');
    } finally {
      setIsLoading(false); // Turn off loading spinner
    }
  };

  // --- SIDE EFFECT ACTIONS ---
  // When this dashboard page mounts, we automatically execute our fetchRegistrations function.
  // The empty dependency array '[]' ensures this runs EXACTLY ONCE on mount.
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // --- DELETE ENTRY HANDLER ---
  // Calls the DELETE /api/registration/:id endpoint.
  const handleDelete = async (id, studentName) => {
    // Beginner Tip: Standard browser confirm dialog prevents accidental clicks!
    const isConfirmed = window.confirm(`⚠️ WARNING: Are you sure you want to delete ${studentName}'s registration?`);
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/registration/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok && data.success) {
        showToast(`🗑️ Deletion successful: Removed ${studentName} from events list.`, 'success');
        
        // Optimistic State Update:
        // We filter out the deleted entry from our local state array immediately.
        // This avoids making another network GET request, making the UI feel incredibly fast!
        setRegistrations((prevRegs) => prevRegs.filter((reg) => reg.id !== id));
      } else {
        showToast(data.error || 'Failed to delete registration entry.', 'error');
      }
    } catch (err) {
      console.error('Deletion Fetch Error:', err);
      showToast('❌ Network error: Could not delete registration. Try restarting backend.', 'error');
    }
  };

  // --- CALCULATE ANALYTICS STATS ---
  // We compute these stats dynamically in memory whenever the 'registrations' state changes.
  const totalRegistrations = registrations.length;
  
  // Set is a built-in JS object that stores only unique values.
  // We map registration event names/college names into Sets to count uniqueness.
  const uniqueEvents = new Set(registrations.map(r => r.event_name)).size;
  const uniqueColleges = new Set(registrations.map(r => r.college_name)).size;

  // --- FILTER TABLE ROWS ---
  // Filters our rows based on the text search query typed by the admin.
  const filteredRegistrations = registrations.filter((reg) => {
    const query = searchQuery.toLowerCase();
    return (
      reg.full_name.toLowerCase().includes(query) ||
      reg.college_name.toLowerCase().includes(query) ||
      reg.event_name.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query)
    );
  });

  // Helper function to format timestamp ISO strings into readable local dates
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative min-h-screen text-zinc-300 light:text-zinc-700">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full glow-accent-purple filter blur-[130px] pointer-events-none opacity-40" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full glow-accent-blue filter blur-[100px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple px-2.5 py-1 rounded bg-brand-purple/10 border border-brand-purple/20">
              Admin Vault
            </span>
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-white light:text-zinc-950 mt-2">
              Registrants Dashboard
            </h1>
            <p className="text-zinc-400 light:text-zinc-500 text-sm leading-relaxed mt-1">
              Securely monitor, search, and manage students registered across all Nexus technical tracks.
            </p>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchRegistrations}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/30 text-xs font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-50 transition-all light:border-zinc-200 light:bg-zinc-100/30 light:text-zinc-600 light:hover:text-zinc-950"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Logs</span>
          </button>
        </div>

        {/* 1. STATISTICS CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card A: Total Registrations */}
          <div className="glass-card rounded-2xl p-6 border border-zinc-900 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 light:text-zinc-400">Total Entries</p>
              <h3 className="font-poppins font-extrabold text-3xl text-white light:text-zinc-950">{isLoading ? '...' : totalRegistrations}</h3>
              <p className="text-[10px] text-emerald-500 font-medium font-sans">Synced in real-time</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-purple/10 text-brand-purple">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card B: Unique Event Tracks active */}
          <div className="glass-card rounded-2xl p-6 border border-zinc-900 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 light:text-zinc-400">Active Events</p>
              <h3 className="font-poppins font-extrabold text-3xl text-white light:text-zinc-950">{isLoading ? '...' : uniqueEvents}</h3>
              <p className="text-[10px] text-zinc-500 light:text-zinc-400 font-medium">Tracks chosen by students</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-blue/10 text-brand-blue">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Card C: Total Colleges Represented */}
          <div className="glass-card rounded-2xl p-6 border border-zinc-900 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 light:text-zinc-400">Institutions</p>
              <h3 className="font-poppins font-extrabold text-3xl text-white light:text-zinc-950">{isLoading ? '...' : uniqueColleges}</h3>
              <p className="text-[10px] text-zinc-500 light:text-zinc-400 font-medium">Unique campuses joined</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-400">
              <School className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* 2. REAL-TIME TABLE FILTER CONTROLS */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 light:text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading || networkError}
            placeholder="Quick search by student name, college, email, or selected event track..."
            className="glass-input pl-11 pr-4 py-2.5 text-sm"
          />
        </div>

        {/* ==========================================
           MAIN REGISTRATIONS RENDER CONTAINER
           ========================================== */}
        {isLoading ? (
          // State A: Loading Spinner Overlay
          <div className="glass-card rounded-2xl p-16 text-center border border-zinc-900">
            <Loader2 className="w-10 h-10 animate-spin text-brand-purple mx-auto mb-4" />
            <p className="text-sm text-zinc-400 light:text-zinc-500 font-semibold tracking-wide">
              Connecting database client, fetching registers...
            </p>
          </div>
        ) : networkError ? (
          // State B: Express Backend Unreachable Warning
          <div className="glass-card rounded-2xl p-12 text-center max-w-xl mx-auto border border-rose-500/30 bg-rose-950/10 text-rose-200">
            <h3 className="font-poppins font-bold text-lg mb-2">Backend Sever Offline</h3>
            <p className="text-xs text-rose-300 leading-relaxed mb-6">
              We couldn't connect to the Express REST server on `http://localhost:5000`. Please verify that:
              <br />
              1. The backend server is started using `npm run dev` in the `backend/` folder.
              <br />
              2. Your `.env` variables (Supabase URL/Keys) are configured properly.
            </p>
            <button
              onClick={fetchRegistrations}
              className="px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredRegistrations.length > 0 ? (
          // State C: Render Registrations Grid Table
          <div className="glass-card rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl transition-all">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/60 border-b border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-400 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-600">
                    <th className="px-6 py-4">Student Details</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">College</th>
                    <th className="px-6 py-4">Event Track</th>
                    <th className="px-6 py-4">Registration Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/40 light:divide-zinc-200/40 text-sm font-medium">
                  {filteredRegistrations.map((reg) => (
                    <tr
                      key={reg.id}
                      className="hover:bg-zinc-900/20 light:hover:bg-zinc-50/50 transition-colors"
                    >
                      
                      {/* Name Details */}
                      <td className="px-6 py-4.5">
                        <div className="font-semibold text-white light:text-zinc-950 font-poppins">
                          {reg.full_name}
                        </div>
                        <div className="text-[10px] text-zinc-500 light:text-zinc-400 truncate max-w-[200px] mt-0.5">
                          ID: {reg.id}
                        </div>
                      </td>

                      {/* Contact Column */}
                      <td className="px-6 py-4.5">
                        <div className="text-zinc-300 light:text-zinc-800 text-xs flex items-center gap-1.5">
                          {reg.email}
                        </div>
                        <div className="text-[11px] text-zinc-500 light:text-zinc-400 mt-1">
                          {reg.phone_number}
                        </div>
                      </td>

                      {/* College Column */}
                      <td className="px-6 py-4.5 text-zinc-300 light:text-zinc-800">
                        {reg.college_name}
                      </td>

                      {/* Chosen Event */}
                      <td className="px-6 py-4.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-purple/10 text-brand-purple border border-brand-purple/20 text-xs font-semibold uppercase tracking-wider">
                          <Calendar className="w-3 h-3" />
                          {reg.event_name}
                        </span>
                      </td>

                      {/* Date Joined */}
                      <td className="px-6 py-4.5 text-xs text-zinc-500 light:text-zinc-400">
                        {formatTime(reg.created_at)}
                      </td>

                      {/* Actions Column (Delete Row) */}
                      <td className="px-6 py-4.5 text-center">
                        <button
                          onClick={() => handleDelete(reg.id, reg.full_name)}
                          className="p-2 rounded-lg border border-zinc-900 hover:border-rose-500/20 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 active:scale-95 transition-all light:border-zinc-100"
                          aria-label="Delete Student Registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer Stats indicator */}
            <div className="bg-zinc-950/60 border-t border-zinc-900 px-6 py-4.5 text-xs text-zinc-500 light:bg-zinc-50 light:border-zinc-200 flex items-center justify-between">
              <p>Database synchronization online</p>
              <p className="font-semibold text-brand-blue light:text-brand-purple">
                Viewing {filteredRegistrations.length} students
              </p>
            </div>

          </div>
        ) : (
          // State D: Empty results for table filter
          <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto border border-zinc-900">
            <h3 className="font-poppins font-bold text-lg text-white light:text-zinc-950 mb-2">No Registrations Found</h3>
            <p className="text-xs text-zinc-500 light:text-zinc-400 leading-relaxed">
              We couldn't find any registered students matching your search criteria. Try modifying your name, college, or event spelling.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-5 btn-gradient text-xs"
            >
              Reset Search Bar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
