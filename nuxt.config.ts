// https://nuxt.com/docs/api/configuration/nuxt-config

import process from 'node:process'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      backendURL: process.env.BACKEND_URL,
      debugNamespace: process.env.DEBUG_NAMESPACE,
    },

  },
  generate: {},
  // add port to 3001
  devServer: {
    port: 3001,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/styles/main.scss',
    '@/assets/styles.scss',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [nodePolyfills()],
    define: {
      'process.env.DEBUG': false,
      'BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";@import "@/assets/styles/_transitions.scss";',
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
  },
  // plugins: ["@/plugins/chartist.js"],
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
  ],
  imports: {
    dirs: ['store'],
  },
  routeRules: {
    '/redirect': { ssr: false },
  },
  ssr: false,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', 'sitemap.xml'],
    },
  },
})
