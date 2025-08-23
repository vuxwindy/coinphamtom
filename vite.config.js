import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.version': '"v16.0.0"',
    'process.platform': '"browser"',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify',
      url: 'url',
      buffer: 'buffer',
      process: 'process',
    },
  },
  optimizeDeps: {
    include: [
      'crypto-browserify',
      'stream-browserify',
      'assert',
      'stream-http',
      'https-browserify',
      'os-browserify',
      'url',
      'buffer',
      'process',
    ],
    exclude: ['@vueuse/core'],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
})
