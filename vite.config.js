import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Trade-In/', 
  server: {
    port: 5173,
    open: true
  }
});
