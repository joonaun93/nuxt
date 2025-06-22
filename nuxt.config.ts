// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/eslint"],
  runtimeConfig: {
    public: {
      apiBase: "https://zuno-django-api.azurewebsites.net",
    },
  },
});
