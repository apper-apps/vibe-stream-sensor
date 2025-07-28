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
          50: '#fdf2f6',
          100: '#fce7ed',
          500: '#E1306C',
          600: '#d12762',
          700: '#b51d52',
        },
        secondary: {
          50: '#f3f0fd',
          100: '#e9e2fc',
          500: '#833AB4',
          600: '#7630a3',
          700: '#652589',
        },
        accent: {
          50: '#fef6f0',
          100: '#fdede1',
          500: '#F77737',
          600: '#f56832',
          700: '#e55225',
        },
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}