// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/styles/main.scss",
    `assets/styles.scss`,
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  // plugins: ["@/plugins/chartist.js"],
  modules: [["@pinia/nuxt", { autoImports: ["defineStore"] }]],
  imports: {
    dirs: ["store"],
  },
});
