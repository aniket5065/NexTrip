import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '71b0-2401-4900-7fb2-594d-9490-ac87-4156-a38a.ngrok-free.app'
    ]
  }
})
