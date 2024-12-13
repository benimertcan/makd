/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
    
      'text-light':'#FFFFFF',
      'text-dark':'#252B42',
      'bg-dark':'#252B42',
      'text-price':'#23856D',
      'primary-blue':'#23A6F0',
      'background-light':'#FAFAFA',
      'second-text-color':'#737373',
      'bg-input':'#F9F9F9',
    },
    extend: {},
  },
  plugins: [],
}