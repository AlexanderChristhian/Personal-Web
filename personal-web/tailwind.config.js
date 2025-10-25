/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': {
          50: '#e0f2ff',
          100: '#b3e0ff',
          200: '#80ccff',
          300: '#4db8ff',
          400: '#1aa3ff',
          500: '#00a3ff',
          600: '#0099ff',
          700: '#0080e6',
          800: '#0066cc',
          900: '#004d99',
        },
        'cyber-black': {
          50: '#1a1a1a',
          100: '#0f0f0f',
          200: '#0a0a0a',
          300: '#050505',
          400: '#000000',
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.neon-blue.500"), 0 0 20px theme("colors.neon-blue.500")',
        'neon-sm': '0 0 2px theme("colors.neon-blue.500"), 0 0 10px theme("colors.neon-blue.500")',
        'neon-lg': '0 0 10px theme("colors.neon-blue.500"), 0 0 40px theme("colors.neon-blue.500"), 0 0 80px theme("colors.neon-blue.500")',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00a3ff, 0 0 10px #00a3ff, 0 0 15px #00a3ff' },
          '100%': { boxShadow: '0 0 10px #00a3ff, 0 0 20px #00a3ff, 0 0 30px #00a3ff' },
        }
      }
    },
  },
  plugins: [],
}