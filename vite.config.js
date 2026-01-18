import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // أضف هذا السطر

export default defineConfig({
  plugins: [react()],
  base: "/task1-theForm/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
})