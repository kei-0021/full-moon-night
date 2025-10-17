import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: './src',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'server.js', dest: '.' }
      ]
    })
  ],
  build: {
    outDir: '../dist',
    // 🚨 最後の修正: outDir がルート外でも強制的に空にする
    emptyOutDir: true, 
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  }
});