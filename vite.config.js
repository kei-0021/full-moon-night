import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // index.html のパス修正 (以前の修正)
  plugins: [react()],
  build: {
    outDir: '../dist', // outDir の修正 (以前の修正)
  },
});