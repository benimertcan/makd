/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'text-transparent':'#737373',
      'text-light':'#FFFFFF',
      'text-dark':'#252B42',
      'bg-dark':'#252B42',
      'text-price':'#23856D',
      'primary-blue':'#23A6F0',
      'background-light':'#FAFAFA',
      
    },
    extend: {},
  },
  plugins: [],
}