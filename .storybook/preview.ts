import type { Preview } from '@storybook/vue3'
// Импорт глобальных стилей
import '../app/assets/css/main.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // Добавляем Google Fonts в head
    html: {
      root: {
        lang: 'ru',
      },
    },
  },
  // Декоратор для добавления Google Fonts в head
  decorators: [
    (story) => {
      // Добавляем Google Fonts в head документа
      if (typeof document !== 'undefined') {
        const linkPreconnect1 = document.createElement('link')
        linkPreconnect1.rel = 'preconnect'
        linkPreconnect1.href = 'https://fonts.googleapis.com'
        document.head.appendChild(linkPreconnect1)

        const linkPreconnect2 = document.createElement('link')
        linkPreconnect2.rel = 'preconnect'
        linkPreconnect2.href = 'https://fonts.gstatic.com'
        linkPreconnect2.crossOrigin = ''
        document.head.appendChild(linkPreconnect2)

        const linkFont = document.createElement('link')
        linkFont.rel = 'stylesheet'
        linkFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
        document.head.appendChild(linkFont)
      }
      return story()
    },
  ],
};

export default preview;