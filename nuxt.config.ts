// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  build: {
    transpile: ['vuetify'],
  },

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-icon',
    '@nuxt/eslint',
    // '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error some sort of something or other
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  content: {
    // Nuxt content configuration options
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: 'material-theme-ocean',
      preload: ['js', 'css', 'python', 'bash', 'vue', 'rust']
    },
    markdown: {
      anchorLinks: false
    }
  },

  image: {
    // NuxtImage configuration options
    // https://image.nuxt.com/get-started/configuration
  },

  icon: {
    // NuxtIcon configuration options: 
    // https://nuxt.com/modules/icon
    serverBundle: {
      collections: ['uil', 'mdi']
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2024-08-18'
})