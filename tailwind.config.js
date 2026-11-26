/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 500: '#6366F1', 600: '#4F46E5', 700: '#4338CA', 800: '#3730A3', 900: '#312E81' },
        accent: { DEFAULT: '#F59E0B', soft: '#FEF3C7', dark: '#B45309' },
        ink: { DEFAULT: '#0F172A', soft: '#475569' },
        night: { DEFAULT: '#07021A', card: '#120A2E', line: '#3B2A6B' },
        neon: { pink: '#FF2BD6', cyan: '#22D3EE', violet: '#8B5CF6', sun: '#FFB347' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], urdu: ['Noto Nastaliq Urdu', 'serif'] },
      boxShadow: { soft: '0 6px 24px -8px rgba(67,56,202,.25)' },
    },
  },
  plugins: [],
};
