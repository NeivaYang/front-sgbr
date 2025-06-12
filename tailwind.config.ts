/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './src/**/*.vue'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode support
  safelist: [
    {
      pattern:
        /bg-(red|green|blue|yellow|purple|pink|indigo|gray)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['dark'], // Apply dark mode variants
    },
    {
      pattern:
        /text-(red|green|blue|yellow|purple|pink|indigo|gray)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['dark'], // Apply dark mode variants
    },
    {
      pattern:
        /border-(red|green|blue|yellow|purple|pink|indigo|gray)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['dark'], // Apply dark mode variants
    },
  ],
};
