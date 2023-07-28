import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "myDarkTheme",
      themes: {
        myDarkTheme: {
          dark: true,
          colors: {
            background: "#000",
            surface: "#000",
          },
        },
        myLightTheme: {
          dark: true,
          colors: {
            background: "#fff",
            surface: "#fff",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
