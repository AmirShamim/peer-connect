import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// vite config stuff - copied from the docs mostly
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/peer-connect"
})
