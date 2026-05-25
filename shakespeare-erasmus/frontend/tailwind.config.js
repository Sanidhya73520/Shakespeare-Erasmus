/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shakespeare': {
          'dark': '#0B0B0F',
          'charcoal': '#0F0F14',
          'purple': '#14121F',
          'indigo': '#1B1A2E'
        },
        'festival': {
          'red': '#C43D12',
          'orange': '#E43D12',
          'yellow': '#F9B233',
          'teal': '#239A9B',
          'blue': '#234A9B',
          'purple': '#A0238E'
        },
        'primary': '#F9B233',
        'background-light': '#f8fafc',
        'background-dark': '#050505',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
        'script': ['Dancing Script', 'cursive']
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(196, 61, 18, 0.4)',
        'glow-teal': '0 0 20px rgba(35, 154, 155, 0.4)',
        'glow-purple': '0 0 20px rgba(160, 35, 142, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)'
      },
      backdropBlur: {
        'xl': '10px'
      }
    }
  },
  plugins: [],
}
