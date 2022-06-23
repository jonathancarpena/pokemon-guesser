/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ["Verdana"],
        'arcade': ["Electrolize"]
      },
      colors: {
        black: '#1F2937',
        sub: '#808486',
        primary: {
          100: '#ffdacc',
          200: '#ffb599',
          300: '#ff8f66',
          400: '#ff6a33',
          500: '#ff4500',
          600: '#cc3700',
          700: '#992900',
          800: '#661c00',
          900: '#330e00'
        },
        secondary: {
          100: '#f8f9fa',
          200: '#f0f3f5',
          300: '#e9ecf0',
          400: '#e1e6eb',
          500: '#dae0e6',
          600: '#aeb3b8',
          700: '#83868a',
          800: '#6d7073',
          900: '#575a5c'
        },
        analogous: {
          100: '#d6f4fe',
          200: '#ade9fe',
          300: '#84ddfd',
          400: '#5bd2fd',
          500: '#32c7fc',
          600: '#289fca',
          700: '#1e7797',
          800: '#145065',
          900: '#0a2832',
        },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(0px) translateX(15px) ' },
          '50%': { transform: 'translateY(0px) translateX(0px) ' },
        },
        wiggleFocus: {
          '0%, 100%': { transform: 'translateY(0px) translateX(15px) scale(1.25)', },
          '50%': { transform: 'translateY(0px) translateX(0px) scale(1.25)', },
        },
        nod: {
          '0%, 100%': { transform: 'translateX(0px) translateY(15px) ' },
          '50%': { transform: 'translateY(0px) translateX(0px) ' },
        },
        nodFocus: {
          '0%, 100%': { transform: 'translateX(0px) translateY(15px) scale(1.25)' },
          '50%': { transform: 'translateY(0px) translateX(0px) scale(1.25)' },
        },

      },
      animation: {
        'wiggle': 'wiggle 300ms infinite ',
        'nod': 'nod 300ms infinite ',
        'wiggleFocus': 'wiggleFocus 300ms infinite',
        'nodFocus': 'nodFocus 300ms infinite',
        'spin-slow': 'spin 7s linear infinite',
      },
    },
  },
  plugins: [],
}
