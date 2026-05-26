// ==========================================
// COMPONENT: Toast.jsx
// ==========================================
// A floating overlay notification component.
// It slides in from the bottom-right corner and is used to notify users about 
// form submission success, network errors, or deletion actions in the admin panel.

import React, { useEffect } from 'react';
// Import beautiful vector icons from Lucide
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  
  // --- SIDE EFFECT ACTIONS ---
  // useEffect is a React hook used to perform side effects (like setting up timers, 
  // subscribing to APIs, or modifying elements directly).
  // Here, we set an automatic timeout. Once this component mounts, it counts down 
  // and calls the 'onClose' callback function automatically.
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close after the duration
    }, duration);

    // Clean-up function: This is run when the component unmounts.
    // It prevents memory leaks by canceling the timer if the user closes it manually early.
    return () => clearTimeout(timer);
  }, [onClose, duration]); // Dependency array: Re-run this effect if onClose or duration updates

  // Dynamic values depending on toast type
  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short pointer-events-auto">
      {/* Outer Card wrapping with glassmorphism & drop shadow */}
      <div className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl backdrop-blur-lg border shadow-2xl transition-all duration-300 ${
        isSuccess
          ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-100 shadow-emerald-950/20'
          : 'bg-rose-950/80 border-rose-500/30 text-rose-100 shadow-rose-950/20'
      }`}>
        
        {/* Type Icon */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          isSuccess 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : 'bg-rose-500/10 text-rose-400'
        }`}>
          {isSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-xs font-semibold tracking-wide uppercase opacity-70">
            {isSuccess ? 'Success' : 'Notice'}
          </p>
          <p className="text-sm font-medium leading-relaxed break-words">
            {message}
          </p>
        </div>

        {/* Manual Dismiss Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          aria-label="Dismiss Alert"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
