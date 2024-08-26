// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },

  build: {
    transpile: ['vuetify'],
  },

  devtools: { enabled: true },

  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@nuxt/content',
    '@nuxt/image',
    
  ],

  content: {
    // Nuxt content configuration options
    highlight: {
      theme: 'nord',
      preload: ['js', 'css', 'python', 'bash', 'vue']
    }
  },

  image: {
    // NuxtImage configuration options
  },

  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true, 
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: true,
      autoImport: true,
      useVuetifyLabs: true, 
    }
  },

  compatibilityDate: '2024-08-18'
})