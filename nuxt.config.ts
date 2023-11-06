// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      backendURL: process.env.BACKEND_URL,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/styles/main.scss',
    `assets/styles.scss`,
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
      BACKEND_URL: JSON.stringify(process.env.BACKEND_URL),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
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
  modules: [['@pinia/nuxt', { autoImports: ['defineStore'] }]],
  imports: {
    dirs: ['store'],
  },
  routeRules: {
    '/redirect': { ssr: false },
  },
  // ssr: false,
});
