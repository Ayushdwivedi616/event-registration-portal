// ==============================================================
// UTILITY CONFIG: api.js
// ==============================================================
// This helper manages the network address of our Express.js backend.
//
// 💡 HOW IT WORKS:
// 1. LOCAL DEVELOPMENT: If no environment variable is found, it automatically
//    falls back to 'http://localhost:5000' so the app works out-of-the-box locally.
// 2. PRODUCTION (VERCEL): When you deploy to Vercel, you can set the environment 
//    variable 'VITE_API_URL' to your live backend server address (e.g. Render/Railway),
//    and the frontend will immediately route requests there!

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
