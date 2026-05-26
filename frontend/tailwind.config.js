/** @type {import('tailwindcss').Config} */
export default {
  // Let Tailwind know which files contain classes we want to compile
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Enable class-based dark mode (allows toggling by adding 'dark' class to <html>)
  darkMode: 'class',
  theme: {
    extend: {
      // Extend the default Tailwind palette with custom premium dark SaaS colors
      colors: {
        dark: {
          bg: '#09090b',       // Deep sleek space-black
          card: '#18181b',     // Smooth dark grey card background
          accent: '#27272a',   // Hover highlights and border colors
          text: '#f4f4f5'      // Vibrant off-white for text readability
        },
        brand: {
          purple: '#8b5cf6',   // Violet accent color
          blue: '#6366f1',     // Indigo accent color
          pink: '#d946ef',     // Dynamic magenta for glowing gradients
        }
      },
      fontFamily: {
        // Inter is the standard for high-end SaaS startups (linear, clean, high readability)
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        // Soft pulsing glows for hero background effects
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Shimmer gradient animation for loaders
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
