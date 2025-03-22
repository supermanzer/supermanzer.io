// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

// import 'vuetify/styles'
import '@/assets/styles/main.scss'
import { createVuetify } from 'vuetify'
import { md1 } from 'vuetify/blueprints'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,

  })
  app.vueApp.use(vuetify)
})
