// ==========================================
// BACKEND ROUTES: Express API for Registration
// ==========================================
// This file defines the RESTful endpoints that the React frontend will interact with.
// We handle data validation, send queries to Supabase, and return JSON responses.

import { Router } from 'express';
import { supabase } from '../config/db.js'; // Import our initialized Supabase database client

// Initialize the Express Router. This acts as a mini-app router for registration paths.
const router = Router();

// Helper function to validate email strings using a simple Regular Expression (Regex)
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ------------------------------------------------------------
// 1. POST Endpoint: Register a new student for an event
// Path: /api/register
// ------------------------------------------------------------
router.post('/register', async (req, res) => {
  // Destructure the request body (sent as JSON from our React frontend)
  const { full_name, email, phone_number, college_name, event_name } = req.body;

  // Beginner Tip: Always validate inputs on the server! Client-side validation is easy to bypass.
  if (!full_name || full_name.trim() === '') {
    return res.status(400).json({ success: false, error: 'Full Name is required.' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  // Simple validation for phone numbers (at least 10 characters or digits)
  if (!phone_number || phone_number.trim().length < 8) {
    return res.status(400).json({ success: false, error: 'Please enter a valid phone number (min 8 digits).' });
  }

  if (!college_name || college_name.trim() === '') {
    return res.status(400).json({ success: false, error: 'College Name is required.' });
  }

  if (!event_name || event_name.trim() === '') {
    return res.status(400).json({ success: false, error: 'Please select an event.' });
  }

  try {
    // Supabase query: Insert a new row into the 'registrations' table.
    // Equivalent SQL: INSERT INTO registrations (full_name, email, phone_number, college_name, event_name) VALUES (...);
    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: full_name.trim(),
          email: email.trim().toLowerCase(),
          phone_number: phone_number.trim(),
          college_name: college_name.trim(),
          event_name: event_name.trim()
        }
      ])
      .select(); // Ask Supabase to return the newly inserted row

    // Check if Supabase returned an error (e.g. table doesn't exist or incorrect credentials)
    if (error) {
      console.error('Supabase Insertion Error:', error.message);
      return res.status(500).json({ success: false, error: 'Failed to save to database. Details: ' + error.message });
    }

    // Return a success code (201 Created) along with the saved row details.
    return res.status(201).json({
      success: true,
      message: 'Registration completed successfully!',
      data: data[0] // The newly created registration object
    });

  } catch (err) {
    console.error('Unexpected post registration server error:', err);
    return res.status(500).json({ success: false, error: 'An unexpected server error occurred.' });
  }
});

// ------------------------------------------------------------
// 2. GET Endpoint: Retrieve all registrations (for the Admin Dashboard)
// Path: /api/registrations
// ------------------------------------------------------------
router.get('/registrations', async (req, res) => {
  try {
    // Supabase query: Fetch all rows from the 'registrations' table, sorted by 'created_at' in descending order.
    // Equivalent SQL: SELECT * FROM registrations ORDER BY created_at DESC;
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Query Error:', error.message);
      return res.status(500).json({ success: false, error: 'Failed to retrieve registrations: ' + error.message });
    }

    // Return the list of registrations (empty array if no rows exist)
    return res.json({
      success: true,
      count: data.length,
      data: data
    });

  } catch (err) {
    console.error('Unexpected get registrations server error:', err);
    return res.status(500).json({ success: false, error: 'An unexpected server error occurred.' });
  }
});

// ------------------------------------------------------------
// 3. DELETE Endpoint: Remove a registration by its ID (for the Admin Dashboard)
// Path: /api/registration/:id
// ------------------------------------------------------------
router.delete('/registration/:id', async (req, res) => {
  const { id } = req.params; // Extract the registration UUID from the URL parameter

  if (!id) {
    return res.status(400).json({ success: false, error: 'Registration ID is required.' });
  }

  try {
    // Supabase query: Delete the row matching the specific ID.
    // Equivalent SQL: DELETE FROM registrations WHERE id = 'id';
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Deletion Error:', error.message);
      return res.status(500).json({ success: false, error: 'Failed to delete registration: ' + error.message });
    }

    return res.json({
      success: true,
      message: 'Registration deleted successfully!'
    });

  } catch (err) {
    console.error('Unexpected delete registration server error:', err);
    return res.status(500).json({ success: false, error: 'An unexpected server error occurred.' });
  }
});

export default router;
