// ==========================================
// PAGE: Register.jsx
// ==========================================
// This page provides a professional, fully-validated registration form.
// It integrates:
// 1. Two-way data binding on form inputs using a single 'formData' object state.
// 2. Real-time form input client-side validations (emails, phone lengths, etc.).
// 3. Dynamic loading state (isSubmitting) to disable fields and show a spinner.
// 4. API communication using standard JS 'fetch()' to POST data to Express.js.
// 5. Educational comments explaining React state, form handlers, and API calls.

import React, { useState, useEffect } from 'react';
// Import beautiful vector icons from Lucide
import { User, Mail, Phone, School, Sparkles, Send, Loader2 } from 'lucide-react';
// Import dynamic API base address from our utility helper
import { API_BASE_URL } from '../utils/api';

export default function Register({ events, selectedEvent, setSelectedEvent, showToast, setActivePage }) {
  // --- STATE DECLARATIONS ---
  
  // 1. Form Data State: 
  // We use a single object state to bundle all inputs. This is cleaner than 5 separate state calls.
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    college_name: '',
    event_name: ''
  });

  // 2. Client-side Errors State:
  // Stores field-specific validation errors (e.g. { email: 'Invalid format' }) to render warnings.
  const [errors, setErrors] = useState({});

  // 3. Loading State:
  // Indicates if the backend network call is currently running. We use this to disable inputs 
  // and animate the submit button during submission.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- SIDE EFFECT ACTIONS ---
  // If the user clicked "Register Now" on an EventCard, the parent passes the selectedEvent name.
  // We sync it into our local formData object when this page mounts or when selectedEvent changes.
  useEffect(() => {
    if (selectedEvent) {
      setFormData((prevData) => ({
        ...prevData,
        event_name: selectedEvent
      }));
    }
  }, [selectedEvent]);

  // --- INPUT CHANGE HANDLER ---
  // A single, reusable handler for all standard inputs.
  // It extracts the 'name' attribute (e.g. 'full_name') and the 'value' (typed letters) 
  // from the event object, then dynamically updates only that specific key in state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear errors for this field as the user starts typing to fix it
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // --- VALIDATION RUNNER ---
  // Checks all values prior to firing the API call. Returns true if valid.
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.full_name.trim()) newErrors.full_name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    } else if (formData.phone_number.trim().length < 8) {
      newErrors.phone_number = 'Phone number must be at least 8 digits';
    }

    if (!formData.college_name.trim()) newErrors.college_name = 'College name is required';
    if (!formData.event_name) newErrors.event_name = 'Please select an event';

    setErrors(newErrors);
    
    // The form is valid if the newErrors object has zero keys
    return Object.keys(newErrors).length === 0;
  };

  // --- SUBMISSION CALLER (API CALL) ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the default HTML browser page reload action

    // Run validations. If they fail, stop and don't make the API call.
    if (!validateForm()) {
      showToast('Please correct the validation errors in the form.', 'error');
      return;
    }

    // Set loading indicator to true (turns on spinner, locks form)
    setIsSubmitting(true);

    try {
      // API call to save registration.
      // We communicate with our Express.js backend.
      // Falls back to localhost:5000 locally, uses production API in Vercel.
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert our JavaScript object to a JSON string
      });

      // Parse the response from Express
      const data = await response.json();

      if (response.ok && data.success) {
        // If everything saved to Supabase successfully:
        showToast('🎉 Awesome! You have registered successfully!', 'success');
        
        // Reset form inputs back to blank
        setFormData({
          full_name: '',
          email: '',
          phone_number: '',
          college_name: '',
          event_name: ''
        });
        setSelectedEvent(''); // Reset selected event reference in parent
        
        // Route to the Admin Dashboard after a brief delay so they can see their name in the table!
        setTimeout(() => {
          setActivePage('admin');
        }, 1500);

      } else {
        // Handle database or server errors returned by Express
        showToast(data.error || 'Failed to complete registration.', 'error');
      }

    } catch (err) {
      // Handle network failure cases (e.g. backend server is not running)
      console.error('Registration Fetch Error:', err);
      showToast(`❌ Network error: Could not reach backend server at ${API_BASE_URL}. Ensure it is running.`, 'error');
    } finally {
      // Turn off loading spinner (always runs, whether insert succeeded or crashed)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-zinc-300 light:text-zinc-700">
      
      {/* Dynamic Background Glowing Circles */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full glow-accent-purple filter blur-[110px] pointer-events-none opacity-40" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full glow-accent-blue filter blur-[130px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple px-2.5 py-1 rounded bg-brand-purple/10 border border-brand-purple/20">
            Secure Entry
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-white light:text-zinc-950">
            Register for Nexus Events
          </h1>
          <p className="text-zinc-400 light:text-zinc-500 text-sm leading-relaxed">
            Fill in your authentic academic credentials. Your data is synced immediately onto our secure PostgreSQL server.
          </p>
        </div>

        {/* Central Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-zinc-900 relative overflow-hidden">
            
            {/* Glowing borders */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-purple/80 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Field 1: Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-zinc-600 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-purple" />
                  <span>Full Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="e.g. Jane Doe"
                    className={`glass-input ${errors.full_name ? 'border-rose-500/80 focus:ring-rose-500/30 focus:border-rose-500' : ''}`}
                  />
                </div>
                {errors.full_name && (
                  <p className="text-xs font-medium text-rose-500 pl-1">{errors.full_name}</p>
                )}
              </div>

              {/* Field 2 & 3: Email and Phone (Grid Layout on large, stack on mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-zinc-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="jane.doe@college.edu"
                    className={`glass-input ${errors.email ? 'border-rose-500/80 focus:ring-rose-500/30 focus:border-rose-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-rose-500 pl-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-zinc-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="+1 (555) 123-4567"
                    className={`glass-input ${errors.phone_number ? 'border-rose-500/80 focus:ring-rose-500/30 focus:border-rose-500' : ''}`}
                  />
                  {errors.phone_number && (
                    <p className="text-xs font-medium text-rose-500 pl-1">{errors.phone_number}</p>
                  )}
                </div>

              </div>

              {/* Field 4: College Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-zinc-600 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-brand-purple" />
                  <span>College / Institution Name</span>
                </label>
                <input
                  type="text"
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="e.g. Stanford University"
                  className={`glass-input ${errors.college_name ? 'border-rose-500/80 focus:ring-rose-500/30 focus:border-rose-500' : ''}`}
                />
                {errors.college_name && (
                  <p className="text-xs font-medium text-rose-500 pl-1">{errors.college_name}</p>
                )}
              </div>

              {/* Field 5: Event Selection Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-zinc-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                  <span>Select Event Track</span>
                </label>
                <select
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`glass-input appearance-none py-3.5 cursor-pointer text-white light:text-zinc-900 ${
                    errors.event_name ? 'border-rose-500/80 focus:ring-rose-500/30 focus:border-rose-500' : ''
                  }`}
                  style={{ colorScheme: 'dark' }} // Force standard dark backgrounds for options list
                >
                  <option value="" disabled className="bg-zinc-950 text-zinc-500 light:bg-white light:text-zinc-400">
                    -- Select an Event track --
                  </option>
                  
                  {/* Map each event from parent into a select option */}
                  {events.map((event) => (
                    <option 
                      key={event.id} 
                      value={event.name}
                      className="bg-zinc-950 text-white light:bg-white light:text-zinc-900"
                    >
                      {event.name} ({event.category})
                    </option>
                  ))}
                </select>
                {errors.event_name && (
                  <p className="text-xs font-medium text-rose-500 pl-1">{errors.event_name}</p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      {/* Spin Loader Icon */}
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Syncing secure database vault...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
