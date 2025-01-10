// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: "" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" },
      ]
    }
  },
  css: [
    '~/assets/styles/main.css'
  ],
  build: {
    transpile: ['vuetify'],
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  runtimeConfig: {
    graphqlHost: process.env.GQL_HOST,
    tokenName: process.env.GQL_GITHUB_TOKEN_NAME,
    tokenValue: process.env.GQL_GITHUB_TOKEN
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error some sort of something or other
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/content', '@nuxt/image', 'nuxt-icon', '@nuxt/eslint', '@pinia/nuxt', '@nuxt/scripts', 'nuxt-gtag'],

  gtag: {
    id: 'G-XWSPQV1JL1'
  },

  content: {
    // Nuxt content configuration options
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'dark-plus',
        // Theme used if `html.dark`
        dark: 'night-owl',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      preload: ['js', 'css', 'python', 'bash', 'vue', 'rust']
    },
    markdown: {
      anchorLinks: false,
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: 'noopener noreferer'
          }
        ]
      ]
    }
  },

  image: {
    provider: 'netlify',
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
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      },
    }
  },


  compatibilityDate: '2024-08-18'
})