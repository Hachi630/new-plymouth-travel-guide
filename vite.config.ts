import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' → relative asset paths so the built dist/ can be hosted anywhere / shared directly.
export default defineConfig({
  base: './',
  plugins: [react()],
})
