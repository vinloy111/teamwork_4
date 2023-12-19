import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      consts: path.resolve(__dirname, './src/consts'),
      features: path.resolve(__dirname, './src/features'),
      hooks: path.resolve(__dirname, './src/hooks'),
      mocks: path.resolve(__dirname, './src/mocks'),
      pages: path.resolve(__dirname, './src/pages'),
      services: path.resolve(__dirname, './src/services'),
      theme: path.resolve(__dirname, './src/theme'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      mode: 'development',
      base: '/',
      registerType: 'autoUpdate',
      srcDir: 'src',
      includeAssets: [
        'assets/images/*.png',
        'assets/images/planets/*.svg',
        'assets/images/ships/*.svg',
      ],
      filename: 'sw.ts',
      strategies: 'injectManifest',
      manifest: {
        name: 'PWA Inject Manifest',
        short_name: 'PWA Inject',
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
})
