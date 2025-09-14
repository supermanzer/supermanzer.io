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
        { src: "https://js.stripe.com/basil/stripe.js" }, // Stripe JS Basil version
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-XWSPQV1JL1', async: true },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XWSPQV1JL1');
          `
        }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      title: 'Supermanzer.io'
    }
  },
  css: [
    'vuetify/styles',
    '~/assets/styles/main.scss'
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

  devtools: {
    enabled: true,
    vscode: {
      reuseExistingServer: true,
      port: 3090
    }
  },

  runtimeConfig: {
    stripeSK: process.env.STRIPE_SECRET_KEY,
    public: {
      stripePK: process.env.STRIPE_PUBLISHABLE_KEY,
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
          langs: ['javascript', 'python', 'bash', 'vue', 'rust', 'vue-html']
        }
      }
    },
    watch: {
      enabled: true,
      port: 4000,
      showURL: false,
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
          // api: 'modern-compiler'
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