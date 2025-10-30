import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// McMaster-Carr inspired optimization configuration
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build output
    rollupOptions: {
      output: {
        // Aggressive code splitting for better caching
        manualChunks(id) {
          // Split React and React-DOM into separate chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Split router if you add it later
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
        },
        // Optimize asset names for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1];
          
          // Images and fonts get their own directory with hash
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Minimize CSS
    cssMinify: true,
    // Source maps for production debugging
    sourcemap: false, // Disable for faster builds and smaller bundle
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
  // Set base URL for assets
  base: './',
  // Image optimization settings
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Force optimize these dependencies
    force: true,
  },
  // Server configuration for development
  server: {
    // Open browser automatically
    open: false,
    // Faster HMR
    hmr: {
      overlay: true,
    },
  },
  // Preview configuration
  preview: {
    port: 4173,
    strictPort: true,
    open: false,
  },
})
