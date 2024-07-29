/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 8px 0 #64748B',
        'logout': '0 0 8px 0 #64748B',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translateX(0)'
          },
          '25%': {
            transform: 'translateX(5px)'
          },
          '50%': {
            transform: 'translateX(-5px)'
          },
          '75%': {
            transform: 'translateX(5px)'
          },
          '100%': {
            transform: 'translateX(0)'
          },
        }
      },
      animation: {
        shake: 'shake 300ms ease',
      }
    },
  },
  plugins: [],
}