import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: ['@pinia/nuxt'],
    css: [
        "vuetify/lib/styles/main.sass",
        "@mdi/font/css/materialdesignicons.css"
    ],
    build: {
        transpile: ["vuetify", "@pinia/nuxt"]
    },
})
