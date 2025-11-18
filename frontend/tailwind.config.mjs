/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'btn', 'btn-primary', 'btn-ghost', 'btn-square',
    'navbar', 'card', 'card-body', 'card-title', 'card-actions',
    'menu', 'menu-vertical',
    'bg-base-100', 'bg-base-200', 'bg-base-300',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
    base: true,
    styled: true,
    utils: true,
    logs: true,
  },
}

