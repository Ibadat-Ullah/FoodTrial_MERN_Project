/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1ed',
          100: '#ffe0d6',
          200: '#ffc6b3',
          300: '#ffa185',
          400: '#ff7652',
          500: '#ff4500',
          600: '#e63e00',
          700: '#c93400',
          900: '#7a2000'
        },
        ink: '#231b17'
      },
      fontFamily: {
        display: ['"Manrope"', 'sans-serif'],
        sans: ['"Manrope"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(255, 69, 0, 0.10)'
      }
    }
  },
  plugins: []
};
