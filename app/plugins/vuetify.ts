// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

// import 'vuetify/styles'
import '@/assets/styles/main.scss'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#3F51B5',
            secondary: '#546E7A',
            surface: '#FFFFFF',
            background: '#F5F7F8',
            'on-surface': '#212121',
            'on-primary': '#FFFFFF',
            error: '#B71C1C',
            success: '#2E7D32',
            info: '#1565C0',
            warning: '#E65100',
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
