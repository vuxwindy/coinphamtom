import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { assetsConfig } from './vite.assets.config.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
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
      output: {
        // Ensure assets are properly named and organized
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          
          // Handle images
          if (assetsConfig.imageFormats.includes(ext.toLowerCase())) {
            return `assets/images/[name]-[hash][extname]`
          }
          
          // Handle fonts
          if (assetsConfig.fontFormats.includes(ext.toLowerCase())) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          
          // Handle media files
          if (assetsConfig.mediaFormats.includes(ext.toLowerCase())) {
            return `assets/media/[name]-[hash][extname]`
          }
          
          // Default for other assets
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Ensure all assets are included
    assetsInlineLimit: 4096, // 4kb
    // Copy public assets
    copyPublicDir: true,
    // Source maps for debugging
    sourcemap: false,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true,
      },
    },
    // Ensure all assets are processed
    assetsInclude: assetsConfig.includePatterns,
  },
  // Public directory configuration
  publicDir: 'public',
  // Server configuration for development
  server: {
    port: 3000,
    host: true,
    // Ensure assets are served correctly in development
    fs: {
      allow: ['..']
    }
  },
  // Preview configuration
  preview: {
    port: 4173,
    host: true
  }
})
