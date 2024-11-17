/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,121,110,1) 50%, rgba(0,212,255,1) 100%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '10px',
      },
    },
  },
  plugins: [],
}