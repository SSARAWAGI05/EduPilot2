/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // ← ADD THIS LINE (enable dark mode)
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // One-line hover color utilities
        'brand-gray': '#495057',           // for hover:bg-brand-gray
        'accent-blue-lighter': '#74c0fc',  // for hover:bg-accent-blue-lighter
        'accent-blue': '#a5d8ff',
        'accent-yellow': '#ffec99',
        'accent-red': '#ffc9c9',
        'accent-orange': '#fff4e6',

        // Custom brand colors (namespaced)
        brand: {
          black: '#1e1e1e',
          gray: '#495057',
          'gray-medium': '#6c757d',
          'gray-light': '#e9ecef',
          'off-white': '#f8f9fa',
          beige: '#efe9e9ff',
        },

        // Custom accent colors (namespaced)
        accent: {
          blue: '#a5d8ff',
          'blue-light': '#e7f5ff',
          'blue-lighter': '#74c0fc',
          yellow: '#ffec99',
          'yellow-bright': '#ffd43b',
          red: '#ffc9c9',
          pink: '#ff8787',
          orange: '#fff4e6',
        },
      },

      animation: {
        blob: 'blob 7s infinite',
        'slide-vertical': 'slide-vertical 20s linear infinite',
        'slide-vertical-reverse': 'slide-vertical-reverse 25s linear infinite',
        'slide-horizontal': 'slide-horizontal 25s linear infinite',
        'slide-horizontal-reverse': 'slide-horizontal-reverse 30s linear infinite',
      },

      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'slide-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'slide-vertical-reverse': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-horizontal': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slide-horizontal-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};