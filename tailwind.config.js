/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {},
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [],
  important: true,
  prefix: 'tms-'
}

