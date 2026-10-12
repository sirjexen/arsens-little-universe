import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// NOTE: base must stay '/arsens-little-universe/' for GitHub Pages project hosting.
export default defineConfig({
  base: '/arsens-little-universe/',
  plugins: [react(), tailwindcss()],
})
