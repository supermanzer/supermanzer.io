// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: "" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" }
      ],
      script: [
        {src: "https://js.stripe.com/basil/stripe.js"} // Stripe JS Basil version
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      title: 'Supermanzer.io'
    }
  },
  css: [
    'vuetify/styles',
    '~/assets/styles/main.css'
  ],
  build: {
    transpile: ['vuetify'],
  },

  devServer: {
    cors: {
      origin: ['*',]
    },
    port: 3333,
  },

  devtools: { enabled: true },

  runtimeConfig: {
    // graphqlHost: process.env.GQL_HOST,
    // tokenName: process.env.GQL_GITHUB_TOKEN_NAME,
    // tokenValue: process.env.GQL_GITHUB_TOKEN
    stripeSK: process.env.STRIPE_SK,
    stripeApiVersion: process.env.STRIPE_API_VERSION,
    public: {
      stripePK: process.env.STRIPE_PK,
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-icon',
    '@nuxt/eslint',
    // 'nuxt-graphql-client',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error some sort of something or other
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],


  
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2
        },
        remarkPlugins: {
          'remark-emoji': {
            options: {
              emoticons: true
            }
          },
          'remark-gfm': false,
        },
        // rehypePlugins: []
        highlight: {
          // theme: 'github-dark', 
          theme: {
            default: 'night-owl',
            dark: 'night-owl',
            sepia: 'monokai'
          },
          langs: ['js', 'python', 'bash', 'vue', 'rust', 'vue-html']
        }
      }
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
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('stripe-'),
    }
  },

  compatibilityDate: '2024-08-18'
})