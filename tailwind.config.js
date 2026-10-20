/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-teal': '#146375',
        'canopy-green': '#3C8D70',
        'leaf': '#99CB5B',
        'lime': '#D4EA50',
        'cream': '#F5EFB3',
        'ink': '#0B2A33',
        'ink-deep': '#06161B',
        'paper': '#FBFAF2',
        'mist': '#EEF3EE',
      },
      fontFamily: {
        inter: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '32px',
      },
    },
  },
  plugins: [],
};
