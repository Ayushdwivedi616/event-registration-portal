// ==========================================
// BACKEND SERVER ENTRY POINT: server.js
// ==========================================
// This is the core file that fires up our Express.js backend.
// It integrates middleware, hooks in database-connected routes, and listens for client connections.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registerRoutes from './routes/registerRoutes.js';

// Load our '.env' configuration variables so they are accessible throughout our server startup.
dotenv.config();

// Create an instance of an Express application.
const app = express();

// Determine the port our server will run on. We check if a PORT is set in environment 
// variables (useful for deployment on Render, Railway, etc.), otherwise we fall back to 5000.
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARES SETUP
// ==========================================

// 1. CORS Middleware:
// Since our frontend (Vite React) might run on one port (e.g. 5173) and our backend runs on 
// another (e.g. 5000), browsers will block requests by default due to security policies.
// CORS (Cross-Origin Resource Sharing) tells the server to accept connections from other origins.
app.use(cors({
  origin: '*', // For local development, we allow requests from any origin. In production, we'd limit this.
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. JSON Body Parser:
// When the frontend submits data using JSON (e.g., in a fetch POST request), it sends it as a 
// string in the request body. This middleware automatically parses that JSON string into a 
// usable JavaScript object accessible via 'req.body'.
app.use(express.json());

// ==========================================
// API ROUTES
// ==========================================

// Wire up our registration routes. This prefixes all routes in registerRoutes.js with '/api'.
// For example: GET /api/registrations or POST /api/register
app.use('/api', registerRoutes);

// Simple Health Check/Welcome endpoint
// This helps verify that the server is online by simply opening http://localhost:5000/ in a browser.
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Welcome to the Event Registration Portal REST API!',
    documentation: 'Use POST /api/register, GET /api/registrations, or DELETE /api/registration/:id'
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================
// This acts as a catch-all safety net for any uncaught runtime errors in our Express routes.
// It prevents the server from crashing and returns a polite 500 JSON message.
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error Log:', err);
  res.status(500).json({
    success: false,
    error: 'A serious internal server error occurred. Please check console logs.'
  });
});

// ==========================================
// START THE SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`\n🚀 ===============================================`);
  console.log(`   SERVER RUNNING SUCCESSFULLY`);
  console.log(`   Port: http://localhost:${PORT}`);
  console.log(`   API Endpoint: http://localhost:${PORT}/api`);
  console.log(`================================================= 🚀\n`);
});
