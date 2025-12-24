// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

// import 'vuetify/styles'
import '@/assets/styles/main.scss'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'system'
    }
  })
  app.vueApp.use(vuetify)
})
