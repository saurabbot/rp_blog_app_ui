import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  imports: {
    dirs: ["stores"],
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3000/graphql",
        tokenStorage: "localStorage",
      },
    },
  },
 
});
