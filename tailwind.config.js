/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
    "./projects/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6B9EFF',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF'
        }
      }
    },
  },
  plugins: [],
};
