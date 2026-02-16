// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Подключение Google Fonts
  app: {
    head: {
      link: [
        // Preconnect для быстрой загрузки
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Подключение шрифта Inter
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' }
      ]
    }
  },
  
  // Импорт глобальных стилей
  css: ['~/assets/css/main.scss']
})
