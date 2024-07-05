/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {},
    extend: {}
  },
  safelist: ['latte', 'frappe', 'macchiato', 'mocha'],
  plugins: [
    require('@catppuccin/tailwindcss')({
      prefix: false,
      defaultFlavour: 'mocha'
    })
  ]
};
