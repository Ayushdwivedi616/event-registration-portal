# Nexus | Smart Event Registration Portal 

Nexus is a modern, premium **Full-Stack Event Registration Portal** designed with a beautiful, dark SaaS-style aesthetic similar to modern Next.js startup websites. 

This project is specifically built to be **beginner-friendly** and acts as an educational canvas for studying how a **React.js + Tailwind CSS** frontend connects to a **Node.js + Express.js** REST API, which stores entries securely in a cloud **Supabase (PostgreSQL)** database.

---

## 🛠️ Tech Stack & Features

- **Frontend**: React (Vite-powered), Tailwind CSS (for premium utility styling and responsive dark/light theme shifts), Lucide React (for premium modern tech icons).
- **Backend**: Node.js & Express.js with ES Modules support (`type: "module"`) so import syntax matches React.
- **Database**: Supabase PostgreSQL database client integration.
- **Design system**: Sticky translucent navbar, premium glassmorphism styles, hover card scales/glows, responsive charts, clean Inter/Poppins typography, and micro-animated Toast alerts.

---

## 📁 Repository Directory Structure

```text
event-registration-portal/
├── backend/
│   ├── config/
│   │   └── db.js            # Supabase connection setup
│   ├── routes/
│   │   └── registerRoutes.js# REST API Endpoint pathways (GET, POST, DELETE)
│   ├── .env.example         # Template for environment keys
│   ├── package.json         # Backend script routes & dependencies
│   └── server.js            # Core Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI elements (Navbar, EventCard, Toast, Footer)
│   │   ├── pages/           # Core page views (Home, Events, Register, Admin)
│   │   ├── App.css          # Cleaned boilerplate stylesheet
│   │   ├── App.jsx          # Root orchestrator (State router, theme switcher)
│   │   ├── index.css        # Core custom scrollbars, animations, and typography
│   │   └── main.jsx         # React mounting shell
│   ├── index.html           # Main HTML index with title & viewport optimizations
│   ├── package.json         # Frontend script routes & dev dependencies
│   ├── postcss.config.js    # PostCSS configs for Tailwind compiles
│   └── tailwind.config.js   # Custom Tailwind theme tokens (brand colors, glows)
│
└── README.md                # This setup & instruction manual
```

---

## 💾 1. Database Setup (Supabase)

To link this portal to your own database:
1. Create a free account at [Supabase.com](https://supabase.com/).
2. Click **New Project** and name it (e.g. `nexus-event-portal`).
3. Once the database is provisioned, go to the **SQL Editor** in the left sidebar of your Supabase dashboard.
4. Click **New query** and paste the following SQL script to create the `registrations` table:

```sql
-- Create the registrations table to store student inputs
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  college_name VARCHAR(255) NOT NULL,
  event_name VARCHAR(255) NOT NULL
);

-- OPTIONAL: Set up permission policies if Row-Level-Security (RLS) is active.
-- Since our backend is the only one communicating directly via secure keys, 
-- we can allow insert/read/delete capabilities for authenticated requests.
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts and reads" 
  ON registrations 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
```
5. Click **Run** in the Supabase editor. Your table is ready!

---

## 🔑 2. Environment Variables Configuration

To authenticate your server with Supabase:
1. Navigate to the `backend/` folder.
2. Duplicate the `.env.example` file and rename it `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open the `.env` file and insert your actual Supabase project keys. You can locate these inside your Supabase dashboard under **Settings** -> **API**:
   - `SUPABASE_URL`: Found under "Project URL".
   - `SUPABASE_ANON_KEY`: Found under "Project API keys" -> `anon / public`.
   - `SUPABASE_SERVICE_ROLE_KEY`: Found under "Project API keys" -> `service_role` (Highly recommended for secure server-side insertions/deletions).

Example `.env` configuration:
```env
PORT=5000
SUPABASE_URL=https://abcde12345.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🚀 3. How to Run Locally

You will need to open two separate terminal shells to run both the frontend and backend servers.

### Part A: Booting the Backend API
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the server dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the hot-reloading development server powered by `nodemon`:
   ```bash
   npm run dev
   ```
   *Your server will spin up on **http://localhost:5000**.*

### Part B: Booting the Frontend UI
1. Open a second terminal shell and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the client-side dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   *Vite will compile your code and start the client on **http://localhost:5173** (or the next available port).*
4. Open the browser link and start interacting!

---

## 🎓 Beginner-Friendly Learning Map

To help you study this codebase, we have added extensive comments explaining:
1. **React State (`useState`)**: Used in `App.jsx`, `Register.jsx`, `Events.jsx`, `Admin.jsx`, and `Navbar.jsx` to store text inputs, loading circles, list rows, dark modes, and active page values.
2. **Side Effects (`useEffect`)**: Used in `App.jsx` to directly mutate the browser DOM class lists for Dark mode, and in `Admin.jsx` to fetch registrations from the Express API immediately upon dashboard page mount.
3. **CORS and REST APIs**: Configured in `backend/server.js` using `cors()` middleware so the browser doesn't block requests made from port 5173 to port 5000.
4. **Supabase SQL-like Queries**: Explained in `backend/routes/registerRoutes.js` showing how standard JavaScript syntax translates directly to SQL `SELECT`, `INSERT`, and `DELETE` commands.
