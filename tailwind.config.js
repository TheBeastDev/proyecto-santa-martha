/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C00',
          dark: '#E67E00',
          light: '#FFA533',
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
        },
        cream: {
          DEFAULT: '#FFF8E7',
          dark: '#F5E6C8',
        },
        brown: {
          DEFAULT: '#8B4513',
          dark: '#6B3410',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

